export class Cookies {
	constructor(foxEngine){
		this.foxEngine = foxEngine;
		if (this.getCookie("cookie-consent") != "") {
			$("#cookie-popup").attr("style", "display: none;");
		} else {
			$("#cookie-popup").removeAttr("style");
		}
	}
	
	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
		  var c = ca[i];
		  while (c.charAt(0) == " ") {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
  }
  
  acceptCookies() {
	  let date = new Date();
      date.setTime(date.getTime() + 31536000000);
      document.cookie = "cookie-consent=true; expires=" + date.toUTCString() + "path=/;";
      $("#cookie-popup").fadeOut(300);
  }
}