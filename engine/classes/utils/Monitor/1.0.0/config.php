<?php
if(!defined('foxesMon')){
	exit('Not a real Fox =(');
}
	$monCfg = array(
		'dayRecordPath' 	 => CACHE_DIR.'tmp/record_day.log',
		'absoluteRecordPath' => CACHE_DIR.'tmp/record.log',
		'tempFilePath' 		 => CACHE_DIR.'tmp/timefile.log'
	);

	$time['out'] 		= 2;
	$time['record_day'] = 86400;

	date_default_timezone_set("Europe/Moscow");
?>