<?php

class Markov {
    private $table = []; // массив лексем
    private $text = ""; // базовый текст
    private $pr_count = 15; // кол-во генерируемых предложений
    
    public $result = ""; // результат
    
    function __construct($text, $pr_count = 15) {
        mb_internal_encoding("UTF-8");
        $this->text = $text;
        $this->pr_count = intval($pr_count);
        $this->prepare();
        $this->generate();
    }
    
    public function get_result() {
        return $this->result;
    }
    
    private function generate() {
        if (empty($this->table)) {
            throw new Exception("Вызовите метод ->prepare перед генерацией!");
        }
        
        $word = "";
        for ($i = 0; $i < $this->pr_count; $i++) {
            $word = $this->get_random_word($word, ['!', '.', '?']);
            $predl = [$this->mb_ucfirst($word)]; // массив слов будущего предложения
            $prlen = rand(5, 15); // средняя длина предложения от 6 до 16 слов(+1 слово, заглавное)
            
            while (!$this->in_str($word, ['!', '.', '?'])) { // пока не выпадет точка
                $word = $this->get_random_word($word);
                if ($this->in_str($word, ['!', '.', '?']) && count($predl) < $prlen) {
                    $word = str_replace(['!', '.', '?'], '', $word); // убираем точку
                }
                $predl[] = $word;
            }
            
            if (mb_strlen(end($predl)) < 4) { // если кол-во букв в последнем слове предложения меньше 4
                array_pop($predl); // удаляем это слово
                $predl[] = "."; // и добавляем в конец точку
            }
            
            $this->result .= implode(" ", $predl) . " ";
        }
        
        $this->result = preg_replace('~\s([!\?\.\,])\s~u', '\1 ', $this->result); // убираем пробелы перед знаками препинания
    }
    
    private function prepare() {
        if ($this->text == "") {
            throw new Exception("Ваш текст пуст!");
        }
        
        $data = preg_replace('~[^a-zёа-я0-9 \-!\?\.\,]~ui', ' ', $this->text); // убираем лишнее
        
        $data = preg_replace('~\.+~ui', '.', $data); // дубли точек и многоточия объединяем
        
        $words = explode(" ", $data); // разбиваем полученные данные по пробелу
        $table = []; // строим массив пар сочетаний
        $prevWord = "";
        
        foreach ($words as $word) {
            $word = trim($word);
            if (!empty($word)) {
                if (!isset($table[$prevWord])) {
                    $table[$prevWord] = [];
                }
                $table[$prevWord][] = $word;
                $prevWord = $word;
            }
        }
        
        $this->table = $table;
    }
    
    private function in_str($str, $items = ['.', '!', '?']) {
        foreach ($items as $item) {
            if (mb_strpos($str, $item) !== false) {
                return true;
            }
        }
        return false;
    }
    
    private function mb_ucfirst($value) {
        return mb_strtoupper(mb_substr($value, 0, 1)) . mb_substr($value, 1);
    }
    
    private function get_random_word($word = "", $ex = []) {
        $nw = "";
        if ($word == "") {
            $wkeys = array_keys($this->table); // ключи, то есть первые входные слова. Используется для генерации начал предложений.
            $nw = $wkeys[array_rand($wkeys)];
        } else {
            $subw = $this->table[$word];
            if (empty($subw)) {
                return $this->get_random_word("", $ex);
            }
            $nw = $subw[array_rand($subw)];
        }
        
        if (!$nw || !empty($ex) && $this->in_str($nw, $ex) || $nw == $word) {
            return $this->get_random_word($nw, $ex);
        }
        return $nw;
    }
}
