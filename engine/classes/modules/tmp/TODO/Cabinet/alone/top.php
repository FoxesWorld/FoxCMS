<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	$header = "Рейтинг голосующих игроков";
	$content = "
		<div style='font-size: 14px;padding: 10px;background: rgba(0, 0, 0, 0.09);border-radius: 5px;'>
			Каждый месяц среди всех тех, кто голосует за нас в топах, мы разыгрываем <b>2250 игровых рублей</b>!<br/>
			Чтобы стать участником розыгрыша - стремись занять одну из первых трех позиций в этом рейтинге.<br/>
			<a href='$DURL/cabinet?loc=votes'>Подробнее о рейтинге и голосовании</a>
		</div><br/>
	";
	
	$position = 0;
	$myPos = 0;
	$select = $db->query("SELECT * FROM dle_users WHERE votes>0 ORDER BY votes DESC");
	while($get = $db->get_row($select)) {
		$myPos++;
		if($get['name'] == $member_id['name']) $position = $myPos;
	}
	
	if(!$position) $mypos = "Вы еще ни разу не голосовали"; else $mypos = "Вы занимаете <b>$position место</b> в рейтинге";
	$content .= "<div class='mypos-top'>$mypos</div>";
	
	$select = $db->query("SELECT * FROM dle_users WHERE votes>0 ORDER BY votes DESC LIMIT 20");
	if($db->num_rows($select)) {
		$num = 1;
		$list = 1;
		$content .= "<table class='uk-table uk-table-striped'>";
		while($get = $db->get_row($select)) {
			$avatar = getAvatar($get['name']);
			$word = get_count($get['votes'], "раз", "раза", "раз");
			if($num == 1) $money = "<b class='uk-text-success'>Получит 1000 игровых руб.</b>";
			else if($num == 2) $money = "<b class='uk-text-success'>Получит 750 игровых руб.</b>";
			else if($num == 3) $money = "<b class='uk-text-success'>Получит 500 игровых руб.</b>";
			else $money = "";

			$content .= "
				<tr $color>
					<td width='20px' align='center'><b>$num.</b></td>
					<td width='20px'><div style='width: 20px;height: 20px;border-radius: 50px;background-size: cover;background-position: center;background-image: url($avatar);'></div></td>
					<td>{$get['name']}</td>
					<td><span>Проголосовал<span class='uk-text-muted'>(-а)</span> {$get['votes']} $word</td>
					<td>$money</td>
				</tr>
			";
			$list++;
			$num++;
		}
		$content .= "</table>";
	}
	else $content .= "<div class='top-empty' align='center'>В рейтинге сейчас никого нет, голосуйте и станьте первым!</div>";
	
	$tpl->load_template('modules.tpl');
	$tpl->set('{header}', $header);
	$tpl->set('{content}', $content);
	$tpl->compile('content');
	$tpl->clear();