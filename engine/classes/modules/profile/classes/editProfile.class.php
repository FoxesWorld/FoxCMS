<?php


	class editProfile extends profile {
		
		function __construct($request, $db, $logger){
			if(@$request['password'] !== "null") {
				
				if(!authorize::passVerify(@$request['password'], init::$usrArray['password'])) {
					exit('{"message": "Неправильный пароль!", "type": "warn"}');
				}

				$query = "UPDATE `users` SET `email`='".$request['email']."', `realname`='".$request['realname']."' WHERE login = '".init::$usrArray['login']."'";
				$status = $db->run($query);
				if($status == true){
					require(MODULES_DIR.'AuthManager/classes/utilsLoader.class.php');
					$utilsLoader = new utilsLoader;
					$loadUserInfo = new loadUserInfo(init::$usrArray['login'], $db);
					$userData = $loadUserInfo->userInfoArray();
					$sessionManager = new sessionManager($userData);
					functions::jsonAnswer('Данные изменены!', false);
				}
			}
		}
	}