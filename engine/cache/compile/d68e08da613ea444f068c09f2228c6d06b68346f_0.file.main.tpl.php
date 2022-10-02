<?php
/* Smarty version 4.0.4, created on 2022-10-02 10:11:31
  from '/var/www/html/templates/bootstrap/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_633939a3c40836_88673549',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd68e08da613ea444f068c09f2228c6d06b68346f' => 
    array (
      0 => '/var/www/html/templates/bootstrap/main.tpl',
      1 => 1664615736,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:right-block.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_633939a3c40836_88673549 (Smarty_Internal_Template $_smarty_tpl) {
?><html>

	<head>
		<?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>

		<meta charset="utf-8">
		<meta name="HandheldFriendly" content="true">
		<title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"> 
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="default">
		<link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/css/style.css" rel="stylesheet">
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/func.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="module" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/App.js"><?php echo '</script'; ?>
>
		<?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

	</head>

	<body>
		<?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
		<section id="topbar" class="d-flex align-items-center shadow bar">
			<div class="container d-flex justify-content-center justify-content-md-between">
					<div class="leftAction d-flex align-items-center">

					</div>

					<div class="rightAction d-none d-md-flex align-items-center" data-in-effect="fadeIn" id="actionBlock">

					</div>
			</div>
		</section>
					  
		<div class="container">	  
			<div class="row siteContent">
				<div class="col-8">
				  <div id="content" class="mainBlock animate__animated">
						<?php echo '<%'; ?>
contentData<?php echo '%>'; ?>

				  </div>
				</div>				  

				<div class="col-4">
					<?php $_smarty_tpl->_subTemplateRender("file:right-block.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
				</div>
			</div>
		</div>

	<?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
	 </body>
 </html><?php }
}
