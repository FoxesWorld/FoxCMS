<?php
/* Smarty version 4.0.4, created on 2022-09-30 12:25:08
  from '/var/www/html/templates/bootstrap/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6336b5f478ddc9_39650876',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '530674da955089480b15e1a2747d9ab7b8262736' => 
    array (
      0 => '/var/www/html/templates/bootstrap/header.tpl',
      1 => 1664298511,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6336b5f478ddc9_39650876 (Smarty_Internal_Template $_smarty_tpl) {
?>  <header id="header" class="d-flex align-items-center">
		<div class="container d-flex align-items-center justify-content-between">

		  <div class="logo">
			<h1>
				<a href="/">
					<small class="status"><?php echo $_smarty_tpl->tpl_vars['status']->value;?>
</small>
					<img alt="" class="img-fluid" />
					<div class="title"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</div>
				<span class="line"></span>
				</a>
					 
			</h1>
			
		  </div>

		  <nav id="navbar" class="navbar ">
			<ul id="links">
				<?php echo $_smarty_tpl->tpl_vars['links']->value;?>

				<!--
			  <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
				<ul>
				  <li><a href="#">Drop Down 1</a></li>
				  <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
					<ul>
					  <li><a href="#">Deep Drop Down 1</a></li>
					  <li><a href="#">Deep Drop Down 2</a></li>
					  <li><a href="#">Deep Drop Down 3</a></li>
					  <li><a href="#">Deep Drop Down 4</a></li>
					  <li><a href="#">Deep Drop Down 5</a></li>
					</ul>
				  </li>
				  <li><a href="#">Drop Down 2</a></li>
				  <li><a href="#">Drop Down 3</a></li>
				  <li><a href="#">Drop Down 4</a></li>
				</ul>
			  </li>
			  <li><a class="nav-link scrollto" href="#contact">Contact</a></li> -->
			</ul>

		  </nav>

		</div>
  </header><?php }
}
