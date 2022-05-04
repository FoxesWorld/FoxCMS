<?php
/* Smarty version 4.0.4, created on 2022-05-04 13:12:05
  from '/Avalon/sites/FoxRadio/www/templates/bootstrap/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6272517582cf17_67625913',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9eaa809533db4c892e6a48f9b42fe6b339f6631a' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/bootstrap/main.tpl',
      1 => 1651659104,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:upload.tpl' => 1,
    'file:components/advertComponent.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_6272517582cf17_67625913 (Smarty_Internal_Template $_smarty_tpl) {
?><head>
	<?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>
	
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
	<?php echo '<script'; ?>
 type="text/javascript" src="//vk.com/js/api/openapi.js?130"><?php echo '</script'; ?>
>
	<?php echo $_smarty_tpl->tpl_vars['vkGroup']->value;?>

</head>

<body>
	<?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

		  <section id="topbar" class="d-flex align-items-center">
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
				  <div class="cta d-none d-md-flex align-items-center">
					<?php echo $_smarty_tpl->tpl_vars['greetings']->value;?>
 &nbsp; <?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
!
					  <?php if ($_smarty_tpl->tpl_vars['userGroup']->value == 'admin') {?>
							<a class="button-three" href="#adm">Adminpanel</a>
					  <?php }?>
				  </div>
				 <?php }?>
			</div>
		  </section>
		  
		  <div id="content">
			<?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>


				<table>
					<?php if ($_smarty_tpl->tpl_vars['isLogged']->value) {?>
					<td>
						<div id="userBlock">
							<?php echo $_smarty_tpl->tpl_vars['profile']->value;?>

							<?php $_smarty_tpl->_subTemplateRender('file:upload.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
						</div>
					</td>
					
					<td>
						<div class="container-fluid" id="pageData">
							Your files are...
						</div>
					</td>
					<?php } else { ?>
					<td>
						<div class="container" id="vkGroup"></div>
					</td>
					<?php }?>
			 </table>
		  </div>

  <?php $_smarty_tpl->_subTemplateRender('file:components/advertComponent.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
 </body><?php }
}
