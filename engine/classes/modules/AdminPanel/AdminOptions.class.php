<?php
if(!defined("ADMIN")){
	die();
}

	class AdminOptions extends AdminPanel {
		
		function __construct($REQUEST, $db) {
			global $config;
			if(init::$usrArray['user_group'] == 1) {
				switch($REQUEST["admPanel"]){
					
					case "editServer":
						$editServer = new EditServer($db);
						$editServer->updateServer(RequestHandler::$REQUEST);
					break;
					
					case "editUserBadges":
					$login = RequestHandler::$REQUEST['userLogin'];
					$badges = RequestHandler::$REQUEST['badges'];
					$data = $db->getValue("UPDATE `users` SET `badges`='".$badges."' WHERE `login` = '".$login."'");
					if($data) {
							$status ="success";
						} else {
							$status = "warn";
						}
						die('{"message": "success", "type": "success"}');
					break;
					
					case "showModules":
						die(json_encode(init::$modulesArray));
					break;
					
					case "parseServers":
					init::classUtil('ServerParser', "1.0.0");
						$serverParser = new ServerParser($db, @RequestHandler::$REQUEST['login'], true);
						die($serverParser->parseServers(@RequestHandler::$REQUEST['server']));
					break;
					
					case "getAllBadges":
						$query = 'SELECT `badgeName` FROM `badgesList`';
						$badgesArr = array();
						$data = $db->getRows($query);
						foreach($data as $key){
							$badgesArr[] = $key['badgeName'];
						}
						die(json_encode($badgesArr));
					break;
					
					case "getGameVersions":
						$versions = filesInDir::filesInDirArray(ROOT_DIR . UPLOADS_DIR . $config['launcherSettings']['gameFiles'].'versions');
						die(json_encode($versions));
					break;

					case "getJavaVersions":
						$java = filesInDir::filesInDirArray(ROOT_DIR . UPLOADS_DIR . $config['launcherSettings']['jreDir']);
						$outputArr = array();
						foreach($java as $jre){
							$outputArr[] = str_replace(".zip", "" , $jre);
						}
						die(json_encode($outputArr));
					break;

					case "getServerPictures":
					$imgDir = "/templates/".$config['siteSettings']['siteTpl']. DIRECTORY_SEPARATOR . $config['launcherSettings']['serverPictures'];
						$imgs = filesInDir::filesInDirArray(ROOT_DIR . $imgDir);
						$outputArr = array();
						foreach($imgs as $img){
							$outputArr[] = $imgDir.$img;
						}
						die(json_encode($outputArr));
					break;
					
					case "scanTemplates":
						$inDirScanner = new inDirScanner(ROOT_DIR.'/templates/', @RequestHandler::$REQUEST['path'], "*");
						die(json_encode($inDirScanner->scanDirectory()));
					break;
					
					case "readFile":
						die(file::efile(ROOT_DIR.@RequestHandler::$REQUEST['path'])['content']);
					break;
					
					case "updateFile":
						$updater = file::efile(ROOT_DIR.@RequestHandler::$REQUEST['filePath'], false, @RequestHandler::$REQUEST['fileContents']);
						if($updater['status'] === "true") {
							$status ="success";
						} else {
							$status = "warn";
						}
						die('{"message": "'.$updater['message'].'", "status": "'.$status.'"}');
					break;
					
					case "usersList":
						die(json_encode(new UsersList($db, $REQUEST)));
					break;
					
					case "groupAssoc":
						die(json_encode(new GroupAssocAdmin($db)));
					break;
					
					case "cfgParse":
						init::classUtil('ConfigUtils', "1.0.0");
						$cfg = new ConfigParser();
						die($cfg->buildConfigPage());
					break;
					
					case "setConfig":
						init::classUtil('ConfigUtils', "1.0.0");
						die(ConfigParser::buildConfig(RequestHandler::$REQUEST));
					break;
				}
			} else {
				die('{"message": "Insufficent rights!"}');
			}
		}		
	}
