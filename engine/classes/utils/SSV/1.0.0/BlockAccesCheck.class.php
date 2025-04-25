<?php

class BlockAccessCheck extends SSV {
    private string $content;
    private array $requestedUserArray;

    private const TAGS = [
        'hasPriviligies',
        'hasStatus',
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
                // Повторяем, чтобы обработать вложенные и множественные блоки
                do {
                    $prev = $this->content;
                    $this->$method();
                } while ($this->content !== $prev);
            }
        }
        return $this->content;
    }

    private function checkHasPriviligies(): void {
        $this->processSimpleBlock('hasPriviligies', $this->hasSufficientPriviligies());
    }

    private function checkHasStatus(): void {
        $pattern = '/\[hasStatus\](.*?)\[\/hasStatus\]/is';
        $this->content = preg_replace_callback($pattern, function($m) {
            // проверяем статус в запрошенных данных и в сессии
            $status = $this->requestedUserArray['userStatus'] ?? null;
            $sessionStatus = init::$usrArray['userStatus'] ?? null;
            // если ни в запрошенных, ни в сессии нет статуса — удаляем блок
            if (empty($status) && empty($sessionStatus)) {
                $this->removeTaggedBlock('hasStatus');//return '';
            }
            // иначе оставляем содержимое, убрав теги
            return $m[1];
        }, $this->content);
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
        $this->content = preg_replace_callback($pattern, function($m) {
            $list = array_map('trim', explode(',', $m[1]));
            return in_array(init::$usrArray['login'], $list) ? '' : $m[2];
        }, $this->content);
    }

    /**
     * Общий метод для простых блоков без параметров
     */
    private function processSimpleBlock(string $tag, bool $condition): void {
        $open = "[$tag]";
        $close = "[/$tag]";
        $pattern = '/\[' . preg_quote($tag) . '\](.*?)\[\/' . preg_quote($tag) . '\]/is';
        $this->content = preg_replace_callback($pattern, function($m) use ($condition) {
            return $condition ? $m[1] : '';
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
        $pattern = '/\[' . preg_quote($type) . '=(.*?)\](.*?)\[\/' . preg_quote($type) . '\]/is';
        return preg_replace_callback($pattern, function($m) use ($shouldInclude) {
            $vals = array_map('trim', explode(',', $m[1]));
            $ug = init::$usrArray['user_group'] ?? null;
            return ($shouldInclude === in_array($ug, $vals)) ? $m[2] : '';
        }, $this->content);
    }
}
