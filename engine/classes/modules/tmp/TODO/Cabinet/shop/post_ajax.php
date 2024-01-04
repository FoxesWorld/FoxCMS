<?php
header('Content-Type: application/json');
setlocale(LC_NUMERIC, "C");
if (!defined("FOXXEY")) {
    die();
}

if ($member_id['name']) {
    $action = $db->safesql($_POST['action']);
    $player = $db->safesql($_POST['player']);
    $hash = $db->safesql($_POST['hash']);
    $uuidHash = $db->safesql($_POST['uuidHash']);
    $playeruuid = $db->safesql($_POST['uuid']);
    $mhash = md5($member_id['uuid'] . $member_id['name'] . $member_id['uuid']);
    if (strcmp($member_id['uuid'], $playeruuid) == 0 && strcmp($mhash, $uuidHash) == 0) {
        if (strcmp($member_id['name'], $player) == 0 && strcmp(md5($member_id['password'] . $member_id['name']), $hash) == 0) {
            if ($action == "showsets") {
                $id = $db->safesql($_POST['id']);
                $select = $db->super_query("SELECT * FROM shop_sets WHERE id='$id'");
                if (!$select['id']) {
                    echo json_encode(array('status' => 1, 'text' => 'Не найден такой набор.'));
                    die();
                }

                $summa = 0;
                $exp = explode(',', $select['content_ids']);
                $itemlist = "<b>После покупки этого набора вы получите:</b><br/>";
                for ($i = 0; $i < count($exp); $i++) {
                    $check = $db->super_query("SELECT * FROM shop_items WHERE id='{$exp[$i]}'");
                    $itemlist .= "<div style='font-size: 15px'><img src='{$check['icon']}' width='20px'> {$check['itemname']} - {$check['stack']} шт.</div>";
                    $summa += $check['price'];
                }

                header('Content-Type: text/html');
                echo "
						<div id='itemSh' class='uk-modal'>
						    <div class='uk-modal-dialog' style='width: 500px'>
						        <b>Вы выбрали {$select['setname']}</b>
						        <div style='font-size: 13px;margin-top: 10px;margin-bottom: 10px;background: rgba(0, 0, 0, 0.05);border-radius: 5px;padding: 5px;'>Подготовленные нами наборы гораздо выгоднее, чем если бы вы покупали каждый товар отдельно.</div>
						        <div class='set_discr'>
							        <table class='uk-width-1-1'>
							        	<tr>
							        		<td><img src='{$select['icon']}' width='130px'></td>
							        		<td valign='top'>$itemlist</td>
							        	</tr>
							        </table>
							    </div>
							    <div class='current_set_price'>Стоимость этого набора: <b>{$select['price']} руб.</b></div>
							    <div class='def_set_price'>Стоимость, если бы вы покупали все сами: $summa руб.</div>
							    <button type='button' style='margin-top: 10px;' class='uk-button uk-width-1-1' id='buyset' data-id='{$select['id']}'>Купить себе этот набор</button>
							    <div id='setOutput'></div>
						    </div>
						</div>
					";
            }
            // else if ($action == "fast_chest") {
            //     if (strcmp(date("d.m.Y"), $member_id['free_last_date']) == 0) {
            //         if ($member_id['free_day_times'] <= 4) $cost = 1;
            //         else if ($member_id['free_day_times'] <= 10) $cost = 2;
            //         else if ($member_id['free_day_times'] <= 15) $cost = 3;
            //         else if ($member_id['free_day_times'] <= 20) $cost = 4;
            //         else if ($member_id['free_day_times'] <= 25) $cost = 5;
            //         else $cost = 6;
            //     } else {
            //         $db->query("UPDATE dle_users SET free_last_date='" . date("d.m.Y") . "', free_day_times='0', free_fast_chest='0' WHERE name='{$member_id['name']}'");
            //         $cost = 1;
            //     }
            //     $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //     $free = $db->safesql($_POST['free']);
            //     $serevrid = $db->safesql($_POST['server']);
            //     if ($free == 0) $free = 0;
            //     else $free = 1;
            //     if ($member_id['diamonds'] >= $cost && !$free || $free) {
            //         if ($member_id['free_fast_chest'] > 20 && $free) {
            //             echo json_encode(array('status' => 0, 'text' => "<span class='uk-text-danger'>Максимум можно попробовать открыть сундук - <b>20 раз</b>.</span>"));
            //             die();
            //         }
            //         if ($serevrid < 1 || $serevrid > 7) {
            //             echo json_encode(array('status' => 0, 'text' => "<span class='uk-text-danger'>Выбранный сервер не поддерживается.</span>"));
            //             die();
            //         }
            //         if (!$free) $db->query("UPDATE dle_users SET diamonds=diamonds-$cost WHERE name='{$member_id['name']}'");

            //         if ($free) $db->query("UPDATE dle_users SET free_fast_chest=free_fast_chest+1 WHERE name='{$member_id['name']}'");
            //         else $db->query("UPDATE dle_users SET fast_chest=fast_chest+1, free_day_times=free_day_times+1 WHERE name='{$member_id['name']}'");

            //         $select = $db->query("SELECT * FROM shop_items WHERE shopid='$serevrid'");
            //         if ($db->num_rows($select)) {
            //             $array = array();
            //             while ($get = $db->get_row($select)) {
            //                 array_push($array, $get['id']);
            //             }
            //             shuffle($array);
            //             $rand = rand(0, count($array) - 1);
            //             $check = $db->super_query("SELECT * FROM shop_items WHERE id='{$array[$rand]}'");
            //         }
            //         $count = $check['stack'];

            //         $lastArray = array();
            //         $select = $db->query("SELECT * FROM fast_chest_log WHERE username='{$member_id['name']}' ORDER BY id DESC LIMIT 7");
            //         if ($db->num_rows($select)) {
            //             while ($get = $db->get_row($select)) {
            //                 $dop = array('icon' => $get['icon'], 'count' => $get['count']);
            //                 array_push($lastArray, $dop);
            //             }
            //         }

            //         if (strcmp(date("d.m.Y"), $member_id['free_last_date']) == 0) {
            //             if ($member_id['free_day_times'] <= 4) $cost = 1;
            //             else if ($member_id['free_day_times'] <= 10) $cost = 2;
            //             else if ($member_id['free_day_times'] <= 15) $cost = 3;
            //             else if ($member_id['free_day_times'] <= 20) $cost = 4;
            //             else if ($member_id['free_day_times'] <= 25) $cost = 5;
            //             else $cost = 6;
            //         } else {
            //             $db->query("UPDATE dle_users SET free_last_date='" . date("d.m.Y") . "', free_day_times='0' WHERE name='{$member_id['name']}'");
            //             $cost = 1;
            //         }

            //         echo json_encode(array('status' => 1, 'itemname' => $check['itemname'], 'img' => $check['icon'], 'stack' => $count, 'last' => $lastArray, 'cost' => $cost, 'diamonds' => $member_id['diamonds']));
            //         //$db->query("INSERT INTO `fast_chest_log` (`id`, `itemid`, `username`, `itemname`, `icon`, `time`, `count`, `server`, `format_time`, `free`, `cost`) VALUES (NULL, $itemid, '{$member_id['name']}', '{$check['itemname']}', '{$check['icon']}', '".time()."', '$count', $serevrid, '".date("d.m.Y H:i")."', '$free', '$cost')");

            //         if (!$free) {
            //             $info = $db->super_query("SELECT * FROM shop_list WHERE id='$serevrid'");
            //             //$check = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
            //             $db->query("INSERT INTO {$info['table_name']} VALUES (null, 'item', '{$check['itemid']}', '{$member_id['name']}', '$count', null, null)");
            //         }
            //     } else echo json_encode(array('status' => 0, 'text' => "<span class='uk-text-danger'>Нужно больше алмазов для открытия быстрого сундука</span>"));
            // } else if ($action == "showchest") {
            //     $id = $db->safesql($_POST['id']);
            //     $select = $db->super_query("SELECT * FROM chest_types WHERE id='$id' AND in_shop='1'");
            //     if (!$select['id']) {
            //         echo json_encode(array('status' => 1, 'text' => 'Не найден такой сундук.'));
            //         die();
            //     }

            //     if ($select['server']) {
            //         $ch = $db->super_query("SELECT * FROM shop_list WHERE id='{$select['server']}'");
            //         $server = $ch['shopname'];
            //         $select['inside'] = str_replace('{servername}', $server, $select['inside']);
            //         $server = "<span style='color: #2000FF'>50 вещей Для <b>$server</b></span>";
            //     }

            //     header('Content-Type: text/html');
            //     echo "
            //             <div id='itemSh' class='uk-modal'>
            //                 <div class='uk-modal-dialog' style='width: 500px'>
            //                     <b>Вы выбрали {$select['name']}</b>
            //                     <div style='font-size: 13px;margin-top: 10px;margin-bottom: 10px;background: rgba(0, 0, 0, 0.05);border-radius: 5px;padding: 5px;'>Откройте этот сундук и получите возможность обнаружить в нем что-нибудь крайне выгодное и невероятно ценное!</div>
            //                     <div class='set_discr'>
            //                         <table class='uk-width-1-1'>
            //                             <tr>
            //                                 <td><img src='$DURL/uploads/chests/chest_{$select['typeid']}.png' width='130px'></td>
            //                                 <td valign='top'>{$select['inside']}</td>
            //                             </tr>
            //                         </table>
            //                     </div>
            //                     <div class='current_set_price'>Стоимость этого сундука: <b class='diamond_chest_price'>{$select['cost']}</b> <img src='http://shadowcraft.ru/uploads/diamond.png' class='diamond_icon'></div>
            //                     <button type='button' style='margin-top: 10px;' class='uk-button uk-width-1-1' id='buychest' data-id='{$select['id']}'>Купить себе этот сундук</button>
            //                     <div id='setOutput'></div>
            //                 </div>
            //             </div>
            //         ";
            // } else if ($action == "chest_info") {
            //     $id = $db->safesql($_POST['id']);
            //     $select = $db->super_query("SELECT * FROM chest_list WHERE id='$id' AND to_uuid='{$member_id['uuid']}'");
            //     if (!$select['id']) {
            //         echo json_encode(array('status' => 1, 'text' => 'Не найден такой сундук.'));
            //         die();
            //     }
            //     $check = $db->super_query("SELECT * FROM chest_types WHERE id='{$select['type']}'");
            //     header('Content-Type: text/html');

            //     if ($select['from_shop']) $unlock_time = $check['hours_shop'];
            //     else $unlock_time = $check['hours'];
            //     if ($unlock_time) $unlock_time = "{$unlock_time}ч.";
            //     else $unlock_time = "Без ожидания";
            //     if (!$select['unlock_time'] && $unlock_time) {
            //         $text = "Нажмите, чтобы разблокировать сундук";
            //         $totalForceOpen += 1;
            //         $totalNotOpened++;
            //         $textTime = "Закрыто";
            //     } else if ($select['unlock_time'] > time()) {
            //         $opened_class2 = "chest_ready_to_open_during";
            //         $text = "Сундук еще закрыт, мы подбираем ключ..<br/><br/>Взломать его прямо сейчас за <b>$forceopen</b> <img style='width: 20px; height: 20px; margin-top: -2px;' src='http://shadowcraft.ru/uploads/diamond.png' class='diamond_icon'>";
            //         $untiltime = $get['unlock_time'] - time();
            //         $server = "<span>Открыть сейчас</span>{$check['open_cost']} <img style='width: 20px; height: 20px; margin-top: -2px;' src='http://shadowcraft.ru/uploads/diamond.png' class='diamond_icon'>";
            //     } else {
            //         $opened_class = "chest_ready_to_open";
            //         $opened_class2 = "chest_ready_to_open_lay";
            //         $text = "Готово! Нажмите, чтобы посмотреть, что в сундуке";
            //         $textTime = "Открыть";
            //         $server = "Сейчас";
            //     }

            //     if ($check['rare_type'] == 'simple') $rare_type = "Обычный";
            //     else if ($check['rare_type'] == 'epic') $rare_type = "Эпический";

            //     echo "
            //             <div id='itemSh' class='uk-modal'>
            //                 <div class='uk-modal-dialog' style='width: 400px'>
            //                     <div class='open_chest_title'>{$check['name']}</div>
            //                     <div class='chest_info_image' style='background-image: url($DURL/uploads/chests/chest_{$check['typeid']}.png);'></div>
            //                     <div class='chest_info_list'>
            //                         <div class='chest_rare_type' data-type='{$check['rare_type']}'><i class='uk-icon-star'></i>$rare_type</div>
            //                         <div class='chest_info_time'><i class='uk-icon-clock-o'></i>$unlock_time</div>
            //                         <div class='chest_info_text'>
            //                             В этом сундуке вам попадется пять случайных вещей из онлайн магазина на случайные сервера.
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         ";
            // } else if ($action == "chest_open") {
            //     $id = $db->safesql($_POST['id']);
            //     $select = $db->super_query("SELECT * FROM chest_list WHERE id='$id' AND to_uuid='{$member_id['uuid']}'");
            //     if (!$select['id']) {
            //         echo json_encode(array('status' => 1, 'text' => 'Не найден такой сундук.'));
            //         die();
            //     }

            //     if ($select['unlock_time'] == 0) {
            //         $check = $db->query("SELECT * FROM chest_list WHERE to_uuid='{$member_id['uuid']}' AND unlock_time!='0' AND unlock_time>'" . time() . "'");
            //         if ($db->num_rows($check)) {
            //             echo json_encode(array('status' => 1, 'text' => 'Одновременно может открываться только один сундук.<br/>Подождите пожалуйста, после чего открывайте новый.'));
            //             die();
            //         }
            //     }

            //     $check = $db->super_query("SELECT * FROM chest_types WHERE id='{$select['type']}'");
            //     if ($select['from_shop']) {
            //         if ($check['typeid'] == 1) $until = 3600 * $check['hours_shop'];
            //         else if ($check['typeid'] == 2) $until = 3600 * $check['hours_shop'];
            //         else if ($check['typeid'] == 3) $until = 3600 * $check['hours_shop'];
            //         else if ($check['typeid'] == 4) $until = -10;
            //         else if ($check['typeid'] == 5) $until = -10;
            //     } else {
            //         if ($check['typeid'] == 1) $until = 3600 * $check['hours'];
            //         else if ($check['typeid'] == 2) $until = 3600 * $check['hours'];
            //         else if ($check['typeid'] == 3) $until = 3600 * $check['hours'];
            //         else if ($check['typeid'] == 4) $until = 3600 * $check['hours'];
            //         else if ($check['typeid'] == 5) $until = -10;
            //     }
            //     $forceopen = $check['open_cost'];

            //     if ($select['unlock_time'] == 0) {
            //         $untilTime = time() + $until;
            //         $db->query("UPDATE chest_list SET unlock_time='$untilTime' WHERE id='$id'");
            //         header('Content-Type: text/html');
            //         require_once "/home/admin/web/paradisecloud.ru/public_html/engine/modules/andrew_shbov/alone/chest_out.php";
            //         $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //         echo $content . "<script>$('#diamond_balance').html('{$member_id['diamonds']}');</script>";
            //     } else if ($select['unlock_time'] > time()) {
            //         if ($forceopen <= $member_id['diamonds']) {
            //             $untilTime = time() - 10;
            //             $db->query("UPDATE chest_list SET unlock_time='$untilTime' WHERE id='$id'");
            //             $db->query("UPDATE dle_users SET diamonds=diamonds-$forceopen WHERE name='{$member_id['name']}'");
            //             header('Content-Type: text/html');
            //             require_once "/home/admin/web/paradisecloud.ru/public_html/engine/modules/andrew_shbov/alone/chest_out.php";
            //             $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //             echo $content . "<script>$('#diamond_balance').html('{$member_id['diamonds']}');</script>";
            //         } else {
            //             echo json_encode(array('status' => 1, 'text' => "К сожалению у вас недостаточно алмазов.<br/>Купите себе алмазы нажав на кнопку \"Пополнить баланс\""));
            //             die();
            //         }
            //     }
            // } else if ($action == "open_all_chests") {
            //     $select = $db->query("SELECT * FROM chest_list WHERE to_uuid='{$member_id['uuid']}' AND unlock_time='0'");
            //     if ($db->num_rows($select) > 1) {
            //         $price = $db->num_rows($select) * 1;
            //         if ($price <= $member_id['diamonds']) {
            //             $db->query("UPDATE dle_users SET diamonds=diamonds-$price WHERE name='{$member_id['name']}'");
            //             while ($get = $db->get_row($select)) {
            //                 $check = $db->super_query("SELECT * FROM chest_types WHERE id='{$get['type']}'");
            //                 if ($get['from_shop']) {
            //                     if ($check['typeid'] == 1) $until = 3600 * $check['hours_shop'];
            //                     else if ($check['typeid'] == 2) $until = 3600 * $check['hours_shop'];
            //                     else if ($check['typeid'] == 3) $until = 3600 * $check['hours_shop'];
            //                     else if ($check['typeid'] == 4) $until = -10;
            //                     else if ($check['typeid'] == 5) $until = -10;
            //                 } else {
            //                     if ($check['typeid'] == 1) $until = 3600 * $check['hours'];
            //                     else if ($check['typeid'] == 2) $until = 3600 * $check['hours'];
            //                     else if ($check['typeid'] == 3) $until = 3600 * $check['hours'];
            //                     else if ($check['typeid'] == 4) $until = 3600 * $check['hours'];
            //                     else if ($check['typeid'] == 5) $until = -10;
            //                 }
            //                 $untilTime = time() + $until;
            //                 $db->query("UPDATE chest_list SET unlock_time='$untilTime' WHERE id='{$get['id']}'");
            //             }
            //             header('Content-Type: text/html');
            //             require_once "/home/admin/web/paradisecloud.ru/public_html/engine/modules/andrew_shbov/alone/chest_out.php";
            //             $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //             echo $content . "<script>$('#diamond_balance').html('{$member_id['diamonds']}');</script>";
            //         } else {
            //             echo json_encode(array('status' => 1, 'text' => "К сожалению у вас недостаточно алмазов.<br/>Купите себе алмазы нажав на кнопку \"Пополнить баланс\""));
            //             die();
            //         }
            //     } else echo json_encode(array('status' => 1, 'text' => "У вас остался один сундук, который нужно открыть. Сделайте это сами."));
            // } else if ($action == "chest_open_ok") {
            //     /*if($member_id['name'] != 'andrew_shbov') {
            //             echo json_encode(array('status' => 1, 'text' => "Ведутся профилактические работы. Повторите через несколько минут."));
            //             die();
            //         }*/
            //     $id = $db->safesql($_POST['id']);
            //     $select = $db->super_query("SELECT * FROM chest_list WHERE id='$id' AND to_uuid='{$member_id['uuid']}'");
            //     if (!$select['id']) {
            //         echo json_encode(array('status' => 1, 'text' => 'Вы уже открыли этот сундук.'));
            //         die();
            //     }
            //     $check = $db->super_query("SELECT * FROM chest_types WHERE id='{$select['type']}'");
            //     if ($select['from_shop']) $unlock_time = $check['hours_shop'];
            //     else $unlock_time = $check['hours'];
            //     if (($select['unlock_time'] < time() && $select['unlock_time'] != 0) || !$unlock_time) {
            //         $db->query("DELETE FROM chest_list WHERE id='$id' AND to_uuid='{$member_id['uuid']}'");
            //         header('Content-Type: text/html');
            //         if ($check['typeid'] == 1) {
            //             $diamonds = array();
            //             for ($i = 0; $i < 3; $i++) array_push($diamonds, 1);
            //             for ($i = 0; $i < 2; $i++) array_push($diamonds, 2);
            //             for ($i = 0; $i < 1; $i++) array_push($diamonds, 3);
            //             $cash = array(5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 30, 40, 40, 40, 40, 40, 50, 50, 50);
            //             $shop = array(1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 30, 30);
            //         } else if ($check['typeid'] == 2) {
            //             $diamonds = array();
            //             $cash = array();
            //             $shop = array();
            //             for ($i = 0; $i < 7; $i++) array_push($diamonds, 2);
            //             for ($i = 0; $i < 6; $i++) array_push($diamonds, 3);
            //             for ($i = 0; $i < 5; $i++) array_push($diamonds, 4);
            //             for ($i = 0; $i < 4; $i++) array_push($diamonds, 5);
            //             for ($i = 0; $i < 3; $i++) array_push($diamonds, 6);
            //             for ($i = 0; $i < 2; $i++) array_push($diamonds, 7);
            //             for ($i = 0; $i < 1; $i++) array_push($diamonds, 8);

            //             for ($i = 0; $i < 7; $i++) array_push($cash, 10);
            //             for ($i = 0; $i < 6; $i++) array_push($cash, 20);
            //             for ($i = 0; $i < 5; $i++) array_push($cash, 30);
            //             for ($i = 0; $i < 4; $i++) array_push($cash, 40);
            //             for ($i = 0; $i < 3; $i++) array_push($cash, 50);
            //             for ($i = 0; $i < 2; $i++) array_push($cash, 60);
            //             for ($i = 0; $i < 1; $i++) array_push($cash, 70);

            //             for ($i = 0; $i < 3; $i++) array_push($shop, 30);
            //             for ($i = 0; $i < 2; $i++) array_push($shop, 40);
            //             for ($i = 0; $i < 1; $i++) array_push($shop, 50);
            //         } else if ($check['typeid'] == 3) {
            //             $diamonds = array();
            //             $cash = array();
            //             $shop = array();
            //             for ($i = 0; $i < 7; $i++) array_push($diamonds, 5);
            //             for ($i = 0; $i < 6; $i++) array_push($diamonds, 6);
            //             for ($i = 0; $i < 5; $i++) array_push($diamonds, 7);
            //             for ($i = 0; $i < 4; $i++) array_push($diamonds, 8);
            //             for ($i = 0; $i < 3; $i++) array_push($diamonds, 9);
            //             for ($i = 0; $i < 2; $i++) array_push($diamonds, 10);
            //             for ($i = 0; $i < 1; $i++) array_push($diamonds, 11);

            //             for ($i = 0; $i < 7; $i++) array_push($cash, 100);
            //             for ($i = 0; $i < 6; $i++) array_push($cash, 110);
            //             for ($i = 0; $i < 5; $i++) array_push($cash, 130);
            //             for ($i = 0; $i < 4; $i++) array_push($cash, 140);
            //             for ($i = 0; $i < 3; $i++) array_push($cash, 160);
            //             for ($i = 0; $i < 2; $i++) array_push($cash, 190);
            //             for ($i = 0; $i < 1; $i++) array_push($cash, 200);

            //             for ($i = 0; $i < 3; $i++) array_push($shop, 50);
            //             for ($i = 0; $i < 2; $i++) array_push($shop, 100);
            //             for ($i = 0; $i < 1; $i++) array_push($shop, 150);
            //         }
            //         if ($check['typeid'] <= 3) {
            //             $what = array();
            //             for ($i = 0; $i < 3; $i++) array_push($what, 1);
            //             for ($i = 0; $i < 2; $i++) array_push($what, 2);
            //             //for($i = 0; $i < 1; $i++) array_push($what, 3);
            //             shuffle($diamonds);
            //             shuffle($cash);
            //             shuffle($shop);
            //             shuffle($what);
            //             $works = array();
            //             $index = rand(0, count($what) - 1);
            //             if ($what[$index] == 1) {
            //                 $img = "<img src='http://shadowcraft.ru/uploads/diamond.png' style='width: 72px; height: 72px;margin-left: -10px;' class='diamond_icon'>";
            //                 $index_second = rand(0, count($diamonds) - 1);
            //                 $value = $diamonds[$index_second];
            //                 $db->query("UPDATE dle_users SET diamonds=diamonds+$value WHERE name='{$member_id['name']}'");
            //                 $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //             } else if ($what[$index] == 2) {
            //                 $img = "руб.";
            //                 $index_second = rand(0, count($cash) - 1);
            //                 $value = $cash[$index_second];
            //                 $db->query("UPDATE dle_users SET cash=cash+$value WHERE name='{$member_id['name']}'");
            //                 $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //             }
            //             echo "
            //                     <div id='itemSh' class='uk-modal'>
            //                         <div class='uk-modal-dialog' style='width: 700px'>
            //                             <div class='open_chest_title'>Открываем {$check['name']}</div>
            //                             <div class='open_chest_area'>
            //                                 <div class='open_main_message' style='display: none'>Немного расскажем вам про сундук...</div>
            //                                 <div class='open_what_inside' style='display: none'>
            //                                     <div class='item_chest'>+ $value $img</div>
            //                                 </div>
            //                                 <div style='display: none' class='open_chest_inside' style='margin-top: 48px;'>{$check['inside']}<br/><br/><a onclick='return false;' id='nextButtonOpen' style='display: none;'>Здорово! Покажите уже что в нем!</a></div>
            //                                 <div class='open_chest_image' style='background-image: url($DURL/uploads/chests/chest_{$check['typeid']}.png);position: absolute;text-align: center;margin-left: 220px;margin-top: 48px;display: none;'></div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 ";
            //         } else if ($check['typeid'] == 4) {
            //             $price = array(100, 50, 30, 30, 30, 30, 30); //Максимум 120 рублей

            //             for ($i = 0; $i < 7; $i++) {
            //                 $items = array();
            //                 $check2 = $db->query("SELECT * FROM shop_items WHERE price<={$price[$i]} AND diamonds='0'");
            //                 if ($db->num_rows($check2)) {
            //                     while ($get = $db->get_row($check2)) {
            //                         array_push($items, $get['id']);
            //                     }
            //                 }
            //                 $rand = rand(0, count($items) - 1);
            //                 $id = $items[$rand];
            //                 $check2 = $db->super_query("SELECT * FROM shop_items WHERE id='$id' AND diamonds='0'");
            //                 $rand_count = rand(1, 2);
            //                 $itemname[$i] = $check2['itemname'];
            //                 $img[$i] = "<img src='{$check2['icon']}' width='120px'>";
            //                 $count[$i] = $rand_count * $check2['stack'];
            //                 $info = $db->super_query("SELECT * FROM shop_list WHERE id='{$check2['shopid']}'");
            //                 $server[$i] = $info['shopname'];
            //                 $db->query("INSERT INTO {$info['table_name']} VALUES (null, 'item', '{$check2['itemid']}', '{$member_id['name']}', '{$count[$i]}', null, null)");
            //                 $db->query("INSERT INTO `shop_history` (`id`, `itemid`, `time`, `uuid`, `summa`, `shop`, `enchant`, `count`) VALUES (NULL, '{$check2['id']}', '" . time() . "', '{$member_id['uuid']}', '0.00', '{$info['shopname']}', '', '{$count[$i]}')");
            //             }
            //             echo "
            //                     <div id='itemSh' class='uk-modal'>
            //                         <div class='uk-modal-dialog' style='width: 700px'>
            //                             <div class='open_chest_title'>Открываем {$check['name']}</div>
            //                             <div class='open_chest_area'>
            //                                 <div class='open_main_message' style='display: none'>Немного расскажем вам про сундук...</div>
            //                                 <div class='open_what_inside' style='display: none;font-size: 20px;margin-top: 69px;'>
            //                                     <div class='item_chest item_tada_chest' style='margin-left: -5px;margin-top: -48px;'>{$img[0]}<div class='item_drop_raz'>{$itemname[0]} ({$count[0]} шт.)<br/>{$server[0]} сервера</div></div>
            //                                     <div class='item_chest item_k_1  item_tada_chest' style='display: none'>{$img[1]}<div class='item_drop_raz'>{$itemname[1]} ({$count[1]} шт.)<br/>{$server[1]} сервера</div></div>
            //                                     <div class='item_chest item_k_2  item_tada_chest' style='display: none'>{$img[2]}<div class='item_drop_raz'>{$itemname[2]} ({$count[2]} шт.)<br/>{$server[2]} сервера</div></div>
            //                                     <div class='item_chest item_k_3  item_tada_chest' style='display: none'>{$img[3]}<div class='item_drop_raz'>{$itemname[3]} ({$count[3]} шт.)<br/>{$server[3]} сервера</div></div>
            //                                     <div class='item_chest item_k_4  item_tada_chest' style='display: none'>{$img[4]}<div class='item_drop_raz'>{$itemname[4]} ({$count[4]} шт.)<br/>{$server[4]} сервера</div></div>
            //                                 </div>
            //                                 <div style='display: none;font-size: 12px;margin-top: 36px;width: 346px;' class='open_chest_inside'>{$check['inside']}<br/><br/><a onclick='return false;' id='nextButtonOpen' style='display: none;'>Здорово! Покажите уже что в нем!</a></div>
            //                                 <div class='open_chest_image' style='background-image: url($DURL/uploads/chests/chest_{$check['typeid']}.png);position: absolute;text-align: center;margin-left: 220px;margin-top: 48px;display: none;'></div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 ";
            //         } else if ($check['typeid'] == 5) {

            //             for ($i = 0; $i < 50; $i++) {
            //                 $items = array();
            //                 if ($i == 0) $check2 = $db->query("SELECT * FROM shop_items WHERE price<=100 AND price>=50 AND diamonds='0' AND shopid='{$check['server']}'");
            //                 else $check2 = $db->query("SELECT * FROM shop_items WHERE price<=6 AND diamonds='0' AND shopid='{$check['server']}'");
            //                 if ($db->num_rows($check2)) {
            //                     while ($get = $db->get_row($check2)) {
            //                         array_push($items, $get['id']);
            //                     }
            //                 }
            //                 $rand = rand(0, count($items) - 1);
            //                 $id = $items[$rand];
            //                 $check2 = $db->super_query("SELECT * FROM shop_items WHERE id='$id' AND diamonds='0'");
            //                 $rand_count = 1;
            //                 $itemname[$i] = $check2['itemname'];
            //                 $img[$i] = "<img src='{$check2['icon']}' style='margin-right: 4px;margin-top: -5px;' width='20px'>";
            //                 $count[$i] = $rand_count * $check2['stack'];
            //                 $info = $db->super_query("SELECT * FROM shop_list WHERE id='{$check2['shopid']}'");
            //                 $server[$i] = $info['shopname'];
            //                 $db->query("INSERT INTO {$info['table_name']} VALUES (null, 'item', '{$check2['itemid']}', '{$member_id['name']}', '{$count[$i]}', null, null)");
            //                 $db->query("INSERT INTO `shop_history` (`id`, `itemid`, `time`, `uuid`, `summa`, `shop`, `enchant`, `count`) VALUES (NULL, '{$check2['id']}', '" . time() . "', '{$member_id['uuid']}', '0.00', '{$info['shopname']}', '', '{$count[$i]}')");
            //                 if ($i > 0) $listOfItems .= "<div class='item_chest item_k_$i' style='display: none'>{$img[$i]}{$itemname[$i]} ({$count[$i]} шт.) на {$server[$i]} сервера</div>";
            //             }
            //             $check['inside'] = str_replace("<b style='color: yellow'>50 разных вещей из онлайн магазина на {servername}</b><br/><br/>", '', $check['inside']);
            //             if ($check['server']) {
            //                 $ch = $db->super_query("SELECT * FROM shop_list WHERE id='{$check['server']}'");
            //                 $server = $ch['shopname'];
            //                 $check['inside'] = str_replace('{servername}', $server, $check['inside']);
            //             }
            //             echo "
            //                     <div id='itemSh' class='uk-modal'>
            //                         <div class='uk-modal-dialog' style='width: 700px'>
            //                             <div class='open_chest_title'>Открываем {$check['name']}</div>
            //                             <div class='open_chest_area'>
            //                                 <div class='open_main_message' style='display: none'>Немного расскажем вам про сундук...</div>
            //                                 <div class='open_what_inside' style='display: none;font-size: 14px;margin-top: 39px;'>
            //                                     <div class='item_chest'>{$img[0]}{$itemname[0]} ({$count[0]} шт.) на $server сервера</div>
            //                                     $listOfItems
            //                                 </div>
            //                                 <div style='display: none;font-size: 12px;margin-top: 36px;width: 346px;' class='open_chest_inside'>{$check['inside']}<br/><br/><a onclick='return false;' id='nextButtonOpen' style='display: none;'>Здорово! Покажите уже что в нем!</a></div>
            //                                 <div class='open_chest_image' style='background-image: url($DURL/uploads/chests/chest_{$check['typeid']}.png);position: absolute;text-align: center;margin-left: 220px;margin-top: 48px;display: none;'></div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 ";
            //         }
            //     } else echo json_encode(array('status' => 1, 'text' => 'Вы не можете открыть этот сундук.'));
            // } else if ($action == "buychest") {
            //     $id = $db->safesql($_POST['id']);
            //     $select = $db->super_query("SELECT * FROM chest_types WHERE id='$id' AND in_shop='1'");
            //     if (!$select['id']) {
            //         echo json_encode(array('status' => 1, 'text' => 'Не найден такой сундук.'));
            //         die();
            //     }
            //     header('Content-Type: text/html');
            //     if ($member_id['diamonds'] >= $select['cost']) {
            //         if ($select['typeid'] == 5) $time = time();
            //         else $time = 0;
            //         $db->query("UPDATE dle_users SET diamonds=diamonds-{$select['cost']} WHERE name='{$member_id['name']}'");
            //         $db->query("UPDATE chest_types SET buy_times=buy_times+1 WHERE id='$id'");

            //         $db->query("INSERT INTO `chest_list` (`id`, `type`, `to_uuid`, `addtime`, `unlock_time`, `from_shop`) VALUES (NULL, '{$select['id']}', '{$member_id['uuid']}', '" . time() . "', '$time', 1)");
            //         $db->query("INSERT INTO `shop_history` (`id`, `itemid`, `time`, `uuid`, `summa`, `shop`, `enchant`, `count`) VALUES (NULL, '{$select['id']}', '" . time() . "', '{$member_id['uuid']}', '{$select['cost']}', '{$select['name']}', '', '99999')");
            //         addLog($member_id['uuid'], -$select['price'], "[{$shop['shopname']}] Приобрел {$select['name']} (1 шт.)", 11);
            //         $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
            //         echo "<script>$('#diamond_balance').html('{$member_id['diamonds']}');</script>";
            //         echo returnNotifer("Спасибо за покупку!<br/><b>{$select['name']}</b> отправлен на страницу с вашими сундуками.<br/>Желаем вам найти в нем что-нибудь интересненькое!", 'check', '', 'margin-top: 10px;');
            //     } else echo returnNotifer("К сожалению у вас недостаточно алмазов.<br/>Купите себе алмазы нажав на кнопку \"Пополнить баланс\"", "times", '', 'margin-top: 10px;');
            // }
            else if ($action == "buysets") {
                $id = $db->safesql($_POST['id']);
                $select = $db->super_query("SELECT * FROM shop_sets WHERE id='$id'");
                if (!$select['id']) {
                    echo json_encode(array('status' => 1, 'text' => 'Не найден такой набор.'));
                    die();
                }
                header('Content-Type: text/html');
                if ($member_id['cash'] >= $select['price']) {
                    $db->query("UPDATE dle_users SET cash=cash-{$select['price']} WHERE name='{$member_id['name']}'");
                    $db->query("UPDATE shop_sets SET buy_times=buy_times+1 WHERE id='$id'");
                    $shop = $db->super_query("SELECT * FROM shop_list WHERE id='{$select['shopid']}'");

                    $summa = 0;
                    $exp = explode(',', $select['content_ids']);
                    for ($i = 0; $i < count($exp); $i++) {
                        $check = $db->super_query("SELECT * FROM shop_items WHERE id='{$exp[$i]}'");
                        $db->query("INSERT INTO {$shop['table_name']} VALUES (null, 'item', '{$check['itemid']}', '{$member_id['name']}', '{$check['stack']}', null, null)");
                    }
                    $db->query("INSERT INTO `shop_history` (`id`, `itemid`, `time`, `uuid`, `summa`, `shop`, `enchant`, `count`) VALUES (NULL, '{$select['id']}', '" . time() . "', '{$member_id['uuid']}', '{$select['price']}', '{$shop['shopname']}', '', '9999')");
                    addLog($member_id['uuid'], -$select['price'], "[{$shop['shopname']}] Приобрел {$select['setname']} (1 шт.)", 9);
                    $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
                    echo "<script>$('#balance').html('{$member_id['cash']}');</script>";
                    echo returnNotifer("Спасибо за покупку!<br/><b>{$select['setname']}</b> (1 шт.) успешно отправлен на сервера <b>{$shop['shopname']}</b>.<br/><br/>Для того, чтобы забрать товары в игре, введите в чате <b>/cart all</b>", 'check', '', 'margin-top: 10px;');
                } else {
                    echo returnNotifer("К сожалению у вас недостаточно средств на балансе.<br/>Пополните пожалуйста баланс и попробуйте снова.", "times", '', 'margin-top: 10px;');
                }

            } else if ($action == "show") {
                $id = $db->safesql($_POST['id']);
                $select = $db->super_query("SELECT * FROM shop_items WHERE id='$id'");
                if (!$select['can_buy']) {
                    echo json_encode(array('status' => 1, 'text' => 'Этот товар временно снят с продажи.'));
                    die();
                }
                $price = getPrice($select['id'], $member_id);
                if ($price['percent'] > getParam("diamond_percent") && $select['until'] > time()) {
                    $percentWhy = returnNotifer("Скидка в <b>{$select['percent']}%</b> продлится еще " . showDateDo($select['until']) . "<br/>Поторопитесь выгодно приобрести этот товар!", 'clock-o');
                } else if (isCan($member_id['uuid'], "diamond")) {
                    $percentWhy = returnNotifer("Для обладателей <b>Алмазного аккаунта</b> действует специальная скидка в размере <b>" . getParam("diamond_percent") . "%</b> на все товары в нашем онлайн-магазине.", 'star');
                }

                if ($select['canen']) {
                    $specen = "
							<table id='enchtable' style='width: 460px; display: none' class='uk-table uk-table-striped'>
								<tr>
									<td style='padding: 5px;' width='300px'>Защита</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(1, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_1'>&nbsp;</b> <button onclick='enchantState(1, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Огнестойкость</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(2, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_2'>&nbsp;</b> <button onclick='enchantState(2, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Взрывоустойчивость</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(3, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_3'>&nbsp;</b> <button onclick='enchantState(3, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Снарядостойкость</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(4, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_4'>&nbsp;</b> <button onclick='enchantState(4, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Лёгкость</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(5, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_5'>&nbsp;</b> <button onclick='enchantState(5, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Дыхание</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(6, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_6'>&nbsp;</b> <button onclick='enchantState(6, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Родство с водой</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(7, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_7'>&nbsp;</b> <button onclick='enchantState(7, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Шипы</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(8, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_8'>&nbsp;</b> <button onclick='enchantState(8, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Острота</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(9, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_9'>&nbsp;</b> <button onclick='enchantState(9, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Небесная кара</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(10, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_10'>&nbsp;</b> <button onclick='enchantState(10, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Бич членистоногих</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(11, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_11'>&nbsp;</b> <button onclick='enchantState(11, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Отбрасывание</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(12, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_12'>&nbsp;</b> <button onclick='enchantState(12, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Аспект огня</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(13, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_13'>&nbsp;</b> <button onclick='enchantState(13, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Мародёрство</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(14, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_14'>&nbsp;</b> <button onclick='enchantState(14, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Сила</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(15, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_15'>&nbsp;</b> <button onclick='enchantState(15, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Ударная волна</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(16, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_16'>&nbsp;</b> <button onclick='enchantState(16, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Воспламенение</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(17, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_17'>&nbsp;</b> <button onclick='enchantState(17, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Бесконечность</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(18, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_18'>&nbsp;</b> <button onclick='enchantState(18, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Эффективность</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(19, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_19'>&nbsp;</b> <button onclick='enchantState(19, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Шёлковое касание</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(20, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_20'>&nbsp;</b> <button onclick='enchantState(20, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Прочность</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(21, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_21'>&nbsp;</b> <button onclick='enchantState(21, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
								<tr>
									<td style='padding: 5px;' width='300px'>Удача</td>
									<td align='right' style='padding: 2px;'><button type='button' onclick='enchantState(22, 0)' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-minus'></i></button> <b style='font-size: 14pt;padding: 0px 10px;' id='ench_22'>&nbsp;</b> <button onclick='enchantState(22, 1)' type='button' style='padding: 3px 7px;' class='uk-buttom-mini'><i class='uk-icon-plus'></i></button></td>
								</tr>
							</table>
							<script>
								function enchantState(num, act) {
									var price = " . getParam('enchant_price') . ";
									var ench_summa = parseInt($('#ench_summa').html());
									var ench = $('#ench_'+num).html();
									if(ench == '&nbsp;') ench = 0;
									else ench = parseInt(ench);

									if(act) {
										if(ench < 10) {
											$('#ench_'+num).html(ench+1);
											$('#ench_summa').html(ench_summa+price);
											$('#megatotalprice').html((parseFloat($('#megatotalprice').html())+parseInt(price)).toFixed(2));
											$('#enchant_notice').html(\"<i class='uk-icon-warning uk-text-danger' data-uk-tooltip title='С пользовательским зачарованием товар будет продан в ОДНОМ экземпляре, вне зависимости от выбранного вами клоличества.'></i>\");
											$('#count').attr('class', 'uk-text-danger');
											$('#count').html(1);
										}
									}
									else {
										if(ench > 0) {
											$('#megatotalprice').html((parseFloat($('#megatotalprice').html())-price).toFixed(2));
											$('#ench_'+num).html(ench-1);
											if(ench-1 <= 0) {
												$('#ench_'+num).html('&nbsp;');
												$('#ench_summa').html(ench_summa-price);
											}
											else $('#ench_summa').html(ench_summa-price);
										}
									}
									if(parseInt($('#ench_summa').html()) <= 0) {
										$('#enchant_notice').html(\"\");
										$('#count').attr('class', '');
										$('#lessItem').show();
										$('#moreItem').show();
										$('#currentStack').val('1');
									}
									else {
										$('#lessItem').hide();
										$('#moreItem').hide();
										$('#countitems').html('{$select['stack']}');
										$('#currentStack').val('1');
										$('#megatotalprice').html(parseInt($('#ench_summa').html()) + {$price['price']});
									}
								}
							</script>
						";
                    $enchantPls = "<div id='enchantButton'><i class='uk-icon-magic'></i> ЗАЧАРОВАТЬ ТОВАР</div>";
                    $ifYes = "<tr><td style='padding: 5px;' width='300px'><b>Стоимость выбранного зачарования</b></td><td align='right' style='padding: 2px;'><span style='font-size: 14pt;padding: 0px 10px;'><span id='ench_summa' data-stack='{$select['stack']}' data-cost='{$price['price']}'>0</span> руб.</span></b></td></tr>";
                }
                if ($select['diamonds']) {
                    $symbol = "<img src='http://paradisecloud.ru/uploads/diamond.png' class='diamond_icon'>";
                } else {
                    $symbol = "руб.";
                }

                if ($select['id']) {
                    header('Content-Type: text/html');
                    echo "
							<div id='itemSh' class='uk-modal'>
							    <div class='uk-modal-dialog' style='width: 500px'>
							        <b>ПРОСМОТР ВЫБРАННОГО ТОВАРА$enchantPls</b>
							        <div class='modal_content'>
								        <table class='uk-width-1-1'>
								        	<tr>
								        		<td width='120px'><img src='{$select['icon']}' width='110px'></td>
								        		<td valign='top'>
								        			<table class='uk-width-1-1 uk-table uk-table-striped'>
								        				<tr>
								        					<td>Название товара</td>
								        					<td align='right'><b>{$select['itemname']}</b></td>
								        				</tr>
								        				<tr>
								        					<td>Стоимость</td>
								        					<td align='right'>{$price['text']}</td>
								        				</tr>
								        				<tr>
								        					<td>Количество за стоимость выше</td>
								        					<td align='right'>{$select['stack']} шт.</td>
								        				</tr>
								        			</table>
								        		</td>
								        	</tr>
								        </table>$percentWhy
								        $specen
								        <table class='uk-width-1-1 uk-table uk-table-striped' style='width: 459px;'>
										    $ifYes
								        	<tr>
								        		<td style='padding: 5px;' width='300px'><div style='margin-top: 4px;'><b>Сколько товара хотите получить?</b></div></td>
								        		<td align='right' style='padding: 5px;'>
								        			<div style='font-size: 14pt;'><i class='uk-icon-minus' id='lessItem' data-stack='{$select['stack']}' data-cost='{$price['price']}' style='cursor: pointer;'></i>
								        			<span id='countitems'>{$select['stack']}</span> шт.
								        			<i class='uk-icon-plus' style='cursor: pointer;' data-stack='{$select['stack']}' data-cost='{$price['price']}' id='moreItem'></i></div>
								        		</td>
								        	</tr>
								        	<tr>
								        		<td style='padding: 5px;' width='300px'><div style='margin-top: 4px;'><b>ОБЩАЯ СТОИМОСТЬ</b></div></td>
								        		<td align='right' style='padding: 5px;'>
								        			<div style='font-size: 14pt;'><b><span id='megatotalprice'>{$price['price']}</span> $symbol</b></div>
								        		</td>
								        	</tr>
								        </table>
								        <div id='buyOutput'></div>
								        <button type='button' id='buy-item' class='uk-width-1-1 uk-button' data-id='{$select['id']}'>Купить товар</button>
							        </div>
							    </div>
							</div>
						";
                } //background: rgba(160, 125, 83, 0.13);
                else {
                    echo json_encode(array('status' => 1, 'text' => 'Ошбика. Обновите страницу. '));
                }

            } else if ($action == "buy") {
                $itemid = $db->safesql($_POST['itemid']);
                $count = $db->safesql($_POST['count']);
                if ($count >= 1 && is_numeric($count) && $itemid && is_numeric($itemid)) {
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['itemname']) {
                        if (!$select['can_buy']) {
                            echo json_encode(array('status' => 1, 'text' => 'Этот товар временно снят с продажи.'));
                            die();
                        }
                        header('Content-Type: text/html');
                        $charSum = 0;
                        $useEnchant = false;
                        if ($select['canen']) {
                            $enchant = "";
                            $charSumma = getParam('enchant_price');
                            $enchantLevels = $db->safesql($_POST['enchantLevels']);
                            $explode = explode(',', $enchantLevels);
                            for ($i = 0; $i < count($explode); $i++) {
                                if (!is_numeric($explode[$i]) || strcmp($explode[$i], 'NaN') == 0) {
                                    echo returnNotifer("Ошибка безопасности, ваш IP/Аккаунт внесен в список подозрительных.<br/>Закройте окошко покупки товара и повторите попытку.", 'shield', '', 'margin-bottom: 15px;');
                                    break;
                                    die();
                                } else {
                                    if ($i == 0) {
                                        $enchid = 0;
                                    }

                                    if ($i == 1) {
                                        $enchid = 1;
                                    }

                                    if ($i == 2) {
                                        $enchid = 3;
                                    }

                                    if ($i == 3) {
                                        $enchid = 4;
                                    }

                                    if ($i == 4) {
                                        $enchid = 2;
                                    }

                                    if ($i == 5) {
                                        $enchid = 5;
                                    }

                                    if ($i == 6) {
                                        $enchid = 6;
                                    }

                                    if ($i == 7) {
                                        $enchid = 7;
                                    }

                                    if ($i == 8) {
                                        $enchid = 16;
                                    }

                                    if ($i == 9) {
                                        $enchid = 17;
                                    }

                                    if ($i == 10) {
                                        $enchid = 18;
                                    }

                                    if ($i == 11) {
                                        $enchid = 19;
                                    }

                                    if ($i == 12) {
                                        $enchid = 20;
                                    }

                                    if ($i == 13) {
                                        $enchid = 21;
                                    }

                                    if ($i == 14) {
                                        $enchid = 48;
                                    }

                                    if ($i == 15) {
                                        $enchid = 49;
                                    }

                                    if ($i == 16) {
                                        $enchid = 50;
                                    }

                                    if ($i == 17) {
                                        $enchid = 51;
                                    }

                                    if ($i == 18) {
                                        $enchid = 32;
                                    }

                                    if ($i == 19) {
                                        $enchid = 33;
                                    }

                                    if ($i == 20) {
                                        $enchid = 34;
                                    }

                                    if ($i == 21) {
                                        $enchid = 35;
                                    }

                                    if ($explode[$i] > 0) {
                                        if ($explode[$i] > 10) {
                                            $explode[$i] = 10;
                                        }

                                        $charSum += $explode[$i] * $charSumma;
                                        $enchant .= "#$enchid:{$explode[$i]}";
                                        $useEnchant = true;
                                    }
                                }
                            }
                            if ($charSum) {
                                $count = 1;
                            }

                        }
                        $price = getPrice($itemid, $member_id);
                        $totalSumma = ($price['price'] * $count) + $charSum;
                        if (($totalSumma <= $member_id['cash'] && !$select['diamonds']) || ($totalSumma <= $member_id['diamonds'] && $select['diamonds'])) {
                            $check = $db->super_query("SELECT * FROM shop_list WHERE id='{$select['shopid']}'");
                            $info = $db->query("SELECT * FROM information_schema.tables WHERE table_schema = 'admin_site' AND table_name = '{$check['table_name']}' LIMIT 1");
                            if (!$db->num_rows($info)) {
                                $db->query("
										CREATE TABLE `{$check['table_name']}` (
										  `id` int(11) NOT NULL AUTO_INCREMENT,
										  `type` varchar(10) NOT NULL,
										  `item` varchar(128) NOT NULL,
										  `player` varchar(32) NOT NULL,
										  `amount` int(11) NOT NULL,
										  `extra` text,
										  `server` text,
										  PRIMARY KEY (`id`)
										) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
									");
                            }
                            $quontity = $count * $select['stack'];
                            if (!$select['diamonds']) {
                                $db->query("UPDATE dle_users SET cash=cash-$totalSumma WHERE name='{$member_id['name']}'");
                            } else {
                                $db->query("UPDATE dle_users SET diamonds=diamonds-$totalSumma WHERE name='{$member_id['name']}'");
                            }

                            $db->query("UPDATE shop_items SET buy_times=buy_times+1 WHERE id='$itemid'");
                            $db->query("INSERT INTO {$check['table_name']} VALUES (null, 'item', '{$select['itemid']}$enchant', '{$member_id['name']}', '$quontity', null, null)");
                            echo returnNotifer("Спасибо за покупку!<br/><b>{$select['itemname']}</b> ($quontity шт.) успешно отправлен на сервера <b>{$check['shopname']}</b>.<br/><br/>Для того, чтобы забрать этот товар в игре, введите в чате <b>/cart all</b>", 'check', '', 'margin-bottom: 15px;');
                            $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
                            if (!$select['diamonds']) {
                                echo "<script>$('#balance').html('{$member_id['cash']}');</script>";
                            } else {
                                echo "<script>$('#diamond_balance').html('{$member_id['diamonds']}');</script>";
                            }

                            if ($useEnchant) {
                                $enchText = " + Зачарование на $charSum руб.";
                            } else {
                                $enchText = "";
                            }

                            addLog($member_id['uuid'], -$totalSumma, "[{$check['shopname']}] Приобрел {$select['itemname']} ($quontity шт.)$enchText", 5);
                            $db->query("INSERT INTO `shop_history` (`id`, `itemid`, `time`, `uuid`, `summa`, `shop`, `enchant`, `count`) VALUES (NULL, '$itemid', '" . time() . "', '{$member_id['uuid']}', '$totalSumma', '{$check['shopname']}', '$enchant', '$quontity')");
                        } else {
                            if (!$select['diamonds']) {
                                echo returnNotifer("К сожалению для совершения покупки у вас не хватает денег.<br/><a href='#donate' data-uk-modal=\"{'center': 'true'}\">Пополните свой баланс</a> и повторите попытку.", 'shield', '', 'margin-bottom: 15px;');
                            } else {
                                echo returnNotifer("К сожалению для совершения покупки у вас не хватает <b>алмазов</b>.<br/><a href='#donate' data-uk-modal=\"{'center': 'true'}\">Пополните свой баланс</a> и повторите попытку.", 'shield', '', 'margin-bottom: 15px;');
                            }

                        }
                    } else {
                        echo returnNotifer("Ошибка безопасности, ваш IP/Аккаунт внесен в список подозрительных.<br/>Закройте окошко покупки товара и повторите попытку.", 'shield', '', 'margin-bottom: 15px;');
                    }

                } else {
                    echo returnNotifer("Ошибка безопасности, ваш IP/Аккаунт внесен в список подозрительных.<br/>Закройте окошко покупки товара и повторите попытку.", 'shield', '', 'margin-bottom: 15px;');
                }

            } else if ($action == "lastBuy") {
                if (!isset($_SESSION['lastBuy']) || time() - $_SESSION['lastBuy'] > 4) {
                    $_SESSION['lastBuy'] = time();
                    $select = $db->query("SELECT * FROM shop_history ORDER BY id DESC LIMIT 4");
                    if ($db->num_rows($select)) {
                        header('Content-Type: text/html');
                        $output = "<h1 class='full-title module-title' id='news-title'>Последние купленные товары</h1>";
                        while ($get = $db->get_row($select)) {
                            if ($get['count'] != 9999) {
                                $check = $db->super_query("SELECT * FROM shop_items WHERE id='{$get['itemid']}'");
                                $price = getPrice($get['itemid'], $member_id);
                                $info = $db->super_query("SELECT * FROM shop_list WHERE shopname='{$get['shop']}'");
                                $output .= "
										<div class='allItem'>
											<div class='itemname_last'>{$check['itemname']}</div>
											<center><img src='{$check['icon']}' width='60px'></center>
											<div class='shopname_last'>{$get['shop']}</div>
											<div class='price_last'>{$price['text']}</div>
											<a href='$DURL/shop?shopid={$info['id']}&act=show&item={$get['itemid']}'><button type='button' style='font-size: 13px;margin-top: 11px;' class='uk-button uk-width-1-1'>Перейти к товару</button></a>
										</div>
									";
                            } else {
                                $check = $db->super_query("SELECT * FROM shop_sets WHERE id='{$get['itemid']}'");
                                $price = $check['price'];
                                $info = $db->super_query("SELECT * FROM shop_list WHERE shopname='{$get['shop']}'");
                                $output .= "
										<div class='allItem'>
											<div class='itemname_last'>{$check['setname']}</div>
											<center><img src='{$check['icon']}' width='60px'></center>
											<div class='shopname_last'>{$get['shop']}</div>
											<div class='price_last'>{$price} руб.</div>
											<a href='$DURL/shop?shopid={$info['id']}&act=sets'><button type='button' style='font-size: 13px;margin-top: 11px;' class='uk-button uk-width-1-1'>Перейти к товару</button></a>
										</div>
									";
                            }
                        }
                        echo $output;
                    }
                }
            } else if ($action == "changepage") {
                header('Content-Type: text/html');
                $page = $db->safesql($_POST['page']);
                $category = $db->safesql($_POST['category']);
                $order = $db->safesql($_POST['order']);
                $shopid = $db->safesql($_POST['shopid']);
                $search = $db->safesql($_POST['search']);
                if (isset($_GET['only_disc'])) {
                    $only_disc = " AND until>'" . time() . "' AND percent>0 AND discount_from<'" . time() . "'";
                } else {
                    $only_disc = "";
                }

                if ($page >= 1 && $shopid >= 1) {
                    if ($category >= 1) {
                        $category_query = "AND category LIKE '%|$category|%'";
                    } else {
                        $category_query = "";
                    }

                    if (mb_strlen($search, 'utf-8') >= 3) {
                        $search_query = "AND itemname LIKE '%$search%' $category_query $only_disc OR itemid='$search' AND shopid='$shopid' $category_query $only_disc";
                    } else {
                        $search_query = "";
                    }

                    if ($order == 1) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY id ASC";
                    } else if ($order == 2) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY id DESC";
                    } else if ($order == 3) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY itemname ASC";
                    } else if ($order == 4) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY itemname DESC";
                    } else if ($order == 5) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY price ASC";
                    } else if ($order == 6) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY price DESC";
                    } else if ($order == 7) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY buy_times ASC";
                    } else if ($order == 8) {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY buy_times DESC";
                    } else {
                        $query = "SELECT * FROM shop_items WHERE shopid='$shopid' $category_query $search_query $only_disc ORDER BY buy_times DESC";
                    }

                    $perpage = 15;
                    $select = $db->query($query);
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

                        $select = $db->query($query . " LIMIT $start,$perpage");
                        if ($db->num_rows($select)) {
                            while ($get = $db->get_row($select)) {
                                $categoy = "";
                                $ex = explode("||", $get['category']);
                                for ($i = 0; $i < count($ex); $i++) {
                                    $catid = str_replace("|", "", $ex[$i]);
                                    $check = $db->super_query("SELECT * FROM shop_category WHERE id='$catid'");
                                    $categoy .= " {$check['catname']} ";
                                }
                                $categoy = str_replace("  ", ",", $categoy);
                                $word = get_count($get['stack'], "штука", "штуки", "штук");
                                $price = getPrice($get['id'], $member_id);
                                if ($get['canen']) {
                                    $canen = "<span class='uk-text-success'>Возможно</span>";
                                } else {
                                    $canen = "<span style='opacity: 0.7'>Нельзя</span>";
                                }

                                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin") || isCan($member_id['uuid'], "mladmin")) {
                                    $admin_button = "<button type='button' class='uk-button admin_settings_button' data-id='{$get['id']}'><i class='uk-icon-cog'></i></button>";
                                }

                                $disabled = "";
                                $btn = "<button type='button' class='uk-button shop-show-item' data-id='{$get['id']}'>Подробнее</button>";
                                if (!$get['can_buy']) {
                                    $btn = "<button type='button' class='uk-button' data-uk-tooltip title='Товар временно снят с продажи' disabled>Подробнее</button>";
                                    $disabled = "<i class='uk-icon-ban uk-text-danger' data-uk-tooltip title='Товар временно снят с продажи'></i> ";
                                }
                                echo "
									<div class='shop-item' id='shop-item-{$get['id']}'>
										<table class='uk-width-1-1'>
											<tr>
												<td width='50px'><img src='{$get['icon']}' width='40px'></td>
												<td valign='top' width='220px'>
													$disabled{$get['itemname']}
													<div class='uk-text-primary uk-text-small'>$categoy</div>
												</td>
												<td valign='top' align='right' width='100px'>
													{$price['text']}
													<div class='uk-text-primary uk-text-small'>За <b>{$get['stack']} $word</b></div>
												</td>
												<td valign='top' align='right' width='100px'>
													$canen
													<div class='uk-text-primary uk-text-small'>Зачарование</div>
												</td>
												<td valign='top' align='right' width='150px'>
													$btn $admin_button
												</td>
											</tr>
										</table>
									</div>
									";
                            }

                            $prevpage = $page - 1;
                            $nextpage = $page + 1;
                            if ($page == 1) {
                                $first_page = "";
                            } else {
                                $first_page = "<button type='button' class='uk-button changepage' disabled data-page='1'>1</button>";
                            }

                            if ($page == $totalpages) {
                                $last_page = "";
                            } else {
                                $last_page = "<button type='button' class='uk-button changepage' disabled data-page='$totalpages'>$totalpages</button>";
                            }

                            if ($page > 1) {
                                $prev_page = "<button type='button' class='uk-button changepage' disabled data-page='$prevpage'>Предыдущая страница</button>";
                            } else {
                                $prev_page = "<button type='button' class='uk-button disabledButton' disabled>Предыдущая страница</button>";
                            }

                            if ($page < $totalpages) {
                                $next_page = "<button type='button' class='uk-button changepage' disabled data-page='$nextpage'>Следующая страница</button>";
                            } else {
                                $next_page = "<button type='button' class='uk-button disabledButton' disabled>Следующая страница</button>";
                            }

                            echo "
									<table style='margin-top: 10px' class='uk-width-1-1'>
										<tr>
											<td>$first_page $prev_page</td>
											<td align='center'>$page из $totalpages</td>
											<td align='right'>$next_page $last_page</td>
										</tr>
									</table>
								";
                        }
                    }
                }
            } else if ($action == "a_reload") {
                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin") || isCan($member_id['uuid'], "mladmin")) {
                    $itemid = $db->safesql($_POST['id']);
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['id']) {
                        header('Content-Type: text/html');
                        $categoy = "";
                        $ex = explode("||", $select['category']);
                        for ($i = 0; $i < count($ex); $i++) {
                            $catid = str_replace("|", "", $ex[$i]);
                            $check = $db->super_query("SELECT * FROM shop_category WHERE id='$catid'");
                            $categoy .= " {$check['catname']} ";
                        }
                        $categoy = str_replace("  ", ",", $categoy);
                        $word = get_count($select['stack'], "штука", "штуки", "штук");
                        $price = getPrice($select['id'], $member_id);
                        if ($select['canen']) {
                            $canen = "<span class='uk-text-success'>Возможно</span>";
                        } else {
                            $canen = "<span style='opacity: 0.7'>Нельзя</span>";
                        }

                        if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin") || isCan($member_id['uuid'], "mladmin")) {
                            $admin_button = "<button type='button' class='uk-button admin_settings_button' data-id='{$select['id']}'><i class='uk-icon-cog'></i></button>";
                        }

                        $disabled = "";
                        $btn = "<button type='button' class='uk-button shop-show-item' data-id='{$select['id']}'>Подробнее</button>";
                        if (!$select['can_buy']) {
                            $btn = "<button type='button' class='uk-button' data-uk-tooltip title='Товар временно снят с продажи' disabled>Подробнее</button>";
                            $disabled = "<i class='uk-icon-ban uk-text-danger' data-uk-tooltip title='Товар временно снят с продажи'></i> ";
                        }
                        echo "
								<table class='uk-width-1-1'>
									<tr>
										<td width='50px'><img src='{$select['icon']}' width='40px'></td>
										<td valign='top'>
											$disabled{$select['itemname']}
											<div class='uk-text-primary uk-text-small'>$categoy</div>
										</td>
										<td valign='top' align='right'>
											{$price['text']}
											<div class='uk-text-primary uk-text-small'>За <b>{$get['stack']} $word</b></div>
										</td>
										<td valign='top' align='right'>
											$canen
											<div class='uk-text-primary uk-text-small'>Зачарование</div>
										</td>
										<td valign='top' align='right'>
											$btn $admin_button
										</td>
									</tr>
								</table>
							";
                    }
                }
            } else if ($action == "a_edit") {
                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
                    $itemid = $db->safesql($_POST['id']);
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['id']) {
                        header('Content-Type: text/html');
                        $check = $db->super_query("SELECT * FROM shop_list WHERE id='{$select['shopid']}'");
                        if ($select['canen']) {
                            $canen = "checked";
                        } else {
                            $canen = "";
                        }

                        if ($select['can_buy']) {
                            $can_buy = "checked";
                        } else {
                            $can_buy = "";
                        }

                        if ($select['until'] > time()) {
                            $until = date("Y-m-d\TH:i:s", $select['until']);
                        }

                        if ($select['discount_from']) {
                            $discount_from = date("Y-m-d\TH:i:s", $select['discount_from']);
                        } else {
                            $until = date("Y-m-d\TH:i:s", time() + 86400);
                        }

                        $in_diamonds[$select['diamonds']] = "checked";

                        $check = $db->query("SELECT * FROM shop_category");
                        if ($db->num_rows($check)) {
                            while ($get = $db->get_row($check)) {
                                if (strpos($select['category'], "|{$get['id']}|") === false) {
                                    $cats .= "<div><label><input type='checkbox' name='c_{$get['id']}' data-id='edit_category'> {$get['catname']}</label></div>";
                                } else {
                                    $cats .= "<div><label><input type='checkbox' name='c_{$get['id']}' checked data-id='edit_category'> {$get['catname']}</label></div>";
                                }

                            }
                        }

                        echo "
								<div id='itemSh' class='uk-modal uk-form'>
								    <div class='uk-modal-dialog' style='width: 500px'>
								        <b>НАСТРОЙКИ ТОВАРА #{$select['id']}</b>
								        <div class='modal_content'>
								        	<div>
										    	<table class='uk-width-1-1 uk-table uk-table-striped'>
													<tr>
														<td>Название товара</td>
														<td><input type='text' class='uk-width-1-1' data-settings='itemname' value='{$select['itemname']}'></td>
													</tr>
													<tr>
														<td>URL иконки</td>
														<td><input type='text' class='uk-width-1-1' data-settings='icon' value='{$select['icon']}'></td>
													</tr>
													<tr>
														<td>Оплата принимается в</td>
														<td><label><input type='radio' value='1' name='diamonds' {$in_diamonds[1]}> В Алмазах</label><br/><input {$in_diamonds[0]} type='radio' value='0' name='diamonds'> В Рублях</label></td>
													</tr>
													<tr>
														<td>Стоимость, количество, ID</td>
														<td><input type='text' class='uk-width-1-3' data-settings='price' value='{$select['price']}'><input type='text' class='uk-width-1-3' data-settings='stack' value='{$select['stack']}'><input type='text' class='uk-width-1-3' data-settings='itemid' value='{$select['itemid']}'></td>
													</tr>
													<tr>
														<td colspan='2'><label><input type='checkbox' $canen data-settings='canen'> Этот товар можно зачаровать самостоятельно</label></td>
													</tr>
													<tr>
														<td colspan='2'><label><input type='checkbox' $can_buy data-settings='can_buy'> Этот товар НЕ снят с продажи</label></td>
													</tr>
													<tr>
														<td colspan='2' align='right'><button type='button' class='uk-button uk-width-1-1' id='saveButton_one' data-id='{$select['id']}'>Сохранить настройки</button></td>
													</tr>
												</table>
												<hr style='opacity: 0.4'/>
												<b>УПРАВЛЕНИЕ КАТЕГОРИЯМИ</b>
												<table class='uk-width-1-1'>
													<tr>
														<td>$cats</td>
													</tr>
													<tr>
														<td><button type='button' class='uk-button uk-width-1-1' id='saveButton_four' data-id='{$select['id']}'>Сохранить категории</button></td>
													</tr>
												</table>
												<hr style='opacity: 0.4'/>
												<b>УПРАВЛЕНИЕ СКИДКОЙ ТОВАРА</b>
												<table class='uk-width-1-1 uk-table uk-table-striped'>
													<tr>
														<td><input type='text' class='uk-width-2-10' data-settings='percent' value='{$select['percent']}'><input type='datetime-local' data-uk-tooltip title='Дата ОТ (не обязательно)' class='uk-width-4-10' data-settings='discount_from' value='$discount_from'><input type='datetime-local' data-uk-tooltip title='Дата ДО (не обязательно)' class='uk-width-4-10' data-settings='until' value='$until'></td>
													</tr>
													<tr>
														<td align='right'><button type='button' class='uk-button uk-width-1-1' id='saveButton_two' data-id='{$select['id']}'>Сохранить скидку</button></td>
													</tr>
												</table>
												<hr style='opacity: 0.4'/>
												<button type='button' class='uk-button uk-width-1-1' id='removeitem' data-id='{$select['id']}'>Удалить этот товар из магазина</button>
											</div>
								        </div>
								    </div>
								</div>
							";
                    }
                }
            } else if ($action == "a_save_1") {
                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
                    $itemid = $db->safesql($_POST['id']);
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['id']) {
                        $canen = $db->safesql($_POST['canen']);
                        $itemname = $db->safesql($_POST['itemname']);
                        $stack = $db->safesql($_POST['stack']);
                        $price = $db->safesql($_POST['price']);
                        $icon = $db->safesql($_POST['icon']);
                        $can_buy = $db->safesql($_POST['can_buy']);
                        $blockid = $db->safesql($_POST['itemid']);
                        if ($_POST['diamonds']) {
                            $in_diamonds = 1;
                        } else {
                            $in_diamonds = 0;
                        }

                        $db->query("UPDATE shop_items SET itemname='$itemname', stack='$stack', price='$price', itemid='$blockid', icon='$icon', canen='$canen', can_buy='$can_buy', diamonds='$in_diamonds' WHERE id='$itemid'");
                        echo json_encode(array('status' => 1, 'text' => "Настройки товара успешно обновлены.", 'id' => $itemid));
                    }
                }
            } else if ($action == "a_save_2") {
                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
                    $itemid = $db->safesql($_POST['id']);
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['id']) {
                        $percent = $db->safesql($_POST['percent']);
                        $until = getUnixTime($db->safesql($_POST['until']));
                        if (!$_POST['discount_from']) {
                            $discount_from = 0;
                        } else {
                            $discount_from = getUnixTime($db->safesql($_POST['discount_from']));
                        }

                        if ($percent < 0 || $percent >= 100) {
                            echo json_encode(array('status' => 0, 'text' => 'Процент может быть от 0 до 99', 'id' => $itemid));
                        } else if ($until < time() + 3600 && $percent) {
                            echo json_encode(array('status' => 0, 'text' => 'Минимальная разница окончания скидки - час от текущей даты', 'id' => $itemid));
                        } else {
                            $db->query("UPDATE shop_items SET until='$until', percent='$percent', discount_from='$discount_from' WHERE id='$itemid'");
                            echo json_encode(array('status' => 1, 'text' => "Настройки скидки для этого товара успешно обновлены.", 'id' => $itemid));
                        }
                    }
                }
            } else if ($action == "a_save_4") {
                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
                    $itemid = $db->safesql($_POST['id']);
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['id']) {
                        $categoryes = $db->safesql($_POST['categorys']);
                        $explode = explode(" ", $categoryes);
                        $cats = "";
                        for ($i = 0; $i < count($explode); $i++) {
                            if (!strlen($explode[$i])) {
                                continue;
                            }

                            $id = str_replace("c_", "", $explode[$i]);
                            $cats .= "|$id|";
                        }
                        if ($cats) {
                            echo json_encode(array('status' => 1, 'text' => "Категории для этого товара сохранены", 'id' => $itemid));
                            $db->query("UPDATE shop_items SET category='$cats' WHERE id='$itemid'");
                        } else {
                            echo json_encode(array('status' => 0, 'text' => "Необходимо указать как минимум одну категорию", 'id' => $itemid));
                        }

                    }
                }
            } else if ($action == "a_save_3") {
                if ($member_id['user_group'] == 1 || isCan($member_id['uuid'], "mladmin")) {
                    $itemid = $db->safesql($_POST['id']);
                    $select = $db->super_query("SELECT * FROM shop_items WHERE id='$itemid'");
                    if ($select['id']) {
                        $db->query("DELETE FROM shop_items WHERE id='$itemid'");
                        echo json_encode(array('status' => 1, 'text' => "Товар успешно удален из магазина.", 'id' => $itemid));
                    } else {
                        echo json_encode(array('status' => 0, 'text' => "Товар уже удален.", 'id' => $itemid));
                    }

                }
            }
        } else {
            echo json_encode(array('status' => 1, 'text' => 'Ошибка авторизации на сервере paradisecloud.ru, обновите страницу', 'id' => $itemid));
        }

    } else {
        echo json_encode(array('status' => 1, 'text' => 'Ошибка авторизации на сервере paradisecloud.ru, обновите страницу'));
    }

}
die();
