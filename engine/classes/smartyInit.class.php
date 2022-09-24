<?php
if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class smartyInit extends init {
		
		protected $smarty;
		protected $profilePhoto;
		
		function __construct($builtLinks) {
			global $config;
			$modalsToShow = new modalShow($this->modalsArray);
			$this->smarty 					= new Smarty;
			$this->smarty->debugging 		= false;
			$this->smarty->cache_lifetime 	= 120;
			$this->smarty->template_dir 	= ROOT_DIR.'/templates/'.$config['siteTpl'];
			$this->smarty->compile_dir 		= ENGINE_DIR.'/cache/compile/';
			$this->smarty->cache_dir 		= ENGINE_DIR.'/cache/cache/';
			$this->smartyAssign($builtLinks);
			$this->smarty->display('main.tpl');
		}
		
		protected function smartyAssign($builtLinks){
			global $config;
			$includePlugins = new includePlugins($this->toIncludeArray);
			define('UPLOADS', '../uploads/'.self::$usrArray['login'].'/');
			$this->smarty->assign("systemHeaders", includePlugins::$outString);
			$this->smarty->assign("links", $builtLinks);
			$this->smarty->assign("title", $config['title']);
			$this->smarty->assign("status", $config['status']);
			$this->smarty->assign("year", date("Y"));
			$this->smarty->assign("tplDir", "/templates/".$config['siteTpl']);
			$this->smarty->assign("isLogged",   init::$isLogged);
			
			if(init::$isLogged) {
				if(!file_exists(ROOT_DIR."/uploads/".self::$usrArray['login'].'/'.init::$usrArray['profilePhoto'])) {
					$this->profilePhoto = TEMPLATE_DIR."no-photo.jpg";
				} else {
					$this->profilePhoto = UPLOADS.init::$usrArray['profilePhoto'];
				}
				$this->smarty->assign("profilePhoto", 	$this->profilePhoto);	
				$this->smarty->assign("LoggedName", init::$usrArray['login']);
				$this->smarty->assign("userGroup", init::$usrArray['user_group']);
				$this->smarty->assign("loginHash", init::$usrArray['hash']);
				$this->smarty->assign("email", init::$usrArray['email']);
				$this->smarty->assign("realname", 	init::$usrArray['realname']);	
				$builtInJS = '
				<script>
					let isLogged = "'.init::$isLogged.'";
					let userLogin = "'.init::$usrArray['login'].'";
					let userGroup = "'.init::$usrArray['user_group'].'";
					let realname = "'.init::$usrArray['realname'].'";
					let email = "'.init::$usrArray['email'].'";
					request = new request("/", {key:"'.$config['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);
					formInit(500);
				</script>';
			} else {
				$builtInJS = '
				<script>
					let isLogged = "'.init::$isLogged.'";
					let userLogin = "'.init::$usrArray['login'].'";
					request = new request("/", {key:"'.$config['secureKey'].'", user:"'.init::$usrArray['login'].'"}, true);
					formInit(500);
				</script>
				';
			}
			$this->smarty->assign("builtInJS", $builtInJS);
		}
	}

	class includePlugins extends smartyInit {
		
		protected static $outString = '';
		
		function __construct($IncludeArray){
			foreach($IncludeArray as $key => $value){
				if($value[3] == true){
					self::$outString .= "<!-- ".$key." -->";
					$thisFiles = filesInDir::filesInDirArray($value[1], $value[0]);
					$thisPath = str_replace(ROOT_DIR, '', $value[1]);
					foreach($thisFiles as $oneFile){
						if(strpos($oneFile, '.css')){
							if(!@strpos($oneFile, $value[2])) {
								if(file_exists($value[1].$oneFile)) {
									self::$outString .= '	<link rel="stylesheet" type="text/css" href="'.$thisPath.$oneFile.'">'."\n";
								}
							}
						} elseif(strpos($oneFile, '.js')){
							if(!@strpos($oneFile, $value[2])) {
								if(file_exists($value[1].$oneFile)) {
									self::$outString .= '	<script src="'.$thisPath.$oneFile.'"></script>'."\n";
								}
							}
						}
					}
				}
			}
		}
	}