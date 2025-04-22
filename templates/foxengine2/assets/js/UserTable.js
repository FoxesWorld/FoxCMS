class UserTable {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.servers = new Set(['all']);
        this.selectedServer = 'all';
        this.availableServers = new Set();
        this.users = [];
    }

    async parseAvailableServers() {
        try {
            const response = await foxEngine.sendPostAndGetAnswer({
                "sysRequest": "parseServers",
                "login": foxEngine.replaceData.login
            }, "JSON");
            response.forEach(server => this.availableServers.add(server.serverName));
        } catch (error) {
            console.error("Ошибка при парсинге серверов:", error);
        }
    }

    async fetchAndDisplayUsers() {
        try {
            const users = await foxEngine.sendPostAndGetAnswer({ "sysRequest": "topPlayers" }, "JSON");
            await this.parseAvailableServers();
            this.collectServers(users);
            this.updateServerSelect();
            this.users = this.sortUsersByPlaytime(users, this.selectedServer);
            this.renderUsers(this.users);
        } catch (error) {
            console.error("Ошибка получения данных о пользователях:", error);
        }
    }

    collectServers(users) {
        users.forEach(user => {
            const parsedData = this.parseServersOnline(user.serversOnline);
            parsedData.forEach(server => this.servers.add(server.serverName));
        });
    }

    updateServerSelect() {
        const serverSelect = document.getElementById('serverSelect');
        serverSelect.innerHTML = '';

        const allOption = this.createOptionElement('all', 'Все сервера');
        serverSelect.appendChild(allOption);

        this.servers.forEach(server => {
            if (server !== 'all') {
                const option = this.createOptionElement(server, server);
                serverSelect.appendChild(option);
            }
        });

        serverSelect.addEventListener('change', () => {
            this.selectedServer = serverSelect.value;
            this.sortAndRenderUsersByServer(this.selectedServer);
        });
    }

    createOptionElement(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = this.availableServers.has(value) || value === 'all'
            ? text
            : `${text} (Закрыт)`;
        return option;
    }

/**
 * Парсит JSON-строку с данными серверов и возвращает массив объектов,
 * у всех полей приводит строки к числам, а миллисекунды — к секундам.
 */
parseServersOnline(serversOnline) {
    try {
        // Парсим строку serversOnline в JSON объект
        const raw = JSON.parse(serversOnline || '[]');

        const normalize = s => {
            const totalTime = Number(s.totalTime) || 0;
            const lastPlayed = Number(s.lastPlayed) || 0;
            return {
                serverName: s.serverName || '',
                totalTime,
                lastPlayed
            };
        };

        if (Array.isArray(raw)) {
            return raw
                .filter(s => s.serverName && !isNaN(Number(s.totalTime)) && !isNaN(Number(s.lastPlayed)))
                .map(normalize);
        }

        if (raw.servers && typeof raw.servers === 'object') {
            return Object.entries(raw.servers).map(([name, srv]) => normalize({ serverName: name, ...srv }));
        }

        return [];
    } catch (err) {
        console.error("Ошибка при парсинге serversOnline:", err);
        return [];
    }
}

/**
 * Всегда возвращает ровно totalTime (в секундах) из БД,
 * не учитывая текущую активную сессию.
 */
calculateTotalPlaytime(serversOnline, selectedServer) {
    const servers = this.parseServersOnline(serversOnline);

    if (selectedServer === 'all') {
        return servers.reduce((sum, s) => sum + s.totalTime, 0);
    }
    const srv = servers.find(s => s.serverName === selectedServer);
    return srv ? srv.totalTime : 0;
}


/**
 * Форматирует общее время (в секундах) в строку,
 * всегда показыя часы и секунды (даже если минут = 0).
 * Для 3630 секунд вернет "1 час 30 секунд".
 */
formatPlaytimeText(seconds) {
 const s = Math.round(seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    const parts = [];
    if (h > 0) parts.push(`${h} ${this.declineWord(h, 'час', 'часа', 'часов')}`);
    if (m > 0) parts.push(`${m} ${this.declineWord(m, 'минута', 'минуты', 'минут')}`);
    if (sec > 0) parts.push(`${sec} ${this.declineWord(sec, 'секунда', 'секунды', 'секунд')}`);

    return parts.join(' ') || `0 ${this.declineWord(0, 'секунда', 'секунды', 'секунд')}`;
}


    sortUsersByPlaytime(users, selectedServer) {
        return users.sort((a, b) =>
            this.calculateTotalPlaytime(b.serversOnline, selectedServer) - 
            this.calculateTotalPlaytime(a.serversOnline, selectedServer)
        );
    }

    calculateTotalPlaytime(serversOnline, selectedServer) {
        const servers = this.parseServersOnline(serversOnline);
        const now = Math.floor(Date.now() / 1000);

        const getServerPlaytime = (s) => {
            const base = s.totalTime || 0;
            const isActive = s.startTimestamp && (!s.lastUpdated || s.lastUpdated < now);

            if (isActive) {
                const sessionTime = now - s.startTimestamp;
                return base + sessionTime;
            }

            return base;
        };

        if (selectedServer === 'all') {
            return servers.reduce((sum, s) => sum + getServerPlaytime(s), 0);
        }

        const server = servers.find(s => s.serverName === selectedServer);
        return server ? getServerPlaytime(server) : 0;
    }

    async renderUsers(users) {
        this.container.innerHTML = '';
        const rows = await Promise.all(users.map((user, idx) => this.createUserRow(user, idx + 1)));
        rows.forEach(row => row && this.container.appendChild(row));
    }

    async createUserRow(user, rank) {
		console.log(user);
        const servers = this.parseServersOnline(user.serversOnline);
        if (this.selectedServer !== 'all' && !servers.some(s => s.serverName === this.selectedServer)) {
            return null;
        }

        const row = document.createElement('tr');
        row.style.background = `linear-gradient(45deg, #ffffffcc, ${user.colorScheme})`;

        row.appendChild(this.createRankCell(rank));
        row.appendChild(await this.createPlayerCell(user));
        row.appendChild(this.createPlaytimeCell(user));
        row.appendChild(this.createLastSessionCell(user));
        row.appendChild(this.createLastLoginCell(user));

        return row;
    }

    createRankCell(rank) {
        const rankCell = document.createElement('td');
        rankCell.className = 'text-center fs-3';
        rankCell.textContent = rank;
        return rankCell;
    }

    async createPlayerCell(user) {
        const playerCell = document.createElement('td');
        const headImage = await this.fetchPlayerHeadImage(user.login);
        const playerHtml = await foxEngine.replaceTextInTemplate(foxEngine.templateCache["playerCell"], {
            login: user.login,
            headImage: headImage
        });
        playerCell.innerHTML = playerHtml;
        return playerCell;
    }

    async fetchPlayerHeadImage(login) {
        try {
            return await foxEngine.sendPostAndGetAnswer({
                "sysRequest": "skin",
                "show": "head",
                "login": login
            }, "TEXT");
        } catch (error) {
            console.error(`Ошибка получения изображения для ${login}:`, error);
            return '';
        }
    }

    createPlaytimeCell(user) {
        const playtimeCell = document.createElement('td');
        const totalSeconds = this.calculateTotalPlaytime(user.serversOnline, this.selectedServer);

        const timeText = document.createElement('div');
        timeText.textContent = this.formatPlaytimeText(totalSeconds);
        playtimeCell.appendChild(timeText);

        const bar = this.createPlaytimeBar(user);
        playtimeCell.appendChild(bar);

        return playtimeCell;
    }

    createPlaytimeBar(user) {
        const servers = this.parseServersOnline(user.serversOnline);
        let relevantServers = servers;

        if (this.selectedServer !== 'all') {
            relevantServers = servers.filter(s => s.serverName === this.selectedServer);
        }

        const totalTime = relevantServers.reduce((sum, s) => sum + s.totalTime, 0);
        if (totalTime === 0) {
            const emptyBar = document.createElement('div');
            emptyBar.textContent = 'Нет данных';
            return emptyBar;
        }

        const barContainer = document.createElement('div');
        $(barContainer).addClass("playtime-bar-wrapper");
        barContainer.style.width = '100%';

        relevantServers.forEach(s => {
            const pct = ((s.totalTime / totalTime) * 100).toFixed(2);
            const segment = document.createElement('div');
            segment.style.width = `${pct}%`;
            const color = (foxEngine.serversColorMap && foxEngine.serversColorMap[s.serverName]) || '#AAA';
            segment.style.backgroundColor = color;
            segment.title = `${s.serverName}: ${this.formatPlaytimeText(s.totalTime)}`;
            barContainer.appendChild(segment);
        });

        return barContainer;
    }

    createLastSessionCell(user) {
        const cell = document.createElement('td');
        const servers = this.parseServersOnline(user.serversOnline);
        let parsed;

        try {
            parsed = JSON.parse(user.serversOnline || '{}');
        } catch (e) {
            console.error("Ошибка при парсинге JSON:", e);
            cell.textContent = 'Нет данных';
            return cell;
        }

        if (parsed.isPlaying && parsed.playingOn) {
            cell.innerHTML = `<span class="badge badge-success">Играет на ${parsed.playingOn}</span>`;
            return cell;
        }

        const relevant = this.selectedServer === 'all'
            ? servers.reduce((a, b) => (a.lastPlayed > b.lastPlayed ? a : b), { lastSession: 0 })
            : servers.find(s => s.serverName === this.selectedServer);

        const sessionTime = relevant?.lastSession || 0;
        cell.textContent = sessionTime ? this.formatTime(sessionTime) : 'Нет данных';
        return cell;
    }

	createLastLoginCell(user) {
		const cell = document.createElement('td');
		const servers = this.parseServersOnline(user.serversOnline);
		
		const defaultSrv = { lastPlayed: 0 };
		const relevant = this.selectedServer === 'all'
			? servers.reduce((a, b) => ((a.lastPlayed || 0) > (b.lastPlayed || 0) ? a : b), defaultSrv)
			: servers.find(s => s.serverName === this.selectedServer) || defaultSrv;

		let lastPlayed = Number(relevant.lastPlayed) || 0;
		if (lastPlayed > 0 && lastPlayed < 1e12) lastPlayed *= 1000;

		if (!lastPlayed) {
			cell.textContent = 'Нет данных';
			return cell;
		}

		const lastDate = new Date(lastPlayed);
		const now = new Date();
		const msInDay = 24 * 60 * 60 * 1000;
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const diffDays = Math.floor((startOfToday - new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate())) / msInDay);

		const labels = ['Сегодня', 'Вчера', 'Позавчера'];
		const label = labels[diffDays] || null;

		if (label) {
			const timePart = lastDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
			cell.textContent = `${label} в ${timePart}`;
		} else {
			cell.textContent = foxEngine.utils.getFormattedDate(lastPlayed);
		}

		return cell;
	}

    sortAndRenderUsersByServer(server) {
        this.users = this.sortUsersByPlaytime(this.users, server);
        this.renderUsers(this.users);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} мин ${secs} сек`;
    }

	declineWord(number, ...forms) {
		const n = Math.abs(number) % 100;
		const n1 = n % 10;
		if (n > 10 && n < 20) return forms[2];
		if (n1 > 1 && n1 < 5) return forms[1];
		if (n1 === 1) return forms[0];
		return forms[2];
	}

}
