<?php

	class GetBadges extends UserActions implements JsonSerializable {
		
		protected $db;
		private $badgesList = array();
		
		function __construct($db, $request) {
			$this->db = $db;
			$userBadges = UserActions::getUserBadges($db, $request['userDisplay']);
			if($userBadges){
				$badgesArray = json_decode($userBadges, false);
				foreach($badgesArray as $badgeName){
					 $this->badgesList[] = $this->getBadgeInfo($badgeName);
				}
			}
		}
		
		private function getBadgeInfo($badgeName){
			$query = "SELECT * FROM `badgesList` WHERE badgeName = '".$badgeName."'";
			$badgeRow=$this->db->getRow($query);
			if($badgeRow){
				$badgeArr =  array(
					"BadgeName" => $badgeRow['badgeName'],
					"BadgeDesc" => $badgeRow['description'],
					"BadgeImg" => $badgeRow['img']
				);
				return $badgeArr;	
			} 
			return false;
		}
		
		public function jsonSerialize() {
			return $this->badgesList;
		} 
		
	}