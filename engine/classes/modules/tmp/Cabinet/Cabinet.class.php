<?php
if (!defined('FOXXEY')) die("Hacking attempt!");

class Cabinet extends init {
	function __construct() {
		//$username = $member_id['name'];
		// $user_group = getGroup($member_id['uuid']);
		// if ($user_group['group'] == 'member') $user_group['group'] = '';
		setlocale(LC_NUMERIC, "C");
		if (init::$usrArray['login']) {
			include($_SERVER['DOCUMENT_ROOT'] . "/engine/data/mineconf.php");
			if (isset($_POST['action'])) {
				include_once(__dir__ . "/post_ajax.php");
				// else include_once(__dir__ . "/post_ajax.php");
			} else {
				//$header = "Личный кабинет";
				$style['skin'] = "style='display: none;'";
				$style['power'] = "style='display: none;'";
				$style['chat'] = "style='display: none;'";
				$style['other'] = "style='display: none;'";
				$style['votes'] = "style='display: none;'";

				if ($_GET['loc']) {
					$seleced[$_GET['loc']] = "class='selected'";
					$style[$_GET['loc']] = "";
				} else {
					$seleced['skin'] = "class='selected'";
					$style['skin'] = "";
				}

				include(__dir__ . '/skin.php');
				$skin = new Skin();
				// if ($username == 'Titan') {
				$scrops = "<script src='$DURL/loadscript/buygroup'></script>";
				include(__dir__ . '/group.php');
				include(__dir__ . '/chat.php');
				// }
				// else {
				// $scrops = "<script src='$DURL/loadscript/cabinet?$time'></script>";
				// include(__dir__ . '/group.php');
				// include(__dir__ . '/chat.php');
				// }
				include(__dir__ . '/other.php');
				include(__dir__ . '/votes.php');

				$ban = $db->super_query("SELECT * FROM litebans_bans WHERE uuid='{$member_id['uuid']}' AND until='-1' AND active='1' OR uuid='{$member_id['uuid']}' AND until>'" . time() . "000' AND active='1' LIMIT 1");
				if (strpos($ban['reason'], '@') !== false && $ban['banned_by_name']) {
					if ($ban['until'] == -1) $word = "перманентно заблокирован.<br/>Это означает, что автоматической разблокировки аккаунта не будет.";
					else $word = "заблокирован до " . date("d.m.Y H:i", substr($ban['until'], 0, strlen($ban['until']) - 3));

					$youbanned = "<div style='font-size: 14px;margin-top: -18px;margin-bottom: 40px;padding: 12px;background: rgb(147, 105, 85);color: #EAD0AD;'>Ваш аккаунт $word<br/>Так же администратор/модератор, заблокировавший вас, запретил вам приобретать платную разблокировку аккаунта.</div>";
				}

				if (getParam('until') > time() && !isCostGroup($user_group['group'])) $skidki = "<img style='position: absolute;margin-top: -7px;margin-left: 250px;z-index: 1;display: inline-block;' src='http://paradisecloud.ru/uploads/discounts.png'>";
				$content = "
						$youbanned
						$skidki
						<ul class='reset footer-menu cabinet-func'>
							<li><a {$seleced['skin']} data-id='1' data-tag='skin' onclick='return false;' href=''>скин и плащ</a></li>
							<li><a {$seleced['power']} data-id='2' data-tag='power' href='' onclick='return false;' style='color: #9C1D78;text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);text-transform: uppercase;'>ДОНАТ</a></li>
							<li><a {$seleced['chat']} data-id='3' data-tag='chat' href='' onclick='return false;'>Настройки чата</a></li>
							<li><a {$seleced['votes']} data-id='4' data-tag='votes' href='' onclick='return false;'>Голосование</a></li>
							<li><a {$seleced['other']} data-id='5' data-tag='other' href='' onclick='return false;'>Остальное</a></li>
						</ul>
						<div style='margin-top: 20px;' class='cabinet-func-windows'>
							<div class='win-open' {$style['skin']} data-id='1'>$skincon</div>
							<div class='win-open' {$style['power']} data-id='2'>$groupmy</div>
							<div class='win-open' {$style['chat']} data-id='3'>$prefix_loaded</div>
							<div class='win-open' {$style['votes']} data-id='4'>$votes</div>
							<div class='win-open' {$style['other']} data-id='5'>$other</div>
						</div>
						$scrops
					";

				$tpl->load_template('modules.tpl');
				$tpl->set('{header}', $header);
				$tpl->set('{content}', $content);
				$tpl->compile('content');
				$tpl->clear();
			}
		} else header("Location: $DURL");
}
}
