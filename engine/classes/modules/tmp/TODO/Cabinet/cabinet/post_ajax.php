<?php
session_start();
header('Content-Type: application/json');
if (!defined("FOXXEY")) {
    die();
}

require_once $_SERVER['DOCUMENT_ROOT'] . "/engine/classes/minecraft.rcon.php";

use Thedudeguy\Rcon;

if ($member_id['name']) {
    $action = $db->safesql($_POST['action']);
    $player = $db->safesql($_POST['player']);
    $hash = $db->safesql($_POST['hash']);
    $uuidHash = $db->safesql($_POST['uuidHash']);
    $playeruuid = $db->safesql($_POST['uuid']);
    $mhash = md5($member_id['uuid'] . $member_id['name'] . $member_id['uuid']);
    if (strcmp($member_id['uuid'], $playeruuid) == 0 && strcmp($mhash, $uuidHash) == 0) {
        if (strcmp($member_id['name'], $player) == 0 && strcmp(md5($member_id['password'] . $member_id['name']), $hash) == 0) {
            if ($action == "skinchange") {
                $imageinfo = getimagesize($_FILES['upfile']['tmp_name']);
                $explode = explode(".", $_FILES['upfile']['name']);
                if (count($_FILES) != 1) {
                    echo json_encode(array('status' => 0, 'text' => "Вы можете загрузить только один скин."));
                } else if (exif_imagetype($_FILES['upfile']['tmp_name']) != IMAGETYPE_PNG) {
                    echo json_encode(array('status' => 0, 'text' => "Скин должен быть формата .png"));
                } else if ($imageinfo['mime'] != 'image/png') {
                    echo json_encode(array('status' => 0, 'text' => "Скин должен быть формата .png"));
                } else if ($_FILES['upfile']['type'] != 'image/png') {
                    echo json_encode(array('status' => 0, 'text' => "Скин должен быть формата .png"));
                } else if ($explode[count($explode) - 1] != "png") {
                    echo json_encode(array('status' => 0, 'text' => "Скин должен быть формата .png"));
                } else if ($_FILES['upfile']['size'] > 50000 && !HDSkin($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Размер скина не должен превышать 50кб и размер до 64*64.", 'offerHD' => true));
                } else if ($_FILES['upfile']['size'] > 2000000 && HDSkin($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Размер скина не должен превышать 2мб."));
                } else if ($imageinfo['mime'] != 'image/png') {
                    echo json_encode(array('status' => 0, 'text' => "Скин должен быть формата .png"));
                } else if (((int) $imageinfo["0"] > 64 || (int) $imageinfo["1"] > 64) && !HDSkin($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Размер скина должен быть 64. HD скины могут загружать только владельцы Золотого и Алмазного аккаунтов.", 'offerHD' => true));
                } else if (($imageinfo["0"] > 2048 || $imageinfo["1"] > 1024 || $imageinfo["0"] < 64 || $imageinfo["1"] < 32) && HDSkin($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Максимальный размер HD скина должен быть 2048x1024, минимальный 64х32."));
                } else {
                    $is_hd = 0;
                    if ($imageinfo["0"] > 64 && $imageinfo["1"] > 32) {
                        $is_hd = 1;
                    }

                    if (is_uploaded_file($_FILES["upfile"]["tmp_name"])) {
                        imagecreatetruecolor();
                        $imageFILE = @imagecreatefrompng($_FILES['upfile']['tmp_name']);
                        $background = imagecolorallocate($imageFILE, 0, 0, 0);
                        imagecolortransparent($imageFILE, $background);
                        imagealphablending($imageFILE, false);
                        imagesavealpha($imageFILE, true);
                        if (!$imageFILE) {
                            echo json_encode(array('status' => 0, 'text' => "Загрузка неудалась, попробуйте снова."));
                        } else {
                            $db->query("UPDATE dle_users SET is_hd_skin='$is_hd' WHERE name='{$member_id['name']}'");
                            $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/uploads/skins/{$member_id['name']}.png";
                            unlink($uploadfile);
                            imagepng($imageFILE, $uploadfile);
                            $random = rand(100000000, 999999999);
                            echo json_encode(array('status' => 1, 'text' => 'Ваш скин успешно изменен.', 'skin_1' => "$DURL/skin-7-$username?i=$random", 'skin_2' => "$DURL/skin-8-$username?i=$random", 'Cape_1' => "$DURL/skin-1-$username?i=$random", 'Cape_2' => "$DURL/skin-2-$username?i=$random"));
                        }
                        imagedestroy($imageFILE);
                    }
                }
            } else if ($action == 'unban') {
                if ($member_id['name']) {
                    global $db;
                    $ban = $db->super_query("SELECT * FROM litebans_bans WHERE uuid='{$member_id['uuid']}' AND until='-1' AND active=1 OR uuid='{$member_id['uuid']}' AND until>'" . time() . "000' AND active=1 LIMIT 1");
                    if ($ban['banned_by_name']) {
                        if (strpos($ban['reason'], '@') === false) {
                            if ($ban['until'] == -1) {
                                $unbanPrice = 149;
                                $unbanPlus = 59;
                                $type = "перманент";
                            } else {
                                $unbanPrice = 119;
                                $unbanPlus = 39;
                                $type = "временный";
                            }
                            $price = round($unbanPrice + ($member_id['unbans'] * $unbanPlus), 2);
                            if ($member_id['cash'] >= $price) {
                                $db->query("UPDATE dle_users SET cash=cash-$price, unbans=unbans+1 WHERE uuid='{$member_id['uuid']}'");
                                $member_id['unbans']++;
                                addLog($member_id['uuid'], -$price, "Разблокировка аккаунта ($type / {$member_id['unbans']} раз)", 6);
                                $db->query("DELETE FROM litebans_bans WHERE uuid='{$member_id['uuid']}'");
                                echo json_encode(array('status' => 1, 'text' => "<i class='uk-icon-check'></i> Вы успшно разблокированы! Поздравляем!"));
                            } else {
                                echo json_encode(array('status' => 0, 'text' => "К сожалению на вашем балансе недостаточно средств"));
                            }

                        } else {
                            echo json_encode(array('status' => 0, 'text' => "Модератор/администратор, заблокировавший вас, запретил вам приобретать разблокировку аккаунта."));
                        }

                    } else {
                        echo json_encode(array('status' => 0, 'text' => "Вы не заблокированы, повезло"));
                    }

                }
            } else if ($action == 'gospawn') {
                $serverid = $db->safesql($_POST['server']);
                if ($member_id['last_gospawn'] < time()) {
                    if (is_numeric($serverid) && $serverid > 0) {
                        foreach ($_servers as $server) {
                            if ($server['id'] == $serverid) {
                                $vser = $server;
                            }
                        }
                        $rcon = new Rcon($vser['ip'], $vser['portrc'], $vser['password'], '3');
                        if ($rcon->connect()) {
                            $rcon->sendCommand("otpspawn {$member_id['name']}");
                            $rcon->sendCommand("spawn {$member_id['name']}");
                            echo json_encode(array('status' => 1, 'text' => "Вы были успешно телепортированы на спавн сервера {$vser['name']}. Приятной игры!"));
                            $time = time() + 10 * 60;
                            $db->query("UPDATE dle_users SET last_gospawn='$time' WHERE name='{$member_id['name']}'");
                        } else {
                            echo json_encode(array('status' => 0, 'text' => "Сервер {$vser['name']} выключен. Попробуйте позже."));
                        }

                    } else {
                        echo json_encode(array('status' => 0, 'text' => "Внутренняя ошибка. Пожалуйста, сообщите о ней. <br> Номер ошибки #gs2.1"));
                    }

                } else {
                    echo json_encode(array('status' => 0, 'text' => "Вы слишком часто используете эту способность, попробуйте через 10 минут."));
                }

            } else if ($action == 'exchangertod') {
                $serverid = $db->safesql($_POST['serverid']);
                $rub = $db->safesql($_POST['rub']);
                $dmd = $rub * 2;
                foreach ($_servers as $sver) {
                    if ($sver['id'] == $serverid) {
                        $name = $sver;
                    }

                }
                if (is_numeric($serverid) && is_numeric($rub) && $serverid > 0 && $rub > 0) {
                    if ($member_id['cash'] >= $rub) {
                        $req = $db->query("SELECT * FROM information_schema.tables WHERE table_schema = 'quasar3150_shads' AND table_name = '{$name['iconomy']}' LIMIT 1");
                        if ($db->num_rows($req)) {
                            $select = $db->query("SELECT * FROM {$name['iconomy']} WHERE username = '{$member_id['name']}'");
                            if ($db->num_rows($select)) {
                                $db->query("UPDATE {$name['iconomy']} SET balance=balance+$dmd WHERE username = '{$member_id['name']}'");
                            } else {
                                $db->query("INSERT INTO {$name['iconomy']} VALUES (NULL, '{$member_id['name']}', '$dmd', '0')");
                            }

                            $db->query("UPDATE dle_users SET cash=cash-$rub WHERE name = '{$member_id['name']}'");
                            addLog($member_id['uuid'], -$rub, "[{$name['name']}] Купил $dmd алм. за $rub руб.", 16);
                            echo json_encode(array('status' => 1, 'text' => "$dmd <i class='uk-icon-diamond'></i> за $rub <i class='uk-icon-rub'></i> успешно куплены на сервер {$name['name']}", 'balance' => $member_id['cash'], 'diamond' => $member_id['diamonds']));
                        } else {
                            echo json_encode(array('status' => 0, 'text' => "Произошла ошибка. Пожалуйста, отправьте её администрации. Код ошибки #ex1"));
                        }

                    } else {
                        $sum = $rub - $member_id['cash'];
                        echo json_encode(array('status' => 0, 'text' => "<i class='uk-icon-warning'></i> Недостаточно денег на балансе, не хватает $sum <i class='uk-icon-rub'></i>"));
                    }
                } else {
                    echo json_encode(array('status' => 0, 'text' => "<i class='uk-icon-warning'></i> Неверно указано количество для обмена или не выбран сервер."));
                }

            } else if ($action == 'transferemeralds') {
                $serverid = $db->safesql($_POST['serverid']);
                $emeralds = $db->safesql($_POST['emeralds']);
                foreach ($_servers as $sver) {
                    if ($sver['id'] == $serverid) {
                        $name = $sver;
                    }

                }
                if (is_numeric($serverid) && is_numeric($emeralds) && $serverid > 0) {
                    if ($member_id['diamonds'] >= $emeralds) {
                        $req = $db->query("SELECT * FROM information_schema.tables WHERE table_schema = 'quasar3150_shads' AND table_name = '{$name['iconomy']}' LIMIT 1");
                        if ($db->num_rows($req)) {
                            $select = $db->query("SELECT * FROM {$name['iconomy']} WHERE username = '{$member_id['name']}'");
                            if ($db->num_rows($select)) {
                                $db->query("UPDATE {$name['iconomy']} SET balance=balance+$emeralds WHERE username = '{$member_id['name']}'");
                            } else {
                                $db->query("INSERT INTO {$name['iconomy']} VALUES (NULL, '{$member_id['name']}', '$emeralds', '0')");
                            }

                            $db->query("UPDATE dle_users SET diamonds=diamonds-$emeralds WHERE name = '{$member_id['name']}'");
                            addLog($member_id['uuid'], 0, "[{$name['name']}] Перевод $emeralds алм. на сервер", 15);
                            echo json_encode(array('status' => 1, 'text' => "$emeralds <i class='uk-icon-diamond'></i> успешно переведены на сервер {$name['name']}", 'balance' => $member_id['cash'], 'diamond' => $member_id['diamonds']));
                        } else {
                            echo json_encode(array('status' => 0, 'text' => "Произошла ошибка. Пожалуйста, отправьте её администрации. Код ошибки #te1"));
                        }

                    } else {
                        $sum = $emeralds - $member_id['diamonds'];
                        echo json_encode(array('status' => 0, 'text' => "<i class='uk-icon-warning'></i> Недостаточно алмазов на балансе, не хватает $sum <i class='uk-icon-diamond'></i>"));
                    }
                } else {
                    echo json_encode(array('status' => 0, 'text' => "<i class='uk-icon-warning'></i> Неверно указано количество алмазов для перевода или не выбран сервер."));
                }

            } else if ($action == "buyhd") {
                if ($member_id['hd_can'] < time() && !isCan($member_id['uuid'], 'gold') && !isCan($member_id['uuid'], 'diamond')) {
                    $period = $_POST['period'];
                    $summa = 0;
                    if (strcmp($period, '31day') == 0) {
                        $summa = 99;
                    } else if (strcmp($period, 'always') == 0) {
                        $summa = 189;
                    }

                    if ($summa >= 99) {
                        if ($member_id['cash'] >= $summa) {
                            $db->query("UPDATE dle_users SET cash=cash-$summa WHERE name='{$member_id['name']}'");
                            $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
                            $skin_info = returnNotifer("У вас есть возможность установить себе HD скин с разрешением от 64х32 до 2048x1024", 'check', '', 'margin-top: 10px;');
                            $cape_info = returnNotifer("У вас есть возможность установить себе HD плащ с разрешением от 64х32 до 2048x1024", 'check', '', 'margin-top: 10px;');
                            if (strcmp($period, '31day') == 0) {
                                $until = time() + (31 * 86400);
                                $db->query("UPDATE dle_users SET hd_can='$until', hd_forever='0' WHERE name='{$member_id['name']}'");
                                addLog($member_id['uuid'], -$summa, "Купил возможность устанавливать HD скин до " . date("d.m.Y H:i", $until), 8);
                                echo json_encode(array('status' => 1, 'text' => "Вы успешно приобрели возможность устанавливать HD скин до " . date("d.m.Y H:i", $until), 'balance' => $member_id['cash'], 'skin_info' => $skin_info));
                            } else {
                                $until = time() + (31 * 86400);
                                $db->query("UPDATE dle_users SET hd_can='$until', hd_forever='1' WHERE name='{$member_id['name']}'");
                                addLog($member_id['uuid'], -$summa, "Купил возможность устанавливать HD  скин/плащ (навсегда)", 8);
                                echo json_encode(array('status' => 1, 'text' => "Вы успешно приобрели возможность устанавливать HD скин и плащ (навсегда)", 'balance' => $member_id['cash'], 'skin_info' => $skin_info, 'cape_info' => $cape_info));
                            }
                        } else {
                            echo json_encode(array('status' => 0, 'text' => "К сожалению на вашем балансе нет необходимой суммы. Пополните баланс и повторите попытку."));
                        }

                    } else {
                        echo json_encode(array('status' => 0, 'text' => "Ошибка. Обновите страницу и повторите попытку загрузить HD скин."));
                    }

                }
            } else if ($action == "offerhd") {
                if ($member_id['hd_can'] < time() && !isCan($member_id['uuid'], 'gold') && !isCan($member_id['uuid'], 'diamond')) {
                    header('Content-Type: text/html');
                    echo "
							<div id='offerhd' class='uk-modal'>
							    <div class='uk-modal-dialog'>
							    	<center><b>У НАС ЕСТЬ ДЛЯ ВАС ПРЕДЛОЖЕНИЕ!</b></center>
							    	<table class='uk-width-1-1'>
							    		<tr>
							    			<td width='160px'><img src='$DURL/uploads/posts/hdskin_promo.png' style='margin-left: -7px;margin-top: 15px;'></td>
							    			<td valign='top'>
							    				<br/>К сожалению, вы не можете устанавливать себе <b>HD скин</b>.<br>Но у нас есть для вас отличное предложение!<br/><br/>Хотите себе красивенький <b>HD скин</b>?<br/><b>HD скин</b> - скин высокой четкости и детальной прорисовки. Примерно такой же, как на рисунке слева.<br/><br/>Мы предлагаем вам приобрести возможность устанавливать себе <b>HD скин</b> <u>в любое время и без прокачки своего аккаунта</u> до Золотого или <b>Алмазного</b>.

							    			</td>
							    		</tr>
							    	</table>

							    	<table style='margin-top: 30px' class='uk-width-1-1 uk-table uk-table-striped'>
							    		<tr>
							    			<td><div style='margin-top: 5px'>Возможность изменять свой скин на HD в течение 31 дня</div></td>
							    			<td align='right'><div style='margin-top: 5px'><b>99 руб.</b></div></td>
							    			<td align='right' width='75px'><button type='button' class='uk-button uk-width-1-1 buyhd' data-id='31day'>Купить</button></td>
							    		</tr>
							    		<tr>
							    			<td><div style='margin-top: 5px'>Возможность изменять свой скин/<b><abbr data-uk-tooltip title='Дополнительный бонус'>плащ</abbr></b> на HD (<b><u>навсегда</u></b>)</div></td>
							    			<td align='right'><div style='margin-top: 5px'><div class='old_price'>389</div> <b>189 руб.</b></div></td>
							    			<td align='right' width='75px'><button type='button' class='uk-button uk-width-1-1 buyhd' data-id='always'>Купить</button></td>
							    		</tr>
							    	</table>
							    	<div style='margin-top: 10px;font-size: 10pt; text-align: center' class='uk-text-success' id='buyhdout'></div>
							    </div>
							</div>
						";
                }
            }
            // else if ($action == "buydiamonds") {
            //     $type = $db->safesql($_POST['type']);
            //     if ($type >= 1 && $type <= 4) {
            //         if ($type == 1) $price = 15;
            //         else if ($type == 2) $price = 69;
            //         else if ($type == 3) $price = 199;
            //         else if ($type == 4) $price = 749;

            //         if ($type == 1) $diam = 1;
            //         else if ($type == 2) $diam = 5;
            //         else if ($type == 3) $diam = 15;
            //         else if ($type == 4) $diam = 100;

            //         if ($member_id['cash'] < $price) echo json_encode(array('status' => 0, 'text' => "Недостаточно средств для покупки $diam алмазов."));
            //         else {
            //             $db->query("UPDATE dle_users SET cash=cash-$price WHERE name='{$member_id['name']}'");
            //             $db->query("INSERT INTO user_actions VALUES(null, '{$member_id['uuid']}', '-$price', 'Покупка алмазов ($diam шт.)', '" . time() . "', '10')");
            //             $db->query("UPDATE dle_users SET diamonds=diamonds+$diam WHERE name='{$member_id['name']}'");
            //             echo json_encode(array('status' => 1, 'text' => "Вы успешно обменяли $price руб. на $diam алмазов.", 'balance' => $member_id['cash'], 'diamond' => $member_id['diamonds']));
            //         }
            //     } else echo json_encode(array('status' => 0, 'text' => "Произошла ошибка #1, попробуйте обновить страницу."));
            // }
            else if ($action == "buyfly") {
                $serverid = $db->safesql($_POST['serverid']);
                $sgroup = getserverGroup($member_id['uuid'], $serverid);
                if (is_numeric($serverid) && $serverid > 0) {
                    if ($sgroup['group'] == 'member' || $sgroup['group'] == 'iron' || $sgroup['group'] == 'gold') {
                        $price_fly = getParam("fly_cost");
                        if ($member_id['cash'] >= $price_fly) {
                            foreach ($_servers as $vser1) {
                                if ($vser1['id'] == $serverid) {
                                    $pex_prefix = $vser1['pex_prefix'];
                                    $server_name = $vser1['name'];
                                }
                            }
                            $select = $db->super_query("SELECT * FROM can_fly WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                            $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{$member_id['uuid']}' AND permission='essentials.fly' AND type='1'");
                            $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{$member_id['uuid']}' AND permission='essentials.fly.safelogin' AND type='1'");
                            $db->query("UPDATE dle_users SET cash=cash-$price_fly WHERE name='{$member_id['name']}'");
                            $member_id = $db->super_query("SELECT * FROM dle_users WHERE name='{$member_id['name']}'");
                            if ($select['id']) {
                                $more = 86400 * 31;
                                $db->query("UPDATE can_fly SET until=until+$more WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                                $select = $db->super_query("SELECT * FROM can_fly WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                                $fly_text = "<div class='uk-text-success'>Ваша возможность летать на сервере <b>$server_name</b> закончится через <b>" . showDateDo($select['until']) . "</b></div>";
                                echo json_encode(array('status' => 1, 'text' => "Вы успешно продлили возможность летать на сервере $server_name еще на 31 день! Наслаждайтесь!", 'fly_text' => $fly_text, 'buyfly' => "Продлить возможность летать на <b>31 день</b> на сервере <b>$server_name</b> за <b>$price_fly рублей</b>", 'balance' => $member_id['cash']));
                                addLog($member_id['uuid'], -$price_fly, "[$server_name] Продлил FLY до " . date("d.m.Y H:i", $select['until'] + $more), 4);
                            } else {
                                $until = time() + (86400 * 31);
                                $db->query("INSERT INTO `can_fly` (`id`, `uuid`, `time`, `until`, `serverid`) VALUES (NULL, '{$member_id['uuid']}', '" . time() . "', '$until', '$serverid')");
                                $select = $db->super_query("SELECT * FROM can_fly WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                                $fly_text = "<div class='uk-text-success'>Ваша возможность летать на сервере <b>$server_name</b> закончится через <b>" . showDateDo($select['until']) . "</b></div>";
                                echo json_encode(array('status' => 1, 'text' => "Поздравляем! Теперь перезайдите в игру и чтобы полететь введите команду /fly", 'fly_text' => $fly_text, 'buyfly' => "Продлить возможность летать на сервере $server_name на 31 день за <b>$price_fly рублей</b>", 'balance' => $member_id['cash']));
                                addLog($member_id['uuid'], -$price_fly, "[$server_name] Приобрел FLY до " . date("d.m.Y H:i", $select['until'] + $more), 4);
                            }
                            $db->query("INSERT INTO `{$pex_prefix}permissions` (`id`, `name`, `type`, `permission`, `world`, `value`) VALUES (NULL, '{$member_id['uuid']}', '1', 'essentials.fly', '', '')");
                            $db->query("INSERT INTO `{$pex_prefix}permissions` (`id`, `name`, `type`, `permission`, `world`, `value`) VALUES (NULL, '{$member_id['uuid']}', '1', 'essentials.fly.safelogin', '', '')");
                        } else {
                            echo json_encode(array('status' => 0, 'text' => "К сожалению на вашем балансе нет достаточной суммы денег. Пополните свой баланс и повторите попытку."));
                        }

                    } else {
                        echo json_encode(array('status' => 0, 'text' => "К сожалению вы не можете приобрести себе возможность летать"));
                    }

                } else {
                    echo json_encode(array('status' => 0, 'text' => "Пожалуйста, выберете сервер!"));
                }

            } else if ($action == "capechange") {
                $imageinfo = getimagesize($_FILES['upfile']['tmp_name']);
                $explode = explode(".", $_FILES['upfile']['name']);
                if (count($_FILES) != 1) {
                    echo json_encode(array('status' => 0, 'text' => "Вы можете загрузить только один плащ."));
                } else if (exif_imagetype($_FILES['upfile']['tmp_name']) != IMAGETYPE_PNG) {
                    echo json_encode(array('status' => 0, 'text' => "Плащ должен быть формата .png"));
                } else if ($imageinfo['mime'] != 'image/png') {
                    echo json_encode(array('status' => 0, 'text' => "Плащ должен быть формата .png"));
                } else if ($_FILES['upfile']['type'] != 'image/png') {
                    echo json_encode(array('status' => 0, 'text' => "Плащ должен быть формата .png"));
                } else if ($explode[count($explode) - 1] != "png") {
                    echo json_encode(array('status' => 0, 'text' => "Плащ должен быть формата .png"));
                } else if ($_FILES['upfile']['size'] > 50000 && !HDCape($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Размер плаща не должен превышать 50кб и размер 64*32."));
                } else if ($_FILES['upfile']['size'] > 2000000 && HDCape($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Размер плаща не должен превышать 2мб."));
                } else if ($imageinfo['mime'] != 'image/png') {
                    echo json_encode(array('status' => 0, 'text' => "Плащ должен быть формата .png"));
                } else if (($imageinfo["0"] != '64' || $imageinfo["1"] != '32') && !HDCape($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Размер плаща должен быть 64х32.<br/>HD плащи могут загружать только владельцы Железного, Золотого и Алмазного аккаунтов."));
                } else if (($imageinfo["0"] > 2048 || $imageinfo["1"] > 1024 || $imageinfo["0"] < 64 || $imageinfo["1"] < 32) && HDCape($member_id['uuid'])) {
                    echo json_encode(array('status' => 0, 'text' => "Максимальный размер HD плаща должен быть 2048x1024, минимальный 64х32."));
                } else {
                    $is_hd = 0;
                    if ($imageinfo["0"] > 64 && $imageinfo["1"] > 32) {
                        $is_hd = 1;
                    }

                    if (is_uploaded_file($_FILES["upfile"]["tmp_name"])) {
                        imagecreatetruecolor();
                        $imageFILE = @imagecreatefrompng($_FILES['upfile']['tmp_name']);
                        $background = imagecolorallocate($imageFILE, 0, 0, 0);
                        imagecolortransparent($imageFILE, $background);
                        imagealphablending($imageFILE, false);
                        imagesavealpha($imageFILE, true);
                        if (!$imageFILE) {
                            echo json_encode(array('status' => 0, 'text' => "Загрузка неудалась, попробуйте снова."));
                        } else {
                            $db->query("UPDATE dle_users SET is_hd_cape='$is_hd' WHERE name='{$member_id['name']}'");
                            $uploadfile = $_SERVER['DOCUMENT_ROOT'] . "/uploads/capes/{$member_id['name']}.png";
                            unlink($uploadfile);
                            imagepng($imageFILE, $uploadfile);
                            $random = rand(100000000, 999999999);
                            echo json_encode(array('status' => 1, 'text' => 'Ваш плащ успешно установлен.', 'Cape_1' => "$DURL/skin-2-$username?i=$random", 'Cape_2' => "$DURL/skin-1-$username?i=$random"));
                        }
                        imagedestroy($imageFILE);
                    }
                }
            } else if ($action == 'delskin') {
                $random = rand(100000000, 999999999);
                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/uploads/skins/{$member_id['name']}.png")) {
                    unlink($_SERVER['DOCUMENT_ROOT'] . "/uploads/skins/{$member_id['name']}.png");
                }

                echo json_encode(array('status' => 1, 'text' => "Теперь у вас стандартный скин.", 'haveSkin' => 0, 'skin_1' => "$DURL/skin-7-$username?i=$random", 'skin_2' => "$DURL/skin-8-$username?i=$random", 'Cape_1' => "$DURL/skin-1-$username?i=$random", 'Cape_2' => "$DURL/skin-2-$username?i=$random"));
            } else if ($action == 'delCape') {
                $random = rand(100000000, 999999999);
                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/uploads/capes/{$member_id['name']}.png")) {
                    unlink($_SERVER['DOCUMENT_ROOT'] . "/uploads/capes/{$member_id['name']}.png");
                }

                echo json_encode(array('status' => 1, 'text' => "Теперь у вас нет плаща.", 'haveCape' => 0, 'Cape_1' => "$DURL/skin-2-$username?i=$random", 'Cape_2' => "$DURL/skin-1-$username?i=$random"));
            } else if ($action == "changepass") {
                if (!$member_id['last_password_change'] || time() - $member_id['last_password_change'] > 86400 || $member_id['user_group'] == 1) {
                    $newpass = $db->safesql(trim($_POST['newpassword']));
                    if (mb_strlen($newpass, 'utf-8') < 6) {
                        echo json_encode(array('status' => 0, 'text' => "В целях безопасности вашего аккаунта, пароль должен состоять минимум из 6 символов."));
                    } else if (mb_strlen($newpass, 'utf-8') > 128) {
                        echo json_encode(array('status' => 0, 'text' => "В целях безопасности вашего аккаунта, пароль должен состоять максимум из 128 символов."));
                    } else {
                        echo json_encode(array('status' => 1, 'text' => "<div style='margin-bottom: 7px'><b>ТРЕБУЕТСЯ ВАШЕ ПОДТВЕРЖДЕНИЕ</b></div>Вам необходимо указать свой <b>текущий</b> пароль от аккаунта.<br/><br/>Внимание!<br/>Если вы сейчас укажите неверный пароль, вы автоматически выйдите из аккаунта.
								<table class='uk-width-1-1 uk-table uk-table-striped uk-form'>
									<tr>
										<td width='300px'>Укажите свой текущий пароль<div class='uk-text-small'>Внимательно!</div></td>
										<td>
											<div class='uk-form-password'>
												<input type='password' class='uk-width-1-1' placeholder='Текущий пароль' autocomplete='off'  data-type='currentpass' id='currentpass'>
												<a href='' class='uk-form-password-toggle' data-uk-form-password><i class='uk-icon-eye'></i></a>
											</div>
										</td>
									</tr>
								</table>
							", ));
                    }
                } else {
                    echo json_encode(array('status' => 0, 'text' => "Вы можете менять пароль от аккаунта чаще чем раз в сутки."));
                }

            } else if ($action == "changepass2") {
                if (!$member_id['last_password_change'] || time() - $member_id['last_password_change'] > 86400 || $member_id['user_group'] == 1) {
                    $newpass = $db->safesql(trim($_POST['newpassword']));
                    $newpass = str_replace(' ', '', $newpass);
                    $currentpass = $db->safesql(trim($_POST['currentpass']));
                    if (mb_strlen($newpass, 'utf-8') < 6) {
                        echo json_encode(array('status' => 0, 'text' => "В целях безопасности вашего аккаунта, пароль должен состоять минимум из 6 символов."));
                    } else if (mb_strlen($newpass, 'utf-8') > 128) {
                        echo json_encode(array('status' => 0, 'text' => "В целях безопасности вашего аккаунта, пароль должен состоять максимум из 128 символов."));
                    } else if (strcmp(md5(md5($currentpass)), $member_id['password']) !== 0) {
                        echo json_encode(array('status' => 0, 'text' => "Указанный вами пароль не соответствует текущему паролю аккаунта <b>{$member_id['name']}</b><br/>Вы автоматически вышли из аккаунта. Повторите авторизацию."));
                        deleteAllCookies();
                        set_cookie("dle_password", "", -3600);
                        set_cookie("dle_hash", "", -3600);
                        die();
                    } else {
                        $regPassword = md5(md5($newpass));
                        $hashPassword = md5($newpass);
                        $db->query("UPDATE dle_users SET password='$regPassword' WHERE name='{$member_id['name']}'");
                        if (function_exists('openssl_random_pseudo_bytes')) {
                            $stronghash = md5(openssl_random_pseudo_bytes(15));
                        } else {
                            $stronghash = md5(uniqid(mt_rand(), true));
                        }

                        $salt = sha1(str_shuffle("abcdefghjkmnpqrstuvwxyz0123456789") . $stronghash);
                        $hash = '';
                        for ($i = 0; $i < 9; $i++) {
                            $hash .= $salt{
                                mt_rand(0, 39)};
                        }
                        $hash = md5($hash);
                        $db->query("UPDATE dle_users set hash='$hash', last_password_change='" . time() . "' WHERE user_id='{$member_id['user_id']}'");
                        set_cookie("dle_password", $hashPassword, 365);
                        set_cookie("dle_hash", $hash, 365);
                        $_COOKIE['dle_hash'] = $hash;

                        include $_SERVER['DOCUMENT_ROOT'] . "/engine/classes/mail.class.php";
                        include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/config.php";
                        $sendmail = new dle_mail($config);

                        $message = "
								Здравствуйте, {$member_id['name']}!<br><br/>
								Вы успешно изменили свой пароль от аккаунта!<br/>
								Ваши новые регистрационные данные:<br/><br/>
								Имя аккаунта: <b>{$member_id['name']}</b><br/>
								Пароль: <b>$newpass</b><br/><br/>
								Желаем вам приятной игры.<br/>
								С уважением, команда ParadiseCloud.ru!
							";
                        $sendmail = new dle_mail($config);
                        $sendmail->send($member_id['email'], "Изменение пароля на ParadiseCloud.ru", $message);
                        echo json_encode(array('status' => 1, 'text' => "Ваш пароль успешно изменен.<br/>Теперь вам необходимо перезайти в свой аккаунт.<br/>На ваш Email отправлено письмо с новыми регистрационными данными."));
                    }
                } else {
                    echo json_encode(array('status' => 0, 'text' => "Вы можете менять пароль от аккаунта не чаще чем раз в сутки."));
                }

            } else if ($action == 'ask') {
                $serverid = $db->safesql($_POST['serverid']);
                $want_group = $db->safesql($_POST['pexname']);
                $user_group = getserverGroup($member_id['uuid'], $serverid);
                if ($want_group == 'stone' && ($user_group['group'] == 'iron' || $user_group['group'] == 'gold' || $user_group['group'] == 'diamond')) {
                    echo json_encode(array('status' => 0, 'text' => "Обнаружена попытка обмана системы, ваш IP/аккаунт занесен в список подозрительных."));
                    die();
                } else if (($want_group == 'store' || $want_group == 'iron') && ($user_group['group'] == 'gold' || $user_group['group'] == 'diamond')) {
                    echo json_encode(array('status' => 0, 'text' => "Обнаружена попытка обмана системы, ваш IP/аккаунт занесен в список подозрительных."));
                    die();
                } else if (($want_group == 'store' || $want_group == 'iron' || $want_group == 'gold') && $user_group['group'] == 'diamond') {
                    echo json_encode(array('status' => 0, 'text' => "Обнаружена попытка обмана системы, ваш IP/аккаунт занесен в список подозрительных."));
                    die();
                } else {
                    if (getParam($want_group . '_discount') > 0 && (getParam('until') > time() || getParam('until') == 0) && !$user_group['group']) {
                        $cost = getParam($want_group . '_discount');
                    } else {
                        $cost = getParam($want_group . '_price');
                    }

                    $percent = round(($cost / getParam($want_group . '_price')) * 100, 1);
                    $percent = round(100 - $percent, 2);

                    if ($user_group['group']) {
                        $days = round(($user_group['until_unix'] - time()) / 60 / 60 / 24, 0);
                        if ($member_id['group_buy_cost'] > 0 && $days > 3 && $want_group != $user_group['group']) {
                            $day_summa = round($member_id['group_buy_cost'] / 30, 2);
                            $discount_summa = round($day_summa * $days, 2);
                            if ($discount_summa > $member_id['group_buy_cost']) {
                                $discount_summa = $member_id['group_buy_cost'];
                            }

                            $discount_text = "<br/><br/>Ваша скидка для прокачки своего аккаунта: <b>$discount_summa руб.</b>";
                            $cost -= $discount_summa;
                            if ($cost < 0) {
                                $cost = 0;
                            }

                        } else {
                            if ($want_group == 'diamond' && $user_group['group'] == 'diamond') {
                                $cost = $cost - ($cost * 20 / 100);
                                $discount_text = "<br/><br/>Ваша скидка для продления Алмазного аккаунта: <b>20%</b> <span class='uk-text-muted'>(Обычно 10%!)</span>";
                            } else {
                                $cost = $cost - ($cost * 10 / 100);
                                if ($want_group != $user_group['group']) {
                                    $discount_text = "<br/><br/>Ваша скидка для прокачки аккаунта: <b>10%</b>";
                                } else {
                                    $discount_text = "<br/><br/>Ваша скидка для продления возможностей своего аккаунта: <b>10%</b>";
                                }

                            }
                        }
                    } else {
                        if ($percent > 0) {
                            $discount_text = "<br/><br/>Ваша скидка для прокачки аккаунта: <b class='uk-text-danger'>$percent%</b>";
                        }

                    }

                    if ($want_group == 'stone') {
                        $groupname = "Каменного аккаунта";
                    } else if ($want_group == 'iron') {
                        $groupname = "Железного аккаунта";
                        $dopinfo = "<br/><br/>
								<div><b>Некоторые возможности Железного аккаунта:</b></div>
								<div>- Лучше Деревянного аккаунта</div>
								<div>- 4 привата</div>
								<div>- Дополнительные флаги на приват</div>
								<div>- Восстановление инвентаря</div>
								<div>- Железный набор каждый месяц</div>
								<div>- Телепорт к другим игрокам</div>
								<div>- Писать на табличке цветом</div>
								<div>- Возможность создавать варпы - 4 шт.</div><br/>
								<div class='dopinfo_align'><img src='$DURL/uploads/accs/iron_acc.png'></div>
							";
                    } else if ($want_group == 'gold') {
                        $groupname = "Золотого аккаунта";
                        $dopinfo = "<br/><br/>
								<div><b>Некоторые возможности Золотого аккаунта:</b></div>
								<div>- Лучше Железного и Деревянного аккаунта</div>
								<div>- Имеет возможности предыдущих акк.</div>
								<div>- Нельзя изменять префикс</div>
								<div>- Продление <b>на 10% дешевле</b></div>
								<div>- Возможность установить <b>HD плащ</b></div>
								<div>- Возможность установить <b>HD скин</b></div>
								<div>- Восстановление опыта после смерти</div>
								<div>- Огромное количество флагов на приват</div>
								<div>- Возможность создавать варпы - 4 шт.</div>
								<div>- Возвращение на место смерти</div>
								<div>- Мгновенная телепортация на дом/warp</div>
								<div>- Телепортация к другим игрокам</div>
								<div>- Возврат на предыдущую позицию</div>
								<div>- Восстановление инвентаря </div><br/>
								<div style='margin-top: -260px;' class='dopinfo_align'><img src='$DURL/uploads/accs/gold_acc.png'></div>
							";
                    } else if ($want_group == 'diamond') {
                        $groupname = "Алмазного аккаунта";
                        $dopinfo = "<br/><br/>
								<div><b>Некоторые возможности Алмазного аккаунта:</b></div>
								<div>- Самый лучший и функциональный тип аккаунта</div>
								<div>- Имеет возможности всех предыдущих типов аккаунтов</div>
								<div>- <b>Можно</b> изменять префикс</div>
								<div>- Продление <b>на 20% дешевле</b></div>
								<div>- Возможность установить <b>HD плащ</b></div>
								<div>- Возможность установить <b>HD скин</b></div>
								<div>- Больше всех флагов на приват!</div>
								<div>- Возможность создавать варпы - 20 шт.</div>
								<div>- Можно передать варп другому игроку</div>
								<div>- Молниеносный телепорт на дом/warp</div>
								<div>- <b>Скидка в онлайн-магазине 25%</b>!</div>
								<div><i class='uk-icon-diamond diamond-list'></i>- <b>Можно зайти на заполненный сервер!</b></div>
								<div><img style='position: absolute;margin-left: -8px;margin-top: -2px;' src='$DURL/uploads/shopimg/need/bat.png' width='13px'>- <b>Есть возможность летать (/fly)!</b></div>
								<div>- <a href='$DURL/donate' target='_blank'><i>И многое-многое другое..</i></a></div><br/>
								<div style='margin-top: -270px;' class='dopinfo_align'><img src='$DURL/uploads/accs/diamond_acc.png'></div>
							";
                    }

                    $costHash = md5(sha1($member_id['name'] . $cost) . $member_id['password'] . $cost . $want_group . $serverid);
                    if ($user_group['group'] == $want_group) {
                        echo json_encode(array('serverid' => $serverid, 'status' => 1, 'word' => 'Продлить', 'group' => $want_group, 'summa' => $cost, 'hash' => $costHash, 'text' => "<div style='margin-bottom: 7px;'><b>ТРЕБУЕТСЯ ВАШЕ ПОДТВЕРЖДЕНИЕ</b></div>Вы действительно хотите продлить возможности своего аккаунта на 30 дн?<br/>Для завершения вам нужно заплатить <b class='uk-text-primary'>$cost руб.</b>$discount_text"));
                    } else {
                        echo json_encode(array('serverid' => $serverid, 'status' => 1, 'word' => 'Вступить', 'summa' => $cost, 'group' => $want_group, 'hash' => $costHash, 'text' => "<div style='margin-bottom: 7px;min-height: 250px;'><b>ТРЕБУЕТСЯ ВАШЕ ПОДТВЕРЖДЕНИЕ</b>$dopinfo</div>Вы действительно хотите прокачать свой аккаунт до <b>$groupname</b> на 30 дн?<br/>Для завершения вам нужно заплатить <b class='uk-text-primary'>$cost руб.</b>$discount_text"));
                    }

                }
            } else if ($action == "buygroup") {
                // header('Content-Type: text/html');
                $serverid = $_POST['dop']['serverid'];
                $dopInfo = $_POST['dop'];
                if (is_numeric($serverid) && $serverid > 0) {
                    $user_group = getserverGroup($member_id['uuid'], $serverid);
                    if (strcmp(md5(sha1($member_id['name'] . $dopInfo['summa']) . $member_id['password'] . $dopInfo['summa'] . $dopInfo['group'] . $serverid), $dopInfo['hash']) == 0) {
                        $dopInfo['summa'] = round($dopInfo['summa'], 2);
                        if (
                            !$user_group['group'] ||
                            $user_group['group'] == 'member' ||
                            $dopInfo['group'] == 'gold' ||
                            $dopInfo['group'] == 'diamond' && $user_group['group'] == 'iron' ||
                            $dopInfo['group'] == 'diamond' && $user_group['group'] == 'gold' ||
                            $dopInfo['group'] == $user_group['group']
                        ) {
                            if ($member_id['cash'] >= $dopInfo['summa']) {
                                $date30 = 30 * 86400;
                                $bd_name = $db->safesql($dopInfo['group']);
                                if ($user_group['group'] != $dopInfo['group']) {
                                    $until = time() + 2592000;
                                    if ($bd_name == 'stone') {
                                        $groupname = "Каменного аккаунта";
                                    } else if ($bd_name == 'iron') {
                                        $groupname = "Железного аккаунта";
                                    } else if ($bd_name == 'gold') {
                                        $groupname = "Золотого аккаунта";
                                    } else if ($bd_name == 'diamond') {
                                        $groupname = "Алмазного аккаунта";
                                    }

                                    foreach ($_servers as $server) {
                                        if ($server['id'] == $serverid) {
                                            $vname = $server['name'];
                                            $vpex = $server['pex_prefix'];
                                        }
                                    }
                                    $db->query("DELETE FROM `{$vpex}permissions_inheritance` WHERE child='{$member_id['uuid']}' AND type='1'");
                                    $db->query("DELETE FROM `{$vpex}permissions` WHERE name='{$member_id['uuid']}' AND type='1' AND permission LIKE 'group-%-until'");
                                    $db->query("INSERT INTO `{$vpex}permissions` VALUES(null, '{$member_id['uuid']}', '1', 'group-{$bd_name}-until', '', '$until')");
                                    $db->query("INSERT INTO `{$vpex}permissions_inheritance` ( `child`, `type`, `parent`, `world`) values ( '{$member_id['uuid']}', '1', '$bd_name', null)");
                                    $db->query("DELETE FROM donate_group WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                                    $db->query("INSERT INTO `donate_group` ( `uuid`, `serverid`, `group_name`, `buy_date`, `end_date`) values ( '{$member_id['uuid']}', '$serverid', '$bd_name', '" . time() . "', '$until')");
                                    $db->query("UPDATE dle_users SET cash=cash-{$dopInfo['summa']}, group_buy_cost='{$dopInfo['summa']}', prefixSettings='' WHERE name='{$member_id['name']}'");
                                    echo json_encode(array('status' => 1, 'text' => "<div style='margin-bottom: 7px'><b>ПОЗДРАВЛЯЕМ!</b></div>Вы успешно прокачали свой аккаунт до <b>$groupname</b>.<br/>С вашего баланса списано {$dopInfo['summa']} руб.<br/><br/>Автоматическая перезагрузка страницы через <span class='countdown_cabinet'>10</span> сек.", 'sec' => '10'));
                                    addLog($member_id['uuid'], -$dopInfo['summa'], "[$vname] Вступление в группу <b>" . strtoupper($dopInfo['group']) . "</b> до " . date("d.m.Y H:i", $until), 2);
                                } else {
                                    $db->query("UPDATE dle_users SET cash=cash-{$dopInfo['summa']}, group_buy_cost='{$dopInfo['summa']}' WHERE name='{$member_id['name']}'");
                                    $db->query("UPDATE `donate_group` SET `end_date` = end_date+$date30 WHERE uuid='{$member_id['uuid']}' AND serverid = $serverid");
                                    $db->query("UPDATE permissions SET value=value+$date30 WHERE name='{$member_id['uuid']}' AND permission='group-{$bd_name}-until'");
                                    echo json_encode(array('status' => 1, 'text' => "<div style='margin-bottom: 7px'><b>ПОЗДРАВЛЯЕМ!</b></div>Вы успешно продлили возможности своего аккаунта на 30 дн.<br/>С вашего баланса списано {$dopInfo['summa']} руб.<br/><br/>Автоматическая перезагрузка страницы через <span class='countdown_cabinet'>10</span> сек.", 'sec' => '10'));
                                    addLog($member_id['uuid'], -$dopInfo['summa'], "[$vname] Продление группы <b>" . strtoupper($dopInfo['group']) . "</b> на месяц");
                                }
                            } else {
                                echo json_encode(array('status' => 0, 'text' => "У вас недостаточно денег. Пополните свой баланс и повторите попытку прокачки."));
                            }

                        } else {
                            echo json_encode(array('status' => 0, 'text' => "Вы не можете вступить или продлить эту группу."));
                        }

                    } else {
                        echo json_encode(array('status' => 0, 'text' => "Ошибка, попробуйте снова."));
                    }

                } else {
                    echo json_encode(array('status' => 0, 'text' => "Пожалуйста, выберете сервер!"));
                }

            } else if ($action == "launchcheck") {
                if (!$member_id['launchernew']) {
                    $db->query("UPDATE dle_users SET launchernew='1' WHERE name='{$member_id['name']}'");
                }
                echo json_encode(array('status' => 1));
            } else if ($action == "subscribe") {
                if (!$member_id['vk_group']) {
                    $db->query("UPDATE dle_users SET vk_group='1' WHERE name='{$member_id['name']}'");
                }
                echo json_encode(array('status' => 1));
            } else if ($action == "groupload") {
                $serverid = $db->safesql($_POST['serverid']);
                if (is_numeric($serverid) && $serverid > 0) {
                    header('Content-Type: text/html');
                    $user_group = getserverGroup($member_id['uuid'], $serverid);
                    if (mb_strlen($member_id['name'], 'utf-8') > 7) {
                        $shownick = substr($member_id['name'], 0, 7) . '...';
                    } else {
                        $shownick = $member_id['name'];
                    }

                    if (!$user_group['group'] || $user_group['group'] == 'member' || isCostGroup($user_group['group'])) {
                        if ($user_group['group'] == 'member' || !$user_group['group']) {
                            $myaccinfo = returnNotifer("У вас сейчас <b>Деревянный аккаунт</b>, минимум возможностей на наших серверах.<br/>Здесь вы можете прокачать свой аккаунт и расширить свои возможности.", 'info', '', 'margin-bottom: 15px;', '11pt');
                        }

                        $discount_summa = 0;
                        $haveDisc = false;
                        if (isCostGroup($user_group['group'])) {
                            if ($member_id['group_buy_cost'] > 0 && $user_group['days'] > 3 && isCostGroup($user_group['group']) && $user_group['group'] != 'diamond') {
                                $day_summa = round($member_id['group_buy_cost'] / 30, 2);
                                $discount_summa = round($day_summa * $user_group['days'], 2);
                                if ($discount_summa > $member_id['group_buy_cost']) {
                                    $discount_summa = $member_id['group_buy_cost'];
                                }

                                $moreDay = $user_group['days'] - 4;
                                $dopdisc = "<div>Ваша специальная скидка для прокачки аккаунта выше составляет <b>$discount_summa руб.</b></div>";
                                $haveDisc = true;
                            } else if ($user_group['group'] == 'diamond') {
                                $dopdisc = "<div>Вы можете продлить срок действия Алмазного аккаунта на <b>20% дешевле</b>.</div>";
                            }

                            if ($user_group['group'] == 'diamond') {
                                $youcool = "<div>Ваш аккаунт имеет алмазный статус, это означает, что у вас самые широкие возможности.</div>";
                            } else if ($user_group['group'] == 'gold') {
                                $dopdisc2 = "<div>Вы можете продлить срок действия своего прокаченного аккаунта на <b>10% дешевле</b>.</div>";
                            }

                            if ($user_group['days'] > 1) {
                                $delayText = "через <b>{$user_group['days']} " . get_count($user_group['days'], "полный", "полных", "полных") . " " . get_count($days, "день", "дня", "дней") . "</b>";
                            } else {
                                $delayText = "<b style='text-transform: lowercase;'>" . showDateDo($user_group['until_unix']) . "</b>";
                            }

                            $myaccinfo .= returnNotifer("$youcool<b>{$user_group['group_name']}</b> заканчивается $delayText.$dopdisc $dopdisc2", 'clock-o', '', 'margin-bottom: 15px;', '10pt');
                        }
                    } else {
                        $myaccinfo = returnNotifer("Вы не можете управлять своей группой.<br/>Для смены группы обратитесь к кадровому администратору.", 'info', '', '', '11pt');
                    }

                    if ($user_group['group'] == 'stone' || $user_group['group'] == 'iron' || $user_group['group'] == 'gold' || $user_group['group'] == 'diamond') {
                        $have['stone'] = "<div class='mutedBG'><i class='uk-icon-check'></i></div>";
                        $disable['stone'] = "disabled";
                    }
                    if ($user_group['group'] == 'iron' || $user_group['group'] == 'gold' || $user_group['group'] == 'diamond') {
                        $have['iron'] = "<div class='mutedBG'><i class='uk-icon-check'></i></div>";
                        $disable['iron'] = "disabled";
                    }
                    if ($user_group['group'] == 'gold' || $user_group['group'] == 'diamond') {
                        $have['gold'] = "<div class='mutedBG'><i class='uk-icon-check'></i></div>";
                        $disable['gold'] = "disabled";
                    }

                    if ($user_group['group'] == 'diamond') {
                        $prc = 20;
                    } else {
                        $prc = 10;
                    }

                    $cost = getParam($user_group['group'] . '_price');
                    $cost = $cost - ($cost * $prc / 100);
                    if ($user_group['group'] != 'stone' || $user_group['group'] != 'member' || !$user_group['group']) {
                        $moreDays = "<button type='button' style='margin-bottom: 15px;' class='uk-button uk-width-1-1' onclick=\"buyserverGroup('{$user_group['group']}', '$serverid')\">Продлить {$user_group['group_name']} за <b>$cost руб.</b> [-$prc% от " . getParam($user_group['group'] . '_price') . " руб.]</button>";
                    } else {
                        $moreDays = "<button disabled type='button' style='margin-bottom: 15px;' class='uk-button uk-width-1-1'>Вы не можете продлить свой тип аккаунта</button>";
                    }

                    if ($user_group['group'] != 'diamond') {
                        if (getParam('stone_discount') > 0 && (getParam('until') > time() || getParam('until') == 0) && ($user_group['group'] == 'member' || $user_group['group'] == 'default' || !$user_group['group'])) {
                            $price_stone = "<div class='groupPrice'><div class='old_price'>" . getParam('stone_price') . "</div> <b>" . getParam('stone_discount') . " руб.</b></div>";
                        } else {
                            $price['stone'] = "<div class='groupPrice'>Стоимость: <b>" . getParam('stone_price') . " руб.</b></div>";
                        }

                        if (getParam('iron_discount') > 0 && (getParam('until') > time() || getParam('until') == 0) && ($user_group['group'] == 'member' || $user_group['group'] == 'default' || !$user_group['group'])) {
                            $price_iron = "<div class='groupPrice'><div class='old_price'>" . getParam('iron_price') . "</div> <b>" . getParam('iron_discount') . " руб.</b></div>";
                        } else {
                            $price['iron'] = "<div class='groupPrice'>Стоимость: <b>" . getParam('iron_price') . " руб.</b></div>";
                        }

                        if (getParam('gold_discount') > 0 && (getParam('until') > time() || getParam('until') == 0) && ($user_group['group'] == 'member' || $user_group['group'] == 'default' || !$user_group['group'])) {
                            $price_gold = "<div class='groupPrice'><div class='old_price'>" . getParam('gold_price') . "</div> <b>" . getParam('gold_discount') . " руб.</b></div>";
                        } else {
                            $price['gold'] = "<div class='groupPrice'>Стоимость: <b>" . getParam('gold_price') . " руб.</b></div>";
                        }

                        if (getParam('diamond_discount') > 0 && (getParam('until') > time() || getParam('until') == 0) && ($user_group['group'] == 'member' || $user_group['group'] == 'default' || !$user_group['group'])) {
                            $price_diamond = "<div class='groupPrice'><div class='old_price'>" . getParam('diamond_price') . "</div> <b>" . getParam('diamond_discount') . " руб.</b></div>";
                        } else {
                            $price['diamond'] = "<div class='groupPrice'>Стоимость: <b>" . getParam('diamond_price') . " руб.</b></div>";
                        }

                        if ($haveDisc) {
                            if ($user_group['group'] != 'gold') {
                                $less = round(getParam('gold_price') - $discount_summa, 2);
                                $price['gold'] = "<div class='groupPrice'><div class='old_price'>" . getParam('gold_price') . "</div> <b>$less руб.</b></div>";
                            }

                            $less = round(getParam('diamond_price') - $discount_summa, 2);
                            $price['diamond'] = "<div class='groupPrice'><div class='old_price'>" . getParam('diamond_price') . "</div> <b>$less руб.</b></div>";
                        }
                    }
                    foreach ($_servers as $server) {
                        if ($server['id'] == $serverid) {
                            $namesv = $server;
                        }
                    }
                    foreach ($namesv['donate'] as $svr) {
                        $showInfo .= "
						<div class='groupDiscr'>
							<span class='diamondAccount'>{$svr['name']}</span>
							<div class='bgPrefix'>[<b class='{$svr['pex']}Prefix'>{$svr['pex']}</b>] $shownick: Привет!</div>
							<center><img style='margin: 10px; margin-left: 0px;' src='$DURL/uploads/accs/{$svr['pex']}_acc.png' width='200px'></center>
							<div style='font-size: 9px;font-weight: bold;margin-bottom: -10px;opacity: 0.5;'>{$svr['desc']}</div>
							{$price[$svr['pex']]}
							<button type='button' class='uk-button groupBuy' onclick=\"buyserverGroup('{$svr['pex']}', '$serverid')\" {$disable[$svr['pex']]}>Подробнее</button>
							{$have[$svr['pex']]}
						</div>";
                    }
                    $price_fly = getParam("fly_cost");
                    $select = $db->super_query("SELECT * FROM can_fly WHERE uuid='{$member_id['uuid']}' AND serverid = '$serverid'");
                    if ($select['id']) {
                        $text_on_button = "Продлить возможность летать еще на 31 день всего за <b>$price_fly рублей</b>";
                        if ($select['until'] > time()) {
                            $i_can_fly = "<div class='uk-text-success'>Ваша возможность летать закончится через <b>" . showDateDo($select['until']) . "</b></div>";
                        } else {
                            $i_can_fly = "<div class='uk-text-primary'>Срок закончился, но вам повезло, система дала вам еще немного времени!</b></div>";
                        }

                    } else {
                        $i_can_fly = "<div class='uk-text-danger'>Сейчас у вас нет возможности летать на наших игровых серверах</div>";
                        $text_on_button = "Приобрести возможность летать на 31 день всего за <b>$price_fly рублей</b>";
                    }
                    if ($user_group['group'] == 'diamond' || $user_group['group'] == 'gold' || isSpedserverGroup($member_id['uuid'], $serverid)) {
                        $i_can_fly = "<div class='uk-text-success'><b>У вас есть возможность летать! Без ограничений!</b></div>";
                        $text_on_button = "Приобрести себе режим полета";
                        $disabled_fly = "disabled";
                    }
                    $showInfoFly .= "
				<div class='innerContent' style='margin-top: 20px'>
					<div><img style='position: absolute;margin-left: 493px;margin-top: -26px;' src='$DURL/uploads/shopimg/need/bat_left.png' width='110px'><b>ВОЗМОЖНОСТЬ ЛЕТАТЬ</b></div><br/>
					<div style='font-size: 13px'>Давно мечтали беспрепятственно летать как, например, Летучая мышь?<br/>Теперь не обязательно для этого прокачивать свой аккаунт до <b>Алмазного</b>/Золотого!<br/>Достаточно приобрести себе эту возможность и ввести в игре команду <b>/fly</b></div>
					<div style='margin-top: 20px' id='fly_text'>$i_can_fly</div>
					<button type='button' style='margin-top: 20px' class='uk-button uk-width-1-1' $disabled_fly id='buyfly' onclick=\"buyfly($serverid)\">$text_on_button</button>
				</div>
				";
                    echo $myaccinfo;
                    if (isCostGroup($user_group['group'])) {
                        echo $moreDays;
                    }

                    if (!$user_group['group'] || $user_group['group'] == 'member' || isCostGroup($user_group['group'])) {
                        echo $showInfo;
                    }

                    echo $showInfoFly;
                } else {
                    echo "Пожалуйста, выберете сервер!";
                }

            } else if ($action == "dontshowvote") {
                if ($member_id['last_vote_notifer'] != 999 && (date("d.m.Y", $member_id['last_vote_notifer']) != date("d.m.Y"))) {
                    $db->query("UPDATE dle_users SET last_vote_notifer='" . time() . "' WHERE name='{$member_id['name']}'");
                }
                echo json_encode(array('status' => 1));
            } else if ($action == "chatload") {
                header('Content-Type: text/html');
                $serverid = $db->safesql($_POST['serverid']);
                $user_group = getserverGroup($member_id['uuid'], $serverid);
                $prefix_loaded = returnNotifer("Изменение вашего префикса, цвета ника и сообщений позволит максимально выделить вас среди всех игроков в чате на наших серверах.", 'font', '', '', '', '8pt');
                $prefixname = $user_group['tag'];
                $chat_prefix = $user_group['defcolor'];
                $save_button = "<tr style='background: rgba(0, 0, 0, 0);'><td></td><td><button type='button' class='uk-button uk-width-1-1 uk-button-white' onclick='savePrefixCabinet($serverid)'>Сохранить настройки</button></td></tr>";
                if ($user_group['group'] != 'diamond') {
                    $def_error_1 = "Вам недоступна смена префикса";
                    $def_error_2 = "Вам недоступна смена оформления";
                    $noaccess = "<div class='onlyFor'>Доступно только Алмазному акк.</div>";
                    $disabled = "disabled";
                    $opacity1 = "opacity: 0.3";
                } else {
                    $disabled = "";
                }

                if ($user_group['group'] != 'diamond' && $user_group['group'] != 'gold') {
                    $def_error_3 = "Вам недоступна смена цвета сообщения";
                    $noaccess2 = "<div class='onlyFor'>Доступно только Золотому/Алмазному акк.</div>";
                    $disabled2 = "disabled";
                    $opacity2 = "opacity: 0.3";
                }

                if ($user_group['group'] == 'member') {
                    $disabled_vip = "disabled";
                    $prefix_disabled = "<div class='cabinetPrefixDisabled'><div>Для управления настройками чата вам нужен<br/>Железный, Золотой или Алмазный аккаунт.
			<div style='font-size: 10pt;margin-top: 14px;'><span style='opacity: 0.5'>Деревянный аккаунт не может управлять настройками чата.</span><br/>Золотой - Можно менять цвет префикса, ника и сообщения.<br/>Алмазный - Можно менять цвет префикса, его текст и оформление, цвет ника и текста.</div>
			</div></div>";
                    $save_button = "";
                    $opacity = "opacity: 0.1;";
                }
                if ($user_group['group'] == 'member') {
                    $prefixname = "Игрок";
                }

                $presel = $db->super_query("SELECT * FROM donate_prefix WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                if ($presel['prefixSettings']) {
                    $explode = explode(',', $presel['prefixSettings']);
                    $prefixname = $explode[3];
                    $chat_prefix = $explode[0];
                    $chat_nick = $explode[1];
                    $chat_msg = $explode[2];
                    $chat_nick_design = $explode[4];

                    $default2[$chat_prefix] = "selected='selected'";
                    $default1[$chat_nick] = "selected='selected'";
                    $default3[$chat_msg] = "selected='selected'";
                    $default4[$chat_nick_design] = "selected='selected'";
                }

                $prefix_loaded .= "
			<table class='uk-table uk-width-1-1 uk-table-striped uk-form' style='$opacity'>
				<tr>
					<td width='250px'>Выберите цвет своего префикса</td>
					<td>
						<select id='prefix_color' $disabled_vip onchange=\"setColorPls('prefname', this)\"  class='uk-width-1-1'>
							<option value='0' {$default2['0']}>Белый</option>
							<option value='&1' {$default2['&1']}>Темно-синий</option>
							<option value='&2' {$default2['&2']}>Темно-зеленый</option>
							<option value='&3' {$default2['&3']}>Алмазный</option>
							<option value='&5' {$default2['&5']}>Фиолетовый</option>
							<option value='&6' {$default2['&6']}>Золотой</option>
							<option value='&7' {$default2['&7']}>Серый</option>
							<option value='&8' {$default2['&8']}>Темно-серый</option>
							<option value='&9' {$default2['&9']}>Синий</option>
							<option value='&a' {$default2['&a']}>Зеленый</option>
							<option value='&b' {$default2['&b']}>Светло-голубой</option>
							<option value='&d' {$default2['&d']}>Розовый</option>
							<option value='&e' {$default2['&e']}>Желтый</option>
						</select>
					</td>
				</tr>

				<tr>
					<td width='250px'>Выберите цвет своего ника</td>
					<td>
						<select id='nick_color' $disabled_vip onchange=\"setColorPls('cabinetnick', this)\" class='uk-width-1-1'>
							<option value='0' {$default1['0']}>Белый</option>
							<option value='&1' {$default1['&1']}>Темно-синий</option>
							<option value='&2' {$default1['&2']}>Темно-зеленый</option>
							<option value='&3' {$default1['&3']}>Алмазный</option>
							<option value='&5' {$default1['&5']}>Фиолетовый</option>
							<option value='&6' {$default1['&6']}>Золотой</option>
							<option value='&7' {$default1['&7']}>Серый</option>
							<option value='&8' {$default1['&8']}>Темно-серый</option>
							<option value='&9' {$default1['&9']}>Синий</option>
							<option value='&a' {$default1['&a']}>Зеленый</option>
							<option value='&b' {$default1['&b']}>Светло-голубой</option>
							<option value='&d' {$default1['&d']}>Розовый</option>
							<option value='&e' {$default1['&e']}>Желтый</option>
						</select>
					</td>
				</tr>

				<tr style='$opacity1'>
					<td width='250px'>Слово в вашем префиксе<div id='prefixError' style='margin-top: -4px;' class='uk-text-small uk-text-danger'>$def_error_1</div></td>
					<td><input type='text' id='word_prefix' $disabled class='uk-width-1-1' value='$prefixname' maxlength='10' placeholder='До 10 символов'>$noaccess</td>
				</tr>

				<tr style='$opacity1'>
					<td width='250px'>Оформление вашего префикса<div id='magicError' style='margin-top: -4px;' class='uk-text-small uk-text-danger'>$def_error_2</div></td>
					<td>
						<select id='prefix_magic' $disabled onchange=\"designPrefix()\" class='uk-width-1-1'>
							<option value='1' {$default4['1']}>Обычный</option>
							<option value='2' {$default4['2']}>Жирный</option>
							<option value='3' {$default4['3']}>Подчеркнутый</option>
							<option value='4' {$default4['4']}>Зачеркнутый</option>
							<option value='5' {$default4['5']}>Курсив</option>
						</select>$noaccess
					</td>
				</tr>

				<tr>
					<td width='250px'>Предпросмотр</td>
					<td>
						<div id='cabinet_overview'>[<span id='prefname'>$prefixname</span>] <span id='cabinetnick'>{$member_id['name']}</span>: <span id='cabinettext'>Привет!</span></div>
					</td>
				</tr>
				$save_button
			</table>
			$prefix_disabled
			<script>
			function getStyleOfPrefix(classID, id) {
					if (id == 1) $('#prefname').css({
							'text-decoration': 'none',
							'font-weight': 'normal',
							'font-style': 'normal'
					});
					else if (id == 2) $('#prefname').css({
							'text-decoration': 'none',
							'font-weight': 'bold',
							'font-style': 'normal'
					});
					else if (id == 3) $('#prefname').css({
							'text-decoration': 'underline',
							'font-weight': 'normal',
							'font-style': 'normal'
					});
					else if (id == 4) $('#prefname').css({
							'text-decoration': 'line-through',
							'font-weight': 'normal',
							'font-style': 'normal'
					});
					else if (id == 5) $('#prefname').css({
							'text-decoration': 'none',
							'font-weight': 'normal',
							'font-style': 'italic'
					});
			}

			function getColorOfPrefix(id) {
					var color = 'white';
					if (id == '&0') color = 'black';
					else if (id == '&1') color = '#16365c';
					else if (id == '&2') color = '#4e6228';
					else if (id == '&3') color = '#00A9A9';
					else if (id == '&5') color = '#6f30a0';
					else if (id == '&6') color = '#FFAC06';
					else if (id == '&7') color = '#b2b1b2';
					else if (id == '&8') color = '#474747';
					else if (id == '&9') color = '#538dd5';
					else if (id == '&a') color = '#92d050';
					else if (id == '&b') color = 'aqua';
					else if (id == '&d') color = '#ff37cc';
					else if (id == '&e') color = 'yellow';
					return color;
			}
			getStyleOfPrefix('prefname', '$chat_nick_design');
			var color1 = getColorOfPrefix('$chat_prefix');
			var color2 = getColorOfPrefix('$chat_nick');
			var color3 = getColorOfPrefix('$chat_msg');
			$('#prefname').css('color', color1);
			$('#cabinetnick').css({
					'color': color2
			});
			$('#cabinettext').css({
					'color': color3
			});
			</script>
		";
                echo $prefix_loaded;
            } else if ($action == "savePrefix") {
                $serverid = $db->safesql($_POST['serverid']);
                $user_group = getserverGroup($member_id['uuid'], $serverid);
                if (is_numeric($serverid) && $serverid > 0) {
                    if ($user_group['group'] == 'iron' || $user_group['group'] == 'gold' || $user_group['group'] == 'diamond') {
                        $nick_color = $db->safesql($_POST['nick_color']);
                        $prefix_color = $db->safesql($_POST['prefix_color']);
                        $word_prefix = $db->safesql($_POST['word_prefix']);
                        if ($user_group['group'] == 'diamond') {
                            $word_prefix = $db->safesql($_POST['word_prefix']);
                            if (!$word_prefix) {
                                $user_group['tag'];
                            }

                            $prefix_magic = $db->safesql($_POST['prefix_magic']);
                            $text_color = $db->safesql($_POST['text_color']);
                        } else if ($user_group['group'] == 'gold') {
                            $text_color = $db->safesql($_POST['text_color']);
                            $word_prefix = $user_group['tag'];
                            $prefix_magic = 1;
                        } else {
                            $text_color = '0';
                            $word_prefix = $user_group['tag'];
                            $prefix_magic = 1;
                        }

                        $word_prefix = str_replace(',', '', $word_prefix);
                        $word_prefix = str_replace('&', '', $word_prefix);

                        if ($prefix_magic < 1 || $prefix_magic > 5) {
                            echo json_encode(array('status' => 0, 'text' => "Ошибка безопасности, повторите попытку №1."));
                        } else if (mb_strlen($word_prefix, 'utf-8') > 10) {
                            echo json_encode(array('status' => 0, 'text' => "Текст префикса не может быть длиннее 10 символов."));
                        } else if (mb_strlen($word_prefix, 'utf-8') < 3) {
                            echo json_encode(array('status' => 0, 'text' => "Текст префикса не может быть короче 3х символов."));
                        } else if ($prefix_color != '0' && $prefix_color != '&1' && $prefix_color != '&2' && $prefix_color != '&3' && $prefix_color != '&4' && $prefix_color != '&5' && $prefix_color != '&6' && $prefix_color != '&7' && $prefix_color != '&8' && $prefix_color != '&9' && $prefix_color != '&a' && $prefix_color != '&b' && $prefix_color != '&c' && $prefix_color != '&d' && $prefix_color != '&e') {
                            echo json_encode(array('status' => 0, 'text' => "Ошибка безопасности, повторите попытку №2."));
                        } else if ($nick_color != '0' && $nick_color != '&1' && $nick_color != '&2' && $nick_color != '&3' && $nick_color != '&4' && $nick_color != '&5' && $nick_color != '&6' && $nick_color != '&7' && $nick_color != '&8' && $nick_color != '&9' && $nick_color != '&a' && $nick_color != '&b' && $nick_color != '&c' && $nick_color != '&d' && $nick_color != '&e') {
                            echo json_encode(array('status' => 0, 'text' => "Ошибка безопасности, повторите попытку №3."));
                        } else {
                            $text_color = '&f';
                            $code = "$prefix_color,$nick_color,$text_color,$word_prefix,$prefix_magic";
                            $presel = $db->super_query("SELECT * FROM donate_prefix WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                            if (strcmp($presel['prefixSettings'], $code) != 0) {
                                $psele = $db->query("SELECT * FROM donate_prefix WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                                if (!$db->num_rows($psele)) {
                                    $db->query("INSERT INTO donate_prefix VALUES (null, '{$member_id['uuid']}', '$serverid', '$code')");
                                } else {
                                    $db->query("UPDATE donate_prefix SET prefixSettings='$code' WHERE uuid='{$member_id['uuid']}' AND serverid='$serverid'");
                                }

                                if (!$word_prefix) {
                                    $word_prefix = ucfirst($group['group']);
                                }

                                if (!$prefix_magic) {
                                    $prefix_magic = '';
                                }

                                if ($user_group['group'] == 'lux') {
                                    if ($prefix_magic == 1) {
                                        $prefix_magic = "";
                                    } else if ($prefix_magic == 2) {
                                        $prefix_magic = "&l";
                                    } else if ($prefix_magic == 3) {
                                        $prefix_magic = "&n";
                                    } else if ($prefix_magic == 4) {
                                        $prefix_magic = "&m";
                                    } else if ($prefix_magic == 5) {
                                        $prefix_magic = "&o";
                                    }

                                } else {
                                    $prefix_magic = "";
                                }

                                if (!$prefix_color) {
                                    $prefix_color = '&f';
                                }

                                if (!$nick_color) {
                                    $nick_color = '&f';
                                }

                                if (!$text_color) {
                                    $text_color = '&f';
                                }

                                $d = '&f[';
                                $f = '&f]';
                                $g = ':';
                                $empty = ' ';
                                $fineprefix = $d . $prefix_color . $prefix_magic . $word_prefix . $f . $nick_color . $empty;
                                $suffix = '&f' . $g . $text_color;
                                foreach ($_servers as $vser1) {
                                    if ($vser1['id'] == $serverid) {
                                        $pex_prefix = $vser1['pex_prefix'];
                                    }
                                }
                                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{$member_id['uuid']}' AND permission='suffix' AND type='1'");
                                $db->query("DELETE FROM `{$pex_prefix}permissions` WHERE name='{$member_id['uuid']}' AND permission='prefix' AND type='1'");
                                if ($prefix_color == '&f' && $nick_color == '&f' && $text_color == '&f' && ($user_group['group'] == 'iron' || $user_group['group'] == 'gold')) {
                                    echo json_encode(array('status' => 1, 'text' => 'Ваш префикс успешно сброшен.'));
                                } else {
                                    $db->query("INSERT INTO `{$pex_prefix}permissions` VALUES (NULL, '{$member_id['uuid']}', '1', 'suffix', '', '$suffix')");
                                    $db->query("INSERT INTO `{$pex_prefix}permissions` VALUES (NULL, '{$member_id['uuid']}', '1', 'prefix', '', '$fineprefix')");
                                    echo json_encode(array('status' => 1, 'text' => 'Ваш префикс успешно сохранен. Наслаждайтесь!'));
                                }
                            } else {
                                echo json_encode(array('status' => 0, 'text' => 'Сохраненный префикс ничем не отличается от текущего.'));
                            }

                        }
                    } else {
                        echo json_encode(array('status' => 0, 'text' => 'Вы не можете управлять своим префиксом.'));
                    }

                } else {
                    echo json_encode(array('status' => 0, 'text' => 'Пожалуйста, выберете сервер!'));
                }

            }
        } else {
            echo json_encode(array('status' => 0, 'text' => 'Ошибка авторизации на сервере ParadiseCloud.ru, обновите страницу'));
        }

    } else {
        echo json_encode(array('status' => 0, 'text' => 'Ошибка авторизации на сервере ParadiseCloud.ru, обновите страницу'));
    }

}
die();
