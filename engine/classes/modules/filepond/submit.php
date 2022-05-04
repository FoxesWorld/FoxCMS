<?php
	Error_Reporting(E_ALL);
	Ini_Set('display_errors', true);

	if(!defined('FOXXEY')) {
		die("Hacking attempt!");
	} else {
		define('upload', true);
	}

	$image = $_POST['image'];
	if($image === array('null')) {
		die('{"message": "No Image was sent!"}'); 
	} else {
		header('Access-Control-Allow-Methods: POST');
		require_once('FilePond.class.php');
		require_once('config.php');

		FilePond\catch_server_exceptions();
		FilePond\route_form_post(ENTRY_FIELD, [
			'FILE_OBJECTS' => 'handle_file_post',
			'BASE64_ENCODED_FILE_OBJECTS' => 'handle_base64_encoded_file_post',
			'TRANSFER_IDS' => 'handle_transfer_ids_post'
		]);

		die('{"message": "Upload sucessful!", "type": "info"}');
	}
		function handle_file_post($files) {

			// This is a very basic implementation of a classic PHP upload function, please properly
			// validate all submitted files before saving to disk or database, more information here
			// http://php.net/manual/en/features.file-upload.php
			
			foreach($files as $file) {
				FilePond\move_file($file, UPLOAD_DIR.'/'.$_SESSION['login']);
			}
		}

		function handle_base64_encoded_file_post($files) {

			foreach ($files as $file) {

				// Suppress error messages, we'll assume these file objects are valid
				/* Expected format:
				{
					"id": "iuhv2cpsu",
					"name": "picture.jpg",
					"type": "image/jpeg",
					"size": 20636,
					"metadata" : {...}
					"data": "/9j/4AAQSkZJRgABAQEASABIAA..."
				}
				*/
				$file = @json_decode($file);
				// Skip files that failed to decode
				if (!is_object($file)) continue;
				// write file to disk
				FilePond\write_file(
					UPLOAD_DIR.'/'.$_SESSION['login'], 
					base64_decode($file->data), 
					FilePond\sanitize_filename($file->name)
				);
			}

		}

		function handle_transfer_ids_post($ids) {

			foreach ($ids as $id) {
				// create transfer wrapper around upload
				$transfer = FilePond\get_transfer(TRANSFER_DIR, $id);
				//var_dump($transfer);
				
				// transfer not found
				if (!$transfer) continue;
				
				// move files
				$files = $transfer->getFiles(defined('TRANSFER_PROCESSOR') ? TRANSFER_PROCESSOR : null);
				foreach($files as $file) {
					FilePond\move_file($file, UPLOAD_DIR.'/'.$_SESSION['login']);
				}

				// remove transfer directory
				FilePond\remove_transfer_directory(TRANSFER_DIR, $id);
			}
		}