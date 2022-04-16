<?php
/* Smarty version 4.0.4, created on 2022-04-15 09:43:55
  from '/Avalon/sites/FoxRadio/www/templates/bootstrap/components/advertComponent.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6259142bb154b9_12992052',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'bf54edac7b7ea468fd9d77b361c5adb48c434e99' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/bootstrap/components/advertComponent.tpl',
      1 => 1649692593,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6259142bb154b9_12992052 (Smarty_Internal_Template $_smarty_tpl) {
?>	<link href="/engine/classes/modules/advert/styles.css" rel="stylesheet" type="text/css">

	<div style="display:none;" id="notify-content">
			<div class="animate__animated animate__bounceInRight notify_block animate__delay-4s" id="notify_block">	
			<a class="notify_block_close" onclick="closeNotify();"><i class="bi bi-x-circle"></i></a>
				<div class="content">
					<h3 id="advertisment_title"></h3>
					<div id="advertisment_text"></div>
					<div class="freeImagesLeft" id="imagesLeft"></div>
					<div style="color: #9e0505;" id="alertMessage"></div>
					<a id="link" class="link-hide" href=""></a>
				</div>
			</div>
	</div>

	<?php echo '<script'; ?>
 src="/engine/classes/modules/advert/notify-0.1.5.js"><?php echo '</script'; ?>
><?php }
}
