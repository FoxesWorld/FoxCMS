<?php
/* Smarty version 4.0.4, created on 2024-01-06 13:15:09
  from '/var/www/FoxCMS/templates/foxengineModule/logo/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6599282ddef0e2_15534597',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8a61f178159c0179ae609aebd31b9512e2600799' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengineModule/logo/logo.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6599282ddef0e2_15534597 (Smarty_Internal_Template $_smarty_tpl) {
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
								<h1 class="title"><?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
</h1>
							</div>
						</li>
						
						<li><small class="status"><?php echo $_smarty_tpl->tpl_vars['siteStatus']->value;?>
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
