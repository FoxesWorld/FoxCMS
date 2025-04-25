<?php

	class ServerParser {
		
		protected $db;
		private $parseAll;
		private $userGroup;
		
		function __construct($db, $login, $parseAll = false) {
			$this->db = $db;
			$this->parseAll = $parseAll;
			$this->userGroup = $this->getUserGroup($login);
		}
		
		private function getUserGroup(string $login): ?string {
			$selector = new GenericSelector($this->db, 'users', ['user_group', 'login']);
			$result = $selector->select(['login' => $login]);

			return $result && isset($result[0]['user_group']) ? $result[0]['user_group'] : null;
		}
		
		public function parseServers(string $where = ''): string {
			$selector = new GenericSelector($this->db, 'servers');
			$servers = $selector->select();
			$result = [];
			foreach ($servers as $server) {
				if (isset($server['serverGroups']) && strpos((string) $server['serverGroups'], (string) $this->userGroup) !== false) {
					if ($server['enabled'] === 'true' || $this->parseAll) {
						$result[] = $server;
					}
				}
			}

			return !empty($result)
				? json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
				: json_encode(['error' => 'ServerNotFound']);
		}

	}
	