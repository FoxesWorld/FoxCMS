<?php

	class UserContent extends UserOptions {
		
		protected static function contentTagsReplacing($content){
			foreach(init::$usrArray as $userField => $value){
				$toReplace = "[".$userField."]";
				if(strpos($content,$toReplace)) {
					$content = str_replace($toReplace, $value, $content);
				}
			}
			return $content;
		}
		
	}