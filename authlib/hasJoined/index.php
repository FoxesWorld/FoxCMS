<?php

header('Content-Type: application/json; charset=utf-8');
require('../config.php');
include('../database.php');

// Проверка входных данных
//if (isset($_GET['username'], $_GET['serverId']) && 
//    preg_match("/^[a-zA-Z0-9_-]+$/", $_GET['username']) && 
//    preg_match("/^[a-zA-Z0-9_-]+$/", $_GET['serverId'])) {
    new HasJoined($_GET['username'], $_GET['serverId']);
//} else {
	//$this->logger->WriteLine("[INFO] Начата обработка для пользователя: {$user}");
    //errorResponse('Bad login', 'Некорректные параметры или символы');
//}

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

        $this->logger->WriteLine("[INFO] Начата обработка для пользователя: {$user}");
        
        $this->db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
        $this->user = $this->validateInput($user, "username");
        $this->serverId = $this->validateInput($serverId, "serverId");

        try {
            $this->getUserSession($this->user, $this->serverId);
            $this->userCheck();
        } catch (PDOException $pe) {
            $this->logError($pe, "Ошибка базы данных");
        } catch (Exception $e) {
            $this->logError($e, "Общая ошибка");
        }
    }

    private function validateInput($string, $fieldName)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) { //Whatt the HELL???
            $this->logger->WriteLine("[ERROR] Некорректные символы в {$fieldName}: {$string}");
           // exit($this->errorResponse('Bad login', "Некорректные символы в {$fieldName}: {$string}"));
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
            $this->logger->WriteLine("[WARN] Сессия не найдена для пользователя: {$inputUser}");
            exit($this->errorResponse("Bad login", "Пользователь не найден или неверный serverId"));
        }
		
		if($inputUser == $row['user']) {
			$this->realUser = $row['user'];
		} else {
			$this->logger->WriteLine("[WARN] Пользователь: {$inputUser} не равен: {$row['user']}");
			exit($this->errorResponse("Bad login", "Пользователь не соответствует сессии!"));
		}
		
        $this->UUID = $row['userMd5'];
        $this->logger->WriteLine("[INFO] Найден пользователь: {$this->realUser} (UUID: {$this->UUID})");
    }

    private function userCheck()
    {
        $this->logger->WriteLine("[INFO] Проверка пользователя: {$this->user}");
		$this->logger->WriteLine("[DEBUG] user -> **".$this->user."**  realUser -> **".$this->realUser."**");
        $this->setUserTextures();

        $profileData = json_encode(self::getProfileData($this->UUID, $this->realUser, $this->textures), JSON_UNESCAPED_SLASHES);
        die($profileData);
    }

    private function setUserTextures()
    {
        global $config;
        $userFolder = $_SERVER['DOCUMENT_ROOT'] . '/uploads/users/' . $this->realUser;
        $userDir = $config['skinUrl'] . $this->realUser;

        $this->setTextures('SKIN', file_exists("$userFolder/" . md5($this->realUser) . "-skin.png") 
            ? "$userDir/" . md5($this->realUser) . "-skin.png" 
            : $config['skinUrl'] . 'default_skin.png');

        if (file_exists("$userFolder/" . md5($this->realUser) . "-cape.png")) {
            $this->setTextures('CAPE', "$userDir/" . md5($this->realUser) . "-cape.png");
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
        $this->logger->WriteLine("[ERROR] {$title}: {$message}");
        return json_encode(['error' => $title, 'errorMessage' => $message]);
    }

    private function setTextures($type, $url)
    {
        $this->textures[$type] = ['url' => $url];
        $this->logger->WriteLine("[INFO] Установлен текстурный файл ({$type}): "); //{$url}
    }

    private function logError($exception, $context)
    {
        $this->logger->WriteLine("[ERROR] {$context}: " . $exception->getMessage());
        error_log($exception->getMessage());
        exit($this->errorResponse($context, $exception->getMessage()));
    }
}
