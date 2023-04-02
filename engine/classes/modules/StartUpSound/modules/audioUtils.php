<?php
if(!defined('startUpSound')) {
	die('{"message": "Not in startUpSound thread"}');
}
	class audioUtils extends startUpSound {

		protected static function getAdditionalInfo($getid3){
			if(is_array(@$getid3->info['tags']['id3v1']['comment'])) {
				@$soundAdditionalData = $getid3->info['tags']['id3v1']['comment'][0];
				return $soundAdditionalData;
			} else {
				return "undefined";
			}
		}
		
		public static function sndPreFetch($sndFolder){
			$dirContents = filesInDir::filesInDirArray($sndFolder, '.mp3');
			sort($dirContents, SORT_STRING | SORT_NATURAL);
			$allFilesArray = array();
			$moodListArray = array();
			$charactersArray = array();

			foreach ($dirContents as $key){
				$fullPath = $sndFolder.'/'.$key;
					$fileInfo = self::getAudioInfo($fullPath);
					$allFilesArray[] = $fileInfo;
						if(!in_array($fileInfo['SNDMOOD'], $moodListArray)){
							$moodListArray[] = $fileInfo['SNDMOOD'];
						}
						
						if(!in_array($fileInfo['CHARACTER'], $charactersArray)){
							$charactersArray[] = $fileInfo['CHARACTER'];
						}
			}
			$allFilesArray	 = array_filter($allFilesArray);
			$moodListArray	 = array_filter($moodListArray);
			$charactersArray = array_filter($charactersArray);

				$outputArray = array(	
					'allFiles' => $allFilesArray, 
					'moodList' => $moodListArray,
					'charactersArray' => $charactersArray
				);
			
			return $outputArray;
		}
		
		/*
				An essential method used for getting 
				allAudioInfo by a specifyed ID3 tag and it's value
		*/
		public static function getByTag($tag, $value, $allFilesArray){
			$allFileInfo = array();
			foreach ($allFilesArray as $key){
				if($key[$tag] === $value){
					$allFileInfo[] = $key;
				}
			}

			return $allFileInfo;
		}
		
		private static function getFileLength ($getid3){			
			$mp3file = new getDuration($getid3->filename);
			$time = $mp3file->getDuration();			
			return $time * 1000;
		}
		
		protected static function getAudioInfo($audioPath){
			$answer = array();
			if(file_exists($audioPath)) {
				$getid3 = new getID3();
				$getid3->encoding = 'UTF-8';
				$getid3->Analyze($audioPath);
				$answer['SNDMOOD'] = @$getid3->info["id3v2"]["comments"]["text"]["SNDMOOD"];
				$answer['CHARACTER'] = @$getid3->info["id3v2"]["comments"]["text"]["CHARACTER"];
				$answer['durSnd'] = audioUtils::getFileLength($getid3);
				$answer['timeShift'] = @$getid3->info["id3v2"]["comments"]["text"]["TIMESHIFT"];
				$answer['fileName'] = str_replace(startUpSound::$absMnt,"",$audioPath);
				$answer['md5'] = md5_file($audioPath);
				$answer['sndADT'] = audioUtils::getAdditionalInfo($getid3);
			} else {
				$answer = 'noFile';
			}
			
			return $answer;
		}

		/*
		 * @param boolean $debug
		 * @return Integer maxDuration
		 */
		protected static function maxDuration($mus, $snd) {
			$duration = 0;
			if($mus > $snd) {
				$duration = $mus;
			} else {
				$duration = $snd;
			}
		startUpSound::$maxDuration = $duration;
		}

		protected static function easter($chance) {
			$minRange = 1;
			$maxRange = 1000;
			$easter = "";
			$easterChance = mt_rand($minRange, $maxRange);

				if ($easterChance <= $chance){
					$easter = "/easter";
				}

			return $easter;
		}
	}