<?php 
    /* [07.07.2023] */
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
		"keywords" => "FoxEngine,Website,Engine,CMS,Foxesworld,Гымми,Foxesworld Entertainment,Fox,FoxesCraft",
		"contactEmail" => "no-reply@foxesworld.ru",
		"contactPhone" => "8 800 555 35 35",
		"ServiceVersion" => "2.3.7"
),

	"securitySetings" => array(
		"reCaptchaSecret" => "6LcKeBoiAAAAAK-dFGsiDyqZvO_1u7MKWscdEJqJ",
		"reCaptchaWebsite" => "6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7",
		"bantime" => "240",
		"maxLoginAttempts" => "1",
		"reCaptchaCheck" => true,
		"keyCheck" => true
),

	"permissions" => array(
		"profileEdit" => "4,1"
),

	"other" => array(
		"timezone" => "Europe/Moscow",
		"webserviceName" => "FoxEngine",
		"OptionReplaceValues" => "{TES}->8800,{siteKey}->cfgVal(securitySetings|reCaptchaWebsite)",
		"userFieldsArray" => "user_id,email,login,password,user_group,realname,hash,reg_date,last_date,logged_ip,profilePhoto,userStatus,land,groupName,colorScheme"
));

?>