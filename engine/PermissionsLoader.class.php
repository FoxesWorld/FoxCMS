<?php

	class PermissionsLoader extends init {
		
		protected $db;
		
		function __construct($db){
			$this->db = $db;
		}
		
		public $permArray = array();
		
		protected function loadPermissions(){
			$outArray = array();
			$query = "SELECT * FROM `groupPermissions` WHERE groupName = '".init::$usrArray['groupTag']."'";
			$data = $this->db->getRows($query);
			foreach($data as $key){
				$steps = 0;
				$title = $key['permName'];
				$value = $key['permValue'];
				$arrStr = '"'.$title.'":[';
				$exploded = explode(",", $value);
				$explodedNum = count($exploded);
				$this->permArray[$title] = $exploded;
				foreach($exploded as $key){
					$arrStr .= '"'.$key.'"';
					$steps+=1;
					if($steps < $explodedNum) {$arrStr .= ',';}
				}
				$arrStr .=']';
				$outArray[] = $arrStr;
			}
			return $outArray;
		}
		
	}
?>