<?php
//if(!defined('FOXXEYENGINE')){
	//exit("Not a FOXXEY");
//} else {
	define ('foxesMon', true);
	define('monPath', ENGINE_DIR.'/var/www/FoxCMS/engine/classes/utils/Monitor/1.0.0/');
//}


class foxesMon {
    private $monCfg = array();
    private $time = array();
    private $monSrv = array();

    private $temp = array();
    private $file = array();
    private $all = array();
    private $record = array();
    private $tplPath;
    private $srvTotal;

    function __construct($serversArray) {
        global $config;
        require_once('config.php');
        require_once('ms.class.php');
        $this->temp = new MinecraftServer();
        $this->time = $time;
        $this->monSrv = $this->parseServers($serversArray);
        $this->monCfg = $monCfg;
        $this->cacheCreation($monCfg);
        $this->tplPath = ROOT_DIR . '/templates/' . $config['siteSettings']['siteTpl'] . '/monitor/';
        $this->file['record'] = @file::efile($this->monCfg['absoluteRecordPath'])['content'];
        $this->file['record_day'] = @file::efile($this->monCfg['dayRecordPath'])['content'];
        $this->serverPinging();
        $this->finishMon();
    }

    public function foxMonOut() {
        $responseData = array(
            'servers' => $this->getServersData(),
            'totalPlayersOnline' => $this->all['totalPlayersOnline'],
            'totalPlayersMax' => $this->all['totalPlayersMax'],
            'percent' => $this->all['percent'],
            'absoluteRecord' => trim($this->record['all']), // Trim the value to remove extra spaces
            'todaysRecord' => $this->record['day']
        );

        // Set the content type to JSON
        header('Content-Type: application/json');

        // Output JSON without BOM
        echo json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }

    private function getServersData() {
        $serversData = array();
        foreach ($this->monSrv as $e) {
            $serverData = array();
            $get = $this->temp->getq($e[0], $this->time['out']);

            $serverData['serverName'] = $e[2];

            if (isset($get['error'])) {
                $serverData['status'] = 'offline';
            } else {
                $serverData['status'] = 'online';
                $serverData['version'] = $get['version'];
                $serverData['playersOnline'] = $get['player_online'];
                $serverData['playersMax'] = $get['player_max'];
                $serverData['percent'] = $get['percent'];
            }

            $serversData[] = $serverData;
        }
        return $serversData;
    }

    private function cacheCreation($monCfg) {
        foreach ($monCfg as $key => $val) {
            if (!file_exists($val)) {
                @file::efile($val);
            }
        }
    }

    private function serverPinging() {
        foreach ($this->monSrv as $e) {
            $get = $this->temp->getq($e[0], $this->time['out']);
            if (isset($get['error'])) {
                // No graphical output in JSON
            } else {
                @$this->all['totalPlayersOnline'] += $get['player_online'];
                @$this->all['totalPlayersMax'] += $get['player_max'];
                // No graphical output in JSON
            }
        }
        $this->dailyRecord();
        $this->absoluteRecord();
    }

    private function dailyRecord() {
        if ($this->all['totalPlayersOnline'] > $this->file['record_day']) {
            file_put_contents($this->monCfg['dayRecordPath'], $this->all['totalPlayersOnline']);
            $this->record['day'] = $this->all['totalPlayersOnline'];
        } else {
            $this->record['day'] = $this->file['record_day'];
        }
        $this->updateDailyRecord();
    }

    private function absoluteRecord() {
        if ($this->all['totalPlayersOnline'] > $this->file['record']) {
            file::efile($this->monCfg['absoluteRecordPath'], $this->all['totalPlayersOnline']);
            $this->record['all'] = $this->all['totalPlayersOnline'];
        } else {
            $this->record['all'] = $this->file['record'];
        }
    }

    private function updateDailyRecord() {
       if (date("H") == 23 && date("i") == 0 && date("s") == 0) {
            if (time() - $this->time['record_day'] > filemtime($this->monCfg['tempFilePath'])) {
                if (filemtime($this->monCfg['tempFilePath'])) {
                    file::efile($this->monCfg['tempFilePath'], time());
                    file::efile($this->monCfg['dayRecordPath'], $this->all['totalPlayersOnline']);
                    $this->record['day'] = $this->all['totalPlayersOnline'];
                    if (defined('AUTOMODE')) {
                        writeCronLogString('Resetting daily online record', true);
                        writeOnlineDayRecord($this->record['day'] . "\n");
                    }
                } else {
                    if (defined('AUTOMODE')) {
                        writeCronLogString('Writing tempfile with - ' . time(), true);
                    }
                    file::efile($this->monCfg['tempFilePath'], time());
                }
            }
        }
    }

    private function finishMon() {
        $this->all['percent'] = @floor(($this->all['totalPlayersOnline'] / $this->all['totalPlayersMax']) * 100);
        $this->all['date'] = $this->date_in_text(filemtime($this->monCfg['absoluteRecordPath']));
        // No graphical output in JSON
    }

    function date_in_text($data) {
        $iz = array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        $v = array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");
        $vblhod = str_replace($iz, $v, date("j M в H:i", $data));
        return $vblhod;
    }

    private static function getTemplate($name) {
        ob_start();
        include($name);
        $text = ob_get_clean();
        return $text;
    }

    private function parseServers($serversArray) {
        $server = array();
        foreach (json_decode($serversArray, true) as $key) {
            $name = $key['serverName'];
            $host = $key['host'];
            $port = $key['port'];
            $version = $key['serverVersion'];
            $server[] = array($host . ':' . $port, $version, $name);
        }
        return $server;
    }
}
?>