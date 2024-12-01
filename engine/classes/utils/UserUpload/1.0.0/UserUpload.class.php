<?php

class UserUpload extends Uploader {

    protected function validateFile($filePath) {
        $hd_cloak = "cloak_good";

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
    }
}