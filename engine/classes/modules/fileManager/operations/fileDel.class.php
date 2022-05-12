<?php
	class fileDel extends fileManager {
		
		protected static function delFile($path){
			if(@unlink($path)){
				exit('{"message": "Файл удален!", "type": "info"}');
			} else {
				exit('{"message": "Ошибка удаления!", "type": "warn"}');
			}
		}
		
	}