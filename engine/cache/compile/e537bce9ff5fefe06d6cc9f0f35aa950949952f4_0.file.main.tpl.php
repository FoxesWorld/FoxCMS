<?php
/* Smarty version 4.0.4, created on 2024-01-25 21:09:10
  from '/var/www/FoxCMS/templates/foxengine2/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65b2a3c6ea4ed4_54181573',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e537bce9ff5fefe06d6cc9f0f35aa950949952f4' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/main.tpl',
      1 => 1706181763,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:../modalApp.tpl' => 1,
    'file:right-block.tpl' => 1,
    'file:footer.tpl' => 1,
    'file:../notify.tpl' => 1,
  ),
),false)) {
function content_65b2a3c6ea4ed4_54181573 (Smarty_Internal_Template $_smarty_tpl) {
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
	  <!-- <?php echo '<script'; ?>
 src="//code.jivo.ru/widget/X47ofXrus3" async><?php echo '</script'; ?>
> -->
	  <?php echo '<script'; ?>
 src="https://www.google.com/recaptcha/api.js?hl=ru_RU" async defer><?php echo '</script'; ?>
>
      <link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/css/style.css" rel="stylesheet">
	  <link rel="shortcut icon" href="/favicon.ico">
      <?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

	  
	  <style>
		.LetItSnow {
			height: 100vh;
			width: 98vw;
			--webkit-filter: blur(2px);
			-filter: blur(2px);
			position: absolute;
			pointer-events: none;
			z-index: 999999999;
			top: 0;
		}
	</style>

	  <?php echo '<script'; ?>
 type="module" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/App.js"><?php echo '</script'; ?>
>
	  <?php echo '<script'; ?>
 type="module" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/metrics.js"><?php echo '</script'; ?>
>
	  <?php echo '<script'; ?>
 type="module" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/cookie.js"><?php echo '</script'; ?>
>
   </head>
   <body>
      <?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
	  <?php $_smarty_tpl->_subTemplateRender('file:../modalApp.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      
      <div class="container">
         <div class="row siteContent">
            <div class="<?php if (!$_smarty_tpl->tpl_vars['isMobile']->value) {?>col-8<?php } else { ?>container<?php }?>"> <!-- -->
               <div id="content" class="mainBlock">
				<?php echo '<%'; ?>
contentData<?php echo '%>'; ?>

               </div>
            </div>
               <?php $_smarty_tpl->_subTemplateRender("file:right-block.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
         </div>
		 <div class="moderator-button optionButt" onclick="foxEngine.snow.switchSnow();">
			<i class="fa fa-snowflake-o"></i>
		</div>
      </div>
	  <div id="cookie-popup" style="display: none">
        <div class="text-center" id="cookie-header">
          <img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/cookie.png" draggable="false" />
        </div>
        <div id="cookie-body">
          <p>Наш сайт использует печеньки (и не только потому, что у нас есть Печеньки-Монстр). 
		  Они необходимы для создания невероятного опыта в использовании сайта – будь то путешествие по страницам или открытие сундука с новыми идеями.</p>
          <a onclick="foxEngine.page.loadPage('cookies', replaceData.contentBlock); return false;" href="#">Хочу знать больше...</a>
          <div class="cookie-buttons">
            <button id="btn-cookie" type="submit">Соглашаюсь</button>
          </div>
        </div>
      </div>
      <?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
	  <?php $_smarty_tpl->_subTemplateRender('file:../notify.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
   </body>
</html><?php }
}
