<?php

class BlockAccessCheck extends SSV {
    
    private $content;
    private $requestedUserArray;
    private $keyTags = ["hasPriviligies", "group=", "not-group=", "not-login="];

    public function __construct($content, $requestedUserArray) {
        $this->content = $content;
        $this->requestedUserArray = $requestedUserArray;
    }

    protected function checkBlocks() {
        foreach ($this->keyTags as $tag) {
            $methodName = 'check' . ucfirst(str_replace(['-', '='], '', $tag));
            if (method_exists($this, $methodName)) {
                $this->$methodName();
            }
        }
        return $this->content;
    }

	private function checkHasPriviligies() {
		$hasPriviligiesTag = "[hasPriviligies]";

		if (stripos($this->content, $hasPriviligiesTag) !== false && init::$usrArray['isLogged']) {
			if ($this->hasSufficientPriviligies()) {
				$this->removeTags("hasPriviligies");
			}	
		}
		$this->content = preg_replace("/\\$hasPriviligiesTag(.*?)\\[\\/hasPriviligies\\]/si", '', $this->content);
	}

	private function hasSufficientPriviligies(): bool {
		return init::$usrArray['login'] === $this->requestedUserArray['login'] || init::$usrArray['groupTag'] === "admin";
	}


    private function checkGroup() {
        $this->content = $this->processBlock('[group=', 'group');
        $this->content = $this->processBlock('[not-group=', 'not-group');
    }

    private function checkNotLogin() {
        if (stripos($this->content, "[not-login=") !== false) {
            $this->content = preg_replace_callback('#\\[not-login=(.+?)\\](.*?)\\[/not-login\\]#is', function ($matches) {
                $groups = $matches[1];
                $block = $matches[2];
                $groups = explode(',', $groups);
                return (in_array(init::$usrArray['login'], $groups)) ? "" : $block;
            }, $this->content);
        }
    }

    private function removeTags($tag) {
        $this->content = str_replace("[" . $tag . "]", ' ', $this->content);
        $this->content = str_replace("[/" . $tag . "]", ' ', $this->content);
    }

    private function processBlock($tag, $type) {
        $regex = '/\[' . $type . '=(.*?)\]((?>(?R)|.)*?)\[\/' . $type . '\]/is';
        return preg_replace_callback($regex, function ($matches) use ($type) {
            $groups = $matches[1];
            $block = $matches[2];
            $action = ($type === 'group');

            $groups = explode(',', $groups);
            if ($action) {
                return (in_array(init::$usrArray['user_group'], $groups)) ? $block : '';
            } else {
                return (in_array(init::$usrArray['user_group'], $groups)) ? '' : $block;
            }
        }, $this->content);
    }
}
