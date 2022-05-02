<?php

	$admin = new admin;
	class admin extends init {
		
		protected $adminTpl = '/admin.tpl';
		protected $admRequest = 'admActions';
		protected $modalsAdmin = array(
			"adm" => array("Админпанель", "Ну что, мамкин админ -  <b>{realname}</b>, будем воротить будущее?", "%file:=adm")
		);
		
		function __construct(){
			global $config;
			$file = ROOT_DIR."/templates/".$config['siteTpl'].$this->adminTpl;
			if(@$_SESSION['user_group'] === 'admin') {
				if(isset($_REQUEST[$this->admRequest])) {
					if(@$_REQUEST['key'] === $config['secureKey']) {
						switch(@$_REQUEST[$this->admRequest]){
							case 'admPage':
								functions::jsonAnswer('Not available!', true);
							break;
						}
					} else {
						functions::jsonAnswer('Wrong secure key!', true);
					}
				}
				foreach($this->modalsAdmin as $key => $value){
					$thisField = new modalConstructor($key, $value[0], $value[1], $value[2], $_SESSION);
					$thisField->mdlOut();
				}
			}
		}
		
	}