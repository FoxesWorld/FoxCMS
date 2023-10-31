<?php
/*FoxesModule%>
{
	"version": "V 1.4.0 Beta",
	"description": "Authorisation & Registration module",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABMWlDQ1BBZG9iZSBSR0IgKDE5OTgpAAAoz62OsUrDUBRAz4ui4lArBHFweJMoKLbqYMakLUUQrNUhydakoUppEl5e1X6Eo1sHF3e/wMlRcFD8Av9AcergECGDgwie6dzD5XLBqNh1p2GUYRBr1W460vV8OfvEDFMA0Amz1G61DgDiJI74wecrAuB50647Df7GfJgqDUyA7W6UhSAqQP9CpxrEGDCDfqpB3AGmOmnXQDwApV7uL0ApyP0NKCnX80F8AGbP9Xww5gAzyH0FMHV0qQFqSTpSZ71TLauWZUm7mwSRPB5lOhpkcj8OE5UmqqOjLpD/B8BivthuOnKtall76/wzrufL3N6PEIBYeixaQThU598qjJ3f5+LGeBkOb2F6UrTdK7jZgIXroq1WobwF9+MvwMZP/U6/OGUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAZmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwNiA3OS4xNjQ3NTMsIDIwMjEvMDIvMTUtMTE6NTI6MTMgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTAtMDJUMTM6NDA6NDMrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTAtMDJUMTM6NDA6NDMrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTEwLTAyVDEzOjQwOjQzKzAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1YjYzN2E1LTgxMTYtNGI0Mi1hZjk0LTAwZjhhNDg4ZDE3OSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjJlOWE5MmFjLWNiYzItZTY0Zi1hNjVkLWI1MTFiMzIxOGU1MiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQwYTY0NDQ1LTBlNzYtODQ0ZC1hMDA0LTY5NTMzNTZhYzJkMCIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQwYTY0NDQ1LTBlNzYtODQ0ZC1hMDA0LTY5NTMzNTZhYzJkMCIgc3RFdnQ6d2hlbj0iMjAyMi0xMC0wMlQxMzo0MDo0MyswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozNWI2MzdhNS04MTE2LTRiNDItYWY5NC0wMGY4YTQ4OGQxNzkiIHN0RXZ0OndoZW49IjIwMjItMTAtMDJUMTM6NDA6NDMrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBo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"
}
<%FoxesModule*/

	if(!defined('FOXXEY')) {
		die("Hacking attempt!");
	} else {
		define('auth', true);
	}

	$authWrapper = new AuthManager($this->db, $this->logger);

	class AuthManager extends init {
		
		protected $db;
		protected $logger;
		private $dbShape = "";
		private $moduleName;
		private $requestListener = "userAction";
		protected static $userToken = "userToken";
		protected static $usrArray = array(
			'isLogged' => false,
			'user_id' => 0,
			'email' => "admin@foxesworld.ru",
			'login' => "anonymous",
			'realname' => "",
			'hash' => "",
			'reg_date' => 1664055169,
			'last_date' => CURRENT_TIME,
			'logged_ip' => REMOTE_IP,
			'password' => "",
			'user_group' => 5,
			'profilePhoto' => UPLOADS_DIR.USR_SUBFOLDER."anonymous/avatar.jpg"
		);
		
		function __construct($db, $logger) {
			$this->db = $db;
			$this->logger = $logger;
			$this->moduleName = basename(__FILE__, '.class.php');
			init::classUtil('LoadUserInfo', "1.0.0");
			init::classUtil('SessionManager', "1.0.0");
			init::requireNestedClasses($this->moduleName, __DIR__."/actions/");
			self::$usrArray['realname'] = randTexts::getRandText('noName');	
			self::checkUserToken($db, $logger);
			$this->authActionsInit(RequestHandler::$REQUEST);	
		}
		
		private function authActionsInit($request){
			global $lang;
				
			if(!RequestHandler::$usrArray['isLogged']) {
				$auth = new authorise($request, $this->db, $this->logger);
				
			} else {
				RequestHandler::ipCheck();
			}
			switch(@$request[$this->requestListener]) {	
				case 'auth':
					@$authorisationStatus = $auth->auth();
					switch($authorisationStatus) {
						case true:
							init::$usrArray['isLogged'] = true;
							die('{"type": "success","message": "'.$lang['authSuccess'].'","units":'.init::$usrArray['units'].'
							}');
						break;
						
						case false:
							functions::jsonAnswer($lang['authWrong']);
						break;
					}
					
				break;
							
				case 'register':
					$reg = new register($request, $this->db, $this->logger);	
					$reg->register();
				break;
				
				case 'checkPass':
					init::classUtil('PasswordStrength', "1.0.0");
					$this->logger->WriteLine("Checking a password '".$request['password']."'");
					die(json_encode(new PasswordStrength($request['password'])));
				break;
				
				case "lastUser":
					die(json_encode(new lastUser($request, $this->db, $this->logger)));
				break;
					
				case 'logout':
					self::logout($lang['loggedOut']);
				break;
			}
		}
		
		public static function updateSession($db) {
			$loadUserInfo = new loadUserInfo(init::$usrArray['login'], $db);
			$userData = $loadUserInfo->userInfoArray();
			$sessionManager = new sessionManager($userData);
		}
		
		protected static function checkUserToken($db, $logger) {
			$username = "";
			if(isset($_COOKIE[self::$userToken])) {
				$token = functions::filterString($_COOKIE[self::$userToken]);
				$query = "SELECT login from `users` WHERE token = '".$token."'";
				$username = $db->getValue($query);
				if($username && !init::$usrArray['isLogged']) {
					$auth = new authorise("", $db, $logger, $username);
				}
			}
		}
		
		public static function logout($message){
			if(init::$usrArray["isLogged"] === true) {
				session_destroy();
				setcookie(self::$userToken, "", time() - 3600);
				functions::jsonAnswer($message, false);
			} else {
				functions::jsonAnswer("Cant logOut!", true);
			}
		}
	}