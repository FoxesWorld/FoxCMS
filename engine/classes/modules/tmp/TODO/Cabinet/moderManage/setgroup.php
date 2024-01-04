<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}

$username = $member_id['name'];
if ($username) {
    if (isCan($member_id['uuid'], 'admin') || isCan($member_id['uuid'], 'mladmin') || $member_id['user_group'] == 1) {
        include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/mineconf.php";
        $header = "Управление группами игроков";

        if ($_POST['return']) {
            $uname = $db->safesql($_POST['uname']);
            $until = $db->safesql($_POST['until']);
            $group = $db->safesql($_POST['group']);
            $serverid = $db->safesql($_POST['serverid']);
            $until = getUnixTime($until);
            foreach ($_servers as $sver) {
                if ($sver['id'] == $serverid) {
                    $pex_prefix = $sver['pex_prefix'];
                    $svername = $sver['name'];
                }
            }
            if ($uname && $until && $group && $serverid) {
                $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$uname'");
                $uuid = $sel['uuid'];
                $db->query("DELETE FROM donate_group WHERE uuid='$uuid' AND serverid='$serverid'");
                $db->query("INSERT INTO `donate_group` ( `uuid`, `serverid`, `group_name`, `buy_date`, `end_date`) values ( '$uuid', '$serverid', '$group', '" . time() . "', '$until')");
                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='$uuid' AND type='1'");
                $db->query("DELETE FROM `{$pex_prefix}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                $db->query("INSERT INTO `{$pex_prefix}permissions` ( `name`, `type`, `permission`, `value`, `world` ) VALUES('$uuid', '1', 'group-$group-until', '$until', '')");
                $db->query("INSERT INTO `{$pex_prefix}permissions_inheritance` VALUES(null, '$uuid', '$group', '1', null)");
                $info = returnNotifer("Игроку <b>$uname</b> выдана группа <b>$group</b> на сервер <b>$svername</b> до <b>" . date("d.m.Y H:i", $until) . "</b>", "check", "true");
                addLog($sel['uuid'], 0, "[$svername] Админ <b>$username</b> выдал группу <b>$group</b> до <b>" . date("d.m.Y H:i", $until) . "</b>", 14);
            }
        }

        if ($_POST['dserverid']) {
            $nickname = $db->safesql($_POST['nickname']);
            $serverid = $db->safesql($_POST['dserverid']);
            if ($nickname && $serverid) {
                foreach ($_servers as $sver) {
                    if ($sver['id'] == $serverid) {
                        $pex_prefix = $sver['pex_prefix'];
                        $svername = $sver['name'];
                    }
                }
                $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$nickname'");
                $uuid = $sel['uuid'];
                $db->query("DELETE FROM `donate_group` WHERE uuid='$uuid' AND serverid='$serverid'");
                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='$uuid' AND type='1'");
                $db->query("DELETE FROM `{$pex_prefix}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{$member_id['uuid']}' AND permission='suffix' AND type='1'");
                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{$member_id['uuid']}' AND permission='prefix' AND type='1'");
                $info = returnNotifer("Игроку <b>$uname</b> выдана группа <b>$group</b> на сервер <b>$svername</b> до <b>" . date("d.m.Y H:i", $until) . "</b>", "check", "true");
                addLog($uuid, 0, "[$svername] Админ <b>$username</b> преждевременно снял группу с игрока.", 14);
                $info = returnNotifer("С игрока <b>$nickname</b> на сервере <b>$svername</b> успешно снята группа.", "check", "true");
            }
        }

        if ($_POST['search'] || $_POST['dserverid'] || $_POST['return']) {
            $nickname = $db->safesql($_POST['nickname']);
            if ($nickname) {
                $select = $db->query("SELECT * FROM dle_users WHERE name='$nickname'");
                if ($db->num_rows($select)) {
                    $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$nickname'");
                    foreach ($_servers as $vser) {
                        $group = getserverGroup($sel['uuid'], $vser['id']);
                        if (!$group['group']) {
                            $group['group'] = "<span class='uk-text-muted'>none</span>";
                        } else {
                            $group['group'] = $group['group'];
                        }

                        if (!$group['until']) {
                            $group['until'] = "Не ограничен";
                        } else {
                            $group['until'] = date("d.m.Y H:i", $group['until']);
                        }

                        $check = $db->query("SELECT * FROM user_actions WHERE uuid='{$sel['uuid']}' AND type='2' AND description LIKE '[{$vser['name']}]% ' ORDER BY unix_time DESC");
                        if ($db->num_rows($check)) {
                            while ($get = $db->get_row($check)) {
                                $datetime = date("d.m.Y H:i", $get['datetime']);
                                $info .= "<div><b>$datetime</b>: {$get['action']}</div>";
                            }
                        } else {
                            $info = returnNotifer("Ни разу не приобретал себе платную группу.", "check", "true");
                        }

                        if ($group['group'] == 'iron' || $group['group'] == 'gold' || $group['group'] == 'diamond') {
                            $delete = "Удалить группу => <input type='submit' name='dserverid' value='{$vser['id']}' style='color:white; width: 25px;' class='uk-button uk-button-mini'>";
                        } else {
                            $delete = "";
                        }

                        $output .= "
						<table class='uk-table uk-table-striped'>
						<tr><td colspan='2' style='border: 0px;text-align:center;'>Сервер: <b>{$vser['name']}</b></td></tr>
							<tr><td style='border: 0px;'>ID группы</td><td style='border: 0px;'><b>{$group['group']}</b></td></tr>
							<tr><td style='border: 0px;'>Наименование</td><td style='border: 0px;'><b>{$group['group_name']}</b> $delete</td></tr>
							<tr><td style='border: 0px;'>Срок</td><td style='border: 0px;'><b>{$group['until_text']}</b></td></tr>
							<tr><td style='border: 0px;' colspan='2'>$info</td></tr>
						</table>
					";
                    }
                } else {
                    $error = returnNotifer("Указанный игрок не зарегистринован.", "", "false");
                }

            } else {
                $error = returnNotifer("Укажите ник игрока, чью историю групп будем просматривать", "", "false");
            }

        }
        foreach ($_servers as $v) {
            $servers .= "<option value='{$v['id']}'>{$v['name']}</option>";
        }
        $line[0] = "
			$error
			<form class='uk-form' action method='post'>
				<div style='margin-bottom: 10px;'>Введите ниже ник, чью информацию по группам хотите получить</div>
				<div style='margin-bottom: 15px' class='uk-grid'>
					<div class='uk-width-7-10'><input style='width: 100%;' type='text' value='$nickname' name='nickname' placeholder='Example'></div>
					<div class='uk-width-3-10'><input style='width: 100%; color:white' type='submit' name='search' value='Искать' class='uk-button'></div>
				</div>
				$output
			</form><hr/>

			<form class='uk-form' action method='post'>
				<div style='margin-bottom: 10px;'>Заполните данные ниже, чтобы выдать тому или иному игроку группу</div>
				<table class='uk-table uk-table-striped'>
					<tr>
						<td>Ник игрока</td>
						<td><input type='text' name='uname' value='$nickname' class='uk-width-1-1' placeholder='Example'></td>
					</tr>
					<tr>
						<td>Группа</td>
						<td>
							<select name='group' class='uk-width-1-1'>
								<option value='iron'>Iron</option>
								<option value='gold'>Gold</option>
								<option value='diamond'>Diamond</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Длительность группы</td>
						<td><input type='datetime-local' name='until' class='uk-width-1-1' placeholder='Example'></td>
					</tr>
					<tr>
						<td>Сервер</td>
						<td><select style='width:100%' name='serverid'>$servers</select></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>Если у выбранного игрока уже есть группа, она будет аннулирована.</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><input type='submit' name='return' style='color:white' value='Продолжить' class='uk-button uk-width-1-1'></td>
					</tr>
				</table>
			</form>
		";

        $tpl->load_template('modules.tpl');
        $tpl->set('{header}', $header);
        $tpl->set('{content}', $line[0]);
        $tpl->compile('content');
        $tpl->clear();
    }
}
