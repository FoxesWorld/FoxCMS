<?php
/* Smarty version 4.0.4, created on 2023-10-02 12:50:08
  from '/var/www/FoxCMS/templates/eng-tech/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_651a9250a5db77_72140792',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3887b0981ece311cca9c5edbbe4cbca86cd38165' => 
    array (
      0 => '/var/www/FoxCMS/templates/eng-tech/main.tpl',
      1 => 1695976579,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:nav.tpl' => 1,
    'file:right-block.tpl' => 1,
    'file:footer.tpl' => 1,
    'file:notify.tpl' => 1,
  ),
),false)) {
function content_651a9250a5db77_72140792 (Smarty_Internal_Template $_smarty_tpl) {
?><html lang="ru">
   <head>
	  <meta charset="utf-8" />
      <?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>

      <meta name="HandheldFriendly" content="true" />
      <title><?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
</title>
      <meta name="format-detection" content="telephone=no" />
	  <meta name="author" content="FoxesWorld" />
	  <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['siteDesc']->value;?>
" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
	  <meta property="og:title" content="<?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
" />
	  <meta property="og:site_name" content="<?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
" />
	  <meta property="og:url" content="https://foxescraft.ru" />
	  <meta property="og:image" content="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/img/assets/logo.png" />
	  <?php echo '<script'; ?>
 src="//code.jivo.ru/widget/X47ofXrus3" async><?php echo '</script'; ?>
>
	  <?php echo '<script'; ?>
 src="https://www.google.com/recaptcha/api.js?hl=<?php echo $_smarty_tpl->tpl_vars['lang']->value['wysiwyg_language'];?>
" async defer><?php echo '</script'; ?>
>
      <link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/css/style.css" rel="stylesheet">
	  <link rel="shortcut icon" href="/favicon.ico">
      <?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

	  <?php echo '<script'; ?>
>
		  const FoxesInput = new inputHandler();
		  const FoxEngine = new foxEngine("<?php echo $_smarty_tpl->tpl_vars['login']->value;?>
");
	  <?php echo '</script'; ?>
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
	  <?php $_smarty_tpl->_subTemplateRender('file:nav.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      
      <div class="container">
         <div class="row siteContent">
            <div class="<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>container<?php } else { ?>col-8<?php }?>">
               <div id="content" class="mainBlock">

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
