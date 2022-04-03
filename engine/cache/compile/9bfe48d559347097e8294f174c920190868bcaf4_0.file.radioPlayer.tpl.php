<?php
/* Smarty version 4.0.4, created on 2022-04-03 17:23:53
  from '/Avalon/sites/FoxRadio/www/templates/default/components/radioPlayer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6249adf9923724_96651880',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9bfe48d559347097e8294f174c920190868bcaf4' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/components/radioPlayer.tpl',
      1 => 1648995679,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6249adf9923724_96651880 (Smarty_Internal_Template $_smarty_tpl) {
?>			<audio id="player" controls="controls" preload="none" style="margin-top: 24px; width: 100%;">
                <source src="https://radio.macros-core.com:8443/live" type="audio/mpeg">
            </audio>

			<?php echo '<script'; ?>
>
					var vid = document.getElementById("player");
					vid.volume = 0.05;
			<?php echo '</script'; ?>
><?php }
}
