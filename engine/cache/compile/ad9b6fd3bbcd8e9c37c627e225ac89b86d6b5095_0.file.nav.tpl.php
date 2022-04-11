<?php
/* Smarty version 4.0.4, created on 2022-04-07 19:44:32
  from '/Avalon/sites/FoxRadio/www/templates/default/components/nav.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_624f14f0f3bf98_29221368',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ad9b6fd3bbcd8e9c37c627e225ac89b86d6b5095' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/components/nav.tpl',
      1 => 1649169238,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624f14f0f3bf98_29221368 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="navigation">
	<nav>
	   <ul>				
			<?php echo $_smarty_tpl->tpl_vars['links']->value;?>

		</ul>
	</nav>
	<?php if (!$_smarty_tpl->tpl_vars['isLogged']->value) {?>
	<nav class="rightNavBlock">
		<li>
			<div class="sub-main">
				<a href="#login"><button class="logInBtn"><span>Войти</span></button></a>
			</div>
		</li>
	</nav>
	<?php }?>
</div><?php }
}
