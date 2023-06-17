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
			$form = '
			<form method="POST" action="/" id="CMSconfig">
			<table class="table table-striped">';
			foreach($config as $key => $val){
				if(is_bool($val)){
				if($val) $check = 'checked';
				$cfgValArr[] = '<tr>
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
			}
			$form .= implode('', $cfgValArr).'<input name="admPanel" class="input" type="hidden" value="setConfig" />
				</table>
				<input name="refresh" type="hidden" value="false" />
				<input name="sound" type="hidden" value="false" />
				<button type="submit" class="login"><i class="fa fa-floppy-o position-left"></i>Сохранить</button>
				</form>
				';
			return $form;
		}

		
		
		
		protected static function buildConfig($updatedCfg){
			global $config, $lang;
			$date = '['.date::getCurrentDate("day").'.'.date::getCurrentDate("month").'.'.date::getCurrentDate("year").']';
			$cfgString = '';
			$cfgValues = array();
			$itemsNum = count($updatedCfg);
			$i = 0;
			foreach($updatedCfg as $key => $val){
				$sym = '';
				if($i !== $itemsNum -1) {$sym = ',';}
				if(isset($config[$key])) {
					$overrideVal = "";
					switch($val){
						case "true":
							$overrideVal = 'true';
						break;
						
						case "false":
							$overrideVal = 'false';
						break;
						
						default:
							$overrideVal = '"'.$val.'"';
						/*
							if(intval($val) > 0) {
								$overrideVal = intval($val);
							} else {
								
							}
							*/
						break;
					}
					$cfgValues[] = "	'{$key}' => ". $overrideVal;
				}
				$i++;
			}
			$cfgString =  '<?php '.PHP_EOL.'    /* '.$date.' */'.PHP_EOL.'$config = array('.PHP_EOL.implode(",".PHP_EOL.PHP_EOL, $cfgValues).");\n\n?>";

			$status = file::efile(ENGINE_DIR.'data/config.php', false, $cfgString);
			if($status){
				functions::jsonAnswer($lang['configChanged'], false);
			}
		}
	}


