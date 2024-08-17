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

if (isset($_GET['username']) && isset($_GET['serverId'])) {
    $hasJoined = new HasJoined($_GET['username'], $_GET['serverId']);
}

class HasJoined
{
    private $debug;
    private $user;
    private $realUser;
    private $UUID;
    private $serverId;
    private $db;

    public function __construct($user, $serverId, $debug = false)
    {
        global $config;
        $this->db = new db($config['db_user'], $config['db_pass'], $config['db_database']);

        $this->debug = $debug;
        $this->user = $this->pregMatch($user);
        $this->serverId = $this->pregMatch($serverId);

        try {
            $this->getUserSession($this->user, $this->serverId);
            $this->userCheck();
        } catch (PDOException $pe) {
            error_log('PDOException: ' . $pe->getMessage());
            die("Ошибка при соединении с базой данных");
        }
    }

    private function pregMatch($string)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            exit($this->answerConstructor('Bad login', 'Некорректные символы - '.$string));
        } else {
            if ($this->debug === true) {
                echo $string . ' - прошел проверку<br>';
            }
            return $string;
        }
    }

    private function getUserSession($inputUser, $inputServerId)
    {
        $stmt = $this->db->prepare("SELECT user FROM usersession WHERE user= :user and serverId= :serverId");
        $stmt->bindValue(':user', $inputUser);
        $stmt->bindValue(':serverId', $inputServerId);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            exit($this->answerConstructor("Bad login", "Пользователь не найден или неверный serverId"));
        }
        $this->realUser = $row['user'];
        $this->UUID = fun::getUserDataBy($this->db, "login", $this->realUser)['uuid'];
    }

    private function userCheck() {
        global $config, $LOGGER;

        if ($this->user == $this->realUser) {
            $userFolder = $_SERVER['DOCUMENT_ROOT'] . '/uploads/users/' . $this->realUser;

            $cape = file_exists($userFolder . '/cape.png') ? ',
						"CAPE": {
							"url":"' . $config['skinUrl'] . $this->realUser . '/cape.png"
						}' : '';

            $skin = file_exists($userFolder . '/skin.png') ? $config['skinUrl'] . $this->realUser . '/skin.png' : $config['skinUrl'] . 'skin.png';

            $base64 = '
				{
					"timestamp":"' . CURRENT_TIME . '","profileId":"' . $this->UUID . '","profileName":"' . $this->realUser . '","textures":
					{
						"SKIN": {
							"url":"' . $skin . '"
						}' . $cape . '
					}
				}';

            $LOGGER->WriteLine("User: $this->realUser | Base64: " . $base64);

            echo '
				{
					"id":"' . $this->UUID . '","name":"' . $this->realUser . '","properties":
					[
						{
							"name":"textures","value":"' . base64_encode($base64) . '","signature":""
						}
					]
				}';
        } else {
            exit($this->answerConstructor("Bad login", "Неверный логин"));
        }
    }

    public function answerConstructor($title, $message)
    {
        return json_encode(['error' => $title, 'errorMessage' => $message]);
    }
}