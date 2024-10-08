<?php
/*FoxesModule%>
{
	"version": "V 1.0.0",
	"description": "EXP Module for sending Email"
}
<%FoxesModule*/

	if(!defined('FOXXEY')) {
		die ('{"message": "Not in FOXXEY thread"}');
	} else {
		define('FoxMail',true);
	}

class foxMail extends init{

	public $mail = false;
	public $send_error = false;
	public $smtp_msg = "Succesful send mail to ";
	public $from = false;
	public $html_mail = false;
	public $bcc = array ();
	public $keepalive = false;
	/* CONFIG */
	private $config = 
		array(
			'encoding' 			=> 'UTF-8'
		);
	
	function __construct($is_html = false) {
		global $config;
		require('Mailer.class.php');
		$this->mail = new PHPMailer;
		$this->mail->CharSet = $this->config['encoding'];
		$this->mail->Encoding = "base64";

		if($config['siteSettings']['mail_title']) {
			$this->mail->setFrom($config['siteSettings']['admin_mail'], $config['siteSettings']['mail_title']);
		} else {
			$this->mail->setFrom($config['siteSettings']['admin_mail'] );			
		}
		
		if($config['siteSettings']['mail_metod'] == "smtp") {
			$this->mail->isSMTP();
			$this->mail->Timeout = 10;
			$this->mail->Host = $config['siteSettings']['smtp_host'];
			$this->mail->Port = intval($config['siteSettings']['smtp_port'] );
			$this->mail->SMTPSecure = $config['siteSettings']['smtp_secure'];
			
			$this->mail->SMTPAuth = true;
			$this->mail->Username = $config['siteSettings']['contactEmail'];
			$this->mail->Password = $config['siteSettings']['smtp_pass'];
			$this->mail->From = $config['siteSettings']['contactEmail'];
			$this->mail->Sender = $config['siteSettings']['contactEmail'];
		}
		
		$this->mail->XMailer = "FoxesWorld CMS";
		
		if ( $is_html ) {
			$this->mail->isHTML();
			$this->html_mail = true;
		}
	}
	
	function send($to, $subject, $message) {
	
			if( $this->from ) {
				$this->mail->addReplyTo($this->from, $this->from);
			}
			
			$this->mail->addAddress($to);
			$this->mail->Subject = $subject;
			
			if($this->mail->Mailer == 'smtp' AND $this->keepalive ) {
				$this->mail->SMTPKeepAlive = true;
			}
			
			if( $this->html_mail ) {
				$this->mail->msgHTML($message);
			} else {
				$this->mail->Body = $message;
			}

			if( count( $this->bcc ) ) {
				
				foreach($this->bcc as $bcc) {
					$this->mail->addBCC($bcc);
				}
				
			}
			
			if (!$this->mail->send()) {
				$this->smtp_msg = $this->mail->ErrorInfo;
				$this->send_error = true;
				//die ('{"message": "'.$this->smtp_msg.'", "type": "error"}');
			} else {
				//die('{"message": "'.$this->smtp_msg.$to.'", "type": "success"}');
			}
			
			$this->mail->clearAllRecipients();
			$this->mail->clearAttachments();
	
	}
	
	function getTemplate($name) {
		ob_start();
		include (ROOT_DIR.$name);
		$text = ob_get_clean();
		return $text;
    }
	
	function addAttachment($path, $name = '', $encoding = 'base64', $type = '', $disposition = 'attachment') {
		$this->mail->addAttachment($path, $name, $encoding, $type, $disposition );
	}
}
?>