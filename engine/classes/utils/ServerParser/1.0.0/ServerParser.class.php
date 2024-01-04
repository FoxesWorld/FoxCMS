<?php

	class ServerParser {
		
		protected $db;
		private $login;
		
		function __construct($db, $login) {
			$this->db = $db;
			$this->login = $login;
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
				$serversArray[] = $key;
			}

			return json_encode($serversArray);
		}

		
	}