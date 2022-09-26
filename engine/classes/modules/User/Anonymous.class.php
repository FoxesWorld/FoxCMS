<?php

	class Anonymous extends User {
		
		protected static $AnonymousUser = array(
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
		
	}