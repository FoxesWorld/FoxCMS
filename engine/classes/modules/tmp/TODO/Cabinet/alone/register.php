<?php
if (!defined('DATALIFEENGINE')) {
    die("Hacking attempt!");
}

if (!$member_id['name']) {
    if ($_GET['do'] != 'lostpassword') {
        echo "
				<div id='registerAccount' class='uk-modal'>
					<div class='uk-modal-dialog' style='width: 700px;'>
						<a class='uk-modal-close uk-close'></a>
						<div style='font-size: 13pt;border-bottom: 1px solid gba(154, 120, 76, 0.22);padding-bottom: 10px;'><b><center>Регистрация нового игрового аккаунта</center></b></div>
						<div style='margin-top: 10px; margin-botom: 9px; background: rgba(166, 131, 89, 0.28);padding: 10px;color: #614030;font-size: 10pt;'>
							<table class='uk-width-1-1'>
								<tr>
									<td width='50px' align='center'><i style='font-size: 26pt; color: rgba(110, 78, 59, 0.55);' class='uk-icon-info'></i></td>
									<td>
										Прямо здесь и сейчас у вас есть возможность зарегистрировать для себя игровой аккаунт.<br/>
										Регистрационные данные в будущем невозможно изменить, отнеситесь к этому серьезно.
									</td>
								</tr>
							</table>
						</div>
						<table id='registerTable' class='uk-table uk-width-1-1 uk-table-striped uk-form'>
							<tr>
								<td>
									Придумайте себе игровой ник
									<div class='uk-text-small' style='margin-top: -2px;font-size: 11px;opacity: 0.6;'>Минимум 4 символа, максимум 16</div>
								</td>
								<td width='304px'><input type='text' class='uk-width-1-1' id='nickname' placeholder='Например: andrew_shbov' autocomplete='off' style='width: 100%;'></td>
							</tr>
							<tr>
								<td>
									Email адрес
									<div class='uk-text-small' style='margin-top: -2px;font-size: 11px;opacity: 0.6;'>Не будет возможности сменить, нужен для восстановления пароля</div>
								</td>
								<td><input type='text' style='width: 100%;' id='email' placeholder='Например: mynick@mail.ru' autocomplete='off'></td>
							</tr>
							<tr>
								<td>
									Пароль
									<div class='uk-text-small' style='margin-top: -2px;font-size: 11px;opacity: 0.6;'>Максимально сложный, например: " . generate_password(12) . "</div>
								</td>
								<td><input type='password' style='width: 100%;' id='password' placeholder='Например: " . generate_password(12) . "' autocomplete='off'></td>
							</tr>
							<tr>
								<td>
									Повторите пароль
									<div class='uk-text-small' style='margin-top: -2px;font-size: 11px;opacity: 0.6;'>Убедиться, что не допущено ошибки</div>
								</td>
								<td><input type='password' style='width: 100%;' id='password2' placeholder='Пароль указанный выше' autocomplete='off'></td>
							</tr>
							<tr>
								<td>
									Подтвердите, что вы не робот
									<div class='k-text-small' style='margin-top: -2px;font-size: 11px;opacity: 0.6;'>Один клик, если все в порядке</div>
								</td>
								<td><div class='g-recaptcha' data-sitekey='6LfkBuoUAAAAAIwXquazBvq7AsHbIObyMFWnZWpY'></div></td>
							</tr>
							<tr>
								<td>
									Завершите регистрацию
									<div class='uk-text-small' style='margin-top: -2px;font-size: 11px;opacity: 0.6;'>Заканчивайте и бегом в игру!</div>
								</td>
								<td><button type='button' class='uk-width-1-1 uk-button' id='registerStart'>Завершить регистрацию!</button></td>
							</tr>
						</table>
						<div id='regoutput'></div>
						<div style='margin-top: 10px; margin-botom: 9px; background: rgba(166, 131, 89, 0.28);padding: 10px;color: #614030;font-size: 10pt;'>
							<table class='uk-width-1-1'>
								<tr>
									<td width='50px' align='center'><i style='font-size: 26pt; color: rgba(110, 78, 59, 0.55);' class='uk-icon-info'></i></td>
									<td>
										Завершая регистрацию вы автоматически соглашаетесь с <a href='$DURL/rules' target='_blank'>правилами наших игровых серверов</a>.<br/>
										Любое нарушение правил пресекается администрацией/модерацией нашего проекта.
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<script src='$DURL/loadscript/register'></script>
			";
    }
} else {
    echo "
			<div id='registerAccount' class='uk-modal'>
				<div class='uk-modal-dialog' style='width: 700px;height: 380px;'>
					<a class='uk-modal-close uk-close'></a>
					<div style='font-size: 13pt;border-bottom: 1px solid gba(154, 120, 76, 0.22);padding-bottom: 10px;'><b><center>Чтобы играть у нас, скачайте наш лаунчер</center></b></div>
					<div style='margin-top: 10px; margin-botom: 9px; background: rgba(166, 131, 89, 0.28);padding: 10px;color: #614030;font-size: 10pt;'>
						<table class='uk-width-1-1'>
							<tr>
								<td width='50px' align='center'><i style='font-size: 26pt; color: rgba(110, 78, 59, 0.55);' class='uk-icon-info'></i></td>
								<td>
									<b>Внимание!</b> Наш лаунчер работает с версиями Java 8+!<br/>
									Обновить свою версию Java можно <a href='http://www.java.com/en/download/' target='_blank'>перейдя по этой ссылке</a>.
								</td>
							</tr>
						</table>
					</div>
					<table id='registerTable' class='uk-table uk-width-1-1'>
						<tr>
							<td onclick=\"location.href='http://paradisecloud.ru/uploads/Launcher.exe'\" class='tablelol' style='cursor: pointer' width='50%' align='center'>
								<div style='margin-bottom: 10px;'><b>WINDOWS</b></div>
								<i style='color: #6D4C39;' class='uk-icon-windows'></i>
							</td>
							<td onclick=\"location.href='http://paradisecloud.ru/uploads/Launcher.jar'\" class='tablelol' style='cursor: pointer' align='center'>
								<div style='margin-bottom: 10px;'><b>MAC / LINUX</b></div>
								<i style='color: #6D4C39;' class='uk-icon-apple'></i>
							</td>
						</tr>
					</table>
				</div>
			</div>
		";
}
