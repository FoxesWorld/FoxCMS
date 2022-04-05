<?php
/* Smarty version 4.0.4, created on 2022-04-05 19:25:58
  from '/Avalon/sites/FoxRadio/www/templates/default/components/advert.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_624c6d96a9bdf7_35964591',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ebe6b7bec4b0eafb032ddddfd13f3f3759df4fe4' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/components/advert.tpl',
      1 => 1649175954,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624c6d96a9bdf7_35964591 (Smarty_Internal_Template $_smarty_tpl) {
?>	<link href="/engine/classes/modules/advert/styles.css" rel="stylesheet" type="text/css">

	<div style="display:none;" id="notify-content">
			<div class="animate__animated animate__bounceInRight notify_block animate__delay-4s" id="notify_block">	
			<a class="notify_block_close" onclick="closeNotify();"><i class="fa fa-times" aria-hidden="true" style="color: #fff;"></i></a>
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
