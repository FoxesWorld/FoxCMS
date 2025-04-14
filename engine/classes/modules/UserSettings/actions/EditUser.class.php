<?php

if (!defined('profile')) {
    die(json_encode(["message" => "Not in profile thread"]));
}

class EditUser extends User
{
    /* CFG */
    private array $dbQueryConstruct = ["realname", "user_group", "email", "userStatus", "land", "colorScheme"];

    /* EditStatus */
    private string $status = "success";
    private string $action = "";
    private string $statusInfo = "";
    private string $baseColor = "#bfc0c0ab";

    /* INPUT */
    private array $requestArray;
    private string $inputLogin = "";
    private string $inputHash = "";
    private ?string $inputPassword = null;
    private string $inputEmail = "";
    private string $inputGroup = "";

    /* Свойство для SQL-части обновления пароля */
    private ?string $newPasswordClause = null;

    protected $db;
    protected $logger;
    private string $userQuery = "";

    private array $lang;
    private array $config;

    public function __construct(array $request, $db, $logger)
    {
        global $config, $lang;
        $this->db          = $db;
        $this->logger      = $logger;
        $this->lang        = $lang;
        $this->config      = $config;
        $this->requestArray = $request;
        $this->statusInfo  = $this->lang['profileEdit']['profileUpdated'];

        try {
            $this->validateAndProcess();

            if (!empty($request['image']) && $request['image'] !== "null") {
                require_once(MODULES_DIR . "FileUpload/submit.php");
                routeEntry(ENTRY_FIELD, [
                    'FILE_OBJECTS'                => 'handle_file_post',
                    'BASE64_ENCODED_FILE_OBJECTS' => 'handle_base64_encoded_file_post',
                    'TRANSFER_IDS'                => 'handle_transfer_ids_post'
                ], $this->db, $this->logger, $this->requestArray);
            }

            AuthManager::updateSession($this->db);

        } catch (Exception $e) {
            $this->status    = "error";
            $this->statusInfo = $e->getMessage();
            $this->sendResponse();
        }

        $this->sendResponse();
    }

    private function sendResponse(): never
    {
        die(json_encode([
            "message" => $this->statusInfo,
            "type"    => $this->status,
            "action"  => $this->action
        ]));
    }

    private function validateAndProcess(): void
    {
        if (empty($this->requestArray['login']) || $this->requestArray['login'] === "null") {
            throw new Exception($this->lang['profileEdit']['noLoginSent']);
        }

        $this->inputLogin = $this->requestArray['login'];

        if (init::$usrArray['login'] === "anonymous") {
            throw new Exception($this->lang['profileEdit']['needAuthorise']);
        }

        if (empty($this->requestArray['foxesHash']) || $this->requestArray['foxesHash'] === "null") {
            throw new Exception($this->lang['profileEdit']['noHashSent']);
        }
        $this->inputHash = $this->requestArray['foxesHash'];
        if ($this->inputHash !== $this->getUserField("hash")) {
            throw new Exception(str_replace('{user}', $this->inputLogin, $this->lang['profileEdit']['hashMismatch']));
        }
        
        // Проверяем пароль только если пользователь не админ.
        // Здесь предполагается, что идентификатор группы администратора равен 1.
        if (init::$usrArray['user_group'] != 1) {
            if (empty($this->requestArray['password']) || $this->requestArray['password'] === "null") {
                $this->action = $this->addScript(".currentPass", 0, "shake");
                throw new Exception($this->lang['profileEdit']['noPassword']);
            }
            $this->inputPassword = $this->requestArray['password'];

            if (!authorize::passVerify($this->inputPassword, $this->getUserField("password"))) {
                throw new Exception($this->lang['profileEdit']['incorrectPassword']);
            }
        }

        if (empty($this->requestArray['email']) || $this->requestArray['email'] === "null") {
            throw new Exception($this->lang['profileEdit']['noEmail']);
        }
        $this->inputEmail = $this->requestArray['email'];
        if (!filter_var($this->inputEmail, FILTER_VALIDATE_EMAIL)) {
            throw new Exception($this->lang['profileEdit']['invalidEmail']);
        }

        if (isset($this->requestArray['userStatus']) && mb_strlen($this->requestArray['userStatus']) > 32) {
            throw new Exception("Status is longer than 32!");
        }

        if (empty($this->requestArray['user_group']) || $this->requestArray['user_group'] === "null") {
            throw new Exception($this->lang['profileEdit']['nouser_group']);
        }
        $this->inputGroup = $this->requestArray['user_group'];
        if ($this->inputGroup !== $this->getUserField("user_group") && init::$usrArray['groupTag'] !== "admin") {
            throw new Exception($this->lang['profileEdit']['invaliduser_group']);
        }

        $profileEditGroups = explode(',', $this->config['other']['canEditGroup']);
        if (!in_array(init::$usrArray['user_group'], $profileEditGroups)) {
            throw new Exception($this->lang['profileEdit']['restrictduser_group']);
        }

$this->checkNewPassword(
    $this->requestArray['newPass'] ?? null,
    $this->requestArray['repeatPass'] ?? null
);

        $this->applyProfileChanges();
    }

private function applyProfileChanges(): void
{
    $fieldsToUpdate = [];

    // Если новый пароль был передан — добавляем его в SQL-запрос
    if ($this->newPasswordClause !== null) {
        $fieldsToUpdate[] = $this->newPasswordClause;
    }

    // Добавляем остальные поля, если они заданы
    foreach ($this->dbQueryConstruct as $field) {
        if (isset($this->requestArray[$field])) {
            $fieldsToUpdate[] = "`$field` = :$field";
        }
    }

    // Если нечего обновлять — выбрасываем исключение
    if (empty($fieldsToUpdate)) {
        throw new Exception("Нет данных для обновления");
    }

    $setClause = implode(", ", $fieldsToUpdate);
    $query = "UPDATE `users` SET $setClause WHERE login = :login";

    $stmt = $this->db->prepare($query);
    if (!$stmt) {
        throw new Exception("Ошибка подготовки запроса к базе данных");
    }

    // Привязываем пароль, если он был установлен (т.е. если новый пароль был передан)
    if ($this->newPasswordClause !== null) {
        $stmt->bindValue(":password", $this->requestArray['password']);
    }

    // Привязываем остальные параметры
    foreach ($this->dbQueryConstruct as $field) {
        if (isset($this->requestArray[$field])) {
            $stmt->bindValue(":$field", $this->requestArray[$field]);
        }
    }
    $stmt->bindValue(":login", $this->inputLogin);
    if (!$stmt->execute()) {
        throw new Exception("Ошибка при выполнении обновления пользователя");
    }
}	

private function checkNewPassword(?string $newPass, ?string $repeatPass): void
{
    // Приводим к строке и убираем лишние пробелы
    $newPass    = trim((string)$newPass);
    $repeatPass = trim((string)$repeatPass);

    // Если оба значения равны пустой строке, "null" или "undefined" — не обновляем пароль
    $invalidValues = ['', 'null', 'undefined'];
    if (in_array($newPass, $invalidValues, true) && in_array($repeatPass, $invalidValues, true)) {
        //$this->logger->WriteLine("Passes - {$newPass} and {$repeatPass} (ignored)");
        return;
    }

    // Если одно из полей пустое или они не совпадают — выдаём ошибку
    if ($newPass === '' || $repeatPass === '' || $newPass !== $repeatPass) {
        $this->action = $this->addScript(".changePass", 2, "shake");
        throw new Exception("PassMismatch");
    }

    $passLength = functions::FoxesStrlen($newPass);
    if ($passLength < 6) {
        throw new Exception("PassShorterThan6");
    } elseif ($passLength > 72) {
        throw new Exception("PassLonger72");
    }

    $hashedPass = password_hash($newPass, PASSWORD_DEFAULT);
    $this->newPasswordClause = "`password` = :password";
    $this->requestArray['password'] = $hashedPass;
}



/*

    private function canSetColor(string $color): bool
    {
        if ($color === $this->baseColor) {
            return true;
        }
        $allowedColors = $this->allColors();
        if (in_array($color, $allowedColors, true)) {
            return true;
        }
        return in_array(init::$usrArray['colorScheme'], $allowedColors, true);
    }

    private function allColors(): array
    {
        return init::$dynamicConfig['allowedColors'] ?? [];
    }
	*/

    private function getUserField(string $userField)
    {
        return functions::getUserData($this->inputLogin, $userField, $this->db);
    }

    private function addScript(string $element, int $n, string $anim): string
    {
        $script = "(function() {
            if (typeof foxEngine !== 'undefined' && foxEngine.editUser && typeof foxEngine.editUser.openTab === 'function') {
                foxEngine.editUser.openTab({$n});
            }
            var tabContents = document.querySelectorAll('{$element}');
            tabContents.forEach(function(el) {
                el.classList.add('{$anim}');
                el.addEventListener('animationend', function() {
                    el.classList.remove('{$anim}');
                });
            });
        })();";

        $script = preg_replace('/\r|\n/', ' ', $script);
        return trim(preg_replace('/\s+/', ' ', $script));
    }
}
