<?php

	class linkBuilder extends init {
		
		private $links;
		private $strOut = "";
		private $additionalString = 'onclick="$(this).notify(\'Work In Progress!\', \'info\'); return false"';
		
		function __construct(){
			global $config;
			$this->links = $config['links'];
		}
		
		public function buildLinks(){
			foreach($this->links as $key => $value){
				$this->strOut .= '<li><a '.$this->additionalString.' href="'.$value[1].'">'.$value[2].$value[0].'</a><li>';
			}
			return $this->strOut;
		}
		
	}