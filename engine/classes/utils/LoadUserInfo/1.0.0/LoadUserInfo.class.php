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
			$selector = new GenericSelector($db, 'users');
			$result = $selector->select(['login' => $login]);
			return $result[0] ?? [];
		} catch (\Throwable $e) {
			error_log("User fetch error: " . $e->getMessage());
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
