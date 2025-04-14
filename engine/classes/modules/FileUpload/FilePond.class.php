<?php

namespace FilePond;

require_once(__DIR__ . '/Helper/Transfer.class.php');
require_once(__DIR__ . '/Helper/Post.class.php');
require_once(__DIR__ . '/Helper/ServerExceptions.php');

use Exception;

/**
 * Получает файл по URL.
 *
 * @param string $url URL для скачивания
 * @return array|false Возвращает ассоциативный массив с данными файла или false при ошибке.
 */
function fetch($url) {
    // Валидация URL
    if (!is_url($url)) {
        error_log("Invalid URL: " . $url);
        return false;
    }

    $out = tmpfile();
    if ($out === false) {
        error_log("Failed to create temporary file.");
        return false;
    }

    $tempMeta = stream_get_meta_data($out);
    $tempFilePath = $tempMeta['uri'];

    $ch = curl_init(str_replace(' ', '%20', $url));
    if ($ch === false) {
        fclose($out);
        error_log("Failed to initialize cURL.");
        return false;
    }
    
    // Настройки cURL для повышения безопасности и стабильности
    curl_setopt($ch, CURLOPT_FILE, $out);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 50);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    // Включаем проверки SSL-сертификата
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

    try {
        if (!curl_exec($ch)) {
            throw new Exception("cURL error: " . curl_error($ch), curl_errno($ch));
        }

        $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $length = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($code < 200 || $code >= 300) {
            throw new Exception("HTTP error code: $code", $code);
        }
    } catch (Exception $e) {
        error_log($e->getMessage());
        fclose($out);
        curl_close($ch);
        return false;
    } finally {
        curl_close($ch);
    }

    return [
        'tmp_name' => $tempFilePath,
        'name'     => sanitize_filename(pathinfo($url, PATHINFO_BASENAME)),
        'type'     => $type,
        'length'   => $length,
        'error'    => 0,
        'ref'      => $out,  // Ссылка на поток – нужно закрывать после использования.
    ];
}

/**
 * Очищает имя файла, оставляя только безопасные символы.
 *
 * @param string $filename Исходное имя файла
 * @return string Безопасное имя файла
 */
function sanitize_filename($filename) {
    $info = pathinfo($filename);
    $name = sanitize_filename_part($info['filename']);
    $extension = isset($info['extension']) ? sanitize_filename_part($info['extension']) : '';
    return (strlen($name) > 0 ? $name : '_') . ($extension ? '.' . $extension : '');
}

/**
 * Очищает часть имени файла, удаляя нежелательные символы.
 *
 * @param string $str
 * @return string
 */
function sanitize_filename_part($str) {
    // Разрешены только буквы, цифры, нижнее подчеркивание и дефис.
    return preg_replace("/[^a-zA-Z0-9\_\-]/", "", $str);
}

/**
 * Устанавливает новое имя файла с сохранением расширения.
 *
 * @param string $filename Исходное имя файла
 * @param string $setName Новое имя без расширения
 * @return string Новое имя файла
 */
function set_filename($filename, $setName) {
    $info = pathinfo($filename);
    $extension = isset($info['extension']) ? sanitize_filename_part($info['extension']) : '';
    return (strlen($setName) > 0 ? $setName : '_') . ($extension ? '.' . $extension : '');
}

/**
 * Рекурсивно удаляет директорию и все её содержимое.
 *
 * @param string $path Путь к директории
 */
function remove_directory($path) {
    if (!is_dir($path)) return;
    $files = glob($path . DIRECTORY_SEPARATOR . '{.,}*', GLOB_BRACE);
    if ($files !== false) {
        foreach ($files as $file) {
            if (is_file($file)) {
                @unlink($file);
            } elseif (is_dir($file) && !in_array(basename($file), ['.', '..'])) {
                remove_directory($file);
            }
        }
    }
    @rmdir($path);
}

/**
 * Удаляет директорию переноса с вариантами, если идентификатор корректный.
 *
 * @param string $path Путь к директории
 * @param string $id Идентификатор переноса
 */
function remove_transfer_directory($path, $id) {
    if (!is_valid_transfer_id($id)) return;
    remove_directory($path . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR . VARIANTS_DIR);
    remove_directory($path . DIRECTORY_SEPARATOR . $id);
}

/**
 * Создает директорию, если она не существует.
 *
 * @param string $path Путь к директории
 * @return bool True если директория была создана, иначе false
 */
function create_directory($path) {
    if (!is_dir($path)) {
        if (!mkdir($path, 0755, true)) {
            throw new Exception("Unable to create directory: " . $path);
        }
        return true;
    }
    return false;
}

/**
 * Добавляет защитный .htaccess для предотвращения листинга и исполнения скриптов.
 *
 * @param string $path Путь к директории
 */
function secure_directory($path) {
    $content = <<<'HTACCESS'
# Не показывать содержимое директории
IndexIgnore *

# Отключить исполнение скриптов
AddHandler cgi-script .php .pl .jsp .asp .sh .cgi
Options -ExecCGI -Indexes
HTACCESS;
    file_put_contents($path . DIRECTORY_SEPARATOR . '.htaccess', $content);
}

/**
 * Создает директорию и сразу защищает её.
 *
 * @param string $path Путь к директории
 */
function create_secure_directory($path) {
    if (create_directory($path)) {
        secure_directory($path);
    }
}

/**
 * Записывает данные в файл.
 *
 * @param string $path Путь к директории
 * @param mixed $data Данные для записи
 * @param string $filename Имя файла
 */
function write_file($path, $data, $filename) {
    $filePath = $path . DIRECTORY_SEPARATOR . $filename;
    if (file_put_contents($filePath, $data) === false) {
        throw new Exception("Failed to write file: $filename");
    }
}

/**
 * Валидация URL. Допускаются только схемы http, https и ftp.
 *
 * @param string $str URL
 * @return bool
 */
function is_url($str) {
    return filter_var($str, FILTER_VALIDATE_URL) &&
           in_array(parse_url($str, PHP_URL_SCHEME), ['http', 'https', 'ftp']);
}

/**
 * Выводит файл с правильными HTTP-заголовками.
 *
 * @param mixed $file Путь к файлу или объект файла
 */
function echo_file($file) {
    if (is_string($file)) {
        $file = read_file($file);
    }

    if (!$file) {
        http_response_code(500);
        exit;
    }

    header('Access-Control-Expose-Headers: Content-Disposition, Content-Length, X-Content-Transfer-Id');
    header('Content-Type: ' . $file['type']);
    header('Content-Length: ' . $file['length']);
    header('Content-Disposition: inline; filename="' . $file['name'] . '"');
    echo $file['content'];
}

/**
 * Читает содержимое файла.
 *
 * @param string $filename Путь к файлу
 * @return string|false Содержимое файла или false при ошибке
 */
function read_file_contents($filename) {
    $file = read_file($filename);
    return $file ? $file['content'] : false;
}

/**
 * Читает файл и возвращает информацию о нём.
 *
 * @param string $filename Путь к файлу
 * @return array|false Ассоциативный массив или false при ошибке
 */
function read_file($filename) {
    if (!is_readable($filename)) {
        return false;
    }

    $content = file_get_contents($filename);
    if ($content === false) {
        return false;
    }

    return [
        'tmp_name' => $filename,
        'name'     => basename($filename),
        'content'  => $content,
        'type'     => mime_content_type($filename),
        'length'   => filesize($filename),
        'error'    => 0
    ];
}

/**
 * Перемещает загруженный временный файл в указанную директорию.
 *
 * @param array $file Массив с информацией о файле
 * @param string $path Путь к директории
 */
function move_temp_file($file, $path) {
    $destination = $path . DIRECTORY_SEPARATOR . sanitize_filename($file['name']);
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new Exception("Failed to move uploaded file: " . $file['name']);
    }
}

/**
 * Перемещает файл, учитывая возможность переименования.
 *
 * @param array $file Массив с информацией о файле
 * @param string $path Путь к директории
 * @param string $newName Новое имя файла (опционально)
 */
function move_file($file, $path, $newName = "") {
    $info = pathinfo($file["name"]);
    $filename = $newName ? sanitize_filename($newName . '.' . ($info['extension'] ?? '')) : sanitize_filename($file['name']);
    $destination = $path . DIRECTORY_SEPARATOR . $filename;

    if (is_uploaded_file($file['tmp_name'])) {
        move_temp_file($file, $path);
    } else {
        if (!rename($file['tmp_name'], $destination)) {
            throw new Exception("Failed to move file: " . $file['name']);
        }
    }
}

/**
 * Сохраняет перенос с файлами и метаданными.
 *
 * @param string $path Путь к основной директории
 * @param Transfer $transfer Объект переноса
 */
function store_transfer($path, $transfer) {
    $transferPath = $path . DIRECTORY_SEPARATOR . $transfer->getId();
    create_secure_directory($transferPath);

    if ($metadata = $transfer->getMetadata()) {
        // Проверка кодирования JSON и обработка ошибок
        $json = json_encode($metadata);
        if ($json === false) {
            throw new Exception("Failed to encode metadata to JSON.");
        }
        write_file($transferPath, $json, METADATA_FILENAME);
    }

    $files = $transfer->getFiles();
    if ($files !== null) {
        foreach ($files as $file) {
            move_file($file, $transferPath);
        }

        if (count($files) > 1) {
            $variantsPath = $transferPath . DIRECTORY_SEPARATOR . VARIANTS_DIR;
            create_secure_directory($variantsPath);
            // Сохраняем варианты файлов начиная со второго элемента
            foreach (array_slice($files, 1) as $file) {
                move_file($file, $variantsPath);
            }
        }
    }
}

/**
 * Получает все файлы в директории по шаблону.
 *
 * @param string $path Путь к директории
 * @param string $pattern Шаблон для поиска
 * @return array Массив объектов файла
 */
function get_files($path, $pattern) {
    $results = [];
    $files = glob($path . DIRECTORY_SEPARATOR . $pattern, GLOB_BRACE);
    if ($files !== false) {
        foreach ($files as $file) {
            if (is_file($file)) {
                $results[] = create_file_object($file);
            }
        }
    }
    return $results;
}

/**
 * Получает первый найденный файл по шаблону.
 *
 * @param string $path Путь к директории
 * @param string $pattern Шаблон для поиска
 * @return array|null Объект файла или null, если не найдено
 */
function get_file($path, $pattern) {
    $files = get_files($path, $pattern);
    return $files ? $files[0] : null;
}

/**
 * Создает объект файла с информацией о файле.
 *
 * @param string $filename Путь к файлу
 * @return array
 */
function create_file_object($filename) {
    return [
        'tmp_name' => $filename,
        'name'     => basename($filename),
        'type'     => mime_content_type($filename),
        'length'   => filesize($filename),
        'error'    => 0
    ];
}

/**
 * Проверяет идентификатор переноса на корректность (32-символьная шестнадцатеричная строка).
 *
 * @param string $id Идентификатор
 * @return bool
 */
function is_valid_transfer_id($id) {
    return preg_match('/^[0-9a-fA-F]{32}$/', $id);
}

/**
 * Получает объект переноса из директории.
 *
 * @param string $path Путь к основной директории
 * @param string $id Идентификатор переноса
 * @return Transfer|false Объект переноса или false, если идентификатор некорректный
 */
function get_transfer($path, $id) {
    if (!is_valid_transfer_id($id)) {
        return false;
    }

    $transfer = new Transfer($id);
    $transferPath = $path . DIRECTORY_SEPARATOR . $id;
    $file = get_file($transferPath, '*.*');
    $metadata = get_file($transferPath, METADATA_FILENAME);
    $variants = get_files($transferPath . DIRECTORY_SEPARATOR . VARIANTS_DIR, '*.*');

    $transfer->restore($file, $variants, null, $metadata);
    return $transfer;
}

/**
 * Получает объект post из запроса.
 *
 * @param string $entry Название поля
 * @return Post|false
 */
function get_post($entry) {
    return (isset($_FILES[$entry]) || isset($_POST[$entry])) ? new Post($entry) : false;
}
