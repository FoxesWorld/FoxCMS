export class PlaytimeWidgetGenerator {
	
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.colorMap = this.foxEngine.serversColorMap;
    }

	async generate(data) {
	  const serversObj = data?.servers ?? data;
	  if (!serversObj || !Object.keys(serversObj).length) {
		return this.foxEngine.templateCache["emptyWidget"];
	  }
	  const servers = Object.entries(serversObj).map(([name, d]) => ({
		name,
		total: (d.totalTime || 0) / 60
	  }));
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

    async createSegment({ name, total }, totalAll) {
        const pct = totalAll ? ((total / totalAll) * 100).toFixed(2) : 0;
		const color = this.colorMap[name]||'#AAA';
		return this.foxEngine.replaceTextInTemplate(this.foxEngine.templateCache["widgetSegment"], 
			{
              pct:             pct,
              color: 		   color
			});
    }

    async createRow({ name, total }, totalAll) {
        const pct = totalAll ? ((total / totalAll) * 100).toFixed(2) : 0;
        const time = this.formatTime(total);
        const cls  = pct < 5 ? 'text-muted' : '';
		const segment = await this.createSegment({ name, total }, totalAll);
		
		return this.foxEngine.replaceTextInTemplate(this.foxEngine.templateCache["widgetRow"], 
			{
              name:             name,
              cls: 		   		cls,
			  segment: segment,
			  time: time
			});
    }

    formatTime(sec) {
        const s = Math.round(sec),
              h = Math.floor(s / 60),
              m = s % 60;
        const parts = [];
        if (h) parts.push(`${h} ${this.decline(h, 'час', 'часа', 'часов')}`);
        if (m) parts.push(`${m} ${this.decline(m, 'минута', 'минуты', 'минут')}`);
        return parts.join(' ') || `0 ${this.decline(0, 'секунда', 'секунды', 'секунд')}`;
    }

    decline(n, one, two, five) {
        const t = Math.abs(n) % 100,
              u = t % 10;
        if (t > 10 && t < 20) return five;
        if (u > 1 && u < 5)    return two;
        if (u === 1)           return one;
        return five;
    }
}
