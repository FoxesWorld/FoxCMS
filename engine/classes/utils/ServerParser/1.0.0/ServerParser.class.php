<?php

	class ServerParser {
		
		protected $db;
		private $parseAll;
		private $userGroup;
		
		function __construct($db, $login, $parseAll = false) {
			$this->db = $db;
			$this->parseAll = $parseAll;
			$this->userGroup = $this->getUserGroup($login);
			//echo $this->userGroup;
		}
		
		private function getUserGroup($login) {
			$query = "SELECT user_group FROM `users` WHERE login = '".$login."'";
			return $this->db->getValue($query);
		}
		
		public function parseServers($where = "") {
			$queryWhere = "";

			if (!empty($where)) {
				$queryWhere = " WHERE " . $where;
			}

			$serversArray = array();
			$query = "SELECT * FROM servers";
			$servers = $this->db->getRows($query . $queryWhere);

			foreach ($servers as $key) {
				if(strpos($key['serverGroups'], (String) $this->userGroup) !== false) {
					if($key['enabled'] == "true") {
						$serversArray[] = $key;
					} else {
						if($this->parseAll) {
							$serversArray[] = $key;
						}
					}
				}
			}

			return json_encode($serversArray);
		}
	}
	