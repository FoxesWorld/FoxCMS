<?php
if (!defined('DATALIFEENGINE')) {
    die("Hacking attempt!");
}

if ($member_id['name']) {
    include "/home/admin/web/paradisecloud.ru/public_html/engine/data/mineconf.php";
    if ($_GET['do'] != 'diamonds') {
        $_SESSION['hash'] = generate_password(32);
    }

    $avatar = "http://paradisecloud.ru/skin-5-{$member_id['name']}";
    if ($_POST['goDonate']) {
        $summaDonate = str_replace(',', '.', $_POST['summaDonate']);
        if ($summaDonate < 5 || !is_numeric($summaDonate)) {
            $donateError = "Минимум 5 рублей";
        } else {
            $shop_id = ''; // ID проекта
            $secret_key = ''; // Секретный ключ
            $pay_id = $member_id['user_id']; // Номер счета
            $currency = 'RUB'; // Валюта платежа
            $sign = md5($currency . ':' . $summaDonate . ':' . $secret_key . ':' . $shop_id . ':' . $pay_id);
            $URL = "https://any-pay.org/merchant?summ=$summaDonate&pay_id={$member_id['user_id']}&desc=Оплата+услуг+игрового+проекта&sign=$sign&InvId=0&id=$shop_id";
            header("Location: $URL");
            die();
        }
    }
    $punkt_margin = "margin-top: 0px;";
    // if ($member_id['name'] != 'Titan') { // Подготовка к удалению
    //     $group = getGroup($member_id['uuid']);
    //     $groupdis = "<div class='account-info' style='margin-top: -10px'>У вас <span><a href='#accinfo' data-uk-modal=\"{'center': 'true'}\">{$group['group_name']}</a></span>$days_less</div>";
    //     if (isCostGroup($group['group']) || $group['group'] == 'member' || !$group['group']) {
    //         if ($group['days'] >= 1) {
    //             $style_upgrade = "margin-top: 60px;";
    //             $punkt_margin = "margin-top: 40px;";
    //         } else {
    //             $style_upgrade = "margin-top: 41px;";
    //             $punkt_margin = "margin-top: 40px;";
    //         }
    //         $upgrade_account = "<a href='$DURL/cabinet?loc=power' style='position: absolute; $style_upgrade' class='upgrade-button'>Прокачать аккаунт</a>";
    //     }
    //     if ($group['group'] == 'iron') $groupava = "<div class='groupIconAva' style='background-image: url($DURL/uploads/accs/iron_acc.png)'></div>";
    //     else if ($group['group'] == 'gold') $groupava = "<div class='groupIconAva' style='background-image: url($DURL/uploads/accs/gold_acc.png)'></div>";
    //     else if ($group['group'] == 'diamond') $groupava = "<div class='groupIconAva' style='background-image: url($DURL/uploads/accs/diamond_acc.png)'></div>";
    // }

    if (getParam('until') > time() && $_GET['do'] != 'cabinet' && !isCostGroup($group['group'])) {
        $skidki = "<img style='position: absolute;top: -80px;left: -274px;' src='http://paradisecloud.ru/uploads/discounts.png'>";
    }

    $check = $db->query("SELECT * FROM shop_items WHERE until>'" . time() . "' AND discount_from='0' AND percent>0 OR until>'" . time() . "' AND discount_from<='" . time() . "' AND percent>0 LIMIT 1");
    if ($db->num_rows($check)) {
        $skidki2 = "<img style='position: absolute;top: -80px;left: -157px;' src='http://paradisecloud.ru/uploads/discounts.png'>";
    }

    if ($group['days']) {
        $days_less = "<div>До окончания осталось {$group['days']} дн.</div>";
    }

    $ch = $db->query("SELECT * FROM chest_list WHERE to_uuid='{$member_id['uuid']}'");
    if ($db->num_rows($ch)) {
        $badge = "<div class='uk-badge uk-badge-danger' style='position: absolute;margin-top: 10px;margin-left: 9px;'>" . $db->num_rows($ch) . "</div>";
    }

    $addMoney = "<button onclick=\"$('#gobuydonate').click()\" type='button' class='addbalance_button' data-uk-modal=\"{'target': '#donate', 'center': true}\">Пополнить баланс</button><button type='button' onclick=\"$('#gobuydiamonds').click()\" data-uk-modal=\"{'target': '#donate', 'center': true}\" class='addbalance_button diamonds_buy_button'>Купить алмазы</button>";

    foreach ($_servers as $serv) {
        $servers .= "<option value='{$serv['id']}'>{$serv['name']}</option>";
    }

    echo "<div class='block-profile'>
					<div class='block-profile1'>$groupava{$member_id['name']}</div>
					<div class='block-profile2'>
					<!--<div class='block-profile-ava avatar-position' style='background-image: url($avatar);background-size: 75px;background-position: -20px -2px;;border-radius: 50px;'></div>-->
						<span style='padding: 0px 0px 0px 10px;width: 101px;'>
						<div class='diamond_area'>
							<b id='diamond_balance'>{$member_id['diamonds']}</b> <img src='http://paradisecloud.ru/uploads/diamond.png' class='diamond_icon'>
							<div>Ваши алмазы</div>
						</div>
						<b><d id='balance'>{$member_id['cash']}</d></b> Ваш баланс</span>
						$addMoney
						$upgrade_account
					</div>
					$groupdis
					<ul style='$punkt_margin' class='reset block-profile3'>
						<li><a href='#' onclick=\"$('#gobuytransfer').click()\" data-uk-modal=\"{'target': '#donate', 'center': true}\" >Перевод алмазов на сервер</a></li>
						<li><a href='$DURL/banlist'>Список заблокированных</a></li>
						<li><a href='$DURL/top'>Рейтинг голосующих</a></li>
						<li><a href='$DURL/referal'>Реферальная система</a></li>
						<!--<li><a href='$DURL/chests'>Мои сундуки$badge</a></li>-->
						<li><a href='$DURL/?action=logout'>Выйти из аккаунта</a></li>
					</ul>
					$skidki
					$skidki2
					<div onclick=\"location.href='$DURL/moder'\" class='my_kits'>СТАТЬ МОДЕРАТОРОМ</div>
				</div>


				<div id='donate' class='uk-modal'>
				    <div class='uk-modal-dialog' style='width: 480px'>
				        <div class='modal_content'>
									<ul class='uk-tab' data-uk-tab=\"{connect:'#balancechange2'}\">
										<li class='uk-active'><a id='gobuydonate' href=''><i class='uk-icon-rub'></i> Пополнить баланс</a></li>
										<li><a id='gobuydiamonds' href=''><i class='uk-icon-diamond'></i> Купить алмазы</a></li>
										<li><a id='gobuytransfer' href=''><i class='uk-icon-arrow-right'></i> Перевод алмазов</a></li>
								</ul>

								<ul id='balancechange2' class='uk-switcher uk-margin'>
							    <li>
							        <form class='uk-form' action method='post'>
								        <table class='uk-table uk-table-striped'>
								        	<tr>
								        		<td>Сколько рублей хотите получить на баланс?<div class='uk-text-small'>Например: 100</div></td>
								        		<td width='100px'><input type='text' class='uk-width-1-1 uk-form-large uk-text-center uk-text-large' value='10' name='summaDonate'></td>
								        	</tr>
								        </table>
								        <div class='uk-text-small'><i class='uk-icon-angle-right'></i> После успешного пополнения рубли будут сразу зачислены вам</div>
								        <div class='uk-text-small'><i class='uk-icon-angle-right'></i> Пожертвованные рубли конвертируются в виртуальную валюту</div>
								        <div class='uk-text-small'><i class='uk-icon-angle-right'></i> Пожертвованные рубли позволят расширить ваши игровые возможности</div>
								        <input type='submit' name='goDonate' value='Перейти к оплате' class='uk-button uk-width-1-1' style='color: white;margin-top: 15px'>
								    </form>
									</li>
									<li>
										<table class='uk-table uk-table-striped'>
											<tbody><tr>
												<td>Сервер:</td>
												<td colspan='5'>
													<center><div class='uk-form-select' data-uk-form-select=''>
													<select id='serverid_buy_emeralds' name='serverid_buy_emeralds' style='width: 250px;'>
														<option value='0' selected='' disabled=''>Выберите сервер...</option>
														$servers
													</select>
												</div></center>
												</td>
											</tr>
											<tr>
												<td>Сколько рублей вы хотите обменять на алмазы?</td>
												<td style='padding: 5px;'>
													<i class='uk-icon-rub' style='padding: 14px 0px; font-size: 20px;'></i>
												</td>
												<td width='80px'>
													<input type='text' onchange='calculate_rtod(this.value)' onkeyup='calculate_rtod(this.value)' onfocusout='calculate_rtod(this.value)' onactivate='calculate_rtod(this.value)' ondeactivate='calculate_rtod(this.value)' class='uk-width-1-1 uk-form-large uk-text-center uk-text-large' value='0' id='summaRubles' name='summaRubles'>
												</td>
												<td style='padding: 5px;'>
													<i class='uk-icon-arrow-right' style='padding: 14px 0px; font-size: 20px;'></i>
												</td>
												<td width='80px'>
													<input readonly='' disabled='' id='summaDiamonds' type='text' class='uk-width-1-1 uk-form-large uk-text-center uk-text-large' value='0' name='summaDiamonds'>
												</td>
												<td style='padding: 5px;'>
													<i class='uk-icon-diamond' style='padding: 14px 0px; font-size: 20px;'></i>
												</td>
											</tr>
										</tbody></table>
										<div class='uk-text-small'><i class='uk-icon-angle-right'></i> После успешного обмена алмазы будут сразу зачислены вам на счет</div>
										<input type='submit' name='goDiamondExchange' onclick='exchange_rubles_diamonds($(&quot;#serverid_buy_emeralds&quot;).val(), $(&quot;#summaRubles&quot;).val())' value='Купить' class='uk-button uk-width-1-1' style='color: white;margin-top: 15px'>
									</li>
									<li>
										<table class='uk-table uk-table-striped'>
											<tbody>
												<tr>
													<td>Сервер:</td>
													<td>
														<center>
															<div class='uk-form-select' data-uk-form-select=''>
																<select id='serverid_emeralds' name='serverid_emeralds'>
																	<option value='0' selected='' disabled=''>Выберите сервер...</option>
																	$servers
																</select>
															</div>
														</center>
													</td>
												</tr>
												<tr>
													<td>Сколько алмазов вы хотите перевести на сервер?</td>
													<td><input type='text' class='uk-width-1-1 uk-form-large uk-text-center uk-text-large' value='10' id='summaEmeralds' name='summaEmeralds'></td>
												</tr>
											</tbody>
										</table>
										<div class='uk-text-small'><i class='uk-icon-angle-right'></i> После успешного обмена алмазы будут переведены на выбранный сервер</div>
										<input type='submit' name='goDiamondExchange' onclick='transfer_emeralds($(&quot;#serverid_emeralds&quot;).val(), $(&quot;#summaEmeralds&quot;).val())' value='Перевести' class='uk-button uk-width-1-1' style='color: white;margin-top: 15px'>
									</li>
							</ul>
				    </div>
				  </div>
				</div>

				<div id='accinfo' class='uk-modal'>
				    <div class='uk-modal-dialog'>
				        <div class='modal_content'>
					        <b>ТИПЫ АККАУНТА НА НАШИХ ИГРОВЫХ СЕРВЕРАХ</b><br/><br/>
					        <b>Деревянный аккаунт</b> - совершенно бесплатно получает каждый зарегистрировавшийся игрок на наших игровых серверах. Однако возможности деревянного аккаунта минимальны. Каждый обладатель деревянного аккаунта может \"прокачать\" свой аккаунт до более функциональных и с более широким набором возможностей.<br/><br/>

					        <b>Золотой аккаунт</b> - Второй по функциональности аккаунт. Невероятно большое количество возможностей на наших серверах. Кроме HD скина вы так же можете устанавливать себе HD плащ! Можно менять цвет префикса, ника и сообщения.<br/><br/>
							<b>Алмазный аккаунт</b> - Самый престижный, самый функциональный и самый дорогой тип аккаунта. Только истинные любители игры Minecraft предпочтут играть с максимальным набором возможностей и безграничной свободой на наших игровых серверах.<br/><br/>
							<a href='$DURL/donate'>Подробное описание каждой из групп</a>
						</div>
				    </div>
				</div>
			";
    $ban = $db->super_query("SELECT * FROM litebans_bans WHERE uuid='{$member_id['uuid']}' AND until='-1' AND active=1 OR uuid='{$member_id['uuid']}' AND until>'" . time() . "000' AND active=1 LIMIT 1");
    if ($ban['banned_by_name'] && strpos($ban['reason'], '@') === false) {
        if ($ban['until'] == -1) {
            $unbanPrice = 149;
            $unbanPlus = 59;
            $word = "перманентно заблокированы. Это означает, что автоматической разблокировки аккаунта не будет.";
        } else {
            $unbanPrice = 119;
            $unbanPlus = 39;
            $word = "заблокированы до " . date("d.m.Y H:i", substr($ban['until'], 0, strlen($ban['until']) - 3));
        }
        $price = round($unbanPrice + ($member_id['unbans'] * $unbanPlus), 2);
        $check = $db->super_query("SELECT * FROM dle_users WHERE uuid='{$ban['banned_by_uuid']}'");

        echo "
				<div id='ourgroup' class='uk-modal'>
				    <div class='uk-modal-dialog'>
				        <div class='modal_content'>
					        <b><center>ВЫ ЗАБЛОКИРОВАНЫ В ИГРЕ!</center></b>
					        <table style='margin-top: 20px' class='uk-width-1-1'>
					        	<tr>
					        		<td align='center' width='125px' valign='top'><img src='$DURL/uploads/lock.png' width='100px'></td>
					        		<td valign='top'>
					        			Вы $word<br/><br/>
					        			Вас заблокировал администратор/модератор <b>{$check['name']}</b>, по причине: <b>{$ban['reason']}</b><br/><br/>
					        			У вас есть возможность разблокировать свой аккаунт прямо сейчас всего за <b>$price</b> руб., после чего в течение десяти минут, вы сможете вновь играть на наших игровых серверах.
					        		</td>
					        	</tr>
					        </table>
							<div style='margin-top: 15px;' id='subcrOut'><button type='button' class='uk-width-1-1 uk-button' id='unbanmeplease'>Мгновенно разблокировать свой аккаунт всего за <b>$price</b> рублей</button></div>
							<div style='font-size: 12px;text-align: center;border-top: 1px solid rgba(0, 0, 0, 0.11);margin-top: 10px;padding-top: 10px;color: rgba(0, 0, 0, 0.4);'>Это сообщение будет появляться каждый раз. Чтобы скрыть его сейчас - нажмите за пределы этого окна.</div>
						</div>
				    </div>
				</div>

				<script>
					var modal = UIkit.modal('#ourgroup', {center: true});
					if (modal.isActive()) modal.hide();
					else modal.show();
				</script>
				<script src='$DURL/loadscript/unban'></script>
			";
    } else if (!$member_id['launchernew']) {
        echo "
		<div id='ourgroup' class='uk-modal'>
		<div class='uk-modal-dialog'>
			<div class='modal_content'>
				<b>
					<center>СКАЧАЙ НОВЫЙ ЛАУНЧЕР</center>
				</b>
				<div style=\"margin-top: 10px; margin-botom: 9px; background: rgba(166, 131, 89, 0.28);padding: 10px;color: #614030;font-size: 10pt;\">
					<table class=\"uk-width-1-1\">
						<tbody>
							<tr>
								<td width=\"50px\" align=\"center\"><i style=\"font-size: 26pt; color: rgba(110, 78, 59, 0.55);\" class=\"uk-icon-info\"></i></td>
								<td>
									<b>Внимание!</b> Наш лаунчер работает с версиями Java 8+!<br>
									Обновить свою версию Java можно <a href=\"http://www.java.com/en/download/\" target=\"_blank\">перейдя по этой ссылке</a>.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<table id=\"registerTable\" class=\"uk-table uk-width-1-1\">
					<tbody>
						<tr>
							<td onclick=\"location.href='http://paradisecloud.ru/uploads/Launcher.exe'\" class=\"tablelol\" style=\"cursor: pointer\" width=\"50%\" align=\"center\">
								<div style=\"margin-bottom: 10px;\"><b>WINDOWS</b></div>
								<i style=\"color: #6D4C39;\" class=\"uk-icon-windows\"></i>
							</td>
							<td onclick=\"location.href='http://paradisecloud.ru/uploads/Launcher.jar'\" class=\"tablelol\" style=\"cursor: pointer\" align=\"center\">
								<div style=\"margin-bottom: 10px;\"><b>MAC / LINUX</b></div>
								<i style=\"color: #6D4C39;\" class=\"uk-icon-apple\"></i>
							</td>
						</tr>
					</tbody>
				</table>
				<div style='margin-top: 15px;' id='subcrOut'><button type='button' class='uk-width-1-1 uk-button' id='launchcheck'>Я скачал(-а)!</button></div>
			</div>
		</div>
	</div>

				<script>
					var modal = UIkit.modal('#ourgroup', {center: true});
					if (modal.isActive()) modal.hide();
					else modal.show();
				</script>
				<script src='$DURL/loadscript/launchcheck'></script>
			";
    } else if (!$member_id['vk_group']) {
        echo "
				<div id='ourgroup' class='uk-modal'>
				    <div class='uk-modal-dialog'>
				        <div class='modal_content'>
					        <b><center>ПОДПИШИСЬ НА НАШУ ГРУППУ ВКОНТАКТЕ</center></b>
					        <table style='margin-top: 20px' class='uk-width-1-1'>
					        	<tr>
					        		<td width='165px'><img src='$DURL/uploads/vk.png' width='150px'></td>
					        		<td>
					        			Хотите быть всегда в курсе последних новостей происходящих на наших игровых серверах ParadiseCloud.ru?<br/><br/>Все очень просто! Подпишитесь на нашу группу ВКонтакте! <br/><br/>Именно там мы публикуем все новости, будь то незначительные или же продублированные новости с сайта.
					        		</td>
					        	</tr>
					        </table>

					        <script type='text/javascript' src='//vk.com/js/api/openapi.js?121'></script>
							<!-- VK Widget -->
							<div id='vk_groups2' style='margin-top: 20px'></div>
							<script type='text/javascript'>
							VK.Widgets.Group('vk_groups2', {mode: 0, width: '660px', height: '100', color1: 'FFFFFF', color2: '675945', color3: '6A4936'}, 181953373);
							</script>

							<div style='margin-top: 15px;' id='subcrOut'><button type='button' class='uk-width-1-1 uk-button' id='subscribed'>Я подписался(-ась)!</button></div>
						</div>
				    </div>
				</div>

				<script>
					var modal = UIkit.modal('#ourgroup', {center: true});
					if (modal.isActive()) modal.hide();
					else modal.show();
				</script>
				<script src='$DURL/loadscript/vkcheck'></script>
			";
    } else if ($member_id['last_vote_notifer'] != 999 && (date("d.m.Y", $member_id['last_vote_notifer']) != date("d.m.Y"))) {
        $check = $db->query("SELECT * FROM vote_table WHERE uuid='{$member_id['uuid']}' AND `from`='topcraft' AND date_text='" . date("d.m.Y") . "' OR uuid='{$member_id['uuid']}' AND `from`='mcrate' AND date_text='" . date("d.m.Y") . "' OR uuid='{$member_id['uuid']}' AND `from`='mctop' AND date_text='" . date("d.m.Y") . "'");
        if (!$db->num_rows($check)) {
            echo "
					<div id='ourgroup' class='uk-modal'>
					    <div class='uk-modal-dialog'>
					        <div class='modal_content'>
						        <b><center>ВЫ СЕГОДНЯ ЕЩЕ НЕ ГОЛОСОВАЛИ ЗА НАС</center></b>
						        <table style='margin-top: 20px' class='uk-width-1-1'>
						        	<tr>
						        		<td width='165px' valign='top'><img src='$DURL/uploads/mcvote.png' width='150px'></td>
						        		<td valign='top'>
						        			Просим минуточку внимания!<br/><br/>
						        			Знаете ли вы, что вы можете зарабатывать до <b><u>5 рублей</u></b> голосуя за нас в топе TopCraft? Это очень просто и доступно абсолютно каждому игроку!<br/><br/>
						        			За ваше первое голосование вы получите <b>5 рублей</b>!<br/>
						        			Со второго дня голосования по десятый - 1 рубля.<br/>
						        			С одиннадцатого дня по двадцать четвертый - 2 рубля.<br/>
						        			С двадцать пятого по последний день месяца - <b><u>3 рублей!</u></b><br/><br/>
						        			<b>Чем больше вы голосуете, тем больше получаете!</b>
						        		</td>
						        	</tr>
						        </table>

								<div style='margin-top: 15px;'><a href='http://topcraft.ru/servers/9616' target='_blank'><button type='button' class='uk-width-1-1 uk-button'>Перейти для голосования на TopCraft</button></a></div>
								<div style='margin-top: 5px;'><a href='http://mcrate.su/rate/7698' target='_blank'><button type='button' class='uk-width-1-1 uk-button'>Перейти для голосования на MCRate</button></a></div>
								<div style='margin-top: 5px;'><a href='http://mctop.su/vote/5565' target='_blank'><button type='button' class='uk-width-1-1 uk-button'>Перейти для голосования на MCTop</button></a></div>
								<div style='margin-top: 15px;text-align: center;'><div id='subcrOut' style='margin-bottom: 20px; font-weight: bold;'><a id='dontshowvote' class='uk-text-danger'>Больше не показывайте мне это сегодня</a></div>Внимание! Нами обрабатывается и выдается вознаграждение только за один отданный вами голос в сутки!</div>
							</div>
					    </div>
					</div>

					<script>
						var modal = UIkit.modal('#ourgroup', {center: true});
						if (modal.isActive()) modal.hide();
						else modal.show();
					</script>
					<script src='$DURL/loadscript/vkcheck'></script>
				";
        } else {
            echo "
					<div id='ourgroup' class='uk-modal'>
					    <div class='uk-modal-dialog'>
					        <div class='modal_content'>
						        <b><center>БОЛЬШОЕ ВАМ СПАСИБО ЗА ОТДАННЫЙ ГОЛОС</center></b>
						        <table style='margin-top: 20px' class='uk-width-1-1'>
						        	<tr>
						        		<td width='165px' valign='top'><img src='$DURL/uploads/mcvote.png' width='150px'></td>
						        		<td valign='top'>
						        			От администрации всего проекта, выражаем вам искреннюю благодарность за недавно отданный голос за текущие сутки.<br/><br/>Мы очень надеемся, что и завтра вы за нас проголосуете, ведь согласитесь, очень здорово и интересно играть, когда на серверах вы всегда можете найти себе близкого по духу человека и прекрасно проводить с ним время!<br/><br/>Большое вам спасибо еще раз!<br/>С огромным уважением, команда ParadiseCloud.ru
						        		</td>
						        	</tr>
						        </table>
							</div>
					    </div>
					</div>

					<script>
						var modal = UIkit.modal('#ourgroup', {center: true});
						if (modal.isActive()) modal.hide();
						else modal.show();
					</script>
					<script src='$DURL/loadscript/vkcheck'></script>
				";
            $db->query("UPDATE dle_users SET last_vote_notifer='" . time() . "' WHERE name='{$member_id['name']}'");
        }
    }
    echo "<script src='http://paradisecloud.ru/loadscript/userside?132'></script>";
}
