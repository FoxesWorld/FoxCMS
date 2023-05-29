<?php

	class GiveBadge extends UserActions {

		protected $db;
		private $userBadges;
		private $inputData;
		
		function __construct($db, $data){
			$this->db = $db;
			$this->inputData = $data;
			$this->userBadges = json_decode(UserActions::getUserBadges($db, $this->inputData['user']), false);
		}
		
		protected function giveBadge(){
			if(!empty($this->inputData['badge'])) {
				if(is_array($this->userBadges)) {
					array_push($this->userBadges, $this->inputData['badge']);
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