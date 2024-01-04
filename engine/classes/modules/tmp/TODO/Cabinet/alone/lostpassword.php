<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	
	if(!$member_id['name']) {
		if(isset($_POST['ajax'])) include_once(__dir__."/post_lost.php");
		else if($_GET['username'] && $_GET['token']) {
			$header = "Восстановление забытого пароля (Второй шаг)";
			$username = $db->safesql($_GET['username']);
			$token = $db->safesql($_GET['token']);
			if($username && $token) {
				$select = $db->super_query("SELECT * FROM dle_users WHERE name='$username' AND lost_password='$token'");
				if($select['name']) {
					$newpass = generate_password(12);
					$n = sha1(md5($newpass));
					$regPassword = md5(md5($newpass));
					$hashPassword = md5($newpass);
					$db->query("UPDATE dle_users SET password='$regPassword', lost_password='$n' WHERE name='{$select['name']}'");
					include_once("/home/admin/web/paradisecloud.ru/public_html/engine/integrator.php");
					// $ipb->LostPassword($select['name'], $newpass);
					include("/home/admin/web/paradisecloud.ru/public_html/engine/classes/mail.class.php");
					include("/home/admin/web/paradisecloud.ru/public_html/engine/data/config.php");
					
					$message = "
						Здравствуйте, {$select['name']}!<br><br/>
						Вы успешно изменили свой пароль от аккаунта!<br/>
						Ваши новые регистрационные данные:<br/><br/>
						Имя аккаунта: <b>{$select['name']}</b><br/>
						Пароль: <b>$newpass</b><br/><br/>
						Желаем вам приятной игры.<br/>
						С уважением, команда ParadiseCloud.ru!
					";
					$sendmail = new dle_mail($config, true);
					$sendmail->send($select['email'], "Изменение пароля на ParadiseCloud.ru", $message);
					$content = returnNotifer("Ваш пароль успешно восстановлен.<br/>Новые данные для авторизации отправлены на ваш Email.", "check", '');
				}
				else $content = returnNotifer("Для восстановления переданы неверные данные.<br/>Перейдите по точной ссылке в вашем письме.", "times", 'false');
			}
			else $content = returnNotifer("Для восстановления не переданы важные данные.<br/>Перейдите по точной ссылке в вашем письме.", "times", 'false');
		}
		else {
			$header = "Восстановление забытого пароля";
			$content = "
				<div>Забыли пароль от своего аккаунта? Ничего страшного! Прямо здесь и сейчас вы можете восстановить доступ к аккаунту за считанные минуты. Все, что для этого нужно - доступ к Email адресу, который вы указывали при регистрации аккаунта.</div>
				<div id='recoveryArea' style='margin-top: 20px'>
					<table class='uk-width-1-1 uk-table uk-table-striped uk-form'>
						<tr>
							<td>Укажите свой Email или ник<div style='font-size: 11px; opacity: 0.6'>Будет выслана инструкция</div></td>
							<td  width='304px'><input type='text' class='uk-width-1-1' id='emailornick'></td>
						</tr>
						<tr>
							<td>Подтвердите, что вы не робот<div style='font-size: 11px; opacity: 0.6'>Для вашей и нашей безопасности</div></td>
							<td><div class='g-recaptcha' data-sitekey='6LfX6-QUAAAAAAxnLpz3AYHrdjXm5UkfpunFWzOg'></div></td>
						</tr>
						<tr>
							<td></td>
							<td><button type='button' class='uk-width-1-1 uk-button' id='recovery'>Выслать инструкцию</button></td>
						</tr>
					</table>
				</div>
				<div id='recoveryOutput'></div>
				<script src='$DURL/loadscript/recovery'></script>
			";
		}
	}
	else header("Location: $DURL");
	
	$tpl->load_template('modules.tpl');
	$tpl->set('{header}', $header);
	$tpl->set('{content}', $content);
	$tpl->compile('content');
	$tpl->clear();