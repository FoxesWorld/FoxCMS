<?php
	
	class linkBuilder extends elements {
		
		private $links;
		private $strOut = "";

		function __construct(){
			global $config;
			$this->links = $config['links'];
		}
		
		protected static function buildLinks(){
			$strOut = "";
			global $config;
			foreach($config['links'] as $key => $value){
				$strOut .= '<li><a '.$config['additionalString'].' href="'.$value[1].'">'.$value[2].$value[0].'</a><li>';
			}
			return $strOut;
		}
		
	}