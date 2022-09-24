<div class="userProfile animate__animated animate__backInLeft animate__delay-1s">
	<ul>
		<li class="profilePhoto">
			<img src="{$profilePhoto}">
		</li>

		<div class="userdata">
			<li><b><i class="bi bi-person-circle"></i>Логин</b>: {$LoggedName}</li>
			<li><b><i class="bi bi-envelope"></i>Почта</b>: {$email}</li>
			<li><b><i class="bi bi-people"></i>Группа</b>: {$userGroup}</li>
			<li><b><i class="bi bi-display"></i>Полное имя</b>: {$realname}</li>
		</div>
	</ul>
	
	<ul class="userActions">
		<li>
			<form method="POST" action="/" id="sessionActions">
				<button type="submit" class="logout"><i class="bi bi-box-arrow-left"></i> logout</button>
				<input id="user_doaction" class="input" type="hidden" value="logout">
			</form>
		</li>
	</ul>
</div>