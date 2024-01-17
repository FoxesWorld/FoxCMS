<?php

	class GiveBadge {

		protected $db;
		private $userBadges;
		private $badgesNames = array();
		private $user;
		
		function __construct($db, $user){
			$this->db = $db;
			$this->user = $user;
			//$this->checkUser($user);
			$this->userBadges = json_decode(initHelper::getUserBadges($db, $this->user), true);
			$this->badgesNames = $this->getBadgesNames($this->userBadges);
		}
		
		public function giveBadge($badge){
			if(!empty($badge)) {
				
				$badgeArray = array(array("acquiredDate" => time(), "badgeName" => $badge));
				if(!in_array($badge, $this->badgesNames)) {
					$badgesArray = @array_merge($this->userBadges, $badgeArray) ?? $badgeArray;
					$this->db->run("UPDATE `users` SET `badges`='".$this->buildUserBadges($badgesArray)."' WHERE login = '".$this->user."'");
				}
			}
		}
		
		private function getBadgesNames($badgesArray){
			$namesArray = array();
			if(@count($badgesArray)) {
				foreach($badgesArray as $badgeVal => $key){
					$namesArray[] = $key['badgeName'];
				}
			}
			return $namesArray;
		}
		
		private function buildUserBadges($badgesArray){
			$outputString = '[';
			$badgesCount = @count($badgesArray) ?? 1;
			for($j = 0; $j < $badgesCount; $j++){
				$singleBadge = $badgesArray[$j];
					$outputString .='{';
					$k = 0;
				foreach($singleBadge as $key => $value){
					$badgeVal;
					if(is_int($value)) {$badgeVal = $value;} else { $badgeVal = '"'.$value.'"';}
					$outputString .= '"'. $key.'":'.$badgeVal;
					if($k<count($singleBadge)-1)$outputString .= ',';
					$k++;
				}
				$outputString .= '}';
				if($j<count($badgesArray)-1){$outputString .= ',';}
			}
			$outputString .= ']';
			return $outputString;
		}
		
		private function checkUser($user){
			if(@count($user)) {
			$userRow = $this->db->getRow('SELECT * FROM `userBadges` WHERE userLogin =  "'.$user.'"');
				if(!@count($userRow)) {
					$this->db->run('INSERT INTO `userBadges`(`userLogin`, `badges`) VALUES ("'.$user.'", "[]")');
				}
			}
		}
		
		private function canRedeem($user) {
			//WIP
		}
		
	}