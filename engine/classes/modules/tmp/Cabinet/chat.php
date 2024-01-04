<?php
if (!defined('FOXXEY')) die("Hacking attempt!");
if (isCan($member_id['uuid'], 'admin') || isCan($member_id['uuid'], 'mladmin')) $prefix_loaded = returnNotifer("Администраторы не могут изменять оформление ника и сообщений.<br/>Для смены группы обратитесь к Quassar/andrew_shbov.", 'warning', '', '', '10pt');
else if (isCan($member_id['uuid'], 'newmoder') || isCan($member_id['uuid'], 'moder') || isCan($member_id['uuid'], 'stmoder') || isCan($member_id['uuid'], 'gmoder')) $prefix_loaded = returnNotifer("Модераторы не могут изменять оформление ника и сообщений.<br/>Для смены группы обратитесь к кадровому администратору.", 'warning', '', '', '10pt');
else if (!isCan($member_id['uuid'], 'admin') || !isCan($check['uuid'], 'architect') || !isCan($check['uuid'], 'builder') || !isCan($check['uuid'], 'event') || !isCan($member_id['uuid'], 'mladmin') || isCan($member_id['uuid'], 'diamond') || isCan($member_id['uuid'], 'gold') || isCan($member_id['uuid'], 'iron') || !isCan($member_id['uuid'], 'newmoder') || !isCan($member_id['uuid'], 'moder') || !isCan($member_id['uuid'], 'stmoder') || !isCan($member_id['uuid'], 'gmoder')) {
	unset($servers);
	foreach ($_servers as $serv) {
		$servers .= "<option value='{$serv['id']}'>{$serv['name']}</option>";
	}
	$prefix_loaded = '
	<div class="innerContent">
	<center>
		<table>
			<tbody>
				<tr>
					<td>
						<div style="font-size:16px;margin-top:-8px;"><b>Сервер:</b></div>
					</td>
					<td>
						<div class="uk-form-select" data-uk-form-select="">
							<select onchange="loadPrefix(this.value)" id="plists">
								<option value="0" selected="" disabled="">Выберите сервер...</option>
								' . $servers . '
							</select>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</center>
	<div id="chatinfo"></div>
	</div>';
} else $prefix_loaded = returnNotifer("Вы не можете изменять оформление ника и сообщений.<br/>Для смены группы обратитесь к кадровому администратору.", 'warning', '', '', '10pt');
