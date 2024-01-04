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
 Version: 0.1.7 Alpha
-----------------------------------------------------
 Usage: UserJoin on server
=====================================================
*/

	require ('../config.php');
	include ("../database.php");

	if(isset($_GET['username']) && isset($_GET['serverId'])) {
		$hasJoined = new hasJoined($_GET['username'], $_GET['serverId']);
	}

	class hasJoined {
		
		private $debug;
		private $user;
		private $realUser;
		private $UUID;
		private $serverid;
		private $badLogin;
		private $db;
		
		function __construct($user, $serverid, $debug = false){
			global $config;
			$this->db = new db($config['db_user'],$config['db_pass'],$config['db_database']);
			try {
				$this->debug	= $debug;
				$this->user 	= $this->pregMatch($user);
				$this->serverid = $this->pregMatch($serverid);
				$this->getUserSession($this->user, $this->serverid);
				$this->userCheck();
			} catch(PDOException $pe) {
				die("Ошибка".$pe);
			}
		}
		
		private function pregMatch($String){
			if (!preg_match("/^[a-zA-Z0-9_-]+$/", $String)){
				exit($this->answerConstructor('Bad login','Левые символы в нике!'));
			} else {
				if($this->debug === true){
					echo $String.' - passed<br>';
				}
				return $String;
			}
		}

		private function getUserSession($inputUser, $inputServerId){
			global $config;
				$stmt = $this->db->prepare("SELECT user FROM usersession WHERE user= :user and serverId= :serverid");
				$stmt->bindValue(':user', $inputUser);
				$stmt->bindValue(':serverid', $inputServerId);
				$stmt->execute();
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				$this->realUser = $row['user'];
				$this->UUID  = fun::getUserDataBy($this->db, "login", $row['user'])['uuid'];
		}
		
		private function userCheck(){
			global $config, $LOGGER;

			if($this->user == $this->realUser)	{
				$userFolder = $_SERVER['DOCUMENT_ROOT'].'/uploads/users/'.$this->realUser;
				
				if (file_exists($userFolder.'/cape.png')) {
					$cape = 
						',
						"CAPE": {
							"url":"'.$config['skinUrl'].$this->realUser.'/cape.png"
						}';
				} else {
					$cape = '';
				}
				if(file_exists($userFolder.'/skin.png')) { $skin = $config['skinUrl'].$this->realUser.'/skin.png';} else { $skin = $config['skinUrl'].'skin.png';}
				$base64 ='
				{
					"timestamp":"'.CURRENT_TIME.'","profileId":"'.$this->UUID.'","profileName":"'.$this->realUser.'","textures":
					{
						"SKIN": {
							"url":"'.$skin.'"
						}'.$cape.'
					}
				}';
				$LOGGER->WriteLine($base64);
				echo '
				{
					"id":"'.$this->UUID.'","name":"'.$this->realUser.'","properties":
					[
						{
							"name":"textures","value":"'.base64_encode($base64).'","signature":"'.$config['letterHeadLine'].'"
						}
					]
				}';
				
			} else { 
				exit($this->answerConstructor("Bad login", "Bad login"));
			}
		}

		public function answerConstructor($title, $message){
			$answer = array('error' => $title,'errorMessage' => $message);

			return json_encode($answer);
		}
	}