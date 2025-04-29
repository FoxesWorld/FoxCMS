<?php

if (!defined('FOXXEY')) {
    header("HTTP/1.1 403 Forbidden");
    header('Location: /');
    die("Hacking attempt!");
}

//use RecursiveIteratorIterator;
//use RecursiveDirectoryIterator;
//use JsonSerializable;

class GameScanner extends init implements JsonSerializable
{
    private string $clientDir;
    private array $dirsToCheck;
    private int $platform;
    private array $platformExtensions = [
        // 0: Linux
        ['so', 'zip', 'jar', 'toml', 'txt', 'cfg', 'recipe', 'dat', 'properties', 'json', 'git', 'sha1', '', 'cache', 'tsrg', 'mcmeta', 'png', 'wav', 'ogg', 'js', 'local', 'ks', 'nbt'],
        // 1: Windows
        ['dll', 'zip', 'jar', 'toml', 'txt', 'cfg', 'recipe', 'dat', 'properties', 'git', 'sha1', 'json', 'mcmeta', 'png', 'wav', 'ogg', 'js', 'local', 'ks', 'nbt'],
        // 2: macOS
        ['dylib', 'zip', 'jar', 'toml', 'txt', 'cfg', 'recipe', 'dat', 'properties', 'git', 'sha1', 'json'],
        // 3: Other 1
        ['so', 'zip', 'jar', 'toml', 'txt', 'cfg', 'recipe', 'dat', 'properties', 'git', 'sha1', 'json'],
        // 4: Other 2
        ['so', 'zip', 'jar', 'toml', 'txt', 'cfg', 'recipe', 'dat', 'properties', 'git', 'sha1', 'json'],
    ];

    private array $fileList = [];

    public function __construct(string $client, string $version, int $platform = 0)
    {
        global $config;

        $this->platform = $platform;
        $this->clientDir = rtrim(ROOT_DIR, DIRECTORY_SEPARATOR) . UPLOADS_DIR . $config['launcherSettings']['gameFiles'];
        $this->dirsToCheck = $this->resolveDirs($client, $version);
    }

    private function resolveDirs(string $client, string $version): array
    {
        $dirs = [
            "{$this->clientDir}versions/{$version}/assets/indexes",
            "{$this->clientDir}versions/{$version}/assets/objects",
            "{$this->clientDir}clients/{$client}",
            "{$this->clientDir}versions/{$version}"
        ];

        return array_filter($dirs, 'is_dir');
    }

    public function scan(): void
    {
        foreach ($this->dirsToCheck as $dir) {
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($iterator as $fileInfo) {
                if ($fileInfo->isFile() && $this->isAllowedExtension($fileInfo->getExtension())) {
                    $relativePath = $this->getRelativePath($fileInfo->getPathname());
                    $this->fileList[] = [
                        'filename' => $relativePath,
                        'hash'     => md5_file($fileInfo->getPathname()),
                        'size'     => (string) $fileInfo->getSize(),
                    ];
                }
            }
        }
    }

    private function isAllowedExtension(string $extension): bool
    {
        return in_array($extension, $this->platformExtensions[$this->platform], true) || $extension === '';
    }

    private function getRelativePath(string $absolutePath): string
    {
        return str_replace('\\', '/', str_replace(ROOT_DIR, '', $absolutePath));
    }

    public function jsonSerialize(): array
    {
        return $this->fileList;
    }

    public function toJson(int $options = JSON_UNESCAPED_SLASHES): string
    {
        return json_encode($this, $options | JSON_THROW_ON_ERROR);
    }
}
