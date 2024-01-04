<?php

class SelectLatestVersion {
    private $repoDir;
    private $thisFiles;
    private $thisFile;

    public function __construct($repoDir) {
        $this->repoDir = $repoDir;
        $this->thisFiles = filesInDir::filesInDirArray($repoDir, ".jar");
        $this->thisFile = $this->selectLatest();
    }

    public function selectLatest() {
        usort($this->thisFiles, function($a, $b) {
            return version_compare($b, $a);
        });

        return reset($this->thisFiles);
    }
	
	public function getFile(){
		return '{
			"filename": "'.$this->thisFile.'",
			"fileMd5": "'.md5_file($this->repoDir . '/' . $this->thisFile).'"
		}';
	}
}
?>
