<?php
/* Smarty version 4.0.4, created on 2022-04-03 10:39:59
  from '/Avalon/sites/FoxRadio/www/templates/default/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_62494f4f048da9_87003659',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6a4c10ae53f47326fb4c756a9d8258011559274b' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/main.tpl',
      1 => 1648971592,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:logo.tpl' => 1,
    'file:nav.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_62494f4f048da9_87003659 (Smarty_Internal_Template $_smarty_tpl) {
?><html>

	<?php $_smarty_tpl->_subTemplateRender('file:header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

	<body id="content">
		<?php echo $_smarty_tpl->tpl_vars['builtInJS']->value;?>

		<div class="animated BounceInRight delay-1s menu-top">
			<?php $_smarty_tpl->_subTemplateRender('file:logo.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
			<?php $_smarty_tpl->_subTemplateRender('file:nav.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
		</div>

		<main ID="mainCont" class="animated BounceInUp delay-3s">
			<?php echo $_smarty_tpl->tpl_vars['profile']->value;?>

			
			<audio id="player" controls="controls" preload="none" style="margin-top: 24px; width: 100%;">
                <source src="https://radio.macros-core.com:8443/live" type="audio/mpeg">
            </audio>

			<?php echo '<script'; ?>
>
					var vid = document.getElementById("player");
					vid.volume = 0.05;
			<?php echo '</script'; ?>
>
		</main>

	</body>
	<?php $_smarty_tpl->_subTemplateRender('file:footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</html><?php }
}
