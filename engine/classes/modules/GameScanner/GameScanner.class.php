<?php

if (!defined('FOXXEY')) {
    header("HTTP/1.1 403 Forbidden");
    header('Location: /');
    die("Hacking attempt!");
}

class GameScanner extends Init {
    private string $clientDir;
    private array $dirsToCheck;
    private int $platform;
    private array $platformExtensions = [
        ["so", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties", "json", "git", "sha1", "", "cache", "tsrg", "mcmeta", "png", "wav", "ogg", "js", "local", "ks", "nbt"],
        ["dll", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties", "git", "sha1", "json", "mcmeta", "png", "wav", "ogg", "js", "local", "ks", "nbt"],
        ["dylib", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties", "git", "sha1", "json"],
        ["so", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties", "git", "sha1", "json"],
        ["so", "zip", "jar", "toml", "txt", "cfg", "recipe", "dat", "properties", "git", "sha1", "json"]
    ];

    public function __construct(string $client, string $version, int $platform) {
        global $config;
        $this->platform = $platform;
        $this->clientDir = ROOT_DIR . UPLOADS_DIR . $config['launcherSettings']['gameFiles'];
        $this->dirsToCheck = $this->getDirsToCheck($client, $version);
    }

    private function getDirsToCheck(string $client, string $version): array {
        global $config;
        $dirsArray = [
            $this->clientDir . 'versions/' . $version . '/assets/indexes',
            $this->clientDir . 'versions/' . $version . '/assets/objects',
            $this->clientDir . 'clients/' . $client,
            $this->clientDir . 'versions/' . $version
        ];

        return array_filter($dirsArray, 'is_dir');
    }

    public function checkFiles(): string {
        $fileList = [];

        foreach ($this->dirsToCheck as $dir) {
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::SELF_FIRST
            );

            foreach ($iterator as $filePath => $fileInfo) {
                if ($fileInfo->isFile()) {
                    $extension = $fileInfo->getExtension();
                    if (in_array($extension, $this->platformExtensions[$this->platform], true) || $extension === '') {
                        $relativePath = str_replace(ROOT_DIR, "", $fileInfo->getPathname());
                        $fileList[] = [
                            'filename' => $relativePath,
                            'hash'     => md5_file($fileInfo->getPathname()),
                            'size'     => (string) $fileInfo->getSize(),
                        ];
                    }
                }
            }
        }

        return json_encode($fileList, JSON_UNESCAPED_SLASHES);
    }
}
