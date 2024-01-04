<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	if($member_id['name'] == 'andrew_shbov') {
		$header = "Лог доходов";
		
		$totalPercent = 0;
				
		$today = strtotime("midnight today");
		$yesterday = strtotime("midnight yesterday");
		if(date('N') == 7) $firstMonday = strtotime("midnight monday last week");
		else $firstMonday = strtotime("midnight monday this week");
		$firstDay = strtotime("midnight first day of this month");
		$firstDayFirst = strtotime("midnight first day of previous month");
		$firstDayLast = strtotime("midnight last day of previous month")+86399;
		$firstSundayEile = strtotime("midnight next monday -2 week");
		
		/*$select = $db->query("SELECT * FROM user_actions WHERE description LIKE '%HD%'");
		if($db->num_rows($select)) {
			while($get = $db->get_row($select)) {
				$db->query("UPDATE user_actions SET type='8' WHERE id='{$get['id']}'");
			}
		}*/
		
		
		//echo date("d.m.Y H:i", $firstMonday);
		$select = $db->query("SELECT * FROM user_actions WHERE type='1' OR type='10' ORDER BY id DESC");
		if($db->num_rows($select)) {
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				if($get['unix_time'] >= $firstMonday) $weekPlus += $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus += $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus += $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma += $get['summa'];
				if($get['unix_time'] >= $firstSundayEile && $get['unix_time'] <= $firstMonday) $lastWeek += $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth += $get['summa'];
				$totalSumma += $get['summa'];
			}
			$total[0] = $totalSumma;
		}
		
		$content = "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Пополнения баланса</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
			
			<canvas id='chart2' width='400' height='200'></canvas>
		";
		
		$select = $db->query("SELECT * FROM user_actions WHERE type='5' ORDER BY id DESC");
		if($db->num_rows($select)) {
			//echo date("d.m.Y H:i", $firstSundayEile);
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				$check = $db->query("SELECT * FROM dle_users WHERE uuid='{$get['uuid']}' AND user_group='1'");
				if($db->num_rows($check)) continue;
				//if(strripos($get['description'], "устанавливать HD") == 0) $db->query("UPDATE user_actions SET type='8' WHERE id='{$get['id']}'");
				if($get['unix_time'] >= $firstMonday) $weekPlus -= $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus -= $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus -= $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma -= $get['summa'];
				if($get['unix_time'] >= $firstMondayEile && $get['unix_time'] <= $firstMonday) $lastWeek -= $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth -= $get['summa'];
				$totalSumma -= $get['summa'];
			}
			$total[1] = $totalSumma;
		}
		
		$percent = round(($total[1]/$total[0])*100, 2);
		$totalPercent += $percent;
		
		$content .= "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Доход с магазина ({$percent}% от всего доната)</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
			<canvas id='chart1' width='400' height='200'></canvas>
		";
		
		$select = $db->query("SELECT * FROM user_actions WHERE type='2' OR type='3' ORDER BY id DESC");
		if($db->num_rows($select)) {
			//echo date("d.m.Y H:i", $firstSundayEile);
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				if($get['unix_time'] >= $firstMonday) $weekPlus -= $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus -= $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus -= $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma -= $get['summa'];
				if($get['unix_time'] >= $firstMondayEile && $get['unix_time'] <= $firstMonday) $lastWeek -= $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth -= $get['summa'];
				$totalSumma -= $get['summa'];
			}
			$total[2] = $totalSumma;
		}
		
		$percent = round(($total[2]/$total[0])*100, 2);
		$totalPercent += $percent;
		
		$content .= "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Доход с платных групп ({$percent}% от всего доната)</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
		";
		
		$select = $db->query("SELECT * FROM user_actions WHERE type='4' ORDER BY id DESC");
		if($db->num_rows($select)) {
			//echo date("d.m.Y H:i", $firstSundayEile);
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				if($get['unix_time'] >= $firstMonday) $weekPlus -= $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus -= $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus -= $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma -= $get['summa'];
				if($get['unix_time'] >= $firstMondayEile && $get['unix_time'] <= $firstMonday) $lastWeek -= $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth -= $get['summa'];
				$totalSumma -= $get['summa'];
			}
			$total[3] = $totalSumma;
		}
		
		$percent = round(($total[3]/$total[0])*100, 2);
		$totalPercent += $percent;
		
		$content .= "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Доход с FLY ({$percent}% от всего доната)</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
		";
		
		$select = $db->query("SELECT * FROM user_actions WHERE type='8' ORDER BY id DESC");
		if($db->num_rows($select)) {
			//echo date("d.m.Y H:i", $firstSundayEile);
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				if($get['unix_time'] >= $firstMonday) $weekPlus -= $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus -= $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus -= $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma -= $get['summa'];
				if($get['unix_time'] >= $firstMondayEile && $get['unix_time'] <= $firstMonday) $lastWeek -= $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth -= $get['summa'];
				$totalSumma -= $get['summa'];
			}
			$total[4] = $totalSumma;
		}
		
		$percent = round(($total[4]/$total[0])*100, 2);
		$totalPercent += $percent;
		
		$content .= "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Доход с продажи HD скинов/плащей ({$percent}% от всего доната)</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
		";
		
		$select = $db->query("SELECT * FROM user_actions WHERE type='6' ORDER BY id DESC");
		if($db->num_rows($select)) {
			//echo date("d.m.Y H:i", $firstSundayEile);
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				if($get['unix_time'] >= $firstMonday) $weekPlus -= $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus -= $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus -= $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma -= $get['summa'];
				if($get['unix_time'] >= $firstMondayEile && $get['unix_time'] <= $firstMonday) $lastWeek -= $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth -= $get['summa'];
				$totalSumma -= $get['summa'];
			}
			$total[5] = $totalSumma;
		}
		
		$percent = round(($total[5]/$total[0])*100, 2);
		$totalPercent += $percent;
		
		$content .= "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Доход с платной разблокировки ({$percent}% от всего доната)</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
		";
		
		$select = $db->query("SELECT * FROM user_actions WHERE type='9' ORDER BY id DESC");
		if($db->num_rows($select)) {
			//echo date("d.m.Y H:i", $firstSundayEile);
			$weekPlus = 0;
			$monthPlus = 0;
			$todayPlus = 0;
			$yesterdaySumma = 0;
			$lastWeek = 0;
			$lastMonth = 0;
			$totalSumma = 0;
			
			while($get = $db->get_row($select)) {
				if($get['unix_time'] >= $firstMonday) $weekPlus -= $get['summa'];
				if($get['unix_time'] >= $firstDay) $monthPlus -= $get['summa'];
				if($get['unix_time'] >= $today) $todayPlus -= $get['summa'];
				if($get['unix_time'] >= $yesterday && $get['unix_time'] < $today) $yesterdaySumma -= $get['summa'];
				if($get['unix_time'] >= $firstMondayEile && $get['unix_time'] <= $firstMonday) $lastWeek -= $get['summa'];
				if($get['unix_time'] >= $firstDayFirst && $get['unix_time'] <= $firstDayLast) $lastMonth -= $get['summa'];
				$totalSumma -= $get['summa'];
			}
			$total[6] = $totalSumma;
		}
		
		$percent = round(($total[6]/$total[0])*100, 2);
		$totalPercent += $percent;
		
		$content .= "
			<table class='uk-width-1-1 uk-table-striped uk-table uk-table-hover'>
				<tr><td colspan='2'><b>Доход с наборов в магазине ({$percent}% от всего доната)</b></td></tr>
				<tr><td width='250px'>Доход за сегодняшний день</td><td>".round($todayPlus, 2)." руб.</td></tr>
				<tr><td>Доход за вчерашний день</td><td>".round($yesterdaySumma, 2)." руб.</td></tr>
				<tr><td>Доход за эту неделю</td><td>".round($weekPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлую неделю</td><td>".round($lastWeek, 2)." руб.</td></tr>
				<tr><td>Доход за этот месяц</td><td>".round($monthPlus, 2)." руб.</td></tr>
				<tr><td>Доход за прошлый месяц</td><td>".round($lastMonth, 2)." руб.</td></tr>
				<tr><td>Доход за все время</td><td>".round($totalSumma, 2)." руб.</td></tr>
			</table>
		";

		
		$select = $db->query("SELECT SUM(abs(summa)) AS summa, FROM_UNIXTIME(`unix_time`, '%d.%m.%y') AS dateHeh FROM user_actions WHERE type='5' GROUP BY FROM_UNIXTIME(`unix_time`, '%d.%m.%y') ORDER BY id ASC");
		if($db->num_rows($select)) {
			while($get = $db->get_row($select)) {
				$dates .= " '{$get['dateHeh']}' ";
				$summas .= " {$get['summa']} ";
			}
			$dates = str_replace('  ', ',', $dates);
			$dates = str_replace(' ', '', $dates);
			$summas = str_replace('  ', ',', $summas);
			$summas = str_replace(' ', '', $summas);
		}
		
		$content .= "
			<script>
				var lineChartData = {
				  labels: [$dates],
				  datasets: [{
				    label: 'Доход за сутки с магазина',
				    data: [$summas]
				  }]
				};
			</script>
		";
		
		$dates = "";
		$summas = "";
		$select = $db->query("SELECT SUM(abs(summa)) AS summa, FROM_UNIXTIME(`unix_time`, '%d.%m.%y') AS dateHeh FROM user_actions WHERE type='1' GROUP BY FROM_UNIXTIME(`unix_time`, '%d.%m.%y') ORDER BY id ASC");
		if($db->num_rows($select)) {
			while($get = $db->get_row($select)) {
				$dates .= " '{$get['dateHeh']}' ";
				$summas .= " {$get['summa']} ";
			}
			$dates = str_replace('  ', ',', $dates);
			$dates = str_replace(' ', '', $dates);
			$summas = str_replace('  ', ',', $summas);
			$summas = str_replace(' ', '', $summas);
		}
		
		$content .= "
			<script>
				var lineChartData2 = {
				  labels: [$dates],
				  datasets: [{
				    label: 'Доход за сутки (общий)',
				    data: [$summas]
				  }]
				};
			</script>
			<script src='$DURL/loadscript/log'></script>
		";
		
		$totalSumma = round($total[1]+$total[2]+$total[3]+$total[4]+$total[5], 2);
		$percent = round($totalPercent-100, 2);
		$leftMoney = round($totalSumma*$percent/100, 2);
		
		$content .= "<div class='uk-text-danger'><b>$leftMoney руб. ({$percent}%)</b> - средства из ниоткуда (администраторы, деньги за ивенты)</div>";
	}
	else header("Location: $DURL");
	
	$tpl->load_template('modules.tpl');
	$tpl->set('{header}', $header);
	$tpl->set('{content}', $content);
	$tpl->compile('content');
	$tpl->clear();