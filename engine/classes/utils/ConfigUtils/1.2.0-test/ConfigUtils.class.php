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
			$tabAdd = "";
			$counter = 0;
			$form = '
			<form method="POST" action="/" id="CMSconfig">
			<div class="panel panel-default">';
			$form .= $this->buildNav();
			foreach($config as $key => $val){
				if(functions::isJson($val)) {
					$json = json_decode($val);
					$val = $json->value;
					$tab = $json->tab;
				}
				$form .= '<div class="tab-content">';
				if($tabAdd != $tab) {
					$form .= '<div class="tab-pane fade show" id="'.$tab.'" role="tabpanel" aria-labelledby="'.$tab.'-tab">';
				}
				$form .= '<table class="table table-striped">';
				if(is_bool($val)){
				$check = "";
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
				if(stripos($val, ',')){
					echo "<script>new Tagify(document.querySelector('input[name=".$key."]'))</script>";
				}
				if($tabAdd != $tab) {
					$form .= '</div>';
					$tabAdd = $tab;
				}
			}
			$form .= implode('', $cfgValArr).'<input name="admPanel" class="input" type="hidden" value="setConfig" />
				</table>
				</div>
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
					$tabName = self::getTabName($key) ?? "";
					switch($tabName){
						case false:
						case "":
						case null:
							$keyVal = "	'{$key}' => ". $overrideVal;
						break;
						
						default:
							$keyVal = "	'{$key}' => "."'".'{"tab": "'.$tabName.'", "value": '.$overrideVal.'}'."'";
						break;
					}
					$cfgValues[] = $keyVal;
				}
				$i++;
			}
			$cfgString =  '<?php '.PHP_EOL.'    /* '.$date.' */'.PHP_EOL.'$config = array('.PHP_EOL.implode(",".PHP_EOL.PHP_EOL, $cfgValues).");\n\n?>";
			$status = file::efile(ENGINE_DIR.'data/config.php', false, $cfgString);
			if($status){
				functions::jsonAnswer($lang['configChanged'], false);
			}
		}
		
		private function buildNav(){
			global $config;
			$tabList = '<ul class="nav nav-tabs nav-tabs-solid" role="tablist">';
			$thisTab = '';
			$active = false;
			foreach($config as $key => $val){
				if(functions::isJson($val)) {
					$json = json_decode($val);
					$val = $json->value;
					$tab = $json->tab;
					if($thisTab !== $tab) {
					$thisTab = $tab;
					$tabList .= '
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="'.$tab.'-tab" data-bs-toggle="tab" data-bs-target="#'.$tab.'" type="button" role="tab" aria-controls="home" aria-selected="true">'.$tab.'</button>
						</li>';
					}
				}
			}
			$tabList .= '</ul>';
			return $tabList;
		}
		
		private static function getTabName($key){
			global $config;
			return json_decode($config[$key])->tab ?? false;
		}
	}


