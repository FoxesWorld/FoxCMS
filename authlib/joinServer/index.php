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
    private $logger;

    public function __construct($json) {
        global $config, $LOGGER;
        $this->logger = $LOGGER;
        $this->logger->WriteLine("**JoinServer constructor called**");
        
        try {
            $this->validateJson($json);
            $this->db = new db($config['db_user'], $config['db_pass'], $config['db_database']);
            $this->logger->WriteLine("Database connection established");
            
            if($this->validateSession()) {
                $this->logger->WriteLine("Session validated successfully");
                $this->updateSession();
            } else {
                $this->logger->WriteLine("Session validation failed");
            }
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    private function validateJson($json) : void {
        //$this->logger->WriteLine("Validating JSON input: " . json_encode($json));
        
        if (!$json || !is_array($json)) {
            $this->throwException('InvalidArgumentException', 'Invalid JSON input. Expected a JSON object, but received: ' . json_encode($json));
        } else {
            foreach ($this->requiredKeys as $key) {
                if (empty($json[$key])) {
                    $this->throwException('InvalidArgumentException', "Missing required key: '{$key}'. Received data: " . json_encode($json));
                } else {
                    switch($key) {
                        case "accessToken":
                        case "selectedProfile":
                            if(strlen($json[$key]) !== 32) {
                                $this->throwException('InvalidArgumentException', $key." has wrong length (".strlen($json[$key]).")");
                            }
                            break;
                        
                        case "serverId":
                            if(strlen($json[$key]) > 0) {
                                if(strlen($json[$key]) < 39 || strlen($json[$key]) > 41) {
                                    $this->throwException('InvalidArgumentException', "serverId has wrong length!");
                                }
                            }
                            break;
                    }
                    $this->sessionData[$key] = $json[$key];
                }
            }
        }
    }

    private function validateSession() : bool {
        $this->logger->WriteLine("Validating session for userMd5: " . $this->sessionData['selectedProfile']);
        
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
                //$this->logger->WriteLine("Session data merged: " . json_encode($this->sessionData));
            }
            return true;
        } else {
            $this->logger->WriteLine("No session found for userMd5: " . $this->sessionData['selectedProfile']);
            return false;
        }
    }

    private function updateSession() : void {
        $this->logger->WriteLine("Updating session for userMd5: " . $this->sessionData['selectedProfile']);
        
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
            $this->logger->WriteLine("Session updated successfully for userMd5: " . $this->sessionData['selectedProfile']);
            die(json_encode(['id' => $this->sessionData['selectedProfile'], 'name' => $this->sessionData['user']]));
        } else {
            $this->throwException('RuntimeException', "Failed to update session. Query affected no rows.");
        }
    }

    private function handleError(Exception $e) : void {
        $errorDetails = [
            'error' => get_class($e),
            'errorMessage' => $e->getMessage(),
            'context' => [
                'sessionData' => $this->sessionData
            ]
        ];

        $this->logger->WriteLine("Error occurred: " . json_encode($errorDetails));
        error_log(json_encode($errorDetails));
        exit(json_encode($errorDetails));
    }
    
    private function throwException($title, $desc) : void {
        $error = '{"error": "'.$title.'", "errorMessage": "'.$desc.'"}';
        $this->logger->WriteLine($error);
        die($error);
    }
}