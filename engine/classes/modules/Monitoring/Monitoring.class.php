<?php

if (!defined('FOXXEY')) {
    exit("Not a FOXXEY");
} else {
    define('foxesMon', true);
}



require_once 'loadQuery.php';
use PHPMinecraft\MinecraftQuery\MinecraftQueryResolver;
class FoxesMon
{
    private $logger;
    private $servers;
    private $time;
    private $results = [];
    private $record = [];

    public function __construct($logger, $serversArray, $time)
    {
        global $config;

        $this->logger = $logger;
        $this->servers = $this->parseServers($serversArray);
        $this->time = $time;

        $this->initializeRecords($config['monitor']);
        $this->fetchServersData();
    }

    public function outputMonitoringData()
    {
        $response = [
            'servers' => $this->results,
            'totalPlayersOnline' => array_sum(array_column($this->results, 'playersOnline')),
            'totalPlayersMax' => array_sum(array_column($this->results, 'playersMax')),
            'absoluteRecord' => $this->record['all'] ?? 0,
            'todaysRecord' => $this->record['day'] ?? 0,
        ];

        header('Content-Type: application/json');
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }

private function fetchServersData()
{
    foreach ($this->servers as $server) {
        try {
            $resolver = new MinecraftQueryResolver($server['host'], $server['port']);
            $result = $resolver->getResult($tryOldQueryProtocolPre17 = true);

            $this->results[] = [
                'serverName' => $server['name'],
                'status' => $result->isOnline() ? 'online' : 'offline',
                'version' => $result->getVersion() ?? null,
                'playersOnline' => $result->getOnlinePlayers() ?? 0,
                'playersMax' => $result->getMaxPlayers() ?? 0,
                'favicon' => $result->getFavicon() ?? null,
            ];
        } catch (Exception $e) {
            //$this->logger->writeLine("Error querying server {$server['host']}: {$e->getMessage()}");

            $this->results[] = [
                'serverName' => $server['name'],
                'status' => 'offline',
                'version' => null,
                'playersOnline' => 0,
                'playersMax' => 0,
                'favicon' => null,
            ];
        }
    }
}


    private function initializeRecords($config)
    {
        $this->record['all'] = @file_get_contents($config['absoluteRecordPath']) ?: 0;
        $this->record['day'] = @file_get_contents($config['dayRecordPath']) ?: 0;
    }

    private function parseServers($serversArray)
    {
        $servers = [];
        foreach (json_decode($serversArray, true) as $server) {
            $servers[] = [
                'name' => $server['serverName'],
                'host' => $server['host'],
                'port' => $server['port'],
            ];
        }
        return $servers;
    }
}
