<?php

	class InformationOptions extends Information {
		
		protected $db;
		protected $logger;
		private $option;
		private $statesArray = array('current', 'previous', 'future');
		
		function __construct($db, $logger, $option) {
			$this->db = $db;
			$this->logger = $logger;
			$this->option = $option;
		}
		
		protected function checkOption() {
			init::requireNestedClasses(basename(__FILE__), __DIR__.'/actions');
			switch($this->option) {
				
				case "selectList":
					if(isset(init::$REQUEST['projectState'])) {
						$requestedState = init::$REQUEST['projectState'];
						if(in_array($requestedState, $this->statesArray)) {
							$ReadInfo = new ReadInfo($this->db, $this->logger, array("projectState" => $requestedState));
							die($ReadInfo->selectLine("info"));
						} else {
							die('{"message": "Unknown state '.$requestedState.'!"}');
						}
					} else {
						die('{"message": "Insufficent arguments!"}');
					}
				break;
				
				case "readInfo":
					if(isset(init::$REQUEST['hyperlink'])) {
						$hyperlink = init::$REQUEST['hyperlink'];
						$ReadInfo = new ReadInfo($this->db, $this->logger, array("hyperlink" => $hyperlink));
						die($ReadInfo->selectLine("fullInfo"));
					} else {
						die('{"message": "Insufficent arguments!"}');
					}
				break;
				
				case "addProject":
					$addProject = new AddProject($this->db, $this->logger);
					die('{"message": "Not reay yet!"}');
				break;
				
				default:
					die('{"message": "Unrecognised option!"}');
				break;
			}
			
		}
		
	}