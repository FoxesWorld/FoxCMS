<?php
/* Smarty version 4.0.4, created on 2023-02-20 13:50:22
  from '/var/www/foxcms/templates/bootstrap/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_63f3506e30b893_86787607',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ab360e01d0f7c8af097e24129171487c8eb69b83' => 
    array (
      0 => '/var/www/foxcms/templates/bootstrap/footer.tpl',
      1 => 1664928560,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_63f3506e30b893_86787607 (Smarty_Internal_Template $_smarty_tpl) {
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
