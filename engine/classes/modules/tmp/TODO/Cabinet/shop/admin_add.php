<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	if($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
		$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Добавить новый товар";
		
		if($_POST['add']) {
			$itemname = $db->safesql($_POST['itemname']);
			$icon = $db->safesql($_POST['icon']);
			$price = $db->safesql($_POST['price']);
			$stack = $db->safesql($_POST['stack']);
			$itemid = $db->safesql($_POST['itemid']);
			if(isset($_POST['canen'])) $canen = 1; else $canen = 0;
			if(isset($_POST['buy_can'])) $buy_can = 1; else $buy_can = 0;
			if($_POST['diamonds']) $in_diamonds = 1; else $in_diamonds = 0;
			$category = "";
			$check = $db->query("SELECT * FROM shop_category");
			if($db->num_rows($check)) {
				while($get = $db->get_row($select)) {
					if(isset($_POST['c_'.$get['id']])) $category .= "|{$get['id']}|";
				}
			}
			if(!$category) $content .= "<div class='uk-text-danger' style='padding: 10px 0px;'><b>Необходимо указать как минимум одну категорию товара.</b></div>";
			else if($itemname && $icon && $price && $stack && $itemid) {
				$shop = false;
				$check = $db->query("SELECT * FROM shop_list");
				if($db->num_rows($check)) {
					while($get = $db->get_row($check)) {
						if(isset($_POST['s_'.$get['id']])) {
							$shop = true;
							$db->query("INSERT INTO `shop_items` 
							(`id`, `itemname`, `stack`, `shopid`, `category`, `price`, `itemid`, `icon`, `default_ench`, `default_ench_text`, `canen`, `percent`, `until`, `buy_times`, `can_buy`, diamonds) VALUES 
							(null, '$itemname', '$stack', '{$get['id']}', '$category', '$price', '$itemid', '$icon', NULL, NULL, '$canen', 0, 0, '0', '$buy_can', '$in_diamonds')");
						}
					}
				}
				if(!$shop) $content .= "<div class='uk-text-danger' style='padding: 10px 0px;'><b>Необходимо выбрать как минимум один раздел.</b></div>";
				else $content .= "<div class='uk-text-success' style='padding: 10px 0px;'><b>Товар успешно добавлен в выбранные разделы.</b></div>";
			}
			else $content .= "<div class='uk-text-danger' style='padding: 10px 0px;'><b>Необходимо заполнить все поля.</b></div>";
		}
		
		$check = $db->query("SELECT * FROM shop_list");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				$shops .= "<div><label><input type='checkbox' name='s_{$get['id']}' class='razdelcheck'> {$get['shopname']} раздел</label></div>";
			}
		}
		
		$check = $db->query("SELECT * FROM shop_category");
		if($db->num_rows($check)) {
			while($get = $db->get_row($check)) {
				$cats .= "<div><label><input type='checkbox' name='c_{$get['id']}'> {$get['catname']}</label></div>";
			}
		}
		
		$content .= "
			<form action method='post' class='uk-form'>
				<table class='uk-table uk-width-1-1 uk-table-striped'>
					<tr>
						<td width='300px'>Название товара</td>
						<td><input type='text' class='uk-width-1-1' name='itemname' value='$itemname'></td>
					</tr>
					<tr>
						<td>URL до иконки</td>
						<td><input type='text' class='uk-width-1-1' name='icon' value='$icon'></td>
					</tr>
					<tr>
						<td>Оплата принимается в</td>
						<td>
							<!--<label><input type='radio' value='1' name='diamonds'> В Алмазах</label><br/>-->
							<input type='radio' value='0' checked name='diamonds'> В Рублях</label>
						</td>
					</tr>
					<tr>
						<td>Стоимость, количество, ID</td>
						<td><input type='text' value='$price' class='uk-width-1-3' name='price' placeholder='Стоимость'><input type='text' class='uk-width-1-3' value='$stack' name='stack' placeholder='Количество'><input type='text' class='uk-width-1-3' name='itemid' value='$itemid' placeholder='ID:MetaID'></td>
					</tr>
					<tr>
						<td><b>Разделы <input type='checkbox' id='checkall_r'></b>$shops</td>
						<td><b>Категории</b>$cats</td>
					</tr>
					<tr>
						<td colspan='2'>
							<label><input type='checkbox' name='canen'> Этот товар покупатель может зачаровать самостоятельно</label><br/>
							<label><input type='checkbox' checked name='buy_can'> Этот товар НЕ снят с продажи (можно купить)</label><br/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td><input type='submit' class='uk-button uk-width-1-1' name='add' value='Добавть товар в магазин' style='color: white'></td>
					</tr>
				</table>
				<script src='$DURL/loadscript/shop'></script>
			</form>
		";
	}