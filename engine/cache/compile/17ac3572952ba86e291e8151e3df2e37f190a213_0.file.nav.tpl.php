<?php
/* Smarty version 4.0.4, created on 2023-10-02 12:50:08
  from '/var/www/FoxCMS/templates/eng-tech/nav.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_651a9250a639f7_06999947',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '17ac3572952ba86e291e8151e3df2e37f190a213' => 
    array (
      0 => '/var/www/FoxCMS/templates/eng-tech/nav.tpl',
      1 => 1696009727,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_651a9250a639f7_06999947 (Smarty_Internal_Template $_smarty_tpl) {
?><nav class="navbar navbar-expand-lg bar">
	<ul class="inline p-3" style="margin: 0 auto;">
		<li>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
				<span class="navbar-toggler-icon"></span>
			</button>
		</li>

		<li>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			
				<ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0">
				<!--<?php if ($_smarty_tpl->tpl_vars['isMobile']->value) {?>
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
			<?php }?> --></ul>
			</div>
		</li>
		
		<li>
			<div class="dropdown d-none d-md-flex">
			  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
				Дополнительно
			  </button>
			  <ul class="dropdown-menu">

			  </ul>
			</div>
		</li>
	</ul>
	
</nav>
<?php }
}
