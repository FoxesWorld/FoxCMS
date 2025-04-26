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
					
				case "addServer":
					try {
						$updater = new GenericUpdater($db, 'servers', [
							"serverName", "host", "port", "ignoreDirs", "enabled", "checkLib",
							"serverGroups", "serverDescription", "serverVersion", "jreVersion", "serverImage"
						], false);

						if (empty($REQUEST['serverName'])) {
							throw new Exception("Имя сервера обязательно для заполнения");
						}

						// Приведение булевых значений
						foreach (['enabled', 'checkLib'] as $boolField) {
							if (isset($REQUEST[$boolField])) {
								$REQUEST['addServer'][$boolField] = ($REQUEST[$boolField] === 'true') ? 'true' : 'false';
							}
						}

						$result = $updater->updateData($REQUEST, 'serverName');

						die(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
					} catch (Exception $e) {
						die(json_encode([
							"type" => "error",
							"message" => "Ошибка при добавлении сервера: " . $e->getMessage()
						]));
					}
					break;

					
					case "infoBoxUpdate":
						$updater = new GenericUpdater($db, 'infobox', [
							'group_name', 'start_timestamp', 'end_timestamp', 'title', 'text', 'image', 'button_text', 'button_url'
						]);
						$result = $updater->updateData($REQUEST["infoBoxUpdate"], "group_name");
						die(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
					break;

				
				// Обработка запроса allBadgesUpdate в классе AdminOptions:
				case "allBadgesUpdate":
					$updater = new GenericUpdater($db, 'badgesList', [
						'badgeName', 'description', 'img'
					]);
					$result = $updater->updateData($REQUEST['allBadgesUpdate'], 'badgeName');
					die(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
				break;

				case "groupAssocUpdate":
					$updater = new GenericUpdater($db, 'groupAssociation', [
						'groupName', 'groupColor', 'groupNum', 'groupType'
					]);
					$result = $updater->updateData($REQUEST['groupAssocUpdate'], 'groupName');
					die(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
				break;

				case "editUserOnline":
					$this->updateUserField($db, 'serversOnline', $REQUEST);
				break;

                case "editUserBadges":
                    $this->updateUserField($db, 'badges', $REQUEST);
                    break;

                case "editUserBalance":
                    $this->updateUserField($db, 'balance', $REQUEST);
                    break;
					
				case "editPermissions":
					$permArray = json_decode(@$REQUEST['permissions'], true);
					if(is_array($permArray)) {
					$i = 1;

					try {
						foreach ($permArray as $permission) {
							$groupName = $permission['groupName'];
							$permName = $permission['permName'];
							$permValue = $permission['permValue'];

							$sql = "
								UPDATE groupPermissions SET groupName = :groupName, permName = :permName, 
								permValue = :permValue
								WHERE id = '".$i."'";

							$stmt = $db->prepare($sql);
							$stmt->bindParam(':groupName', $groupName, PDO::PARAM_STR);
							$stmt->bindParam(':permName', $permName, PDO::PARAM_STR);
							$stmt->bindParam(':permValue', $permValue, PDO::PARAM_STR);

							$stmt->execute();
							$i++;
						}
						die(json_encode(['type' => 'success', 'message' => "$i записей обновлено."]));
					} catch (Exception $e) {
						die(json_encode(['type' => 'error', 'message' => 'Ошибка при обновлении: ' . $e->getMessage()]));
					}
					} else die('{"message": "WIP!", "type": "warn"}');
				break;

                case "showModules":
                    $this->showModules();
                    break;
					
				case "selectUsers":
					die(json_encode($this->selectUsers($db)));
				break;

                case "showPermissions":
                    $this->showPermissions($db);
                    break;

                case "parseServers":
                    $this->parseServers($db, $REQUEST);
                    break;

                case "deleteServer":
                    $this->deleteServer($db, $REQUEST);
                    break;

                case "getAllBadges":
                    $this->getAllBadges($db);
                    break;

                case "loadUserBalance":
                    $this->loadUserBalance($db, $REQUEST);
                    break;

                case "getGameVersions":
                    	$versions = filesInDir::filesInDirArray(ROOT_DIR . UPLOADS_DIR . $config['launcherSettings']['gameFiles'].'versions');
						die(json_encode($versions));
                    break;
				
				case "getUserPlayTime":
					$userRow = $this->selectUsers($db, "WHERE `login` = '".$REQUEST['login']."'")[0];
					$serversOnline = $userRow['serversOnline'];
					die($serversOnline);
				break;


                case "getJavaVersions":
                    $this->getJavaVersions($config);
                    break;

                case "getServerPictures":
                    $this->getServerPictures($config);
                    break;

                case "scanTemplates":
                    $this->scanTemplates($REQUEST);
                    break;

                case "readFile":
                    $this->readFile($REQUEST);
                    break;

                case "updateFile":
                    $this->updateFile($REQUEST);
                    break;

                case "usersList":
                    $this->usersList($db, $REQUEST);
                    break;

                case "cfgParse":
                    $this->cfgParse();
                    break;

                case "setConfig":
                    $this->setConfig($REQUEST);
                    break;
					
				case "resetUserTop":
					$this->resetOnline($db);
					break;

                case "log":
                    $this->handleLog($REQUEST);
                    break;
					
				case "deleteLogFile":
					$this->handleLog($REQUEST, true);
				break;
            }
        } else {
            die('{"message": "Insufficient rights!"}');
        }
    }
	
    // Обновление данных пользователя
    private function updateUserField($db, $field, $REQUEST) {
        $login = $REQUEST['userLogin'];
        $value = $REQUEST[$field];
        $data = init::$sqlQueryHandler->updateData('users', array($field => $value), 'login', $login);
        die($data);
    }

    // Показать доступные модули
    private function showModules() {
        die(json_encode(init::$modulesArray));
    }

    // Показать разрешения
    private function showPermissions($db) {
        $query = 'SELECT * FROM `groupPermissions`';
        $permArr = $db->getRows($query);
        die(json_encode($permArr));
    }

    // Парсинг серверов
    private function parseServers($db, $REQUEST) {
        init::classUtil('ServerParser', "1.0.0");
        $serverParser = new ServerParser($db, init::$usrArray['login'], true);
        die($serverParser->parseServers(@$REQUEST['server']));
    }

    // Удаление сервера
    private function deleteServer($db, $REQUEST) {
        $serverName = @$REQUEST['serverId'];
        $query = "DELETE FROM `servers` WHERE id = '".$serverName."'";
        $data = $db->run($query);
        if($data) {
            die('{"message": "Server '.$serverName.' removed!", "type": "success"}');
        }
    }
	
	private function selectUsers($db, $where = ""){
		$selector = new GenericSelector($db, 'users');
        $rows = $selector->select($where);
        return $rows;
	}
	
	private function resetOnline($db){
		$users = $this->selectUsers($db);
    
		foreach ($users as $user) {
			$newValue = '[]';
			$updateQuery = "UPDATE `users` SET `serversOnline` = :someField WHERE `user_id` = :userId";
			$stmt = $db->prepare($updateQuery);
			$stmt->bindParam(':someField', $newValue, PDO::PARAM_STR);
			$stmt->bindParam(':userId', $user['user_id'], PDO::PARAM_INT);
			$stmt->execute();
		}
		die('{"message": "Cleared '.count($users).'", "type": "success"}');
	}

	private function getAllBadges($db) {
		$selector = new GenericSelector($db, 'badgesList');
		$data = $selector->select();

		// Убедимся, что результат — это массив
		if (!is_array($data)) {
			http_response_code(500);
			die(json_encode([
				"status" => "error",
				"message" => "Ошибка при получении данных из базы"
			]));
		}

		// Возвращаем как JSON
		header('Content-Type: application/json');
		die(json_encode($data));
	}

    // Получить баланс пользователя
	private function loadUserBalance($db, $REQUEST) {
		$login = $REQUEST['userLogin'] ?? null;
		if (!$login) {
			die('0');
		}

		$selector = new GenericSelector($db, 'users', ['login', 'balance']);
		$rows = $selector->select(['login' => $login], [], 1);

		$balance = $rows[0]['balance'] ?? '0';
		die($balance);
	}


    // Получение файлов в директории
    private function getFilesInDir($config, $dirKey, $REQUEST) {
        $dir = ROOT_DIR . UPLOADS_DIR . $config['launcherSettings'][$dirKey];
        $files = filesInDir::filesInDirArray($dir);
        die(json_encode($files));
    }

    // Получить версии Java
    private function getJavaVersions($config) {
        $java = filesInDir::filesInDirArray(ROOT_DIR . UPLOADS_DIR . $config['launcherSettings']['jreDir']);
        $outputArr = array_map(fn($jre) => str_replace(".zip", "", $jre), $java);
        die(json_encode($outputArr));
    }

    // Получить картинки серверов
    private function getServerPictures($config) {
        $imgDir = "/templates/".$config['siteSettings']['siteTpl']. DIRECTORY_SEPARATOR . $config['launcherSettings']['serverPictures'];
        $imgs = filesInDir::filesInDirArray(ROOT_DIR . $imgDir);
        $outputArr = array_map(fn($img) => $imgDir . $img, $imgs);
        die(json_encode($outputArr));
    }

    // Сканирование шаблонов
    private function scanTemplates($REQUEST) {
        $inDirScanner = new inDirScanner(ROOT_DIR.'/templates/', @$REQUEST['path'], "*");
        die(json_encode($inDirScanner->scanDirectory()));
    }

    // Чтение файла
    private function readFile($REQUEST) {
        die(file::efile(ROOT_DIR.@$REQUEST['path'])['content']);
    }

    // Обновление файла
    private function updateFile($REQUEST) {
        $updater = file::efile(ROOT_DIR.@$REQUEST['filePath'], false, @$REQUEST['fileContents']);
        $status = $updater['status'] === "true" ? "success" : "warn";
        die('{"message": "'.$updater['message'].'", "status": "'.$status.'"}');
    }

    // Список пользователей
    private function usersList($db, $REQUEST) {
        die(json_encode(new UsersList($db, $REQUEST)));
    }

    // Разбор конфигурации
    private function cfgParse() {
        init::classUtil('ConfigUtils', "1.0.0");
        $cfg = new ConfigParser();
        die($cfg->buildConfigPage());
    }

    // Установка конфигурации
    private function setConfig($REQUEST) {
        init::classUtil('ConfigUtils', "1.0.0");
        die(ConfigParser::buildConfig(RequestHandler::$REQUEST));
    }

    // Обработка логов
    private function handleLog(array $REQUEST, bool $delete = false) {
        $file = @$REQUEST['file'];
        $logfile = ENGINE_DIR. 'cache/logs/'.$file.'.log';
		
		if ($delete) {
			if (!file_exists($logfile)) {
				die('{"message": "File '.$logfile.' not found!!"}');
			} else {
				if(unlink($logfile)){
					die('{"message": "Logfile deleted!", "type": "success"}');
				}
			}
		}
        if (file_exists($logfile)) {
            $lines = $this->getLastLines($logfile, @intval(@$REQUEST['lines']));
            if ($lines !== false) {
                foreach ($lines as $line) {
                    echo $line . "\n";
                }
            } else {
                die('{"message": "Not as long!"}');
            }
        } else {
            die('{"message": "File '.$logfile.' not found"}');
        }
		die();
    }

    // Получить последние строки из файла
    private function getLastLines($filename, $numLines = 50) {
        $lines = array();
        $handle = fopen($filename, "r");

        if ($handle) {
            fseek($handle, -1, SEEK_END);
            $position = ftell($handle);
            $buffer = "";
            while ($position > 0 && count($lines) < $numLines) {
                $position--;
                fseek($handle, $position);
                $char = fgetc($handle);
                if ($char === "\n") {
                    array_unshift($lines, $buffer);
                    $buffer = "";
                } else {
                    $buffer = $char . $buffer;
                }
            }

            if ($buffer !== "") {
                array_unshift($lines, $buffer);
            }

            fclose($handle);
        } else {
            return false;
        }

        return $lines;
    }
}
?>
