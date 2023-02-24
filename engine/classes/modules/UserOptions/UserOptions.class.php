<?php
/*FoxesModule%>
{
	"version": "V 0.1.7 Beta",
	"description": "Module to select options for a current user",
	"image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABJmlDQ1BBZG9iZSBSR0IgKDE5OTgpAAAoz2NgYDJwdHFyZRJgYMjNKykKcndSiIiMUmA/z8DGwMwABonJxQWOAQE+IHZefl4qAwb4do2BEURf1gWZxUAa4EouKCoB0n+A2CgltTiZgYHRAMjOLi8pAIozzgGyRZKywewNIHZRSJAzkH0EyOZLh7CvgNhJEPYTELsI6Akg+wtIfTqYzcQBNgfClgGxS1IrQPYyOOcXVBZlpmeUKBhaWloqOKbkJ6UqBFcWl6TmFit45iXnFxXkFyWWpKYA1ULcBwaCEIWgENMAarTQZKAyAMUDhPU5EBy+jGJnEGIIkFxaVAZlMjIZE+YjzJgjwcDgv5SBgeUPQsykl4FhgQ4DA/9UhJiaIQODgD4Dw745AMDGT/0ZOjZcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGZmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTEwLTAyVDEzOjM1OjI4KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTEwLTAyVDEzOjM1OjI4KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0xMC0wMlQxMzozNToyOCswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkNzY5ZjU1OC0wOWRmLTBhNDYtYjYwOC1lZWRmZWU5OGJiYmIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiMzg2ZTRiYS03ZGNhLTcyNGUtOTlhYy0zMDU3MWRkOTgwYzIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMGRhMmRkZS0xZTUzLWQ2NGUtYjUyNC1iMjk1OTYzNDRlZTIiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMGRhMmRkZS0xZTUzLWQ2NGUtYjUyNC1iMjk1OTYzNDRlZTIiIHN0RXZ0OndoZW49IjIwMjItMTAtMDJUMTM6MzU6MjgrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDc2OWY1NTgtMDlkZi0wYTQ2LWI2MDgtZWVkZmVlOThiYmJiIiBzdEV2dDp3aGVuPSIyMDIyLTEwLTAyVDEzOjM1OjI4KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9j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"}
<%FoxesModule*/
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}
$UserOptions = new UserOptions();

class UserOptions extends init {

    /* THIS CODE IS LEGACY!!!
		 * A LOT OF THINGS MUST BE REDONE!!!
		 * WILL BE IMPROVED LATER!!!
		 */

    /* UserOptions Configuration */
    private array $dataToReplace = array(
        "optionTitle",
        "optionPreText",
        "optionName",
        "optionBlock",
        "type"
    );
    private array $addTheLast =
    array("logout" =>
        array(
            "optionTitle" => '<button type="submit" class="logout"><i class="fa fa-sign-out"></i> Выйти</button>',
            "optionBlock" => "#usrMenu",
            "optionPreText" => "",
            "type" => "plainText"
        ));
    protected static array $allOptionsArray = array("optionObjects" => array(), "optionNames" => array());

    /* UserOptionsExport Data*/
    protected static array $userOptions = array();
    protected static $builtMenu;

    function __construct() {
        global $config;
        init::requireNestedClasses(basename(__FILE__), __DIR__);
        $this->allOptionsFilling(TEMPLATE_DIR.$config['userOptions']);
        $this->userOptionsArrayFilling();
        $this->userMenuBuild();
        $GetMenu = new GetMenu(init::$usrArray['login']);
        $GetOption = new GetOption(init::$usrArray['login']);
    }

    /*
		 * Filling all found options Array
		 */
    private function allOptionsFilling($scanDir) {
        $optionsAmount = 0;
        self::$allOptionsArray["optionObjects"] = filesInDir::filesInDirArray($scanDir);
        foreach (self::$allOptionsArray["optionObjects"] as $optionObject) {
			if(!is_dir($scanDir.DIRECTORY_SEPARATOR.$optionObject)) {
				if(strpos($optionObject, ".ftpl")) {
					$optionName = explode('.', $optionObject)[0];
					$filePath = $scanDir.DIRECTORY_SEPARATOR.$optionObject;
					if(is_dir($filePath)) { echo $optionObject;}
					self::$allOptionsArray["optionNames"][] = $optionName;
					$optionContents = file::efile($filePath)["content"];
					self::$allOptionsArray["options"][$optionName]["optContent"] = UserContent::contentTagsReplacing($optionContents);
					self::$allOptionsArray["options"][$optionName]["optSettings"] = functions::getStrBetween($optionContents, "<useroption>", "</useroption>")[0];
					$optionsAmount++;
				}
			} else {
				$this->allOptionsFilling($scanDir.DIRECTORY_SEPARATOR.$optionObject);
			}
        }
        self::$allOptionsArray["optionsAmount"] = $optionsAmount;
    }

    private function userOptionsArrayFilling() {
        $optionsAmount = 0;
        foreach (self::$allOptionsArray["options"] as $optionFname => $optionConf) {
            if ($this->isOption($optionFname)) {
                $thisOptionSettings = self::$allOptionsArray["options"][$optionFname]["optSettings"];
                $decodedOption = json_decode($thisOptionSettings, true);
                $canAccess = $this->checkUserAccess(init::$usrArray["user_group"], $decodedOption["optionGroup"]);
                if ($canAccess === true) {

                    switch ($decodedOption["type"]) {
                        case "plainText":
                            case "page":
                                self::$userOptions[$optionFname]["optContent"] = $this->getContentByName($optionFname);
                                self::$userOptions[$optionFname]["optSettings"] = $this->getConfigByName($optionFname);
                                self::$userOptions[$optionFname]["optTitle"] = $decodedOption["optionTitle"];
                                self::$userOptions[$optionFname]["optPreText"] = $decodedOption["optionPreText"];
                                break;

                            case "pageContent":
                                self::$userOptions[$optionFname]["optContent"] = $this->getContentByName($optionFname);
                                self::$userOptions[$optionFname]["optSettings"] = $this->getConfigByName($optionFname);
                                break;
                    }
                    self::$userOptions[$optionFname]["optType"] = $decodedOption["type"];
                    $optionsAmount++;
                }
            }
        }
        self::$userOptions["optionsAmount"] = $optionsAmount;
    }


    private function userMenuBuild() {
        if (isset(self::$userOptions["optionsAmount"])) {
            $count = 0;
            foreach (self::$userOptions as $key => $value) {
                if ($this->isOption($key)) {
                    $thisConfig = json_decode(self::$userOptions[$key]["optSettings"], true);
                    foreach ($thisConfig as $optArrayElement => $value) {
                        if ($this->isOptionFillValue($optArrayElement)) {
                            $arr[$key][$optArrayElement] = $value;
                        }
                    }
                    self::$builtMenu["optionArray"][] = $arr;
                    if ($count === self::$userOptions["optionsAmount"] -1) {
                        if (init::$usrArray['user_group'] !== 5) {
                            self::$builtMenu["optionArray"][] = $this->addTheLast;
                            $count++;
                        }
                    }
                    self::$userOptions["optionNames"][] = $key;
                    $count++;
					unset($arr);
                }
            }
            self::$builtMenu["optionAmount"] = $count;
            self::$builtMenu = json_encode(self::$builtMenu, JSON_UNESCAPED_UNICODE);
        }
    }

    private function getConfigByName($name) {
        return self::$allOptionsArray["options"][$name]["optSettings"];
    }

    private function getContentByName($name) {
        return self::$allOptionsArray["options"][$name]["optContent"];
    }

    private function isOption($option): bool {
        if (in_array($option, self::$allOptionsArray["optionNames"])) {
            return true;
        } else {
            return false;
        }
    }

    private function isOptionFillValue($value): bool {
        if (in_array($value, $this->dataToReplace)) {
            return true;
        } else {
            return false;
        }
    }
	
	protected static function getOptionData($option){
		return self::$allOptionsArray["options"][$option]["optSettings"];
	}

    /* REPEATING CODE FROM PluginScanner!!! */
    private function checkUserAccess($usergroup, $optionAccessGroup): bool {
        switch (is_array($optionAccessGroup)) {
            case true:
                if (in_array($usergroup, $optionAccessGroup)) {
                    return true;
                }
                break;

            case false:
                if ($usergroup == $optionAccessGroup) {
                    return true;
                }
                break;
        }
        return false;
    }
}
?>