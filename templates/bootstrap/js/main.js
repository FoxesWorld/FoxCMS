(function() {
  "use strict";
  userAction();

})()

  function userAction() {
	  if(isLogged) {
		  let adminAction = {};
		  let answer;
			adminAction["user_doaction"] = "adminAction";
			answer = request.send_post(adminAction);
			answer.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
						let response = JSON.parse(this.responseText);
						$("#actionBlock").html(response.text);
				}
			}
	  }
  }