<div class="userProfile animate__animated animate__backInLeft animate__delay-3s">
	<ul>
		{profileData}
		
		<form method="POST" action="/" id="loggedForm">
			<input type="submit" value="logout" class="logout" />
			<input id="userProfileAction" class="input" type="hidden" value="logout">
		</form>
	</ul>
</div>