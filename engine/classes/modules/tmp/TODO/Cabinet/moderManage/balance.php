<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}

$username = $member_id['name'];
$group = getGroup($member_id['uuid']);
if ($username) {
    if ($group['group'] == "admin" || $member_id['user_group'] == 1 || $group['group'] == "mladmin") {
        $header = "Управление балансом игроков";

        if ($_POST['return']) {
            $uname = $db->safesql($_POST['uname']);
            $summ = $db->safesql($_POST['summ']);
            $type = $db->safesql($_POST['type']);
            if ($uname && $summ) {
                if ($type == 'diamond') {
                    $select = $db->query("SELECT * FROM dle_users WHERE name='$uname'");
                    if ($db->num_rows($select)) {
                        $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$uname'");
                        $db->query("UPDATE dle_users SET diamonds=diamonds+$summ WHERE name='$uname'");
                        addLog($sel['uuid'], 0, "Админ <b>$username</b> выдал $summ алм.", 17);
                        $einfo = returnNotifer("Игроку <b>$uname</b> успешно выдано $summ алм.", "check", "true");
                    } else {
                        $einfo = returnNotifer("Игрок <b>$uname</b> не найден.", "bug", "false");
                    }

                } elseif ($type == 'money') {
                    $select = $db->query("SELECT * FROM dle_users WHERE name='$uname'");
                    if ($db->num_rows($select)) {
                        $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$uname'");
                        $db->query("UPDATE dle_users SET cash=cash+$summ WHERE name='$uname'");
                        addLog($sel['uuid'], $summ, "Админ <b>$username</b> выдал $summ руб.", 18);
                        $einfo = returnNotifer("Игроку <b>$uname</b> успешно выдано $summ руб.", "check", "true");
                    } else {
                        $einfo = returnNotifer("Игрок <b>$uname</b> не найден.", "bug", "false");
                    }

                }
            }
        }

        if ($_POST['search'] || $_POST['return']) {
            $nickname = $db->safesql($_POST['nickname']);
            if ($nickname) {
                $select = $db->query("SELECT * FROM dle_users WHERE name='$nickname'");
                if ($db->num_rows($select)) {
                    $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$nickname'");
                    $check = $db->query("SELECT * FROM user_actions WHERE uuid='{$sel['uuid']}' AND type='1' OR uuid='{$sel['uuid']}' AND type='17' OR uuid='{$sel['uuid']}' AND type='18' ORDER BY unix_time DESC LIMIT 10");
                    if ($db->num_rows($check)) {
                        while ($get = $db->get_row($check)) {
                            $datetime = date("d.m.Y H:i", $get['unix_time']);
                            $info .= "<div><b>$datetime</b>: {$get['description']}</div>";
                        }
                    } else {
                        $einfo = returnNotifer("Ни разу не пополнял счет.", "check", "true");
                    }

                    $output = "
						<table class='uk-table uk-table-striped'>
							<tr><td style='border: 0px;' colspan='2'>$info</td></tr>
						</table>
					";
                } else {
                    $error = returnNotifer("Указанный игрок не зарегистринован.", "bug", "false");
                }

            }
            //else $error = returnNotifer("Укажите ник игрока, чью историю групп будем просматривать", "bug", "false");
        }

        $line[0] .= "
			$error
			$einfo
			<form class='uk-form' action method='post'>
				<div style='margin-bottom: 10px;'>Введите ниже ник, чью информацию по балансу вы хотите получить</div>
				<input style='width: 457px;' type='text' value='$nickname' name='nickname' placeholder='Example'>
				<input type='submit' style='color: #EFD0A0;' name='search' value='Искать' class='uk-button'>
				$output
			</form><hr/>

			<form class='uk-form' action method='post'>
				<div style='margin-bottom: 10px;'>Заполните данные ниже, чтобы управлять балансом того или иного игрока</div>
				<table class='uk-table uk-table-striped'>
					<tr>
						<td>Ник игрока</td>
						<td><input type='text' name='uname' value='$nickname' class='uk-width-1-1' placeholder='Example'></td>
					</tr>
					<tr>
						<td>Тип выдачи</td>
						<td>
							<select name='type' class='uk-width-1-1'>
								<option value='diamond'>Алмазы</option>
								<option value='money'>Рубли</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Сумма</td>
						<td><input type='text' name='summ' value='0' class='uk-width-1-1' placeholder='0'></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><input type='submit' style='color: #EFD0A0;' name='return' value='Продолжить' class='uk-button uk-width-1-1'></td>
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
