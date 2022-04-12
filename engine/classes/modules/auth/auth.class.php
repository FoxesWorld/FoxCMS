<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	if(isset($_REQUEST['userAction'])) {
		if(@$_REQUEST['key'] === $config['secureKey']) {
			$authWrapper = new authWrapper($_REQUEST, $this->db, $this->logger);
		} else {
			functions::jsonAnswer('Wrong secure key!', true);
		}
	} else {
		if(@!$_SESSION['isLogged']) {
			foreach($this->modalsUnlogged as $key => $value){
				$thisField = new modalConstructor($key, $value[0], $value[1], $value[2]);
				$thisField->mdlOut();
			}
		}
	}

	class authWrapper extends init {
		
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
		
		private $plMount = 'classes';
		
		function __construct($request, $db, $logger){
			$this->db = $db;
			$this->logger = $logger;
			$this->db->run($this->dbShape);
			require (dirname(__FILE__).'/classes/groupAssociacion.class.php');
			require(dirname(__FILE__).'/classes/sessionManager.class.php');
			switch($request["userAction"]){
						
				case 'auth':
					require (dirname(__FILE__).'/classes/auth.class.php');
					$auth = new auth($_POST, $this->db, $this->logger);
				break;
						
				case 'reg':
					require (dirname(__FILE__).'/classes/reg.class.php');
					$req = new reg($_REQUEST, $this->db, $this->logger);
				break;
				
				case 'subscribe':
					require (dirname(__FILE__).'/classes/subscribe.class.php');
					$subscribe = new subscribe($_REQUEST, $this->db, $this->logger);
					$subscribe->subscribe();
				break;
						
				default:
					functions::jsonAnswer('You shall not pass!', true);
				break;
				
			}
		}
		
	}