<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	$select = $db->super_query("SELECT * FROM shop_list WHERE id='$shopid'");
	if($select['shopname']) {
		$shopname = $select['shopname'];
		$header = "<a href='$DURL/shop?shopid=$shopid&act=show'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Наборы $shopname серверов";
		
		$select = $db->query("SELECT * FROM shop_sets WHERE shopid='$shopid' ORDER BY buy_times DESC");
		if($db->num_rows($select)) {
			while($get = $db->get_row($select)) {
				$exp = explode(',', $get['content_ids']);
				$summa = 0;
				$itemlist = "<b>После покупки этого набора вы получите:</b><br/>";
				for($i = 0; $i < count($exp); $i++) {
					$check = $db->super_query("SELECT * FROM shop_items WHERE id='{$exp[$i]}'");
					//$itemlist .= "- {$check['itemname']} - {$check['price']} руб.<br/>";
					$itemlist .= "<img src='{$check['icon']}' width='20px'> {$check['itemname']} - {$check['stack']} шт.<br/>";
					$summa += $check['price'];
				}
				
				$content .= "
					<div data-uk-tooltip title=\"$itemlist\" class='sets_block'>
						<div class='sets_name'>{$get['setname']}</div>
						<div class='sets_icon'><img src='{$get['icon']}'></div>
						<div class='sets_price'>{$get['price']} руб.</div>
						<div class='sets_def_price'>Цена без набора: $summa руб.</div>
						<button type='button' class='uk-button uk-width-1-1 showset' data-id='{$get['id']}'>Подробнее</button>
					</div>
				";
			}
			$content .= "<div id='shopOutput'></div>";
		}
	}
	else header("Location: $DURL/shop");