<?php
if (!defined('DATALIFEENGINE')) {
    die("Hacking attempt!");
}

if (isset($_POST['action'])) {
    include_once __dir__ . "/post_banlist.php";
} else {
    $status = $db->safesql($_GET['status']);
    if ($_POST['search']) {
        if (mb_strlen($_POST['search_word'], 'utf-8') > 2) {
            $search = $db->safesql($_POST['search_word']);
        } else {
            $content .= "<div class='uk-alert uk-alert-danger'>Минимальная длина запроса дня поиска - 2 символа.</div>";
        }

    }

    $header = "Список заблокированных игроков";
    $perpage = 20;
    $page = $db->safesql($_GET['page']);
    if (!$search) {
        $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 ORDER BY id DESC");
    } else {
        $user = $db->super_query("SELECT * FROM dle_users WHERE name='$search'");
        $uuid = $user['uuid'];
        $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 AND banned_by_name='$search' OR active=1 AND reason='$search' OR active=1 AND uuid='$uuid' ORDER BY id DESC");
    }
    $totalitems = $db->num_rows($select);
    if ($totalitems) {
        $content .= "<form action='' method='post'><div style='margin-bottom: 15px' class='uk-grid'><div class='uk-width-7-10'><input id='searchword' value='{$_POST['search_word']}' placeholder='Введите ник модератора/нарушителя или укажите причину' type='text' name='search_word' style='width: 100%;'></div><div class='uk-width-3-10'><input type='submit' name='search' class='uk-button' style='width: 100%' value='Найти'></div></div></form>";
        $content .= "<div id='banlistOutput'>";
        $totalpages = ceil($totalitems / $perpage);
        if (!$page) {
            $page = 1;
        }

        if ($page > ceil($totalitems / $perpage)) {
            $page = ceil($totalitems / $perpage);
        }

        $start = ($page - 1) * $perpage;

        if (!$search) {
            $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 ORDER BY id DESC LIMIT $start,$perpage");
        } else {
            $select = $db->query("SELECT * FROM litebans_bans WHERE active=1 AND banned_by_name='$search' OR active=1 AND reason='$search' OR active=1 AND uuid='$uuid' ORDER BY id DESC LIMIT $start,$perpage");
        }

        if ($db->num_rows($select)) {
            $content .= "<table class='uk-table uk-width-1-1 uk-table-striped'>";
            $content .= "
					<tr style='background: rgba(160, 125, 83, 0.38);'>
						<td><b>Нарушитель</b></td>
						<td><b>Наказал(-а)</b></td>
						<td><b>Дата блокировки</b></td>
						<td><b>Причина</b></td>
						<td><b>Разблокировка</b></td>
					</tr>
				";
            while ($get = $db->get_row($select)) {
                $check = $db->super_query("SELECT name FROM dle_users WHERE uuid='{$get['uuid']}'");
                $banned_nickname = $check['name'];
                $check = $db->super_query("SELECT name FROM dle_users WHERE uuid='{$get['banned_by_uuid']}'");
                $admin_nickname = $check['name'];
                $date_of_ban = showDate(substr($get['time'], 0, strlen($get['time']) - 3));
                if ($get['until'] < 0) {
                    $until_ban = "<span class='uk-text-danger'>Перманентно</span>";
                } else {
                    $until_ban = date("d.m.Y в H:i", substr($get['until'], 0, strlen($get['until']) - 3));
                }

                $until_ban = str_replace(date("d.m.Y"), "Сегодня", $until_ban);
                $until_ban = str_replace(date("d.m.Y", time() + 86400), "Завтра", $until_ban);
                if (stripos($get['reason'], '?') !== false) {
                    $get['reason'] = "<span style='opacity: 0.5'>Не указана</span>";
                }

                if (stripos($get['reason'], '@') !== false) {
                    $get['reason'] = str_replace('@', '', $get['reason']);
                    $get['reason'] = "<i class='uk-icon-lock' data-uk-tooltip title='Без права на платную разблокировку'></i> {$get['reason']}";
                }
                $group = getGroup($get['banned_by_uuid']);
                if ($group['group'] == 'admin' || $group['group'] == 'mladmin') {
                    $admin_nickname = "<b class='uk-text-danger'>$admin_nickname</b>";
                } else {
                    $admin_nickname = "<b class='uk-text-primary'>$admin_nickname</b>";
                }

                $content .= "
						<tr>
							<td>$banned_nickname</td>
							<td>$admin_nickname</td>
							<td>$date_of_ban</td>
							<td>{$get['reason']}</td>
							<td>$until_ban</td>
						</tr>
					";
            }
            $content .= "</table>";

            $prevpage = $page - 1;
            $nextpage = $page + 1;
            if ($page == 1) {
                $first_page = "";
            } else {
                $first_page = "<button type='button' class='uk-button changepage' data-page='1'>1</button>";
            }

            if ($page == $totalpages) {
                $last_page = "";
            } else {
                $last_page = "<button type='button' class='uk-button changepage' data-page='$totalpages'>$totalpages</button>";
            }

            if ($page > 1) {
                $prev_page = "<button type='button' class='uk-button changepage' data-page='$prevpage'>Предыдущая страница</button>";
            } else {
                $prev_page = "<button type='button' class='uk-button disabledButton' disabled>Предыдущая страница</button>";
            }

            if ($member_id['name']) {
                if ($page < $totalpages) {
                    $next_page = "<button type='button' class='uk-button changepage' data-page='$nextpage'>Следующая страница</button>";
                } else {
                    $next_page = "<button type='button' class='uk-button disabledButton' disabled>Следующая страница</button>";
                }

                $content .= "
						<table style='margin-top: 10px' class='uk-width-1-1'>
							<tr>
								<td>$first_page$prev_page</td>
								<td align='center'>$page из $totalpages</td>
								<td align='right'>$next_page$last_page</td>
							</tr>
						</table>
						</div>
					";
                $content .= "<script src='$DURL/loadscript/banlist'></script>";
            }
        }
    } else {
        $content = returnNotifer("На данный момент ни один игрок не заблокирован.<br/>Как же это прекрасно, когда никто не нарушает правила и играют честно.", 'info');
    }

    $tpl->load_template('modules.tpl');
    $tpl->set('{header}', $header);
    $tpl->set('{content}', $content);
    $tpl->compile('content');
    $tpl->clear();
}
