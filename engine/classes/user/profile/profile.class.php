<?php

	class profile {
		
		function __construct(){
			if($_SESSION['isLogged'] === true){
				foreach($_SESSION as $key => $value) {
					echo '<b>'.$key.'</b> - '.$value.'<br>';
				}
			}
		}
		
		private function logout(){
			session_destroy();
			header('Location: /');
		}
		
	}