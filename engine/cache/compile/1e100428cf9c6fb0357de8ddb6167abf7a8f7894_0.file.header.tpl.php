<?php
/* Smarty version 4.0.4, created on 2022-04-04 14:04:49
  from '/Avalon/sites/FoxRadio/www/templates/default/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_624ad0d13a7326_86885406',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1e100428cf9c6fb0357de8ddb6167abf7a8f7894' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/header.tpl',
      1 => 1649070286,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624ad0d13a7326_86885406 (Smarty_Internal_Template $_smarty_tpl) {
?><head>	
	<meta charset="utf-8">
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
	<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/js/FoxRadio.js"><?php echo '</script'; ?>
>
	<?php echo $_smarty_tpl->tpl_vars['systemJS']->value;?>

	<?php echo $_smarty_tpl->tpl_vars['systemCSS']->value;?>

</head><?php }
}
