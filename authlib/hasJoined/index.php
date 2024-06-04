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
 Usage: UserJoin on server
=====================================================
*/

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
            die("Ошибка" . $pe);
        }
    }

    private function pregMatch($string)
    {
        if (!preg_match("/^[a-zA-Z0-9_-]+$/", $string)) {
            exit($this->answerConstructor('Bad login', 'Левые символы в нике!'));
        } else {
            if ($this->debug === true) {
                echo $string . ' - passed<br>';
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
        $this->realUser = $row['user'];
        $this->UUID = fun::getUserDataBy($this->db, "login", $row['user'])['uuid'];
    }

    private function userCheck()
    {
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

            $LOGGER->WriteLine($base64);

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
            exit($this->answerConstructor("Bad login", "Bad login"));
        }
    }

    public function answerConstructor($title, $message)
    {
        $answer = array('error' => $title, 'errorMessage' => $message);

        return json_encode($answer);
    }
}