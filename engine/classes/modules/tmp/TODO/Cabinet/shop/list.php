<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	$select = $db->query("SELECT * FROM shop_list ORDER BY id ASC");
	if($db->num_rows($select)) {
		$content .= "<div class='shop-description'>Для начала вам необходимо выбрать раздел серверов, на который вы хотите совершить покупку.<br/>Для того, чтобы получить на сервере купленные ранее товары, введите <b>/cart all</b> или <b>/cart gui</b></div>";
		$content .= "<div class='shop-list-content'>";
		// $content .= "<div class='shop-list-shop' onclick=\"location.href='$DURL/shop?act=chests'\"><div class='shop-list-image' style='background-image: url($DURL/uploads/chests/chest_3.png);'></div><div class='shop-list-name'>Таинственные сундуки</div><div class='shop_itemsinside'>В этом разделе ты сможешь купить себе таинственный сундук</div></div><div style='clear: both'></div>";
		while($get = $db->get_row($select)) {
			$check = $db->query("SELECT * FROM shop_items WHERE shopid='{$get['id']}'");
			$count = $db->num_rows($check);
			$word = get_count($count, 'товар', 'товара', 'товаров');
			$info = $db->super_query("SELECT * FROM shop_history WHERE shop='{$get['shopname']}' ORDER BY id DESC LIMIT 1");
			if($info['count'] != 9999) {
				$info = $db->super_query("SELECT * FROM shop_items WHERE id='{$info['itemid']}'");
				$content .= "<div class='shop-list-shop' onclick=\"location.href='$DURL/shop?shopid={$get['id']}&act=show'\"><div data-uk-tooltip title=\"Последний купленный товар в этом разделе: {$info['itemname']}\" onclick=\"location.href='$DURL/shop?shopid={$get['id']}&act=show&item={$info['id']}'\" class='shop-list-image' style='background-image: url({$info['icon']});'></div><div class='shop-list-name'>{$get['shopname']} сервера</div><div class='shop_itemsinside'>В разделе представлено $count $word</div></div><div style='clear: both'></div>";
			}
			else {
				$info = $db->super_query("SELECT * FROM shop_sets WHERE id='{$info['itemid']}'");
				$content .= "<div class='shop-list-shop' onclick=\"location.href='$DURL/shop?shopid={$get['id']}&act=show'\"><div data-uk-tooltip title=\"Последний купленный товар в этом разделе: {$info['setname']}\" onclick=\"location.href='$DURL/shop?shopid={$get['id']}&act=sets'\" class='shop-list-image' style='background-image: url({$info['icon']});'></div><div class='shop-list-name'>{$get['shopname']} сервера</div><div class='shop_itemsinside'>В разделе представлено $count $word</div></div><div style='clear: both'></div>";
			}
		}
		$content .= "</div>";
		
		$select = $db->query("SELECT * FROM shop_history ORDER BY id DESC LIMIT 4");
		if($db->num_rows($select)) {
			$lastItems = "<h1 class='full-title module-title' id='news-title'>Последние купленные товары</h1>";
			while($get = $db->get_row($select)) {
				if($get['count'] != 9999 && $get['count'] != 99999) {
					$check = $db->super_query("SELECT * FROM shop_items WHERE id='{$get['itemid']}'");
					$price = getPrice($get['itemid'], $member_id);
					$info = $db->super_query("SELECT * FROM shop_list WHERE shopname='{$get['shop']}'");
					$content .= "
						<div class='allItem'>
							<div class='itemname_last'>{$check['itemname']}</div>
							<center><img src='{$check['icon']}' width='60px'></center>
							<div class='shopname_last'>{$get['shop']}</div>
							<div class='price_last'>{$price['text']}</div>
							<a href='$DURL/shop?shopid={$info['id']}&act=show&item={$get['itemid']}'><button type='button' style='font-size: 13px;margin-top: 11px;' class='uk-button uk-width-1-1'>Перейти к товару</button></a>
						</div>
					";
				}
				else if($get['count'] == 9999) {
					$check = $db->super_query("SELECT * FROM shop_sets WHERE id='{$get['itemid']}'");
					$price = $check['price'];
					$info = $db->super_query("SELECT * FROM shop_list WHERE shopname='{$get['shop']}'");
					$content .= "
						<div class='allItem'>
							<div class='itemname_last'>{$check['setname']}</div>
							<center><img src='{$check['icon']}' width='60px'></center>
							<div class='shopname_last'>{$get['shop']}</div>
							<div class='price_last'>{$price} руб.</div>
							<a href='$DURL/shop?shopid={$info['id']}&act=sets'><button type='button' style='font-size: 13px;margin-top: 11px;' class='uk-button uk-width-1-1'>Перейти к товару</button></a>
						</div>
					";
				}
				// else {
				// 	$check = $db->super_query("SELECT * FROM chest_types WHERE id='{$get['itemid']}'");
				// 	$content .= "
				// 		<div class='allItem'>
				// 			<div class='itemname_last'>{$check['name']}</div>
				// 			<center><img src='$DURL/uploads/chests/chest_{$check['typeid']}.png' width='60px'></center>
				// 			<div class='shopname_last'>Сундуки</div>
				// 			<div class='price_last'>{$check['cost']} <img src='http://shadowcraft.ru/uploads/diamond.png' class='diamond_icon'></div>
				// 			<a href='$DURL/shop?act=chests'><button type='button' style='font-size: 13px;margin-top: 11px;' class='uk-button uk-width-1-1'>Перейти</button></a>
				// 		</div>
				// 	";
				// }
			}
		}
		$content .= "<div style='margin-top: 20px;' id='lastBuyItems'>$lastItems$itemsLast</div>";
	}