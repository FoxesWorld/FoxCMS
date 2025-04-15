export class InfoBox {

	constructor(foxEngine) {
		this.foxEngine = foxEngine;
		this.cookieManager = foxEngine.cookieManager;
		this.cookieName = "infobox_closed";
		this.cookieValue = "true";
		this.cookieDays = 2; // сколько дней скрывать
	}

	async _getInfoData() {
		let infoData = await this.foxEngine.sendPostAndGetAnswer({
			"sysRequest": "infoBox"
		}, "JSON");
		return infoData;
	}

	async setBox(container) {
		const cookie = this.cookieManager.getCookie(this.cookieName);
		if (cookie === this.cookieValue) {
			return;
		}

		let data = await this._getInfoData();
		data = data[0];
		const template = this.foxEngine.templateCache["infoBox"];

		let html = await this.foxEngine.replaceTextInTemplate(template, {
			title: data.title,
			text: data.text,
			image: data.image,
			button_text: data.button_text,
			button_url: data.button_url
		});

		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;

		if (!data.button_text || data.button_text.trim() === '') {
			const btn = tempDiv.querySelector("#actionButton");
			if (btn) btn.remove();
		}

		$(container).html(tempDiv.innerHTML);
		$(container).find("[data-close-box]").on("click", () => {
			this.closeBoxWithAnimation(`${container} #info-box`);
			this.cookieManager.setCookie(this.cookieName, this.cookieValue, this.cookieDays);
		});
	}

closeBoxWithAnimation(containerSelector = "#info-box") {
	const $box = $(containerSelector);
	if ($box.length === 0) return;

	$box.animate(
		{ 
			height: 0, 
			opacity: 0, 
			paddingTop: 0, 
			paddingBottom: 0, 
			marginBottom: 0, 
			scale: 0.8
		},
		{
			duration: 3500,
			easing: "easeOutCubic",
			complete: function () {
				$box.remove();
			}
		}
	);
}

}
