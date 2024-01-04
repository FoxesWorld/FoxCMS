<?php
$contServers = count($_servers);
$jsonContent = '';
$onlineSum = 0;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
define("DATALIFEENGINE", true);
include $_SERVER['DOCUMENT_ROOT'] . '/engine/modules/andrew_shbov/monitoring/parser.class.php';
include $_SERVER['DOCUMENT_ROOT'] . "/engine/classes/mysql.php";
include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/dbconfig.php";
function getParam($param)
{
    global $db;
    $select = $db->super_query("SELECT `value` FROM site_config WHERE param='$param'");
    return $select['value'];
}
include $_SERVER['DOCUMENT_ROOT'] . "/engine/data/mineconf.php";
function getOnline($getIP, $getPort)
{
    if (!$pauseMon) {
        for ($i = 0; $i < count($pauseSelMon); $i++) {
            $splitServer = explode(" :: ", $pauseSelMon[$i]);
            $contains = strCaseCmp($splitServer[0], $getIP) . strCaseCmp($splitServer[1], $getPort);

            if ($contains == '00') {
                break;
            }

        }

        if ($contains != '00') {
            $Server = new ServerStatus($IP = $getIP, $Port = $getPort);
            $status = $Server->Online ? true : false;

            if ($Server && $status) {
                $players = preg_replace('/\D/', '', $Server->OnlinePlayers);
                $maxplayers = preg_replace('/\D/', '', $Server->MaxPlayers);

                if (empty($maxplayers)) {
                    $online = 999;
                } else {
                    $online = $players;
                }

            } else {
                $online = 999;
            }

        } else {
            $online = 999;
        }

    } else {
        $online = 999;
    }

    return $online;
}

class ServerStatus
{
    private $Socket, $Info;
    public $Online, $OnlinePlayers, $MaxPlayers, $IP;

    public function __construct($IP, $Port = '25565')
    {
        $Socket = @fsockopen($IP, $Port);
        if ($Socket == false) {
            $this->Online = false;
        } else {
            $this->Online = true;
            fwrite($Socket, "\xFE");
            $data = @fread($Socket, 256);
            @fclose($Socket);

            if ($data == false or substr($data, 0, 1) != "\xFF") {
                return;
            }

            $Info = substr($data, 3);
            $Info = iconv('UTF-16BE', 'UTF-8', $Info);

            if ($Info[1] === "\xA7" && $Info[2] === "\x31") {
                $Info_Ex = explode("\x00", $Info);
            } else {
                $Info_Ex = explode("\xA7", $Info);
            }

            $this->OnlinePlayers = IntVal($Info_Ex[count($Info_Ex) - 2]);
            $this->MaxPlayers = IntVal($Info_Ex[count($Info_Ex) - 1]);
        }
    }
}
$i = 1;
foreach ($_servers as $server) {
    if ($i >= 0) {
        $online = getOnline($server['ip'], $server['port']);
    } else {
        $Query = new MinecraftQuery();
        $Query->Connect($server['ip'], $server['port']);
        $srv = $Query->GetInfo();
        $online = $srv['Players'];
        $servername = $srv['HostName'];
        if (!$servername) {
            $online = 999;
        }

    }
    $jsonContent .= "\t\"$i\": { \"online\":\"$online\" },\r\n";
    if ($online != 999) {
        $onlineSum += $online;
    }

    $i++;
}
$jsonContent = "{\r\n$jsonContent\t\"Null\": {}\r\n}";
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . '/engine/modules/andrew_shbov/monitoring/online.json', 'w');
fwrite($fp, $jsonContent);
fclose($fp);

if ($onlineSum) {
    $date = date("d.m.Y");
    $timeText = date("H:i");
    $check = $db->super_query("SELECT * FROM my_online_history WHERE dateText='$date' ORDER BY id DESC LIMIT 1");
    if ($check['online'] != $onlineSum) {
        $db->query("INSERT INTO my_online_history VALUES(null, '$timeText', '$date', '" . time() . "', '$onlineSum')");
    }
    $db->free();
}
echo 'Done';
