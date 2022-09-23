<?php

const ENTRY_FIELD = array('image');

const TRANSFER_DIR = ENGINE_DIR.'cache/tmp';
const UPLOAD_DIR = ROOT_DIR.'/uploads';
const VARIANTS_DIR = __DIR__ . '/variants';
const METADATA_FILENAME = 'metadata';
const ALLOWED_FILE_FORMATS = array(
    // images
    'image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'image/tiff', 'image/webp',

    // video
    'video/mpeg', 'video/mp4', 'video/x-msvideo', 'video/webm', 'video/ogg',

    // audio
    'audio/mpeg', 'audio/ogg', 'audio/mpeg', 'audio/webm',

    // docs
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.spreadsheet','application/vnd.oasis.opendocument.text',
    'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
);

$lang = array(
		"successLoad" => "Успешная загрузка",
		"errorLoad" => "Ошибка загрузки",
		"noFiles" => "Нет файла для загрузки!");

if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755);
if (!is_dir(TRANSFER_DIR)) mkdir(TRANSFER_DIR, 0755);