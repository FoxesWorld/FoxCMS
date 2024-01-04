<?php
	if(!defined('DATALIFEENGINE')) die("Hacking attempt!");
	
	$header = "Правила";
	$content = file_get_contents("/home/admin/web/paradisecloud.ru/public_html/uploads/rules.html");
	
	$tpl->load_template('modules.tpl');
	$tpl->set('{header}', $header);
	$tpl->set('{content}', $content);
	$tpl->compile('content');
	$tpl->clear();