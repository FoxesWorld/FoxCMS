<?php
if(!defined('FOXXEY')) {
	die("Hacking attempt!");
}
	$advRequest = trim(strip_tags(stripslashes(@$_REQUEST['advert'])));
	$notifyParser = new notifyParser($advRequest, $this->db);
	
	class notifyParser {
		
		private $db;
		
		function __construct($advRequest, $db){
		global $config;
			if($advRequest){
				$this->db = $db;
			/*
				if($is_logged) {
					$steamBG = new steamBackground($member_id['name']);
					$FreeImageFileList = backgroundDB::FreeImagesSelect();	
					$counter = 0;
					$imagesGot = 0;
					$FreeImagesCount = count(backgroundDB::FreeImagesSelect());
					while($counter < $FreeImagesCount){
						if($steamBG->hasTheImage($FreeImageFileList[$counter]) === 'NO') {
							$thisImageAmmount = backgroundDB::selectDataOfImage($FreeImageFileList[$counter], 'Ammount');
							if($thisImageAmmount > 0) {
									$ImageFileName 	  = backgroundDB::selectDataOfImage($FreeImageFileList[$counter], 'FileName');
									$ImageRealName    = backgroundDB::selectDataOfImage($FreeImageFileList[$counter], 'Name');
									$request_success = array(
									'type' 		=> 	'freeImage',
									'status' 	=> 	1,
									'ammount' 	=> 	$thisImageAmmount,
									'title' 	=> 	"Раздача фона ".$ImageFileName,
									'message' 	=> 	"Фон профиля - '".$ImageRealName."' может быть получен бесплатно! Для этого нажмите на ссылку.",
									'link_name' => 	"Получить Фон",
									'link' 		=> 	"javascript:addFreeImage('".$ImageFileName."');");
									$request_success = json_encode($request_success);
							} else {$imagesGot++;}
							} else {
								$imagesGot++;
							}		
						$counter++;
					}
				} */

					$row = $this->parseAdvert();
					$title = $row['title'];
					$message = $row['message'];
					$link = $row['link'];
					$status = $row['status'];
					$link_name = $row['link_name'];

					$request_success = array(
					'type' => 'success',
					'status' => $status,
					'title' => $title,
					'message' => $message,
					'link_name' => $link_name,
					'link' => $link);
					$request_success = json_encode($request_success);

				die($request_success);
			}
		}
		
		private function parseAdvert(){	
			$row = $this->db->getRow("SELECT * FROM notify");
			
		return $row;
		}
	}
?>