<?php
/*FoxesModule%>
{
	"version": "V 1.0.0",
	"description": "Module for changing user settings"
}
<%FoxesModule*/
	if(!defined('FOXXEY')) {
		die("Hacking attempt!");
	} else {
		define('profile', true);
	}

	$User = new User($this->db, $this->logger);

		class User extends init {
			
			protected $db;
			protected $logger;
			protected static array $AnonymousUser;
			
			function __construct($db, $logger){
				$this->db = $db;
				$this->logger = $logger;
				if(!init::$usrArray['isLogged']) {
					require ("Anonymous.class.php");
					self::$AnonymousUser = Anonymous::$AnonymousUser;
				}
					require ('UserActions.class.php');
					$userActions = new UserActions($this->db, $this->logger, init::$REQUEST);
			}
		}