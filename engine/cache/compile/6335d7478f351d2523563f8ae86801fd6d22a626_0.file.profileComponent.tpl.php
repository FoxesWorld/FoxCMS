<?php
/* Smarty version 4.0.4, created on 2022-09-24 01:19:44
  from '/var/www/html/templates/bootstrap/components/profileComponent.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_632e3100c41c95_40618830',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6335d7478f351d2523563f8ae86801fd6d22a626' => 
    array (
      0 => '/var/www/html/templates/bootstrap/components/profileComponent.tpl',
      1 => 1663971409,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_632e3100c41c95_40618830 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="userProfile animate__animated animate__backInLeft animate__delay-1s">
	<ul>
		<li class="profilePhoto">
			<img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
">
		</li>

		<li><b>Логин</b>: <?php echo $_smarty_tpl->tpl_vars['LoggedName']->value;?>
</li>
		<li><b>Почта</b>: <?php echo $_smarty_tpl->tpl_vars['email']->value;?>
</li>
		<li><b>Группа</b>: <?php echo $_smarty_tpl->tpl_vars['userGroup']->value;?>
</li>
		<li><b>Полное имя</b>: <?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</li>
	</ul>
	
	<ul>
		<li>
			<form method="POST" action="/" id="loggedForm">
				<input type="submit" value="logout" class="logout" />
				<input id="user_doaction" class="input" type="hidden" value="logout">
			</form>
		</li>
	</ul>
</div><?php }
}
