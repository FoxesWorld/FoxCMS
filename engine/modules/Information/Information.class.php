<?php

	$Information = new Information($this->db, $this->logger);

	class Information extends init {
		
		protected $db;
		protected $logger;
		private $requestListener = "projects"; 
		
		function __construct($db, $logger) {
			$this->db = $db;
			$this->logger = $logger;
			if(isset(init::$REQUEST[$this->requestListener])) {
				$option = init::$REQUEST[$this->requestListener];
				require ('InformationOptions.class.php');
				$InformationOptions = new InformationOptions($this->db, $this->logger, $option);
				$InformationOptions->checkOption();
			}
		}
		
	}