	<form method="POST" action="/" id="loginForm">
	<table>
		<tr>
			<td colspan="2">
			<div class="input_block animated fadeInRight">
				<input id="login" class="input" autocomplete="off" required="">
				<label class="label">Логин</label>
			</div>
			</td>
		</tr>
		
		<tr>
			<td>
				<input type="submit" />
			</td>
			<td>
				<div class="input_block animated fadeInLeft">
					<input id="password" class="input" type="password" autocomplete="off" required="">
					<label class="label">Пароль</label>
				</div>
			</td>
		
		</tr>
		</table>
		
		
		
		<div class="c-captcha">
			<div class="g-recaptcha" data-sitekey="6Ld1xvkUAAAAAOxY99YbrZJsw8uv3b1Dt-NjNwUw" data-theme="Light"></div>
			<script src="https://www.google.com/recaptcha/api.js?hl={$lang['wysiwyg_language']}" async defer></script>
		</div>	
		<input id="userAction" class="input" type="hidden" value="auth">
		
	</form>
	
	<a href="#reg">Нет аккаунта?</a>