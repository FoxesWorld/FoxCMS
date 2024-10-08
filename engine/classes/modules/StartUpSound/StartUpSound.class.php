<?php
/*FoxesModule%>
{
	"version": "V 0.5.0.0 Reborn",
	"description": "A legendary library!",
	"image": "data:image/png;base64,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"}
<%FoxesModule*/

if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
} else {
	define('startUpSound', true);
}

/* TODO
 * Force easterMus, Force easterSnd
 * Config utils
 */

	class startUpSound extends init {

		/*INTERNAL SETTINGS*/
		private static $sndLevel 		= -6;
		private static $musLevel 		= -8;
		private 	   $cacheFilePath 	= ENGINE_DIR.'cache/startupsound.timetable';
		private static $serverVersion 	= '0.5.0.0 Reborn';
		public static  $musFilesNum 	= 0;
		public static  $soundFilesNum 	= 0;

		/*EVENT TAGS*/
		protected static $forceEaster   = array();
		private static $useSeasons 		= false;
		private static $seasonNow 		= '';
		private static $useDayTime 		= false;
		private static $dayTimeNow 		= '';
		
		/*MOUNT*/
		private static $musMnt 			= 'mus';
		private static $sndMnt 			= 'snd';
		public static  $absMnt;
		
		/*ARGS*/
		protected static $eventNow 		= 'common';
		protected static $restrict		= array();
		
		/*CONFIG*/
		protected static $config		= array(
			'debug' => false,
			'mountDir' 			=> ROOT_DIR."/plugins/StartUpSound",
			'enableVoice' 		=> true,
			'enableMusic' 		=> true,
			'easterMusRarity'   => 50,
			'easterSndRarity'	=> 10);


	   public static $eventsArray = array(
        '01' => array(
            "1-12" => array(
                'eventName' => 'winterHolidays',
            )
        ),
        '02' => array(),
        '03' => array(
            '3' => array(
                'eventName' => 'casting'
            )
        ),
        '04' => array(),
        '05' => array(),
        '06' => array(),
        '07' => array(),
        '08' => array(),
        '09' => array(
            '1' => array(
                'eventName' => '8bit'
            )
        ),
        '10' => array(),
        '11' => array(),
        '12' => array(
            "26-30" => array(
                'eventName' => 'winterHolidays'
            ),
            "31" => array(
                'eventName' => 'newYear'
            )
        )
    );
		protected static $musArray			= array();
		protected static $sndArray			= array();

		/* Both */
		protected static $moodToPlay 		= null;
		protected static $characterToPlay 	= null;
		protected static $maxDuration 		= 0;

		function __construct() {
			init::requireNestedClasses(basename(__FILE__), __DIR__.'/modules');
			init::classUtil('mp3Tag', "1.0.0");

			if(!isset($_REQUEST['startUpSoundAPI'])) {
				startUpSound::$eventsArray = file::efile($this->cacheFilePath, true, startUpSound::$eventsArray)['content'];
			}

			startUpSound::$absMnt = self::$config['mountDir'];

			$actionsSUPS = new actionsSUPS();
			$event = new eventScanning(date::getCurrentDate('day'), date::getCurrentDate('month'));
				if(static::$useDayTime) {
					$this->dayTimeGetting();
				}

				if(static::$useSeasons){
					startUpSound::$seasonNow = seasonOptions::seasonNow();
				}

			startUpSound::$musArray['selMus'] = "musicOff";
			startUpSound::$sndArray['selSnd'] = "soundOff";
			startUpSound::$sndArray = $this->genSnd(static::$restrict);
			$this->genMus(startUpSound::$sndArray['SNDMOOD']);
			audioUtils::maxDuration(startUpSound::$musArray['durMus'], startUpSound::$sndArray['durSnd']);
		}

		public function generateAudio() {
			exit($this->outputJson());
		}

		private function genSnd($restrict = null) {
			$sndArray = array();
			if(self::$config['enableVoice']) {
				$easter = audioUtils::easter(self::$config['easterSndRarity']);
				
				$sndPath = static::$absMnt.'/'.static::$eventNow.'/'.static::$sndMnt.static::$seasonNow.static::$dayTimeNow.$easter;

				$sndArray['selSnd'] = 'soundOff';
				if(is_dir($sndPath)) {
					$dirScan = audioUtils::sndPreFetch($sndPath);
					startUpSound::$soundFilesNum = count($dirScan['allFiles']);
					if($easter){
						if(startUpSound::$soundFilesNum < 1){
							$sndPath = str_replace($easter, "", $sndPath);
						}
					}

					function genSndFromArray($array){
						$arraySize = count($array)-1;
						$rndNum = rand(0, $arraySize);

						$outArray = array(
							'fileName' => $array[$rndNum]['fileName'],
							'md5' => $array[$rndNum]['md5'],
							'durSnd'=> $array[$rndNum]['durSnd'],
							'SNDMOOD'	  => $array[$rndNum]['SNDMOOD'],
							'sndADT' => $array[$rndNum]['sndADT'],
							'timeShift' => $array[$rndNum]['timeShift']
						);

						return $outArray;
					}

					function restrictedTags($array, $restrictedArray){
							if($restrictedArray){
								foreach($restrictedArray as $key => $value){
									$restrKey = $key;
									$restrVal = $value;
									foreach($array as $key){
										if(!in_array($key[$restrKey], $restrVal)){
											$ArrayARST[] = $key;
										}
									}
								}
							} else {
								$ArrayARST = $array;
							}
						return $ArrayARST;
					}

					function filterArray($dirScan, $workArray, $character = null, $mood = null){

								function moodFilter($mood, $moodArray, $workArray){
									$AFTTP = $workArray;
										if($mood) {
											if(in_array($mood, $moodArray)) {
												$AFTTP = audioUtils::getByTag('SNDMOOD', $mood, $workArray);
												if(!count($AFTTP)) {
													$AFTTP = $workArray;
												}
											}
										}
									return $AFTTP;
								}

								function charFilter($character, $charArray, $AFTTP){
									$generatedSND = genSndFromArray($AFTTP);
									if($character) {
										if(in_array($character, $charArray)){
										$thisCharacterArray = audioUtils::getByTag('CHARACTER', $character, $AFTTP);
											if(count($thisCharacterArray)){
												$generatedSND = $thisCharacterArray[rand(0,count($thisCharacterArray)-1)];
											}
										}
									}
									return $generatedSND;
								}

						$generatedSND = charFilter($character, $dirScan['charactersArray'], moodFilter($mood, $dirScan['moodList'], $workArray));
						return $generatedSND;
					}

					$generatedSND = filterArray($dirScan, restrictedTags($dirScan['allFiles'], $restrict), startUpSound::$characterToPlay, startUpSound::$moodToPlay);
					if(@$generatedSND['timeShift']){
						$sndArray['timeShift'] = $generatedSND['timeShift'];
					} else {
						$sndArray['timeShift'] = 800;
					}

					$sndArray['selSnd'] 	   = $generatedSND['fileName'];
					$sndArray['sndMd5']	 	   = $generatedSND['md5'];
					$sndArray['SNDMOOD'] 	   = $generatedSND['SNDMOOD'];
					$sndArray['durSnd'] 	   = $generatedSND['durSnd'];
					$sndArray['sndADT'] 	   = $generatedSND['sndADT'];
				}
			}
			return $sndArray;
		}

		private function genMus($mood) {

			if(self::$config['enableMusic']) {
				$easter = audioUtils::easter(self::$config['easterMusRarity']);

					$currentMusFolder = static::$absMnt.'/'.static::$eventNow.'/'.static::$musMnt;	

						function genMusFile($sndMood, $cmf, $easter = null){
							if($easter){
								$cmf .= $easter;
							}
							$dirScan = audioUtils::sndPreFetch($cmf);
							
							if($sndMood) {
								$thisMoodArray = audioUtils::getByTag('SNDMOOD', $sndMood, $dirScan['allFiles']);
								$arraySize = count($thisMoodArray);
								$randMusFile = $thisMoodArray[rand(0, $arraySize-1)];
							} else {
								$randMusFile = $dirScan['allFiles'][rand(0, count($dirScan['allFiles'])-1)];
							}


							return $randMusFile;
						}

						$randMusFile = genMusFile(@$mood, $currentMusFolder, $easter);
						startUpSound::$musArray['selMus'] 	= $randMusFile['fileName'] ?? 'musicOff';
						startUpSound::$musArray['musMd5'] 	= $randMusFile['md5'];
						startUpSound::$musArray['durMus'] 	= $randMusFile['durSnd'];
			}
		}

		private function outputJson() {
			$mountPoint = str_replace(ROOT_DIR, '', static::$absMnt);
			$outputArray = array(
					"maxDuration" 		=> (Integer) static::$maxDuration,
					"sndLvl" 			=> (Integer) static::$sndLevel,
					"musLvl" 			=> (Integer) static::$musLevel,
					"delay"				=> (Integer) static::$sndArray['timeShift'],
					"musFile" 			=> (String)  static::$musArray['selMus'],
					"sndFile" 			=> (String)  static::$sndArray['selSnd'],
					"sndMd5" 			=> (String)  static::$sndArray['sndMd5'],
					"musMd5" 			=> (String)  static::$musArray['musMd5'],
					"eventInfo"			=> (String)  static::$sndArray['sndADT'],
					"eventName" 		=> (String)  static::$eventNow,
					'serverVersion'		=> (String)  static::$serverVersion,
					'mountPoint'		=> (String)  $mountPoint);

			return json_encode($outputArray, JSON_UNESCAPED_SLASHES);
		}
	}