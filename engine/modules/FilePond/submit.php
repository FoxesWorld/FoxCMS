<?php
if (!defined('profile')) {
	die ('{"message": "Not in PROFILE thread"}');
}
	header('Access-Control-Allow-Methods: POST, DELETE');
	
	require_once('config.php');
	require_once('FilePond.class.php');
	FilePond\catch_server_exceptions();

	function routeEntry($entries, $routes, $db, $logger, $usrArray){
		$fileSubmit = new fileSubmit($db, $logger, $usrArray);
			foreach ($entries as $entry) {
				$post = FilePond\get_post($entry);
					if (!$post) continue;
					if (!isset($routes[$post->getFormat()])) continue;
					$result = $fileSubmit->{$routes[$post->getFormat()]}($post->getValues());
			}
			return $result;
	}

	class fileSubmit {
		
		private $db;
		private $logger;
		private $usrArray;
		
		function __construct($db, $logger, $usrArray){
			$this->db = $db;
			$this->logger = $logger;
			$this->usrArray = $usrArray;
			define("USERDIR", UPLOAD_DIR.DIRECTORY_SEPARATOR.$_POST['login']);
			if (!is_dir(USERDIR)) mkdir(USERDIR, 0755);
		}
		
		function handle_file_post($files) {
			// This is a very basic implementation of a classic PHP upload function, please properly
			// validate all submitted files before saving to disk or database, more information here
			// http://php.net/manual/en/features.file-upload.php
			foreach($files as $file) {
				FilePond\move_file($file, USERDIR);
			}
		}
		
		function handle_base64_encoded_file_post($files) {
			var_dump($files);
			die();
			foreach ($files as $file) {
				$file = @json_decode($file);
				if (!is_object($file)) continue;
				// write file to disk
				
				//var_dump($file);
				FilePond\write_file(
					USERDIR, 
					base64_decode($file->data), 
					FilePond\sanitize_filename($file->name)
				);
			}
		}
		
		function handle_transfer_ids_post($ids) {
			global $lang;
			foreach ($ids as $id) {
				$transfer = FilePond\get_transfer(TRANSFER_DIR, $id);
				if (!$transfer) continue;
				if(@file::efile($transfer->getMetadata()["tmp_name"])["status"] !== "error") {
					$imageType = json_decode(file::efile($transfer->getMetadata()["tmp_name"])["content"])->imagetype;
					$files = $transfer->getFiles(defined('TRANSFER_PROCESSOR') ? TRANSFER_PROCESSOR : null);

					if($files != null){
					   foreach($files as $file) {
						   $nameOverride;
						   $extension = explode('.', $file["name"])[1];
						   switch($imageType){
							   case "profilePhoto":
								$nameOverride = $imageType;
								$query = "UPDATE `users` SET profilePhoto='".$nameOverride.'.'.$extension."' WHERE login = '".$this->usrArray['login']."'";
								$this->db->query($query);
							   break;
						   }
							FilePond\move_file($file, USERDIR, $nameOverride);
						} 
					}

					// remove transfer directory
					FilePond\remove_transfer_directory(TRANSFER_DIR, $id);
					if(FilePond\is_valid_transfer_id($id)) {
						$status = "success";
						$message = $lang['successLoad'];
					} else {
						$status = "warn";
						$message = $lang["errorLoad"];
					}
					return array($status, $message);
				}
			}
		}
	}