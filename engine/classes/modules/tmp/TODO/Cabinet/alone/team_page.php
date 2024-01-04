<?php
if (!defined('DATALIFEENGINE')) die("Hacking attempt!");

$header = "Команда нашего проекта";

$content = "
		<table class='uk-table uk-table-striped'>
			<tr><td colspan='2'><b>Главная администрация</b></td></tr>
			<tr>
				<td width='120px'><a href='https://vk.com/id501073546' target='_blank'>_KIT_</a></td>
				<td>Владелец проекта, контролирует работу администрации, занимается стратегией развития проекта </td>
			</tr>
			<tr>
				<td width='120px'><a href='https://vk.com/id542590998' target='_blank'>Misha</a></td>
				<td>Владелец проекта, контролирует работу администрации, занимается стратегией развития проекта </td>
			</tr>
		</table>
		
		<table class='uk-table uk-table-striped'>
			<tr><td colspan='2'><b>Техническая администрация</b></td></tr>
			<tr>
				<td width='120px'><a href='https://vk.com/msgaming8' target='_blank'>MSGAMING</a></td>
				<td>Технический администратор, держит в порядке сервера и лаунчер</td>
			</tr>
		</table>
	";
$select = $db->query("SELECT * FROM m_moderators_new WHERE access='gmoder'");
if ($db->num_rows($select)) {
	$content .= "<table class='uk-table uk-table-striped'><tr><td colspan='2'><b>Гл. Модераторы</b></td></tr>";
	while ($get = $db->get_row($select)) {
		$user = $db->super_query("SELECT * FROM m_moderators_new WHERE username='{$get['username']}'");
		if ($user['server'] == 'All') $server = "всех серверов";
		else $server = 'сервера ' . $user['server'];
		$content .= "
				<tr>
					<td width='120px'>{$user['username']}</td>
					<td>Гл. Модератор {$server}</td>
				</tr>
			";
	}
	$content .= "</table>";
}

$tpl->load_template('modules.tpl');
$tpl->set('{header}', $header);
$tpl->set('{content}', $content);
$tpl->compile('content');
$tpl->clear();
