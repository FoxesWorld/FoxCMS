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

    private function checkServerExists($servers, $serverName) {
        foreach ($servers as $server) {
            if ($server['server'] == $serverName) {
                return true;
            }
        }
        return false;
    }

    public function startGame($login, $serverName, $playTimeHours) {
        try {
            $data = $this->getUserData($login);
            $userData = $data ? json_decode($data['serversOnline'], true) : ['isPlaying' => false, 'servers' => []];
            $servers = $userData['servers'];
            $serverExists = false;

            foreach ($servers as &$server) {
                if ($server['server'] == $serverName) {
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
            $userData['servers'] = $servers;

            $newUserData = json_encode($userData);

            $sql = "UPDATE users SET serversOnline = :serversOnline WHERE login = :login";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':serversOnline' => $newUserData,
                ':login' => $login
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function finishGame($login, $serverName, $playTimeHours) {
        try {
            $data = $this->getUserData($login);
            $userData = $data ? json_decode($data['serversOnline'], true) : ['isPlaying' => false, 'servers' => []];
            $servers = $userData['servers'];

            foreach ($servers as &$server) {
                if ($server['server'] == $serverName) {
                    $server['time'] += $playTimeHours;
                    if (isset($server['startTimeStamp'])) {
                        $server['lastSessionLength'] = time() - $server['startTimeStamp'];
                        $server['lastPlayed'] = time();
                    } else {
                        $server['lastSessionLength'] = 0;
                    }
                    unset($server['startTimeStamp']);
                    break;
                }
            }

            $userData['isPlaying'] = false;
            $userData['servers'] = $servers;

            $newUserData = json_encode($userData);

            $sql = "UPDATE users SET serversOnline = :serversOnline WHERE login = :login";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':serversOnline' => $newUserData,
                ':login' => $login
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }
}
