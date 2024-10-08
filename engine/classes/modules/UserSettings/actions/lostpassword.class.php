<?php

	class LostPassword extends User {

		protected $db;
		
		function __construct($db){
			$this->db = $db;
		}
		
		function resetPass($mail){
			init::classUtil('FoxMail', "1.0.0");
			if($this->checkMail($mail)){
				$foxMail = new foxMail(true);
				$foxMail->send($mail, "Сброс пароля", "Пока не дописано =)");
				die('{"message": "Well Done!", "type": "info"}');
			} else {
				die('{"message": "User not found!", "type": "warn"}');
			}
		}
		
		private function checkMail($mail) : bool {
			$query = "SELECT COUNT(*) AS count FROM `users` WHERE `email` = :mail";
			$stmt = $this->db->prepare($query);
			$stmt->bindParam(':mail', $mail, \PDO::PARAM_STR);
			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			return $result['count'] > 0;
		}


		
	}