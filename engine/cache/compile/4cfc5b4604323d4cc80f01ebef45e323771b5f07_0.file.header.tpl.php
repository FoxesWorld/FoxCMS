<?php
/* Smarty version 4.0.4, created on 2023-09-28 08:29:39
  from '/var/www/FoxCMS/templates/foxengine/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65150f4308e348_27677752',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4cfc5b4604323d4cc80f01ebef45e323771b5f07' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine/header.tpl',
      1 => 1695850760,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:logo/logo.tpl' => 1,
  ),
),false)) {
function content_65150f4308e348_27677752 (Smarty_Internal_Template $_smarty_tpl) {
?><header id="header" class="d-flex align-items-center">
   <div class="container d-flex align-items-center justify-content-between">
      <a href="/">
      <?php $_smarty_tpl->_subTemplateRender('file:logo/logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      </a>

   </div>
</header><?php }
}
