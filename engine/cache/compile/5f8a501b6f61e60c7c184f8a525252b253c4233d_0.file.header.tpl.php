<?php
/* Smarty version 4.0.4, created on 2024-02-10 16:42:03
  from '/var/www/FoxCMS/templates/foxengine2/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65c77d2bb70cf2_83956866',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5f8a501b6f61e60c7c184f8a525252b253c4233d' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/header.tpl',
      1 => 1707469543,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_65c77d2bb70cf2_83956866 (Smarty_Internal_Template $_smarty_tpl) {
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
	<div class="navbar-center">
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
				<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink" data-bs-popper="static">
				
					<li>
						<span class="dropdown-item">
							<div class="d-flex align-items-center">
								<div class="flex-grow-1">
									<div class="d-flex">
										<div class="flex-shrink-0">
											<div class="avatar">
												<img class="w-40 h-auto rounded-circle profilePic uk-animation-fade" src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo" uk-img />
											</div>
										</div>
										<div class="me-3">
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
						  <?php echo '<script'; ?>
>
							async function addFunds(){
								const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl');
								let data = foxEngine.entryReplacer.replaceText(template, "");
								foxEngine.modalApp.showModalApp(900, data);
								//
							}
						  <?php echo '</script'; ?>
>
					<ul id="usrMenu">
						<li><hr class="dropdown-divider" /></li>
						<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 4) {?>
						<li class="dropdown-item">
							<a class="pageLink-addFunds" onclick="addFunds(); return false; ">
								<div class="rightIcon">
									<i style="color: #d8e815" class="fa fa-money"></i>
								</div>Пополнить счёт
							</a>
						</li>
						<?php }?>
						<!-- User options go here -->
					</ul>

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

			</style>

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
