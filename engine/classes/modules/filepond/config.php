<?php
if(!defined('upload')) {
	die ('{"message": "Not in upload thread"}');
}

// where to get files from
const ENTRY_FIELD = array('image');

const TRANSFER_DIR = ENGINE_DIR.'cache/cache';
const UPLOAD_DIR =   ROOT_DIR.'/uploads';
const VARIANTS_DIR = 'variants';
const METADATA_FILENAME = '.metadata';

if(@$_SESSION['isLogged']) {
	if (!is_dir(UPLOAD_DIR.'/'.$_SESSION['login'])) mkdir(UPLOAD_DIR.'/'.$_SESSION['login'], 0755);
	if (!is_dir(TRANSFER_DIR)) mkdir(TRANSFER_DIR, 0755);
}