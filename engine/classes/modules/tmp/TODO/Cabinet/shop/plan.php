<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	if($member_id['name']) {
		$header = "<a href='$DURL/shop'><i class='uk-icon-chevron-circle-left'></i></a> Расписание скидок в онлайн магазине";
		$select = $db->query("SELECT * FROM shop_items WHERE discount_from>0 OR until>".time()." ORDER BY discount_from ASC");
		if($db->num_rows($select)) {
			$day_list = array();
			$day_list_items = array();
			while($get = $db->get_row($select)) {
				if($get['until'] < time()) continue;
				if(!$get['percent']) continue;
				if(!$get['discount_from']) $get['discount_from'] = time();
				$date = date("dmY", $get['discount_from']);
				$found = false;
				foreach($day_list as $key => $value) {
					if(in_array($date, $value)) $found = true;
				}
				if(!$found) array_push($day_list, array($get['discount_from'], $date));
				$start = date("H:i", $get['discount_from']);
				$until = date("d.m.Y H:i", $get['until']);
				$price = getPrice($get['id'], $member_id, true);
				$shop = $db->super_query("SELECT * FROM shop_list WHERE id='{$get['shopid']}'");
				$day_list_items[$date] .= "
					<tr style='cursor: pointer' onclick=\"location.href='$DURL/shop?shopid={$get['shopid']}&act=show&item={$get['id']}'\">
						<td width='25px'><img style='margin-top: -4px;' src='{$get['icon']}' width='20px'></td>
						<td width='150px'><div style='width: 120px' class='uk-text-truncate' data-uk-tooltip title='{$get['itemname']}'>{$get['itemname']}</div></td>
						<td width='80px'>{$shop['shopname']}</td>
						<td width='120px'>$until</td>
						<td align='center' width='90px'>{$price['percent']}%</td>
						<td align='center'>{$price['text']}</td>
					</tr>
				";
			}
		}
		
		//var_dump($day_list);
		
		for($i = 0; $i < count($day_list); $i++) {
			$date = date("d.m.Y", $day_list[$i][0]);
			$date = str_replace(date("d.m.Y"), "Сегодня", $date);
			if(strcmp($date, "Сегодня") != 0) $moreDays = " (Через ".showDateDo($day_list[$i][0]).")"; else $moreDays = "";
			$content .= "
				<div class='plan_razdel'>
					<div class='plan_header'><b>$date</b>$moreDays</div>
					<table class='uk-table uk-width-1-1 uk-table-striped uk-table-hover'>
						<tr>
							<td width='25px'></td>
							<td width='150px'><b>Название</b></td>
							<td width='80px'><b>Раздел</b></td>
							<td width='120px'><b>Скидка до</b></td>
							<td align='center' width='90px'><b>Процент</b></td>
							<td align='center'><b>Новая цена</b></td>
						</tr>
						{$day_list_items[$day_list[$i][1]]}
					</table>
				</div>
			";
		}
	}