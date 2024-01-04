<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	if(!$member_id['name']) {
		$id = $db->safesql($_GET['id']);
		if(isset($id)) {
			$select = $db->query("SELECT * FROM dle_users WHERE user_id='{$id}'");
			if($db->num_rows($select)) setcookie("ref", $id);
		}
	}
	header("Location: http://paradisecloud.ru/");