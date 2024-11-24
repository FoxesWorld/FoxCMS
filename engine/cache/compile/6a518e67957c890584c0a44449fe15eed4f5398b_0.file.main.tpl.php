<?php
/* Smarty version 4.0.4, created on 2024-11-19 13:16:08
  from '/var/www/FoxCMS/templates/fillRu/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_673c65688f27f3_33707270',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6a518e67957c890584c0a44449fe15eed4f5398b' => 
    array (
      0 => '/var/www/FoxCMS/templates/fillRu/main.tpl',
      1 => 1731962039,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:../modalApp.tpl' => 1,
    'file:slider.tpl' => 1,
    'file:right-block.tpl' => 1,
    'file:footer.tpl' => 1,
    'file:../notify.tpl' => 1,
  ),
),false)) {
function content_673c65688f27f3_33707270 (Smarty_Internal_Template $_smarty_tpl) {
?><html lang="ru">
   <head>
	  <meta charset="utf-8" />
      <?php echo $_smarty_tpl->tpl_vars['systemHeaders']->value;?>

      <title><?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
</title>
	  <meta name="HandheldFriendly" content="true" />
      <meta name="format-detection" content="telephone=yes" />
	  <meta name="viewport" content="user-scalable=no, initial-scale=2.0, maximum-scale=1.0, width=device-width, height=device-height">
	  <meta name="author" content="FoxesWorld" />
	  <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['siteDesc']->value;?>
" />
	  <meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['keywords']->value;?>
">
      <!-- <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height" /> -->
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
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/js/CustomNavBar.js"><?php echo '</script'; ?>
>

	  <?php echo '<script'; ?>
>
    // Function to set background image based on season
    function setBackgroundBySeason() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const body = document.querySelector('body');

        let backgroundImage = '';
        if (currentMonth >= 3 && currentMonth <= 5) {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/spring.png)';
        } else if (currentMonth >= 6 && currentMonth <= 8) {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/summer.png)';
        } else if (currentMonth >= 9 && currentMonth <= 11) {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/autumn.png)';
        } else {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/winter.jpg)';
			foxEngine.snow.loadSnow();
			$(".container").append('<div class="moderator-button optionButt" onclick="foxEngine.snow.switchSnow();" style="width: 32px; height: 32px;"><i class="fa-light fa-snowflake"></i></div>');
        }

        body.style.backgroundImage = backgroundImage;
    }
	
		
	async function myAction() {
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'discordFeelingBad.tpl', true);
		let data = await foxEngine.entryReplacer.replaceText(template, "");
		foxEngine.modalApp.showModalApp(900, "О нет, конец эпохи!", data, () => {
			foxEngine.cookieManager.setCookie('modalShown', 'true', 7);
		});
	}

    document.addEventListener('DOMContentLoaded', function() {
		foxEngine.cookieManager.checkCookie('modalShown', 'true', 7, myAction, false);
    });
<?php echo '</script'; ?>
>
   </head>
   
   
<body>
    <?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php $_smarty_tpl->_subTemplateRender('file:../modalApp.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

    <div class="container">
        <div class="row siteContent">
            <div class="col-12">
                <?php $_smarty_tpl->_subTemplateRender('file:slider.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
            </div>
            <div class="<?php if (!$_smarty_tpl->tpl_vars['isMobile']->value) {?>col-8<?php } else { ?>container<?php }?>">
                <main id="content" class="mainBlock">
                    <?php echo '<%'; ?>
contentData<?php echo '%>'; ?>

                </main>
            </div>
            <?php $_smarty_tpl->_subTemplateRender("file:right-block.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
        </div>
    </div>

    <div id="cookie-popup" class="show">
        <img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/cookie.png" draggable="false" />
        <p>Для улучшения работы сайта и его взаимодействия с пользователями мы используем файлы cookie. Продолжая работу с сайтом, вы разрешаете использование cookie-файлов. Вы всегда можете отключить файлы cookie в настройках вашего браузера.</p>
        <button class="button" onclick="foxEngine.cookies.acceptCookies()">Принять</button>
    </div>

    <?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php $_smarty_tpl->_subTemplateRender('file:../notify.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</body>

</html><?php }
}
