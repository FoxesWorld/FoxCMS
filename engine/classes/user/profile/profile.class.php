<?php

	class profile {
		
		private $profileBlock;
		private $selectedData;
		private $profileShape = '';
		
		function __construct(){
			global $config;
			if($_SESSION['isLogged'] === true){
				$this->profileShape = file::efile(ROOT_DIR."/templates/".$config['siteTpl'].'/profileComponent.tpl')["content"];
				foreach($_SESSION as $key => $value) {
					if(in_array($key, $config['userDataToShow'], true)){
						$this->selectedData .= '<li><b>'.$key.'</b>: '.$value.'<li>';
					}
				}
				$this->profileBlock = str_replace('{profileData}', $this->selectedData, $this->profileShape);
			}
		}
		
		public function profileOut(){
			return $this->profileBlock;
		}
		
		private function logout(){
			session_destroy();
			header('Location: /');
		}
		
	}