<?php
/* Smarty version 4.0.4, created on 2022-04-12 15:29:53
  from '/Avalon/sites/FoxRadio/www/templates/bootstrap/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_625570c1ee2723_66309469',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c0e3eb39272dcdb586bc8405641543a39ecc8f06' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/bootstrap/footer.tpl',
      1 => 1649766591,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_625570c1ee2723_66309469 (Smarty_Internal_Template $_smarty_tpl) {
?>  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-contact">
            <h3><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h3>
            <p>
              FoxesWorld 2022<br>
              Avalon Inc
            </p>
          </div>

          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>We will notify you about the development process!</p>
            <form id="newsletter" action="" method="post">
            <div class="input_block">
				<input id="mail" class="input" type="email" autocomplete="off" required />
				<label class="label">E-mail</label>
			</div>
			  <input type="submit" value="Subscribe" />
			  <input id="userAction" class="input" type="hidden" value="subscribe">
            </form>
          </div>

        </div>
      </div>
    </div>
  </footer><?php }
}
