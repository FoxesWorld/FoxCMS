<?php


	class editProfile extends profile {
		
		function __construct($request, $db, $logger){
			if(!authorize::passVerify($request['password'], $_SESSION['password'])) {
				exit('{"message": "Неправильный пароль!", "type": "warn"}');
			}

			$query = "UPDATE `users` SET `email`='".$request['email']."', `realname`='".$request['realname']."' WHERE login = '".$request['login']."'";
			$status = $db->run($query);
			if($status == true){
				functions::jsonAnswer('Данные изменены!', false);
			}
		}
	}