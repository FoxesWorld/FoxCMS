<?php
if (!defined('FOXXEY')) {
	die ('{"message": "Not in FOXXEY thread"}');
}
require_once('config.php');
require_once('FilePond.class.php');
FilePond\catch_server_exceptions();

	route_PreLoad(ENTRY_FIELD, 
		[
			'FILE_TRANSFER' => 'handle_file_transfer',
			'PATCH_FILE_TRANSFER' => 'handle_patch_file_transfer',
			'REVERT_FILE_TRANSFER' => 'handle_revert_file_transfer',
			'RESTORE_FILE_TRANSFER' => 'handle_restore_file_transfer',
			'LOAD_LOCAL_FILE' => 'handle_load_local_file',
			'FETCH_REMOTE_FILE' => 'handle_fetch_remote_file'
		]
	);

	header('Access-Control-Allow-Methods: OPTIONS, GET, DELETE, POST, HEAD, PATCH');
	header('Access-Control-Allow-Headers: content-type, upload-length, upload-offset, upload-name');
	header('Access-Control-Expose-Headers: upload-offset');

	function route_PreLoad($entries, $routes) {
		$preLoad = new preLoad();
		if (is_string($entries)) $entries = array($entries);
		$request_method = $_SERVER['REQUEST_METHOD'];
		foreach ($entries as $entry) {
			
			if ($request_method === 'POST') {
				$post = FilePond\get_post($entry);
				if (!$post) continue;
				$transfer = new FilePond\Transfer();
				$transfer->populate($entry);
				$preLoad->{$routes['FILE_TRANSFER']}($transfer);
			}

			if ($request_method === 'DELETE') {
				$preLoad->{$routes['REVERT_FILE_TRANSFER']}(file_get_contents('php://input'));
			}

			if ($request_method === 'GET' || $request_method === 'HEAD' || $request_method === 'PATCH') {
				$handlers = array(
					'fetch' => 'FETCH_REMOTE_FILE',
					'restore' => 'RESTORE_FILE_TRANSFER',
					'load' => 'LOAD_LOCAL_FILE',
					'patch' => 'PATCH_FILE_TRANSFER'
				);
				foreach ($handlers as $param => $handler) {
					if (isset($_GET[$param])) {
						$preLoad->{$routes[$handler]}($entry);
					}
				}
			}
		}
	}

	class preLoad extends init {
		
		private $metadata;
		private $fileName;
		
		function __construct() {
			
		}
		
		function handle_file_transfer($transfer) {
			global $config;
			if(init::$usrArray['isLogged']) {
				if(in_array(init::$usrArray['user_group'], $config['allowedProfileEdit'])) {
					$files = $transfer->getFiles();
					$this->metadata = $transfer->getMetadata();
					$this->filesTest($files);
					// store data
					FilePond\store_transfer(TRANSFER_DIR, $transfer);
					http_response_code(201);
					header('Content-Type: text/plain');

					// remove item from array Response contains uploaded file server id
					die($transfer->getId());
				}
			} else {
				return http_response_code(403);
			}
		}
		
		function handle_patch_file_transfer($id) {

			// location of patch files
			$dir = TRANSFER_DIR . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR;
			
			// exit if is get
			if ($_SERVER['REQUEST_METHOD'] === 'HEAD') {
				$patch = glob($dir . '.patch.*');
				$offsets = array();
				$size = '';
				$last_offset = 0;
				foreach ($patch as $filename) {

					// get size of chunk
					$size = filesize($filename);

					// get offset of chunk
					list($dir, $offset) = explode('.patch.', $filename, 2);

					// offsets
					array_push($offsets, intval($offset));
				}

				sort($offsets);

				foreach ($offsets as $offset) {
					// test if is missing previous chunk
					// don't test first chunk (previous chunk is non existent)
					if ($offset > 0 && !in_array($offset - $size, $offsets)) {
						$last_offset = $offset - $size;
						break;
					}

					// last offset is at least next offset
					$last_offset = $offset + $size;
				}

				// return offset
				http_response_code(200);
				header('Upload-Offset: ' . $last_offset);
				return;
			}

			// get patch data
			$offset = $_SERVER['HTTP_UPLOAD_OFFSET'];
			$length = $_SERVER['HTTP_UPLOAD_LENGTH'];

			// should be numeric values, else exit
			if (!is_numeric($offset) || !is_numeric($length)) {
				return http_response_code(400);
			}

			// get sanitized name
			$name = FilePond\sanitize_filename($_SERVER['HTTP_UPLOAD_NAME']);

			// write patch file for this request
			file_put_contents($dir . '.patch.' . $offset, fopen('php://input', 'r'));

			// calculate total size of patches
			$size = 0;
			$patch = glob($dir . '.patch.*');
			foreach ($patch as $filename) {
				$size += filesize($filename);
			}

			// if total size equals length of file we have gathered all patch files
			if ($size == $length) {

				// create output file
				$file_handle = fopen($dir . $name, 'w');

				// write patches to file
				foreach ($patch as $filename) {

					// get offset from filename
					list($dir, $offset) = explode('.patch.', $filename, 2);

					// read patch and close
					$patch_handle = fopen($filename, 'r');
					$patch_contents = fread($patch_handle, filesize($filename));
					fclose($patch_handle); 
					
					// apply patch
					fseek($file_handle, $offset);
					fwrite($file_handle, $patch_contents);
				}

				// remove patches
				foreach ($patch as $filename) {
					unlink($filename);
				}

				// done with file
				fclose($file_handle);
			}

			http_response_code(204);
		}
		
		function handle_revert_file_transfer($id) {

			// test if id was supplied
			if (!isset($id) || !FilePond\is_valid_transfer_id($id)) return http_response_code(400);

			// remove transfer directory
			FilePond\remove_transfer_directory(TRANSFER_DIR, $id);

			// no content to return
			http_response_code(204);
		}

		function handle_restore_file_transfer($id) {

			// Stop here if no id supplied
			if (empty($id) || !FilePond\is_valid_transfer_id($id)) return http_response_code(400);

			// create transfer wrapper around upload
			$transfer = FilePond\get_transfer(TRANSFER_DIR, $id);

			// Let's get the temp file content
			$files = $transfer->getFiles();

			// No file returned, file not found
			if (count($files) === 0) return http_response_code(404);

			// Return file
			FilePond\echo_file($files[0]);
		}

		function handle_load_local_file($ref) {

			// Stop here if no id supplied
			if (empty($ref)) return http_response_code(400);

			// In this example implementation the file id is simply the filename and 
			// we request the file from the uploads folder, it could very well be 
			// that the file should be fetched from a database or a totally different system.
			
			// path to file
			$path = UPLOAD_DIR . DIRECTORY_SEPARATOR . FilePond\sanitize_filename($ref);

			// Return file
			FilePond\echo_file($path);
		}

		function handle_fetch_remote_file($url) {

			// Stop here if no data supplied
			if (empty($url)) return http_response_code(400);

			// Is this a valid url
			if (!FilePond\is_url($url)) return http_response_code(400);

			// Let's try to get the remote file content
			$file = FilePond\fetch($url);

			// Something went wrong
			if (!$file) return http_response_code(500);

			// remote server returned invalid response
			if ($file['error'] !== 0) return http_response_code($file['error']);
			
			// if we only return headers we store the file in the transfer folder
			if ($_SERVER['REQUEST_METHOD'] === 'HEAD') {
				
				// deal with this file as if it's a file transfer, will return unique id to client
				$transfer = new FilePond\Transfer();
				$transfer->restore($file);
				FilePond\store_transfer(TRANSFER_DIR, $transfer);
				header('X-Content-Transfer-Id: ' . $transfer->getId());
			}

			// time to return the file to the client
			FilePond\echo_file($file);
		}
		
		private function filesTest($files) {
			// something went wrong, most likely a field name mismatch
			if ($files !== null && count($files) === 0) return http_response_code(400);

			// test if server had trouble copying files
			@$file_transfers_with_errors = array_filter($files, function($file) { return $file['error'] !== 0; });
			if (@count($file_transfers_with_errors)) {
				foreach ($file_transfers_with_errors as $file) {
					trigger_error(sprintf("Uploading file \"%s\" failed with code \"" . $file['error'] . "\".", $file['name']), E_USER_WARNING);
				}
				return http_response_code(500);
			}

			// test if files are of invalid format
			@$file_transfers_with_invalid_file_type = count(ALLOWED_FILE_FORMATS) ? array_filter($files, function($file) { return !in_array($file['type'], ALLOWED_FILE_FORMATS); }) : array();
			if (@count($file_transfers_with_invalid_file_type)) {
				foreach ($file_transfers_with_invalid_file_type as $file) {
					trigger_error(sprintf("Uploading file \"%s\" failed with code \"" . $file['type'] . " is not allowed.\".", $file['name']), E_USER_WARNING);
				}
				return http_response_code(415);
			}
		}
		
		private function getFileName($imageType){
			switch($imageType){
				case "profilePhoto":
					$this->fileName = "profilePhoto";
				break;
			}
		}
	}