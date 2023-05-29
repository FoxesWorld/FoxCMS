 <?php
if(!defined("ADMIN")){
	die();
}

 class GroupAssocAdmin extends AdminPanel implements JsonSerializable {
	 
	 protected $db;
	 private $fields = array();
	 
	 function __construct($db) {
		 $this->db = $db;
		 $this->groupAssocParse();
	 }
	 
	 private function groupAssocParse() {
		 $query = 'SELECT * FROM groupAssociation';
		 $groupsData = $this->db->getRows($query);
		 foreach($groupsData as $row){
			 $rowArray = array();
			 foreach($row as $key => $value){
				 $rowArray[$key] = $value;
			 }
			 $this->fields[] = $rowArray;
		 }
		 return json_encode($this->fields);
	 }
	 
	 public function jsonSerialize() {
        return $this->fields;
    } 
 }