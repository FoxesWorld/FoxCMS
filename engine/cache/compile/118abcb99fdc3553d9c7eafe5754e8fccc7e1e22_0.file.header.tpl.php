<?php
/* Smarty version 4.0.4, created on 2023-10-02 12:50:08
  from '/var/www/FoxCMS/templates/eng-tech/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_651a9250a60f02_93671252',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '118abcb99fdc3553d9c7eafe5754e8fccc7e1e22' => 
    array (
      0 => '/var/www/FoxCMS/templates/eng-tech/header.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:logo/logo.tpl' => 1,
  ),
),false)) {
function content_651a9250a60f02_93671252 (Smarty_Internal_Template $_smarty_tpl) {
?><header id="header" class="d-flex align-items-center">
   <div class="container d-flex align-items-center justify-content-between">
      <a href="/">
      <?php $_smarty_tpl->_subTemplateRender('file:logo/logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      </a>

   </div>
</header><?php }
}
