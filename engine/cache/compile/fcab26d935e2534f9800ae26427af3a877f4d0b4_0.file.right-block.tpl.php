<?php
/* Smarty version 4.0.4, created on 2024-01-25 21:09:10
  from '/var/www/FoxCMS/templates/foxengine2/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_65b2a3c6eaecd0_34964562',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'fcab26d935e2534f9800ae26427af3a877f4d0b4' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/right-block.tpl',
      1 => 1706022018,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_65b2a3c6eaecd0_34964562 (Smarty_Internal_Template $_smarty_tpl) {
if (!$_smarty_tpl->tpl_vars['isMobile']->value) {?>
<div class="col-4 d-none d-lg-block d-sm-none">
	<div class="row rightBlock">
		<div class="card">
			<div id="userBlock">

			</div>

			<div class="card text-white mb-3">
				<div class="cardTitle">
					<img class="img-fluid" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/monitor.png" uk-img />
					Мониторинг
				</div>
				<div id="servers"></div>
			</div>

			<div class="card text-white mb-3">
				 <div class="cardTitle">
					<img class="img-fluid" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/lastuser.png" uk-img />
					Последняя регистрация
				</div>
				<div id="lastUser"></div>
			</div>
			<!--
			<div class="widgets">

				<a href="https://discord.com/invite/mxV4uYq" title="Перейти на сервер Discord">
					<div class="social-widget discord-widget">
						<img src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/svg/discord.svg" alt="Discord">
						<div class="social-status" title="Текущий онлайн сервера">
							<i class="fa fa-circle"></i> 2217</div>
					</div>
				</a>
			</div>
		-->
		</div>
	</div>
</div>
<?php }
}
}
