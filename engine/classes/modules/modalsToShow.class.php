<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class modalsToShow {
		
		function __construct($logged, $notLogged){
			if(@!$_SESSION['isLogged']) {
				foreach($notLogged as $key => $value){
					$thisField = new modalConstructor($key, $value[0], $value[1], $value[2]);
					$thisField->mdlOut();
				}
			} else {
				foreach($logged as $key => $value){
					$thisField = new modalConstructor($key, $value[0], $value[1], $value[2], $_SESSION);
					$thisField->mdlOut();
				}
			}
		}
		
	}