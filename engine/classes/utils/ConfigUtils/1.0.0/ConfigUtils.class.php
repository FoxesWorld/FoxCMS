<?php

	class ConfigParser extends AdminOptions {
		
		private $jsonString = array();
				
		function __construct() {

		}
		
		protected function buildCurrentCfg() {
			global $config;
			foreach($config as $key => $val){
				$this->jsonString[$key] = $val;
			}
		}
		
		protected function buildConfigPage() {
			global $config, $lang;
			$cfgValArr = array();
			$counter = 0;
			$activeShow = 'active show';
			$form = $this->buildNav();
			$form .= '
			<form method="POST" action="/" id="CMSconfig">';
			$form .= '<div class="panel panel-default">';
			
			foreach($config as $tabName => $unitArr){
				$cfgValArr[] = '<div class="tab-pane fade '.$activeShow.'" id="'.$tabName.'" role="tabpanel" aria-labelledby="'.$tabName.'-tab">
				<div class="panel-body">
					'.@$lang[$tabName.'-desc'].'
				  </div>
				<table class="table table-striped">';
				$activeShow = "";
			foreach($unitArr as $key => $val){

			if(is_bool($val)){
				$check = "";
				if($val) $check = 'checked';
				$cfgValArr[] = '
				<tr>
						<td class="col-xs-6 col-sm-6 col-md-7">
							<h6 class="media-heading text-semibold">'.@$lang[$key.'-title'].'</h6>
							<span class="text-muted text-size-small hidden-xs">'.@$lang[$key.'-desc'].'</span>
						</td>
						<td class="col-xs-6 col-sm-6 col-md-5">
							<input type="checkbox" name="'.$key.'" class="switch-'.$counter.'" '.$check.' />
						</td>
						<script>new Switchery(document.querySelector(".switch-'.$counter.'"))</script>
				</tr> ';
			} else {
				$cfgValArr[] = '<tr>
					<td class="col-xs-6 col-sm-6 col-md-7">
						<h6 class="media-heading text-semibold">
							'.@$lang[$key.'-title'].'
						</h6>
						<span class="text-muted text-size-small hidden-xs">'.@$lang[$key.'-desc'].'</span>
					</td>
					<td class="col-xs-6 col-sm-6 col-md-5">
							<input type="text" class="form-control" value="'.$val.'" name="'.$key.'" />
					</td>
				</tr>';
				}
				$counter++;
				if(stripos($val, ',')){
					echo "<script>new Tagify(document.querySelector('input[name=".$key."]'))</script>";
				}
			}
				$cfgValArr[] = '</table>
				</div>';
			}
			$form .= implode('', $cfgValArr).'<input name="admPanel" class="input" type="hidden" value="setConfig" />
				
				<input name="refreshPage" type="hidden" value="false" />
				<input name="playSound" type="hidden" value="false" />
				<button type="submit" class="btn bg-teal btn-sm btn-raised position-left legitRipple">
					<i class="fa fa-floppy-o position-left"></i>Сохранить
				</button>
				</div>
				</form>
				
				';
			return $form;
		}
		
		protected static function buildConfig($updatedCfg){
			global $config, $lang;
			$date = '['.date::getCurrentDate("day").'.'.date::getCurrentDate("month").'.'.date::getCurrentDate("year").']';
			$cfgString = '';
			$cfgValues = "";
			$itemsNum = count($updatedCfg);
			$i = 0;
			$unitCount = 0;
			$units = self::getUnits();
			foreach($units as $unitVal){	
				$cfgValues = '	"'.$units[$unitCount].'" => array(';
				$thisUnit = array();
			foreach($updatedCfg as $key => $val){
				$sym = '';
				if($i !== $itemsNum -1) {
					$sym = ',';
				}
				if(isset($config[$units[$unitCount]][$key])) {
					$overrideVal = "";
					switch($val){
						case "true":
							$overrideVal = 'true';
						break;
						
						case "false":
							$overrideVal = 'false';
						break;
						
						default:
							if(is_array(json_decode($val, true))) {
								$jsonString = json_decode($val, true);
								$arr = array();
								foreach($jsonString as $val => $value){
									$arr[] = $value['value'];
								}
								$val = implode(',', $arr);
							} 
							$overrideVal = '"'.$val.'"';
						break;
					}
					if($key !== null) {
					$thisUnit[] = '		"'.$key.'" => '.$overrideVal;
					}
				}
				$i++;
			}
			$cfgValues .= PHP_EOL.implode(",".PHP_EOL,$thisUnit).PHP_EOL.')';
			$readyUnits[] = $cfgValues;
			$unitCount++;
		}
			$cfgString =  '<?php '.PHP_EOL.'    /* '.$date.' */'.PHP_EOL.'$config = array('.PHP_EOL.implode(",".PHP_EOL.PHP_EOL, $readyUnits).");\n\n?>";
			$status = file::efile(ENGINE_DIR.'data/config.php', false, $cfgString);
			if($status){
				functions::jsonAnswer($lang['configChanged'], false);
			}
		}
		
		private function buildNav(){
			global $lang;
			$tabList = '<div class="navbar navbar-default navbar-component" style="margin-bottom:20px;">
			<ul class="nav nav-tabs nav-tabs-solid" role="tablist">';
			$thisTab = '';
			$active = "active";
			foreach(self::getUnits() as $key){
				if($thisTab !== $key) {
					$thisTab = $key;
					$tabList .= '
						<li class="nav-item tip-over" id="'.$thisTab.'-selector" role="presentation" title="'.@$lang[$thisTab.'-desc'].'">
							<button class="nav-link '.$active.'" id="'.$thisTab.'-tab" data-bs-toggle="tab" data-bs-target="#'.$thisTab.'" type="button" role="tab" aria-controls="home" aria-selected="true">'.@$lang[$thisTab.'Tab'].'</button>
						</li><script>$("#'.$thisTab.'-selector").tooltip({placement: "bottom", trigger: "hover"});</script>';
						$active = "";
					}
			}
			$tabList .= '</ul></div>';
			return $tabList;
		}
		
		private static function getUnits(){
			global $config;
			$units = array();
			foreach($config as $key => $val){
				$units[] = $key;
			}
			return $units;
		}

	}


/*
	echo "<pre>";
	var_dump($readyUnits);
	echo "</pre>";
	die(); */