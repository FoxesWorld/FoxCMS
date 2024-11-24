<?php
/* Smarty version 4.0.4, created on 2024-11-25 00:13:52
  from '/var/www/FoxCMS/templates/foxengine2/userBlock.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_67439710cbc685_97178214',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ac09135447c54bb47aa7016157f4b1ad8af62813' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/userBlock.tpl',
      1 => 1731152379,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:balanceBox.tpl' => 1,
  ),
),false)) {
function content_67439710cbc685_97178214 (Smarty_Internal_Template $_smarty_tpl) {
?><style>
.side-nav {
    position: fixed;
    top: 112px;
    width: 350px;
	right: -350px;
    height: 100%;
    background-color: #908489;
    overflow-x: hidden;
    transition: 0.3s;
    z-index: 9999;
}

.side-nav.show {
    right: 0;
}

.side-nav .menu-content {
    color: #f1f1f1;
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
}

.side-nav .menu-content .dropdown-item:hover {
    background-color: #575757;
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

/* Стили для кнопки пользователя */
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

.user-button .chevron {
    margin-left: 10px;
    transition: transform 0.3s;
    font-family: 'Minecraft Bold';
    color: #ac6343;
}

.user-button .chevron[data-opened="true"] {
    transform: rotate(180deg);
}

#usrMenu > .pages {
   padding: 0px 10px;
}
</style>
		

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
                                        <img class="h-auto rounded-circle profilePic uk-animation-fade" src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo" uk-img />
                                    </div>
                                </div>
                                <ul class="me-3" style="margin: 10px 0px;">
                                    <li class="fw-medium d-block"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</li>
                                    <li class="text-muted"><?php echo $_smarty_tpl->tpl_vars['groupName']->value;?>
</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </li>
            <?php echo '<script'; ?>
>
                async function addFunds(){
                    const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl', true);
                    let data = await foxEngine.entryReplacer.replaceText(template, "");
                    foxEngine.modalApp.showModalApp(900, "Пополнение счета:", data, () => {
                        console.log('Модальное окно закрыто');
                    });
                }
            <?php echo '</script'; ?>
>
            <ul id="usrMenu">
				<?php $_smarty_tpl->_subTemplateRender('file:balanceBox.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
			<div class="pages d-sm-block d-xs-block d-md-block d-lg-none">
			
			</div>
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
        <img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="User's Avatar" />
    </div>
    <div class="user-info">
        <?php echo $_smarty_tpl->tpl_vars['login']->value;?>

        <span class="chevron"><i class="fa-solid fa-caret-down"></i></span>
    </div>
</button>

<?php echo '<script'; ?>
>
document.addEventListener("DOMContentLoaded", () => {
    const userBar = new CustomNavbar({
        togglerSelector: ".user-button",
        collapseSelector: "#userPane",
        burgerButtonSelector: ".chevron",
        navItemSelector: "#usrMenu > li",
        toggleAnimationDelay: 100,
        closeAnimationDelay: 400,
		  onOpen: () => {
            foxEngine.user.refreshBalance(['units', 'crystals']);
        }
    });
}); 
<?php echo '</script'; ?>
><?php }
}
