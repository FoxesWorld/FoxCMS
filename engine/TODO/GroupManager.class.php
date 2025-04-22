<?php

class GroupManager implements JsonSerializable {
    protected $db;
    private array $allGroups = [];
    private ?int $currentGroupNum = null;

    public function __construct($db, ?int $userGroup = null) {
        $this->db = $db;
        $this->currentGroupNum = $userGroup;
        $this->loadAllGroups();
    }

    private function loadAllGroups(): void {
        $query = 'SELECT * FROM groupAssociation';
        $this->allGroups = $this->db->getRows($query);
    }

    private function getGroupData(int $groupNum): ?array {
        foreach ($this->allGroups as $group) {
            if ((int)$group['groupNum'] === $groupNum) {
                return $group;
            }
        }
        return null;
    }

    public function getGroupName(?int $groupNum = null): string {
        $group = $this->getGroupData($groupNum ?? $this->currentGroupNum);
        $name = $group['groupName'] ?? randTexts::getRandText('noGroup');

        if (is_string($name) && strpos($name, ',') !== false) {
            $parts = array_filter(array_map('trim', explode(',', $name)));
            if (!empty($parts)) {
                return $parts[array_rand($parts)];
            }
        }

        return $name;
    }

    public function getGroupTag(?int $groupNum = null): string {
        $group = $this->getGroupData($groupNum ?? $this->currentGroupNum);
        return $group['groupType'] ?? 'cursed';
    }

    public function getGroupNum(): int {
        return $this->currentGroupNum ?? 3;
    }

    public function jsonSerialize(): array {
        return $this->allGroups;
    }
}
