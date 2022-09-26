<?php
/* Smarty version 4.0.4, created on 2022-09-26 22:25:27
  from '/var/www/html/templates/bootstrap/userMenu.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6331fca707a9d9_89250700',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '01c6187b8af30e3f8096870f2ba77e1e5288cce5' => 
    array (
      0 => '/var/www/html/templates/bootstrap/userMenu.tpl',
      1 => 1664140560,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:user/baseInfo.tpl' => 1,
    'file:user/personalisation.tpl' => 1,
    'file:user/security.tpl' => 1,
  ),
),false)) {
function content_6331fca707a9d9_89250700 (Smarty_Internal_Template $_smarty_tpl) {
?>								<div class="tabs">
									<ul class="tab_caption animate__animated animate__fadeInRightBig animate__delay-1s">
										<li class="active" value="profile">Настройки профиля</li>
										<li>Персонализация</li>
										<li>Безопасность</li>
									</ul>

									<form method="POST" action="/" id="editProfileForm">								
										<div class="tab_content active">
											<?php $_smarty_tpl->_subTemplateRender("file:user/baseInfo.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
										</div>

										<div class="tab_content">
											<?php $_smarty_tpl->_subTemplateRender("file:user/personalisation.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
										</div>
													
										<div class="tab_content">
											<?php $_smarty_tpl->_subTemplateRender("file:user/security.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
										</div>
											<input id="user_doaction" class="input" type="hidden" value="EditUser" />
											<input id="login" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['login']->value;?>
" />
											<input id="userGroup" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['user_group']->value;?>
" />
											<input id="foxesHash" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['hash']->value;?>
" />
											<button type="submit" class="login">Изменить <div class="fa fa-cog fa-spin"></div></button>
									</form>
								</div>
												
									<?php echo '<script'; ?>
>
										$(function() {
											$('ul.tab_caption').on('click', 'li:not(.active)', function() {
												$(this)
													.addClass('active').siblings().removeClass('active')
													.closest('div.tabs').find('div.tab_content').removeClass('active').eq($(this).index()).addClass('active');
													let tab = $(this);
											});
										});
									<?php echo '</script'; ?>
>

<?php }
}
