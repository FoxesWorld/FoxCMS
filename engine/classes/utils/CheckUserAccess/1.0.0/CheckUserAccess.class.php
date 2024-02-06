<?php 
if(!defined('FOXXEY')) {
	header( "HTTP/1.1 403 Forbidden" );
	header ( 'Location: /' );
	die( "Hacking attempt!" );
}

	class CheckUserAccess {
		
		public static function checkAccess($usergroup, $optionAccessGroup){
			switch(is_array($optionAccessGroup)){
				case true:
					if(in_array($usergroup, $optionAccessGroup)) {
						return true;
					}
					break;
						
					case false:
						if($usergroup == $optionAccessGroup || $optionAccessGroup === null){
							return true;
						}
					break;
			}
			return false;
		}
		
	}