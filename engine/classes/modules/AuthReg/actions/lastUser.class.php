<?php

class lastUser extends AuthManager implements JsonSerializable
{
    /** @var GenericSelector */
    private $selector;

    /** @var string[] */
    private $userParseData = ["colorScheme", "realname", "login", "profilePhoto", "reg_date"];

    /**
     * @param array $input
     * @param PDO $db
     * @param LoggerInterface|null $logger
     */
    public function __construct($input, $db, $logger = null)
    {
        if (isset($input['userAction']) && $input['userAction'] === 'lastUser') {
            $this->selector = new GenericSelector($db, 'users', ['*']);
        }
    }

    /**
     * Получает последнего пользователя
     *
     * @return array
     */
    private function selectUser()
    {
        $users = $this->selector->select([], $this->userParseData, 'user_id', 'DESC', 1);
        return isset($users[0]) ? $users[0] : [];
    }

    /**
     * Возвращает данные пользователя в формате JSON
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->selectUser();
    }
}
