<?php

class GenericSelector
{
    private $db;
    private string $table;
    private ?array $allowedFields;

    public function __construct($db, string $table, ?array $allowedFields = null)
    {
        $this->db = $db;
        $this->table = $table;

        if ($allowedFields === ['*']) {
            $this->allowedFields = $this->describeTable();
        } else {
            $this->allowedFields = $allowedFields;
        }
    }

    private function describeTable(): array
    {
        $stmt = $this->db->prepare("DESCRIBE `{$this->table}`");
        if (!$stmt->execute()) {
            throw new Exception("Не удалось DESCRIBE таблицу `{$this->table}`");
        }

        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        if (!is_array($columns) || empty($columns)) {
            throw new Exception("Не удалось получить поля таблицы `{$this->table}`");
        }

        return $columns;
    }

    /**
     * Выполняет SELECT-запрос с фильтрацией и безопасной сортировкой.
     *
     * @param array $criteria
     * @param array $selectFields
     * @param string|null $orderBy
     * @param string $orderDirection ASC|DESC
     * @param int|null $limit
     * @return array
     */
    public function select(array $criteria = [], array $selectFields = [], ?string $orderBy = null, string $orderDirection = 'ASC', ?int $limit = null): array
    {
        if (empty($selectFields)) {
            $selectFields = $this->allowedFields ?? $this->describeTable();
        } elseif ($this->allowedFields !== null) {
            $selectFields = array_intersect($selectFields, $this->allowedFields);
        }

        if (empty($selectFields)) {
            throw new Exception("Нет допустимых полей для выборки.");
        }

        $columns = implode(', ', array_map(fn($f) => "`$f`", $selectFields));

        $conds = $this->allowedFields !== null
            ? array_intersect_key($criteria, array_flip($this->allowedFields))
            : $criteria;

        $sql = "SELECT {$columns} FROM `{$this->table}`";
        $params = [];

        if (!empty($conds)) {
            $where = [];
            foreach ($conds as $field => $value) {
                $where[] = "`$field` = :$field";
                $params[$field] = $value;
            }
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        if ($orderBy !== null && ($this->allowedFields === null || in_array($orderBy, $this->allowedFields, true))) {
            $direction = strtoupper($orderDirection) === 'DESC' ? 'DESC' : 'ASC';
            $sql .= " ORDER BY `$orderBy` $direction";
        }

        if ($limit !== null && is_int($limit) && $limit > 0) {
            $sql .= " LIMIT $limit";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
