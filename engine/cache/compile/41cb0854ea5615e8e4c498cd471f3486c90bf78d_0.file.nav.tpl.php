<?php
/* Smarty version 4.0.4, created on 2022-04-03 13:07:51
  from '/Avalon/sites/FoxRadio/www/templates/default/nav.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_624971f7788844_42996088',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '41cb0854ea5615e8e4c498cd471f3486c90bf78d' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/nav.tpl',
      1 => 1648980468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624971f7788844_42996088 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="navigation">
	<nav>
	   <ul>				
			<li>
				<a href="#" onclick="$(this).notify('Work In Progress!', 'info');"><i class="fa fa-user" aria-hidden="true"></i>ЛИЧНЫЙ КАБИНЕТ</a>
			</li>
												
			<li>
				<a href="#" onclick="$(this).notify('Work In Progress!', 'info');"><i class="fa fa-money" aria-hidden="true"></i>ДОНАТ УСЛУГИ</a>
			</li>
											
			<li>
				<a href="#" onclick="$(this).notify('Work In Progress!', 'info');"><i class="fa fa-comments" aria-hidden="true"></i>ФОРУМ</a>
			</li>
				


		</ul>
	</nav>
	<?php if (!$_smarty_tpl->tpl_vars['profile']->value) {?>
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
