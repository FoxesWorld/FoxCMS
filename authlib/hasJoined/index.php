<?php

/*
=====================================================
 HasJoined | AuthLib
-----------------------------------------------------
 https://Foxesworld.ru/
-----------------------------------------------------
 Copyright (c) 2016-2021  FoxesWorld
-----------------------------------------------------
 This code is reserved
-----------------------------------------------------
 File: hasJoined.php
-----------------------------------------------------
 Version: 0.1.8 Alpha
-----------------------------------------------------
 Usage: UserJoin server
=====================================================
*/

header('Content-Type: application/json; charset=utf-8');
require('../config.php');
include('../database.php');

if (isset($_GET['username']) && isset($_GET['serverId']) && strlen($_GET['serverId']) >= 40) {
    if (preg_match("/^[a-zA-Z0-9_-]+$/", $_GET['username']) && preg_match("/^[a-zA-Z0-9_-]+$/", $_GET['serverId'])) {
        $hasJoined = new HasJoined($_GET['username'], $_GET['serverId']);
    } else {
        error_log("Invalid username or serverId format");
        exit(json_encode(['error' => 'Bad login', 'errorMessage' => 'Некорректные символы']));
    }
} else {
    error_log("Username or serverId not set or serverId length is insufficient");
    exit(json_encode(['error' => 'Bad login', 'errorMessage' => 'Некорректные параметры']));
}

class HasJoined
{
    private $debug;
    private $user;
    private $realUser;
    private $UUID;
    private $serverId;
    private $db;
    private $logger;

    public function __construct($user, $serverId, $debug = true)
    {
        global $config, $LOGGER;
        $this->logger = $LOGGER;
        $this->db = new db($config['db_user'], $config['db_pass'], $config['db_database']);

        $this->debug = $debug;
        $this->user = $this->pregMatch($user);
        $this->serverId = $this->pregMatch($serverId);

        try {
            $this->logger->WriteLine("Initialization complete: User - $this->user, ServerId - $this->serverId");
            $this->getUserSession($this->user, $this->serverId);
            $this->userCheck();
        } catch (PDOException $pe) {
            $this->logger->WriteLine("PDOException: " . $pe->getMessage());
            error_log('PDOException: ' . $pe->getMessage());
            exit($this->answerConstructor('Database Error', 'Ошибка при соединении с базой данных'));
        } catch (Exception $e) {
            $this->logger->WriteLine("Exception: " . $e->getMessage());
            error_log('Exception: ' . $e->getMessage());
            exit($this->answerConstructor('General Error', 'Произошла ошибка'));
        }
    }

    private function pregMatch($string)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            $this->logger->WriteLine("pregMatch failed for string: $string");
            exit($this->answerConstructor('Bad login', 'Некорректные символы - ' . $string));
        } else {
            if ($this->debug === true) {
                $this->logger->WriteLine("$string - passed pregMatch");
            }
            return $string;
        }
    }

    private function getUserSession($inputUser, $inputServerId)
    {
        $this->logger->WriteLine("Fetching user session for: User $inputUser, ServerId $inputServerId");

        $stmt = $this->db->prepare("SELECT * FROM usersession WHERE user= :user and serverId= :serverId");
        $stmt->bindValue(':user', $inputUser);
        $stmt->bindValue(':serverId', $inputServerId);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            $this->logger->WriteLine("No session found for: User - $inputUser, ServerId - $inputServerId");
            exit($this->answerConstructor("Bad login", "Пользователь не найден или неверный serverId"));
        }
        $this->realUser = $row['user'];
        $this->UUID = fun::getUserDataBy($this->db, "login", $this->realUser)['uuid'];
        $this->logger->WriteLine("Session found: User - $this->realUser, UUID - $this->UUID");
    }

    private function userCheck()
    {
        global $config;

        if ($this->user == $this->realUser) {
            $this->logger->WriteLine("User check passed: $this->user");

            $userFolder = $_SERVER['DOCUMENT_ROOT'] . '/uploads/users/' . $this->realUser;
            $cape = file_exists($userFolder . '/cape.png') ? ',
                "CAPE": {
                    "url":"' . $config['skinUrl'] . $this->realUser . '/cape.png"
                }' : '';

            $skin = file_exists($userFolder . '/skin.png') ? $config['skinUrl'] . $this->realUser . '/skin.png' : $config['skinUrl'] . 'skin.png';

            $base64 = '
                {
                    "timestamp":"' . CURRENT_TIME . '",
                    "profileId":"' . $this->UUID . '",
                    "profileName":"' . $this->realUser . '",
                    "textures":
                    {
                        "SKIN": {
                            "url":"' . $skin . '"
                        }' . $cape . '
                    }
                }';

            echo '
                {
                    "id":"' . $this->UUID . '",
                    "name":"' . $this->realUser . '",
                    "properties":
                    [
                        {
                            "name":"textures","value":"' . base64_encode($base64) . '","signature":""
                        }
                    ],
                    "profileActions" : [],
                    "legacy": true
                }';
				
			$this->logger->WriteLine("**======================**");	
        } else {
            $this->logger->WriteLine("User check failed: $this->user != $this->realUser");
            exit($this->answerConstructor("Bad login", "Неверный логин"));
        }
    }

    public function answerConstructor($title, $message)
    {
        $this->logger->WriteLine("Answer constructed: Title - $title, Message - $message");
        return json_encode(['error' => $title, 'errorMessage' => $message]);
    }
}
