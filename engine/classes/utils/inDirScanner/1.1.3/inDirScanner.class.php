<?php

	class inDirScanner {

    private $rootDir;
    private $subDir;
    private $mask;
    public $filesArray = [];
    private $filesNum = 0;

    public function __construct($rootDir, $subDir, $mask) {
        $this->rootDir = rtrim($rootDir, '/') . '/';
        $this->subDir = trim($subDir, '/') . '/';
        $this->mask = $mask;
        $this->scanDir = $this->rootDir . $this->subDir;
        $this->scanThisDir();
    }

private function scanThisDir() {
    $dirArray = [];
    $invalidArray = ['..', '.'];

    if (is_dir($this->scanDir)) {
        $dirArray = $this->filesInDirArray($this->scanDir, $this->mask);

        foreach ($dirArray as $file) {
            $this->filesNum++;
            $fullPath = $this->scanDir . $file;
            $isDirectory = is_dir($file);
            $this->filesArray[] = [
                'name' => basename($file),
                'isDirectory' => $isDirectory
                //'children' => $isDirectory ? $this->scanSubDir($fullPath . '/') : []
            ];
        }
    } else {
        die(json_encode(["message" => "Invalid directory!"]));
    }
}

	public function scanDirectory($dir = null) {
		$directory = $dir ? $dir : $this->rootDir . $this->subDir;
		$data = [];
		$items = scandir($directory);
		foreach ($items as $item) {
			if ($item === '.' || $item === '..') {
				continue;
			}

			$path = $directory . '/' . $item;

			if (is_dir($path)) {
				$data[] = [
					'name' => $item,
					'type' => 'directory',
					'children' => $this->scanDirectory($path)
				];
			} else {
				$data[] = [
					'name' => $item,
					'type' => 'file'
				];
			}
		}

		return $data;
	}



    private function scanSubDir($subDir) {
        $subScanner = new RecursiveDirectoryScanner($this->rootDir, str_replace($this->rootDir, '', $subDir), $this->mask);
        return $subScanner->getFilesArray();
    }

    public function getFiles() {
        $response = [
            "files" => $this->filesArray,
            "fileNum" => $this->filesNum,
            "filesHomeDir" => "/uploads/" . $this->subDir
        ];

        return json_encode($response);
    }

    public function getFilesArray() {
        return $this->filesArray;
    }

    private function filesInDirArray($dir, $mask) {
        $files = glob($dir . '*' . $mask, GLOB_NOSORT);
        return $files ? $files : [];
    }

    public function buildTree() {
        return $this->filesArray;
    }
}
