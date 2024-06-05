<?php
/* FoxesWorld.ru
 * A script that implements voting from all available tops (With user verification)
 * =======================================================
 * Author: AidenFox
 * URL: https://vk.com/AidenFox
 * email: lisssicin@yandex.ru
 * =======================================================
 * File: votes.php
 * -------------------------------------------------------
 * Version: 2.3.5 (21.12.2021)
 * =======================================================
 */

if (!defined('FOXXEYENGINE')) {
    die("Hacking attempt!");
}

require_once 'db.php'; // Assuming you have a db.php file for database connection

$db = new DB();
$db->connect(DBUSER, DBPASS, 'fox_userdata');

if (defined('AUTOMODE')) {
    require('monthlyTruncate.php');
} else {

    $secKeys = [
        'scrMCT' => '76a844de8c67b709477825db0c5146bd',
        'scrTCR' => '68089ca755b021262ea1cc1edb8f2f8d',
        'scrMCR' => 'WtDA7tywfI2V9b8kaawIKZps24YNLVui'
    ];

    $sqlQuery = [
        'mpv' => 5000,
        'ubTbl' => 'balance',
        'tvTbl' => 'topvote',
        'tvRow' => 'votenum',
        'ecnRow' => 'balance',
        'unRow' => 'username',
        'time' => time()
    ];

    function inputFilter($filter) {
        return htmlspecialchars(trim(strip_tags(stripslashes($filter))));
    }

    function verifyUser($login, $db) {
        $query = "SELECT * FROM " . PREFIX . "_users WHERE name = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param('s', $login);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }

    class VoteChecks {

        protected $db;
        protected $login;
        protected $sqlQuery;

        public $votenum = "";
        public $balance = [];

        public function __construct($login, $db, $sqlQuery) {
            $this->login = $login;
            $this->db = $db;
            $this->sqlQuery = $sqlQuery;
            if ($this->login) {
                $this->topVoteCheck();
                $this->balanceCheck();
            }
        }

        private function topVoteCheck() {
            $query = "SELECT `" . $this->sqlQuery['tvRow'] . "` FROM " . $this->sqlQuery['tvTbl'] . " WHERE " . $this->sqlQuery['unRow'] . " = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('s', $this->login);
            $stmt->execute();
            $result = $stmt->get_result();
            $usrVote = $result->fetch_assoc()["votenum"];
            $this->votenum = $usrVote;
            if (!$usrVote) {
                $query = "INSERT INTO `" . $this->sqlQuery['tvTbl'] . "`(`" . $this->sqlQuery['unRow'] . "`) VALUES (?)";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('s', $this->login);
                $stmt->execute();
            }
        }

        private function balanceCheck() {
            $query = "SELECT * FROM " . $this->sqlQuery['ubTbl'] . " WHERE " . $this->sqlQuery['unRow'] . " = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('s', $this->login);
            $stmt->execute();
            $result = $stmt->get_result();
            $this->balance = $result->fetch_assoc();
            if (!$this->balance) {
                $query = "INSERT INTO `" . $this->sqlQuery['ubTbl'] . "`(`" . $this->sqlQuery['unRow'] . "`) VALUES (?)";
                $stmt = $this->db->prepare($query);
                $stmt->bind_param('s', $this->login);
                $stmt->execute();
            }
        }
    }

    class IncreaseVal extends VoteChecks {

        public function addEcons($amount) {
            $query = "UPDATE " . $this->sqlQuery['ubTbl'] . " SET " . $this->sqlQuery['ecnRow'] . " = " . $this->sqlQuery['ecnRow'] . " + ? WHERE " . $this->sqlQuery['unRow'] . " = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('is', $amount, $this->login);
            $stmt->execute();
        }

        public function addVotes($amount) {
            $query = "UPDATE " . $this->sqlQuery['tvTbl'] . " SET " . $this->sqlQuery['tvRow'] . " = " . $this->sqlQuery['tvRow'] . " + ? WHERE " . $this->sqlQuery['unRow'] . " = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('is', $amount, $this->login);
            $stmt->execute();
        }
    }

    $nickname = $_GET['nickname'] ?? $_POST['username'] ?? $_POST['nick'] ?? null;

    if (!$nickname) {
        return;
    }

    if (preg_match("/^[a-zA-Zа-яА-Я0-9_]+$/", $nickname)) {
        $nickname = inputFilter($nickname);
    }

    if (verifyUser($nickname, $db)) {
        $voteChecks = new VoteChecks($nickname, $db, $sqlQuery);
        $increaseVal = new IncreaseVal();

        if (isset($_GET['token'])) { 
            $top = 'MCTop';
            $token = $_GET['token'];
            if ($token == md5($nickname . $secKeys['scrMCT'])) {
                $increaseVal->addVotes(1);
                $increaseVal->addEcons($sqlQuery['mpv']);
            } else {
                die("Hash mismatch: " . $top);
            }
        } elseif (isset($_POST['timestamp'])) { 
            $top = 'TopCraft';
            $timestamp = $_POST['timestamp'];
            if ($_POST['signature'] === sha1($nickname . $timestamp . $secKeys['scrTCR'])) {
                $increaseVal->addVotes(1);
                $increaseVal->addEcons($sqlQuery['mpv']);
            } else {
                die("Hash mismatch: " . $top);
            }
        } elseif (isset($_POST['hash'])) { 
            $top = 'MCRate';
            $hash = inputFilter($_POST['hash']);
            $hashproject = md5(md5($nickname . $secKeys['scrMCR'] . 'mcrate'));
            if ($hash != $hashproject) {
                die('Bad hash, no consider to add!');
            }
            $increaseVal->addVotes(1);
            $increaseVal->addEcons($sqlQuery['mpv']);
        }
        die("Success " . $top);
    }
}
?>
