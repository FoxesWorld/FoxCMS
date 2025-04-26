<?php
if (!defined("ADMIN")) {
    die();
}

class UsersList extends AdminPanel implements JsonSerializable {

    protected $db;
    protected $request;
    protected $usersArray = [];

    public function __construct($db, array $REQUEST) {
        $this->db = $db;
        $this->request = $REQUEST;
        $this->parseUsers();
    }

    protected function parseUsers(): void {
        $selector = new GenericSelector($this->db, 'users');

        if (!empty($this->request['userMask']) && $this->request['userMask'] !== '*') {
            $likeValue = '%' . $this->request['userMask'] . '%';
            $rows = $selector->select(
                ['login' => ['LIKE' => $likeValue]]
            );
        } else {
            $rows = $selector->select();
        }

        foreach ($rows as $key => $user) {
            $this->usersArray[] = [$key => $user];
        }
    }

    public function jsonSerialize(): array {
        return $this->usersArray;
    }
}
