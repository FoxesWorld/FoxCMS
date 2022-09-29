<?php
/* Smarty version 4.0.4, created on 2022-09-29 16:30:00
  from '/var/www/html/templates/bootstrap/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_63359dd8be0468_65933189',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '02773e628c93ad0e80828a666a6f981a0e62c3c2' => 
    array (
      0 => '/var/www/html/templates/bootstrap/footer.tpl',
      1 => 1664435521,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_63359dd8be0468_65933189 (Smarty_Internal_Template $_smarty_tpl) {
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
