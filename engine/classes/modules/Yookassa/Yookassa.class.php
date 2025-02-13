<?php

spl_autoload_register(function ($class) {
    // Префикс пространства имен из composer.json
    $prefix = 'YooKassa\\';

    // Базовая директория для классов
    $baseDir = __DIR__ . '/lib/';

    // Проверяем, начинается ли имя класса с указанного префикса
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // Класс не относится к YooKassa, пропускаем
        return;
    }

    // Получаем относительное имя класса
    $relativeClass = substr($class, $len);

    // Генерируем путь к файлу
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    // Проверяем, существует ли файл, и подключаем его
    if (file_exists($file)) {
        require $file;
    }
});
