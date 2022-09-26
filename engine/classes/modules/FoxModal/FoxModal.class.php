<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}

	class modalShow extends init {
		
		private $modalFilesDir;
		
		function __construct(){
			global $config;
			$this->modalFilesDir = ROOT_DIR."/templates/".$config['siteTpl'].'/modal/';
			$modalsArray = filesInDir::filesInDirArray($this->modalFilesDir, ".tpl");
			$getModals = new modalConstructor($this->modalFilesDir, $modalsArray, init::$usrArray);
			$availableModals = $getModals->mdlOut();
			foreach($availableModals as $modal){
				echo $modal;
			}
		}
	}