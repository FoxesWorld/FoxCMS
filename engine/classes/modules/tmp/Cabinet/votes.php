<?php
	if(!defined('FOXXEY')) die("Hacking attempt!");
	if($member_id['name']) {
		$check = $db->query("SELECT * FROM vote_table WHERE uuid='{$member_id['uuid']}' AND `from`='topcraft' AND date_text='".date("d.m.Y")."'");
		if(!$db->num_rows($check)) $vote['topcraft'] = "<a href='http://topcraft.ru/servers/9616/' target='_blank'><button type='button' class='uk-button uk-width-1-1' style='border-radius: 5px;'>Голосовать</button></a>";
		else $vote['topcraft'] = "<div class='top-success'><i class='uk-icon-check'></i> Проголосовал</div>";
		
		$check = $db->query("SELECT * FROM vote_table WHERE uuid='{$member_id['uuid']}' AND `from`='mcrate' AND date_text='".date("d.m.Y")."'");
		if(!$db->num_rows($check)) $vote['mcrate'] = "<a href='http://mcrate.su/rate/7698' target='_blank'><button type='button' class='uk-button uk-width-1-1' style='border-radius: 5px;'>Голосовать</button></a>";
		else $vote['mcrate'] = "<div class='top-success'><i class='uk-icon-check'></i> Проголосовал</div>";
		
		$check = $db->query("SELECT * FROM vote_table WHERE uuid='{$member_id['uuid']}' AND `from`='mctop' AND date_text='".date("d.m.Y")."'");
		if(!$db->num_rows($check)) $vote['mctop'] = "<a href='http://mctop.su/vote/5565' target='_blank'><button type='button' class='uk-button uk-width-1-1' style='border-radius: 5px;'>Голосовать</button></a>";
		else $vote['mctop'] = "<div class='top-success'><i class='uk-icon-check'></i> Проголосовал</div>";
		
		$votes = "
			<div style='font-size: 14px;padding: 10px;background: rgba(0, 0, 0, 0.09);border-radius: 5px;'>
				Каждый месяц среди всех тех, кто голосует за нас в топах, мы разыгрываем <b>2250 игровых рублей</b>!<br/>
				Чтобы стать участником розыгрыша - стремись занять одну из первых трех позиций в нашем <a href='$DURL/top'>рейтинге голосующих</a>.
			</div><br/>
			<table class='uk-width-1-1'>
				<tr>
					<td align='center'>
						<div class='top-block'>
							<div class='top-name'>TopCraft.ru</div>
							<div class='top-nagrada'>Награда: до <b>5 рублей</b></div>
							<div class='top-status'>{$vote['topcraft']}</div>
						</div>
					</td>
					<td align='center'>
						<div class='top-block'>
							<div class='top-name'>MCTop.su</div>
							<div class='top-nagrada'>Награда: до <b>5 рублей</b></div>
							<div class='top-status'>{$vote['mctop']}</div>
						</div>
					</td>
					<td align='center'>
						<div class='top-block'>
							<div class='top-name'>MCRate.su</div>
							<div class='top-nagrada'>Награда: до <b>5 рублей</b></div>
							<div class='top-status'>{$vote['mcrate']}</div>
						</div>
					</td>
				</tr>
			</table>
		";
		
		$position = 0;
		$myPos = 0;
		$select = $db->query("SELECT * FROM dle_users WHERE votes>0 ORDER BY votes DESC");
		while($get = $db->get_row($select)) {
			$myPos++;
			if($get['name'] == $member_id['name']) $position = $myPos;
		}
		
		if(!$position) $mypos = "Вы еще ни разу не голосовали"; else $mypos = "Вы занимаете <b>$position место</b> в рейтинге";
		$votes .= "<div class='mypos-top'>$mypos</div>";
		
		$secret = 412+$member_id['user_id']+12912;
		
		$votes .= "
			<div style='font-size: 14px;margin-top: 20px;'>
				<b style='color: #6a4936;font-size: 16px;margin-bottom: -14px;display: block;'>Что нужно делать?</b><br/>
				1. <b>КАЖДЫЙ ДЕНЬ</b> голосуйте за нас на в топах выше.<br/>
				2. Продвигаетесь на первые места нашего Рейтинга голосующих, <a href='$DURL/top'>перейти</a>.<br/>
				3. Получайте свои деньги, если вы заняли одну из <b>ТРЕХ ПЕРВЫХ</b> позиций в рейтинге голосующих.<br/><br/>
				
				<b style='color: #6a4936;font-size: 16px;margin-bottom: -14px;display: block;;'>Какая награда?</b><br/>
				1 место в рейтинге - <b>1000 игровых рублей</b><br/>
				2 место в рейтинге - <b>750 игровых рублей</b><br/>
				3 место в рейтинге - <b>500 игровых рублей</b><br/>
				+ Каждый голос принесет тебе до 10 рублей на баланс ParadiseCloud.ru!<br/><br/>
			</div>
		";
	}