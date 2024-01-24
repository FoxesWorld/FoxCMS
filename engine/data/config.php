<?php 
    /* [23.01.2024] */
$config = array(
	"database" => array(
		"dbHost" => "localhost",
		"dbUser" => "foxesworld",
		"dbPass" => "Er!vJ43CdxqzjWNB",
		"dbName" => "foxesworld_foxcms"
),

	"siteSettings" => array(
		"siteTpl" => "foxengine2",
		"siteTitle" => "Лисий Мир",
		"siteStatus" => "Экспериментальный",
		"siteDesc" => "Независимая игровая студия",
		"keywords" => "FoxEngine,FoxCMS,FoxesWorld,AidenFox,Лисий Мир,Независимая студия,Независимая игровая студия,Over Fox,мистер лис craft,fox craft browser game,foxcraft дэйз,фокс крафт айли,foxes craft,fox craft,foxcraft,Indie,GameDev Indie,Game,GameDev",
		"contactEmail" => "no-reply@foxesworld.ru",
		"contactPhone" => "null",
		"gameFiles" => "files/clients/",
		"jreDir" => "files/runtime/",
		"ServiceVersion" => "2.4.12"
),

	"securitySetings" => array(
		"reCaptchaSecret" => "6LcKeBoiAAAAAK-dFGsiDyqZvO_1u7MKWscdEJqJ",
		"reCaptchaWebsite" => "6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7",
		"bantime" => "240",
		"maxLoginAttempts" => "2",
		"reCaptchaCheck" => true
),

	"frontendSettings" => array(
		"contentBlock" => "#content",
		"secureKey" => "ghYyufghVH",
		"assets" => "/templates/foxengine2/assets/"
),

	"other" => array(
		"appId" => "712667904956432456",
		"accessToken" => "ccdd6e40ccdd6e40ccdd6e40ecccaf012ecccddccdd6e4092074eb9f3eea48edf8a6e39",
		"discordLink" => "https://discord.gg/96pZFx3cFh",
		"vkLink" => "https://vk.com/foxesworlds",
		"timezone" => "Europe/Moscow",
		"webserviceName" => "FoxEngine",
		"userOptions" => "userOptions",
		"OptionReplaceValues" => "{siteKey}->cfgVal(securitySetings|reCaptchaWebsite),{discordLink}->cfgVal(other|discordLink),{vkLink}->cfgVal(other|vkLink),{TPL}->cfgVal(siteSettings|siteTpl)",
		"userFieldsArray" => "user_id,email,login,password,user_group,realname,hash,reg_date,last_date,logged_ip,profilePhoto,userStatus,land,colorScheme,groupName,units,badges",
		"canEditGroup" => "1,4"
));

?>