<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	class modalShow extends init {
		
		private $modalFilesDir;
		private $groupToShow;
		
		function __construct($mdlArray){
			global $config;
			$this->modalFilesDir = ROOT_DIR."/templates/".$config['siteTpl'].'/modal/';
			foreach($mdlArray as $key => $value){
			if(strpos($value[2], '%file:=') !== false){
				$modalFile = explode("=", $value[2])[1].'.tpl';
				$modalContents = file::efile($this->modalFilesDir.$modalFile)["content"];
				}
				@$optionsArray = json_decode(functions::getStrBetween($modalContents, "<mdlOpt>","</mdlOpt>")[0]);
				$this->groupToShow = $optionsArray->groupToShow ?? 5;
				if($this->groupToShow) {
					switch(is_array($this->groupToShow)){
						case false:
							if($this->groupToShow === init::$usrArray['user_group']){
								$this->modalConstruct($key, $value, $modalContents);
							}
						break;
							
						case true:
							if(in_array(init::$usrArray['user_group'], $this->groupToShow)) {
								$this->modalConstruct($key, $value, $modalContents);
							}
						break;
					}
				}	
			}
		}
		
		private function modalConstruct($key, $value, $modalContents) {
			$thisField = new modalConstructor($key, $value[0], $value[1], $modalContents);
			$thisField->mdlOut();
		}
	}