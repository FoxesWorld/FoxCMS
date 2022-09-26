<?php

	if(!defined('FOXXEY')) {
		die("Hacking attempt!");
	} else {
		define('profile', true);
	}

	$User = new User($this->db, $this->logger);

		class User extends init {
			
			protected $db;
			protected $logger;
			protected static $AnonymousUser;
			
			function __construct($db, $logger){
				$this->db = $db;
				$this->logger = $logger;
				if(!init::$usrArray['isLogged']) {
					require ("Anonymous.class.php");
					self::$AnonymousUser = Anonymous::$AnonymousUser;
				}
					require ('UserActions.class.php');
					$userActions = new UserActions($this->db, $this->logger, $_REQUEST);
			}
			
		}