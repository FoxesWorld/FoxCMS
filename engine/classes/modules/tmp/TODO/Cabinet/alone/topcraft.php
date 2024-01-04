<?php
	define("DATALIFEENGINE", true);
	include("/home/admin/web/paradisecloud.ru/public_html/engine/classes/mysql.php");
	include("/home/admin/web/paradisecloud.ru/public_html/engine/data/dbconfig.php");
	
	$username = $db->safesql($_POST['username']);
	$secret = "";
	
	if(!preg_match("/^[a-zA-Z0-9_]+$/", $username)) die("Bad login");
	if($_POST['signature'] != sha1($username.$_POST['timestamp'].$secret)) die("hash mismatch");
	$select = $db->super_query("SELECT * FROM dle_users WHERE name='$username'");
	if($select['name']) {
		$db->query("UPDATE dle_users SET votes=votes+1 WHERE name='$username'");
		
		$much = $db->query("SELECT * FROM vote_table WHERE uuid='{$select['uuid']}' AND `from`='topcraft' AND date_text LIKE '%.".date("m.Y")."%'");
		$how_much = $db->num_rows($much);
		
		if(!$how_much || $how_much = 0) $summa = 5;
		else if($how_much >= 1 && $how_much <= 10) $summa = 1;
		else if($how_much >= 11 && $how_much <= 24) $summa = 2;
		else if($how_much >= 25) $summa = 3;
		else $summa = 1;
		
		$check = $db->query("SELECT * FROM vote_table WHERE uuid='{$select['uuid']}' AND `from`='topcraft' AND date_text='".date("d.m.Y")."'");
		if(!$db->num_rows($check)) {
			$db->query("INSERT INTO `vote_table` (`id`, `uuid`, `timestamp`, `date_text`, `from`) VALUES (NULL, '{$select['uuid']}', '".time()."', '".date("d.m.Y")."', 'topcraft')");
			$db->query("UPDATE dle_users SET cash=cash+$summa WHERE name='{$select['name']}'");
			die("Success voting with cash ($how_much | $summa)");
		}
		else die("Success voting without cash ($how_much | $summa)");
	}
	else die("user not found");