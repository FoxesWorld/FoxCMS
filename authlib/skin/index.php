<?php
/*
=====================================================
Skins - you look nice today! | AuthLib
-----------------------------------------------------
https://arcjetsystems.ru/
-----------------------------------------------------
Copyright (c) 2016-2021 FoxesWorld
-----------------------------------------------------
This code is reserved
-----------------------------------------------------
File: skins.class.php
-----------------------------------------------------
version: 0.2.0 Alpha
-----------------------------------------------------
Usage: Parses skins & Cloaks
=====================================================
*/
header('Content-Type: application/json; charset=utf-8');

define('INCLUDE_CHECK', true);
define('CONFIG', true);

require('../config.php');
include('../database.php');

if (isset($_GET['user'])) {
    $skin = new Skin($_GET['user']);
} else {
    die('{"message": "No request!"}');
}

class Skin {
    private $realUser;
    private $textures = [];

    public function __construct($uuid)
    {
        global $config, $LOGGER;
        
        // Проверка длины UUID
        if (strlen($uuid) === 32) {
            try {
                $LOGGER->WriteLine("SkinLib is being created with **" . $uuid . "** UUID");
                $this->getRealUser($this->sanitizeInput($uuid));

                $userDir = $config['skinUrl'] . $this->realUser;

                // Проверка существования скина
                if (file_exists(ROOT_DIR . '/uploads/users/' . $this->realUser . '/'.md5($this->realUser).'-skin.png')) {
                    $this->setTextures('SKIN', $userDir . '/'.md5($this->realUser).'-skin.png');
                    $LOGGER->WriteLine("Custom skin found for user: {$this->realUser}");
                } else {
                    $this->setTextures('SKIN', $config['skinUrl'] . 'default_skin.png'); // Убедитесь, что здесь указан путь к дефолтному скину
                    $LOGGER->WriteLine("Default skin used for user: {$this->realUser}");
                }

                // Проверка существования капы
                if (file_exists(ROOT_DIR . '/uploads/users/' . $this->realUser . '/'.md5($this->realUser).'-cape.png')) {
                    $this->setTextures('CAPE', $userDir . '/'.md5($this->realUser).'-cape.png');
                    $LOGGER->WriteLine("Cape found for user: {$this->realUser}");
                }

                die(json_encode(self::getProfileData($uuid, $this->realUser, $this->textures), JSON_UNESCAPED_SLASHES));
            } catch (PDOException $pe) {
                $LOGGER->WriteLine("Database error: " . $pe->getMessage());
                http_response_code(500);
                die(json_encode(['error' => 'Database error']));
            }
        } else {
            $LOGGER->WriteLine("Length is not 32: " . $uuid);
            http_response_code(400);
            die(json_encode(['error' => 'Invalid UUID length']));
        }
    }
    
    public static function getProfileData($uuid, $username, $textures) {
        $property = [
            'timestamp' => time(),
            'profileId' => $uuid,
            'profileName' => $username,
            'signatureRequired' => false,
            'textures' => $textures
        ];

        $profile = [
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

        return $profile;
    }

    private function getRealUser($userMd5) {
        global $config, $LOGGER;
        $db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
        
        $stmt = $db->prepare("SELECT user FROM usersession WHERE userMd5 = :md5");
        $stmt->bindValue(':md5', $userMd5);
        
        try {
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($row) {
                $this->realUser = $row['user'];
                $LOGGER->WriteLine("Real user found: {$this->realUser}");
            } else {
				$this->setTextures('SKIN', $config['skinUrl'] . '/default_skin.png');
				//die(json_encode(self::getProfileData($userMd5, $this->realUser, $this->textures), JSON_UNESCAPED_SLASHES));
                //http_response_code(404);
                //die(json_encode(['error' => 'User not found']));
				exit;
            }
        } catch (PDOException $e) {
            $LOGGER->WriteLine("Database error: " . $e->getMessage());
            http_response_code(500);
            die(json_encode(['error' => 'Database error']));
        }
    }

    private function setTextures($type, $url) {
        $this->textures[$type] = ['url' => $url];
    }

    private function sanitizeInput($string) {
        if (!preg_match("/^[a-f0-9]{32}$/", $string)) {
            http_response_code(400);
            die(json_encode(['error' => 'Invalid input']));
        } else {
            return $string;
        }
    }
}
