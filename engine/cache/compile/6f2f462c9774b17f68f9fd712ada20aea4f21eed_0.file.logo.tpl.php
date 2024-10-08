<?php
/* Smarty version 4.0.4, created on 2024-10-08 16:53:44
  from '/var/www/FoxCMS/templates/foxengine2/logo.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_67053968836f31_26187291',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6f2f462c9774b17f68f9fd712ada20aea4f21eed' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/logo.tpl',
      1 => 1721235155,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67053968836f31_26187291 (Smarty_Internal_Template $_smarty_tpl) {
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
