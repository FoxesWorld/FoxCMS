export class Cookies {
	constructor(foxEngine){
		this.foxEngine = foxEngine;
		if (foxEngine.cookieManager.getCookie("cookie-consent") === 'true') {
			$("#cookie-popup").attr("style", "display: none;");
		} else {
			$("#cookie-popup").removeAttr("style");
		}
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