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
        box-sizing: border-box;
    }

    .navbar-nav > .nav-item > a {
        width: 100%;
    }

    .navbar-toggler {
        width: auto;
        cursor: pointer;
    }

    .navbar-collapse {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
        transform: translateX(100%);
        transition: transform 0.35s ease;
    }

    .navbar-collapse.show {
        transform: translateX(0);
        background: #908489;
    }

    @media (min-width: 992px) {
        .navbar-collapse {
            position: static;
            height: auto;
            width: auto;
            transform: none;
            box-shadow: none;
        }

        .navbar-collapse.show {
            transform: none;
        }
    }

    /* Style for hamburger button */
    .mantine-cahhlp {
        position: relative;
        display: block;
        width: 30px;
        height: 20px;
        cursor: pointer;
    }

    .mantine-cahhlp::before,
    .mantine-cahhlp::after,
    .mantine-cahhlp span {
        position: absolute;
        content: "";
        left: 0;
        width: 100%;
        height: 4px; /* Bar thickness */
        background-color: #fefefe;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .mantine-cahhlp::before {
        top: 0;
    }

    .mantine-cahhlp::after {
        bottom: 0;
    }

    .mantine-cahhlp span {
        top: 50%;
        transform: translateY(-50%);
    }

    /* State when button is active (menu opened) */
    .mantine-cahhlp[data-opened]::before {
        transform: translateY(8px) rotate(45deg);
    }

    .mantine-cahhlp[data-opened]::after {
        transform: translateY(-8px) rotate(-45deg);
    }

    .mantine-cahhlp[data-opened] span {
        opacity: 0;
    }

    /* Default state (when menu is closed) */
    .mantine-cahhlp::before,
    .mantine-cahhlp::after,
    .mantine-cahhlp span {
        transform: none;
        opacity: 1;
    }

    .navbar-toggler-icon {
        display: inline-block;
        vertical-align: middle;
        background-image: var(--bs-navbar-toggler-icon-bg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        margin: -2px 0px;
    }
</style>



<header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg bar">
    <div class="container-fluid d-flex align-items-center justify-content-between" style="padding: 5px;">
        <!-- Logo -->
        {include file='logo.tpl'}

        <!-- Nav -->
        <div class="navbar-center">
            <input type="checkbox" id="navbarToggle" hidden>
            <div class="navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0 dropup">
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
                {/if}
            </ul>
        </div>
    </div>
</header>


<script>
// Instantiate the CustomNavbar class when the document is ready
document.addEventListener("DOMContentLoaded", () => {
    new CustomNavbar();
});

</script>