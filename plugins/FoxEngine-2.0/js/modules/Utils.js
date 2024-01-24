export class Utils {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    }

    convertUnixTime(unix) {
        let a = new Date(unix * 1000),
            year = a.getFullYear(),
            month = this.monthNames[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
            sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

        return `${month} ${date}, ${year}, ${hour}:${min}:${sec}`;
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