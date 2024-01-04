<?php
	define("DATALIFEENGINE", true);
	include_once($_SERVER['DOCUMENT_ROOT']."/engine/classes/mysql.php");
	include_once($_SERVER['DOCUMENT_ROOT']."/engine/data/dbconfig.php");
	include_once($_SERVER['DOCUMENT_ROOT']."/engine/modules/functions.php");
	
	if($_REQUEST['amount'] == "") $_REQUEST['amount'] = $_REQUEST['summ'];
	
	$account = $db->safesql($_REQUEST['pay_id']);
	$summa = $db->safesql($_REQUEST['amount']);
	
	$shop_id = '3919';
	$secret_key = '';
	
	$signature = md5($shop_id.':'.$_REQUEST['amount'].':'.$_REQUEST['pay_id'].':'.$secret_key);  

	function getIP() {
	if(isset($_SERVER['HTTP_X_REAL_IP'])) return $_SERVER['HTTP_X_REAL_IP'];
		return $_SERVER['REMOTE_ADDR'];
	}
	
	if (!in_array(getIP(), array('185.162.128.88'))) {
		die("Hacking attempt!");
	} 
	
	if ($signature != $_REQUEST['sign']) {
		die('bad sign!');
	}

	
	$select = $db->super_query("SELECT * FROM dle_users WHERE user_id='$account'");
	
	if($select['name']) {
		$db->query("UPDATE dle_users SET cash=cash+$summa WHERE name='{$select['name']}'");
		$db->query("INSERT INTO user_actions VALUES(null, '{$select['uuid']}', '$summa', 'Пополнение баланса через AnyPay', '".time()."', '1')");
		die('OK');
	} else die('user not found');
?>