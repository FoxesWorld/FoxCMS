<?php
if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
	class smartyInit extends init {
		
		protected $smarty;
		
		function __construct($builtLinks) {
			global $config;
			require ("SmartyUtils.class.php");
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

			$smartyUtils = new smartyUtils;
			$profilePhotoPath = ROOT_DIR.UPLOADS.init::$usrArray['profilePhoto'];
			$smartyUtils->pluginsInclude($this->toIncludeArray);
			$this->smarty->assign("systemHeaders", smartyUtils::$outString);
			$this->smarty->assign("links", $builtLinks);
			$this->smarty->assign("title", $config['title']);
			$this->smarty->assign("status", $config['status']);
			$this->smarty->assign("year", date("Y"));
			$this->smarty->assign("tplDir", "/templates/".$config['siteTpl']);
			$this->smarty->assign("isLogged",   init::$usrArray['isLogged']);
			$this->smarty->assign("builtInJS", $smartyUtils->assignJs());

			switch(file_exists($profilePhotoPath)) {
				case true:
					init::$usrArray["profilePhoto"] = UPLOADS.init::$usrArray['profilePhoto'];
				break;
				
				default:
					init::$usrArray["profilePhoto"] = "/templates/".$config['siteTpl']."/img/no-photo.jpg";
				break;
			}
		
			$smartyUtils->assignUserFields($this->smarty);	
			
		}
	}