<?php

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
		
		private $plMount = 'classes';
		
		function __construct($request, $db, $logger){
			$this->db = $db;
			$this->logger = $logger;
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
						
				default:
					functions::jsonAnswer('You shall not pass!', true);
				break;
				
			}
		}
		
	}