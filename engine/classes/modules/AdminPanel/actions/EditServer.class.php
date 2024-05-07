<?php

class EditServer {
    // Assuming you have a database connection
    private $db;

    // Array of allowed server columns
    private $allowedColumns = [
        'serverVersion',
        'host',
        'port',
        'jreVersion',
        'ignoreDirs',
        'modsInfo',
        'serverImage',
        'serverDescription'
    ];

    public function __construct($db) {
        $this->db = $db;
    }

public function updateServer($data) {
    // Assuming $data is the array you provided

    // Update statement
    $sql = "UPDATE servers SET ";

    // Build SET part of the query dynamically
    $setClause = [];
    foreach ($this->allowedColumns as $column) {
        if (array_key_exists($column, $data) && $column !== 'serverName') {
            $setClause[] = "$column = :$column";
        }
    }

    // Check if there are fields to update
    if (!empty($setClause)) {
        $sql .= implode(', ', $setClause);
        $sql .= " WHERE serverName = :serverName";

        // Prepare the SQL statement
        $stmt = $this->db->prepare($sql);

        // Bind parameters using a loop
        foreach ($this->allowedColumns as $column) {
            if (array_key_exists($column, $data) && $column !== 'serverName') {
                $stmt->bindParam(':' . $column, $data[$column]);
            }
        }

        // Bind the serverName parameter outside the loop
        $stmt->bindParam(':serverName', $data['serverName']);

        // Execute the query
        try {
            if ($stmt->execute()) {
                // Query executed successfully
                die('{"message": "Server updated", "type": "success"}');
            } else {
                // Query failed
                die('{"message": "Failed to update server", "type": "error"}');
            }
        } catch (PDOException $e) {
            die('{"message": "PDO Exception: ' . $e->getMessage() . '", "type": "error"}');
        }
    } else {
        // No valid fields to update
        die('{"message": "No valid fields to update", "type": "error"}');
    }
}

}
?>
