<?php

	class ServerParser {
		
		protected $db;
		private $login;
		private $parseAll;
		
		function __construct($db, $login, $parseAll = false) {
			$this->db = $db;
			$this->login = $login;
			$this->parseAll = $parseAll;
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
				if($key['enabled'] == "true") {
					$serversArray[] = $key;
				} else {
					if($this->parseAll) {
						$serversArray[] = $key;
					}
				}
			}

			return json_encode($serversArray);
		}
	}