<div class="navigation">
	<nav>
	   <ul>				
			<li>
				<a href="#" onclick="$(this).notify('Work In Progress!', 'info');"><i class="fa fa-user" aria-hidden="true"></i>ЛИЧНЫЙ КАБИНЕТ</a>
			</li>
												
			<li>
				<a href="#" onclick="$(this).notify('Work In Progress!', 'info');"><i class="fa fa-money" aria-hidden="true"></i>ДОНАТ УСЛУГИ</a>
			</li>
											
			<li>
				<a href="#" onclick="$(this).notify('Work In Progress!', 'info');"><i class="fa fa-comments" aria-hidden="true"></i>ФОРУМ</a>
			</li>
				


		</ul>
	</nav>
	{if !$profile}
	<nav class="rightNavBlock">
		<li>
			<div class="sub-main">
				<a href="#login"><button class="logInBtn"><span>Войти</span></button></a>
			</div>
		</li>
	</nav>
	{/if}
</div>