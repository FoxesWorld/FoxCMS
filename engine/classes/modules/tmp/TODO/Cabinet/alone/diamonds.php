<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	// if($member_id['name']) {
	// 	$hash = $_GET['hash'];
	// 	if(strcmp($hash, $_SESSION['old_hash']) == 0 && strlen($_SESSION['old_hash']) == 32) {
	// 		$_SESSION['old_hash'] = 0;
	// 		$type = $db->safesql($_GET['type']);
	// 		if($type >= 1 && $type <= 4) {
	// 			if($type == 1) $price = 15;
	// 			else if($type == 2) $price = 69;
	// 			else if($type == 3) $price = 199;
	// 			else if($type == 4) $price = 749;	
				
	// 			if($type == 1) $diam = 1;
	// 			else if($type == 2) $diam = 5;
	// 			else if($type == 3) $diam = 15;
	// 			else if($type == 4) $diam = 100;
				
	// 			if($member_id['cash'] < $price) echo "Недостаточно средств для покупки $diam алмазов.";
	// 			else {
	// 				$db->query("UPDATE dle_users SET cash=cash-$price WHERE name='{$member_id['name']}'");
	// 				$db->query("INSERT INTO user_actions VALUES(null, '{$member_id['uuid']}', '$summa', 'Покупка алмазов ($diam шт.)', '".time()."', '10')");
	// 				$db->query("UPDATE dle_users SET diamonds=diamonds+$diam WHERE name='{$member_id['name']}'");
	// 			}	
	// 		}
	// 		else header("Location: $DURL");
	// 	}
	// 	else header("Location: $DURL");
	// }
	else header("Location: $DURL");