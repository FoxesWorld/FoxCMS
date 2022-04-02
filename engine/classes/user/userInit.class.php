<?php

	class userInit extends init {
		
		function __construct() {
				switch(@$_SESSION['isLogged']){
					case true:
						init::libFilesInclude(ENGINE_DIR.'/classes/user/profile', false);
						$profile = new profile();
						init::$profileBlock = $profile->profileOut();
					break;
					
					default:
						$loginField = new modalConstructor("login", "Авторизация", "Что бы на сайт войти логин и пароль нам нужно ввести", "%file:=auth");
						echo $loginField->mdlOut();
						
						$regField = new modalConstructor("reg", "Регистрация", "Регистрируйтесь пожалуйста", "%file:=reg");
						echo $regField->mdlOut();
					break;
					
				}
		}
		
	}