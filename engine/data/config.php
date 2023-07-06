<?php 
    /* [06.07.2023] */
$config = array(
	"database" => array(
		"dbHost" => "localhost",
		"dbUser" => "aidenfox",
		"dbPass" => "fNt5DL9dNcA347XG",
		"dbName" => "aidenfox"
),

	"siteSettings" => array(
		"siteTpl" => "foxengine",
		"siteTitle" => "FoxesCraft",
		"siteStatus" => "PostAlpha",
		"siteDesc" => "A website engine",
		"keywords" => "null",
		"contactEmail" => "no-reply@foxesworld.ru",
		"contactPhone" => "null",
		"ServiceVersion" => "2.2.5"
),

	"securitySetings" => array(
		"reCaptchaSecret" => "6LcKeBoiAAAAAK-dFGsiDyqZvO_1u7MKWscdEJqJ",
		"reCaptchaWebsite" => "6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7",
		"bantime" => "240",
		"maxLoginAttempts" => "1",
		"reCaptchaCheck" => true,
		"keyCheck" => true
),

	"other" => array(
		"timezone" => "Europe/Moscow",
		"webserviceName" => "FoxEngine",
		"userOptions" => "userOptions",
		"OptionReplaceValues" => "{TPL}->228Year,{YEAR}->2023,{TES}->8800,{siteKey}->cfgVal(securitySetings|reCaptchaWebsite)",
		"userFieldsArray" => "user_id,email,login,password,user_group,realname,hash,reg_date,last_date,logged_ip,profilePhoto,userStatus,land,colorScheme,groupName",
		"canEditGroup" => "1,4"
));

?>