<?php

class BlockAccessCheck extends SSV {
    private string $content;
    private array $requestedUserArray;

    private const TAGS = [
        'hasPriviligies',
        'group=',
        'not-group=',
        'not-login='
    ];

    public function __construct(string $content, array $requestedUserArray) {
        $this->content = $content;
        $this->requestedUserArray = $requestedUserArray;
    }

    public function checkBlocks(): string {
        foreach (self::TAGS as $tag) {
            $method = 'check' . ucfirst(str_replace(['-', '='], '', $tag));
            if (method_exists($this, $method)) {
                $this->$method();
            }
        }
        return $this->content;
    }

    private function checkHasPriviligies(): void {
        $tag = 'hasPriviligies';

        if (stripos($this->content, "[$tag]") !== false) {
            if ($this->hasSufficientPriviligies()) {
                $this->removeTags($tag);
            } else {
                $this->removeTaggedBlock($tag);
            }
        }
    }

    private function hasSufficientPriviligies(): bool {
        return (
            init::$usrArray['login'] === $this->requestedUserArray['login'] ||
            init::$usrArray['groupTag'] === 'admin'
        );
    }

    private function checkGroup(): void {
        $this->content = $this->processBlock('group', true);
        $this->content = $this->processBlock('not-group', false);
    }

    private function checkNotLogin(): void {
        $pattern = '/\[not-login=(.+?)\](.*?)\[\/not-login\]/is';

        $this->content = preg_replace_callback($pattern, function ($matches) {
            $logins = array_map('trim', explode(',', $matches[1]));
            return in_array(init::$usrArray['login'], $logins) ? '' : $matches[2];
        }, $this->content);
    }

    private function removeTags(string $tag): void {
        $this->content = str_replace(["[$tag]", "[/$tag]"], '', $this->content);
    }

    private function removeTaggedBlock(string $tag): void {
        $pattern = "/\[$tag](.*?)\[\/$tag\]/si";
        $this->content = preg_replace($pattern, '', $this->content);
    }

    private function processBlock(string $type, bool $shouldInclude): string {
        $pattern = '/\[' . preg_quote($type) . '=(.*?)\]((?>(?R)|.)*?)\[\/' . preg_quote($type) . '\]/is';

        return preg_replace_callback($pattern, function ($matches) use ($shouldInclude) {
            $groups = array_map('trim', explode(',', $matches[1]));
            $userGroup = init::$usrArray['user_group'];

            $shouldShow = in_array($userGroup, $groups);
            return ($shouldInclude === $shouldShow) ? $matches[2] : '';
        }, $this->content);
    }
}
