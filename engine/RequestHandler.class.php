<?php

	class RequestHandler extends init {
		
		public static $REQUEST;

		function __construct($db) {
			if(count($_POST) > 0) {
				$thisRequest = $_POST;
				$this->updateUserOnline($db, init::$usrArray);
					@$keyCheck = self::checkSecureKey($thisRequest["key"]);
					if($keyCheck === true && $this->isSecure()){
						foreach($thisRequest as $key => $value){
							if($value) {
								self::$REQUEST[$key]  = $value;//functions::filterString($value);
							} else {
								self::$REQUEST[$key]  = functions::filterString("undefined");
							}
						}
					} else {
						die('{"message": "'.@$thisRequest["key"].' - Is a wrong secure key!"}');
					}
			}
		}
		
		public static function ipCheck(){
			if(init::$usrArray['logged_ip'] != REMOTE_IP) {
				AuthManager::logout();
			}
		}
		
		private function updateUserOnline($db, $usrArray){
			if($usrArray['isLogged']) {
				init::$sqlQueryHandler->updateData('users', array('last_date' => CURRENT_TIME), 'login', $usrArray['login']);
			}
		}
		
		protected static function checkSecureKey($key) {
			global $config, $jsCfg;
			if($config["keyCheck"]) {
				if(count($thisRequest["key"]) <= 0) {
					switch($key) {
						case "":
						case null:
							return false;

						default:
						if($key === $jsCfg['javascript']["secureKey"]){
								return true;
							} else {
								return false;
							}
					}
				} else {
					die('{"message": "No secure key!"}');
				}
			} else {
				return true;
			}
		}
		
		private function isSecure() {
			if( !empty( $_SERVER['HTTPS'] ) AND ( mb_strtolower( $_SERVER['HTTPS'] ) == 'on' or $_SERVER['HTTPS'] === '1' ) )
			{
				return TRUE;
			}
			else if( !empty( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) AND mb_strtolower( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) == 'https' )
			{
				return TRUE;
			}
			else if( !empty( $_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO'] ) AND mb_strtolower( $_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO'] ) == 'https' )
			{
				return TRUE;
			}
			else if ( !empty( $_SERVER['HTTP_X_FORWARDED_HTTPS'] ) AND mb_strtolower( $_SERVER['HTTP_X_FORWARDED_HTTPS'] ) == 'https' )
			{
				return TRUE;
			}
			else if( !empty( $_SERVER['HTTP_FRONT_END_HTTPS'] ) AND mb_strtolower( $_SERVER['HTTP_FRONT_END_HTTPS'] ) == 'on' )
			{
				return TRUE;
			}
			else if( !empty( $_SERVER['HTTP_SSLSESSIONID'] ) )
			{
				return TRUE;
			}

			return FALSE;
		}
		
	}
?>