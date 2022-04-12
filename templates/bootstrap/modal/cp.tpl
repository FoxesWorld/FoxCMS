	<form method="POST" action="/" id="editProfileForm">

		<div class="input_block">
			<input id="realname" class="input" type="text" autocomplete="off" required value="{$realname}">
			<label class="label">Полное имя</label>
		</div>
		
		<input id="userProfileAction" class="input" type="hidden" value="editProfile">

		<input type="submit" class="login" />
	</form>