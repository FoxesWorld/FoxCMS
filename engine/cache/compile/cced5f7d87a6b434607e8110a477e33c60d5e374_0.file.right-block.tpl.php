<?php
/* Smarty version 4.0.4, created on 2022-10-02 10:11:31
  from '/var/www/html/templates/bootstrap/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_633939a3c50ab0_79312969',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cced5f7d87a6b434607e8110a477e33c60d5e374' => 
    array (
      0 => '/var/www/html/templates/bootstrap/right-block.tpl',
      1 => 1664650865,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_633939a3c50ab0_79312969 (Smarty_Internal_Template $_smarty_tpl) {
?>				  <div class="row rightBlock">
							<div class="card">
								<div id="userBlock">	
									<div class="userProfile animate__animated animate__backInRight animate__delay-1s">
										<ul>
											<li class="profilePhoto">
												<img src="<?php echo $_smarty_tpl->tpl_vars['profilePhoto']->value;?>
">
											</li>

											<div class="userdata">
												<li><b><i class="fa fa-user-circle-o" aria-hidden="true"></i>Логин</b>: <?php echo $_smarty_tpl->tpl_vars['login']->value;?>
</li>
												<li><b><i class="fa fa-address-card-o" aria-hidden="true"></i>Почта</b>: <?php echo $_smarty_tpl->tpl_vars['email']->value;?>
</li>
												<li><b><i class="fa fa-users" aria-hidden="true"></i>Группа</b>: <?php echo $_smarty_tpl->tpl_vars['group_name']->value;?>
</li>
												<li><b><i class="fa fa-diamond" aria-hidden="true"></i>Полное имя</b>: <?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</li>
											</div>
										</ul>
										
										<span class="short"></span>
										
										<ul class="userActions">
											<li>
											
											<div class="right-profile-menu">
														<form method="POST" action="/" id="sessionActions">
														<ul id="usrMenu">

														</ul>
														<input id="userAction" class="input" type="hidden" value="logout">
														</form>
											</div>
												<?php if (!$_smarty_tpl->tpl_vars['isLogged']->value) {?>
														<a href="#login">
															<button type="submit" class="login">Авторизация <i class="fa fa-sign-in"></i>
														</button>
														</a>
												 <?php }?>	
											</li>
										</ul>
									</div>
								
								
								</div>
							</div>

							<div class="card">		
								<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
								  <div class="card-header">Help</div>
									  <div class="card-body">
											<h5 class="card-title">Get help by here</h5>
											<p class="card-text">Some quick example text</p>
									  </div>
								</div>
							</div>

							<div class="card">				
								<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
								  <div class="card-header">Tests</div>
									  <div class="card-body">
											<h5 class="card-title">Awesome widget</h5>
											<p class="card-text">Some quick example text</p>
									  </div>
								</div>
							</div>

					</div><?php }
}
