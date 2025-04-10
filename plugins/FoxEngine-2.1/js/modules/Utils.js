export class Utils {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
    }

    static monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    convertUnixTime(unix) {
        const ts = Number(unix);
        return new Date(ts > 1e12 ? ts : ts * 1000);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getFormattedDate(unix) {
        const date = this.convertUnixTime(unix);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        const month = Utils.monthNames[date.getMonth()];
        const day   = date.getDate();
        const year  = date.getFullYear();
        const hour  = this.pad(date.getHours());
        const min   = this.pad(date.getMinutes());
        const sec   = this.pad(date.getSeconds());

        return `${month} ${day}, ${year}, ${hour}:${min}:${sec}`;
    }

    isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }

    async showErrorPage(response, block) {
        const { error } = JSON.parse(response);
        const tplPath   = `${this.foxEngine.elementsDir}pageError.tpl`;
        const tpl       = await this.foxEngine.loadTemplate(tplPath, true);
        const html      = await this.foxEngine.replaceTextInTemplate(tpl, {
            login: this.foxEngine.replaceData.login,
            text:  error,
            title: ''
        });
        const content   = await this.foxEngine.entryReplacer.replaceText(html);
        await this.foxEngine.page.loadData(content, block);
    }

    textAnimate(target) {
        return anime.timeline({ loop: false })
            .add({
                targets:    target,
                scale:      [14, 1],
                rotateZ:    [180, 0],
                opacity:    [0, 1],
                easing:     'easeInOutQuad',
                duration:   1000,
                delay:      500
            });
    }

    downloadFile(path, name) {
        const link = document.createElement('a');
        link.href  = path;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getData(data, tag) {
        return data.getElementsByTagName(tag)?.[0] || null;
    }
    splitWrapLetters(selector, letterClass) {
        const el = document.querySelector(selector);
        if (!el) return;
        el.innerHTML = [...el.textContent]
            .map(ch => `<span class="${letterClass}">${ch}</span>`)
            .join('');
    }
}