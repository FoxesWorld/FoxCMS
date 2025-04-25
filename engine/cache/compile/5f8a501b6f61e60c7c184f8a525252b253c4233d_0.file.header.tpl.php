<?php
/* Smarty version 4.0.4, created on 2025-04-25 19:01:02
  from '/var/www/FoxCMS/templates/foxengine2/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_680bb1be3284e4_44508743',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5f8a501b6f61e60c7c184f8a525252b253c4233d' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/header.tpl',
      1 => 1745058492,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:logo.tpl' => 1,
    'file:userBlock.tpl' => 1,
  ),
),false)) {
function content_680bb1be3284e4_44508743 (Smarty_Internal_Template $_smarty_tpl) {
?><header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg bar">
<div class="container-fluid d-flex align-items-center justify-content-between" style="padding: 5px;">
        <!-- Logo -->
        <?php $_smarty_tpl->_subTemplateRender('file:logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

        <!-- Nav -->
        <div class="navbar-center">
            <input type="checkbox" id="navbarToggle" hidden>
            <div class="navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav pages me-auto mb-2 mb-lg-0 dropup" style="margin: 0 auto;">
                    <?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
                    <li class="nav-item uk-animation-fade">
                        <a href="#" class="pageLink-auth" onclick="foxEngine.page.loadPage('auth'); return false;">
                            <div class="rightIcon">
                                <i class="fa fa-sign-in me-2"></i>
                            </div>
                            Войти
                        </a>
                    </li>
                    <li class="nav-item uk-animation-fade">
                        <a href="#" class="pageLink-reg" onclick="foxEngine.page.loadPage('reg'); return false;">
                            <div class="rightIcon">
                                <i class="fa fa-user-plus me-2"></i>
                            </div>
                            Создать аккаунт
                        </a>
                    </li>
                    <?php }?>
                </ul>
            </div>
        </div>

        <!-- Userfields -->
        <div class="navbar-right">
			
        </div>
            <ul class="userBlock">
                <!-- LOGGED USER -->
                <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
                <?php $_smarty_tpl->_subTemplateRender('file:userBlock.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
				
			<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 1) {?>
			<!--
			<li class="nav-sep"></li>
			<li>		
			<a class="regular-btn regular-btn-icon" title="Сообщения" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
				<i class="fa-solid fa-envelope"></i>
				<span data-element="notificationsCounter" class="unread-counter d-none">0</span>
			</a>
			</li>
			
			

			<li>
			<a href="" class="regular-btn regular-btn-icon" title="Уведомления" data-bs-toggle="dropdown" data-bs-auto-close="outside">
				<i class="fa-solid fa-bell"></i>
				<span data-element="notificationsCounter" class="unread-counter d-none">0</span>
			</a>
			</li> -->
		<?php }?>
                <?php } else { ?>
                <!-- Custom burger menu button for mobile version -->
                <button class="navbar-toggler" for="navbarToggle">
                    <span class="mantine-cahhlp">
                        <span class="navbar-toggler-icon"></span>
                    </span>
                </button>
				
				<?php echo '<script'; ?>
>
					document.addEventListener("DOMContentLoaded", () => {
						const customNavbar = new CustomNavbar({
							togglerSelector: ".navbar-toggler",
							collapseSelector: "#navbarSupportedContent",
							burgerButtonSelector: ".mantine-cahhlp",
							toggleAnimationDelay: 140,
							closeAnimationDelay: 400,
							  onOpen: () => {
								console.log('NavBar opened!');
							}
						});
					});
					<?php echo '</script'; ?>
>
                <?php }?>
            </ul>
    </div>
</header><?php }
}
