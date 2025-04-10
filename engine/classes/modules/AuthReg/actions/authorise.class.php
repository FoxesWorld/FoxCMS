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
                    // Приводим значение "rememberMe" к булевому типу
                    $this->rememberMe = isset($this->authData['rememberMe']) && $this->authData['rememberMe'] ? true : false;
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
                $this->logger->WriteLine("{$this->inputLogin} successfully authorized from " . REMOTE_IP);
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
        // Здесь генерируем хеш фиксированной длины (например, 16 символов) для внутреннего использования
        $updateData = [
            'last_date' => CURRENT_TIME,
            'hash'      => authorize::generateLoginHash($login, 16),
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
    
    /**
     * Если пользователь выбрал "Запомнить меня", генерируется токен,
     * который устанавливается в cookie на 30 дней и сохраняется в базе.
     * Если флажок не выбран, то cookie удаляется, а значение токена в базе очищается.
     *
     * @param bool   $checkbox Флаг "Запомнить меня"
     * @param string $login    Логин пользователя
     */
	private function setTokenIfNeeded($checkbox, $login) {
		// Продолжительность действия токена (например, 365 дней)
		$tokenLifetime = 365 * 24 * 60 * 60;

		// Устанавливаем cookie-домен
		$cookieDomain = $_SERVER['HTTP_HOST'];
		
		// HTTPS проверка
		$isSecure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';

		if ($checkbox) {
			// Генерация нового токена
			$token = authorize::generateLoginHash($login);

			// Установка cookie со всеми флагами безопасности
			$cookieSet = setcookie(
				AuthManager::$userToken,
				$token,
				[
					'expires'  => time() + $tokenLifetime,
					'path'     => '/',
					'domain'   => $cookieDomain,
					'secure'   => $isSecure,
					'httponly' => true,
					'samesite' => 'Lax', // Или 'Strict', если не нужна кросс-сайтовая авторизация
				]
			);

			if (!$cookieSet) {
				$this->logger->WriteLine("Ошибка установки cookie для пользователя {$login}");
			}

			// Обновляем токен в базе
			init::$sqlQueryHandler->updateData('users', ['token' => $token], 'login', $login);

		} else {
			// Удаление cookie
			setcookie(
				AuthManager::$userToken,
				'',
				[
					'expires'  => time() - 3600,
					'path'     => '/',
					'domain'   => $cookieDomain,
					'secure'   => $isSecure,
					'httponly' => true,
					'samesite' => 'Lax',
				]
			);

			// Очистка токена в БД
			init::$sqlQueryHandler->updateData('users', ['token' => ''], 'login', $login);
		}
	}
}
