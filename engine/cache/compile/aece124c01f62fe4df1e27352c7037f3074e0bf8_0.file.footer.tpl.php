<?php
/* Smarty version 4.0.4, created on 2023-04-24 22:16:59
  from '/var/www/foxcms/templates/eng-tech/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6446d5ab0f29f9_57385412',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'aece124c01f62fe4df1e27352c7037f3074e0bf8' => 
    array (
      0 => '/var/www/foxcms/templates/eng-tech/footer.tpl',
      1 => 1682357484,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6446d5ab0f29f9_57385412 (Smarty_Internal_Template $_smarty_tpl) {
?><footer class="bar">
   <div class="container footer--flex">
      <div class="footer-copyright">
         <?php echo $_smarty_tpl->tpl_vars['title']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['status']->value;?>
 <b>1990 - <?php echo $_smarty_tpl->tpl_vars['year']->value;?>
</b>
		 <span>Powered by <?php echo $_smarty_tpl->tpl_vars['webserviceName']->value;?>
 <img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/img/foxengine.png" /></span>
      </div>

      <ul class="footer-end">
		<li><i class="fa fa-envelope-o"></i> Почта: <b>sp.eng-tech@bk.ru</b></li>
		<li><i class="fa fa-phone"></i> Телефон: <b>8 985 760 82 30</b></li>
      </ul>
   </div>
</footer><?php }
}
