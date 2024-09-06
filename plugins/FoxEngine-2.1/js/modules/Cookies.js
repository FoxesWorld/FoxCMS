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
		try {
			const date = new Date();
			date.setFullYear(date.getFullYear() + 1);
			document.cookie = `cookie-consent=true; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
			const cookiePopup = document.getElementById('cookie-popup');
			if (cookiePopup) {
				cookiePopup.style.transition = 'opacity 0.3s';
				cookiePopup.style.opacity = '0';
				setTimeout(() => {
					if (cookiePopup.parentNode) {
						cookiePopup.parentNode.removeChild(cookiePopup);
					}
				}, 300);
			}
		} catch (error) {
			console.error('Ошибка при установке cookie:', error);
		}
	}

}