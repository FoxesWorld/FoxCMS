<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	if($member_id['name']) {
		$select = $db->query("SELECT * FROM shop_history ORDER BY id DESC LIMIT 6");
		if($db->num_rows($select)) {
			echo "<div class='topshop_title'>Последние купленные товары в нашем Онлайн Магазине</div><div class='top_shop_items'>";
			echo "
				<div data-uk-tooltip title='Алмазный аккаунт' onclick=\"location.href='$DURL/cabinet?loc=power'\" class='part_top_shop'>
					<div class='part_itemname uk-text-truncate'>Алмазный аккаунт</div>
					<div class='part_image'><img src='$DURL/uploads/diamond.png' width='100px'></div>
					<div class='part_shopname'>Все сервера</div>
				</div>
			";
			while($get = $db->get_row($select)) {
				if($get['count'] != 9999 && $get['count'] != 99999) {
					$check = $db->super_query("SELECT * FROM shop_items WHERE id='{$get['itemid']}'");
					echo "
						<div data-uk-tooltip title='{$check['itemname']}' onclick=\"location.href='$DURL/shop?shopid={$check['shopid']}&act=show&item={$check['id']}'\" class='part_top_shop'>
							<div class='part_itemname uk-text-truncate'>{$check['itemname']}</div>
							<div class='part_image'><img src='{$check['icon']}' width='100px'></div>
							<div class='part_shopname'>{$get['shop']}</div>
						</div>
					";
				}
				else if($get['count'] == 9999) {
					$check = $db->super_query("SELECT * FROM shop_sets WHERE id='{$get['itemid']}'");
					echo "
						<div data-uk-tooltip title='{$check['setname']}' onclick=\"location.href='$DURL/shop?shopid={$check['shopid']}&act=sets'\" class='part_top_shop'>
							<div class='part_itemname uk-text-truncate'>{$check['setname']}</div>
							<div class='part_image'><img src='{$check['icon']}' width='100px'></div>
							<div class='part_shopname'>{$get['shop']}</div>
						</div>
					";
				}
				else {
					$check = $db->super_query("SELECT * FROM chest_types WHERE typeid='{$get['itemid']}'");
					echo "
						<div data-uk-tooltip title='{$check['setname']}' onclick=\"location.href='$DURL/shop?act=chests'\" class='part_top_shop'>
							<div class='part_itemname uk-text-truncate'>{$check['name']}</div>
							<div class='part_image'><img src='$DURL/uploads/chests/chest_{$check['typeid']}.png' width='100px'></div>
							<div class='part_shopname'>СУНДУКИ</div>
						</div>
					";
				}
			}
			echo "</div><div class='topshop_hr'></div>";
		}
	}