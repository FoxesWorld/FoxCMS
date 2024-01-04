<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	// $group = getGroup($member_id['uuid']);
	if($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
		$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Добавить новое дополнение на продажу";
		if($_GET['edit']) {
			$edit = $db->safesql($_GET['edit']);
			$edits = $db->super_query("SELECT * FROM shop_commands WHERE id='$edit'");
			if(!$edits['id']) {
				header("Location: http://paradisecloud.ru/shop?act=addp");
				exit();
			}
			else {
				$description = $edits['description'];
				$itemname = $edits['cmd_name'];
				$message = $edits['message'];
				$price = $edits['price'];
				$icon = $edits['icon'];
				$command = htmlspecialchars($edits['command']);
			}
		}
		if(!$_GET['edit']) $editbtn = "Добавть дополнение в магазин"; else $editbtn = "Сохранить дополнение";
		if($_POST['add']) {
			$cmdname = $db->safesql($_POST['cmdname']);
			$description = $db->safesql($_POST['description']);
			$message = $db->safesql($_POST['message']);
			$command = $db->safesql($_POST['command']);
			$price = $db->safesql($_POST['price']);
			$icon = $db->safesql($_POST['icon']);

			
			if($cmdname && $description && $message && $command && $price && $icon) {
				if(!$_GET['edit']) {
					$shop = false;
					$check = $db->query("SELECT * FROM shop_list");
					if($db->num_rows($check)) {
						while($get = $db->get_row($check)) {
							if(isset($_POST['s_'.$get['id']])) {
								$shop = true;
								$db->query("INSERT INTO `shop_commands` (`id`, `cmd_name`, `message`, `description`, `shopid`, `command`, `price`, icon) 
								VALUES (NULL, '$cmdname', '$message', '$description', {$get['id']}, '$command', '$price', '$icon')");
							}
						}
					}
					if(!$shop) $content .= "<div class='uk-text-danger' style='padding: 10px 0px;'><b>Необходимо выбрать как минимум один раздел.</b></div>";
					else $content .= "<div class='uk-text-success' style='padding: 10px 0px;'><b>Дополнение успешно добавлено в выбранные разделы.</b></div>";
				}
				else {
					$edit = $db->safesql($_GET['edit']);
					$db->query("UPDATE shop_commands SET command='$command', description='$description', message='$message', price='$price', cmd_name='$cmdname' WHERE id='$edit'");
					$content .= "<div class='uk-text-success' style='padding: 10px 0px;'><b>Дополнение успешно изменено и сохранено.</b></div>";
					$edits = $db->super_query("SELECT * FROM shop_commands WHERE id='$edit'");
					$description = $edits['description'];
					$itemname = $edits['cmd_name'];
					$message = $edits['message'];
					$price = $edits['price'];
					$command = htmlspecialchars($edits['command']);
				}
			}
			else $content .= "<div class='uk-text-danger' style='padding: 10px 0px;'><b>Необходимо заполнить все поля.</b></div>";
		}
		
		$check = $db->query("SELECT * FROM shop_list");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				if($_GET['edit']) {
					if($edits['shopid'] == $get['id']) $shops .= "<div><label><input type='checkbox' checked disabled name='s_{$get['id']}' class='razdelcheck'> {$get['shopname']} раздел</label></div>";
					else $shops .= "<div><label><input type='checkbox' disabled name='s_{$get['id']}' class='razdelcheck'> {$get['shopname']} раздел</label></div>";
				}
				else $shops .= "<div><label><input type='checkbox' name='s_{$get['id']}' class='razdelcheck'> {$get['shopname']} раздел</label></div>";
			}
		}
		
		if(!$_GET['edit']) $selectall = "<input type='checkbox' id='checkall_r'> <b>Выбрать все</b>";
		
		$content .= "
			<form action method='post' class='uk-form'>
				<table class='uk-table uk-width-1-1 uk-table-striped'>
					<tr>
						<td width='300px'>Название дополнения</td>
						<td><input type='text' class='uk-width-1-1' name='cmdname' value='$itemname'></td>
					</tr>
					<tr>
						<td width='300px'>Иконка дополнения</td>
						<td><input type='text' class='uk-width-1-1' name='icon' value='$icon'></td>
					</tr>
					<tr>
						<td>Описание дополнения</td>
						<td><input type='text' value='$description' class='uk-width-1-1' name='description' placeholder='Описание дополнения'></td>
					</tr>
					<tr>
						<td>Сообщение после получения</td>
						<td><input type='text' value='$message' class='uk-width-1-1' name='message' placeholder='Сообщение после получения дополнения'></td>
					</tr>
					<tr>
						<td>Команда выполнения</td>
						<td><input type='text' value='$command' class='uk-width-1-1' name='command' placeholder='Команда выполнения'></td>
					</tr>
					<tr>
						<td>Стоимость</td>
						<td><input type='text' value='$price' class='uk-width-1-1' name='price' placeholder='Стоимость дополнения'></td>
					</tr>
					<tr>
						<td>Разделы</td>
						<td>$selectall $shops</td>
					</tr>
					<tr>
						<td></td>
						<td><input type='submit' class='uk-button uk-width-1-1' name='add' value='$editbtn' style='color: white'></td>
					</tr>
				</table>
				<script src='$DURL/loadscript/shop'></script>
			</form>
		";
	}