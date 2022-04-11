<?php
/* Smarty version 4.0.4, created on 2022-04-07 19:44:32
  from '/Avalon/sites/FoxRadio/www/templates/default/components/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_624f14f0f30480_51414456',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6d7d6e5eec95432876d48af6ac61ca053942f4fe' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/components/logo.tpl',
      1 => 1649070302,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624f14f0f30480_51414456 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="logo" onclick="location.reload();">
	<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/img/logo.png">
	<small><?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</small>
	<span><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</span>
</div><?php }
}
