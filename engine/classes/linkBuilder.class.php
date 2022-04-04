<?php

	class linkBuilder extends init {
		
		private $links;
		private $strOut = "";

		function __construct(){
			global $config;
			$this->links = $config['links'];
		}
		
		public function buildLinks(){
			global $config;
			foreach($this->links as $key => $value){
				$this->strOut .= '<li><a '.$config['additionalString'].' href="'.$value[1].'">'.$value[2].$value[0].'</a><li>';
			}
			return $this->strOut;
		}
		
	}