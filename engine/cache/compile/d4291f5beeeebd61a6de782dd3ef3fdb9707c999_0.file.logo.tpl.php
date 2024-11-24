<?php
/* Smarty version 4.0.4, created on 2024-11-19 13:16:08
  from '/var/www/FoxCMS/templates/fillRu/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_673c65688ff705_90090628',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd4291f5beeeebd61a6de782dd3ef3fdb9707c999' => 
    array (
      0 => '/var/www/FoxCMS/templates/fillRu/logo.tpl',
      1 => 1730879024,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_673c65688ff705_90090628 (Smarty_Internal_Template $_smarty_tpl) {
?>            <div class="logo-block">
                <a href="/" class="navbar-brand">
                    <div class="logoWrapper">
                        <div class="logo uk-animation-slide-left">
                            <ul class="list-inline">
                                <li>
                                    <img class="img-fluid" uk-img />
                                </li>

                                <li>
                                    <div class="titleWrapper uk-animation-fade">
                                        <h1 class="title"><?php echo $_smarty_tpl->tpl_vars['siteTitle']->value;?>
</h1>
                                    </div>
                                </li>

                                <li><small class="status uk-animation-fade"><?php echo $_smarty_tpl->tpl_vars['siteStatus']->value;?>
</small></li>
                            </ul>
                            <span class="line uk-animation-expand"></span>
                        </div>
                    </div>
                </a>
            </div><?php }
}
