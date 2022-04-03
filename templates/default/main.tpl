<html>

	{include file='header.tpl'}

	<body id="content">
		{$builtInJS}
		<div class="animate__animated animate__BounceInRight animate__delay-1s menu-top">
			{include file='components/logo.tpl'}
			{include file='components/nav.tpl'}
		</div>

		<main ID="mainCont" class="animate__animated animate__BounceInUp animate__delay-3s">
			{$profile}
			<div class="contInner">

				{include file='components/radioPlayer.tpl'}

			</div>
		</main>
		{include file='notify.tpl'}
	</body>
	{include file='footer.tpl'}
</html>