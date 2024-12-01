<?php
/* Smarty version 4.0.4, created on 2024-12-01 13:03:14
  from '/var/www/FoxCMS/templates/foxengine2/userBlock.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_674c346282fc49_60362845',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ac09135447c54bb47aa7016157f4b1ad8af62813' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/userBlock.tpl',
      1 => 1733043977,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:balanceBox.tpl' => 1,
  ),
),false)) {
function content_674c346282fc49_60362845 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- UserPane -->
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
