<html>

	{include file='header.tpl'}

	<body id="content">
		{$builtInJS}
	<header>
		<div class="animate__animated animate__BounceInRight animate__delay-1s menu-top">
			{include file='components/logo.tpl'}
			{include file='components/nav.tpl'}
		</div>
	</header>

		<main ID="mainCont" class="animate__animated animate__jackInTheBox animate__delay-2s">
				<div class="wrap">
					<div class="wrap-ribbon">
						<div class="ribbon">FEATURE!</div>
					</div>
				</div>
			{$profile}
			<div class="animate__animated animate__backInUp animate__delay-3s contInner">

			</div>
		</main>
		{include file='components/advert.tpl'}
	</body>
	{include file='footer.tpl'}
</html>