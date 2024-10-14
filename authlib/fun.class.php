<?php

		class fun {
			public static function getUserDataBy($db, $by, $val){
				$stmt = $db->prepare("SELECT * FROM users WHERE $by= :value");
				$stmt->bindValue(':value', $val);
				$stmt->execute();
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				return $row;
			}
		}
?>