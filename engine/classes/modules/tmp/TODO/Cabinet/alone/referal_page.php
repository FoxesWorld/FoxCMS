<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	if($member_id['name']) {
		$header = "Мои рефералы";
		$content = "
			<div style='padding: 10px;background: rgba(0, 0, 0, 0.07);border-bottom: 3px solid rgba(0, 0, 0, 0.24);font-size: 13px;margin-top: -9px;'>
				<b>Хотите заработать денег себе на баланс? Приглашайте к нам друзей!</b><br/>
				Передайте своим друзьям ссылку <b class='uk-text-success'>$DURL/r{$member_id['user_id']}</b><br/>
				Как только друг перейдет по этой ссылке и зарегистрируется - он автоматически станет вашим рефералом!<br/><br/>
				<b>Какую награду я получу?</b><br/>
				Если ваш друг отыграет на наших серверах <u>8 часов</u> - вы получите 10 рублей на баланс.<br/>
				Если ваш друг отыграет на наших серверах <u>24 часов</u> - вы получите 30 рублей на баланс.<br/>
				Если ваш друг отыграет на наших серверах <u>48 часов</u> - вы получите 50 рублей на баланс.<br/>
			</div>
		";
		
		$select = $db->query("SELECT * FROM dle_users WHERE referal='{$member_id['user_id']}'");
		if($db->num_rows($select)) {
			//72
			$content .= "<table class='uk-table uk-width-1-1 uk-table-striped'>";
			while($get = $db->get_row($select)) {
				
				$time = array('playtime' => 0, 'onlinetime' => 0);
				$check = $db->super_query("SELECT * FROM playTime WHERE username='{$get['name']}'");
				$time["playtime"] += $check['playtime'];
				$time["onlinetime"] += $check['onlinetime'];
				$hours = floor($time["playtime"] / 60);
				$percent = round(($hours/48)*100, 2);
				$referal_step = explode(",", $get['referal_step']);
				if($hours >= 8) {
					$hour8 = "setpurple"; 
					if((int)$referal_step[0] == 0) {
						$referal_step[0] = 1;
						$db->query("UPDATE dle_users SET cash=cash+10 WHERE name='{$member_id['name']}'");
					}
				}
				else $hour8 = "";
				if($hours >= 24) {
					$hour24 = "setpurple"; 
					if((int)$referal_step[1] == 0) {
						$referal_step[1] = 1;
						$db->query("UPDATE dle_users SET cash=cash+30 WHERE name='{$member_id['name']}'");
					}
				}
				else $hour24 = "";
				if($hours >= 48) {
					$hour48 = "setpurple"; 
					if((int)$referal_step[2] == 0) {
						$referal_step[2] = 1;
						$db->query("UPDATE dle_users SET cash=cash+50 WHERE name='{$member_id['name']}'");
					}
				}
				else $hour48 = "";
				$new = "{$referal_step[0]},{$referal_step[1]},{$referal_step[2]}";
				$db->query("UPDATE dle_users SET referal_step='$new' WHERE name='{$get['name']}'");
				$content .= "
					<tr>
						<td width='120px'><b>{$get['name']}</b> ($hours ч.)</td>
						<td width='120px'>".showDate($get['reg_date'], true)."</td>
						<td>
							<div class='progress-height'>
								<div class='postimeline hr8 $hour8'><b>+10 руб.</b><span></span></div>
								<div class='postimeline hr24 $hour24'><b>+30 руб.</b><span></span></div>
								<div class='postimeline hr48 $hour48'><b>+50 руб.</b><span></span></div>
								<div class='progress-time'>
									<div class='progress-time-line' style='width: {$percent}%'></div>
								</div>
							</div>
						</td>
					</tr>
				";
			}
			$content .= "</table>";
		}
		else $content .= "<div class='mypos-top'>Вы еще никого не пригласили</div>";
		
		$tpl->load_template('modules.tpl');
		$tpl->set('{header}', $header);
		$tpl->set('{content}', $content);
		$tpl->compile('content');
		$tpl->clear();
	}
	else header("Location: $DURL");