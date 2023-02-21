<?php
/* Smarty version 4.0.4, created on 2023-02-21 13:24:08
  from '/var/www/foxcms/templates/foxengine/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_63f49bc8d04b36_95050686',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7d23cafcd3e57d5c5faec020779171864f3bc18c' => 
    array (
      0 => '/var/www/foxcms/templates/foxengine/right-block.tpl',
      1 => 1676968944,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_63f49bc8d04b36_95050686 (Smarty_Internal_Template $_smarty_tpl) {
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
							<!-- 
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
								  <div class="card-header">Help2</div>
									  <div class="card-body">
											<h5 class="card-title">Get help by here</h5>
											<p class="card-text">Some quick example text</p>
									  </div>
								</div>
							</div>
							-->
					</div><?php }
}
