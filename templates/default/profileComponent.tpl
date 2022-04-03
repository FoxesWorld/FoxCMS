<div class="userProfile animated jackInTheBox delay-4s">
	<ul>
		{profileData}
		
		<form method="POST" action="/" id="loggedForm">
			<input type="submit" value="logout" class="logout" />
			<input id="userProfileAction" class="input" type="hidden" value="logout">
		</form>
	</ul>
</div>