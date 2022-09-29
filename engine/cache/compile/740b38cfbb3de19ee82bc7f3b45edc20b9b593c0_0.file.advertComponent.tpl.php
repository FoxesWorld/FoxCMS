<?php
/* Smarty version 4.0.4, created on 2022-09-29 16:30:00
  from '/var/www/html/templates/bootstrap/components/advertComponent.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_63359dd8bdc807_67483986',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '740b38cfbb3de19ee82bc7f3b45edc20b9b593c0' => 
    array (
      0 => '/var/www/html/templates/bootstrap/components/advertComponent.tpl',
      1 => 1664444252,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_63359dd8bdc807_67483986 (Smarty_Internal_Template $_smarty_tpl) {
?>
		<div id="notify-content">
			<div class="animate__animated animate__bounceInRight notify_block" id="notify_block">	
			<a class="notify_block_close" onclick="closeNotify();"><i class="fa fa-times"></i></a>
				<div class="content">
					<h3 id="advertisment_title"></h3>
					<div id="advertisment_text"></div>
					<div style="color: #9e0505;" id="alertMessage"></div>
					<a id="link" class="link-hide" href=""></a>
				</div>
			</div>
	</div><?php }
}
