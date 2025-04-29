<?php
/* Smarty version 4.0.4, created on 2025-04-29 19:59:49
  from '/var/www/FoxCMS/templates/foxengine2/right-block.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_681105852c62d6_46016932',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'fcab26d935e2534f9800ae26427af3a877f4d0b4' => 
    array (
      0 => '/var/www/FoxCMS/templates/foxengine2/right-block.tpl',
      1 => 1736087952,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_681105852c62d6_46016932 (Smarty_Internal_Template $_smarty_tpl) {
if (!$_smarty_tpl->tpl_vars['isMobile']->value) {?>
<aside class="col-4 d-none d-lg-block d-sm-none">
	<div class="row rightBlock">
			<div class="card text-white mb-3">
			<div id="userBlock">

			</div>
				<div class="cardTitle">
					<img class="img-fluid" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/monitor.png" uk-img />
					Мониторинг
				</div>
				<div id="servers"></div>
			</div>

		<!--	<div class="card text-white mb-3">
				<div class="cardTitle">
					<img class="img-fluid" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/monitor.png" uk-img />
					Голосуй
				</div>

				<h3 style="margin: 0 auto;color: antiquewhite;padding: 15;">
				<div class="importantText">
					<strong>Coming Soon!</strong>
				</div>
				</h3>
				
		<div class="right-block-content">
            <div class="right-block-vote-items">
                    <a href="https://mcrate.su/rate/9012" target="_blank"><em>Голосуй за нас на <span>McRate</span></em> <i class="vote-item-ico1"></i></a>
                    <a href="https://topcraft.ru/servers/10656/" target="_blank"><em>Голосуй за нас на <span>TopCraft</span></em> <i class="vote-item-ico2"></i></a>
                    <a href="https://mctop.su/servers/6204/" target="_blank"><em>Голосуй за нас на <span>McTop</span></em> <i class="vote-item-ico3"></i></a>
            </div>
   		 </div> 
			</div>-->

			<div class="card text-white mb-3">
				 <div class="cardTitle">
					<img class="img-fluid" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/assets/icons/lastuser.png" uk-img />
					Последняя регистрация
				</div>
				<div id="lastUser"></div>
			</div>
		
	</div>
</aside>
<?php }
}
}
