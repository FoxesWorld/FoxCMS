<?php
/*
=====================================================
 Skins - you look nice today !| AuthLib
-----------------------------------------------------
 https://arcjetsystems.ru/
-----------------------------------------------------
 Copyright (c) 2016-2021  FoxesWorld
-----------------------------------------------------
 This code is reserved
-----------------------------------------------------
 File: skins.class.php
-----------------------------------------------------
 version: 0.1.8 WIP
-----------------------------------------------------
 Usage: Parses skins&Cloaks
=====================================================
*/

	header('Content-Type: text/html; charset=utf-8');
	define('INCLUDE_CHECK',true);
	define('CONFIG', true);
	require ('../config.php');
	include("../database.php");

	if(isset($_GET['user'])){
		$skin = new skin($_GET['user']);
	} else {
		die ("No request!");
	}

	class skin {

		private $md5User;
		private $skinUrl;
		private $cloakUrl;
		private $skinStatus;
		private $cloakStatus;
		private $realUser;
		private $skin;
		private $cloak;
		private $spl;

		function __construct($md5) {
			global $config, $LOGGER;
			$LOGGER->WriteLine("SkinLib===");
		try {
				$LOGGER->WriteLine("SkinLib is being created with ".$md5 ." UUID");
				$this->md5User = $this->pregMatch($md5);
				$this->getRealUser();
				$userDir = $config['skinUrl'].$this->realUser;
				$LOGGER->WriteLine("Getting profileData for ".$this->realUser);
				$this->skinUrl 	   = $userDir.'/skin.png';
				$this->cloakUrl    = $userDir.'/cape.png';
				$this->skinStatus  = file_exists($_SERVER['DOCUMENT_ROOT'].'/uploads/users/'.$this->realUser.'/skin.png');
				$this->cloakStatus = file_exists($_SERVER['DOCUMENT_ROOT'].'/uploads/users/'.$this->realUser.'/cape.png');
				
				$this->JSONoutput();
			} catch(PDOException $pe) {
				die($pe);
			}
		}

		private function getRealUser(){
			global $config;
			$db = new db($config['db_user'],$config['db_pass'],$config['db_database']);
			$stmt = $db->prepare("SELECT user FROM usersession WHERE userMd5= :md5");
			$stmt->bindValue(':md5', $this->md5User);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(@count($row) > 0 && @$row['user'] !== null){
				$this->realUser = $row['user'];
			} else {
				$this->realUser = "undefined";
			}
		}

		private function JSONoutput(){
			global $config, $LOGGER;
				if ($this->cloakStatus) {
					$LOGGER->WriteLine("Loading CLOAK ".$this->cloakUrl);
					$this->cloak = '"CAPE":{"url":"'.$this->cloakUrl.'"}';
				} else {
					$this->cloak = '';
				}

				if ($this->skinStatus) {
					$LOGGER->WriteLine("Loading SKIN ".$this->skinUrl);
					$this->skin ='"SKIN":{"url":"'.$this->skinUrl.'"}';
				} else {
					$this->skin ='"SKIN":{"url":"'.$config['skinUrl'].'undefined/skin.png"}';
				}

				if ($this->skinStatus && $this->cloakStatus) {
					$this->spl = ',';
				} else {
					$this->spl = '';
				}
				

				$base64 ='{"timestamp":"'.CURRENT_TIME.'","profileId":"'.$this->md5User.'","profileName":"'.$this->realUser.'","textures":{'.$this->skin.$this->spl.$this->cloak.'}}';
				echo '{"id":"'.$this->md5User.'","name":"'.$this->realUser.'","properties":[{"name":"textures","value":"'.base64_encode($base64).'","signature":"'.$config['letterHeadLine'].'"}]}';
		}

		private function pregMatch($String){
			if (!preg_match("/^[a-zA-Z0-9_-]+$/", $String)){
				exit;
			} else {
				return $String;
			}
		}
		
	}