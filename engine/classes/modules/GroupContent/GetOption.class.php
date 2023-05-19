<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}
class GetOption extends UserOptions {

    private $getOptionRequest = "getOption";
    private $pageRplace = array();
    private $pageTplFile;
    private $requestedOption;
    private $requestLogin;

    function __construct($userLogin, $db, $logger) {
        global $config;
		init::classUtil('SSV', "1.0.0");
        if (@isset(RequestHandler::$REQUEST[$this->getOptionRequest])) {
            $this->pageTplFile = TEMPLATE_DIR.$config['pageTplFile'];
            $requestedOption = functions::filterString($_POST[$this->getOptionRequest]);
			$pageTemplate = self::getPageContent($requestedOption, $this->pageTplFile);
			/*
			*	SERVER SIDE VERIFICATION
			*/
			$SSV = new SSV($pageTemplate, $userLogin, $db, $logger);
        }
    }
	
	public static function getPageContent($pageObject, $filePath){
		 if (@in_array($pageObject, self::$userOptions["optionNames"])) {
				$optionJson = UserOptions::getOptionData($pageObject);
                $optionSettings = json_decode($optionJson, true);
                $optionBody = self::$userOptions[$pageObject];
                switch ($optionSettings["type"]) {
                    case "page":
                        $pageTemplate = self::buildPage($optionBody, $filePath);
                        break;

                    case "pageContent":
                        $pageTemplate = $optionBody["optContent"];
                        break;
                }

				return $pageTemplate;

            } else {
                die('{"message": "No access for option  `'.$pageObject.'`"}');
            }
	}
	
	private static function getPageContents($page) {
		return functions::getStrBetween($page, "<pageContent>", "</pageContent>")[0];
	}
	
	private static function selectContent($parentName) {
		
	}

    private static function buildPage($requestedOption, $file) {
        $pageTemplate = self::setTpl($file);
        foreach ($requestedOption as $key => $value) {
            $toReplace = "{".$key."}";
            if (strpos($pageTemplate, $toReplace)) {
				/*
				switch($toReplace){
					case "{optContent}":
						$value = self::getPageContents($value);
					break;
				} */
			$pageTemplate = str_replace($toReplace, $value, $pageTemplate);
            }
        }
		return $pageTemplate;
    }

    private static function setTpl($file) {
        return file::efile($file)["content"];
    }
}