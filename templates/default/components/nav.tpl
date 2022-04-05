<div class="navigation">
	<nav>
	   <ul>				
			{$links}
		</ul>
	</nav>
	{if !$isLogged}
	<nav class="rightNavBlock">
		<li>
			<div class="sub-main">
				<a href="#login"><button class="logInBtn"><span>Войти</span></button></a>
			</div>
		</li>
	</nav>
	{/if}
</div>