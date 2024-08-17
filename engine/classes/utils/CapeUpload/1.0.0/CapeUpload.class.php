<?php

class CapeUpload {
    private $login;
    private $servers;
    private $donates;
    private $perms;
    private $mysqli;

    public function __construct($login, $perms) {
        $this->login = $login;
        //$this->servers = $servers;
        //$this->donates = $donates;
        $this->perms = $perms;
        //$this->mysqli = $mysqli;
    }

    private function checkDonationStatus() {
        foreach ($this->servers as $server) {
            $don_1 = "donate_" . $server['title'];
            $donate_1 = $this->mysqli->query("SELECT `donate_" . $server['title'] . "` FROM `dle_users` WHERE `name` LIKE '$this->login'")->fetch_object()->$don_1;
            if ($this->donates[$donate_1]['cloak'] == "true") {
                $hd_cloak = "cloak_good";
                if ($this->donates[$donate_1]['hd_cloak'] == "true") {
                    $hd_cloak = "hd_cloak_good";
                }
                return $hd_cloak;
            }
        }
        return null;
    }

public function uploadCloak($uploadPath, $fileName = null) {
    $hd_cloak = "cloak_good";

    if (!isset($_FILES[0])) {
        die('{"message": "Файл не выбран!"}');
    }

    $filePath = $_FILES[0]['tmp_name'];
    $errorCode = $_FILES[0]['error'];

    if ($errorCode !== UPLOAD_ERR_OK || !is_uploaded_file($filePath)) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE   => 'max_file',
            UPLOAD_ERR_FORM_SIZE  => 'max_file',
            UPLOAD_ERR_PARTIAL    => 'partial_error',
            UPLOAD_ERR_NO_FILE    => 'file_not_found',
            UPLOAD_ERR_NO_TMP_DIR => 'no_temp_dir',
            UPLOAD_ERR_CANT_WRITE => 'no_write_permission',
            UPLOAD_ERR_EXTENSION  => 'wrong_extension',
        ];
        $outputMessage = isset($errorMessages[$errorCode]) ? $errorMessages[$errorCode] : 'Unknown error!';
        die('{"message": "' . $outputMessage . '"}');
    }

    $fi = finfo_open(FILEINFO_MIME_TYPE);
    $mime = (string) finfo_file($fi, $filePath);
    finfo_close($fi);

    if (strpos($mime, 'image/png') === false) {
        die('{"message": "Файл должен быть в формате PNG."}');
    }

    $image = getimagesize($filePath);
    $limit_ok = $hd_cloak == "hd_cloak_good" ? $this->perms['hd_cloak'] : $this->perms['cloak'];
    $limitBytes = $limit_ok * $limit_ok * 5;
    $limitWidth = $limit_ok;
    $limitHeight = $limit_ok;

    if (filesize($filePath) > $limitBytes || $image[1] > $limitHeight || $image[0] > $limitWidth) {
        //die('{"message": "Неверный размер файла!"}');
    }

    $name = $fileName ? $fileName : $this->login . '.png';

    if (!move_uploaded_file($filePath, $uploadPath . $name)) {
        die('{"message": "При записи изображения на диск произошла ошибка."}');
    } else {
        die('{"message": "Успешная загрузка!", "type": "success"}');
    }
}


}
?>
