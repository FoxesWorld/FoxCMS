export class Utils {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    }

convertUnixTime(unix) {
    unix = parseInt(unix);

    const isMilliseconds = unix > 1000000000000;
    const date = isMilliseconds ? new Date(unix) : new Date(unix * 1000);
    return date;
}

getFormattedDate(unix) {
    const date = this.convertUnixTime(unix);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const year = date.getFullYear();
    const month = this.monthNames[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `${month} ${day}, ${year}, ${hour}:${minutes}:${seconds}`;
}


	isJson(str) {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			return false;
		}
	}
	
	async showErrorPage(response, block){
		let responseJSON = JSON.parse(response);
		const erorPage = await foxEngine.loadTemplate(this.foxEngine.elementsDir + 'pageError.tpl', true);
        let erorHTML = await this.foxEngine.replaceTextInTemplate(erorPage, {
			login: this.foxEngine.replaceData.login,
			text: responseJSON.error,
			title: ""
        });
		await this.foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(erorHTML), block);
	}


    textAnimate(target) {
        let animation = anime.timeline({
            loop: false
        }).add({
            targets: target,
            scale: [14, 1],
            rotateZ: [180, 0],
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1000,
            delay: 500
        });
        return true;
    }

    randomNumber(min, max) {
        const r = Math.random() * (max - min) + min + 1
        return Math.floor(r)
    }

    getData(data, tag) {
        return data.getElementsByTagName(tag)[0];
    }

    splitWrapLetters(query, letterClass) {
        let textWrapper = document.querySelector(query);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
    }
}