<?php
/* Smarty version 4.0.4, created on 2022-09-26 00:58:05
  from '/var/www/html/templates/bootstrap/components/profileComponent.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6330ceedce5ac0_04598245',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6335d7478f351d2523563f8ae86801fd6d22a626' => 
    array (
      0 => '/var/www/html/templates/bootstrap/components/profileComponent.tpl',
      1 => 1664103461,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6330ceedce5ac0_04598245 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="userProfile animate__animated animate__backInLeft animate__delay-1s">
	<ul>
		<li class="profilePhoto">
			<img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
">
		</li>

		<div class="userdata">
			<li><b><i class="fa fa-user-circle-o" aria-hidden="true"></i>Логин</b>: <?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</li>
			<li><b><i class="fa fa-address-card-o" aria-hidden="true"></i>Почта</b>: <?php echo $_smarty_tpl->tpl_vars['email']->value;?>
</li>
			<li><b><i class="fa fa-users" aria-hidden="true"></i>Группа</b>: <?php echo $_smarty_tpl->tpl_vars['group_name']->value;?>
</li>
			<li><b><i class="fa fa-diamond" aria-hidden="true"></i>Полное имя</b>: <?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</li>
		</div>
	</ul>
	
	<ul class="userActions">
		<li>
			<?php if (!$_smarty_tpl->tpl_vars['isLogged']->value) {?>
					<a href="#login">
					<button class="logInBtn">
						<span>Войти</span>
					</button>
					</a>
			<?php } else { ?>
				<form method="POST" action="/" id="sessionActions">
					<button type="submit" class="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> logout</button>
					<input id="user_doaction" class="input" type="hidden" value="logout">
				</form>
			 <?php }?>	
		</li>
	</ul>
</div><?php }
}
