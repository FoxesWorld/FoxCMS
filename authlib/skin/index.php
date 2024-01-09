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
version: 0.1.9 Alpha
-----------------------------------------------------
Usage: Parses skins & Cloaks
=====================================================
*/

header('Content-Type: application/json; charset=utf-8');

// Constants
define('INCLUDE_CHECK', true);
define('CONFIG', true);

// Include necessary files
require('../config.php');
include('../database.php');

// Check if 'user' parameter is provided in the request
if (isset($_GET['user'])) {
    $skin = new Skin($_GET['user']);
} else {
    die('{"message": "No request!"}');
}

class Skin {
    // Class properties
    private $md5User;
    private $realUser;
    private $skinUrl;
    private $cloakUrl;
    private $skinStatus;
    private $cloakStatus;
    private $skin;
    private $cloak;
    private $spl;

    // Class constructor
    public function __construct($md5)
    {
        if (strlen($md5) === 32) {
            global $config, $LOGGER;

            // Logging
            $LOGGER->WriteLine("SkinLib===");

            try {
                $LOGGER->WriteLine("SkinLib is being created with " . $md5 . " UUID");

                // Sanitize input
                $this->md5User = $this->sanitizeInput($md5);

                // Get real user from the database
                $this->getRealUser();

                // Set skin and cloak URLs
                $userDir = $config['skinUrl'] . $this->realUser;
                $this->skinUrl = $userDir . '/skin.png';
                $this->cloakUrl = $userDir . '/cape.png';

                // Check status of skin and cloak files
                $this->skinStatus = file_exists($_SERVER['DOCUMENT_ROOT'] . '/uploads/users/' . $this->realUser . '/skin.png');
                $this->cloakStatus = file_exists($_SERVER['DOCUMENT_ROOT'] . '/uploads/users/' . $this->realUser . '/cape.png');

                // Output JSON
                $this->JSONoutput();
            } catch (PDOException $pe) {
                die($pe);
            }
        } else {
            $LOGGER->WriteLine("Length is not 32 " . $md5);
        }
    }

    // Get real user from the database
    private function getRealUser()
    {
        global $config;
        $db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
        $stmt = $db->prepare("SELECT user FROM usersession WHERE userMd5 = :md5");
        $stmt->bindValue(':md5', $this->md5User);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set real user or default to "undefined"
        $this->realUser = ($row && isset($row['user'])) ? $row['user'] : "undefined";
    }

    // Output JSON response
    private function JSONoutput()
    {
        global $config, $LOGGER;

        // Set cloak information
        $this->cloak = $this->cloakStatus ? '"CAPE":{"url":"' . $this->cloakUrl . '"}' : '';

        // Set skin information
        $this->skin = $this->skinStatus ? '"SKIN":{"url":"' . $this->skinUrl . '"}' :
            '"SKIN":{"url":"' . $config['skinUrl'] . 'undefined/skin.png"}';

        // Determine if there is a need for a comma separator
        $this->spl = ($this->skinStatus && $this->cloakStatus) ? ',' : '';

        // Create base64-encoded JSON
        $base64 = '{"timestamp":"' . CURRENT_TIME . '","profileId":"' . $this->md5User . '","profileName":"' . $this->realUser . '","textures":{' . $this->skin . $this->spl . $this->cloak . '}}';

        // Output JSON response
        echo '{"id":"' . $this->md5User . '","name":"' . $this->realUser . '","properties":[{"name":"textures","value":"' . base64_encode($base64) . '","signature":""}]}';
    }

    // Sanitize input to prevent potential security issues
    private function sanitizeInput($string)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            exit;
        } else {
            return $string;
        }
    }
}
