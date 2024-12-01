<?php

abstract class Uploader {
    protected $login;
    protected $perms;

    public function __construct($login, $perms) {
        $this->login = $login;
        $this->perms = $perms;
    }

    abstract protected function validateFile($filePath);
	
	private function validateMime($filePath) : void {
		global $config;
		$fi = finfo_open(FILEINFO_MIME_TYPE);
        $mime = (string) finfo_file($fi, $filePath);
        finfo_close($fi);
		if(!in_array($mime, explode(',', $config['securitySetings']['allowedMime']))) {
			die('{"message": "Disallowed Mime/Type - '.$mime.'"}');
		}
	}

    public function uploadFile($fileResouse, $uploadPath, $fileName = null) {
        if (!isset($_FILES[0])) {
            die('{"message": "Файл не выбран!"}');
        }

        $filePath = $fileResouse['tmp_name'];
		$this->validateMime($filePath);
        $errorCode = $fileResouse['error'];

        if ($errorCode !== UPLOAD_ERR_OK || !is_uploaded_file($filePath)) {
            $errorMessages = $this->getErrorMessages();
            $outputMessage = isset($errorMessages[$errorCode]) ? $errorMessages[$errorCode] : 'Unknown error!';
            die('{"message": "' . $outputMessage . '"}');
        }

        $this->validateFile($filePath);

        $name = $fileName ? $fileName : $this->login . '.png';

        if (!move_uploaded_file($filePath, $uploadPath . $name)) {
            die('{"message": "При записи файла на диск произошла ошибка."}');
        } else {
            die('{"message": "Успешная загрузка!", "type": "success"}');
        }
    }



    protected function getErrorMessages() {
        return [
            UPLOAD_ERR_INI_SIZE   => 'max_file',
            UPLOAD_ERR_FORM_SIZE  => 'max_file',
            UPLOAD_ERR_PARTIAL    => 'partial_error',
            UPLOAD_ERR_NO_FILE    => 'file_not_found',
            UPLOAD_ERR_NO_TMP_DIR => 'no_temp_dir',
            UPLOAD_ERR_CANT_WRITE => 'no_write_permission',
            UPLOAD_ERR_EXTENSION  => 'wrong_extension',
        ];
    }
}

?>