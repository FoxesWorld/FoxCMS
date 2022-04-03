<?php
/* Smarty version 4.0.4, created on 2022-04-03 17:21:51
  from '/Avalon/sites/FoxRadio/www/templates/default/radioPlayer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6249ad7f7cd025_89635887',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'a30cc234855d499d7340572166b9afd922a0db42' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/radioPlayer.tpl',
      1 => 1648995679,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6249ad7f7cd025_89635887 (Smarty_Internal_Template $_smarty_tpl) {
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
