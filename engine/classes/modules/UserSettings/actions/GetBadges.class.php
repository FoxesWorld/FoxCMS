<?php

class GetBadges extends UserActions implements JsonSerializable {

    protected $db;
    protected GenericSelector $selector;
    private array $badgesList = [];

    /**
     * @param PDO $db
     * @param array $request
     */
    public function __construct($db, array $request) {
        $this->db = $db;
        $this->selector = new GenericSelector($db, 'badgesList', ['badgeName', 'description', 'img']);

        $userBadges = initHelper::getUserBadges($db, $request['userDisplay'] ?? '');
        if ($userBadges) {
            $badgesArray = json_decode($userBadges, false);
            if (is_array($badgesArray)) {
                foreach ($badgesArray as $badge) {
                    $badgeData = $this->getBadgeInfo($badge);
                    if ($badgeData) {
                        $this->badgesList[] = $badgeData;
                    }
                }
            }
        }
    }

    /**
     * Получает подробности о значке по имени через GenericSelector.
     *
     * @param object $badge
     * @return array|false
     */
    private function getBadgeInfo($badge) {
        if (!isset($badge->badgeName) || !is_string($badge->badgeName)) {
            return false;
        }

        $rows = $this->selector->select(
            ['badgeName' => $badge->badgeName],
            ['badgeName', 'description', 'img'],
            null,
            'ASC',
            1
        );

        if (!empty($rows)) {
            $row = $rows[0];
            return [
                'acquiredDate' => $badge->acquiredDate ?? null,
                'badgeName' => $row['badgeName'],
                'description' => isset($badge->description) && strlen((string)$badge->description) > 0
                    ? $badge->description
                    : $row['description'],
                'badgeImg' => $row['img']
            ];
        }

        return false;
    }

    /**
     * Формирует JSON-ответ.
     *
     * @return array
     */
    public function jsonSerialize(): array {
        return $this->badgesList;
    }
}
