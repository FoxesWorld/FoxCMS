<?php

	class GetBadges extends UserActions implements JsonSerializable {
		
		protected $db;
		private $badgesList = array();
		
		function __construct($db, $request) {
			$this->db = $db;
			$userBadges = initHelper::getUserBadges($db, $request['userDisplay']);
			if($userBadges){
				$badgesArray = json_decode($userBadges, false);
				
				foreach($badgesArray as $badge){
					 $this->badgesList[] = $this->getBadgeInfo($badge);
				}
			}
		}
		
		private function getBadgeInfo($badge){
			$query = "SELECT * FROM `badgesList` WHERE badgeName = '".$badge->badgeName."'";
			$badgeRow=$this->db->getRow($query);
			if($badgeRow){
				$description = isset($badge->description) ? $badge->description : $badgeRow['description'];
				$badgeArr =  array(
					"AcquiredDate" => $badge->acquiredDate,
					"BadgeName" => $badgeRow['badgeName'],
					"BadgeDesc" =>  $description,
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