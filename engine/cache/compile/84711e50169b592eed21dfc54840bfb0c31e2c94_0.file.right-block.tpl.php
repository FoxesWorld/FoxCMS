<?php
/* Smarty version 4.0.4, created on 2024-01-06 13:15:09
  from '/var/www/FoxCMS/templates/foxengineModule/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6599282ddfb2e0_36212950',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '84711e50169b592eed21dfc54840bfb0c31e2c94' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengineModule/right-block.tpl',
      1 => 1704487647,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6599282ddfb2e0_36212950 (Smarty_Internal_Template $_smarty_tpl) {
if (!$_smarty_tpl->tpl_vars['isMobile']->value) {?>
<div class="col-4 d-none d-md-block">
<div class="row rightBlock">
<div class="card">
    <div id="userBlock">
        <div class="userProfile">
            <div class="profilePhoto">
                <img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo">
            </div>
            <div class="list-group userActions">
                <div class="list-group-item">
                    <table>
                        <tr>
                            <td class="align-middle text-center">
                                <b><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</b>
                            </td>
                            <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
                            <td class="align-middle logout text-center">
                                <form method="POST" id="logout" action="/">
                                    <button type="submit" class="logout btn btn-danger">
										<i class="fa fa-sign-out"></i>
									</button>
                                    <input name="userAction" class="input" type="hidden" value="logout" />
                                </form>
                            </td>
                            <?php }?>
                        </tr>
                    </table>
                </div>
                <li class="list-group-item"><b><i class="fa fa-address-card-o"></i> Почта</b>: <?php echo $_smarty_tpl->tpl_vars['email']->value;?>
</li>
                <li class="list-group-item"><b><i class="fa fa-users"></i> Группа</b>: <?php echo $_smarty_tpl->tpl_vars['groupName']->value;?>
</li>
                <li class="list-group-item"><b><i class="fa fa-diamond"></i> Полное имя</b>: <?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</li>
                <?php if ($_smarty_tpl->tpl_vars['user_group']->value != 5) {?>
                <li class="list-group-item" title="Валюта проекта" data-toggle="tooltip">
				<b>
					<i class="fa fa-krw"></i> Юниты
				</b>: <?php echo $_smarty_tpl->tpl_vars['units']->value;?>
</li>
                <?php }?>
            </div>
            <?php if ($_smarty_tpl->tpl_vars['user_group']->value == 5) {?>
            <div class="userActions text-center mt-3">
                <a href="#" onclick="foxEngine.loadPage('auth', replaceData.contentBlock); return false;">
                    <button type="submit" class="login"><i class="fa fa-sign-in"></i> Авторизация</button>
                </a>
            </div>
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
   
     <div class="card">		
      	<div class="card text-white  mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Servers</div>
			<div id="servers">
			</div>
      	</div>
      </div>
   
      <div class="card">		
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
