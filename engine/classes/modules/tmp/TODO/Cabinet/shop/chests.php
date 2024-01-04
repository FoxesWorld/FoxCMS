<?php
	// if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	// if($member_id['name']) {
	// 	$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> $header <i class='uk-icon-angle-right'></i> Таинственные сундуки";
	// 	$select = $db->query("SELECT * FROM chest_types WHERE in_shop='1' ORDER BY id ASC");
	// 	if($db->num_rows($select)) {
	// 		$content .= "
	// 			<div class='shop_sets' onclick=\"location.href='http://forum.ParadiseCloud.ru/index.php?/topic/3179-tainstvennye-sunduki-i-almazy/#entry11758'\">
	// 				<center>Что такое таинственные сундуки? Жми, чтобы получить подробную информацию</center>
	// 			</div>
	// 		";
	// 		while($get = $db->get_row($select)) {
	// 			if($get['dev'] && $member_id['name'] != 'andrew_shbov') continue;
	// 			if($get['server']) {
	// 				$ch = $db->super_query("SELECT * FROM shop_list WHERE id='{$get['server']}'");
	// 				$server = $ch['shopname'];
	// 				$get['inside'] = str_replace('{servername}', $server, $get['inside']);
	// 				$server = "<span style='color: #2000FF'>50 вещей Для <b>$server</b></span>";
	// 			}
	// 			else $server = "Стоимость";
	// 			$content .= "
	// 				<div data-uk-tooltip title=\"{$get['inside']}\" class='sets_block'>
	// 					<div class='sets_name'>{$get['name']}</div>
	// 					<div class='sets_icon'><img src='$DURL/uploads/chests/chest_{$get['typeid']}.png'></div>
	// 					<div class='sets_price'><b class='diamond_chest_price'>{$get['cost']}</b> <img src='http://paradisecloud.ru/uploads/diamond.png' class='diamond_icon'></div>
	// 					<div class='sets_def_price'>$server</div>
	// 					<button type='button' class='uk-button uk-width-1-1 showchest' data-id='{$get['id']}'>Подробнее</button>
	// 				</div>
	// 			";
	// 		}
	// 	}
	// 	$content .= "<div id='shopOutput'></div>";
	// }