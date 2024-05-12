<?php
/* Smarty version 4.0.4, created on 2024-05-13 00:46:34
  from '/var/www/FoxCMS/templates/foxengine2/userBlock.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_664138ba454012_20678256',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ac09135447c54bb47aa7016157f4b1ad8af62813' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/userBlock.tpl',
      1 => 1715538974,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_664138ba454012_20678256 (Smarty_Internal_Template $_smarty_tpl) {
?>				   <li class="nav-item dropdown">
					  <a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center userBlock" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="foxEngine.user.refreshBalance(['units', 'crystals'])">
						 <div class="avatar">
							<img class="profilePic uk-animation-fade" src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo" /> <?php echo $_smarty_tpl->tpl_vars['login']->value;?>

						 </div>

					  </a>
					  <ul class="dropdown-menu fade dropdown-menu-popover p-2 dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink"  data-popper-placement="bottom" style="width: 340px">
						<span class="arrow"></span>
						 <li>
							<span class="dropdown-item">
							   <div class="d-flex align-items-center">
								  <div class="flex-grow-1">
									 <div class="d-flex">
										<div class="flex-shrink-0">
										   <div class="avatar">
											  <img class="h-auto rounded-circle profilePic uk-animation-fade" style="width: 42px;" src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
" alt="Profile Photo" uk-img />
										   </div>
										</div>
										<ul class="me-3">
										   <li class="fw-medium d-block"><?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</li>
										   <li class="text-muted"><?php echo $_smarty_tpl->tpl_vars['groupName']->value;?>
</li>
										</ul>
									 </div>
								  </div>
							   </div>
							</span>
						 </li>
						 <?php echo '<script'; ?>
>
							async function addFunds(){
								const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl', true);
								let data = foxEngine.entryReplacer.replaceText(template, "");
								foxEngine.modalApp.showModalApp(900, data);
								//
							}
						 <?php echo '</script'; ?>
>
						 <ul id="usrMenu">
							<li>
							   <hr class="dropdown-divider" />
							   
							   <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
					<div class="filled-box p-1 text-center lh-sm">
						<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/units.png" alt="Units Icon" uk-img />
						<b class="fs-5" id="units" data-element="moneyDisplay">0</b><br />
						<span class="text-muted">Юниты</span>
					</div>
					<div class="filled-box p-1 text-center lh-sm">
						<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
						<b class="fs-5" id="crystals" data-element="bonusDisplay">0</b><br />
						<span class="text-muted">Кристалы</span>
					</div>
				</div>
							</li>
							<?php if ($_smarty_tpl->tpl_vars['user_group']->value == 4) {?>
							<li class="dropdown-item">
							   <a class="pageLink-addFunds" onclick="addFunds(); return false; ">
								  <div class="rightIcon">
									 <i style="color: #d8e815" class="fa fa-money"></i>
								  </div>
								  Пополнить счёт
							   </a>
							</li>
							<?php }?>
							<!-- User options go here -->
						 </ul>
						 <li class="dropdown-item">
							<a href="#" class="pageLink-logout" onclick="foxEngine.user.logout($(this)); return false;"> <i style="color: red" class="fa fa-sign-out me-2"></i> Выйти </a>
						 </li>
					  </ul>
				   </li><?php }
}
