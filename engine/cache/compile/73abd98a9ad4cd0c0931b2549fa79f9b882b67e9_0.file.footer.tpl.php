<?php
/* Smarty version 4.0.4, created on 2023-04-29 09:02:06
  from '/var/www/foxcms/templates/foxengine/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_644cb2dea1f326_01498220',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '73abd98a9ad4cd0c0931b2549fa79f9b882b67e9' => 
    array (
      0 => '/var/www/foxcms/templates/foxengine/footer.tpl',
      1 => 1682748009,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_644cb2dea1f326_01498220 (Smarty_Internal_Template $_smarty_tpl) {
?><footer class="bar">
   <div class="container footer--flex">
      <div class="footer-copyright">
         <?php echo $_smarty_tpl->tpl_vars['title']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['status']->value;?>
 <b><?php echo $_smarty_tpl->tpl_vars['year']->value;?>
</b>
		 <span>Powered by <?php echo $_smarty_tpl->tpl_vars['webserviceName']->value;?>
 <img /></span>
      </div>

      <ul class="footer-end">
		<li><i class="fa fa-envelope-o"></i> Почта: <b><?php echo $_smarty_tpl->tpl_vars['contactEmail']->value;?>
</b></li>
		<li><a href="https://webmaster.yandex.ru/siteinfo/?site=foxescraft.ru"><img width="88" height="31" alt="" border="0" src="https://yandex.ru/cycounter?foxescraft.ru&theme=light&lang=ru"/></a></li>
      </ul>
   </div>
</footer><?php }
}
