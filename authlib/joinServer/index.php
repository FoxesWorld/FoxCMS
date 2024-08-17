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
 Версия: 1.1.8 Stable Alpha
-----------------------------------------------------
 Назначение: Проверка присоединения к серверу
=====================================================
*/
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] == 'POST' && stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
    require('../config.php');
    include('../database.php');
    $joinServer = new JoinServer(json_decode(file_get_contents('php://input'), true));
}

class JoinServer {

    private $requiredKeys = ["accessToken", "selectedProfile", "serverId"];
    private $sessionData = array();
    private $db;

    public function __construct($json)
    {
        global $config;

        try {
            $this->validateJson($json);
            $this->db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
            $this->validateSession();
            $this->updateSession();
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    private function validateJson($json)
    {
        if (!$json || !is_array($json)) {
			$this->throwException('InvalidArgumentException', 'Invalid JSON input. Expected a JSON object, but received: ' . json_encode($json));
        } else {
			foreach ($this->requiredKeys as $key) {
				if (empty($json[$key])) {
					$this->throwException('InvalidArgumentException', "Missing required key: '{$key}'. Received data: " . json_encode($json));
				} else {
					$this->sessionData[$key] = $json[$key];
				}
			}
		}
    }

    private function validateSession()
    {
        $stmt = $this->db->prepare("
            SELECT userMd5, passMd5, user 
            FROM usersession 
            WHERE userMd5 = :userMd5 
            AND accessToken = :accessToken
        ");
        $stmt->bindValue(':userMd5', $this->sessionData['selectedProfile']);
        $stmt->bindValue(':accessToken', $this->sessionData['accessToken']);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($stmt->rowCount() === 1) {
			if ($row['userMd5'] !== $this->sessionData['selectedProfile']) {
				$this->throwException('RuntimeException', "No matching session found for userMd5: '{$this->sessionData['selectedProfile']}'");
			} else {
				$this->sessionData = array_unique(array_merge($this->sessionData, $row));
			}
        } else {
			throw new RuntimeException(
                "Failed to find session. Query affected no rows. " .
                "Session data: " . json_encode($this->sessionData)
            );
		}        
    }

    private function updateSession()
    {
        $stmt = $this->db->prepare("
            UPDATE usersession
            SET serverId = :serverId 
            WHERE userMd5 = :userMd5
			AND passMd5 = :passMd5
            AND accessToken = :accessToken
        ");
        $stmt->bindValue(':userMd5', $this->sessionData['selectedProfile']);
		$stmt->bindValue(':passMd5', $this->sessionData['passMd5']);
        $stmt->bindValue(':accessToken', $this->sessionData['accessToken']);
        $stmt->bindValue(':serverId', $this->sessionData['serverId']);
        $stmt->execute();

        if ($stmt->rowCount() === 1) {
            die(json_encode(['id' => $this->sessionData['selectedProfile'], 'name' => $this->sessionData['user']]));
        } else {
			$this->throwException('RuntimeException', "Failed to update session. Query affected no rows.");
        }
    }

    private function handleError(Exception $e)
    {
        $errorDetails = [
            'error' => get_class($e),
            'errorMessage' => $e->getMessage(),
            'context' => [
                'sessionData' => $this->sessionData
            ]
        ];

        error_log(json_encode($errorDetails));
        exit(json_encode($errorDetails));
    }
	
	private function throwException($title, $desc){
		die('{"error": "'.$title.'", "errorMessage": "'.$desc.'"}');
	}
}
