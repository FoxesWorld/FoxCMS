	<head>

		<link href="{$tplDir}/css/foxRadio.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="{$tplDir}/js/foxRadio.min.js"></script>
		<script type="text/javascript">
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
				swfPath: "{$tplDir}/js",
				supplied: "mpeg"
			});
		</script>
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
</html>