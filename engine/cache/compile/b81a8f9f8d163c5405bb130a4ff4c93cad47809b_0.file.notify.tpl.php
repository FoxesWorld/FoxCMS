<?php
/* Smarty version 4.0.4, created on 2022-04-03 17:25:09
  from '/Avalon/sites/FoxRadio/www/templates/default/notify.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6249ae45178850_28848552',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b81a8f9f8d163c5405bb130a4ff4c93cad47809b' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/notify.tpl',
      1 => 1648995906,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6249ae45178850_28848552 (Smarty_Internal_Template $_smarty_tpl) {
?>	<link href="/engine/classes/notify/styles.css" rel="stylesheet" type="text/css">

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
 src="/engine/classes/notify/notify-0.1.5.js"><?php echo '</script'; ?>
><?php }
}
