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
			
			protected static $UserArray = array(
                'user_id' => 0,
                'email' => "foxengine@foxes.ru",
                'login' => "anonymous",
                'realname' => "",
                'hash' => "",
                'reg_date' => 1664055169,
                'last_date' => CURRENT_TIME,
                'password' => "",
                'user_group' => 5,
                'profilePhoto' => "avatar.jpg"
            );
			
			function __construct($db, $logger){
				$this->db = $db;
				$this->logger = $logger;
					require ('UserActions.class.php');
					$userActions = new UserActions($this->db, $this->logger, $_REQUEST);
			}
			
		}