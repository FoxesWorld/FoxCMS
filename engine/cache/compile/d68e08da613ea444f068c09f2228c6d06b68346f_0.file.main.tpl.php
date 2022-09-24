<?php
/* Smarty version 4.0.4, created on 2022-09-24 23:10:17
  from '/var/www/html/templates/bootstrap/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_632f64294ee490_61675520',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd68e08da613ea444f068c09f2228c6d06b68346f' => 
    array (
      0 => '/var/www/html/templates/bootstrap/main.tpl',
      1 => 1664042261,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:components/profileComponent.tpl' => 1,
    'file:userMenu.tpl' => 1,
    'file:components/advertComponent.tpl' => 1,
  ),
),false)) {
function content_632f64294ee490_61675520 (Smarty_Internal_Template $_smarty_tpl) {
?><html>

	<head>
		<?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>

		<?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>
	
		<meta charset="utf-8">
		<meta name="HandheldFriendly" content="true">
		<title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</title>
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"> 
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="default">
		<link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/css/style.css" rel="stylesheet">
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/js/main.js"><?php echo '</script'; ?>
>
	</head>

	<body>
		<?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
			  <section id="topbar" class="d-flex align-items-center shadow">
						<div class="container d-flex justify-content-center justify-content-md-between">
						  <div class="contact-info d-flex align-items-center">
							<!-- 
							<i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">Tres.com</a></i>
							<i class="bi bi-phone d-flex align-items-center ms-4"><span><?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</span></i> 
							-->
						  </div>
							<?php if (!$_smarty_tpl->tpl_vars['isLogged']->value) {?>
							  <div class="cta d-none d-md-flex align-items-center">
								<a href="#login"><button class="logInBtn"><span>Войти</span></button></a>
							  </div>
							<?php } else { ?>
								  <div class="cta d-none d-md-flex align-items-center" id="actionBlock">

								  </div>
							 <?php }?>
						</div>
			  </section>
			  
			  <div id="content">
						<?php if ($_smarty_tpl->tpl_vars['isLogged']->value) {?>
						<table>
							<td id="userBlock">
									<?php $_smarty_tpl->_subTemplateRender('file:components/profileComponent.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
							</td>
								
							<td id="workPlace">
								<?php $_smarty_tpl->_subTemplateRender('file:userMenu.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
							</td>
						</table>
						<?php }?>
			  </div>

	  <?php $_smarty_tpl->_subTemplateRender('file:components/advertComponent.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
	 </body>
 </html><?php }
}
