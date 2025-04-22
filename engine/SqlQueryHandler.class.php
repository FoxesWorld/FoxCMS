<?php

//DEPRECATED
class SafeSQLHandler {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function updateData($table, $data, $conditionColumn, $conditionValue) {
        $sql = "UPDATE $table SET ";

        $setClause = [];
        foreach ($data as $column => $value) {
            $setClause[] = "$column = '".$value."'";
        }

        if (!empty($setClause)) {
            $sql .= implode(', ', $setClause);
            $sql .= " WHERE $conditionColumn = '".$conditionValue."'";
            $stmt = $this->db->prepare($sql);

            //foreach ($data as $column => $value) {
            //    $stmt->bindParam(':'.$column, $value);
            //}
            //$stmt->bindParam(':conditionValue', $conditionValue);
			//die($sql);
			
            try {
                if ($stmt->execute()) {
                    return '{"message": "Data updated", "type": "success"}';
                } else {
                    return '{"message": "Failed to update data", "type": "error"}';
                }
            } catch (PDOException $e) {
                return '{"message": "PDO Exception: ' . $e->getMessage() . '", "type": "error"}';
            }
        } else {
            return '{"message": "No valid fields to update", "type": "error"}';
        }
    }
}

?>
