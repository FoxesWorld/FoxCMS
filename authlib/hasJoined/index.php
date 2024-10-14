<?php

header('Content-Type: application/json; charset=utf-8');
require('../config.php');
include('../database.php');

if (isset($_GET['username'], $_GET['serverId']) && strlen($_GET['serverId']) >= 40) {
    if (preg_match("/^[a-zA-Z0-9_-]+$/", $_GET['username']) && preg_match("/^[a-zA-Z0-9_-]+$/", $_GET['serverId'])) {
        new HasJoined($_GET['username'], $_GET['serverId']);
    } else {
        errorResponse('Bad login', 'Некорректные символы');
    }
} else {
    errorResponse('Bad login', 'Некорректные параметры');
}

class HasJoined
{
    private $textures = [];
    private $user;
    private $realUser;
    private $UUID;
    private $serverId;
    private $db;
    private $logger;

    public function __construct($user, $serverId)
    {
        global $config, $LOGGER;
        $this->logger = $LOGGER;
        $this->db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
        $this->user = $this->validateInput($user);
        $this->serverId = $this->validateInput($serverId);

        try {
            $this->getUserSession($this->user, $this->serverId);
            $this->userCheck();
        } catch (PDOException $pe) {
            logError($pe);
            exit($this->errorResponse('Database Error', 'Ошибка при соединении с базой данных'));
        } catch (Exception $e) {
            logError($e);
            exit($this->errorResponse('General Error', 'Произошла ошибка'));
        }
    }

    private function validateInput($string)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            exit($this->errorResponse('Bad login', 'Некорректные символы - ' . $string));
        }
        return $string;
    }

    private function getUserSession($inputUser, $inputServerId)
    {
        $stmt = $this->db->prepare("SELECT user, userMd5 FROM usersession WHERE user = :user AND serverId = :serverId");
        $stmt->bindValue(':user', $inputUser);
        $stmt->bindValue(':serverId', $inputServerId);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            exit($this->errorResponse("Bad login", "Пользователь не найден или неверный serverId"));
        }

        $this->realUser = $row['user'];
        $this->UUID = $row['userMd5'];
    }

    private function userCheck()
    {
        if ($this->user === $this->realUser) {
            $this->setUserTextures();
            $profileData = json_encode(self::getProfileData($this->UUID, $this->realUser, $this->textures), JSON_UNESCAPED_SLASHES);
            die($profileData);
        } else {
            exit($this->errorResponse("Bad login", "Неверный логин"));
        }
    }

    private function setUserTextures()
    {
        global $config;
        $userFolder = $_SERVER['DOCUMENT_ROOT'] . '/uploads/users/' . $this->realUser;
        $userDir = $config['skinUrl'] . $this->realUser;

        $this->setTextures('SKIN', file_exists("$userFolder/".md5($this->realUser)."-skin.png") ? "$userDir/".md5($this->realUser)."-skin.png" : $config['skinUrl'] . 'default_skin.png');
        if (file_exists("$userFolder/cape.png")) {
            $this->setTextures('CAPE', "$userDir/".md5($this->realUser)."-cape.png");
        }
    }

    public static function getProfileData($uuid, $username, $textures)
    {
        $property = [
            'timestamp' => time(),
            'profileId' => $uuid,
            'profileName' => $username,
            'textures' => $textures
        ];

        return [
            'id' => $uuid,
            'name' => $username,
            'properties' => [
                [
                    'name' => 'textures',
                    'value' => base64_encode(json_encode($property, JSON_UNESCAPED_SLASHES)),
                    'signature' => 'TEST'
                ]
            ]
        ];
    }

    private function errorResponse($title, $message)
    {
        return json_encode(['error' => $title, 'errorMessage' => $message]);
    }

    private function setTextures($type, $url)
    {
        $this->textures[$type] = ['url' => $url];
    }

    private function logError($exception)
    {
        error_log($exception->getMessage());
    }
}
