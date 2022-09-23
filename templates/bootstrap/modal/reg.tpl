	<form method="POST" action="/" id="registerForm" autocomplete="false">
		<div class="input_block animated fadeInRight">
			<input id="login" class="input" type="text" autocomplete="off" name='required'>
			<label class="label">Логин</label>
		</div>

		<div class="input_block animated fadeInRight">
			<input id="email" class="input" type="email" autocomplete="off" name='required'>
			<label class="label">Почта</label>
		</div>
		
		<div class="input_block animated fadeInLeft">
			<input id="password" class="input" type="password" autocomplete="off" name='required'>
			<label class="label">Пароль</label>
		</div>
		
		<div class="input_block animated fadeInLeft">
			<input id="password2" class="input" type="password" autocomplete="off" name='required'>
			<label class="label">Повторите пароль</label>
		</div>
		
		
		<div class="c-captcha">
			<div class="g-recaptcha" data-sitekey="6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7" data-theme="Light"></div>
			<script src="https://www.google.com/recaptcha/api.js?hl={$lang['wysiwyg_language']}" async defer></script>
		</div>
		
		<label for="acceptForm" class="checkbox_container">
			Даю согласие на обработку персональных данных
			<input type="radio" style="display: none;" id="acceptForm" value="1">
			<span class="checkmark"></span>
		</label>

		<input id="userAction" class="input" type="hidden" value="reg">
		<input type="submit" class="login" />
	</form>