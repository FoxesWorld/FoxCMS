function parseBadges(login) {
	let badgesInstance = request.send_post(
	{
		user_doaction: 'GetBadges',
		userDisplay: login
	});
	    badgesInstance.onreadystatechange = function() {
            if (badgesInstance.readyState === 4) {
				if(this.responseText.length > 0){
					$("#userBadges").html(this.responseText); 
				} else {
					$("#userBadges").remove();
				}
			}
		}
}