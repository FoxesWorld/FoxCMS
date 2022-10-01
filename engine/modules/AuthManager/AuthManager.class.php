<?php
/*FoxesModule%>
{
	"version": "V 1.0.1",
	"description": "Authorisation & Registration module"
}
<%FoxesModule*/
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
} else {
	define('auth', true);
}

	if(isset(init::$REQUEST['userAction'])) {
		$authWrapper = new AuthManager(init::$REQUEST, $this->db, $this->logger);
	}

	class AuthManager extends init {
		
		protected $db;
		protected $logger;
		private $dbShape = "CREATE TABLE IF NOT EXISTS `users` (
		  `user_id` int(8) NOT NULL,
		  `login` varchar(16) NOT NULL,
		  `password` varchar(128) NOT NULL,
		  `email` varchar(64) NOT NULL,
		  `user_group` int(4) NOT NULL,
		  `realname` varchar(32) NOT NULL,
		  `hash` varchar(64) NOT NULL,
		  `reg_date` varchar(32) NOT NULL,
		  `last_date` varchar(32) NOT NULL
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
		
		private $actionType;
		
		function __construct($request, $db, $logger){
			$this->requestInit($request);
			$this->db = $db;
			$this->logger = $logger;
			$this->db->run($this->dbShape);
			init::requireNestedClasses(basename(__FILE__), __DIR__."/classes/userUtilities/");
			$this->typeAction();
		}
		
		protected function requestInit($request){
			$this->actionType = $request["userAction"];
		}
		
		private function typeAction(){
			if(@$this->actionType) {
				init::requireNestedClasses(basename(__FILE__), __DIR__."/classes/actions/");
				switch($this->actionType){
					
					case 'auth':
						$auth = new authorise(init::$REQUEST, $this->db, $this->logger);
					break;
							
					case 'reg':
						$req = new register(init::$REQUEST, $this->db, $this->logger);
					break;
					
					case 'subscribe':
						$subscribe = new subscribe(init::$REQUEST, $this->db, $this->logger);
						$subscribe->subscribe();
					break;
							
					default:
					break;

				}
			}
		}
		
		public static function updateSession($db) {
			init::requireNestedClasses(basename(__FILE__), __DIR__."/classes/userUtilities/");
			$loadUserInfo = new loadUserInfo(init::$usrArray['login'], $db);
			$userData = $loadUserInfo->userInfoArray();
			$sessionManager = new sessionManager($userData);
		}
	}