<?php
	/*$select = $db->query("SELECT * FROM shop_items WHERE shopid='1'");
	if($db->num_rows($select)) {
		$shopid = 5;
		$num = 0;
		while($get = $db->get_row($select)) {
			$db->query("
				INSERT INTO `shop_items` (`id`, `itemname`, `stack`, `shopid`, `category`, `price`, `itemid`, `icon`, `default_ench`, `default_ench_text`, `canen`, `percent`, `until`, `buy_times`, `can_buy`)
				VALUES
				(NULL, '{$get['itemname']}', '{$get['stack']}', '$shopid', '{$get['category']}', '{$get['price']}', '{$get['itemid']}', '{$get['icon']}', NULL, NULL, '{$get['canen']}', '{$get['percent']}', '{$get['until']}', '{$get['buy_times']}', '{$get['can_buy']}')
			");
			$num++;
		}
		$content = "DONE: $num";
	}*/