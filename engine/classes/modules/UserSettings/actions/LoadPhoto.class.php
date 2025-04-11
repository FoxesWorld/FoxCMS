<?php

	class LoadPhoto {
		
		protected $db, $logger;
		
		function __construct($request, $db, $logger) {
			$this->db = $db;
			$this->logger = $logger;
			$this->loadPhoto($request);
		}
		
		private function loadPhoto($request){
			die('{"message": "WIP", "type": "success"}');
			if(@$request['image'] != 'null') {
				require_once (MODULES_DIR."FileUpload/submit.php");
				$loadImage = routeEntry(ENTRY_FIELD, 
				[
					'FILE_OBJECTS' 				  => 'handle_file_post',
					'BASE64_ENCODED_FILE_OBJECTS' => 'handle_base64_encoded_file_post',
					'TRANSFER_IDS' 				  => 'handle_transfer_ids_post'
				], $this->db, $this->logger, $request);
			}
			die('{"message": "GG", "type": "success"}');
		}
	}