<style>
.side-nav {
    position: fixed;
    right: -340px;
    top: 112px;
    width: 340px;
    height: 100%;
    background-color: #908489;
    overflow-x: hidden;
    transition: 0.3s;
    z-index: 9999;
}

.side-nav.open {
    right: 0;
}

.side-nav .closebtn {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 36px;
    margin-left: 50px;
    color: #f1f1f1;
}

.side-nav .menu-content {
    padding: 20px;
    color: #f1f1f1;
}

.side-nav .menu-content .dropdown-divider {
    border-top: 1px solid #575757;
    margin: 10px 0;
}

.side-nav .menu-content .dropdown-item {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-tap-highlight-color: transparent;
    font-size: 14px;
    border: 0px;
    background-color: transparent;
    outline: 0px;
    width: 100%;
    text-align: left;
    text-decoration: none;
    box-sizing: border-box;
    padding: 10px 12px;
    cursor: pointer;
    border-radius: 4px;
    color: rgb(34, 34, 34);
    -webkit-box-align: center;
    align-items: center;
    display: flex;
}

.side-nav .menu-content .dropdown-item:hover {
    <!-- background-color: #575757; -->
}

.side-nav .menu-content .avatar {
    overflow: hidden;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.31);
    margin-right: 10px;
}

.side-nav .menu-content .avatar img {
    object-fit: cover;
    width: 42px;
    height: 42px;
}

.side-nav .menu-content .user-info {
    display: flex;
    flex-direction: column;
}

.side-nav .menu-content .user-info .fw-medium {
    font-weight: 500;
}

.side-nav .menu-content .user-info .text-muted {
    color: #a1a1a1;
}

.side-nav .menu-content .filled-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #ada5a9;
    border-radius: 10px;
}

.side-nav .menu-content .filled-box img {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
}

.side-nav .menu-content .filled-box .fs-5 {
    font-size: 1.25rem;
}

.user-button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
	font-family: 'FSElliotPro-Heavy';
}

.user-button .avatar {
    overflow: hidden;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.31);
    margin-right: 10px;
}

.user-button .avatar img {
    object-fit: cover;
    width: 42px;
    height: 42px;
}

.user-button .user-info {
    display: flex;
    align-items: center;
}

.user-button .user-info .icon {
    margin-right: 10px;
}

.user-button .user-info .user-score {
    font-weight: bold;
    color: #fff;
}

.user-button .chevron {
    margin-left: 10px;
    transition: transform 0.3s;
	font-family: 'Minecraft Bold';
	color: #ac6343;
}

.user-button .chevron.open {
    transform: rotate(180deg);
}

.balance {
    margin: 0 0 15px;
}

</style>			

<!-- Боковая навигация -->
<div id="mySidenav" class="side-nav">
   <!--  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> -->
    <div class="menu-content">
        <ul style="width: 100%">
            <span class="arrow"></span>
            <li>
                <!-- <span class="dropdown-item"> -->
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <div class="d-flex">
                                <div class="flex-shrink-0">
                                    <div class="avatar">
                                        <img class="h-auto rounded-circle profilePic uk-animation-fade" src="{$profilePhoto}" alt="Profile Photo" uk-img />
                                    </div>
                                </div>
                                <ul class="me-3">
                                    <li class="fw-medium d-block">{$login}</li>
                                    <li class="text-muted">{$groupName}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
               <!-- </span> -->
            </li>
            <script>
                async function addFunds(){
                    const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl', true);
                    let data = await foxEngine.entryReplacer.replaceText(template, "");
                    foxEngine.modalApp.showModalApp(900, "Пополнение счета:", data, () => {
                        console.log('Модальное окно закрыто');
                    });
                }
            </script>
            <ul id="usrMenu">
                <li class="balance">
                    <hr class="dropdown-divider" />
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <div class="filled-box p-1 text-center lh-sm">
                            <img src="{$tplDir}/assets/icons/units.png" alt="Units Icon" uk-img />
                            <b class="fs-5" id="units" data-element="moneyDisplay">0</b><br />
                            <span class="text-muted">Юниты</span>
                        </div>
                        <div class="filled-box p-1 text-center lh-sm">
                            <img src="{$tplDir}/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
                            <b class="fs-5" id="crystals" data-element="bonusDisplay">0</b><br />
                            <span class="text-muted">Кристалы</span>
                        </div>
                    </div>
                </li>
                {if $user_group != 5}
                <li class="dropdown-item">
                    <a class="pageLink-addFunds" onclick="addFunds(); return false;">
                        <div class="rightIcon">
                            <i style="color: #d8e815" class="fa-thin fa-wallet"></i>
                        </div>
                        Пополнить счёт
                    </a>
                </li>
                {/if}
                <!-- User options go here -->
            </ul>
            <li class="dropdown-item">
                <a href="#" class="pageLink-logout" onclick="foxEngine.user.logout($(this)); return false;">
                    <i style="color: red" class="fa fa-sign-out me-2"></i> Выйти
                </a>
            </li>
        </ul>
    </div>
</div>

<!-- Кнопка для открытия боковой навигации -->
<button class="user-button" onclick="toggleNav()">
    <div class="avatar">
        <img src="{$profilePhoto}" alt="User's Avatar" />
    </div>
    <div class="user-info">
        {$login}
        <span class="chevron"><i class="fa-solid fa-caret-down"></i></span>
    </div>
</button>

<script>
function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    var chevron = document.querySelector(".user-button .chevron");

    if (sidenav.classList.contains("open")) {
        sidenav.classList.remove("open");
        chevron.classList.remove("open");
    } else {
        sidenav.classList.add("open");
        chevron.classList.add("open");
        // Обновляем данные при открытии
        foxEngine.user.refreshBalance(['units', 'crystals']);
    }
}

// Закрытие навигации при клике вне меню
document.addEventListener('click', function(event) {
    var sidenav = document.getElementById("mySidenav");
    var chevron = document.querySelector(".user-button .chevron");
    var isClickInside = sidenav.contains(event.target);
    var isToggleClick = document.querySelector('.user-button').contains(event.target);

    if (!isClickInside && !isToggleClick) {
        sidenav.classList.remove("open");
        chevron.classList.remove("open");
    }
});

</script>