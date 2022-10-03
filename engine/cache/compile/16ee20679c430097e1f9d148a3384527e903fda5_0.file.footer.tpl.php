<?php
/* Smarty version 4.0.4, created on 2022-10-03 19:09:20
  from '/var/www/foxeswor/data/www/foxesworld.ru/templates/bootstrap/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_633b0930adebc1_63551133',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '16ee20679c430097e1f9d148a3384527e903fda5' => 
    array (
      0 => '/var/www/foxeswor/data/www/foxesworld.ru/templates/bootstrap/footer.tpl',
      1 => 1664733004,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_633b0930adebc1_63551133 (Smarty_Internal_Template $_smarty_tpl) {
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
