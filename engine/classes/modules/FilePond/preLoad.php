<?php
/*FoxesModule%>
{
	"version": "V 0.5.1 PreRlease",
	"description": "File uploads",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABMWlDQ1BBZG9iZSBSR0IgKDE5OTgpAAAoz62OsUrDUBRAz4ui4lArBHFweJMoKLbqYMakLUUQrNUhydakoUppEl5e1X6Eo1sHF3e/wMlRcFD8Av9AcergECGDgwie6dzD5XLBqNh1p2GUYRBr1W460vV8OfvEDFMA0Amz1G61DgDiJI74wecrAuB50647Df7GfJgqDUyA7W6UhSAqQP9CpxrEGDCDfqpB3AGmOmnXQDwApV7uL0ApyP0NKCnX80F8AGbP9Xww5gAzyH0FMHV0qQFqSTpSZ71TLauWZUm7mwSRPB5lOhpkcj8OE5UmqqOjLpD/B8BivthuOnKtall76/wzrufL3N6PEIBYeixaQThU598qjJ3f5+LGeBkOb2F6UrTdK7jZgIXroq1WobwF9+MvwMZP/U6/OGUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAZmaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwNiA3OS4xNjQ3NTMsIDIwMjEvMDIvMTUtMTE6NTI6MTMgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMTAtMDJUMTM6MTY6MjkrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTAtMDJUMTM6MTY6MjkrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTEwLTAyVDEzOjE2OjI5KzAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmU4M2RlMDYyLWIwMDgtN2Q0YS1iNWM3LTBiYTY2ZWRlN2Y1YSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmE0YmJiYjhhLTJiY2EtMDc0NC1iZmUxLWI0NzMxOTVlNWU0YSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjFkOWY1NDBjLTllYjQtZDI0MS1hYjUxLTk1YTcxMjVhN2U5NSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjFkOWY1NDBjLTllYjQtZDI0MS1hYjUxLTk1YTcxMjVhN2U5NSIgc3RFdnQ6d2hlbj0iMjAyMi0xMC0wMlQxMzoxNjoyOSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplODNkZTA2Mi1iMDA4LTdkNGEtYjVjNy0wYmE2NmVkZTdmNWEiIHN0RXZ0OndoZW49IjIwMjItMTAtMDJUMTM6MTY6MjkrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBo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"
}
<%FoxesModule*/
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
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	function route_PreLoad($entries, $routes) {
		$preLoad = new preLoad;
		if (is_string($entries)) $entries = array($entries);
		$request_method = $_SERVER['REQUEST_METHOD'];
		foreach ($entries as $entry) {
			//echo $entry;
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
					$files = $transfer->getFiles();
					$this->metadata = $transfer->getMetadata();
					$this->filesTest($files);
					// store data
					
					FilePond\store_transfer(TRANSFER_DIR, $transfer);
					http_response_code(201);
					header('Content-Type: text/plain');

					// remove item from array Response contains uploaded file server id
					die($transfer->getId());
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
						//trigger_error(sprintf("Uploading file \"%s\" failed with code \"" . $file['type'] . " is not allowed.\".", $file['name']), E_USER_WARNING);
						throw new FilePond\Exception(curl_error(403), curl_errno(403));
						http_response_code(403);
				}
				return http_response_code(415);
			}
		}
		
		private function is_image($path){
			$a = getimagesize($path);
			$image_type = $a[2];
			
			if(in_array($image_type , array(IMAGETYPE_GIF , IMAGETYPE_JPEG ,IMAGETYPE_PNG , IMAGETYPE_BMP)))
			{
				return true;
			}
			return false;
		}
		
		private function getFileName($imageType){
			switch($imageType){
				case "profilePhoto":
					$this->fileName = "profilePhoto";
				break;
			}
		}
	}