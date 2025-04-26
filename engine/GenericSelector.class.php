<?php

class GenericSelector extends init
{
    protected $db;
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
     * @param array $criteria Массив критериев выборки, поддерживаются операторы: =, !=, <, >, <=, >=, LIKE
     * @param array $selectFields Поля для выборки
     * @param string|null $orderBy Поле для сортировки
     * @param string $orderDirection ASC|DESC
     * @param int|null $limit
     * @return array
     * @throws Exception
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
        [$whereClause, $params] = $this->buildWhereClause($criteria);

        $sql = "SELECT {$columns} FROM `{$this->table}`{$whereClause}";

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

    /**
     * Собирает WHERE-условие и массив параметров.
     *
     * @param array $where
     * @return array [$sqlWhere, $params]
     */
    private function buildWhereClause(array $where): array
    {
        $conditions = [];
        $params = [];

        foreach ($where as $field => $value) {
            if ($this->allowedFields !== null && !in_array($field, $this->allowedFields, true)) {
                continue;
            }

            if (is_array($value)) {
                foreach ($value as $operator => $val) {
                    $paramKey = $field . '_' . strtolower($operator);
                    $operator = strtoupper(trim($operator));

                    if (!in_array($operator, ['=', '!=', '<', '>', '<=', '>=', 'LIKE'], true)) {
                        throw new Exception("Недопустимый оператор: $operator");
                    }

                    $conditions[] = "`$field` $operator :$paramKey";
                    $params[$paramKey] = $val;
                }
            } else {
                $conditions[] = "`$field` = :$field";
                $params[$field] = $value;
            }
        }

        $whereClause = '';
        if (!empty($conditions)) {
            $whereClause = ' WHERE ' . implode(' AND ', $conditions);
        }

        return [$whereClause, $params];
    }
}
