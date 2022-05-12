<?php
if(!defined('profile')) {
	die ('{"message": "Not in profile thread"}');
}

		$shortProfile = new shortProfile;
		init::$profileBlock = $shortProfile->profileOut();
					
	class shortProfile extends profile {
		
		private $shortProfileBlock, $selectedData;
		private $profileShape = '';
		private $profileCompoonentFile = 'profileComponent.tpl';
		
		function __construct(){
			global $config;
			if(init::$isLogged){
				$userActions = new userActions;
				$this->profileShape = file::efile(ROOT_DIR."/templates/".$config['siteTpl'].'/components/'.$this->profileCompoonentFile)["content"];
				foreach(init::$usrArray as $key => $value) {
					if(in_array($key, $config['userDataToShow'], true)){
							$this->selectedData .= '<li><b>'.$key.'</b>: '.$value.'</li>';
					}
				}
				$this->shortProfileBlock = str_replace('{profileData}', $this->selectedData, $this->profileShape);
			}
		}
		
		public function profileOut(){
			return $this->shortProfileBlock;
		}
	}