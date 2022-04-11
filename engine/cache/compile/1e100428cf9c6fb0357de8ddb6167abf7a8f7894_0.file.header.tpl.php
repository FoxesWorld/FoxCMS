<?php
/* Smarty version 4.0.4, created on 2022-04-11 14:12:43
  from '/Avalon/sites/FoxRadio/www/templates/default/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_62540d2b73a296_02372384',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1e100428cf9c6fb0357de8ddb6167abf7a8f7894' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/header.tpl',
      1 => 1649675558,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_62540d2b73a296_02372384 (Smarty_Internal_Template $_smarty_tpl) {
?><head>	
	<meta charset="utf-8">
	<?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>

	<meta name="HandheldFriendly" content="true">
	<title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</title>
    <link rel="shortcut icon" type="image/png" href="/favicon.ico">
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"> 
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
	<meta property="og:image" content="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/img/logo.png">
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/css/styles.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/css/input.css">
	<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/js/FoxRadio.js"><?php echo '</script'; ?>
>
</head><?php }
}
