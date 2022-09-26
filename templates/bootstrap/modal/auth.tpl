<mdlOpt>
{
  "mdlAdress": "login",
  "mdlTitle": "Авторизация",
  "mdlDesc": "Я увольняюсь...",
  "groupToShow": 5
}
</mdlOpt>
<form method="POST" action="/" id="loginForm">
	<table>
		<tr>
			<td colspan="2">
			<div class="input_block animate__animated animate__fadeInRight">
				<input id="login" class="input" focusable="false" autocomplete="off" required name='required'>
				<label class="label">Логин</label>
			</div>
			</td>
		</tr>
		
		<tr>
			<td>
				<button type="submit" class="login">Войти <i class="fa fa-sign-in" aria-hidden="true"></i></button>
			</td>
			<td>
				<div class="input_block animate__animated animate__fadeInLeft">
					<input id="password" class="input" type="password" focusable="false" autocomplete="off" required name='required'>
					<label class="label">Пароль</label>
				</div>
			</td>
		
		</tr>
		</table>
		
		
		
		<div class="c-captcha">
			<div class="g-recaptcha" data-sitekey="6LcKeBoiAAAAAGnhfzZnLyzUApLmgnOpP4OfFOB7" data-theme="Light"></div>
			<script src="https://www.google.com/recaptcha/api.js?hl={$lang['wysiwyg_language']}" async defer></script>
		</div>	
		<input id="userAction" class="input" type="hidden" value="auth">
		
	</form>
	
	<a href="#reg">Нет аккаунта?</a>