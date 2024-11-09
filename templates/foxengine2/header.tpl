<header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg bar">
<div class="container-fluid d-flex align-items-center justify-content-between" style="padding: 5px;">
        <!-- Logo -->
        {include file='logo.tpl'}

        <!-- Nav -->
        <div class="navbar-center">
            <input type="checkbox" id="navbarToggle" hidden>
            <div class="navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav pages me-auto mb-2 mb-lg-0 dropup" style="margin: 0 auto;">
                    {if $user_group == 5}
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
                    {/if}

                    {if $user_group == 1}
                    {/if}
                </ul>
            </div>
        </div>

        <!-- Userfields -->
        <div class="navbar-right">
            <ul class="userBlock">
                <!-- LOGGED USER -->
                {if $user_group != 5}
                {include file='userBlock.tpl'}
                {else}
                <!-- Custom burger menu button for mobile version -->
                <button class="navbar-toggler" for="navbarToggle">
                    <span class="mantine-cahhlp">
                        <span class="navbar-toggler-icon"></span>
                    </span>
                </button>
				
				<script>
					document.addEventListener("DOMContentLoaded", () => {
						const customNavbar = new CustomNavbar({
							togglerSelector: ".navbar-toggler",
							collapseSelector: "#navbarSupportedContent",
							burgerButtonSelector: ".mantine-cahhlp",
							toggleAnimationDelay: 100,
							closeAnimationDelay: 400,
							  onOpen: () => {
								console.log('NavBar opened!');
							}
						});
					});
					</script>
                {/if}
            </ul>
        </div>
    </div>
</header>