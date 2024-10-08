<?php

if(!defined('FOXXEY')) {
	header( "HTTP/1.1 403 Forbidden" );
	header ( 'Location: /' );
	die( "Hacking attempt!" );
}

class EmojiParser implements JsonSerializable {
	
	private $emojiFile = CURRENT_TEMPLATE."assets/emoticons/emoji.json";
	private $catNum = 0;
	private $emojiList = array();
	private $emojiUrl = array();
	
	function __construct() {
		$this->parseEmojis();
	}
	
	private function parseEmojis(){ 
		$emoji = json_decode(file::efile($this->emojiFile)["content"], false);
		foreach ($emoji as $key => $value) {
			$categoryEmojis = array();
			foreach($value->emoji as $thisEmo){
				$categoryEmojis[] = array("emojiCode" => @$thisEmo->code, "emojiName" => @$thisEmo->name);
				$this->emojiUrl[@$thisEmo->name] = CURRENT_TEMPLATE."assets/emoticons/".$value->category.'/'.$thisEmo->name.'.png';
			}
			$this->emojiList[$value->category][] = $categoryEmojis;
			$this->catNum++;
		}
	}
	
	public function jsonSerialize() {
		return $this->emojiList;
	}
	
	public function getEmoticonUrl($key){
		return @$this->emojiUrl[$key];
	}
}
?>