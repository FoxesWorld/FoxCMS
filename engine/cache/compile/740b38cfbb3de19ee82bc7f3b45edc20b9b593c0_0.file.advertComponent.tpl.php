<?php
/* Smarty version 4.0.4, created on 2022-09-25 14:08:39
  from '/var/www/html/templates/bootstrap/components/advertComponent.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_633036b72b9e38_38358616',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '740b38cfbb3de19ee82bc7f3b45edc20b9b593c0' => 
    array (
      0 => '/var/www/html/templates/bootstrap/components/advertComponent.tpl',
      1 => 1663955298,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_633036b72b9e38_38358616 (Smarty_Internal_Template $_smarty_tpl) {
?>	<link href="/engine/classes/modules/Advert/styles.css" rel="stylesheet" type="text/css">

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
 src="/engine/classes/modules/Advert/notify-0.1.6.js"><?php echo '</script'; ?>
><?php }
}
