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
    private $md5User;
    private $realUser;
    private $textures = array();

    public function __construct($uuid)
    {
        if (strlen($uuid) === 32) {
            global $config, $LOGGER;

            try {
                $LOGGER->WriteLine("SkinLib is being created with " . $uuid . " UUID");

                $this->md5User = $this->sanitizeInput($uuid);
                $this->getRealUser();

                $userDir = $config['skinUrl'] . $this->realUser;
                $this->setTextures('SKIN', $userDir . '/skin.png');
                $this->setTextures('CAPE', $userDir . '/cape.png');
				die(json_encode(self::getProfileData($uuid, $this->realUser,$this->textures), JSON_UNESCAPED_SLASHES));
            } catch (PDOException $pe) {
                die($pe);
            }
        } else {
            $LOGGER->WriteLine("Length is not 32 " . $uuid);
        }
    }
	
	public static function getProfileData($uuid, $username, $textures) {

        $property = array(
            'timestamp' => time(),
            'profileId' => $uuid,
            'profileName' => $username,
            'textures' => $textures
        );

        $profile = array(
            'id' => $uuid,
            'name' => $username,
            'properties' => array(
                0 => array(
                    'name' => 'textures',
                    'value' => base64_encode(json_encode($property, JSON_UNESCAPED_SLASHES)),
                    'signature' => 'TEST' // Signature if needed
                )
            ),
			'legacy' => true
        );

        return $profile;
    }

    private function getRealUser() {
        global $config;
        $db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
        $stmt = $db->prepare("SELECT user FROM usersession WHERE userMd5 = :md5");
        $stmt->bindValue(':md5', $this->md5User);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->realUser = ($row && isset($row['user'])) ? $row['user'] : "undefined";
    }

    private function setTextures($type, $url) {
        $this->textures[$type] = ['url' => $url];
    }

    private function sanitizeInput($string) {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            exit;
        } else {
            return $string;
        }
    }
}
