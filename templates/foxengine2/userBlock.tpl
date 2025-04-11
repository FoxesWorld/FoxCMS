<!-- UserPane -->
<div id="userPane" class="side-nav">
    <div class="menu-content">
        <ul style="width: 100%">
            <li class="userData">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <div class="d-flex" style="margin: 15">
                                <div class="flex-shrink-0">
                                    <div class="avatar">
                                        <img class="h-auto rounded-circle profilePic uk-animation-fade" src="{$profilePhoto}" alt="Profile Photo" uk-img />
                                    </div>
                                </div>
                                <ul class="me-3" style="margin: 10px 0px;">
                                    <li class="fw-medium d-block">{$login}</li>
                                    <li class="text-muted">{$groupName}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </li>
            <script>
                async function addFunds(){
                    const template = foxEngine.templateCache["payment"];
                    let data = await foxEngine.entryReplacer.replaceText(template, "");
                    foxEngine.modalApp.showModalApp(900, "Пополнение счета:", data, () => {
                        console.log('Модальное окно закрыто');
                    });
                }
            </script>
			{include file='balanceBox.tpl'}
            <ul id="usrMenu">
				
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

<button class="user-button">
    <div class="avatar">
        <img src="{$profilePhoto}" alt="User's Avatar" />
    </div>
    <a class="user-info">
        {$login}
        <span class="chevron"><i class="fa-solid fa-caret-down"></i></span>
    </a>
</button>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const userBar = new CustomNavbar({
        togglerSelector: ".user-button",
        collapseSelector: "#userPane",
        burgerButtonSelector: ".chevron",
        navItemSelector: "#usrMenu",
        toggleAnimationDelay: 100,
        closeAnimationDelay: 400,
		  onOpen: () => {
            foxEngine.user.refreshBalance(['units', 'crystals']);
        }
    });
}); 
</script>