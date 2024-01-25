<?php
/* Smarty version 4.0.4, created on 2024-01-25 21:09:10
  from '/var/www/FoxCMS/templates/foxengine2/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65b2a3c6eaa877_73962663',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5f8a501b6f61e60c7c184f8a525252b253c4233d' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/header.tpl',
      1 => 1706180571,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_65b2a3c6eaa877_73962663 (Smarty_Internal_Template $_smarty_tpl) {
?><header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg">
	<div class="container-fluid d-flex align-items-center justify-content-between">
		<!-- Logo -->
		<div class="logo-block">
			<a href="/" class="navbar-brand">
				<link type="text/css" rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/logo/logo.css" />
				<div class="logoWrapper">
					<div class="logo uk-animation-slide-left">
						<ul class="list-inline">
							<li>
								<img class="img-fluid" uk-img />
							</li>

							<li>
								<div class="titleWrapper uk-animation-fade">
									<h1 class="title"><?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
</h1>
								</div>
							</li>

							<li><small class="status uk-animation-fade"><?php echo $_smarty_tpl->tpl_vars['siteStatus']->value;?>
</small></li>
						</ul>
						<span class="line uk-animation-expand"></span>
					</div>
				</div>
				<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/logo/animation.js"><?php echo '</script'; ?>
>
			</a>
		</div>
		<!-- Nav -->
<div class="navbar-center flex-grow-1">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0 dropup"></ul>
    </div>
</div>


		<!-- Userfields -->
		<div class="navbar-right userBlock">
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img class="profilePic uk-animation-fade" src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo" />
					<?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
					<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
					<span id="realmoney-info-login" class="ms-2"><?php echo $_smarty_tpl->tpl_vars['units']->value;?>
</span>
					<?php }?>
				</a>
				<ul class="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdownMenuLink" data-bs-popper="static">
				
					<li>
						<span class="dropdown-item">
							<div class="d-flex align-items-center">
								<div class="flex-grow-1">
									<div class="d-flex align-items-center">
										<div class="flex-shrink-0 me-3">
											<div class="avatar">
												<img class="w-40 h-auto rounded-circle profilePic uk-animation-fade" src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo" uk-img />
											</div>
										</div>
										<div>
											<span class="fw-medium d-block"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</span>
											<small class="text-muted"><?php echo $_smarty_tpl->tpl_vars['groupName']->value;?>
</small>
										</div>
									</div>
								</div>
							</div>
						</span>
					</li>
				
					<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
					<li class="dropdown-item">
						<a href="#" class="pageLink-auth" onclick="foxEngine.page.loadPage('auth', replaceData.contentBlock); return false;"> <i class="fa fa-sign-in me-2"></i> Войти </a>
					</li>
					<li class="dropdown-item">
						<a href="#" class="pageLink-reg" onclick="foxEngine.page.loadPage('reg', replaceData.contentBlock); return false;"> <i class="fa fa-user-plus me-2"></i> Зарегистрироваться </a>
					</li>
					<?php } else { ?>

					<ul id="usrMenu">
						<!-- Здесь можно добавить дополнительные пункты меню -->
					</ul>

					<li><hr class="dropdown-divider" /></li>

					<li class="dropdown-item">
						<a href="#" class="pageLink-logout" onclick="foxEngine.user.logout($(this)); return false;"> <i style="color: red" class="fa fa-sign-out me-2"></i> Выйти </a>
					</li>

					<?php }?>
				</ul>
			</li>

			<style>
				.dropdown-item {
					display: contents;
				}

				.dropdown-item > a {
				    width: 100%;
					display: flex;
					float: left;
					height: 42px;
					padding: 10px;
				}

				.navbar-nav > .nav-item > a {
					width: 100%;
				}

				.dropdown-item > a > i {
				    margin: 2px 5px;
				}
			</style>

			<!--  -->
			<button class="navbar-toggler" onclick="toggleAbsolutePosition()" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon">
                <span class="navbar-toggler-bar bar1 mt-2"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </span>    
          </button>
		</div>
	</div>
</header>

<?php echo '<script'; ?>
>
	 function toggleAbsolutePosition() {
	     var navbarCollapse = document.getElementById("navbarSupportedContent");
	     if (getComputedStyle(navbarCollapse).position === "absolute") {
			setTimeout(function() {
					navbarCollapse.style.position = "";
			}, 350);
	         
	     } else {
	         navbarCollapse.style.position = "absolute";
	         navbarCollapse.style.right = "0";
	         navbarCollapse.style.top = "100px";
	     }
	 }

	  document.addEventListener('click', function(event) {
	     var navbarCollapse = document.getElementById("navbarSupportedContent");
	     var navbarToggler = document.querySelector(".navbar-toggler");

	     if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
	navbarToggler.classList.add("collapsed");
	     }
	 });
<?php echo '</script'; ?>
>
<?php }
}
