<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	if($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
		$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Управление категориями";
		
		if($_POST['save']) {
			$check = $db->query("SELECT * FROM shop_category");
			if($db->num_rows($check)) {
				while($get = $db->get_row($check)) {
					if(mb_strlen($_POST['cat_'.$get['id']], 'utf-8')) {
						$catname = $db->safesql($_POST['cat_'.$get['id']]);
						$db->query("UPDATE shop_category SET catname='$catname' WHERE id='{$get['id']}'");
					}
					else {
						$db->query("DELETE FROM shop_category WHERE id='{$get['id']}'");
						$db->query("UPDATE shop_items SET category = REPLACE(category, '|{$get['id']}|', '') WHERE INSTR(category, '|{$get['id']}|') > 0");
					}
				}
			}
			if(mb_strlen($_POST['cat_new'], 'utf-8')) {
				$catname = $db->safesql($_POST['cat_new']);
				$db->query("INSERT INTO shop_category VALUES(null, '$catname')");
			}
			header("Location: $DURL/shop?act=cats");
			die();
		}
		
		$check = $db->query("SELECT * FROM shop_category");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				$cats .= "<tr><input type='text' name='cat_{$get['id']}' class='uk-width-1-1' value='{$get['catname']}'></tr>";
			}
		}
		
		$content .= "
			<form action method='post' class='uk-form'>
				<table class='uk-table uk-width-1-1 uk-table-striped'>
					$cats
					<tr><input type='text' name='cat_new' class='uk-width-1-1' placeholder='Новая категория'></tr>
				</table>
				<input style='margin-top: -15px; color: white' type='submit' name='save' class='uk-width-1-1 uk-button' value='Сохранить категории'>
			</form>
		";
	}