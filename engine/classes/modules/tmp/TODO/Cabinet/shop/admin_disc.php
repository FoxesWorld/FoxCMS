<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	// $group = getGroup($member_id['uuid']);
	if($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
		$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Управление скидками";
		
		if($_GET['disable'] >= 1) {
			$id = $db->safesql($_GET['disable']);
			$select = $db->super_query("SELECT * FROM shop_discount WHERE id='$id'");
			if($select['percent']) {
				$num = 0;
				$select2 = $db->query("SELECT * FROM shop_items");
				if($db->num_rows($select2)) {
					$explode_shop = explode(',', $select['servers']);
					$explode_cat = explode(',', $select['cats']);
					while($get = $db->get_row($select2)) {
						if($select['minsumma'] && $select['minsumma'] > $get['price']) continue;
						if($select['maxsumma'] && $select['maxsumma'] < $get['price']) continue;
						if($select['percent'] != $get['percent']) continue;
						if(count($explode_shop) && $select['servers'] && array_search($get['shopid'], $explode_shop) === false) continue;
						if(count($explode_cat) && $select['cats']) {
							$ok = false;
							for($i = 0; $i < count($explode_cat); $i++) {
								if(strpos($get['category'], "|{$explode_cat[$i]}|") !== false) $ok = true; 
							}
							if(!$ok) continue;
						}
						$num++;
						$db->query("UPDATE shop_items SET percent='0', until='0' WHERE id='{$get['id']}'");
					}
				}
				$db->query("DELETE FROM shop_discount WHERE id='$id'");
				$error = "<div class='uk-text-success' style='padding: 10px 0px;margin-bottom: -17px;'><b>В магазине скидка сброшена у $num товаров из {$select['items']}</b></div>";
			}
		}
		
		if($_POST['add']) {
			$percent = $db->safesql($_POST['percent']);
			$min_cost = $db->safesql($_POST['min_cost']);	
			$max_cost = $db->safesql($_POST['max_cost']);		
			$startdate = getUnixTime($db->safesql($_POST['startdate']));	
			$enddate = getUnixTime($db->safesql($_POST['enddate']));	
			
			$category = "";
			$shops_list = "";
			$check = $db->query("SELECT * FROM shop_category");
			if($db->num_rows($check)) {
				while($get = $db->get_row($check)) {
					if(isset($_POST['c_'.$get['id']])) $category .= " {$get['id']} ";
				}
			}
			$category = str_replace("  ", ",", $category);
			$category = str_replace(" ", "", $category);
			
			$check = $db->query("SELECT * FROM shop_list");
			if($db->num_rows($check)) {
				while($get = $db->get_row($check)) {
					if(isset($_POST['s_'.$get['id']])) $shops_list .= " {$get['id']} ";
				}
			}
			$shops_list = str_replace("  ", ",", $shops_list);
			$shops_list = str_replace(" ", "", $shops_list);
			
			if($percent > 90 || $percent < 1) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Скидочный процент может быть от 1 до 90</b></div>";
			else if($startdate > $enddate) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Дата начала не может быть позднее, чем дата завершения.</b></div>";
			else if($startdate+3600 > $enddate) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Минимальная разница между началом и концом скидки - один час.</b></div>";
			else if(time()+3600 > $enddate) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Скидка может заканчиваться как минимум через один час от текущего времени.</b></div>";
			else if(strlen($min_cost) && $min_cost < 1) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Минимальная сумма ценового критерия - 1 рубль.</b></div>";
			else if(strlen($max_cost) && $max_cost > 90000) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Максимальная сумма ценового критерия - 90000 рублей.</b></div>";
			else {
				$num = 0;
				$explode_cat = explode(',', $category);
				$explode_shop = explode(',', $shops_list);
				$select = $db->query("SELECT * FROM shop_items");
				if($db->num_rows($select)) {
					while($get = $db->get_row($select)) {
						if($min_cost && $min_cost > $get['price']) continue;
						if($max_cost && $max_cost < $get['price']) continue;
						if(count($explode_shop) && $shops_list && array_search($get['shopid'], $explode_shop) === false) continue;
						if(count($explode_cat) && $category) {
							$ok = false;
							for($i = 0; $i < count($explode_cat); $i++) {
								if(strpos($get['category'], "|{$explode_cat[$i]}|") !== false) $ok = true; 
							}
							if(!$ok) continue;
						}
						$num++;
					}
				}
				
				$now = 0;
				if(!$startdate || $startdate < time()) {
					$now = 1;
					$startdate = time();
					if(!$num) $error = "<div class='uk-text-danger' style='padding: 10px 0px;margin-bottom: -17px;'><b>Невозможно запустить скидку по указанным критериям. Ни один товар не попадает под них.</b></div>";
					else {
						$num = 0;
						$select = $db->query("SELECT * FROM shop_items");
						if($db->num_rows($select)) {
							while($get = $db->get_row($select)) {
								if($min_cost && $min_cost > $get['price']) continue;
								if($max_cost && $max_cost < $get['price']) continue;
								if(count($explode_shop) && $shops_list && array_search($get['shopid'], $explode_shop) === false) continue;
								if(count($explode_cat) && $category) {
									$ok = false;
									for($i = 0; $i < count($explode_cat); $i++) {
										if(strpos($get['category'], "|{$explode_cat[$i]}|") !== false) $ok = true; 
									}
									if(!$ok) continue;
								}
								$db->query("UPDATE shop_items SET percent='$percent', until='$enddate' WHERE id='{$get['id']}'");
								$num++;
							}
						}
						$error = "<div class='uk-text-success' style='padding: 10px 0px;margin-bottom: -17px;'><b>Скидка успешно запущена.</b></div>";
					}
				}
				else if($startdate > time()) $error = "<div class='uk-text-success' style='padding: 10px 0px;margin-bottom: -17px;'><b>Скидка успешно добавлена в очередь.</b></div>";
				if($num >= 1) {
					$db->query("INSERT INTO `shop_discount` (`id`, `startdate`, `enddate`, `minsumma`, `maxsumma`, `servers`, `cats`, `percent`, `items`, `cron`) VALUES (NULL, '$startdate', '$enddate', '$min_cost', '$max_cost', '$shops_list', '$category', '$percent', '$num', '$now')");
				}
			}
		}
		
		$select = $db->query("SELECT * FROM shop_discount ORDER BY startdate ASC");
		if($db->num_rows($select)) {
			$content .= "<table class='uk-width-1-1 uk-table uk-table-striped'>";
			$content .= "
				<tr style='background: rgba(160, 125, 83, 0.26);'>
					<td width='20px'><b></b></td>
					<td><b>Запуск</b></td>
					<td><b>Окончание</b></td>
					<td><b>Затронуто</b></td>
					<td><b>Подробности</b></td>
					<td><b>Статус</b></td>
					<td></td>
				</tr>
			";
			while($get = $db->get_row($select)) {
				if($get['startdate'] <= time() && $get['enddate'] > time() && $get['cron']) $status = "<span class='uk-text-success'>Запущена</span>";
				else if($get['startdate'] <= time() && $get['enddate'] > time() && !$get['cron']) $status = "<span class='uk-text-success'><abbr data-uk-tooltip title='Синхронизация скидок с сервером осуществляется каждые 10 минут.<br/>Сейчас нужно дождаться следующей синхронизации.'>Запускается...</abbr></span>";
				else if($get['startdate'] > time() && $get['enddate'] > time()) $status = "<span class='uk-text-primary'>Отложена</span>";
				else $status = "<span class='uk-text-danger'>Завершена</span>";
				if($get['maxsumma']) $maxsumma = "<div>Максимальная сумма: {$get['maxsumma']} руб.</div><br/>";
				if($get['minsumma']) $minsumma = "<div>Минимальная сумма: {$get['minsumma']} руб.</div>";
				$shops2 = "";
				$cats2 = "";
				if($get['servers']) {
					$expl = explode(',', $get['servers']);
					for($i = 0; $i < count($expl); $i++) {
						$check = $db->super_query("SELECT * FROM shop_list WHERE id='{$expl[$i]}'");
						$shops2 .= " {$check['shopname']} ";
					}
					$shops2 = str_replace("  ", ", ", $shops2);
					$shops2 = "<div>Разделы:$shops2</div><br/>";
				}
				if($get['cats']) {
					$expl = explode(',', $get['cats']);
					for($i = 0; $i < count($expl); $i++) {
						$check = $db->super_query("SELECT * FROM shop_category WHERE id='{$expl[$i]}'");
						$cats2 .= " {$check['catname']} ";
					}
					$cats2 = str_replace("  ", ", ", $cats2);
					$cats2 = "<div>Категории:$cats2</div><br/>";
				}
				$description = "$minsumma$maxsumma$shops2$cats2";
				$content .= "
					<tr>
						<td width='20px'><b>{$get['percent']}%</b></td>
						<td>".date("d.m.Y H:i", $get['startdate'])."</td>
						<td>".date("d.m.Y H:i", $get['enddate'])."</td>
						<td>{$get['items']} шт.</td>
						<td><abbr data-uk-tooltip title='$description'>Описание</abbr></td>
						<td>$status</td>
						<td><a href='$DURL/shop?act=disc&disable={$get['id']}'><i class='uk-icon-times'></i></a></td>
					</tr>
				";
			}
			$content .= "</table>";
		}
		else $content .= returnNotifer("На данный момент не добавлено ни одной глобальной скидки.<br/>Для того, чтобы добавить новую скидку - заполните форму ниже.", 'info');
		
		$check = $db->query("SELECT * FROM shop_list");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				$shops .= "<div><label><input type='checkbox' name='s_{$get['id']}'> {$get['shopname']} раздел</label></div>";
			}
		}
		
		$check = $db->query("SELECT * FROM shop_category");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				$cats .= "<div><label><input type='checkbox' name='c_{$get['id']}'> {$get['catname']}</label></div>";
			}
		}
		
		$content .= "$error
			<form action method='post' class='uk-form'>
				<table class='uk-table uk-width-1-1 uk-table-striped' style='margin-top: 20px'>
					<tr>
						<td>Введите процент скидки</td>
						<td><input type='text' class='uk-width-1-1' name='percent' placeholder='Минимум 1, максимум 90'></td>
					</tr>
					<tr>
						<td>Ценовой критерий</td>
						<td><input type='text' class='uk-width-1-2' name='min_cost' placeholder='Минимум 1 или пусто'><input type='text' class='uk-width-1-2' name='max_cost' placeholder='Максимум 90000 или пусто'></td>
					</tr>
					<tr>
						<td>Товары входящие в...</td>
						<td>$shops</td>
					</tr>
					<tr>
						<td>Товары с категорией...</td>
						<td>$cats</td>
					</tr>
					<tr>
						<td>Начало действия скидки</td>
						<td><input type='datetime-local' name='startdate' class='uk-width-1-1'></td>
					</tr>
					<tr>
						<td>Конец действия скидок</td>
						<td><input type='datetime-local' name='enddate' class='uk-width-1-1'></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><input type='submit' name='add' class='uk-width-1-1 uk-button' style='color: white' value='Добавить скидку в план'></td>
					</tr>
				</table>
			</form>
		";
	}