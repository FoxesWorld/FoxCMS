<?php

if (!defined('auth')) {
    die(json_encode(["message" => "Not in auth thread"]));
}

class Authorise extends AuthManager {
    
    private $authData = [];
    protected $db;
    protected $logger;
    
    /* INPUT */
    private $inputPassword;
    private $inputLogin;
    private $rememberMe;
    private $realPassword;
    
    public function __construct($input = "", $db, $logger, $authLogin = "") {
        $this->db = $db;
        $this->logger = $logger;

        if (isset($input["userAction"]) && $input["userAction"] === "auth") {
            if (!init::$usrArray['isLogged']) {
                if (is_array($input)) {
                    $this->authData = functions::collectData($input, true);
                    $this->inputPassword = $this->authData['password'] ?? null;
                    $this->inputLogin = $this->authData['login'] ?? null;
                    $this->rememberMe = $this->authData['rememberMe'] ?? false;
                    $this->realPassword = functions::getUserData($this->inputLogin, 'password', $db);
                }
            }
        } elseif (!empty($authLogin)) {
            $this->setUserdata($authLogin);
        }
    }
    
    protected function auth() {
        $antiBrute = new AntiBrute(REMOTE_IP, $this->db, false);

        if ($this->inputPassword && $this->realPassword && authorize::passVerify($this->inputPassword, $this->realPassword)) {
            $authQuery = $this->authQueries($this->inputLogin);
            
            if ($authQuery->type === "success") {
                $this->setUserdata($this->inputLogin);
                $this->setTokenIfNeeded($this->rememberMe, $this->inputLogin);
                $this->logger->WriteLine("{$this->inputLogin} successfully authorized from ".REMOTE_IP);
                $antiBrute->clearIp(REMOTE_IP);
                return true;
            } else {
                die($authQuery);
            }
        } else {
            $this->logger->WriteLine("{$this->inputLogin} failed authorization with password {$this->inputPassword}");
            $antiBrute->failedAuth(REMOTE_IP);
            return false;
        }
    }
    
    private function authQueries($login) {
        $updateData = [
            'last_date' => CURRENT_TIME,
            'hash' => authorize::generateLoginHash($login, 16),
            'logged_ip' => REMOTE_IP
        ];
        $response = init::$sqlQueryHandler->updateData('users', $updateData, 'login', $login);
        return json_decode($response);
    }
    
    private function setUserdata($login) {
        $loadUserInfo = new LoadUserInfo($login, $this->db);
        $userData = $loadUserInfo->userInfoArray();
        $sessionManager = new SessionManager($userData);

        init::$usrArray['isLogged'] = true;
        InitHelper::userArrFill($this->db);
    }
    
private function setTokenIfNeeded($checkbox, $login) {
    $token = authorize::generateLoginHash($login);

    if ($checkbox) {
        $cookieSet = setcookie(
            AuthManager::$userToken, 
            $token, 
            time() + (30 * 24 * 60 * 60), // 30 дней
            "/",
            "",
            isset($_SERVER["HTTPS"]),
            true
        );
        if (!$cookieSet) {
            $this->logger->WriteLine("Ошибка установки cookie для пользователя $login");
        }
    } else {
        setcookie(AuthManager::$userToken, "", time() - 3600, "/");
    }
    init::$sqlQueryHandler->updateData('users', ['token' => $token], 'login', $login);
}

}