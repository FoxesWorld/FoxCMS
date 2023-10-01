<?php
/* Smarty version 4.0.4, created on 2023-09-28 08:29:39
  from '/var/www/FoxCMS/templates/foxengine/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65150f4309c0c7_62676682',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '0f329946f4576396f0640bf29ba876d7aae37625' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine/right-block.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_65150f4309c0c7_62676682 (Smarty_Internal_Template $_smarty_tpl) {
if (!$_smarty_tpl->tpl_vars['isMobile']->value) {?>
<div class="col-4">
<div class="row rightBlock">
   <div class="card">
      <div id="userBlock">
         <div class="userProfile">
            <ul>
               <li class="profilePhoto">
                  <img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
">
               </li>
               <div class="userdata">
                  <li>
				  <div class="loginBox">
				  <table>
				  <tr>
					<td>
						<b><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</b>
					</td>
					<?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
					<td class="logout">
						<form method="POST" id="logout" action="/">
							<button type="submit" class="logout"><i class="fa fa-sign-out"></i> </button>
							<input name="userAction" class="input" type="hidden" value="logout" />
						</form>
					</td>
					<?php }?>
					</tr>
				  </table>
					
				  </div>
				  </li>
                  <li><b><i class="fa fa-address-card-o"></i>Почта</b>: <?php echo $_smarty_tpl->tpl_vars['email']->value;?>
</li>
                  <li><b><i class="fa fa-users"></i>Группа</b>: <?php echo $_smarty_tpl->tpl_vars['groupName']->value;?>
</li>
                  <li><b><i class="fa fa-diamond"></i>Полное имя</b>: <?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</li>
				  <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?><li title="Валюта проекта" data-toggle="tooltip"><b><i class="fa fa-krw"></i>Юниты</b>: 0</li><?php }?>
               </div>
            </ul>
			<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
            <ul class="userActions">
               <li>                  
                  <a href="#" onclick="FoxEngine.loadPage('auth', replaceData.contentBlock); return false;">
					  <button type="submit" class="login">
						Авторизация <i class="fa fa-sign-in"></i>
					  </button>
                  </a>
				  				  
               </li>
            </ul>
			<?php }?>
         </div>
      </div>
   </div>
   
    <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
      <div class="card">				
			<div class="card text-white  mb-3" style="max-width: 18rem;">
			  <div class="card-header">Меню пользователя</div>
				  <div class="card-body">
					  <div class="right-profile-menu">
						<ul id="usrMenu">
						</ul>
					  </div>
				  </div>
			</div>
      </div>
	  <?php }?>
   
      <div class="card d-none d-sm-block">		
      	<div class="card text-white  mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Последняя регистрация</div>
			<div id="lastUser">
			
			</div>
      	</div>
      </div>
</div>
</div>
<?php }
}
}
