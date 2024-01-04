<?php
	header('Content-Type: application/json');
	define("DATALIFEENGINE", true);
	include_once("/home/admin/web/paradisecloud.ru/public_html/engine/classes/mysql.php");
	include_once("/home/admin/web/paradisecloud.ru/public_html/engine/data/dbconfig.php");
	include_once("/home/admin/web/paradisecloud.ru/public_html/engine/modules/functions.php");
	if($_POST['ajax']) {
		session_start();
		if(time()-$_SESSION['times'] < 3) echo json_encode(array('status' => 0, 'text' => returnNotifer("Пожалуйста, не нажимайте так часто.<br/>Отправляйте форму не чаще одно раза в три секунды.", "clock-o", 'false')));
		else {
			$_SESSION['times'] = time();
			$password = $db->safesql($_COOKIE['dle_password']);
			$userid = $db->safesql($_COOKIE['dle_user_id']);
			$member_id = $db->super_query( "SELECT * FROM dle_users WHERE user_id='$userid'");
			if(!$member_id['user_id']) {
				$emailornick = $db->safesql($_POST['emailornick']);
				$captcha = $db->safesql($_POST['captcha']);
				include_once("/home/admin/web/paradisecloud.ru/public_html/engine/classes/captchalib.php");
				$secret = "-2KNJsyS";
				$response = null;
				$reCaptcha = new ReCaptcha($secret);
				if($captcha) $response = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $captcha);
				if($response != null || !$response->success) {
					if(mb_strlen($emailornick, 'utf-8') >= 3) {
						$select = $db->super_query("SELECT * FROM dle_users WHERE name='$emailornick' OR email='$emailornick'");
						if($select['name']) {
							if(!$select['last_recovery'] || time()-$select['last_recovery'] > 0) {
								if($select['user_group'] != 1) {
									$hash = generate_password(64);
									$db->query("UPDATE dle_users SET lost_password='$hash', last_recovery='".time()."' WHERE name='$emailornick' OR email='$emailornick'");
									include("/home/admin/web/paradisecloud.ru/public_html/engine/classes/mail.class.php");
									include("/home/admin/web/paradisecloud.ru/public_html/engine/data/config.php");
									$message = "
										Здравствуйте, {$select['name']}!<br><br/>
										Вы только что запросили восстановление доступа к своему аккаунту.<br/><br/>
										Для продолжения восстановления доступа, перейдите по ссылке: <a href='http://paradisecloud.ru/lostpassword?username={$select['name']}&token=$hash'>http://paradisecloud.ru/lostpassword?username={$select['name']}&token=$hash</a><br/><br/>
										С уважением, Администрация мира теней!
									";
									$sendmail = new dle_mail($config, true);
									echo $sendmail->send($select['email'], "Восстановление доступа", $message);
									echo json_encode(array('status' => 1, 'text' => returnNotifer("Мы отправили инструкцию по восстановлению доступа на ваш регистрационный Email.<br/>Переходите по ссылке в письме и доступ будет восстановлен! $msg", "check")));
								}
								else echo json_encode(array('status' => 0, 'text' => returnNotifer("Восстановление доступа к аккаунтам администраторов запрещено.<br/>Обратитесь за помощью к техническому администратору andrew_shbov", "times")));
							}
							else echo json_encode(array('status' => 0, 'text' => returnNotifer("Вы не можете восстанавливать доступ к аккаунту чаще, чем раз в 5 минут.<br/>Повторите попытку позже.", "times")));
						}
						else echo json_encode(array('status' => 0, 'text' => returnNotifer("Указанный регистрационный Email или ник не найден.<br/>Может быть вы еще не зарегистрированы?", "times")));
					}
					else echo json_encode(array('status' => 0, 'text' => returnNotifer("Укажите пожалуйста свой ник или регистрационный Email.<br/>После чего повторите попытку.", "times")));
				}
				else echo json_encode(array('status' => 0, 'text' => returnNotifer("Пожалуйста, нажмите на кнопку \"Я не робот\".<br/>Мы должны знать, что вы пришли с благими намерениями.", "shield")));
			}
			else header("Location: $DURL");
		}
	}
	else header("Location: $DURL");
	die();