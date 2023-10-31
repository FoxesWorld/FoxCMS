<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class TelegramSend {
	
	private $botToken;
	private $chatId;
	private $sendUrl;
	private $keysToCollect = array("mobilePhoneNumber", "fullName");
	
	function __construct(){
		global $config;
		$this->botToken = $config['other']['telegramBotToken'];
		$this->chatId = $config['other']['telegramChatId'];
	}
	
	public function sendMessage($message) {
		global $config, $lang;
        $this->sendUrl = "https://api.telegram.org/bot{$this->botToken}/sendMessage";
        $messageString = $lang['newOrder']."\n".$this->buildMessageString($message);
		$chatsToSend = $config['other']['telegramChatId'];
		if(strpos($chatsToSend, ',')) {
			$chatsArray = explode(',', $chatsToSend);
		}
		
		if(@is_array($chatsArray)) {
			foreach($chatsArray as $chatId){
				$this->sendTo($chatId, $messageString);
			}
		} else {
			$this->sendTo($chatsToSend, $messageString);
		}
    }
	
	private function buildMessageString($msgArr){
		global $lang;
		$msgStr = "";
		foreach($msgArr as $msgKey => $value){
			if(in_array($msgKey, $this->keysToCollect)) {
				$msgStr .= '<b>'.$lang[$msgKey].'</b> - '.$value . "\n";
			}
		}
		
		return $msgStr;
	}
	
	private function sendTo($chatId, $msg) {
		 $postData = [
            'chat_id' => $chatId,
            'text' => $msg,
			'parse_mode' => "html"
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->sendUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            return "cURL error: " . $error;
        } else {
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpCode != 200) {
                return "HTTP error: " . $httpCode;
            } else {
                return "Message sent to ".$chatId."!";
            }
        }
	}
}
?>