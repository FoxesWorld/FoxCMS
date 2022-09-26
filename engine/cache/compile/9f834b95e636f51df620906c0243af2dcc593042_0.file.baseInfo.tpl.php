<?php
/* Smarty version 4.0.4, created on 2022-09-26 17:27:54
  from '/var/www/html/templates/bootstrap/user/baseInfo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6331b6ea818147_71032809',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9f834b95e636f51df620906c0243af2dcc593042' => 
    array (
      0 => '/var/www/html/templates/bootstrap/user/baseInfo.tpl',
      1 => 1664135970,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6331b6ea818147_71032809 (Smarty_Internal_Template $_smarty_tpl) {
?>											<h2 id="modalTitle">Давай меняй!</h2>
											<span id="modalDesc">Посмотрим <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, что ты тут можешь поменять...</span>
											<section>
													<div class="input_block">
														<input id="realname" class="input" type="text" autocomplete="off" required value="<?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
">
														<label class="label">Полное имя</label>
													</div>
																
													<div class="input_block">
														<input id="email" class="input" type="text" autocomplete="off" required value="<?php echo $_smarty_tpl->tpl_vars['email']->value;?>
">
														<label class="label">E-mail</label>
													</div>

													<div class="input_block">
														<input id="password" class="input" type="text" autocomplete="off">
														<label class="label">Текущий пароль</label>
													</div>
											</section><?php }
}
