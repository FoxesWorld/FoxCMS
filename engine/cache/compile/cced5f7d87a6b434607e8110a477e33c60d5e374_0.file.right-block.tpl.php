<?php
/* Smarty version 4.0.4, created on 2022-09-29 16:30:00
  from '/var/www/html/templates/bootstrap/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_63359dd8bd6bd8_57707327',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cced5f7d87a6b434607e8110a477e33c60d5e374' => 
    array (
      0 => '/var/www/html/templates/bootstrap/right-block.tpl',
      1 => 1664455780,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:user/userMenu.tpl' => 1,
  ),
),false)) {
function content_63359dd8bd6bd8_57707327 (Smarty_Internal_Template $_smarty_tpl) {
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
											
											<?php $_smarty_tpl->_subTemplateRender("file:user/userMenu.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
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
