<?php
if(!defined('auth')) {
	die ('{"message": "Not in auth thread"}');
}
	class subscribe extends authWrapper {
		
		private $inputArray;
		protected $db, $logger;
		
		function __construct($input, $db, $logger){
			$this->db = $db;
			$this->logger = $logger;
			$this->inputArray = functions::collectData($input, true);
		}
		
		protected function subscribe(){
			$query = "INSERT INTO `subscribe`(`email`, `date`) VALUES ('".$this->inputArray['mail']."','".CURRENT_TIME."')";
			if(functions::checkExistingData($this->db, 'email', $this->inputArray['mail']) == true){
				exit('{"message": "Данная почта уже была зарегистрирована!", "type": "warn"}');
			}
			$this->db->run($query);
			$this->logger->WriteLine("New subscriber - ".$this->inputArray['mail']);
			functions::jsonAnswer("Подписка оформлена!", false);
		}
		
	}