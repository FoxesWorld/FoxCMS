<?php
 
	class groupAssociacion extends init {
		
		private $userGroup;
		protected $db;
		private $dbTabble = "groupAssociation";
		
		function __construct($userGroup, $db){
			$this->userGroup = $userGroup;
			$this->db = $db;
		}
		
		public function userGroupName(){
			$query = "SELECT * FROM `".$this->dbTabble."` WHERE groupNum = ".$this->userGroup."";
			$answer = $this->db->getRow($query);
			
			return $answer["groupType"];
		}
		
	}