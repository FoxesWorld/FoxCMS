<?php
if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}

class GetOption extends UserOptions
{
    private string $optionRequestKey = "getOption";
    private string $pageTplFile = "staticPage.tpl";
	protected $db;
	private static $groupDataArr;

    public function __construct(string $userLogin, $db, $logger)
    {
        global $config;

        init::classUtil('SSV', "1.0.0");
		$this->db = $db;
        if (!empty(RequestHandler::$REQUEST[$this->optionRequestKey])) {
            $login = functions::filterString($userLogin);

            init::classUtil('LoadUserInfo', "1.0.0");
            $loadUserInfo = new LoadUserInfo($login, $db);
            $userData = $loadUserInfo->userInfoArray();
			$groupAssociacion = new GroupAssociacion($userData['user_group'], $db);
			$userData["groupName"] = $groupAssociacion->userGroupName();
			$userData["groupColor"] = $groupAssociacion->userGroupColor();
			
			self::$groupDataArr = $groupAssociacion->getGroupArray();

            $requestedOption = functions::filterString($_POST[$this->optionRequestKey] ?? '');
            $templatePath = TEMPLATE_DIR . $this->pageTplFile;

            $pageTemplate = self::getPageContent($requestedOption, $templatePath, $userData);

            // SERVER SIDE VERIFICATION
            new SSV($pageTemplate, $login, $userData, $db, $logger);
        }
    }

    public static function getPageContent(string $optionName, string $filePath, $userData): string
    {
        global $lang;

        if (!in_array($optionName, self::$userOptions['optionNames'] ?? [])) {
			
			$replaceValues = [
				'{replace}' => $optionName,
				'{groupName}' => $userData["groupName"],
				'{groupColor}' => $userData["groupColor"]
			];

			$errorMessage = $lang['optionInvalid'] ?? 'Invalid option: {replace}';
			foreach ($replaceValues as $search => $replace) {
				$errorMessage = str_replace($search, $replace, $errorMessage);
			}
			die(json_encode(['error' => $errorMessage]));

        }

        $optionJson = UserOptions::getOptionData($optionName);
        $optionSettings = json_decode($optionJson, true);
        $optionBody = self::$userOptions[$optionName] ?? [];

        if (!isset($optionSettings['type'])) {
            die(json_encode(['error' => 'Missing option type.']));
        }

        switch ($optionSettings['type']) {
            case 'page':
                return self::buildPage($optionBody, $filePath);

            case 'userOption':
                $template = self::buildPage($optionBody, $filePath);
                $content = $optionBody['optContent'] ?? '';
                return self::replaceContentBlock($template, $content);

            case 'pageContent':
                return $optionBody['optContent'] ?? '';

            default:
                die(json_encode(['error' => 'Unknown option type.']));
        }
    }

    private static function buildPage(array $data, string $templateFile): string
    {
        $pageTemplate = self::loadTemplate($templateFile);

        foreach ($data as $key => $value) {
            $placeholder = "{" . $key . "}";
            if (strpos($pageTemplate, $placeholder) !== false) {
                $pageTemplate = str_replace($placeholder, $value, $pageTemplate);
            }
        }

        return $pageTemplate;
    }

    private static function loadTemplate(string $filePath): string
    {
        $fileContent = file::efile($filePath);
        return $fileContent['content'] ?? '';
    }

    private static function replaceContentBlock(string $template, string $content): string
    {
        return preg_replace(
            '#<pageContent>.*?</pageContent>#is',
            '<pageContent>' . $content . '</pageContent>',
            $template
        ) ?: $template;
    }

    private static function replaceUserOptionBlock(string $template, string $content): string
    {
        return preg_replace(
            '#<useroption>.*?</useroption>#is',
            '<useroption>' . $content . '</useroption>',
            $template
        ) ?: $template;
    }
}
