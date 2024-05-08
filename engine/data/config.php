<?php 
    /* [08.05.2024] */
$config = array(
	"database" => array(
		"dbHost" => "localhost",
		"dbUser" => "foxesworld",
		"dbPass" => "Er!vJ43CdxqzjWNB",
		"dbName" => "foxesworld_foxcms"
),

	"siteSettings" => array(
		"lang" => "ru",
		"siteTpl" => "foxengine2",
		"siteTitle" => "Лисий Мир",
		"siteStatus" => "Experimental",
		"siteDesc" => "Независимая игровая студия",
		"keywords" => "FoxEngine,FoxCMS,FoxesWorld,AidenFox,Лисий Мир,Независимая студия,Независимая игровая студия,Over Fox,OverFox,мистер лис craft,fox craft browser game,foxcraft дэйз,фокс крафт айли,foxes craft,fox craft,foxcraft,Indie,GameDev Indie,Game,GameDev,лисиный мир,leks craft,fox craft minecraf,лиса сафт,лисьи огни сайт,craft fox,fox craft shri,foxy's craft gallery",
		"contactEmail" => "no-reply@foxesworld.ru",
		"contactPhone" => "null",
		"ServiceVersion" => "2.4.19"
),

	"launcherSettings" => array(
		"gameFiles" => "files/clients/",
		"serverPictures" => "assets/img/servers/",
		"jreDir" => "files/runtime/"
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

	"monitor" => array(
		"dayRecordPath" => "/var/www/FoxCMS/engine/cache/tmp/record_day.log",
		"absoluteRecordPath" => "/var/www/FoxCMS/engine/cache/tmp/record.log",
		"tempFilePath" => "/var/www/FoxCMS/engine/cache/tmp/timefile.log"
),

	"other" => array(
		"appId" => "712667904956432456",
		"accessToken" => "ccdd6e40ccdd6e40ccdd6e40ecccaf012ecccddccdd6e4092074eb9f3eea48edf8a6e39",
		"discordLink" => "https://discord.gg/mHhvevY4RF",
		"vkLink" => "https://vk.com/foxesworlds1",
		"timezone" => "Europe/Moscow",
		"webserviceName" => "FoxEngine",
		"userOptions" => "userOptions",
		"OptionReplaceValues" => "{siteKey}->cfgVal(securitySetings|reCaptchaWebsite),{discordLink}->cfgVal(other|discordLink),{vkLink}->cfgVal(other|vkLink),{TPL}->cfgVal(siteSettings|siteTpl),{lang}->cfgVal(siteSettings|lang)",
		"userFieldsArray" => "user_id,email,login,password,user_group,realname,hash,reg_date,last_date,logged_ip,profilePhoto,userStatus,land,colorScheme,groupName,units,badges",
		"canEditGroup" => "1,4"
));

?>