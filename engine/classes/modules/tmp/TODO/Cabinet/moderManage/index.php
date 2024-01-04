<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}

$action = $db->safesql($_GET['a']);
$delete = $db->safesql($_POST['delete']);
$serverid = $db->safesql($_POST['serverid']);
if ($member_id['name']) {
    if (isCan($member_id['uuid'], 'admin') || isCan($member_id['uuid'], 'mladmin') || $member_id['user_group'] == 1) {
        include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/mineconf.php";
        $header = "Управление модераторами";
        if ($delete) {
            $select = $db->super_query("SELECT * FROM m_moderators_new WHERE id='$delete'");
            $modername = $select['username'];
            $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$modername'");
            if ($sel['uuid']) {
                $uuid = $sel['uuid'];
                if ($serverid == 0) {
                    foreach ($_servers as $serv) {
                        $db->query("DELETE FROM `{$serv['pex_prefix']}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                    }
                } else {
                    foreach ($_servers as $serv) {
                        if ($serv['id'] == $serverid) {
                            $pex_prefix = $serv['pex_prefix'];
                        }

                    }
                    $db->query("DELETE FROM `{$pex_prefix}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                }
                $db->query("DELETE FROM m_moderators_new WHERE id='$delete' AND serverid='$serverid'");
                // $self = $fb->super_query("SELECT * FROM core_members WHERE name='$modername'");
                // if ($self['name']) {
                //     $fb->query("UPDATE core_members SET member_group_id='3', member_title='' WHERE name='$modername'");
                // }

                if ($serverid == 0) {
                    foreach ($_servers as $serv) {
                        $db->query("DELETE FROM donate_group WHERE uuid='$uuid' AND serverid='{$serv['id']}'");
                    }
                }
                $line[0] .= returnNotifer("С пользователя с ником <b>$modername</b> сняты все права", "check", "true");
            } else {
                $line[0] .= returnNotifer("Пользователь с ником <b>$modername</b> не найден.", "bug", "false");
            }

            header("Location: $DURL/admin/manage");
        }
        if ($_POST['add']) {
            $modername = $db->safesql($_POST['username']);
            if ($serverid == 0) {
                $sdisp = "All";
            } else {
                foreach ($_servers as $serv) {
                    if ($serv['id'] == $serverid) {
                        $sdisp = $serv['name'];
                    }

                }
            }
            $access = $db->safesql($_POST['access']);
            if ($access == "newmoder" || $access == "moder" || $access == "stmoder" || $access == "gmoder" || $access == "admin" || $access == "architect" || $access == "event" || $access == "mladmin") {
                if ($modername) {
                    $select = $db->query("SELECT * FROM m_moderators_new WHERE username='$modername' AND serverid='$serverid'");
                    $sel = $db->super_query("SELECT * FROM dle_users WHERE name='$modername'");
                    if ($sel['uuid']) {
                        $uuid = $sel['uuid'];
                        if ($serverid != 0) {
                            foreach ($_servers as $serv) {
                                if ($serv['id'] == $serverid) {
                                    $pex_prefix = $serv['pex_prefix'];
                                }

                            }
                        }
                        if ($db->num_rows($select)) {
                            // $self = $fb->super_query("SELECT * FROM core_members WHERE name='$modername'");
                            // if ($self['name']) {
                            //     if ($access == "newmoder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='8', member_title='Стажёр' WHERE name='$modername'");
                            //     } else if ($access == "moder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='6', member_title='Модератор' WHERE name='$modername'");
                            //     } else if ($access == "stmoder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='10', member_title='Ст. Модератор' WHERE name='$modername'");
                            //     } else if ($access == "gmoder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='7', member_title='Гл. Модератор' WHERE name='$modername'");
                            //     } else if ($access == "architect") {
                            //         $fb->query("UPDATE core_members SET member_group_id='9', member_title='Архитектор' WHERE name='$modername'");
                            //     } else if ($access == "mladmin") {
                            //         $fb->query("UPDATE core_members SET member_group_id='13', member_title='Мл. Администратор' WHERE name='$modername'");
                            //     } else if ($access == "admin") {
                            //         $fb->query("UPDATE core_members SET member_group_id='4', member_title='Администратор' WHERE name='$modername'");
                            //     } else if ($access == "event") {
                            //         $fb->query("UPDATE core_members SET member_group_id='12', member_title='Ивентер' WHERE name='$modername'");
                            //     }

                            // } else {
                            //     $line[0] .= returnNotifer("Пользователь с ником <b>$modername</b> на форуме не найден.", "bug", "false");
                            // }

                            if ($serverid == 0) {
                                foreach ($_servers as $serv) {
                                    $db->query("UPDATE `donate_group` SET `group_name`='$access' WHERE uuid='$uuid' AND serverid='{$serv['id']}'");
                                }
                            }
                            $db->query("UPDATE `m_moderators_new` SET `access`='$access', adder='{$member_id['name']}', server='$sdisp', serverid='$serverid', addtime='" . time() . "' WHERE username='$modername' AND serverid='$serverid'");
                            if ($serverid == 0) {
                                foreach ($_servers as $sver) {
                                    $db->query("DELETE FROM `{$sver['pex_prefix']}permissions` WHERE name='$uuid' AND type='1'");
                                    $db->query("DELETE FROM `{$sver['pex_prefix']}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                                    $db->query("INSERT INTO `{$sver['pex_prefix']}permissions_inheritance` VALUES(null, '$uuid', '$access', '1', null)");
                                }
                            } else {
                                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='$uuid' AND type='1'");
                                $db->query("DELETE FROM `{$pex_prefix}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                                $db->query("INSERT INTO `{$pex_prefix}permissions_inheritance` VALUES(null, '$uuid', '$access', '1', null)");
                            }
                            $line[0] .= returnNotifer("Права модератора/архитектора <b>$modername</b> обновлены.", "check", "true");
                        } else {
                            $db->query("DELETE FROM donate_group WHERE uuid='$uuid' AND serverid='$serverid'");
                            $db->query("INSERT INTO `donate_group` ( `uuid`, `serverid`, `group_name`, `buy_date`, `end_date`) values ( '$uuid', '$serverid', '$access', '" . time() . "', '0')");
                            $db->query("INSERT INTO m_moderators_new VALUES(null, '$modername', '" . time() . "', '{$member_id['name']}', '$sdisp', '$serverid', '$access')");
                            if ($serverid == 0) {
                                foreach ($_servers as $sver) {
                                    $db->query("DELETE FROM `{$sver['pex_prefix']}permissions` WHERE name='$uuid' AND type='1'");
                                    $db->query("DELETE FROM `{$sver['pex_prefix']}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                                    $db->query("INSERT INTO `{$sver['pex_prefix']}permissions_inheritance` VALUES(null, '$uuid', '$access', '1', null)");
                                }
                            } else {
                                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='$uuid' AND type='1'");
                                $db->query("DELETE FROM `{$pex_prefix}permissions_inheritance` WHERE child='$uuid' AND type='1'");
                                $db->query("INSERT INTO `{$pex_prefix}permissions_inheritance` VALUES(null, '$uuid', '$access', '1', null)");
                            }
                            // $self = $fb->super_query("SELECT * FROM core_members WHERE name='$modername'");
                            // if ($self['name']) {
                            //     if ($access == "newmoder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='8', member_title='Стажёр' WHERE name='$modername'");
                            //     } else if ($access == "moder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='6', member_title='Модератор' WHERE name='$modername'");
                            //     } else if ($access == "stmoder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='10', member_title='Ст. Модератор' WHERE name='$modername'");
                            //     } else if ($access == "gmoder") {
                            //         $fb->query("UPDATE core_members SET member_group_id='7', member_title='Гл. Модератор' WHERE name='$modername'");
                            //     } else if ($access == "architect") {
                            //         $fb->query("UPDATE core_members SET member_group_id='9', member_title='Архитектор' WHERE name='$modername'");
                            //     } else if ($access == "admin") {
                            //         $fb->query("UPDATE core_members SET member_group_id='4', member_title='Администратор' WHERE name='$modername'");
                            //     } else if ($access == "mladmin") {
                            //         $fb->query("UPDATE core_members SET member_group_id='13', member_title='Мл. Администратор' WHERE name='$modername'");
                            //     } else if ($access == "event") {
                            //         $fb->query("UPDATE core_members SET member_group_id='12', member_title='Ивентер' WHERE name='$modername'");
                            //     }

                            // } else {
                            //     $line[0] .= returnNotifer("Пользователь с ником <b>$modername</b> на форуме не найден.", "bug", "false");
                            // }

                            $line[0] .= returnNotifer("Модератор/архитектор успешно добавлен.", "check", "true");
                        }
                    } else {
                        $line[0] .= returnNotifer("Пользователь с ником <b>$modername</b> не найден.", "bug", "false");
                    }

                }
            }
        }
        $select = $db->query("SELECT * FROM m_moderators_new ORDER BY addtime DESC");
        if ($db->num_rows($select)) {
            $line[0] .= "<table class='uk-table uk-table-striped uk-table-hover'>
					<tr>
						<td><b>Модератор</b></td>
						<td><b>Сервер</b></td>
						<td><b>Дата добавления</b></td>
						<td><b>Кто добавил</b></td>
						<td><b>Управление</b></td>
					</tr>
				";
            while ($get = $db->get_row($select)) {
                $id = $get['id'];
                $modername = $get['username'];
                $addtime = date("d.m.Y H:i", $get['addtime']);
                $adder = $get['adder'];
                $server = $get['server'];
                if ($get['serverid'] == 0) {
                    $server = "Все сервера";
                }

                if (!$get['access']) {
                    $access = "<span class='uk-text-danger'>Права не заданы!</span>";
                } else if ($get['access'] == "newmoder") {
                    $access = "Стажёр";
                } else if ($get['access'] == "moder") {
                    $access = "Модератор";
                } else if ($get['access'] == "stmoder") {
                    $access = "Ст. Модератор";
                } else if ($get['access'] == "gmoder") {
                    $access = "Гл. Модератор";
                } else if ($get['access'] == "architect") {
                    $access = "Архитектор";
                } else if ($get['access'] == "mladmin") {
                    $access = "Мл. Администратор";
                } else if ($get['access'] == "admin") {
                    $access = "Администратор";
                } else if ($get['access'] == "event") {
                    $access = "Ивентер";
                }

                $line[0] .= "
						<tr>
							<td>$modername<div class='uk-text-small' style='margin-top: -5px;'>$access</div></td>
							<td>$server</td>
							<td>$addtime</td>
							<td>$adder</td>
							<td>
								<form action method='post'>
									<input type='hidden' name='delete' value='$id'>
									<input type='submit' name='go' class='uk-button uk-button-mini' value='Разжаловать'>
									<input type='hidden' name='serverid' value='{$get['serverid']}'>
								</form>
							</td>
						</tr>
					";
            }
            $line[0] .= "</table>";
        } else {
            $line[0] .= "<table class='uk-table uk-table-striped uk-table-hover'><tr><td><center>На данный момент не добавлено ни одного модератора</center></td></tr></table>";
        }
        if (isCan($member_id['uuid'], 'admin')) {
            $lista = "<option value='mladmin'>Мл. Администратор</option><option value='admin'>Администратор</option>";
        }

        foreach ($_servers as $serv) {
            $servers .= "<option value='{$serv['id']}'>{$serv['name']}</option>";
        }
        $line[0] .= "
			<form class='uk-form' action='' method='post'>
				<table class='uk-table'>
					<tr>
						<td>
							Введите ник будущего/<b>текущего</b> модератора
							<div class='uk-text-small uk-text-muted'>Игрок должен быть уже зарегистрирован</div>
						</td>
						<td>
							<input type='text' name='username' class='uk-width-1-1' placeholder='andrew_shbov'>
						</td>
					</tr>
					<tr>
						<td>
							Должность
							<div class='uk-text-small uk-text-muted'>Так же изменится группа на форуме</div>
						</td>

						<td>
							<select name='access' class='uk-width-1-1'>
								<option value='newmoder'>Стажёр</option>
								<option value='moder'>Модератор</option>
								<option value='stmoder'>Ст. Модератор</option>
								<option value='gmoder'>Гл. Модератор</option>
								<option value='architect'>Архитектор</option>
								<option value='event'>Ивентер</option>
								$lista
							</select>
						</td>
					</tr>
					<tr>
						<td>
							Выберите сервер модерирования
							<div class='uk-text-small uk-text-muted'>Парва будут на каждом, а это для деления</div>
						</td>

						<td>
							<select name='serverid' class='uk-width-1-1'>
								<option value='0'>Все сервера</option>$servers
							</select>
						</td>
					</tr>
				</table>
				<button type='submit' name='add' class='uk-width-1-1 uk-button' value='Добавить нового модератора' />Добавить нового модератора</button>
			</form>
			";
        $tpl->load_template('modules.tpl');
        $tpl->set('{header}', $header);
        $tpl->set('{content}', $line[0]);
        $tpl->compile('content');
        $tpl->clear();
    } else {
        header("Location: $DURL");
    }

} else {
    header("Location: $DURL");
}
