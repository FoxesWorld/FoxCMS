<mdlOpt>
{"groupToShow": 5}
</mdlOpt>
	<form method="POST" action="/" id="registerForm" autocomplete="false">
		<div class="input_block animated fadeInRight">
			<input id="login" class="input" type="text" autocomplete="off" required>
			<label class="label">Логин</label>
		</div>

		<div class="input_block animated fadeInRight">
			<input id="email" class="input" type="email" autocomplete="off" required>
			<label class="label">Почта</label>
		</div>
		
		<div class="input_block animated fadeInLeft">
			<input id="password" class="input" type="password" autocomplete="off" required>
			<label class="label">Пароль</label>
		</div>
		
		<div class="input_block animated fadeInLeft">
			<input id="password2" class="input" type="password" autocomplete="off" required>
			<label class="label">Повторите пароль</label>
		</div>
		
		
		<div class="c-captcha">
			<div class="g-recaptcha" data-sitekey="6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7" data-theme="Light"></div>
			<script src="https://www.google.com/recaptcha/api.js?hl={$lang['wysiwyg_language']}" async defer></script>
		</div>
		
		<label for="acceptForm" class="checkbox_container">
			Даю согласие на обработку персональных данных <i class="bi bi-journal-text"></i>
			<input type="radio" style="display: none;" id="acceptForm" value="1">
			<span class="checkmark"></span>
		</label>

		<input id="userAction" class="input" type="hidden" value="reg">
		<button type="submit" class="login">Зарегистрироваться <i class="bi bi-person-plus"></i></button>
	</form>