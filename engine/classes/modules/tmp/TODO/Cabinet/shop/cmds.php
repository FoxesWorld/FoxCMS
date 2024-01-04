<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	$select = $db->super_query("SELECT * FROM shop_list WHERE id='$shopid'");
	// $group = getGroup($member_id['uuid']);
	if($select['shopname']) {
		$shopname = $select['shopname'];
		$header = "<a href='$DURL/shop?shopid=$shopid&act=show'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Дополнения для $shopname серверов";
		
		if($_POST['buycmd']) {
			$cmdid = $db->safesql($_POST['cmdid']);
			$select = $db->super_query("SELECT * FROM shop_commands WHERE id='$cmdid'");
			if($select['id']) {
				if($member_id['cash'] >= $select['price']) {
					$db->query("UPDATE dle_users SET cash=cash-{$select['price']} WHERE name='{$member_id['name']}'");
					$check = $db->super_query("SELECT * FROM shop_list WHERE id='{$select['shopid']}'");
					$extra = $db->safesql("{$select['description']}::{$select['message']}");
					$command = $db->safesql($select['command']);
					$db->query("INSERT INTO {$check['table_name']} VALUES (null, 'command', '{$command}', '{$member_id['name']}', '1', '$extra', null)");
					addLog($member_id['uuid'], -$select['price'], "[{$check['shopname']}] Приобрел дополнение {$select['cmd_name']}", 12);
					$error = returnNotifer("Вы успешно купили дополнение \"{$select['cmd_name']}\" на сервера {$check['shopname']}!<br/>Бегите в игру и вводите <b>/cart all</b>", "check", '', 'font-size: 15px;');
				}
				else $error = returnNotifer("К сожалению у вас не хватает денег", "times");
			}
			else header("Location: $DURL");
		}
		
		$select = $db->query("SELECT * FROM shop_commands WHERE shopid='$shopid'");
		if($db->num_rows($select)) {
			$content = "$error<table class='uk-width-1-1 uk-table uk-table-striped uk-table-hover'>";
			while($get = $db->get_row($select)) {
				if($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) $get['cmd_name'] = "<a href='$DURL/shop?act=addp&edit={$get['id']}'>{$get['cmd_name']}</a>";
				$content .= "
					<tr>
						<td width='30px'><img src='{$get['icon']}' width='30px'></td>
						<td>{$get['cmd_name']}<div class='uk-text-primary uk-text-small'>Название</div></td>
						<td>{$get['description']}<div class='uk-text-primary uk-text-small'>Описание</div></td>
						<td>{$get['price']} руб.<div class='uk-text-primary uk-text-small'>Стоимость</div></td>
						<td width='90px'>
							<form action method='post'>
								<input type='hidden' value='{$get['id']}' name='cmdid'>
								<input type='submit' class='uk-button' value='Купить' style='width:90px' name='buycmd'>
							</form>
						</td>
					</tr>
				";	
			}
			$content .= "</table>";
		}
		else header("Location: $DURL/shop?shopid=$shopid&act=show");
	}
	else header("Location: $DURL/shop");