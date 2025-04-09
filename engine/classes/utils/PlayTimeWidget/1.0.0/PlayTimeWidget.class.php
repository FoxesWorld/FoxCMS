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
     * Получает данные пользователя по логину.
     *
     * @param string $login Логин пользователя.
     * @return array|null Ассоциативный массив с данными пользователя или null, если не найден.
     */
    private function getUserData(string $login): ?array {
        $sql = "SELECT * FROM users WHERE login = :login";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':login' => $login]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Обновляет данные о времени игры для пользователя в базе.
     *
     * @param string $login Логин пользователя.
     * @param array  $userData Ассоциативный массив с данными о сессиях.
     * @throws RuntimeException Если не удаётся закодировать данные в JSON.
     */
    private function updateUserData(string $login, array $userData): void {
        $jsonData = json_encode($userData, JSON_UNESCAPED_UNICODE);
        if ($jsonData === false) {
            throw new RuntimeException('Failed to encode JSON: ' . json_last_error_msg());
        }
        $sql = "UPDATE users SET serversOnline = :serversOnline WHERE login = :login";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':serversOnline' => $jsonData,
            ':login'         => $login
        ]);
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
     * Декодирует JSON-строку с информацией о сессиях или возвращает стандартную структуру.
     *
     * @param string|null $serversOnline JSON-данные из БД.
     * @return array Ассоциативный массив с данными о сессиях.
     * @throws RuntimeException Если не удаётся декодировать JSON.
     */
    private function parseServersOnline(?string $serversOnline): array {
        if (empty($serversOnline)) {
            return [
                'isPlaying' => false,
                'playingOn' => '',
                'servers'   => []
            ];
        }
        $data = json_decode($serversOnline, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException('Failed to decode JSON: ' . json_last_error_msg());
        }
        // Если основные ключи отсутствуют, задаём их по умолчанию
        if (!isset($data['isPlaying'], $data['playingOn'], $data['servers'])) {
            $data = [
                'isPlaying' => false,
                'playingOn' => '',
                'servers'   => []
            ];
        }
        return $data;
    }

    /**
     * Завершает игровую сессию для конкретного сервера, вычисляя длительность сессии.
     * Все расчёты проводятся в секундах.
     *
     * @param array    &$serverData Ссылка на данные сессии для конкретного сервера.
     * @param int      $currentTime Текущее время (timestamp).
     * @param int|null $playTime Если задан, используется для расчёта длительности.
     */
    private function finishSession(array &$serverData, int $currentTime, ?int $playTime = null): void {
        if ($playTime === null && !empty($serverData['startTimestamp'])) {
            $playTime = $currentTime - $serverData['startTimestamp'];
        } elseif ($playTime === null) {
            $playTime = 0;
        }
        $serverData['lastSession'] = $playTime;
        $serverData['totalTime']   += $playTime;
        $serverData['lastPlayed']   = $currentTime;
        // Сброс времени начала сессии
        $serverData['startTimestamp'] = 0;
        $serverData['lastUpdated']    = $currentTime;
    }

    /**
     * Запускает игровую сессию для пользователя на указанном сервере.
     * Фиксируется время начала сессии и устанавливается глобальный статус игры.
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
                $userRow = $this->getUserData($login);
                if (!$userRow) {
                    throw new RuntimeException('User not found.');
                }
                $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);

                // Инициализируем данные для данного сервера, если они отсутствуют
                if (!isset($userData['servers'][$serverName])) {
                    $userData['servers'][$serverName] = [
                        'totalTime'      => 0,
                        'startTimestamp' => 0,
                        'lastUpdated'    => 0,
                        'lastSession'    => 0,
                        'lastPlayed'     => 0
                    ];
                }
                $currentTime = time();
                // Фиксируем время входа и устанавливаем статус онлайн
                $userData['servers'][$serverName]['startTimestamp'] = $currentTime;
                $userData['servers'][$serverName]['lastUpdated']    = $currentTime;
                $userData['servers'][$serverName]['lastSession']    = 0;

                $userData['isPlaying'] = true;
                $userData['playingOn'] = $serverName;

                $this->updateUserData($login, $userData);

                return $this->respondWithSuccess('Game started successfully.', $userData);
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
                $userRow = $this->getUserData($login);
                if (!$userRow) {
                    throw new RuntimeException('User not found.');
                }

                $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);
                if (!isset($userData['servers'][$serverName])) {
                    throw new RuntimeException('Server not found for user.');
                }

                $serverData = &$userData['servers'][$serverName];
                $currentTime = time();
                $isOnline = $this->isPlayerOnline($host, $port, $login);

                if ($isOnline) {
                    // Игрок онлайн: обновляем время сессии
                    $userData['isPlaying'] = true;
                    $userData['playingOn'] = $serverName;
                    $sessionTime = ($playTime > 0) 
                        ? $playTime 
                        : max(0, $currentTime - $serverData['lastUpdated']);
                    $serverData['totalTime']  += $sessionTime;
                    $serverData['lastSession'] = $sessionTime;
                    $serverData['lastUpdated'] = $currentTime;
                    if ($additionalTimeSeconds > 0) {
                        $serverData['totalTime']  += $additionalTimeSeconds;
                        $serverData['lastSession'] += $additionalTimeSeconds;
                    }
                } else {
                    // Игрок оффлайн: завершаем сессию, если она активна
                    if (!empty($serverData['startTimestamp'])) {
                        $this->finishSession($serverData, $currentTime, ($playTime > 0 ? $playTime : null));
                    }
                    $userData['isPlaying'] = false;
                    $userData['playingOn'] = '';
                }

                $this->updateUserData($login, $userData);

                return $isOnline
                    ? $this->respondWithSuccess('Game time updated successfully.', $userData)
                    : $this->respondWithSuccess('Player is offline. Session finished.', $userData);
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
                $userRow = $this->getUserData($login);
                if (!$userRow) {
                    throw new RuntimeException('User not found.');
                }
                $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);
                if (!isset($userData['servers'][$serverName])) {
                    throw new RuntimeException('Server not found for user.');
                }
                $serverData = &$userData['servers'][$serverName];
                $currentTime = time();
                $this->finishSession($serverData, $currentTime, $playTime);

                // Сброс глобального статуса игры
                $userData['isPlaying'] = false;
                $userData['playingOn'] = '';

                $this->updateUserData($login, $userData);

                return $this->respondWithSuccess('Game finished successfully.', $userData);
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
     * Возвращает JSON-ответ для успешного выполнения операции.
     *
     * @param string $message Сообщение об успехе.
     * @param array  $data Дополнительные данные.
     * @return string JSON-ответ.
     */
    private function respondWithSuccess(string $message, array $data = []): string {
        return json_encode([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data
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
    
    /**
     * Метод для проверки статуса игрока.
     * Отправляет запрос с параметрами:
     *   "sysRequest": "checkStatus",
     *   "login": <логин>,
     *   "serverIp": <IP сервера>,
     *   "serverPort": <Порт сервера>
     * Если игрок онлайн, возвращает данные с полем startTimestamp из БД (если найдена активная сессия),
     * иначе возвращает текущий timestamp.
     */
    public function checkStatus(): void {
        $login = @RequestHandler::$REQUEST["login"];
        $host = @RequestHandler::$REQUEST["serverIp"];
        $port = @RequestHandler::$REQUEST["serverPort"];

        if (!$login) {
            die(json_encode(["message" => "Invalid request: missing login"]));
        }

        // Проверяем статус через запрос к серверу
        $status = $this->isPlayerOnline($host, $port, $login);

        // Если онлайн, пытаемся извлечь startTimestamp из данных пользователя
        $startTimestamp = time(); // значение по умолчанию
        if ($status) {
            $userRow = $this->getUserData($login);
            if ($userRow) {
                $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);
                if (!empty($userData['isPlaying']) && !empty($userData['playingOn'])) {
                    $serverName = $userData['playingOn'];
                    if (isset($userData['servers'][$serverName]) && !empty($userData['servers'][$serverName]['startTimestamp'])) {
                        $startTimestamp = $userData['servers'][$serverName]['startTimestamp'];
                    }
                }
            }
            $response = [
                "message" => "Player status retrieved",
                "isPlaying" => true,
                "startTimestamp" => $startTimestamp
            ];
        } else {
            $response = [
                "message" => "Player is offline",
                "isPlaying" => false
            ];
        }
        die(json_encode($response, JSON_UNESCAPED_UNICODE));
    }
}
