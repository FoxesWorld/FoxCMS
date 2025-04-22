export class PlaytimeWidgetGenerator {
    /**
     * @param {Object} foxEngine
     * @param {Object<string, string>} foxEngine.serversColorMap
     * @param {Object<string, string>} foxEngine.templateCache
     * @param {Function} foxEngine.replaceTextInTemplate
     */
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.colorMap = this.foxEngine.serversColorMap;
    }

    /**
     * Создаёт и вставляет HTML-виджет времени игры.
     * @param {string|Object} raw
     * @returns {Promise<void>}
     */
    async createPlayTimeWidget(raw) {
        try {
            const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
            const html = await this.generate(data);
            const container = document.querySelector('.playtime-widget-container');
            if (container) {
                container.innerHTML = html;
            }
        } catch (err) {
            console.error('Error in createPlayTimeWidget:', err);
            const container = document.querySelector('.playtime-widget-container');
            if (container) {
                container.innerHTML = '<p>Error loading playtime widget</p>';
            }
        }
    }

    /**
     * Генерирует HTML-виджет по данным.
     * @param {Array<{serverName: string, totalTime: number}>} data
     * @returns {Promise<string>}
     */
    async generate(data) {
        const servers = this.parseServersData(data);

        if (!servers.length) {
            return this.foxEngine.templateCache["emptyWidget"];
        }

        const totalAll = servers.reduce((sum, s) => sum + s.total, 0);
        const totalStr = this.formatTime(totalAll);

        const barsArr = await Promise.all(servers.map(s => this.createSegment(s, totalAll)));
        const bars = barsArr.join('');

        const rowsArr = await Promise.all(servers.map(s => this.createRow(s, totalAll)));
        const rows = rowsArr.join('');

        const html = await this.foxEngine.replaceTextInTemplate(
            this.foxEngine.templateCache["playTimeWidgetCard"],
            { totalStr, rows, bars }
        );
        return html;
    }

    /**
     * Парсит массив серверов.
     * @param {Array<{serverName: string, totalTime: number}>} serversRaw
     * @returns {Array<{name: string, total: number}>}
     */
parseServersData(serversRaw) {
    if (Array.isArray(serversRaw)) {
        return serversRaw
            .filter(s => s.serverName && !isNaN(Number(s.totalTime)))
            .map(s => ({
                name: s.serverName,
                total: Number(s.totalTime)
            }));
    }
    return [];
}


    /**
     * Генерирует HTML-сегмент (цветной блок).
     * @param {{name: string, total: number}} param0
     * @param {number} totalAll
     * @returns {Promise<string>}
     */
    async createSegment({ name, total }, totalAll) {
        const pct = totalAll ? ((total / totalAll) * 100).toFixed(2) : 0;
        const color = this.colorMap[name] || '#AAA';
        return this.foxEngine.replaceTextInTemplate(
            this.foxEngine.templateCache["widgetSegment"],
            {
                pct: pct,
                color: color
            }
        );
    }

    /**
     * Генерирует HTML-строку таблицы по серверу.
     * @param {{name: string, total: number}} param0
     * @param {number} totalAll
     * @returns {Promise<string>}
     */
    async createRow({ name, total }, totalAll) {
        const pct = totalAll ? ((total / totalAll) * 100).toFixed(2) : 0;
        const time = this.formatTime(total);
        const cls = pct < 5 ? 'text-muted' : '';
        const segment = await this.createSegment({ name, total }, totalAll);

        return this.foxEngine.replaceTextInTemplate(
            this.foxEngine.templateCache["widgetRow"],
            {
                name: name,
                cls: cls,
                segment: segment,
                time: time
            }
        );
    }


	/**
	 * Форматирует время (в секундах) в строку.
	 * @param {number} seconds
	 * @returns {string}
	 */
	formatTime(seconds) {
		const s = Math.round(seconds);
		const h = Math.floor(s / 3600);
		const m = Math.floor((s % 3600) / 60);
		const sec = s % 60;

		const parts = [];
		if (h > 0) parts.push(`${h} ${this.decline(h, 'час', 'часа', 'часов')}`);
		if (m > 0) parts.push(`${m} ${this.decline(m, 'минута', 'минуты', 'минут')}`);
		if (sec > 0) parts.push(`${sec} ${this.decline(sec, 'секунда', 'секунды', 'секунд')}`);

		return parts.join(' ') || `0 ${this.decline(0, 'секунда', 'секунды', 'секунд')}`;
	}



    /**
     * Склонение по числу.
     * @param {number} n
     * @param {string} one
     * @param {string} two
     * @param {string} five
     * @returns {string}
     */
    decline(n, one, two, five) {
        const t = Math.abs(n) % 100;
        const u = t % 10;
        if (t > 10 && t < 20) return five;
        if (u > 1 && u < 5) return two;
        if (u === 1) return one;
        return five;
    }
}