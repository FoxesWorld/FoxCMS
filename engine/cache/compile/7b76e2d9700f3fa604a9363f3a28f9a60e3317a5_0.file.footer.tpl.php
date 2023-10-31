<?php
/* Smarty version 4.0.4, created on 2023-10-30 19:25:11
  from '/var/www/FoxCMS/templates/jafar-tech/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_653fd8e7876624_90736512',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7b76e2d9700f3fa604a9363f3a28f9a60e3317a5' => 
    array (
      0 => '/var/www/FoxCMS/templates/jafar-tech/footer.tpl',
      1 => 1698683010,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:callback.tpl' => 1,
  ),
),false)) {
function content_653fd8e7876624_90736512 (Smarty_Internal_Template $_smarty_tpl) {
?><footer class="bar">
<?php $_smarty_tpl->_subTemplateRender("file:callback.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
   <div class="container footer--flex">
      <div class="footer-copyright">
         <?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['siteStatus']->value;?>
 <b><?php echo $_smarty_tpl->tpl_vars['year']->value;?>
</b>
		 <span>Powered by <?php echo $_smarty_tpl->tpl_vars['webserviceName']->value;?>
 v.<?php echo $_smarty_tpl->tpl_vars['ServiceVersion']->value;?>
<img /></span>
      </div>

      <ul class="footer-end">
		<li><i class="fa fa-envelope-o"></i> Почта: <b><?php echo $_smarty_tpl->tpl_vars['contactEmail']->value;?>
</b></li>
		<li class="d-none d-md-flex"><a href="https://webmaster.yandex.ru/siteinfo/?site=foxescraft.ru"><img width="88" height="31" alt="" border="0" src="https://yandex.ru/cycounter?foxescraft.ru&theme=light&lang=ru"/></a></li>
      </ul>
   </div>
</footer><?php }
}
