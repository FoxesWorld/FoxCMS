<?php
declare(strict_types=1);

init::classUtil('McQuery', "1.0.0");
use PHPMinecraft\MinecraftQuery\MinecraftQueryResolver;

/**
 * Class GameServerManager
 *
 * Управляет учётом времени онлайн на игровых серверах для пользователей.
 */
class GameServerManager {
    /** @var object $db Объект подключения к базе данных, поддерживающий метод prepare(). */
    private $db;

    /**
     * Конструктор.
     *
     * @param object $db Объект подключения к базе данных.
     * @throws InvalidArgumentException Если переданный объект не поддерживает метод prepare().
     */
    public function __construct($db) {
        if (!method_exists($db, 'prepare')) {
            throw new InvalidArgumentException("Database connection object must implement method prepare().");
        }
        $this->db = $db;
    }

    /**
     * Универсальный метод для выполнения операций внутри транзакции.
     *
     * @param callable $operation Функция, содержащая основную логику.
     * @return mixed Результат выполнения операции.
     * @throws Exception В случае ошибки операция откатывается.
     */
    private function runInTransaction(callable $operation) {
        $transactionSupported = method_exists($this->db, 'beginTransaction');
        if ($transactionSupported) {
            $this->db->beginTransaction();
        }

        try {
            $result = $operation();
            if ($transactionSupported && method_exists($this->db, 'commit')) {
                $this->db->commit();
            }
            return $result;
        } catch (Exception $ex) {
            if ($transactionSupported && $this->inTransactionSafe()) {
                $this->db->rollBack();
            }
            throw $ex;
        }
    }

/**
 * Получает список серверов пользователя из БД.
 *
 * @param string $login Логин пользователя.
 * @return array|null Список объектов с данными сессий или null, если пользователь не найден.
 */
private function getUserData(string $login): ?array {
    $selector = new GenericSelector($this->db, 'users', ['login', 'serversOnline']);
    $rows = $selector->select(['login' => $login]);

    if (!$rows || !isset($rows[0]['serversOnline'])) {
        return null;
    }

    return $this->parseServersOnline($rows[0]['serversOnline']);
}


    /**
     * Обновляет список серверов пользователя в БД.
     * Записывает только JSON-массив (список серверов).
     *
     * @param string $login Логин пользователя.
     * @param array  $servers Список объектов с данными сессий.
     * @throws RuntimeException Если не удаётся закодировать данные в JSON.
    
    private function updateUserData(string $login, array $servers): void {
        $jsonData = json_encode($servers, JSON_UNESCAPED_UNICODE);
        if ($jsonData === false) {
            throw new RuntimeException('Failed to encode JSON: ' . json_last_error_msg());
        }
        $sql = "UPDATE users SET serversOnline = :serversOnline WHERE login = :login";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':serversOnline' => $jsonData,
            ':login'         => $login
        ]);
    } */
	
	/**
	 * Обновляет список серверов пользователя в БД с использованием GenericUpdater.
	 *
	 * @param string $login   Логин пользователя.
	 * @param array  $servers Список объектов сессий.
	 * @throws RuntimeException Если JSON кодирование не удалось.
	 */
	private function updateUserData(string $login, array $servers): void {
		$jsonData = json_encode($servers, JSON_UNESCAPED_UNICODE);
		if ($jsonData === false) {
			throw new RuntimeException('Failed to encode JSON: ' . json_last_error_msg());
		}

		$updater = new GenericUpdater(
			$this->db,
			'users',
			['login', 'serversOnline'],
			false // отключаем удаление, так как обновляем одну строку
		);

		$result = $updater->updateData([
			'login' => $login,
			'serversOnline' => $jsonData
		], 'login');

		if ($result['type'] === 'error') {
			throw new RuntimeException('Update failed: ' . $result['message']);
		}
	}


    /**
     * Декодирует JSON-строку с информацией о сессиях или возвращает пустой список.
     *
     * @param string|null $serversOnline JSON-данные из БД.
     * @return array Список объектов с данными сессий.
     * @throws RuntimeException Если не удаётся декодировать JSON.
     */
    private function parseServersOnline(?string $serversOnline): array {
        if (empty($serversOnline)) {
            return [];
        }
        $data = json_decode($serversOnline, true);
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
            throw new RuntimeException('Failed to decode JSON or invalid format: ' . json_last_error_msg());
        }
        // Конвертация старого формата (ассоциативный массив) в список объектов
        if ($data && array_keys($data) !== range(0, count($data) - 1)) {
            $converted = [];
            foreach ($data as $name => $srv) {
                $srv['serverName'] = $name;
                $converted[] = $srv;
            }
            return $converted;
        }
        // Убедимся, что у каждого объекта есть поле serverName
        foreach ($data as &$srv) {
            if (!isset($srv['serverName'])) {
                $srv['serverName'] = '';
            }
        }
        return $data;
    }

    /**
     * Ищет индекс сервера в списке по имени.
     *
     * @param array $servers Список серверов.
     * @param string $serverName Имя сервера.
     * @return int|null Индекс сервера или null, если не найден.
     */
    private function findServerIndex(array $servers, string $serverName): ?int {
        foreach ($servers as $index => $server) {
            if (isset($server['serverName']) && $server['serverName'] === $serverName) {
                return $index;
            }
        }
        return null;
    }

    /**
     * Проверяет, находится ли игрок на сервере в данный момент.
     *
     * @param string $serverIp IP-адрес сервера.
     * @param int    $serverPort Порт сервера.
     * @param string $playerName Имя игрока.
     * @return bool True, если игрок найден в списке, иначе false.
     */
    public function isPlayerOnline(string $serverIp, int $serverPort, string $playerName): bool {
        $resolver = new MinecraftQueryResolver($serverIp, $serverPort);
        $result = $resolver->getResult(true);
        $players = $result->getPlayersSample();
        if (!is_array($players)) {
            return false;
        }
        foreach ($players as $player) {
            if (isset($player['name']) && $player['name'] === $playerName) {
                return true;
            }
        }
        return false;
    }

    /**
     * Запускает игровую сессию для пользователя на указанном сервере.
     *
     * @param string $login Логин пользователя.
     * @param string $serverName Имя игрового сервера.
     * @return string JSON-ответ с результатом операции.
     */
    public function startGame(string $login, string $serverName): string {
        if (empty($login) || empty($serverName)) {
            return $this->respondWithError('Login and server name are required.');
        }

        try {
            return $this->runInTransaction(function() use ($login, $serverName) {
                $servers = $this->getUserData($login);
                if ($servers === null) {
                    throw new RuntimeException('User not found.');
                }

                $index = $this->findServerIndex($servers, $serverName);
                if ($index === null) {
                    $servers[] = [
                        'serverName'      => $serverName,
                        'totalTime'      => 0,
                        'startTimestamp' => 0,
                        'lastUpdated'    => 0,
                        'lastSession'    => 0,
                        'lastPlayed'     => 0
                    ];
                    $index = count($servers) - 1;
                }

                $currentTime = time();
                $servers[$index]['startTimestamp'] = $currentTime;
                $servers[$index]['lastUpdated']    = $currentTime;
                $servers[$index]['lastSession']    = 0;

                $this->updateUserData($login, $servers);

                return $this->respondWithSuccess('Game started successfully.', $servers);
            });
        } catch (Exception $ex) {
            return $this->respondWithError('Error starting game: ' . $ex->getMessage());
        }
    }

    /**
     * Обновляет время игры для активной сессии.
     * Если игрок онлайн, обновляется время с момента последнего обновления.
     * Если оффлайн – завершается сессия.
     *
     * @param string $login Логин пользователя.
     * @param string $serverName Имя игрового сервера.
     * @param string $host IP-адрес сервера.
     * @param int $port Порт сервера.
     * @param int $playTime Текущее время игры (в секундах), переданное клиентом.
     * @param int $additionalTimeSeconds Дополнительное время в секундах.
     * @return string JSON-ответ с результатом операции.
     */
    public function updateGameTime(
        string $login,
        string $serverName,
        string $host,
        int $port,
        int $playTime,
        int $additionalTimeSeconds = 0
    ): string {
        if (empty($login) || empty($serverName)) {
            return $this->respondWithError('Login and server name are required.');
        }

        try {
            return $this->runInTransaction(function() use ($login, $serverName, $host, $port, $playTime, $additionalTimeSeconds) {
                $servers = $this->getUserData($login);
                if ($servers === null) {
                    throw new RuntimeException('User not found.');
                }

                $index = $this->findServerIndex($servers, $serverName);
                if ($index === null) {
                    throw new RuntimeException('Server not found for user.');
                }

                $currentTime = time();
                $isOnline = $this->isPlayerOnline($host, $port, $login);
                $srv = &$servers[$index];

                if ($isOnline) {
                    $sessionTime = ($playTime > 0)
                        ? $playTime
                        : max(0, $currentTime - $srv['lastUpdated']);
                    $srv['totalTime']  += $sessionTime;
                    $srv['lastSession'] = $sessionTime;
                    $srv['lastUpdated'] = $currentTime;
                    if ($additionalTimeSeconds > 0) {
                        $srv['totalTime']  += $additionalTimeSeconds;
                        $srv['lastSession'] += $additionalTimeSeconds;
                    }
                } else {
                    if (!empty($srv['startTimestamp'])) {
                        $this->finishSession($srv, $currentTime, ($playTime > 0 ? $playTime : null));
                    }
                }

                $this->updateUserData($login, $servers);

                return $isOnline
                    ? $this->respondWithSuccess('Game time updated successfully.', $servers)
                    : $this->respondWithSuccess('Player is offline. Session finished.', $servers);
            });
        } catch (Exception $ex) {
            return $this->respondWithError('Error updating game time: ' . $ex->getMessage());
        }
    }

    /**
     * Завершает игровую сессию для пользователя на указанном сервере.
     *
     * @param string $login Логин пользователя.
     * @param string $serverName Имя игрового сервера.
     * @param int|null $playTime Длительность игры в секундах (необязательно).
     * @return string JSON-ответ с результатом операции.
     */
    public function finishGame(string $login, string $serverName, ?int $playTime = null): string {
        if (empty($login) || empty($serverName)) {
            return $this->respondWithError('Login and server name are required.');
        }

        try {
            return $this->runInTransaction(function() use ($login, $serverName, $playTime) {
                $servers = $this->getUserData($login);
                if ($servers === null) {
                    throw new RuntimeException('User not found.');
                }
                $index = $this->findServerIndex($servers, $serverName);
                if ($index === null) {
                    throw new RuntimeException('Server not found for user.');
                }
                $currentTime = time();
                $srv = &$servers[$index];
                $this->finishSession($srv, $currentTime, $playTime);

                $this->updateUserData($login, $servers);

                return $this->respondWithSuccess('Game finished successfully.', $servers);
            });
        } catch (Exception $ex) {
            return $this->respondWithError('Error finishing game: ' . $ex->getMessage());
        }
    }

    /**
     * Безопасная проверка на активную транзакцию.
     *
     * @return bool
     */
    private function inTransactionSafe(): bool {
        return method_exists($this->db, 'inTransaction') ? $this->db->inTransaction() : false;
    }

    /**
     * Закрывает сессию, обновляя totalTime и lastPlayed.
     *
     * @param array $srv Ссылка на данные сервера.
     * @param int $currentTime Текущее время.
     * @param int|null $playTime Время сессии (если передано).
     */
    private function finishSession(array &$srv, int $currentTime, ?int $playTime = null): void {
        $duration = $playTime ?? max(0, $currentTime - $srv['lastUpdated']);
        $srv['totalTime'] += $duration;
        $srv['lastSession'] = $duration;
        $srv['lastPlayed'] = $currentTime;
        $srv['startTimestamp'] = 0;
        $srv['lastUpdated'] = 0;
    }

    /**
     * Возвращает JSON-ответ для успешного выполнения операции.
     *
     * @param string $message Сообщение об успехе.
     * @param array  $servers Список серверов.
     * @return string JSON-ответ.
     */
    private function respondWithSuccess(string $message, array $servers = []): string {
        return json_encode([
            'status'  => 'success',
            'message' => $message,
            'data'    => $servers
        ], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Возвращает JSON-ответ для ошибки.
     *
     * @param string $message Сообщение об ошибке.
     * @return string JSON-ответ.
     */
    private function respondWithError(string $message): string {
        return json_encode([
            'status'  => 'error',
            'message' => $message
        ], JSON_UNESCAPED_UNICODE);
    }
}
