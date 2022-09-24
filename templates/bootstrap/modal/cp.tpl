<mdlOpt>{"groupToShow": [1,4]}</mdlOpt>
	<form method="POST" action="/" id="editProfileForm">

		<div class="input_block">
			<input id="realname" class="input" type="text" autocomplete="off" required value="{realname}">
			<label class="label">Полное имя</label>
		</div>
		
		<div class="input_block">
			<input id="email" class="input" type="text" autocomplete="off" required value="{email}">
			<label class="label">E-mail</label>
		</div>

		<div class="input_block">
			<input id="password" class="input" type="text" autocomplete="off" name="required">
			<label class="label">Текущий пароль</label>
		</div>
		
		<input id="userProfileAction" class="input" type="hidden" value="editProfile" />
		<input id="login" class="input" type="hidden" value="{login}" />
		<input type="submit" class="login" />
	</form>