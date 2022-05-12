<div class="userProfile animate__animated animate__backInLeft animate__delay-1s card">
	<ul>
		{profileData}
	</ul>
	
	<ul class="inline">
		<li>
			<form method="POST" action="/" id="loggedForm">
				<input type="submit" value="logout" class="logout" />
				<input id="userProfileAction" class="input" type="hidden" value="logout">
			</form>
		</li>
		
		<li>
			<a href="#cp" class="actionButton">CP</a>
		</li>
	</ul>
</div>