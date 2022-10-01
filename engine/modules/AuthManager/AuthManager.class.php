<?php
/*FoxesModule%>
{
	"version": "V 1.2.0 Alpha",
	"description": "Authorisation & Registration module"
}
<%FoxesModule*/

	if(!defined('FOXXEY')) {
		die("Hacking attempt!");
	} else {
		define('auth', true);
	}

	$authWrapper = new AuthManager($this->db, $this->logger);

	class AuthManager extends init {
		
		protected $db;
		protected $logger;
		private $dbShape = "";
		
		protected static $userToken = "userToken";
		
		function __construct($db, $logger){
			$this->db = $db;
			$this->logger = $logger;
			init::requireNestedClasses(basename(__FILE__), __DIR__."/classes/userUtilities/");
			$this->authActionsInit();
			$this->checkUserToken();	
		}
		
		private function authActionsInit(){
			init::requireNestedClasses(basename(__FILE__), __DIR__."/classes/actions/");
			if(!init::$usrArray['isLogged']) {
				$auth = new authorise(init::$REQUEST, $this->db, $this->logger);
				$reg = new register(init::$REQUEST, $this->db, $this->logger);
				$subscribe = new subscribe(init::$REQUEST, $this->db, $this->logger);
			}
				
			switch(@init::$REQUEST["userAction"]) {
					
				case 'auth':
					$auth->auth();
				break;
							
				case 'reg':
					$reg->register();
				break;
					
				case 'subscribe':
					$subscribe->subscribe();
				break;
					
				case 'logout':
					$this->logout();
				break;
			}
		}
		
		public static function updateSession($db) {
			init::requireNestedClasses(basename(__FILE__), __DIR__."/classes/userUtilities/");
			$loadUserInfo = new loadUserInfo(init::$usrArray['login'], $db);
			$userData = $loadUserInfo->userInfoArray();
			$sessionManager = new sessionManager($userData);
		}
		
		private function checkUserToken() {
			$username = "";
			if(isset($_COOKIE[self::$userToken])) {
				$token = functions::filterString($_COOKIE[self::$userToken]);
				$query = "SELECT login from `users` WHERE hash = '".$token."'";
				$username = $this->db->getValue($query);
				$auth = new authorise("", $this->db, $this->logger, $username);
			}
		}
		
		protected function logout(){
			global $lang;
			if(init::$usrArray["isLogged"] === true) {
				session_destroy();
				setcookie(self::$userToken, "", time() - 3600);
				functions::jsonAnswer($lang['loggedOut'], false);
			} else {
				functions::jsonAnswer("Cant logOut!", true);
			}
		}
	}