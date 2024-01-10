<nav class="navbar navbar-expand-lg bar">
	<ul class="inline foxesNav">
		<li>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
				<span class="navbar-toggler-icon"></span>
			</button>
		</li>

		<li>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0">
				{if $isMobile}
					{if $user_group == 5}
						<li class="nav-item">
							<a class="pageLink-faq selectedPage" onclick="FoxEngine.loadPage('auth', replaceData.contentBlock); return false; ">
								<div class="rightIcon">
									<i class="fa fa-sign-in"></i>
								</div>
							Авторизация
							</a>
						</li>
					{/if}
			{/if}</ul>
			</div>
		</li>
	</ul>
	<div class="rightAction d-none d-md-flex" id="actionBlock"></div>
	
</nav>
