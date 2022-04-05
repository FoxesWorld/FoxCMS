<?php

	if(isset($_REQUEST['userAction'])){
		if(@$_REQUEST['key'] === $config['secureKey']) {
			$authWrapper = new authWrapper($_REQUEST, $db, $logger);
		} else {
			functions::jsonAnswer('Wrong secure key!', true);
		}
	}
	
	class authWrapper extends init {
		
		protected $db;
		protected $logger;
		
		function __construct($request, $db, $logger){
			$this->db = $db;
			$this->logger = $logger;
			require (dirname(__FILE__).'/auth/groupAssociacion.class.php');
			require(dirname(__FILE__).'/auth/sessionManager.class.php');
			switch($request["userAction"]){
						
				case 'auth':
					require (dirname(__FILE__).'/auth/auth.class.php');
					$auth = new auth($_POST, $db, $logger);
				break;
						
				case 'reg':
					require (dirname(__FILE__).'/auth/reg.class.php');
					$req = new reg($_REQUEST, $db, $logger);
				break; 
						
				default:
					functions::jsonAnswer('You shall not pass!', true);
				break;
				
			}
		}

	}