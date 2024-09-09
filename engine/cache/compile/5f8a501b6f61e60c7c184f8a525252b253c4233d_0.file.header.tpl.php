<?php
/* Smarty version 4.0.4, created on 2024-09-09 09:32:58
  from '/var/www/FoxCMS/templates/foxengine2/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_66de969aa447b3_79749738',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5f8a501b6f61e60c7c184f8a525252b253c4233d' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/header.tpl',
      1 => 1725639883,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:logo.tpl' => 1,
    'file:userBlock.tpl' => 1,
  ),
),false)) {
function content_66de969aa447b3_79749738 (Smarty_Internal_Template $_smarty_tpl) {
?><style>
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

	<header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg bar">
        <div class="container-fluid d-flex align-items-center justify-content-between" style="padding: 0px;">
            <!-- Logo -->
			<?php $_smarty_tpl->_subTemplateRender('file:logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
            <!-- Nav -->
            <div class="navbar-center">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0 dropup">
				   <?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
				   <li class="nav-item uk-animation-fade">
					  <a href="#" class="pageLink-auth" onclick="foxEngine.page.loadPage('auth'); return false;"> <i class="fa fa-sign-in me-2"></i> Войти </a>
				   </li>
				   <li class="nav-item uk-animation-fade">
					  <a href="#" class="pageLink-reg" onclick="foxEngine.page.loadPage('reg'); return false;"> <i class="fa fa-user-plus me-2"></i> Создать аккаунт</a>
				   </li>
				   <?php }?>
				   
					<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 1) {?> 
						
					<?php }?>
					
					</ul>
                </div>
            </div>

            <!-- Userfields -->
            <div class="navbar-right">
				<ul class="userBlock">
				   <!--  LOGGED USER -->
				   <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
						<?php $_smarty_tpl->_subTemplateRender('file:userBlock.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
				   <?php } else { ?>
                <button class="navbar-toggler" style="width: auto;" onclick="toggleAbsolutePosition()" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <span class="navbar-toggler-bar bar1 mt-2"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
				<?php }?>
				</ul>
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
><?php }
}
