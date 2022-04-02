<?php
/* Smarty version 4.0.4, created on 2022-04-02 20:56:47
  from '/Avalon/sites/FoxRadio/www/templates/default/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_62488e5f1fdb44_42595018',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6a4c10ae53f47326fb4c756a9d8258011559274b' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/main.tpl',
      1 => 1648922204,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:logo.tpl' => 1,
    'file:nav.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_62488e5f1fdb44_42595018 (Smarty_Internal_Template $_smarty_tpl) {
?><html>

<head>	
	<meta charset="utf-8">
	<meta name="HandheldFriendly" content="true">
	<title>FoxRadio</title>
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

</head>
	<body id="content">
		<?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

		<div class="animated BounceInRight delay-1s menu-top">
			<?php $_smarty_tpl->_subTemplateRender('file:logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
			<?php $_smarty_tpl->_subTemplateRender('file:nav.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
		</div>

		<main ID="mainCont" class="animated BounceInUp delay-1s">
			<?php echo $_smarty_tpl->tpl_vars['profile']->value;?>

		</main>

	</body>
	<?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</html><?php }
}
