<?php
/* Smarty version 4.0.4, created on 2023-04-25 07:43:58
  from '/var/www/foxcms/templates/foxengine/logo/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_64475a8ecfa494_70671052',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1eac8bee735fb77a4e523003b8214b5849ded554' => 
    array (
      0 => '/var/www/foxcms/templates/foxengine/logo/logo.tpl',
      1 => 1676890154,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_64475a8ecfa494_70671052 (Smarty_Internal_Template $_smarty_tpl) {
?>		  <link type="text/css" rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/logo/logo.css">
  
		<div class="logoWrapper">
		  <div class="logo">
					<ul class="list-inline">
						<li>
							<img alt="logo" class="img-fluid" />
						</li>
						
						<li>
							<div class="titleWrapper">
								<h1 class="title"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
							</div>
						</li>
						
						<li><small class="status"><?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</small></li>
					</ul>
				<span class="line"></span>
		  </div>
		</div>
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/logo/animation.js"><?php echo '</script'; ?>
><?php }
}
