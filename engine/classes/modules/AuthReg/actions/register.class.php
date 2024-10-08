<?php
if (!defined('auth')) {
    die('{"message": "Not in auth thread"}');
}

class Register extends AuthManager
{
    private $regData;
	private $errorArr = array();
    private $passminCount;
	private $maxLoginLength;
    private $baseUserGroup;
    private $error = false;
    protected $logger, $db;
    private $SAtoCheck = array('login', 'password', 'email');

    function __construct($input, $db, $logger)
    {
        global $lang, $config;
        if (@$input["userAction"] === "register") {
            $this->logger = $logger;
            $this->db = $db;
			$this->maxLoginLength = $config['register']['maxLoginLength'];
            $this->regData = functions::collectData($input, true);
        }
    }

    private function checkPass()
    {
        global $lang, $config;
		$this->baseUserGroup = $config['register']['baseUserGroup'];
		$this->passminCount = $config['register']['passminCount'];
        if (functions::FoxesStrlen($this->regData['password1']) >= $this->passminCount) {
            if (!preg_match("/[А-Яа-я]/", $this->regData['password1'])) {
                switch ($this->regData['password1']) {
                    case $this->regData['password2']:
                        break;

                    default:
                        functions::jsonAnswer($lang['passUnequals'], true);
                        break;
                }
            } else {
                functions::jsonAnswer($lang['passBadSyms'], true);
            }
        } else {
            functions::jsonAnswer($lang['passTooShort'] . functions::FoxesStrlen($this->regData['password1']), true);
        }
    }

    private function regGroup($code)
    {
        $query = "SELECT groupNum from regCodes WHERE code = '" . $code . "'";
        $baseUserGroup = @$this->db->getRow($query)['groupNum'];
        return $baseUserGroup ? $baseUserGroup : $this->baseUserGroup;
    }

    protected function register()
    {
        global $lang, $config;
        $not_allow_symbol = array("\x22", "\x60", "\t", '\n', '\r', "\n", "\r", '\\', ",", "/", "¬", "#", ";", ":", "~", "[", "]", "{", "}", ")", "(", "*", "^", "%", "$", "<", ">", "?", "!", '"', "'", " ", "&");
        foreach ($not_allow_symbol as $key) {
            if (strpos($this->regData['login'], $key)) {
				$this->setError("Bad symbols!1!1!", "warn");
            }
        }
		
		//die('{"message": "'.$this->maxLoginLength.' gg="}');
		if(strlen($this->regData['login']) > intval($this->maxLoginLength)) {
			$this->setError(strlen($this->regData['login']).' '.str_replace("%key%", $this->maxLoginLength, $lang['loginTooLong']), "warn");
		}
		
        $this->checkPass();
        if (!functions::checkExistingData($this->db, 'login', $this->regData['login']) === false) {
			$this->setError($lang['loginUsed'], "warn");
        }
		

        if ($this->regData['email'] != 'null') {
            if (!functions::checkExistingData($this->db, 'email', $this->regData['email']) === false) {
				$this->setError($lang['emailUsed'], "warn");
            }
        } else {
			$this->setError($lang['noEmail'], "warn");
        }

        if ($this->error === false) {
			init::classUtil('FoxMail', "1.0.0");
            functions::checkSA($this->regData, $this->SAtoCheck);
            $this->logger->WriteLine("Trying to register user '" . $this->regData['login'] . "'");
            $password = password_hash($this->regData['password1'], PASSWORD_DEFAULT);
            $photo = '/templates/' . $config['siteSettings']['siteTpl'] . '/assets/img/no-photo.jpg';
            $realname = $this->regData['realname'] ?? randTexts::getRandText('noName');
            $query = "INSERT INTO `users`(`login`, `uuid`, `password`, `email`, `user_group`, `realname`, `hash`, `reg_date`, `reg_ip`, `logged_ip`, `last_date`, `profilePhoto`) 
                VALUES ('" . $this->regData['login'] . "', '" . md5($this->regData['login']) . "', '" . $password . "', '" . $this->regData['email'] . "', '" . $this->regGroup(@$this->regData['regCode']) . "', '" . $realname . "', '" . authorize::generateLoginHash() . "', '" . CURRENT_TIME . "', '" . REMOTE_IP . "', '" . REMOTE_IP . "', '" . CURRENT_TIME . "', '" . $photo . "')";
            $userReg = $this->db->run($query);
            if ($userReg) {
                init::classUtil('GiveBadge', "1.0.0");
                $GiveBadge = new GiveBadge($this->db, $this->regData['login']);
                $GiveBadge->giveBadge("earlyUser");
                $loadUserInfo = new loadUserInfo($this->regData['login'], $this->db);
                $userData = $loadUserInfo->userInfoArray();
                $this->logger->WriteLine("User has completed registration '" . $this->regData['login'] . "'");
                $sessionManager = new sessionManager($userData);
                $foxMail = new foxMail(true);
                $foxMail->send($this->regData['email'], $lang['mail']['register'], "Логин ". $this->regData['login'] ." зарегистрирован! Добро пожаловать <3");
                functions::jsonAnswer($lang['regComplete'], false);
            }
        } else {
			exit('{"message": "'.$this->errorArr['message'].'", "type": "'.$this->errorArr['type'].'"}');
		}
    }
	
	private function setError($message, $type) {
		$this->errorArr['message'] = $message;
		$this->errorArr['type'] = $type;
        $this->error = true;
	}
}
