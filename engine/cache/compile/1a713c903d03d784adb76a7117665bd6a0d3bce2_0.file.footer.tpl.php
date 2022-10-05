<?php
/* Smarty version 4.0.4, created on 2022-10-04 15:51:50
  from '/var/www/foxeswor/data/www/foxesworld.ru/templates/bootstrapENG/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_633c2c66894332_41414944',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1a713c903d03d784adb76a7117665bd6a0d3bce2' => 
    array (
      0 => '/var/www/foxeswor/data/www/foxesworld.ru/templates/bootstrapENG/footer.tpl',
      1 => 1664733004,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_633c2c66894332_41414944 (Smarty_Internal_Template $_smarty_tpl) {
?>  		<footer class="bar">
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
