<?php
/* Smarty version 4.0.4, created on 2024-01-10 13:39:33
  from '/var/www/FoxCMS/templates/foxengine2/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_659e73e5b0c5c5_20207432',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '21164cd38f4b1e20c2b131e7201342b1d7510eaf' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/footer.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_659e73e5b0c5c5_20207432 (Smarty_Internal_Template $_smarty_tpl) {
?><footer class="bar">
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
		<!--<li><i class="fa fa-envelope-o"></i> Почта: <b><?php echo $_smarty_tpl->tpl_vars['contactEmail']->value;?>
</b></li> -->
		<li class="d-none d-md-flex"><a href="https://webmaster.yandex.ru/siteinfo/?site=foxescraft.ru"><img width="88" height="31" alt="" border="0" src="https://yandex.ru/cycounter?foxescraft.ru&theme=light&lang=ru"/></a></li>
      </ul>
   </div>
</footer><?php }
}
