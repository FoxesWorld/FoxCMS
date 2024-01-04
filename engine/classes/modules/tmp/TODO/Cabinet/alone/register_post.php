<?php
header('Content-Type: application/json');
define("DATALIFEENGINE", true);
include_once $_SERVER['DOCUMENT_ROOT'] . "/engine/classes/mysql.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/engine/data/dbconfig.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/engine/modules/functions.php";
if ($_POST['ajax']) {
    session_start();
    if (time() - $_SESSION['times'] < 3) {
        echo json_encode(array('status' => 0, 'text' => returnNotifer("Пожалуйста, не нажимайте так часто.<br/>Отправляйте регистрационную форму не чаще одно раза в три секунды.", "clock-o", 'false')));
    } else {
        $_SESSION['times'] = time();
        $password = $db->safesql($_COOKIE['dle_password']);
        $userid = $db->safesql($_COOKIE['dle_user_id']);
        $member_id = $db->super_query("SELECT * FROM dle_users WHERE user_id='$userid'");
        if (!$member_id['user_id']) {
            $nickname = $db->safesql($_POST['nickname']);
            $password = $db->safesql($_POST['password']);
            $password2 = $db->safesql($_POST['password2']);
            $email = $db->safesql($_POST['email']);
            $captcha = $db->safesql($_POST['captcha']);

            include_once $_SERVER['DOCUMENT_ROOT'] . "/engine/classes/captchalib.php";
            $secret = "6LfkBuoUAAAAAGMBnAWtNGHsn8NZSFaan-2M6k4_";
            $response = null;
            $reCaptcha = new ReCaptcha($secret);
            if ($captcha) {
                $response = $reCaptcha->verifyResponse($_SERVER["REMOTE_ADDR"], $captcha);
            }

            if ($response != null && $response->success) {
                $select = $db->query("SELECT * FROM dle_users WHERE name='$nickname'");
                $select1 = $db->query("SELECT * FROM dle_users WHERE email='$email'");
                $select2 = $db->query("SELECT * FROM nick_history WHERE nickname='$nickname'");
                $count = mb_strlen(preg_replace('/[^\d]/', '', $nickname), 'utf-8');
                $count1 = substr_count($nickname, '_');
                $count2 = substr_count($nickname, '-');
                if (!preg_match("/^[a-z0-9_-]+$/i", $nickname)) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Ваш ник может состоять только из букв латинского алфавита, цифр и нижнего подчеркивания и дефиса.", "times", 'false')));
                } else if ($db->num_rows($select)) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Указанный вами игровой ник уже зарегистрирован. Придумайте другой.", "times", 'false')));
                } else if ($db->num_rows($select2)) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Указанный вами игровой ник уже зарегистрирован. Придумайте другой.", "times", 'false')));
                } else if ($db->num_rows($select1)) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Указанный Email адрес уже зарегистрирован.", "times", 'false')));
                } else if (mb_strlen($nickname, 'utf-8') < 4) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Игровой ник должен состоять минимум из четырех символов.", "times", 'false')));
                } else if (mb_strlen($nickname, 'utf-8') > 18) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Игровой ник должен состоять максимум из 18ти символов.", "times", 'false')));
                } else if ($count > 4) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Игровой ник может иметь максимум четыре цифры.", "times", 'false')));
                } else if (mb_strlen($nickname, 'utf-8') == $count) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Игровой ник не может состоять только из цифр.", "times", 'false')));
                } else if ($count1 > 2) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Игровой ник может содержать максимум два нижних подчеркивания.", "times", 'false')));
                } else if ($count2 > 2) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Игровой ник может содержать максимум два дефиса.", "times", 'false')));
                } else if (mb_strlen($password, 'utf-8') < 6) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>В целях безопасности вашего аккаунта, пароль должен состоять минимум из 6 символов..", "times", 'false')));
                } else if (strcmp($password, $password2) !== 0) {
                    echo json_encode(array('status' => 0, 'text' => returnNotifer("Допущена ошибка, исправьте ее и повторите отправку регистрационной формы.<br/>Введенные вами пароли не совпадают.", "times", 'false')));
                } else {
                    $regPassword = md5(md5($password));
                    $hashPassword = md5($password);
                    $myIP = get_ip();
                    $referal = 0;
                    if (isset($_COOKIE['ref'])) {
                        $referal = $db->safesql($_COOKIE['ref']);
                        $check = $db->query("SELECT * FROM dle_users WHERE user_id='$referal'");
                        if (!$db->num_rows($check)) {
                            $referal = 0;
                        }

                    }
                    $db->query("INSERT INTO dle_users (name, password, email, reg_date, lastdate, user_group, info, signature, favorites, xfields, logged_ip, referal) VALUES ('$nickname', '$regPassword', '$email', '" . time() . "', '" . time() . "', '4', '', '', '', '', '$myIP', '$referal')");
                    $id = $db->insert_id();
                    set_cookie("dle_user_id", $id, 365);
                    set_cookie("dle_password", $hashPassword, 365);
                    if (function_exists('openssl_random_pseudo_bytes')) {
                        $stronghash = md5(openssl_random_pseudo_bytes(15));
                    } else {
                        $stronghash = md5(uniqid(mt_rand(), true));
                    }

                    $salt = sha1(str_shuffle("abcdefghjkmnpqrstuvwxyz0123456789") . $stronghash);
                    $hash = '';
                    for ($i = 0; $i < 9; $i++) {
                        $hash .= $salt{mt_rand(0, 39)};
                    }
                    $hash = md5($hash);
                    $db->query("UPDATE dle_users set hash='" . $hash . "', lastdate='" . time() . "', logged_ip='$myIP' WHERE user_id='$id'");
                    set_cookie("dle_hash", $hash, 365);
                    $_COOKIE['dle_hash'] = $hash;

                    //include($_SERVER['DOCUMENT_ROOT']."/engine/classes/mail.class.php");
                    //include($_SERVER['DOCUMENT_ROOT']."/engine/data/config.php");

                    $message = "
							Здравствуйте, $nickname!<br><br/>
							Вы успешно зарегистрировали аккаунт на игровых серверах ParadiseCloud.ru!<br/>
							Ваши регистрационные данные:<br/><br/>
							Имя аккаунта: <b>$nickname</b><br/>
							Пароль: <b>$password</b><br/><br/>
							Надеемся, что вам у нас понравится!<br/>
							С уважением, Администрация ParadiseCloud!
						";
                    //$sendmail = new dle_mail($config);
                    //$sendmail->send($email, "Регистрация на ParadiseCloud.ru", $message);
                    echo json_encode(array('status' => 1, 'text' => returnNotifer("Поздравляем! Ваш аккаунт успешно зарегистрирован!<br/>Регистрационную информацию по вашему аккаунту мы отправили на указанную почту.<br/><br/>Надеемся, что вам у нас понравится!<br/>С уважением, Администрация мира теней!<br/><br/><b><a href='http://paradisecloud.ru/uploads/Launcher.exe'>Скачать лаунчер для WINDOWS</a></b><br/><b><a href='http://paradisecloud.ru/uploads/Launcher.jar'>Скачать лаунчер для MAC/LINUX</a></b><br/><br/>В будущем вы сможете скачать лаунчер в любое время, нажав на кнопку \"НАШ ЛАУНЧЕР\"", "check", '', 'margin-top: 10px;')));
                }
            } else {
                echo json_encode(array('status' => 0, 'text' => returnNotifer("Пожалуйста, нажмите на кнопку \"Я не робот\".<br/>Мы должны знать, что вы регистрируетесь с благими намерениями.", "shield")));
            }

        } else {
            header("Location: $DURL");
        }

    }
} else {
    header("Location: $DURL");
}

die();
