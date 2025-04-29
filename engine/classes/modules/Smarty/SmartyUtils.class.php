<?php 

	class smartyUtils extends smartyInit {
		
		protected $db;
		
		function __construct($db) {
			$this->db = $db;
		}
		
		protected function assignUserFields($smarty) {
			global $config;
			$fieldsArray = explode(",", $config['other']['userFieldsArray']);
			foreach($fieldsArray as $key){
				@$smarty->assign($key, init::$usrArray[$key]);
			}
		}
		
protected function assignJs() {
    global $jsCfg, $config;
    $userPermissions = init::$permissions;
    $builtInJS = '<script>';
    $replaceArray = array_merge($config['frontendSettings'], init::$usrArray);

    $jsData = [];
    $replaceFields = [];

    foreach ($replaceArray as $key => $value) {
        $replaceFields[] = '"' . $key . '"';

        $decodedValue = json_decode($value, true);

        if (is_array($decodedValue)) {
            $data = json_encode($decodedValue);
        } else {
            $data = '"' . addslashes($value) . '"';
        }

        $jsData[] = '"' . $key . '": ' . $data;
    }

    //foreach ($userPermissions as $permission) {
    //    $jsData[] = $permission;
    //}

    $builtInJS .= "const replaceData = {\n" . implode(",\n", $jsData) . "\n};\n";
    $builtInJS .= "const userFields = [" . implode(",\n", $replaceFields) . "];\n";
    $builtInJS .= '</script>';

    return $builtInJS;
}

	}