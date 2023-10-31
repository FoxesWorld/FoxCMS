<?php

	class ServerParser {
		
		protected $db;
		private $login;
		
		function __construct($db, $login) {
			$this->db = $db;
			$this->login = $login;
		}
		
		public function parseServers(){
			$serversArray = array();
			$query = "SELECT * FROM servers";
			$servers = $this->db->getRows($query);
			foreach($servers as $key){
				$serversArray[] = $key;
			}
			
			return json_encode($serversArray);
		}
		
	}