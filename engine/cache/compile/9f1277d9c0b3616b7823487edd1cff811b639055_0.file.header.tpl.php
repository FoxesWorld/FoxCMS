<?php
/* Smarty version 4.0.4, created on 2023-04-24 22:18:26
  from '/var/www/foxcms/templates/eng-tech/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6446d602eb1886_33603782',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9f1277d9c0b3616b7823487edd1cff811b639055' => 
    array (
      0 => '/var/www/foxcms/templates/eng-tech/header.tpl',
      1 => 1682363860,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:logo/logo.tpl' => 1,
  ),
),false)) {
function content_6446d602eb1886_33603782 (Smarty_Internal_Template $_smarty_tpl) {
?><header id="header" class="d-flex align-items-center">
   <div class="container d-flex align-items-center justify-content-between">
      <a href="/">
      <?php $_smarty_tpl->_subTemplateRender('file:logo/logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      </a>
      <nav id="navbar" class="navbar ">
         <ul id="links">
            <?php echo $_smarty_tpl->tpl_vars['links']->value;?>

         </ul>
      </nav>
   </div>
</header><?php }
}
