<?php
if (!defined('DATALIFEENGINE')) {
    die("Hacking attempt!");
}

if (isSpedGroup($member_id['uuid']) || $member_id['user_group'] == 1) {
    include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/mineconf.php";
    $header = "Платные действия игроков";
    $name = $db->safesql($_GET['name']);
    $page = $db->safesql($_GET['page']);
    $perpage = 20;
    $content = "
			<form class='uk-form' action method='get'>
				<table class='uk-width-1-1 uk-table-striped uk-table'>
					<tr>
						<td width='80%'><input type='text' class='uk-width-1-1' name='name' value='$name' placeholder='Введите сюда ник игрока или его UUID'></td>
						<td><input type='submit' class='uk-width-1-1 uk-button' style='color: white' name='go' value='Найти'></td>
					</tr>
				</table>
			</form>
		";
    if ($name) {
        $check = $db->super_query("SELECT * FROM dle_users WHERE name='$name' OR uuid='$name'");
        if ($check['name']) {
            $info = $db->super_query("SELECT * FROM can_fly WHERE uuid='{$check['uuid']}'");
            if ($info['id']) {
                if ($info['until'] > time()) {
                    $i_can_fly = "<div class='uk-text-success'>Есть, закончится через <b>" . showDateDo($info['until']) . "</b></div>";
                } else {
                    $i_can_fly = "<div class='uk-text-primary'>Есть, но скоро пропадет</b></div>";
                }

            } else {
                $i_can_fly = "<div class='uk-text-danger'>Нет</div>";
            }

            if (isCan($check['uuid'], 'diamond')) {
                $i_can_fly = "<div class='uk-text-success'><b>Есть, так как Diamond</b></div>";
            } else if (isCan($check['uuid'], 'event') || isCan($check['uuid'], 'builder' || isCan($check['uuid'], 'architect'))) {
                $i_can_fly = "<div class='uk-text-success'><b>Есть, так как строитель</b></div>";
            } else if (isCan($check['uuid'], 'admin') || isCan($check['uuid'], 'mladmin')) {
                $i_can_fly = "<div class='uk-text-success'><b>Есть, так как администратор</b></div>";
            } else if (isCan($member_id['uuid'], 'newmoder') || isCan($member_id['uuid'], 'moder') || isCan($member_id['uuid'], 'stmoder') || isCan($member_id['uuid'], 'gmoder')) {
                $i_can_fly = "<div class='uk-text-success'><b>Есть, так как модератор</b></div>";
            }

            foreach ($_servers as $serv) {
                $gg = getserverGroup($check['uuid'], $serv['id']);
                $groups .= "<tr><td>{$serv['name']}</td><td>{$gg['group_name']}</td><td>{$gg['until_text']}</td></tr>";
            }
            $content .= "
					<table style='font-size: 12px' class='uk-table uk-table-striped'>
						<tr><td width='120px'>Ник</td><td><b>{$check['name']}</b></td></tr>
						<tr><td>Баланс</td><td>{$check['cash']} руб.</td></tr>
						<tr><td>Алмазы</td><td>{$check['diamonds']} алм.</td></tr>
						<tr><td>FLY</td><td>$i_can_fly</td></tr>
						<tr><td>UUID</td><td>{$check['uuid']}</td></tr>
					</table>
					<table style='font-size: 12px' class='uk-table uk-table-striped'>
						<thead>
							<tr>
								<td><b>Сервер</b></td>
								<td><b>Группа</b></td>
								<td><b>До</b></td>
						</thead>
						<tbody>
							$groups
						</tbody>
						</table>
				";
            $select = $db->query("SELECT * FROM user_actions WHERE uuid='{$check['uuid']}' ORDER BY id DESC");
            $totalitems = $db->num_rows($select);
            if ($totalitems) {
                $totalpages = ceil($totalitems / $perpage);
                if (!$page) {
                    $page = 1;
                }

                if ($page > ceil($totalitems / $perpage)) {
                    $page = ceil($totalitems / $perpage);
                }

                $start = ($page - 1) * $perpage;

                $select = $db->query("SELECT * FROM user_actions WHERE uuid='{$check['uuid']}' ORDER BY id DESC LIMIT $start,$perpage");
                $content .= "<table style='font-size: 14px' class='uk-table uk-width-1-1 uk-table-striped uk-table-hover'>";
                if ($db->num_rows($select)) {
                    while ($get = $db->get_row($select)) {
                        if ($get['summa'] > 0) {
                            $get['summa'] = "<span class='uk-text-success'>+{$get['summa']}</span>";
                        } else {
                            $get['summa'] = "<span class='uk-text-danger'>{$get['summa']}</span>";
                        }

                        $content .= "
								<tr>
									<td><i class='uk-icon-clock-o' data-uk-tooltip title='Действие совершено " . date("d.m.Y H:i", $get['unix_time']) . "'></i></td>
									<td>{$get['summa']}</td>
									<td>{$get['description']}</td>
								</tr>
							";
                    }
                }
                $content .= "</table>";

                $prevpage = $page - 1;
                $nextpage = $page + 1;
                if ($page == 1) {
                    $first_page = "";
                } else {
                    $first_page = "<a href='$DURL/actions?name=$name&page=1'><button type='button' class='uk-button changepage' data-page='1'>1</button></a>";
                }

                if ($page == $totalpages) {
                    $last_page = "";
                } else {
                    $last_page = "<a href='$DURL/actions?name=$name&page=$totalpages'><button type='button' class='uk-button changepage' data-page='$totalpages'>$totalpages</button></a>";
                }

                if ($page > 1) {
                    $prev_page = "<a href='$DURL/actions?name=$name&page=$prevpage'><button type='button' class='uk-button changepage' data-page='$prevpage'>Предыдущая страница</button></a>";
                } else {
                    $prev_page = "<button type='button' class='uk-button disabledButton' disabled>Предыдущая страница</button>";
                }

                if ($page < $totalpages) {
                    $next_page = "<a href='$DURL/actions?name=$name&page=$nextpage'><button type='button' class='uk-button changepage' data-page='$nextpage'>Следующая страница</button></a>";
                } else {
                    $next_page = "<button type='button' class='uk-button disabledButton' disabled>Следующая страница</button>";
                }

                $content .= "
						<table style='margin-top: 10px' class='uk-width-1-1'>
							<tr>
								<td>$first_page $prev_page</td>
								<td align='center'>$page из $totalpages</td>
								<td align='right'>$next_page $last_page</td>
							</tr>
						</table>
					";
            } else {
                $content .= returnNotifer("Возникла ошибка.<br/>Этот игрок ничего не покупал.", "times", '');
            }

        } else {
            $content .= returnNotifer("Возникла ошибка.<br/>Игрок с таким ником не найден.", "times", '');
        }

    }
    $tpl->load_template('modules.tpl');
    $tpl->set('{header}', $header);
    $tpl->set('{content}', $content);
    $tpl->compile('content');
    $tpl->clear();
}
