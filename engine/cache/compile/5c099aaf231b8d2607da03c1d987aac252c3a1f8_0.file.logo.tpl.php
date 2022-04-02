<?php
/* Smarty version 4.0.4, created on 2022-04-02 18:14:02
  from '/Avalon/sites/FoxRadio/www/templates/default/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6248683a96d543_68140332',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5c099aaf231b8d2607da03c1d987aac252c3a1f8' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/logo.tpl',
      1 => 1648912381,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6248683a96d543_68140332 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="logo" onclick="mainRefresh($(this))">
	<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/img/logo.png">
	<small>Alpha</small>
	<span>FoxRadio</span>
</div><?php }
}
