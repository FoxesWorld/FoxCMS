<?php
/*FoxesModule%>
{
	"version": "V 1.1.0 Alpha",
	"description": "Basic requests",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUUyREI3NUM5OEU5MTFFQkExRjNFQURDNDZFMzk0MTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUUyREI3NUQ5OEU5MTFFQkExRjNFQURDNDZFMzk0MTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTJEQjc1QTk4RTkxMUVCQTFGM0VBREM0NkUzOTQxNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTJEQjc1Qjk4RTkxMUVCQTFGM0VBREM0NkUzOTQxNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuDJtPwAAAVWSURBVHja7FptaFtVGL7nnHvTLLRZ2mxtZz/2EWtYTVv2UdEKSv2ogjIonT9kf4SBboMOFH+JoD/8sakofvxw4vDHfkxBp45NEQRhKnYbLWu3tLOzaQcbNnVN03SkTe6X70nuvblN7m2b9qQyuJdQkpxzn/e573nPc973TdHC+W7uXrswdw9eDmmHtEPaIe2Qdkg7pOnFM8AgZbh6N65sxr4mzu1HZZUcwpyqqOIcl4wq8RvKzLAyNcDJKVak0VoSJlSxlezYR2of5siGZabK8/Jknxw5q87d/N9II3clv/MgBrqoqABTlX/+lEZOqgsz6x0eeMsjQugwJ5TnuKRnlehFFSIhMc6lEzQSSBnn8mLvdlTVjP2tyO3PPize0uGq3iUOfQrs18/TfPAACfTk6MZHpbFvlKl+TlXtjSBcvYcP7Ee+B3LxEvlOun5qPUjzLYdIQ5fhXSn8eVEOgyXiH3wZuTZqvG//Kg1+UlrJoz42GMdHxd9fK3aJYT69KxbWVKeuEzBLSBrX7DWiQvl3IH3xLfNm4psPCu1vcoIn/zbBA9/DaC6cFmbEy+8AgsY70APuLwlp5KoQWo/mfDzwnll0QUnItufw5t3YF8xH9wXhexiFOSb5SwEC4GjPFToM+OxJE1jEjFZAHIsDx/OPCUR0MFIAT/Ln5HgfB7QM63Ky8yXGpJGnhtQ/pdka+XKNEmuOE0DTnHLf42CFJWkS6M6eIGoiIt++wDCFADQtSBCmVpiRxjyp7ci+lca+ZZ76SOM/aK4BK5hnQxr7W4xoVqKXmZMGTCOyqS02pKuaDZnjFMl2nniXvhS5gJSsDdmylgz5w/4Qm9wDQbaZ3TexYesJG3fA3/Slt80fzTmJNuTyIpdXhcyk4LSnyHWd2ZyREWlPrQZ995bFaHm969H3Vx4M6d9eLUxNDWRAYxMehuyrqbjVMGGgfTryyo+Y5dRDz+5pGWJhUGahIEndlptRPi3PZ3kj3qOKycKVTf/xOk07m15chtiN05C+WpctkHlrthbYeDpH1OW1njAbgUJweTvJKJ1peenIhU5ZLenkpDZvxbuk6JTNQF6YZkQ6MaFrWZPtnPTcyneblWhqyFC3syEN1b+eT7fbEpr9GwrWpctZqtC2mXp7nq01k74zyCki9ceGauN0LPS0Mtm3FMhkn91qACYgZyaJ1BYbyROTRspBtu+zFYfwCXV+yvqR5qdg1FZRdUxqhdVGpIQiZ/R1fGgJZ4tQgCUiBVsiQr+3c/PmXUZsyDd/ZJlPg1Qp0UuaqrcdtSgENZ2Jiv3H8tep/5hqJ4ikjA+9AnFH3Tw9pMSGWZKmzoYSA06ZTGQLoSMsunFIaO01olkKf8G+RgRvSddO6L2LDr7lkM3xmVokI/DepukIPgYc/bD82jIbY9BCgNJInjivLWxDF9/WW1hoQOymftpvfIT3FtGMebjX6J9A4MljZ0rYy5OGT3JEyNojdZ3YGxCHPrY9nC2DomKr0NaLvFrOrcTC4pUPS96AlK5+xqXi5P4XaFRWNLo63pVv/SKPn1t2fWlJH+iGR+WwYJRC4pUPVte0LrprKo1+pcz8xbccoY1QqKIbukjD08r0VeXOkBoLq5mTaJFI1D2G65/AVSFTU1iVI99Lo6eXqt8YNiDN/S4+0EO2PW94rjCnTf18ANfsFfa8sSju46OgRfDYa9Ge1f58ISal66fkiXOk8Rlc/6TefjYd3bGRzLYTzAeNPH6WSecEMfl/D1wZRJtasS8IdR5yb1Ji16TBj2gvCiHS+CznKqcVQDFbdj1Ir/Pl/I7okHZIO6Qd0g5phzS9/hNgANvDX2ntSPd1AAAAAElFTkSuQmCC"
}
<%FoxesModule*/
		$SystemRequests = new SystemRequests($this->db);
		$SystemRequests->requestListener();
		class SystemRequests extends init {
		
			private $requestHeader = "sysRequest";
			protected $db;
			
			function __construct($db) {
				init::classUtil('inDirScanner', "1.0.0");
				//init::classUtil('Playlist', "1.0.0");
				$this->db = $db;
			}
			
			public function requestListener(){
				global $config;
				if(isset(RequestHandler::$REQUEST[$this->requestHeader])){
					switch(RequestHandler::$REQUEST[$this->requestHeader]) {
						case "tplScanAmount":
							$inDirScanner = new inDirScanner(TEMPLATE_DIR, @RequestHandler::$REQUEST['path']);
							die($inDirScanner->getFilesNum());
						break;

						case "tplFileNamesScan":
							$inDirScanner = new inDirScanner(TEMPLATE_DIR, @RequestHandler::$REQUEST['path']);
							die($inDirScanner->getFiles());
						break;
						
						case "scanPlaylists":
							$albums = new Playlist();
							die($albums->scanPlayListsDir());
						break;
						case "scanAlbum":
							$scanplaylist = new Playlist(@RequestHandler::$REQUEST['album']);
							die($scanplaylist->formPlaylist());
						break;
						
						case "replaceArray":
							$replaceArray = array_merge($config['javascript'], init::$usrArray);
							foreach($replaceArray as $key => $value){
								$replaceFields[] = '"'.$key.'"';
								if(!is_array($value)) {
									$jsData[] = '"'.$key.'": "'.$value.'"';
								} else {
									foreach($value as $arrVal){
										$thisArr[] = '"'.$arrVal.'"';
									}
									$jsData[] = '"'.$key.'"'.':['.implode(",", $thisArr).']';
								}
							}
							die('{'.implode(",", $jsData).'}');
						break;
						
						case "startUpSound":
							$startUpSound = new startUpSound;
							$startUpSound->generateAudio();
						break;
						
						case "sqlQuery":
						if(init::$usrArray['isLogged']){
							if(init::$usrArray['groupTag'] === "admin"){
								if(@RequestHandler::$REQUEST['query']){
									if($this->db->run(RequestHandler::$REQUEST['query'])){
										functions::jsonAnswer("Changed!!!");
									}
								} else {
									functions::jsonAnswer("Empty query!", true);
								}
							} else {
								functions::jsonAnswer("Insufficent rights!", true);
							}
						}
						break;
						
						default:
							die('{"message": "Unknown sysRequest option!"}');
						break;
					}
				}
			} 	
		}