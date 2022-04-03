<html>

	{include file='header.tpl'}

	<body id="content">
		{$builtInJS}
		<div class="animated BounceInRight delay-1s menu-top">
			{include file='logo.tpl'}
			{include file='nav.tpl'}
		</div>

		<main ID="mainCont" class="animated BounceInUp delay-3s">
			{$profile}
			
			<audio id="player" controls="controls" preload="none" style="margin-top: 24px; width: 100%;">
                <source src="https://radio.macros-core.com:8443/live" type="audio/mpeg">
            </audio>

			<script>
					var vid = document.getElementById("player");
					vid.volume = 0.05;
			</script>
		</main>

	</body>
	{include file='footer.tpl'}
</html>