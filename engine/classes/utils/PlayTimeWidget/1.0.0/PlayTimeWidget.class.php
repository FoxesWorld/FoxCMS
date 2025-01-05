<?php

class GameServerManager {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    private function getUserData($login) {
        $sql = "SELECT * FROM users WHERE login = :login";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':login' => $login]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    private function updateUserData($login, $userData) {
        $newUserData = json_encode($userData, JSON_UNESCAPED_UNICODE);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new RuntimeException('Failed to encode JSON: ' . json_last_error_msg());
        }
        $sql = "UPDATE users SET serversOnline = :serversOnline WHERE login = :login";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':serversOnline' => $newUserData,
            ':login' => $login
        ]);
    }

    public function startGame($login, $serverName, $playTimeHours) {
        try {
            if ($playTimeHours <= 0) {
                throw new InvalidArgumentException('Play time must be greater than zero.');
            }

            $data = $this->getUserData($login);
            if (!$data) {
                throw new Exception('User not found.');
            }

            $userData = json_decode($data['serversOnline'], true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new RuntimeException('Failed to decode JSON: ' . json_last_error_msg());
            }
            $userData = $userData ?: ['isPlaying' => false, 'servers' => []];

            $servers = &$userData['servers'];
            $serverExists = false;

            foreach ($servers as &$server) {
                if ($server['server'] === $serverName) {
                    $server['time'] += $playTimeHours;
                    $server['startTimeStamp'] = time();
                    $serverExists = true;
                    break;
                }
            }

            if (!$serverExists) {
                $servers[] = [
                    'server' => $serverName,
                    'time' => $playTimeHours,
                    'startTimeStamp' => time()
                ];
            }

            $userData['isPlaying'] = true;
            $this->updateUserData($login, $userData);
        } catch (Exception $e) {
            error_log($e->getMessage());
            throw $e;
        }
    }

    public function finishGame($login, $serverName, $playTimeHours) {
        try {
            if ($playTimeHours <= 0) {
                throw new InvalidArgumentException('Play time must be greater than zero.');
            }

            $data = $this->getUserData($login);
            if (!$data) {
                throw new Exception('User not found.');
            }

            $userData = json_decode($data['serversOnline'], true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new RuntimeException('Failed to decode JSON: ' . json_last_error_msg());
            }
            $userData = $userData ?: ['isPlaying' => false, 'servers' => []];

            $servers = &$userData['servers'];
            $serverExists = false;

            foreach ($servers as &$server) {
                if ($server['server'] === $serverName) {
                    $server['time'] += $playTimeHours;
                    if (isset($server['startTimeStamp'])) {
                        $server['lastSessionLength'] = time() - $server['startTimeStamp'];
                    } else {
                        $server['lastSessionLength'] = $playTimeHours * 3600;
                    }
                    $server['lastPlayed'] = time();
                    unset($server['startTimeStamp']);
                    $serverExists = true;
                    break;
                }
            }

            if (!$serverExists) {
                $servers[] = [
                    'server' => $serverName,
                    'time' => $playTimeHours,
                    'lastSessionLength' => $playTimeHours * 3600,
                    'lastPlayed' => time()
                ];
            }

            $userData['isPlaying'] = false;
            $this->updateUserData($login, $userData);
        } catch (Exception $e) {
            error_log($e->getMessage());
            throw $e;
        }
    }
}
