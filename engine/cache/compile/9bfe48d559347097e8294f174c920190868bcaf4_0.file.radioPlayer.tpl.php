<?php
/* Smarty version 4.0.4, created on 2022-04-04 18:51:48
  from '/Avalon/sites/FoxRadio/www/templates/default/components/radioPlayer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_624b141495da73_32686739',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9bfe48d559347097e8294f174c920190868bcaf4' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/default/components/radioPlayer.tpl',
      1 => 1649087505,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_624b141495da73_32686739 (Smarty_Internal_Template $_smarty_tpl) {
?>	<head>

		<link href="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/css/foxRadio.css" rel="stylesheet" type="text/css" />
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/js/foxRadio.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">
			$("#jquery_jplayer_1").jPlayer({
				ready: function () {

					$(this).jPlayer("setMedia", {
						mp3: "https://radio.macros-core.com:8443/live"
					}).jPlayer("play");

				},
				ended: function (event) { 

					//$('#artist').html(string[1]);
					//$('#songname').html(string[2]);
				},
				swfPath: "<?php echo $_smarty_tpl->tpl_vars['tplDir']->value;?>
/js",
				supplied: "mpeg"
			});
		<?php echo '</script'; ?>
>
	</head>
<body>
		<div id="jquery_jplayer_1" class="jp-jplayer"></div>

		<div class="jp-audio">
			<div class="jp-type-single">
				<div id="jp_interface_1" class="jp-interface">
					<ul class="jp-controls">
						<li><a href="#" class="jp-play" tabindex="1">play</a></li>
						<li><a href="#" class="jp-pause" tabindex="1">pause</a></li>
						<li><a href="#" class="jp-stop" tabindex="1">stop</a></li>
						<li><a href="#" class="jp-mute" tabindex="1">mute</a></li>
						<li><a href="#" class="jp-unmute" tabindex="1">unmute</a></li>
					</ul>
					<div class="jp-progress">
						<div class="jp-seek-bar">
							<div class="jp-play-bar"></div>
						</div>
					</div>
					<div class="jp-volume-bar">
						<div class="jp-volume-bar-value"></div>
					</div>
					<div class="jp-current-time"></div>
					<div class="jp-duration"></div>
				</div>
				<div id="jp_playlist_1" class="jp-playlist">
					<ul>
						<li><strong id="artist">Artist</strong> - <span id="songname">Song name</span></li>
					</ul>
				</div>
			</div>
		</div>
</body>
</html><?php }
}
