<?php
	class SelectUsers extends init {
		
		private $fieldsToSelect = array(
			"realname",
			"profilePhoto", 
			"last_date ",
			"userStatus",
			"land",
			"colorScheme");
		private $dbTable;
		
		protected $db;
		
		function __construct($db, $table){
			$this->db = $db;
			$this->dbTable = $table;
		}
		
		public function selectUsersBy($field, $value){
			if($field !== null && $value !== null) {
				$query = "SELECT * FROM `".$this->dbTable."` WHERE ".functions::filterString($field)." = ".functions::filterString($value);
				$data = $this->db->getRows($query);
				$allUsers = array();
				for($j=0; $j < count($data); $j++){
					$thisUser = array();
					foreach($data[$j] as $key => $value){
						if(in_array($key, $this->fieldsToSelect)){
							$thisUser[$key]  = $value;
						}	
					}
					$allUsers[] = $thisUser;
				}
				return json_encode($allUsers);
			}
		}
		
		
		public function setFieldsToSelect($array){
			$this->fieldsToSelect = $array;	
		}
	}