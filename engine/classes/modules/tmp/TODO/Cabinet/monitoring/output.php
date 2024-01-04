<?php
include "/home/admin/web/paradisecloud.ru/public_html/engine/data/mineconf.php";

$getonline = json_decode(file_get_contents('engine/modules/andrew_shbov/monitoring/online.json'), true);
$cont_servers = count($_servers);
$countOnlines = count($getonline);

$num = 1;
$total = 0;
$totalOf = 0;
$onlineTest = 0;
for ($i = 1; $i < $cont_servers + 1; $i++) {
    $online = $getonline[$i]['online'];
    $width = ($online / $_servers[$i]['max']) * 100;
    if ($width > 100) {
        $width = 100;
    }

    $width = str_replace(",", ".", $width);
    if ($online != 999 && $_servers[$i]['display'] == 1 && $_servers[$i]['works'] == 0) {
        $total += $online;
    }

    if ($online != 999 && $_servers[$i]['display'] == 1 && $_servers[$i]['works'] == 0) {
        $totalOf += $_servers[$i]['max'];
    }

    if ($online != 999 && $_servers[$i]['display'] == 1) {
        echo "
				<div class='block-monitor'>
					{$_servers[$i]['name']}
					<span class='block-monitor-prs'>$online <i class='uk-icon-male'></i></span>
					<div class='block-monitor1'>
						<div class='block-monitor-fix'>
							<span style='width:{$width}%;'></span></div>
						</div>
				</div>
			";
    } elseif ($online == 999) {
        echo "
				<div class='block-monitor'>
					{$_servers[$i]['name']}
					<span class='block-monitor-prs monitor-off'>OFF</span>
					<div class='block-monitor1'>
						<div class='block-monitor-fix'>
							<span class='monitor-pvp' style='width:100%;'></span>
						</div>
					</div>
				</div>
			";
    }
    $onlineTest += 10;
    $num++;
}

$currentDate = date("d.m.Y");
$select = $db->super_query("SELECT * FROM my_online_history WHERE dateText='$currentDate' ORDER BY online DESC LIMIT 1");
$topOnlineToday = $select['online'];
$topOnlineTodayWord = get_count($select['online'], "игрок", "игрока", "игроков");
$topOnlineTodayDate = "Сегодня в {$select['timeText']}";

$select = $db->super_query("SELECT * FROM my_online_history ORDER BY online DESC LIMIT 1");
$topTotalToday = $select['online'];
$topOnlineTotalWord = get_count($select['online'], "игрок", "игрока", "игроков");
$topOnlineTotalDate = "Сегодня в {$select['timeText']}";

$totalWord = get_count($total, "игрок", "игрока", "игроков");

$width = $total / $totalOf * 100;
if ($width > 100) {
    $width = 100;
}

$width = str_replace(",", ".", $width);
echo "
		<div class='mon_totalonline'>
			Общий онлайн: $total $totalWord
			<div class='total-monitor'><div class='total-monitor-width' style='width: {$width}%'></div></div>
		</div>
	";
