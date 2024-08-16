<?php

class LoadSkin
{
    private $csrfToken = '0729be9e3052f1ff011c2ab6cc3b00e18625a2b777223d9c64d81cbd79088e89';
    private $allowedTypes = ['skin', 'cloak'];
	
	public function __construct() {
		
	}

    public function handleRequest()
    {
        // Проверка метода запроса
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendResponse('error', 'Неверный метод запроса.');
            return;
        }

        // Проверка на наличие действия и типа
        if (!isset($_POST['action']) || $_POST['action'] !== 'uploadFile') {
            $this->sendResponse('error', 'Неверное действие.');
            return;
        }

        if (!isset($_POST['type']) || !in_array($_POST['type'], $this->allowedTypes)) {
            $this->sendResponse('error', 'Неверный тип файла.');
            return;
        }

        // Валидация CSRF-токена
        if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $this->csrfToken) {
            $this->sendResponse('error', 'Неверный CSRF-токен.');
            return;
        }

        // Обработка загрузки файлов
        $type = $_POST['type'];
        $this->uploadFiles($type);
    }

    private function uploadFiles($type)
    {
        $uploadDir = __DIR__ . '/uploads/' . $type . '/';

        // Создание директории, если она не существует
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        foreach ($_FILES as $key => $file) {
            $fileName = basename($file['name']);
            $uploadFilePath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $uploadFilePath)) {
                $this->sendResponse('success', "Файл $fileName успешно загружен.");
            } else {
                $this->sendResponse('error', "Ошибка загрузки файла $fileName.");
            }
        }
    }

    private function sendResponse($type, $message)
    {
        echo json_encode([
            'type' => $type,
            'message' => $message
        ]);
        exit;
    }
}

// Инициализация и запуск обработчика запроса
$uploader = new FileUploader();
$uploader->handleRequest();

?>
