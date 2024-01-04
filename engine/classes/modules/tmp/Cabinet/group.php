<?php
if (!defined('FOXXEY')) die("Hacking attempt!");

foreach ($_servers as $serv) {
	$servers .= "<option value='{$serv['id']}'>{$serv['name']}</option>";
}
$groupmy .= '
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
						<select onchange="loadGroups(this.value)" id="slists">
							<option value="0" selected="" disabled="">Выберите сервер...</option>
							' . $servers . '
						</select>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</center>
<div id="groupsinfo"></div>
</div>';
