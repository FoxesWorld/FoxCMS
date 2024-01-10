<?php
/* Smarty version 4.0.4, created on 2024-01-10 13:39:33
  from '/var/www/FoxCMS/templates/foxengine2/navigation.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_659e73e5afb0a1_18371135',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'dafc432d90c4924055aacf2f5fd6a99ea1c120f6' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/navigation.tpl',
      1 => 1704126797,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_659e73e5afb0a1_18371135 (Smarty_Internal_Template $_smarty_tpl) {
?><nav class="navbar navbar-expand-lg bar">
	<ul class="inline foxesNav">
		<li>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
				<span class="navbar-toggler-icon"></span>
			</button>
		</li>

		<li>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0">
				<?php if ($_smarty_tpl->tpl_vars['isMobile']->value) {?>
					<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
						<li class="nav-item">
							<a class="pageLink-faq selectedPage" onclick="FoxEngine.loadPage('auth', replaceData.contentBlock); return false; ">
								<div class="rightIcon">
									<i class="fa fa-sign-in"></i>
								</div>
							Авторизация
							</a>
						</li>
					<?php }?>
				<ul id="usrMenu">
				</ul>
			<?php }?></ul>
			</div>
		</li>
	</ul>
	<div class="rightAction d-none d-md-flex" id="actionBlock"></div>
	
</nav>
<?php }
}
