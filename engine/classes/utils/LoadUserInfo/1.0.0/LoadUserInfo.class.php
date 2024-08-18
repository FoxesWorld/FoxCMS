<?php

class LoadUserInfo {

    private array $userInfoArray = [];
    
    public function __construct(string $login, \db $db) {
        if (empty($login)) {
            $this->jsonAnswer("Login not found!");
            return;
        }
        
        $this->userInfoArray = $this->fetchUserInfo($login, $db);
        $this->userInfoArray['isLogged'] = !empty($this->userInfoArray);
    }

    private function fetchUserInfo(string $login, \db $db): array {
        try {
            $query = "SELECT * FROM `users` WHERE login = :login";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':login', $login, \PDO::PARAM_STR);
            $stmt->execute();

            return $stmt->fetch(\PDO::FETCH_ASSOC) ?: [];
        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return [];
        }
    }

    public function userInfoArray(): array {
        return $this->userInfoArray;
    }

    private function jsonAnswer(string $message, bool $error = true): void {
        echo json_encode([
            'error' => $error,
            'message' => $message
        ], JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
        exit;
    }
}
