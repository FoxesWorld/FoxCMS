<?php
/* Smarty version 4.0.4, created on 2024-01-10 14:28:47
  from '/var/www/FoxCMS/templates/foxengine2/profileBlock.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_659e7f6fe1fee1_07377671',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '71605d9f09b37823a76bdc97470a6719a256fab3' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/profileBlock.tpl',
      1 => 1704882947,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_659e7f6fe1fee1_07377671 (Smarty_Internal_Template $_smarty_tpl) {
?>        <div class="userProfile">
<ul class="profileTop">
    <li class="profilePhoto">
        <img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo">
    </li>
    
    <li class="user_panel_nickname">
        <span class="hello_player">Привет,</span>
        <a id="sidepanel_nickname" onclick="foxEngine.user.showProfilePopup('<?php echo $_smarty_tpl->tpl_vars['login']->value;?>
')" class="shortened"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</a>
    </li>
    
    <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
    <li class="logout">
        <form method="POST" id="logout" action="/">
            <button type="submit" class="logout btn btn-danger">
                <i class="fa fa-sign-out"></i>
            </button>
            <input name="userAction" class="input" type="hidden" value="logout" />
        </form>
    </li>
    <?php }?>
</ul>

<?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
<div id="user_panel_balance">
        <div class="user_panel_balance_current">
            <span id="realmoney-info-login"><?php echo $_smarty_tpl->tpl_vars['units']->value;?>
</span>
        </div>
        <div class="user_panel_balance_type">
            <span id="user_panel_balance_type">ЮНИТОВ</span>
        </div>
        <button class="login" onclick="addFunds(); return false;">ПОПОЛНИТЬ</button>
    </div>
				
	<div class="right-profile-menu">
		<ul id="usrMenu">
		</ul>
  </div>
  <?php echo '<script'; ?>
>
	async function addFunds(){
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl');
		let data = foxEngine.replaceText(template, "");
		foxEngine.modalApp.showModalApp(900, data);
		//
	}
  <?php echo '</script'; ?>
>
  <?php }?>

 <?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
    <div class="userActions text-center mt-3">
        <a href="#" onclick="foxEngine.page.loadPage('auth', replaceData.contentBlock); return false;">
           <button type="submit" class="login"><i class="fa fa-sign-in"></i> Авторизация</button>
        </a>
    </div>
  <?php }?>
 </div><?php }
}
