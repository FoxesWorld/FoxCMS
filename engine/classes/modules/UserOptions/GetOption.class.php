<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}
class GetOption extends UserOptions {

    private $getOptionRequest = "getOption";
    private $pageRplace = array();
    private $pageTplFile;
    private $pageTemplate;
    private $requestedOption;
    private $requestLogin;

    function __construct($userLogin) {
        global $config;
        if (@isset(init::$REQUEST[$this->getOptionRequest])) {
            $this->pageTplFile = TEMPLATE_DIR.$config['pageTplFile'];
            $this->requestedOption = functions::filterString($_POST[$this->getOptionRequest]);
            if (in_array($this->requestedOption, UserOptions::$userOptions["optionNames"])) {
                $optionSettings = json_decode(UserOptions::getOptionData($this->requestedOption), true);
                $optionBody = UserOptions::$userOptions[$this->requestedOption];
                switch ($optionSettings["type"]) {
                    case "page":
                        $this->buildPage($optionBody);
                        break;

                    case "pageContent":
                        $this->pageTemplate = $this->getPageContents($optionBody["optContent"]);
                        break;
                }
                $this->pageTemplate = preg_replace('|(<useroption>).*(</useroption>)|Uis', '', $this->pageTemplate);
                die($this->pageTemplate);
            } else {
                die('{"message": "No access for option  `'.$this->requestedOption.'`"}');
            }
        }
    }
	
	private function getPageContents($page) {
		return functions::getStrBetween($page, "<pageContent>", "</pageContent>")[0];
	}

    private function buildPage($requestedOption) {
        $this->setTpl();
        foreach ($requestedOption as $key => $value) {
            $toReplace = "{".$key."}";
            if (strpos($this->pageTemplate, $toReplace)) {
				switch($toReplace){
					case "{optContent}":
						$value = $this->getPageContents($value);
					break;
				}
			$this->pageTemplate = str_replace($toReplace, $value, $this->pageTemplate);
            }
        }
    }

    private function setTpl() {
        $this->pageTemplate = file::efile($this->pageTplFile)["content"];
    }
}