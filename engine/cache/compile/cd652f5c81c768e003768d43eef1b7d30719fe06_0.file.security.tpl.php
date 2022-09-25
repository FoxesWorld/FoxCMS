<?php
/* Smarty version 4.0.4, created on 2022-09-26 00:58:05
  from '/var/www/html/templates/bootstrap/user/security.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6330ceedcf92c9_89530696',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cd652f5c81c768e003768d43eef1b7d30719fe06' => 
    array (
      0 => '/var/www/html/templates/bootstrap/user/security.tpl',
      1 => 1664135629,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6330ceedcf92c9_89530696 (Smarty_Internal_Template $_smarty_tpl) {
?>											<h2 id="modalTitle">Давай портить!</h2>
											<span id="modalDesc">Настройки безопасности, <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, изменить может тут</span>
											<section>
													
													<div class="input_block">
													<input id="newPass" class="input" type="text" autocomplete="off">
														<label class="label">Новый пароль</label>
													</div>
													
													<div class="input_block">
													<input id="repeatPass" class="input" type="text" autocomplete="off">
														<label class="label">Повтор пароля</label>
													</div>
													
											</section><?php }
}
