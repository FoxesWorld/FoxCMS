<?php
class GenericUpdater extends init {
	
    protected $db;
    protected $table;
    protected $allowedFields;
    protected $deleteMissing;

    /**
     * @param PDO    $db             Объект базы данных
     * @param string $table          Имя таблицы
     * @param array  $allowedFields  Разрешённые поля для обновления
     * @param bool   $deleteMissing  Удалять ли отсутствующие строки (по умолчанию true)
     */
    public function __construct($db, $table, array $allowedFields, $deleteMissing = false) {
        $this->db = $db;
        $this->table = $table;
        $this->allowedFields = $allowedFields;
        $this->deleteMissing = $deleteMissing;
    }

    /**
     * Обновление, добавление и удаление строк на основе данных.
     *
     * @param string|array $jsonData   JSON или массив данных
     * @param string       $primaryKey Уникальное поле, по которому проверяется наличие
     *                                 ключа в таблице. При его отсутствии — строка может быть удалена.
     *
     * @return array Результат операции
     */
    public function updateData($jsonData, $primaryKey = 'id') {
        if (is_string($jsonData)) {
            $data = json_decode($jsonData, true);
            if (!is_array($data)) {
                return ['type' => 'error', 'message' => 'Неверный JSON формат'];
            }
        } else {
            $data = $jsonData;
        }

        if (array_keys($data) !== range(0, count($data) - 1)) {
            $data = [$data];
        }

        $filteredData = [];
        $newPrimaryKeys = [];
        foreach ($data as $row) {
            $filtered = array_intersect_key($row, array_flip($this->allowedFields));
            if (isset($row[$primaryKey])) {
                $newPrimaryKeys[] = $row[$primaryKey];
                $filtered[$primaryKey] = $row[$primaryKey];
            }
            $filteredData[] = $filtered;
        }

        if (empty($filteredData)) {
            return ['type' => 'error', 'message' => 'Нет данных для обновления'];
        }

        $fields = array_keys($filteredData[0]);
        $fieldList = implode(", ", array_map(fn($f) => "`{$f}`", $fields));
        $placeholders = implode(", ", array_map(fn($f) => ":{$f}", $fields));

        $updateFields = [];
        foreach ($fields as $field) {
            if ($field === $primaryKey) continue;
            $updateFields[] = "`{$field}` = VALUES(`{$field}`)";
        }
        $updateClause = implode(", ", $updateFields);

        $sql = "INSERT INTO `{$this->table}` ({$fieldList})
                VALUES ({$placeholders})
                ON DUPLICATE KEY UPDATE {$updateClause}";

        $stmt = $this->db->prepare($sql);

        try {
            foreach ($filteredData as $row) {
                $stmt->execute($row);
            }

            $deletedCount = 0;

            if ($this->deleteMissing && !empty($newPrimaryKeys)) {
                $existingSql = "SELECT `{$primaryKey}` FROM `{$this->table}`";
                $existingKeys = $this->db->query($existingSql)->fetchAll(PDO::FETCH_COLUMN);
                $toDelete = array_diff($existingKeys, $newPrimaryKeys);

                if (!empty($toDelete)) {
                    $in = implode(',', array_fill(0, count($toDelete), '?'));
                    $deleteSql = "DELETE FROM `{$this->table}` WHERE `{$primaryKey}` IN ({$in})";
                    $delStmt = $this->db->prepare($deleteSql);
                    $delStmt->execute(array_values($toDelete));
                    $deletedCount = $delStmt->rowCount();
                }
            }

            return [
                'type' => 'success',
                'message' => count($filteredData) . ' записей обновлено/добавлено, удалено: ' . $deletedCount
            ];
        } catch (PDOException $e) {
            return [
                'type' => 'error',
                'message' => 'Ошибка при обновлении данных: ' . $e->getMessage()
            ];
        }
    }
	
	public function updateRowByKey(array $data, string $primaryKey, $primaryValue): array {
    $filtered = array_intersect_key($data, array_flip($this->allowedFields));

    if (empty($filtered)) {
        return ['type' => 'error', 'message' => 'Нет допустимых полей для обновления'];
    }

    $setClause = implode(', ', array_map(fn($f) => "`$f` = :$f", array_keys($filtered)));
    $sql = "UPDATE `{$this->table}` SET $setClause WHERE `$primaryKey` = :__primary";

    $stmt = $this->db->prepare($sql);
    $filtered['__primary'] = $primaryValue;

    try {
        $stmt->execute($filtered);
        return [
            'type' => 'success',
            'message' => $stmt->rowCount() . ' строк(а) обновлено'
        ];
    } catch (PDOException $e) {
        return [
            'type' => 'error',
            'message' => 'Ошибка при обновлении: ' . $e->getMessage()
        ];
    }
}

}
?>
