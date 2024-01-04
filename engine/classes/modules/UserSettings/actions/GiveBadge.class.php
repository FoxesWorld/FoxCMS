<?php

	class GiveBadge extends UserActions {

		protected $db;
		private $userBadges;
		private $inputData;
		
		function __construct($db, $data){
			$this->db = $db;
			$this->inputData = $data;
			$this->userBadges = json_decode(initHelper::getUserBadges($db, $this->inputData['user']), false);
		}
		
		protected function giveBadge($badge){
			if(!empty($badge)) {
				$badgeArray = array("acquiredDate" => CURRENT_TIME, "badgeName" => $badge);
				if(is_array($this->userBadges)) {
					array_merge($this->userBadges, $badgeArray);
					$newBadges = json_encode($this->userBadges);
					$this->db->run("UPDATE `userBadges` SET `badges`='".$newBadges."' WHERE userLogin = '".$this->inputData['user']."'");
					die($newBadges);
				}
			}
		}
		
		private function canRedeem($user) {
			//WIP
		}
		
	}