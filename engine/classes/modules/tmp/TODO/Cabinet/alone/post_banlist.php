<?php
	$user_group = getGroup($member_id['uuid']);
	if($user_group['group'] == 'member') $user_group['group'] = '';
	setlocale(LC_NUMERIC, "C");
	if(!defined("DATALIFEENGINE")) die();
	if($member_id['name']) {
		$group = getGroup($member_id['uuid']);
		$action = $db->safesql($_POST['action']);
		$player = $db->safesql($_POST['player']);
		$hash = $db->safesql($_POST['hash']);
		$uuidHash = $db->safesql($_POST['uuidHash']);
		$playeruuid = $db->safesql($_POST['uuid']);
		$mhash = md5($member_id['uuid'].$member_id['name'].$member_id['uuid']);
		if(strcmp($member_id['uuid'], $playeruuid) == 0 && strcmp($mhash, $uuidHash) == 0) {
			if(strcmp($member_id['name'], $player) == 0 && strcmp(md5($member_id['password'].$member_id['name']), $hash) == 0) {
				if($action == "changepage") {
					$perpage = 20;
					$search = $db->safesql($_POST['searchword']);
					$page = $db->safesql($_POST['page']);
					if($page >= 1) {
						if(!$search) $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 ORDER BY id DESC");
						else {
							$user = $db->super_query("SELECT * FROM dle_users WHERE name='$search'");
							$uuid = $user['uuid'];
							$select = $db->query("SELECT * FROM litebans_bans WHERE active=1 AND banned_by_name='$search' OR active=1 AND reason='$search' OR active=1 AND uuid='$uuid' ORDER BY id DESC");
						}
						$totalitems = $db->num_rows($select);
						if($totalitems) {
							echo "<div id='banlistOutput'>";
							$totalpages = ceil($totalitems/$perpage);
							if(!$page) $page = 1;
							if($page > ceil($totalitems/$perpage)) $page = ceil($totalitems/$perpage);
							$start = ($page - 1) * $perpage;
							
							if(!$search) $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 ORDER BY id DESC LIMIT $start,$perpage");
							else $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 AND banned_by_name='$search' OR active=1 AND reason='$search' OR active=1 AND uuid='$uuid' ORDER BY id DESC LIMIT $start,$perpage");
							if($db->num_rows($select)) {
								echo "<table class='uk-table uk-width-1-1 uk-table-striped'>";
								echo "
									<tr style='background: rgba(160, 125, 83, 0.38);'>
										<td><b>Нарушитель</b></td>
										<td><b>Наказал(-а)</b></td>
										<td><b>Дата блокировки</b></td>
										<td><b>Причина</b></td>
										<td><b>Разблокировка</b></td>
									</tr>
								";
								while($get = $db->get_row($select)) {
									$check = $db->super_query("SELECT name FROM dle_users WHERE uuid='{$get['uuid']}'"); $banned_nickname = $check['name'];
									$check = $db->super_query("SELECT name FROM dle_users WHERE uuid='{$get['banned_by_uuid']}'"); $admin_nickname = $check['name'];
									$date_of_ban = showDate(substr($get['time'], 0, strlen($get['time'])-3));
									if($get['until'] < 0) $until_ban = "<span class='uk-text-danger'>Перманентно</span>"; else $until_ban = date("d.m.Y в H:i", substr($get['until'], 0, strlen($get['until'])-3));
									$until_ban = str_replace(date("d.m.Y"), "Сегодня", $until_ban);
									$until_ban = str_replace(date("d.m.Y", time()+86400), "Завтра", $until_ban);
									if(stripos($get['reason'], '@') !== false) {
										$get['reason'] = str_replace('@', '', $get['reason']);
										$get['reason'] = "<i class='uk-icon-lock' data-uk-tooltip title='Без права на платную разблокировку'></i> {$get['reason']}";
									}
									
									if(stripos($get['reason'], '?') !== false) $get['reason'] = "<span style='opacity: 0.5'>Не указана</span>";
									$group = getGroup($get['banned_by_uuid']);
									if($group['group'] == 'admin') $admin_nickname = "<b class='uk-text-danger'>$admin_nickname</b>"; else $admin_nickname = "<b class='uk-text-primary'>$admin_nickname</b>";
									echo "
										<tr>
											<td>$banned_nickname</td>
											<td>$admin_nickname</td>
											<td>$date_of_ban</td>
											<td>{$get['reason']}</td>
											<td>$until_ban</td>
										</tr>
									";
								}
								echo "</table>";
								
								$prevpage = $page-1;
								$nextpage = $page+1;
								if($page == 1) $first_page = ""; else $first_page = "<button type='button' class='uk-button changepage' disabled data-page='1'>1</button>"; 
								if($page == $totalpages) $last_page = ""; else $last_page = "<button type='button' class='uk-button changepage' disabled data-page='$totalpages'>$totalpages</button>"; 
								
								if($page > 1) $prev_page = "<button type='button' class='uk-button changepage' data-page='$prevpage' disabled>Предыдущая страница</button>"; 
								else $prev_page = "<button type='button' class='uk-button disabledButton' disabled>Предыдущая страница</button>";
								
								if($member_id['name']) {
									if($page < $totalpages) $next_page = "<button type='button' class='uk-button changepage' disabled data-page='$nextpage'>Следующая страница</button>"; 
									else $next_page = "<button type='button' class='uk-button disabledButton' disabled>Следующая страница</button>";
									echo "
										<table style='margin-top: 10px' class='uk-width-1-1'>
											<tr>
												<td>$first_page$prev_page</td>
												<td align='center'>$page из $totalpages</td>
												<td align='right'>$next_page$last_page</td>
											</tr>
										</table>
										</div>
									";
								}
							}
						}
					}
				}
			}
			else echo json_encode(array('status' => 1, 'text' => 'Ошибка авторизации на сервере ParadiseCloud.ru, обновите страницу', 'id' => $itemid));
		}
		else echo json_encode(array('status' => 1, 'text' => 'Ошибка авторизации на сервере ParadiseCloud.ru, обновите страницу'));
	}
	die();