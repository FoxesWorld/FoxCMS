<?php
/* Smarty version 4.0.4, created on 2022-04-12 09:18:37
  from '/Avalon/sites/FoxRadio/www/templates/bootstrap/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_625519bd2dbb82_87998989',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9eaa809533db4c892e6a48f9b42fe6b339f6631a' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/bootstrap/main.tpl',
      1 => 1649744313,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:components/advert.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_625519bd2dbb82_87998989 (Smarty_Internal_Template $_smarty_tpl) {
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
	<link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/css/input.css" rel="stylesheet">
	<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/js/main.js"><?php echo '</script'; ?>
>
</head>

<body>
	<?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <section id="topbar" class="d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">Tres.com</a></i>
        <i class="bi bi-phone d-flex align-items-center ms-4"><span><?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</span></i>
      </div>
		<?php if (!$_smarty_tpl->tpl_vars['isLogged']->value) {?>
		  <div class="cta d-none d-md-flex align-items-center">
			<a href="#login" class="scrollto">LogIn</a>
		  </div>
		<?php } else { ?>
		  <div class="cta d-none d-md-flex align-items-center">
			Hey you <?php echo $_smarty_tpl->tpl_vars['LoggedName']->value;?>
!
		  </div>
		 <?php }?>
    </div>
  </section>
  
  <div id="content">
	<?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

	<div class="row">
	 <?php echo $_smarty_tpl->tpl_vars['profile']->value;?>

	</div>
  </div>
  <?php $_smarty_tpl->_subTemplateRender('file:components/advert.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  
  <?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  
  
 </body><?php }
}
