<?php
if(!defined("ADMIN")){
	die();
}

 class GroupAssocAdmin extends AdminPanel {
	 
	 protected $db;
	 
	 function __construct($db) {
		 $this->db = $db;
	 }
	 
	 public function groupAssocParse() {
		 $query = 'SELECT * FROM groupAssociation';
		 $allFields = array();
		 $groupsData = $this->db->getRows($query);
		 foreach($groupsData as $row){
			 $rowArray = array();
			 foreach($row as $key => $value){
				 $rowArray[$key] = $value;
			 }
			 $allFields[] = $rowArray;
		 }
		 return json_encode($allFields);
	 }
	 
 }