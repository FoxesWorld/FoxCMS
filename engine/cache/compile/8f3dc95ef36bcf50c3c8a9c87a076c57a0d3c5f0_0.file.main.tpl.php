<?php
/* Smarty version 4.0.4, created on 2023-04-27 08:57:09
  from '/var/www/foxcms/templates/foxengine/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_644a0eb532b9e1_87043074',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8f3dc95ef36bcf50c3c8a9c87a076c57a0d3c5f0' => 
    array (
      0 => '/var/www/foxcms/templates/foxengine/main.tpl',
      1 => 1682574982,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:right-block.tpl' => 1,
    'file:footer.tpl' => 1,
    'file:notify.tpl' => 1,
  ),
),false)) {
function content_644a0eb532b9e1_87043074 (Smarty_Internal_Template $_smarty_tpl) {
?><html>
   <head>
      <?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>

      <meta charset="utf-8">
      <meta name="HandheldFriendly" content="true">
      <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
      <meta name="format-detection" content="telephone=no">
	  <meta name="author" content="FoxesWorld">
	  <meta name="description" content="FoxEngine" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="default">
	  <meta property="og:title" content="FoxesWorld">
	  <meta property="og:site_name" content="FoxesWorld">
	  <meta property="og:url" content="https://foxescraft.ru">
	  <meta property="og:image" content="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/img/assets/logo.png" />
	  <?php echo '<script'; ?>
 src="//code.jivo.ru/widget/X47ofXrus3" async><?php echo '</script'; ?>
>
      <link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/css/style.css" rel="stylesheet">
	  <link rel="shortcut icon" href="/favicon.ico">
      <?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

	  <?php echo '<script'; ?>
>let FoxEngine = new foxEngine("<?php echo $_smarty_tpl->tpl_vars['login']->value;?>
");<?php echo '</script'; ?>
>
	  <?php echo '<script'; ?>
 type="module" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/App.js"><?php echo '</script'; ?>
>
	  <?php echo '<script'; ?>
 type="module" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/metrics.js"><?php echo '</script'; ?>
>
		
   </head>
   <body>
      <?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      <section id="topbar" class="d-flex align-items-center shadow bar">
         <div class="container d-flex justify-content-center justify-content-md-between">
            <div class="leftAction d-flex align-items-center">
            </div>
            <div class="rightAction d-none d-md-flex align-items-center" data-in-effect="fadeIn" id="actionBlock">
               <span class="text-wrapper">
               </span>
            </div>
         </div>
      </section>
      <div class="container">
         <div class="row siteContent">
            <div class="col-8">
               <div id="content" class="mainBlock">
			   <?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
				   <span id="test" style="height: 512px;width: auto;display: block; border: 2px solid #998f98ad; border-radius: 10px;"></span>
				   <button class="login" onclick="loadPage('guestMore', '#test');">LoadContent</button>
			   <?php } else { ?>
				<?php echo '<%'; ?>
contentData<?php echo '%>'; ?>

			   <?php }?>
               </div>
            </div>
               <?php $_smarty_tpl->_subTemplateRender("file:right-block.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
         </div>
      </div>
      <?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
	  <?php $_smarty_tpl->_subTemplateRender('file:notify.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
   </body>
</html><?php }
}
