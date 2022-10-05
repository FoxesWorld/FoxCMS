<?php
/* Smarty version 4.0.4, created on 2022-10-04 15:51:50
  from '/var/www/foxeswor/data/www/foxesworld.ru/templates/bootstrapENG/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_633c2c668898f0_92574985',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '0bbc9a364a65fec04b47f088a095b993dea8d9a6' => 
    array (
      0 => '/var/www/foxeswor/data/www/foxesworld.ru/templates/bootstrapENG/header.tpl',
      1 => 1664733004,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_633c2c668898f0_92574985 (Smarty_Internal_Template $_smarty_tpl) {
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
