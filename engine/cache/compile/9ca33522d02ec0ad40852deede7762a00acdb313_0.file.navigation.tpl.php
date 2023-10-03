<?php
/* Smarty version 4.0.4, created on 2023-10-02 21:12:07
  from '/var/www/FoxCMS/templates/foxengine/navigation.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_651b07f7d80fd7_80281468',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9ca33522d02ec0ad40852deede7762a00acdb313' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine/navigation.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_651b07f7d80fd7_80281468 (Smarty_Internal_Template $_smarty_tpl) {
?><nav class="navbar navbar-expand-lg bar">
	<ul class="inline p-3">
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
			<?php }?></ul>
			</div>
		</li>
		
		<li>
			<div class="rightAction d-none d-md-flex" id="actionBlock"></div>
		</li>
	</ul>
	
</nav>
<?php }
}
