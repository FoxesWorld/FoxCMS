<?php
/*
=====================================================
 Have you joined or not? - joinServer | AuthLib
-----------------------------------------------------
 https://arcjetsystems.ru/
-----------------------------------------------------
 Copyright (c) 2016-2020  FoxesWorld
-----------------------------------------------------
 Данный код защищен авторскими правами
-----------------------------------------------------
 Файл: joinServer.php
-----------------------------------------------------
 Версия: 1.0.6 Stable Alpha
-----------------------------------------------------
 Назначение: Проверка присоединения к серверу
=====================================================
*/

	if (($_SERVER['REQUEST_METHOD'] == 'POST') && (stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0)) {
		require ('../config.php');
		include("../database.php");
		$joinServer = new JoinServer(json_decode(file_get_contents('php://input'), true));
	}

class JoinServer {

	private $bad = array('error' => "Bad login",'errorMessage' => "Bad login");
	private $selectData = array("accessToken", "selectedProfile", "serverId");
	private $sessData = array();
	private $db;
	
	function __construct($json){
		global $config;
		
		try {
		if(isset($json)) {
			$this->db = new db($config['db_user'],$config['db_pass'],$config['db_database']);
			foreach($json as $key => $value){
				if (!isset($json[$key]) && !preg_match("/^[a-zA-Z0-9_-]+$/", $json[$key])) { 
				$this->db->jsonError('IllegalArgumentException', 'Invalid '.$key);
				}else {
					$this->sessData[$key] = $value;
				}
			}
		}
		
			$stmt = $this->db->prepare("SELECT userMd5,user FROM usersession WHERE userMd5 = :userMd5 AND accessToken = :accessToken");
			$stmt->bindValue(':userMd5', $this->sessData['selectedProfile']);
			$stmt->bindValue(':accessToken', $this->sessData['accessToken']);

			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$realmd5  = $row['userMd5'];
			$realUser = $row['user'];
			
			if($realmd5 === $this->sessData['selectedProfile']){// && $stmt->rowCount() == 1) {
				$stmt = $this->db->prepare("UPDATE usersession SET serverId = :serverid WHERE userMd5 = :userMd5 AND accessToken = :accessToken");
				$stmt->bindValue(':userMd5', $this->sessData['selectedProfile']);
				$stmt->bindValue(':accessToken', $this->sessData['accessToken']);
				$stmt->bindValue(':serverid', $this->sessData['serverId']);
				$stmt->execute();
					if($stmt->rowCount() === 1) {
						die(json_encode(array('id' => $realmd5, 'name' => $realUser)));
					} else {
						exit(json_encode($this->bad));
					}
			} else {
				exit(json_encode($this->bad));
			}
		} catch(PDOException $pe) {
			$query = strval($e->queryString);
			die(display_error($e->getMessage(), $pe, $query));
		}
	}
} 