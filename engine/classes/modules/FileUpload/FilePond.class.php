<?php

namespace FilePond;

require_once(__DIR__ . '/Helper/Transfer.class.php');
require_once(__DIR__ . '/Helper/Post.class.php');
require_once(__DIR__ . '/Helper/ServerExceptions.php');

use Exception;

function fetch($url) {
    try {
        // Create temp file
        $out = tmpfile();

        // Go!
        $ch = curl_init(str_replace(' ', '%20', $url));
        curl_setopt($ch, CURLOPT_FILE, $out);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 50);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);

        if (!curl_exec($ch)) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }

        $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $length = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($code >= 200 && $code < 300) {
            return [
                'tmp_name' => stream_get_meta_data($out)['uri'],
                'name' => sanitize_filename(pathinfo($url, PATHINFO_BASENAME)),
                'type' => $type,
                'length' => $length,
                'error' => 0,
                'ref' => $out,
            ];
        } else {
            throw new Exception("HTTP error code: $code", $code);
        }
    } catch (Exception $e) {
        error_log($e->getMessage());
        return false;
    }
}

function sanitize_filename($filename) {
    $info = pathinfo($filename);
    $name = sanitize_filename_part($info['filename']);
    $extension = isset($info['extension']) ? sanitize_filename_part($info['extension']) : '';
    return (strlen($name) > 0 ? $name : '_') . ($extension ? '.' . $extension : '');
}

function sanitize_filename_part($str) {
    return preg_replace("/[^a-zA-Z0-9\_\-]/", "", $str);
}

function set_filename($filename, $setName) {
    $info = pathinfo($filename);
    $extension = sanitize_filename_part($info['extension']);
    return (strlen($setName) > 0 ? $setName : '_') . '.' . $extension;
}

function remove_directory($path) {
    if (!is_dir($path)) return;
    $files = glob($path . DIRECTORY_SEPARATOR . '{.,}*', GLOB_BRACE);
    foreach ($files as $file) {
        if (is_file($file)) {
            @unlink($file);
        } elseif (is_dir($file) && !in_array(basename($file), ['.', '..'])) {
            remove_directory($file);
        }
    }
    @rmdir($path);
}

function remove_transfer_directory($path, $id) {
    if (!is_valid_transfer_id($id)) return;
    remove_directory($path . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR . VARIANTS_DIR);
    remove_directory($path . DIRECTORY_SEPARATOR . $id);
}

function create_directory($path) {
    if (!is_dir($path)) {
        mkdir($path, 0755, true);
        return true;
    }
    return false;
}

function secure_directory($path) {
    $content = <<<'HTACCESS'
# Don't list directory contents
IndexIgnore *
# Disable script execution
AddHandler cgi-script .php .pl .jsp .asp .sh .cgi
Options -ExecCGI -Indexes
HTACCESS;
    file_put_contents($path . DIRECTORY_SEPARATOR . '.htaccess', $content);
}

function create_secure_directory($path) {
    $created = create_directory($path);
    if ($created) {
        secure_directory($path);
    }
}

function write_file($path, $data, $filename) {
    $filePath = $path . DIRECTORY_SEPARATOR . $filename;
    if (file_put_contents($filePath, $data) === false) {
        throw new Exception("Failed to write file: $filename");
    }
}

function is_url($str) {
    return filter_var($str, FILTER_VALIDATE_URL) && in_array(parse_url($str, PHP_URL_SCHEME), ['http', 'https', 'ftp']);
}

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

function read_file_contents($filename) {
    $file = read_file($filename);
    return $file ? $file['content'] : false;
}

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
        'name' => basename($filename),
        'content' => $content,
        'type' => mime_content_type($filename),
        'length' => filesize($filename),
        'error' => 0
    ];
}

function move_temp_file($file, $path) {
    $destination = $path . DIRECTORY_SEPARATOR . sanitize_filename($file['name']);
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        throw new Exception("Failed to move uploaded file: " . $file['name']);
    }
}

function move_file($file, $path, $newName = "") {
    $info = pathinfo($file["name"]);
    $filename = ($newName) ? sanitize_filename($newName . '.' . $info['extension']) : sanitize_filename($file['name']);
    $destination = $path . DIRECTORY_SEPARATOR . $filename;

    if (is_uploaded_file($file['tmp_name'])) {
        move_temp_file($file, $path);
    } else {
        if (!rename($file['tmp_name'], $destination)) {
            throw new Exception("Failed to move file: " . $file['name']);
        }
    }
}

function store_transfer($path, $transfer) {
    $transferPath = $path . DIRECTORY_SEPARATOR . $transfer->getId();
    create_secure_directory($transferPath);

    if ($metadata = $transfer->getMetadata()) {
        write_file($transferPath, json_encode($metadata), METADATA_FILENAME);
    }

    $files = $transfer->getFiles();
    if ($files !== null) {
        foreach ($files as $file) {
            move_file($file, $transferPath);
        }

        if (count($files) > 1) {
            $variantsPath = $transferPath . DIRECTORY_SEPARATOR . VARIANTS_DIR;
            create_secure_directory($variantsPath);
            foreach (array_slice($files, 1) as $file) {
                move_file($file, $variantsPath);
            }
        }
    }
}

function get_files($path, $pattern) {
    $results = [];
    $files = glob($path . DIRECTORY_SEPARATOR . $pattern, GLOB_BRACE);
    foreach ($files as $file) {
        if (is_file($file)) {
            $results[] = create_file_object($file);
        }
    }
    return $results;
}

function get_file($path, $pattern) {
    $files = get_files($path, $pattern);
    return $files ? $files[0] : null;
}

function create_file_object($filename) {
    return [
        'tmp_name' => $filename,
        'name' => basename($filename),
        'type' => mime_content_type($filename),
        'length' => filesize($filename),
        'error' => 0
    ];
}

function is_valid_transfer_id($id) {
    return preg_match('/^[0-9a-fA-F]{32}$/', $id);
}

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

function get_post($entry) {
    return isset($_FILES[$entry]) || isset($_POST[$entry]) ? new Post($entry) : false;
}
