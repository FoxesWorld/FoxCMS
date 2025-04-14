<?php

if (!defined('FOXXEY')) {
    die("Hacking attempt!");
}

class InfoBox extends Module
{
    protected $db;
    protected $logger;
	private $userTag;

    public function __construct($db, $logger, $tag) {
		$this->tag = $tag;
        $this->db = $db;
        $this->logger = $logger;
    }

    public function getInfoBox()
    {
        $sql = "
            SELECT 
                start_timestamp, 
                end_timestamp, 
                title, 
                text, 
                image, 
                button_text, 
                button_url, 
                group_name
            FROM infobox 
            ORDER BY start_timestamp DESC
        ";

        try {
            $stmt = $this->db->prepare($sql);

            if (!$stmt) {
                $this->logger->error("Failed to prepare SQL statement: " . implode(" ", $this->db->errorInfo()));
                http_response_code(500);
                echo json_encode([
                    "error" => "Database preparation error"
                ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                exit;
            }

            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $infoBoxes = [];

            foreach ($rows as $info) {
				if($info['group_name'] == $this->tag || $this->tag == "admin") {
					$infoBoxes[] = [
					   "group_name" => $info['group_name'],
					   "start_timestamp" => (int)$info['start_timestamp'],
					   "end_timestamp"   => (int)$info['end_timestamp'],
					   "title"  => $info['title'],
					   "text"   => $info['text'],
					   "image"  => $info['image'],
					   "button_text" => $info['button_text'],
					   "button_url"  => $info['button_url']
					];
				}
            }

            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($infoBoxes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit;

        } catch (PDOException $e) {
            $this->logger->error("PDO Exception in InfoBox::getInfoBox(): " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                "error" => "Database execution error"
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit;
        }
    }
}
