<?php
/* Smarty version 4.0.4, created on 2023-03-14 08:54:50
  from '/var/www/foxcms/templates/foxengine/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_64100c2a9e1538_68555172',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '73abd98a9ad4cd0c0931b2549fa79f9b882b67e9' => 
    array (
      0 => '/var/www/foxcms/templates/foxengine/footer.tpl',
      1 => 1677136611,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_64100c2a9e1538_68555172 (Smarty_Internal_Template $_smarty_tpl) {
?><footer class="bar">
   <div class="container footer--flex">
      <div class="footer-copyright">
         <?php echo $_smarty_tpl->tpl_vars['title']->value;?>
 <?php echo $_smarty_tpl->tpl_vars['status']->value;?>
 <b><?php echo $_smarty_tpl->tpl_vars['year']->value;?>
</b>
      </div>
      <!--
         <form id="newsletter" action="" method="post">
                 <div class="input_block">
         <input id="mail" class="input" type="email" autocomplete="off" required />
         <label class="label">E-mail</label>
         </div>
          <input type="submit" value="Subscribe" />
          <input id="userAction" class="input" type="hidden" value="subscribe">
                 </form> -->
      <ul class="footer-end">
      </ul>
   </div>
</footer><?php }
}
