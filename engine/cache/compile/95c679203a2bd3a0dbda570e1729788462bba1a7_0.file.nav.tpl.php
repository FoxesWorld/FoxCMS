<?php
/* Smarty version 4.0.4, created on 2023-10-30 19:23:04
  from '/var/www/FoxCMS/templates/jafar-tech/nav.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_653fd868d617f0_37912042',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '95c679203a2bd3a0dbda570e1729788462bba1a7' => 
    array (
      0 => '/var/www/FoxCMS/templates/jafar-tech/nav.tpl',
      1 => 1696660571,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_653fd868d617f0_37912042 (Smarty_Internal_Template $_smarty_tpl) {
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
