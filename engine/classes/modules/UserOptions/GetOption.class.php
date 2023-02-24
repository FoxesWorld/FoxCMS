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
                    case "link":
                        $this->buildPage($optionBody);
                        break;

                    case "pageContent":
                        $this->pageTemplate = $optionBody["optContent"];
                        break;
                }
                $this->pageTemplate = preg_replace('|(<useroption>).*(</useroption>)|Uis', '', $this->pageTemplate);
                die($this->pageTemplate);
            } else {
                die('{"message": "No access for option  `'.$this->requestedOption.'`", "availableOptions": '.json_encode(UserOptions::$userOptions["optionNames"]).'}');
            }
        }
    }

    private function buildPage($requestedOption) {
        $this->setTpl();
        foreach ($requestedOption as $key => $value) {
            $toReplace = "{".$key."}";
            if (strpos($this->pageTemplate, $toReplace)) {
                $this->pageTemplate = str_replace($toReplace, $value, $this->pageTemplate);
            }
        }
    }

    private function setTpl() {
        $this->pageTemplate = file::efile($this->pageTplFile)["content"];
    }
}