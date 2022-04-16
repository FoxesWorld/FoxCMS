<?php

	$admin = new admin;
	class admin extends init {
		
		protected $adminTpl = '/admin.tpl';
		protected $dmdRequest = 'admActions';
		
		function __construct(){
			global $config;
			$file = ROOT_DIR."/templates/".$config['siteTpl'].$this->adminTpl;
			if(@$_SESSION['user_group'] === 'admin') {
				switch(@$_REQUEST['admActions']){
					case 'admPage':
						functions::jsonAnswer('not available!', true);
					break;
				}
			}
		}
		
	}