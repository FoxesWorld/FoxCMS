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
<?php
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
        if (strlen($md5) === 32) {
            global $config, $LOGGER;

            $LOGGER->WriteLine("SkinLib===");

            try {
                $LOGGER->WriteLine("SkinLib is being created with " . $md5 . " UUID");

                $this->md5User = $this->sanitizeInput($md5);
                $this->getRealUser();

                $userDir = $config['skinUrl'] . $this->realUser;
                $this->setTextures('skin', $userDir . '/skin.png');
                $this->setTextures('cloak', $userDir . '/cape.png');

                $this->JSONoutput();
            } catch (PDOException $pe) {
                die($pe);
            }
        } else {
            $LOGGER->WriteLine("Length is not 32 " . $md5);
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

    private function sanitizeInput($string)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            exit;
        } else {
            return $string;
        }
    }
}
