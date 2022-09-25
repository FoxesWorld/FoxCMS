<div class="userProfile animate__animated animate__backInLeft animate__delay-1s">
	<ul>
		<li class="profilePhoto">
			<img src="{$profilePhoto}">
		</li>

		<div class="userdata">
			<li><b><i class="fa fa-user-circle-o" aria-hidden="true"></i>Логин</b>: {$login}</li>
			<li><b><i class="fa fa-address-card-o" aria-hidden="true"></i>Почта</b>: {$email}</li>
			<li><b><i class="fa fa-users" aria-hidden="true"></i>Группа</b>: {$group_name}</li>
			<li><b><i class="fa fa-diamond" aria-hidden="true"></i>Полное имя</b>: {$realname}</li>
		</div>
	</ul>
	
	<ul class="userActions">
		<li>
			{if !$isLogged}
					<a href="#login">
					<button class="logInBtn">
						<span>Войти</span>
					</button>
					</a>
			{else}
				<form method="POST" action="/" id="sessionActions">
					<button type="submit" class="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> logout</button>
					<input id="user_doaction" class="input" type="hidden" value="logout">
				</form>
			 {/if}	
		</li>
	</ul>
</div>