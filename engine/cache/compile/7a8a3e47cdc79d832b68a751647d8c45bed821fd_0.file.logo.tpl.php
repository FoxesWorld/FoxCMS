<?php
/* Smarty version 4.0.4, created on 2024-01-02 19:33:22
  from '/var/www/FoxCMS/templates/foxengine/logo/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65943ad215d693_88214814',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7a8a3e47cdc79d832b68a751647d8c45bed821fd' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine/logo/logo.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_65943ad215d693_88214814 (Smarty_Internal_Template $_smarty_tpl) {
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
