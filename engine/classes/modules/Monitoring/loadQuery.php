<?php
	Error_Reporting(E_ALL);
	//Ini_Set('display_errors', true);
spl_autoload_register(function ($class) {
    // Пространство имен библиотеки
    $prefix = 'PHPMinecraft\\MinecraftQuery\\';

    // Базовая директория для файлов классов
    $baseDir = __DIR__ . '/mcQuery/';

    // Проверяем, использует ли класс данное пространство имен
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // Класс не использует это пространство имен, пропускаем
        return;
    }

    // Получаем относительное имя класса
    $relativeClass = substr($class, $len);

    // Создаем путь к файлу
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    // Если файл существует, подключаем его
    if (file_exists($file)) {
        require $file;
    }
});
