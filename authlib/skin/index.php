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
Error_Reporting(E_ALL);
Ini_Set('display_errors', true);
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
    private $textures = [];

    public function __construct($md5)
    {
        if (preg_match('/^[a-f0-9]{32}$/', $md5)) {
            global $config, $LOGGER;

            $LOGGER->WriteLine("SkinLib===");

            try {
                $LOGGER->WriteLine("SkinLib is being created with " . $md5 . " UUID");

                $this->md5User = $md5;
                $this->getRealUser();

                $userDir = $config['skinUrl'] . $this->realUser;
                $this->setTextures('skin', $userDir . '/skin.png');
                $this->setTextures('cloak', $userDir . '/cape.png');

                $this->JSONoutput();
            } catch (PDOException $pe) {
                die('{"error": "Database error", "message": "' . $pe->getMessage() . '"}');
            }
        } else {
            die('{"error": "Invalid input", "message": "Invalid MD5 hash"}');
        }
    }

    private function getRealUser()
    {
        global $config;
        $db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
        $stmt = $db->prepare("SELECT user FROM usersession WHERE userMd5 = :md5");
        $stmt->bindValue(':md5', $this->md5User);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->realUser = ($row && isset($row['user'])) ? $row['user'] : "undefined";
    }

    private function setTextures($type, $url)
    {
        $this->textures[$type] = ['url' => $url];
    }

    private function JSONoutput()
    {
        $texturesData = [
            'timestamp' => CURRENT_TIME,
            'profileId' => $this->md5User,
            'profileName' => $this->realUser,
            'textures' => $this->textures
        ];

        $base64 = json_encode($texturesData);
        echo '{"id":"' . $this->md5User . '","name":"' . $this->realUser . '","properties":[{"name":"textures","value":"' . base64_encode($base64) . '","signature":"FoxesCraft"}]}';
    }
}
?>
