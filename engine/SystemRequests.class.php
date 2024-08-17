<?php
/*FoxesModule%>
{
	"version": "V 1.1.0 Alpha",
	"description": "Basic requests",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUUyREI3NUM5OEU5MTFFQkExRjNFQURDNDZFMzk0MTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUUyREI3NUQ5OEU5MTFFQkExRjNFQURDNDZFMzk0MTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTJEQjc1QTk4RTkxMUVCQTFGM0VBREM0NkUzOTQxNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTJEQjc1Qjk4RTkxMUVCQTFGM0VBREM0NkUzOTQxNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuDJtPwAAAVWSURBVHja7FptaFtVGL7nnHvTLLRZ2mxtZz/2EWtYTVv2UdEKSv2ogjIonT9kf4SBboMOFH+JoD/8sakofvxw4vDHfkxBp45NEQRhKnYbLWu3tLOzaQcbNnVN03SkTe6X70nuvblN7m2b9qQyuJdQkpxzn/e573nPc973TdHC+W7uXrswdw9eDmmHtEPaIe2Qdkg7pOnFM8AgZbh6N65sxr4mzu1HZZUcwpyqqOIcl4wq8RvKzLAyNcDJKVak0VoSJlSxlezYR2of5siGZabK8/Jknxw5q87d/N9II3clv/MgBrqoqABTlX/+lEZOqgsz6x0eeMsjQugwJ5TnuKRnlehFFSIhMc6lEzQSSBnn8mLvdlTVjP2tyO3PPize0uGq3iUOfQrs18/TfPAACfTk6MZHpbFvlKl+TlXtjSBcvYcP7Ee+B3LxEvlOun5qPUjzLYdIQ5fhXSn8eVEOgyXiH3wZuTZqvG//Kg1+UlrJoz42GMdHxd9fK3aJYT69KxbWVKeuEzBLSBrX7DWiQvl3IH3xLfNm4psPCu1vcoIn/zbBA9/DaC6cFmbEy+8AgsY70APuLwlp5KoQWo/mfDzwnll0QUnItufw5t3YF8xH9wXhexiFOSb5SwEC4GjPFToM+OxJE1jEjFZAHIsDx/OPCUR0MFIAT/Ln5HgfB7QM63Ky8yXGpJGnhtQ/pdka+XKNEmuOE0DTnHLf42CFJWkS6M6eIGoiIt++wDCFADQtSBCmVpiRxjyp7ci+lca+ZZ76SOM/aK4BK5hnQxr7W4xoVqKXmZMGTCOyqS02pKuaDZnjFMl2nniXvhS5gJSsDdmylgz5w/4Qm9wDQbaZ3TexYesJG3fA3/Slt80fzTmJNuTyIpdXhcyk4LSnyHWd2ZyREWlPrQZ995bFaHm969H3Vx4M6d9eLUxNDWRAYxMehuyrqbjVMGGgfTryyo+Y5dRDz+5pGWJhUGahIEndlptRPi3PZ3kj3qOKycKVTf/xOk07m15chtiN05C+WpctkHlrthbYeDpH1OW1njAbgUJweTvJKJ1peenIhU5ZLenkpDZvxbuk6JTNQF6YZkQ6MaFrWZPtnPTcyneblWhqyFC3syEN1b+eT7fbEpr9GwrWpctZqtC2mXp7nq01k74zyCki9ceGauN0LPS0Mtm3FMhkn91qACYgZyaJ1BYbyROTRspBtu+zFYfwCXV+yvqR5qdg1FZRdUxqhdVGpIQiZ/R1fGgJZ4tQgCUiBVsiQr+3c/PmXUZsyDd/ZJlPg1Qp0UuaqrcdtSgENZ2Jiv3H8tep/5hqJ4ikjA+9AnFH3Tw9pMSGWZKmzoYSA06ZTGQLoSMsunFIaO01olkKf8G+RgRvSddO6L2LDr7lkM3xmVokI/DepukIPgYc/bD82jIbY9BCgNJInjivLWxDF9/WW1hoQOymftpvfIT3FtGMebjX6J9A4MljZ0rYy5OGT3JEyNojdZ3YGxCHPrY9nC2DomKr0NaLvFrOrcTC4pUPS96AlK5+xqXi5P4XaFRWNLo63pVv/SKPn1t2fWlJH+iGR+WwYJRC4pUPVte0LrprKo1+pcz8xbccoY1QqKIbukjD08r0VeXOkBoLq5mTaJFI1D2G65/AVSFTU1iVI99Lo6eXqt8YNiDN/S4+0EO2PW94rjCnTf18ANfsFfa8sSju46OgRfDYa9Ge1f58ISal66fkiXOk8Rlc/6TefjYd3bGRzLYTzAeNPH6WSecEMfl/D1wZRJtasS8IdR5yb1Ji16TBj2gvCiHS+CznKqcVQDFbdj1Ir/Pl/I7okHZIO6Qd0g5phzS9/hNgANvDX2ntSPd1AAAAAElFTkSuQmCC"
}
<%FoxesModule*/

		class SystemRequests extends RequestHandler {
		
			private $requestHeader = "sysRequest";
			protected $db, $logger;
			
			function __construct($db, $logger) {
				init::classUtil('inDirScanner', "1.1.3");
				init::classUtil('ImageResize', "1.0.0");
				$this->db = $db;
				$this->logger = $logger;
			}
			
			public function requestListener(){
				global $config, $lang;
				if(isset(RequestHandler::$REQUEST[$this->requestHeader])){
					switch(RequestHandler::$REQUEST[$this->requestHeader]) {
						
						case "tplScan":
							$inDirScanner = new inDirScanner(CURRENT_TEMPLATE, @RequestHandler::$REQUEST['path'], "*");
							die($inDirScanner->getFiles());
						break;

						case "parseEmojis":
							init::classUtil('EmojiParser', "1.0.0");
							die(json_encode(new EmojiParser()));
						break;
						
						case "startUpSound":
							$startUpSound = new startUpSound;
							$startUpSound->generateAudio();
						break;
						
						case "selectUsers":
							$SelectUsers = new SelectUsers($this->db, "users");
							die($SelectUsers->selectUsersBy(@RequestHandler::$REQUEST['selectKey'], "'".@RequestHandler::$REQUEST['selectValue']."'"));
						break;
						
						case "parseServers":
						//if($_SERVER['HTTP_USER_AGENT'] === "FoxesWorldLauncher"){
							init::classUtil('ServerParser', "1.0.0");
								$serverParser = new ServerParser($this->db, @RequestHandler::$REQUEST['login'] ?? init::$usrArray['login']);
								die($serverParser->parseServers(@RequestHandler::$REQUEST['server']));
						//}
						break;
						
						case "getLangPack":
							if(isset($lang[@RequestHandler::$REQUEST['langPackKey']])) {
								die(json_encode($lang[@RequestHandler::$REQUEST['langPackKey']], JSON_UNESCAPED_UNICODE));
							}
						break;
						
						case "parseMonitor":
							init::classUtil('ServerParser', "1.0.0");
							$serverParser = new ServerParser($this->db, init::$usrArray['login']);
							$Monitor = new foxesMon($serverParser->parseServers(), array('out'=> 2, 'record_day' => 86400));
							die($Monitor->foxMonOut());
						break;
						
						case "mailTest":
							$foxMail = new foxMail(true);
							$foxMail->send(@RequestHandler::$REQUEST['mail'], "TEST", @RequestHandler::$REQUEST['msg']);
							die();
						break;
						
						case 'skin':
							if($_SERVER['HTTP_USER_AGENT'] === "FoxesWorldLauncher"){
								init::classUtil('SkinViewer', "1.0.0");
								header("Content-type: text/plain");
								$show = @RequestHandler::$REQUEST['show'] ?? null;
								$file_name = @RequestHandler::$REQUEST['login'] ?? null;
								$name = empty($file_name) ? 'default' : $file_name;
								$skin = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . $name . DIRECTORY_SEPARATOR . 'skin.png';
								$cloak = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . $name . DIRECTORY_SEPARATOR . 'cape.png';

								if (!skinViewer2D::isValidSkin($skin)) {
									$skin = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER  . DIRECTORY_SEPARATOR . 'skin.png';
								}

								if ($show !== 'head') {
									$side = isset($_GET['side']) ? $_GET['side'] : false;
									$img = skinViewer2D::createPreview($skin, $cloak, $side);
								} else {
									$img = skinViewer2D::createHead($skin, 64);
								}

								ob_start();
								imagepng($img);
								$image_data = ob_get_contents();
								ob_end_clean();

								$base64_image = base64_encode($image_data);

								die($base64_image);
							}
							break;

							case "skinPath":
								die('{"skin": "'.str_replace(ROOT_DIR, "", init::$usrFiles['skin']).'", "cape": "'.str_replace(ROOT_DIR, "", init::$usrFiles['cape']).'"}');
							break;
							
							case "skinPreview":						
								init::classUtil('SkinViewer', "1.0.0");
								$file_name = @RequestHandler::$REQUEST['login'] ?? null;
								$name = empty($file_name) ? 'default' : $file_name;
								$skin = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . $name . DIRECTORY_SEPARATOR . 'skin.png';
								$cloak = ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . $name . DIRECTORY_SEPARATOR . 'cape.png';
								if (file_exists($skin)) {
									$im = skinViewer2D::createPreview($skin, $cloak, @RequestHandler::$REQUEST['side']);
								} else {
									$im = skinViewer2D::createPreview(ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER . DIRECTORY_SEPARATOR . 'skin.png', $cloak, @RequestHandler::$REQUEST['side']);
								}
							
								//header('Content-Type: image/png');
								//imagepng($im);
								ob_start();
								imagepng($im);
								$image_data = ob_get_contents();
								ob_end_clean();
								
								$base64_image = base64_encode($image_data);
								die($base64_image);

							break;
							
							case "uploadFile":
								$type = @RequestHandler::$REQUEST['type'];
								switch($type){
									case "skin":
										die('{"message": "Загрузка скина для '.init::$usrArray['login'].' в разработке!", "type": "warn"}');
									break;
									
									case "cloak":
										init::classUtil('CapeUpload', "1.0.0");
										$perms = array( 
											"skin"=>"64",
											"cloak"=>"64",
											"hd_skin" => "1024",
											"hd_cloak" => "1024"
										);
										$capeUpload = new CapeUpload(init::$usrArray['login'], $perms);
										$capeUpload->uploadCloak(ROOT_DIR . UPLOADS_DIR . USR_SUBFOLDER .init::$usrArray['login'] . '/', "cape.png");
										die('{"message": "Загрузка плащей в разработке!", "type": "warn"}');
									break;
								}
							break;
							
								
							
							case "deleteFile":
								$type = @RequestHandler::$REQUEST['type'];
								switch($type){
									case "skin":
										die('{"message": "Удаление скинов в разработке!", "type": "warn"}');
									break;
										
									case "cloak":
										if(init::$usrArray['isLogged']){
											if(@file_exists(init::$usrFiles['cape'])) {
												if(unlink(init::$usrFiles['cape'])){
													die('{"message": "Плащ удален!", "type": "success"}');
												}
											} else {
												die('{"message": "У вас нет плаща!"}');
											}
										} else {
											die('{"message": "You are not logged!"}');
										}
									break;
								}
							break;
						
						case "loadFiles":
						if($_SERVER['HTTP_USER_AGENT'] === "FoxesWorldLauncher"){
						init::classUtil('GameScanner', "1.0.0");
							$gameScanner = new GameScanner(@RequestHandler::$REQUEST['client'], @RequestHandler::$REQUEST['version'], @RequestHandler::$REQUEST['platform']);
							die($gameScanner->checkfiles());
						} else {
							die('{"message": "Invalid Agent!"}');
						}
						break;
						
						case "getJre":
							init::classUtil('GetJre', "1.0.0");
							$getJre = new GetJre(@RequestHandler::$REQUEST['jreVersion']);
							$getJre->getRuntime();
						break;
						
						case  "scanUploads":
							$inDirScanner = new inDirScanner(ROOT_DIR.UPLOADS_DIR, @RequestHandler::$REQUEST['path'], @RequestHandler::$REQUEST['mask']);
							die($inDirScanner->getFiles());
						break;
						
						case "downloadLatest":
							init::classUtil("SelectLatestVersion", "1.0.0"); // <-- To remove
							//$downloadScanner = new inDirScanner(ROOT_DIR.UPLOADS_DIR."launcher", @RequestHandler::$REQUEST['platform'], ".jar"); // <-- to implement
							$selectLatestVersion = new SelectLatestVersion(ROOT_DIR.UPLOADS_DIR."launcher");
							die($selectLatestVersion->getFile());
						break;

						case "downloadUpdater":
							$path = ROOT_DIR.UPLOADS_DIR."updater";
							$subDir = "/".@RequestHandler::$REQUEST['type'];
							$downloadScanner = new inDirScanner($path, $subDir, "*");
							$file = $this->selectLatest($downloadScanner->filesArray);
							die('{"filename": "'.$file['name'].'", "fileHash": "'.md5_file($path.$subDir.DIRECTORY_SEPARATOR.$file['name']).'"}');
						break;
						
						case "getImg":
							$fullPath = ROOT_DIR.RequestHandler::$REQUEST['path'];
							$parentDir = explode('/',$fullPath)[6];
							$fileData = pathinfo($fullPath);
							$cachePath = ENGINE_DIR.'cache/tmp/'.$parentDir.DIRECTORY_SEPARATOR;
							if(!is_dir($cachePath)){
								mkdir($cachePath);
							}
							$width = @RequestHandler::$REQUEST['width'] ?? 60;
							$height = @RequestHandler::$REQUEST['height'] ?? 60;
							$resizedName = $fileData['filename'].'-'.$width.'-'.$height.'.'.$fileData['extension'];
							if(!file_exists($cachePath.$resizedName)) {
								$this->resizeImage($fullPath, $cachePath, $width, $height);
							}
							$path = str_replace(ROOT_DIR, "", $cachePath);
							die($path.$resizedName);
						break;
						
						default:
							die('{"message": "Unknown sysRequest option!"}');
						break;
					}
				}
			}
			
			//WIP
			private function resizeImage($imgPath, $savePath, $width, $height){
				$extensionsArr = array('png', 'jpg', 'jpeg');
				$fileData = pathinfo($imgPath);
					if(in_array($fileData['extension'], $extensionsArr)) {
						$resizeObj = new resize($imgPath);
						$resizeObj -> resizeImage($width, $height, 'exact');
						$resizedName = $fileData['filename'].'-'.$width.'-'.$height.'.'.$fileData['extension'];
						$resizeObj -> saveImage($savePath.$resizedName, 100);
						return true;
					}
					return false;
			}
			
			
			  private function selectLatest($files) {
				usort($files, function($a, $b) {
					return version_compare($b['name'], $a['name']);
				});

				return reset($files);
			} 
		}
?>