<?php
/* Smarty version 4.0.4, created on 2024-01-06 13:15:09
  from '/var/www/FoxCMS/templates/foxengineModule/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6599282ddffbc7_08773763',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '790b930636ac0db646f758cb482f096cc6fcbb1c' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengineModule/footer.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6599282ddffbc7_08773763 (Smarty_Internal_Template $_smarty_tpl) {
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
