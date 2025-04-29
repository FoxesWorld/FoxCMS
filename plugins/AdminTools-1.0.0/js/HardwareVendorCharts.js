// file: HardwareVendorCharts.js
// Класс для рендеринга CPU и GPU Vendor статистики в админ-панели
// Использует Chart.js; иконки читаются из внешних SVG-файлов

export default class HardwareVendorCharts {
  constructor({
    cpuPieCanvasId   = 'cpuPieChart',
    gpuPieCanvasId   = 'gpuPieChart',
    totalUsersId     = 'totalUsers',
    // базовый путь к SVG-иконкам (без слеша на конце)
    svgIconBasePath  = window.foxEngine.replaceData.assets+'/icons/svg'
  } = {}, adminPanel) {
    this.cpuPieCanvasId  = cpuPieCanvasId;
    this.gpuPieCanvasId  = gpuPieCanvasId;
    this.totalUsersId    = totalUsersId;
    this.adminPanel      = adminPanel;
    this.svgIconBasePath = svgIconBasePath;

   this.colorMap = {
      Intel:  '#0071C5', // Intel Blue
      AMD:    '#ba4242', // AMD Aqua
      NVIDIA: '#76B900', // NVIDIA Green
      Other:  '#999999'  // Серый по умолчанию
    };
  }

  async init() {
    try {
      const data = await this.adminPanel.getHardware();
      this.renderCpu(data);
      this.renderGpu(data);
    } catch (err) {
      console.error('HardwareVendorCharts init error:', err);
    }
  }

  renderCpu(raw) {
    const counts = raw.reduce((acc, item) => {
      const name = (item.cpu||'').trim();
      const v = /AMD|Ryzen/i.test(name) ? 'AMD'
              : /Intel/i.test(name)    ? 'Intel'
              :                            'Other';
      acc[v] = (acc[v]||0) + 1;
      return acc;
    }, {});
    ['AMD','Intel','Other'].forEach(v=>counts[v]=counts[v]||0);

    this._updateTotal(counts);
    this._createChart(this.cpuPieCanvasId, 'pie', counts);
    this._createHtmlLegend(this.cpuPieCanvasId, counts);
  }

  renderGpu(raw) {
    const all = raw.flatMap(item => {
      try { return JSON.parse(item.gpus||'[]'); } catch { return []; }
    });
    const counts = all.reduce((acc, name) => {
      const v = /NVIDIA/i.test(name)     ? 'NVIDIA'
              : /AMD|Radeon/i.test(name) ? 'AMD'
              : /Intel/i.test(name)      ? 'Intel'
              :                            'Other';
      acc[v] = (acc[v]||0) + 1;
      return acc;
    }, {});
    ['NVIDIA','AMD','Intel','Other'].forEach(v=>counts[v]=counts[v]||0);

    this._createChart(this.gpuPieCanvasId, 'pie', counts);
    this._createHtmlLegend(this.gpuPieCanvasId, counts);
  }

  _updateTotal(counts) {
    const total = Object.values(counts).reduce((a,b)=>a+b,0);
    const el = document.getElementById(this.totalUsersId);
    if (el) el.textContent = total;
  }

  _createChart(canvasId, type, data) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext('2d');
    const labels = Object.keys(data);
    const bg     = labels.map(l=> this.colorMap[l] || this.colorMap.Other);

    new Chart(ctx, {
      type,
      data: { labels, datasets: [{ data: Object.values(data), backgroundColor: bg }] },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { enabled: true } }
      }
    });
  }

  _createHtmlLegend(canvasId, data) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const parent = c.parentNode;
    // удалить старую легенду
    const old = parent.querySelector('.chart-legend');
    if (old) parent.removeChild(old);

    const ul = document.createElement('ul');
    ul.className = 'chart-legend';

    for (const [label, count] of Object.entries(data)) {
      const li = document.createElement('li');
      // путь к SVG: /assets/svg/{label.toLowerCase()}.svg
      const svgPath = `${this.svgIconBasePath}/${label.toLowerCase()}.svg`;
      li.innerHTML = `
        <img class="legend-icon" src="${svgPath}" alt="${label} logo" />
        <span class="legend-label">${label}: ${count}</span>
      `;
      ul.appendChild(li);
    }

    parent.appendChild(ul);
  }
}
