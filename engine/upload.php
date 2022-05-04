<?php
	if(@$_REQUEST['image']  && @$_POST['fname'] === 'upload'){
		if(@$_SESSION['isLogged']){
			if(@$_REQUEST['key'] === $config['secureKey']) {
				require (MODULES_DIR.'filepond/submit.php');
			}
		} else {
			die('{"message": "Not authorised!"}');
		}
	}