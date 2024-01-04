<?php
if (!defined('FOXXEY')) die("Hacking attempt!");
include(ROOT_DIR."/engine/data/mineconf.php");
unset($servers);
foreach ($_servers as $serv) {
	$servers .= "<option value='{$serv['id']}'>{$serv['name']}</option>";
}

$gospawn = "
		<div class='innerContent' style='margin-bottom: 20px'>
			<div class='innerHeader'>Телепортация на спавн</div>
			Попали в краш и не можете зайти на сервер? Теперь это не проблема!<br/>
			Выберите сервер и нажмите 'Телепортация'.
			<table class='uk-width-1-1 uk-table uk-table-striped uk-form'>
				<tr>
					<td width='200px'>Выберите сервер, <div class='uk-text-small'>на котором вы застряли</div></td>
					<td width='220px'>
						<select id='server' class='uk-width-1-1'>
							$servers
						</select>
					</td>
					<td>
						<button type='button' class='uk-button uk-width-1-1' id='goSpawn'>Телепортация</button>
					</td>
				</tr>
			</table>
		</div>
		";
// }

$other = "
		$gospawn
		<div class='innerContent'>
			<div class='innerHeader'>Изменить пароль от моего аккаунта</div>
			Сложный пароль - гарантия хорошей защиты вашего аккаунта от рук злоумышленников.<br/>
			Советуем вам защитить свой аккаунт сложным паролем, например: <b><abbr data-uk-tooltip title='Случайно сгенерированный пароль'>" . generate_password(11) . "</abbr></b>
			<table class='uk-width-1-1 uk-table uk-table-striped uk-form'>
				<tr>
					<td width='200px'>Укажите свой новый пароль<div class='uk-text-small'>Максимально сложный</div></td>
					<td width='220px'>
						<div class='uk-form-password uk-width-1-1'>
							<input type='password' class='uk-width-1-1' placeholder='Сложный пароль' autocomplete='off' id='strongpass'>
							<a href='' class='uk-form-password-toggle' data-uk-form-password><i class='uk-icon-eye'></i></a>
						</div>
					</td>
					<td>
						<button type='button' class='uk-button uk-width-1-1' id='changepass'>Изменить</button>
					</td>
				</tr>
			</table>
		</div>
	";
