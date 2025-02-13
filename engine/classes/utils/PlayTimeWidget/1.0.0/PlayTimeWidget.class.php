<?php
declare(strict_types=1);

/**
 * Class GameServerManager
 *
 * Управляет учётом времени онлайн на игровых серверах для пользователей.
 */
init::classUtil('McQuery', "1.0.0");	
use PHPMinecraft\MinecraftQuery\MinecraftQueryResolver;
class GameServerManager {	
    /**
     * @var object $db Объект подключения к базе данных.
     *             Должен поддерживать метод prepare(). Если доступны транзакции,
     *             то также должны быть реализованы методы beginTransaction(), commit() и rollBack().
     */
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
     * Обновляет данные о времени игры для пользователя.
     *
     * @param string $login Логин пользователя.
     * @param array  $userData Ассоциативный массив с данными о серверах.
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
	
	private function isPlayerOnline(string $serverIp, int $serverPort, string $playerName): bool{
		$resolver = new MinecraftQueryResolver($serverIp, $serverPort);
        $result = $resolver->getResult($tryOldQueryProtocolPre17 = true);
		foreach($result->getPlayersSample() as $key){
			if($key['name'] == $playerName) {
				return true;
			}
		}
		return false;
	}

    /**
     * Декодирует JSON-строку с информацией о серверах или возвращает стандартную структуру.
     *
     * @param string|null $serversOnline JSON-данные из БД.
     * @return array Ассоциативный массив с данными о состоянии игровых серверов.
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
     * Начинает игровую сессию для пользователя на указанном сервере.
     *
     * При запуске сессии устанавливаются время старта и время последнего обновления,
     * а также глобальный статус игры.
     *
     * @param string $login      Логин пользователя.
     * @param string $serverName Имя игрового сервера.
     * @return string JSON-ответ с результатом операции.
     */
    public function startGame(string $login, string $serverName): string {
        if (empty($login) || empty($serverName)) {
            return $this->respondWithError('Login and server name are required.');
        }

        // Если объект поддерживает транзакции, начинаем транзакцию
        $transactionSupported = method_exists($this->db, 'beginTransaction');
        if ($transactionSupported) {
            $this->db->beginTransaction();
        }

        try {
            $userRow = $this->getUserData($login);
            if (!$userRow) {
                if ($transactionSupported && method_exists($this->db, 'rollBack') && $this->inTransactionSafe()) {
                    $this->db->rollBack();
                }
                return $this->respondWithError('User not found.');
            }

            $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);

            // Если данных по серверу нет — инициализируем их
            if (!isset($userData['servers'][$serverName])) {
                $userData['servers'][$serverName] = [
                    'totalTime'      => 0,   // Общее время игры на сервере
                    'startTimestamp' => 0,   // Время начала текущей сессии
                    'lastUpdated'    => 0,   // Время последнего обновления
                    'lastSession'    => 0,   // Длительность завершённой сессии
                    'lastPlayed'     => 0    // Время окончания сессии
                ];
            }

            $currentTime = time();
            $userData['servers'][$serverName]['startTimestamp'] = $currentTime;
            $userData['servers'][$serverName]['lastUpdated']    = $currentTime;
            $userData['servers'][$serverName]['lastSession']    = 0;

            // Обновляем глобальный статус
            $userData['isPlaying'] = true;
            $userData['playingOn'] = $serverName;

            $this->updateUserData($login, $userData);

            if ($transactionSupported && method_exists($this->db, 'commit')) {
                $this->db->commit();
            }

            return $this->respondWithSuccess('Game started successfully.', $userData);
        } catch (Exception $ex) {
            if ($transactionSupported && method_exists($this->db, 'rollBack') && $this->inTransactionSafe()) {
                $this->db->rollBack();
            }
            return $this->respondWithError('Error starting game: ' . $ex->getMessage());
        }
    }

    /**
     * Обновляет время игры для активной сессии.
     *
     * Метод вычисляет прошедшее время с момента последнего обновления и добавляет его
     * к общему времени игры. При необходимости можно добавить дополнительное время.
     *
     * @param string          $login                 Логин пользователя.
     * @param string          $serverName            Имя игрового сервера.
     * @param int|string      $additionalTimeSeconds Дополнительное время в секундах.
     *                                                Если передана строка, то она будет приведена к int.
     * @return string JSON-ответ с результатом операции.
     */
public function updateGameTime(string $login, string $serverName, string $host, int $port, int $playTime, $additionalTimeSeconds = 0): string {
    if (empty($login) || empty($serverName)) {
        return $this->respondWithError('Login and server name are required.');
    }
    
    $transactionSupported = method_exists($this->db, 'beginTransaction');
    if ($transactionSupported) {
        $this->db->beginTransaction();
    }
    
    try {
        $userRow = $this->getUserData($login);
        if (!$userRow) {
            if ($transactionSupported && $this->inTransactionSafe()) {
                $this->db->rollBack();
            }
            return $this->respondWithError('User not found.');
        }
        
        $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);
        if (!isset($userData['servers'][$serverName])) {
            if ($transactionSupported && $this->inTransactionSafe()) {
                $this->db->rollBack();
            }
            return $this->respondWithError('Server not found for user.');
        }
        
        $serverData = &$userData['servers'][$serverName];
        $isOnline    = $this->isPlayerOnline($host, $port, $login);
        $currentTime = time();
        
        if ($isOnline) {
			$userData['isPlaying'] = true;
            $userData['playingOn'] = $serverName;
            $sessionTime = ($playTime > 0) 
                ? $playTime 
                : max(0, $currentTime - $serverData['lastUpdated']);
            
            $serverData['totalTime']   += $sessionTime;
            $serverData['lastSession']  = $sessionTime;
            $serverData['lastUpdated']  = $currentTime;
            
            $additionalTimeSeconds = (int)$additionalTimeSeconds;
            if ($additionalTimeSeconds > 0) {
                $serverData['totalTime']  += $additionalTimeSeconds;
                $serverData['lastSession'] += $additionalTimeSeconds;
            }
        } else {
            $userData['isPlaying'] = false;
            $userData['playingOn'] = '';
        }
        
        $this->updateUserData($login, $userData);
        
        if ($transactionSupported && method_exists($this->db, 'commit')) {
            $this->db->commit();
        }
        
        return $isOnline
            ? $this->respondWithSuccess('Game time updated successfully.', $userData)
            : $this->respondWithError('Player is not online');
    } catch (Exception $ex) {
        if ($transactionSupported && $this->inTransactionSafe()) {
            $this->db->rollBack();
        }
        return $this->respondWithError('Error updating game time: ' . $ex->getMessage());
    }
}


    /**
     * Завершает игровую сессию и обновляет итоговое время игры.
     *
     * Если длительность сессии не передана, она вычисляется как разница между
     * текущим временем и временем начала сессии.
     *
     * @param string      $login      Логин пользователя.
     * @param string      $serverName Имя игрового сервера.
     * @param int|null    $playTime   Длительность игры в секундах (необязательно).
     * @return string JSON-ответ с результатом операции.
     */
    public function finishGame(string $login, string $serverName, ?int $playTime = null): string {
        if (empty($login) || empty($serverName)) {
            return $this->respondWithError('Login and server name are required.');
        }

        $transactionSupported = method_exists($this->db, 'beginTransaction');
        if ($transactionSupported) {
            $this->db->beginTransaction();
        }

        try {
            $userRow = $this->getUserData($login);
            if (!$userRow) {
                if ($transactionSupported && method_exists($this->db, 'rollBack') && $this->inTransactionSafe()) {
                    $this->db->rollBack();
                }
                return $this->respondWithError('User not found.');
            }

            $userData = $this->parseServersOnline($userRow['serversOnline'] ?? null);

            if (!isset($userData['servers'][$serverName])) {
                if ($transactionSupported && method_exists($this->db, 'rollBack') && $this->inTransactionSafe()) {
                    $this->db->rollBack();
                }
                return $this->respondWithError('Server not found for user.');
            }

            $serverData = &$userData['servers'][$serverName];
            $currentTime = time();

            // Если длительность сессии не передана, вычисляем её автоматически
            if ($playTime === null) {
                $playTime = !empty($serverData['startTimestamp'])
                    ? $currentTime - $serverData['startTimestamp']
                    : 0;
            }

            $serverData['lastSession'] = $playTime;
            $serverData['totalTime']  += $playTime;
            $serverData['lastPlayed']  = $currentTime;

            // Сбрасываем время начала сессии, так как игра завершена
            $serverData['startTimestamp'] = 0;
            $serverData['lastUpdated']    = $currentTime;

            // Сбрасываем глобальный статус игры
            $userData['isPlaying'] = false;
            $userData['playingOn'] = '';

            $this->updateUserData($login, $userData);

            if ($transactionSupported && method_exists($this->db, 'commit')) {
                $this->db->commit();
            }

            return $this->respondWithSuccess('Game finished successfully.', $userData);
        } catch (Exception $ex) {
            if ($transactionSupported && method_exists($this->db, 'rollBack') && $this->inTransactionSafe()) {
                $this->db->rollBack();
            }
            return $this->respondWithError('Error finishing game: ' . $ex->getMessage());
        }
    }

    /**
     * Безопасная проверка на активную транзакцию.
     *
     * Если метод inTransaction() отсутствует, возвращается false.
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
     * @param array  $data    Дополнительные данные.
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
}
