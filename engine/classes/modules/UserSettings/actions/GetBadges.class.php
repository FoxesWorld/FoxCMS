<?php

	class GetBadges extends UserActions {
		
		protected $db;
		private $badgesList;
		
		function __construct($db, $request) {
			$this->db = $db;
			$userBadges = $this->getUserBadges($request['userDisplay']);
			if($userBadges){
				
				$badgesArray = json_decode($userBadges, false);
				foreach($badgesArray as $badgeName){
					 $this->buildUserBadgesList($badgeName);
				}
			} else {
				
			}
			
		}
		
		private function getUserBadges($user){
			$query = "SELECT * FROM `userBadges` WHERE userLogin = '".$user."'";
			$badges = $this->db->getRow($query);
			switch($badges){
				case false:
					return false;
				break;
				
				default:
					return $badges['badges'];
				break;
			}
		}
		
		private function buildUserBadgesList($badgeName){
			$query = "SELECT * FROM `badgesList` WHERE badgeName = '".$badgeName."'";
			$badgeRow=$this->db->getRow($query);
			if($badgeRow){
				$this->badgesList .= '
				<li>
						<a class="tip-over" aria-label="'.$badgeRow['description'].'" href="#'.$badgeRow['badgeName'].'" rel="noreferrer noopener">
							<img aria-hidden="true" src="'.$badgeRow['img'].'" class="profileBadge22-3GAYRy profileBadge-12r2Nm desaturate-_Twf3u">
						</a>
				</li>';
			}
		}
		
		protected function getBadgesHTML(){
			return $this->badgesList;
		}
		
	}