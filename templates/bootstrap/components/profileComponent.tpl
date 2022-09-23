<div class="userProfile animate__animated animate__backInLeft animate__delay-1s">
	<ul>
		<li class="profilePhoto">
			<img src="{$profilePhoto}">
		</li>

		<li><b>Логин</b>: {$LoggedName}</li>
		<li><b>Почта</b>: {$email}</li>
		<li><b>Группа</b>: {$userGroup}</li>
		<li><b>Полное имя</b>: {$realname}</li>
	</ul>
	
	<ul>
		<li>
			<form method="POST" action="/" id="loggedForm">
				<input type="submit" value="logout" class="logout" />
				<input id="user_doaction" class="input" type="hidden" value="logout">
			</form>
		</li>
	</ul>
</div>