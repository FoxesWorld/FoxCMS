<?php 
    /* [03.10.2023] */
$config = array(
	"database" => array(
		"dbHost" => "localhost",
		"dbUser" => "foxesworld",
		"dbPass" => "Er!vJ43CdxqzjWNB",
		"dbName" => "foxesworld_foxcms"
),

	"siteSettings" => array(
		"siteTpl" => "foxengine",
		"siteTitle" => "FoxesCraft",
		"siteStatus" => "PostAlpha",
		"siteDesc" => "A website engine",
		"keywords" => "FoxEngine,FoxCMS,FoxesWorld,AidenFox",
		"contactEmail" => "no-reply@foxesworld.ru",
		"contactPhone" => "null",
		"ServiceVersion" => "2.3.8"
),

	"securitySetings" => array(
		"reCaptchaSecret" => "6LcKeBoiAAAAAK-dFGsiDyqZvO_1u7MKWscdEJqJ",
		"reCaptchaWebsite" => "6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7",
		"bantime" => "240",
		"maxLoginAttempts" => "1",
		"reCaptchaCheck" => "on",
		"keyCheck" => "on"
),

	"frontendSettings" => array(
		"contentBlock" => "#content",
		"secureKey" => "ghYyufghVH",
		"assets" => "/templates/foxengine/assets/",
		"debug" => "on"
),

	"other" => array(
		"timezone" => "Europe/Moscow",
		"webserviceName" => "FoxEngine",
		"userOptions" => "userOptions",
		"OptionReplaceValues" => "{TPL}->228Year,{YEAR}->2023,{TES}->8800,{siteKey}->cfgVal(securitySetings|reCaptchaWebsite)",
		"userFieldsArray" => "user_id,email,login,password,user_group,realname,hash,reg_date,last_date,logged_ip,profilePhoto,userStatus,land,colorScheme,groupName,units",
		"canEditGroup" => "1,4"
));

?>