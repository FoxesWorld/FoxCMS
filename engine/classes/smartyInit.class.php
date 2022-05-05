<?php
if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class smartyInit extends init {
		
		protected $smarty;
		private $links;
		
		function __construct($builtLinks) {
			$this->links = $builtLinks;
			global $config;
			$this->smarty 					= new Smarty;
			$this->smarty->debugging 		= false;
			$this->smarty->cache_lifetime 	= 120;
			$this->smarty->template_dir 	= ROOT_DIR.'/templates/'.$config['siteTpl'];
			$this->smarty->compile_dir 		= ENGINE_DIR.'/cache/compile/';
			$this->smarty->cache_dir 		= ENGINE_DIR.'/cache/cache/';
			$this->smartyAssign();
			$this->smarty->display('main.tpl');
		}
		
		protected function smartyAssign(){
			global $config;
			$includePlugins = new includePlugins($this->toIncludeArray);
			$this->smarty->assign("systemHeaders", includePlugins::$outString);
			$this->smarty->assign("links", $this->links);
			$this->smarty->assign("title", $config['title']);
			$this->smarty->assign("status", $config['status']);
			$this->smarty->assign("tplDir", "/templates/".$config['siteTpl']);
			$this->smarty->assign("profile", 	init::$profileBlock);
			$this->smarty->assign("isLogged",   @$_SESSION['isLogged']);
			$this->smarty->assign("LoggedName", @$_SESSION['login']);
			$this->smarty->assign("userGroup", @$_SESSION['user_group']);
			$this->smarty->assign("greetings", randTexts::getRandText('greetings'));
			$this->smarty->assign("realname", 	@$_SESSION['realname']);
			$this->smarty->assign("vkGroup", 	$config['vkGroup']);
			$this->smarty->assign("builtInJS", '<script>
			let isLogged = "'.@$_SESSION['isLogged'].'";
			let userLogin = "'.@$_SESSION['login'].'";
			let userGroup = "'.@$_SESSION['user_group'].'";
			let realname = "'.@$_SESSION['realname'].'";
			request = new request("/", {key:"'.$config['secureKey'].'"}, false);
			formInit(500);
			if(isLogged) {
				scanDir({"scanDir": ""});
			}</script>');
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
								self::$outString .= '	<link rel="stylesheet" type="text/css" href="'.$thisPath.$oneFile.'">'."\n";
							}
						} elseif(strpos($oneFile, '.js')){
							if(!@strpos($oneFile, $value[2])) {
								self::$outString .= '	<script src="'.$thisPath.$oneFile.'"></script>'."\n";
							}
						}
					}
				}
			}
		}
	}