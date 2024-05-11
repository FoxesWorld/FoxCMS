<?php

if (!defined('FOXXEY')) {
    exit("Not a FOXXEY");
} else {
    define('foxesMon', true);
}

class foxesMon {
    private $temp;
    private $time;
    private $monSrv;
    private $monCfg;
    private $all;
    private $record;

    function __construct($serversArray, $time) {
		global $config;
        require_once('ms.class.php');
        $this->temp = new MinecraftServer();
        $this->time = $time;
        $this->monSrv = $this->parseServers($serversArray);
        $this->monCfg = $config['monitor'];
        $this->cacheCreation($this->monCfg);
        $this->file['record'] = @file::efile($this->monCfg['absoluteRecordPath'])['content'];
        $this->file['record_day'] = @file::efile($this->monCfg['dayRecordPath'])['content'];
        $this->serverPinging();
    }

    public function foxMonOut() {
        $responseData = array(
            'servers' => $this->getServersData(),
            'totalPlayersOnline' => @$this->all['totalPlayersOnline'],
            'totalPlayersMax' => @$this->all['totalPlayersMax'],
            'percent' => @$this->all['percent'],
            'absoluteRecord' => trim($this->record['all']),
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
            $get = $this->temp->getp($e[0], $this->time['out']);

            $serverData = array(
                'serverName' => $e[2],
                'status' => isset($get['error']) ? 'offline' : 'online',
                'version' => isset($get['version']) ? $get['version'] : null,
                'playersOnline' => isset($get['player_online']) ? $get['player_online'] : null,
                'playersMax' => isset($get['player_max']) ? $get['player_max'] : null,
                'percent' => isset($get['percent']) ? $get['percent'] : null
            );

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
            $get = $this->temp->getp($e[0], $this->time['out']);
            @$this->all['totalPlayersOnline'] += isset($get['player_online']) ? $get['player_online'] : 0;
            @$this->all['totalPlayersMax'] += isset($get['player_max']) ? $get['player_max'] : 0;
        }
        $this->dailyRecord();
        $this->absoluteRecord();
    }

    private function dailyRecord() {
        if (@$this->all['totalPlayersOnline'] > $this->file['record_day']) {
            file_put_contents($this->monCfg['dayRecordPath'], $this->all['totalPlayersOnline']);
            $this->record['day'] = $this->all['totalPlayersOnline'];
        } else {
            $this->record['day'] = $this->file['record_day'];
        }
        $this->updateDailyRecord();
    }

    private function absoluteRecord() {
        if (@$this->all['totalPlayersOnline'] > $this->file['record']) {
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
                } else {
                    file::efile($this->monCfg['tempFilePath'], time());
                }
            }
        }
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
