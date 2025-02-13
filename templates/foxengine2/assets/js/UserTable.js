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

            response.forEach(server => {
                this.availableServers.add(server.serverName);
            });
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
        option.textContent = this.availableServers.has(value) || value === 'all' ? text : `${text} (Закрыт)`;
        return option;
    }

    /**
     * Парсит JSON-строку с данными серверов и возвращает массив объектов.
     * Ожидаемый формат JSON:
     * {
     *   "isPlaying": boolean,
     *   "playingOn": string,
     *   "servers": {
     *       "serverName1": {
     *           "totalTime": number,
     *           "startTimestamp": number,
     *           "lastUpdated": number,
     *           "lastSession": number,
     *           "lastPlayed": number
     *       },
     *       ...
     *   }
     * }
     */
    parseServersOnline(serversOnline) {
        try {
            const data = JSON.parse(serversOnline);
            return Object.entries(data.servers).map(([serverName, serverData]) => ({
                serverName,
                totalTime: serverData.totalTime || 0,
                lastUpdated: serverData.lastUpdated,
                lastSession: serverData.lastSession || 0,
                lastPlayed: serverData.lastPlayed,
            }));
        } catch (error) {
            console.error("Ошибка при парсинге серверов онлайн:", error);
            return [];
        }
    }

    sortUsersByPlaytime(users, selectedServer) {
        return users.sort((a, b) =>
            this.calculateTotalPlaytime(b.serversOnline, selectedServer) -
            this.calculateTotalPlaytime(a.serversOnline, selectedServer)
        );
    }

	calculateTotalPlaytime(serversOnline, selectedServer) {
		const servers = this.parseServersOnline(serversOnline);
		// Функция преобразования: приводим к "настоящим" секундам
		const convertTime = time => time / 60; // корректировка в 60 раз
		
		if (selectedServer === 'all') {
			return servers.reduce((total, server) => total + convertTime(server.totalTime || 0), 0);
		} else {
			const server = servers.find(s => s.serverName === selectedServer);
			return server ? convertTime(server.totalTime) : 0;
		}
	}


    async renderUsers(users) {
        this.container.innerHTML = '';
        const rows = await Promise.all(users.map((user, index) => this.createUserRow(user, index + 1)));
        rows.forEach(row => row && this.container.appendChild(row));
    }

    async createUserRow(user, rank) {
        const servers = this.parseServersOnline(user.serversOnline);
        if (this.selectedServer !== 'all' && !servers.some(server => server.serverName === this.selectedServer)) {
            return null;
        }

        const row = document.createElement('tr');
        row.style.background = `linear-gradient(45deg, #c5c5e19c, ${user.colorScheme})`;

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
        playerCell.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                    <ul class="player-head">
                        <li>
                            <a href="#user/${user.login}">
                                <img class="head-image" src="data:image/png;base64,${headImage}" alt="${user.login}">
                            </a>
                        </li>
                        <li>
                            <a href="#user/${user.login}">${user.login}</a>
                        </li>
                    </ul>
                </div>
            </div>`;
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
        playtimeCell.textContent = this.formatPlaytimeText(totalSeconds);
        return playtimeCell;
    }

    /**
     * Форматирует общее время игры так, чтобы учитывались часы, минуты и секунды.
     * Например, 80 секунд будет отображено как "1 минута 20 секунд".
     *
     * @param {number} totalSeconds Общее число секунд.
     * @return {string} Отформатированное строковое представление времени.
     */
    formatPlaytimeText(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        let parts = [];
        if (hours > 0) {
            parts.push(`${hours} ${this.declineWord(hours, ['час', 'часа', 'часов'])}`);
        }
        if (minutes > 0) {
            parts.push(`${minutes} ${this.declineWord(minutes, ['минута', 'минуты', 'минут'])}`);
        }
        if (seconds > 0) {
            parts.push(`${seconds} ${this.declineWord(seconds, ['секунда', 'секунды', 'секунд'])}`);
        }
        return parts.join(' ') || `0 ${this.declineWord(0, ['секунда', 'секунды', 'секунд'])}`;
    }

    createLastSessionCell(user) {
        const lastSessionCell = document.createElement('td');
        let serversOnline;
        try {
            serversOnline = JSON.parse(user.serversOnline);
        } catch (error) {
            console.error("Ошибка при парсинге JSON в createLastSessionCell:", error);
            lastSessionCell.textContent = 'Нет данных';
            return lastSessionCell;
        }

        const servers = this.parseServersOnline(user.serversOnline);

        // Если пользователь сейчас играет, выводим соответствующий бейдж
        if (serversOnline.isPlaying && serversOnline.playingOn) {
            lastSessionCell.innerHTML = `<span class="badge badge-success">Играет на ${serversOnline.playingOn}</span>`;
        } else if (this.selectedServer === 'all') {
            // Для всех серверов: находим сервер с максимальным значением lastPlayed
            if (servers.length > 0) {
                const mostRecentServer = servers.reduce((prev, curr) => (prev.lastPlayed > curr.lastPlayed ? prev : curr));
                const lastSessionLength = mostRecentServer.lastSession;
                lastSessionCell.textContent = lastSessionLength
                    ? this.formatTime(parseInt(lastSessionLength, 10))
                    : 'Нет данных';
            } else {
                lastSessionCell.textContent = 'Нет данных';
            }
        } else {
            // Для выбранного конкретного сервера
            const selectedServer = servers.find(server => server.serverName === this.selectedServer);
            const lastSessionLength = selectedServer ? selectedServer.lastSession : 0;
            lastSessionCell.textContent = lastSessionLength
                ? this.formatTime(parseInt(lastSessionLength, 10))
                : 'Нет данных';
        }

        return lastSessionCell;
    }

    createLastLoginCell(user) {
        const lastLoginCell = document.createElement('td');
        const servers = this.parseServersOnline(user.serversOnline);
        if (servers.length > 0) {
            // Находим сервер с наибольшим значением lastPlayed
            const mostRecentServer = servers.reduce((prev, curr) => (prev.lastPlayed > curr.lastPlayed ? prev : curr));
            if (mostRecentServer && mostRecentServer.lastPlayed) {
                const lastLoginDate = new Date(mostRecentServer.lastPlayed * 1000);
                lastLoginCell.textContent = this.formatLastLoginDate(lastLoginDate);
            } else {
                lastLoginCell.textContent = 'Нет данных';
            }
        } else {
            lastLoginCell.textContent = 'Нет данных';
        }
        return lastLoginCell;
    }

    /**
     * Функция форматирования времени (аналогична formatPlaytimeText).
     */
    formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        let parts = [];
        if (hours > 0) {
            parts.push(`${hours} ${this.declineWord(hours, ['час', 'часа', 'часов'])}`);
        }
        if (minutes > 0) {
            parts.push(`${minutes} ${this.declineWord(minutes, ['минута', 'минуты', 'минут'])}`);
        }
        if (seconds > 0) {
            parts.push(`${seconds} ${this.declineWord(seconds, ['секунда', 'секунды', 'секунд'])}`);
        }
        return parts.join(' ') || `0 ${this.declineWord(0, ['секунда', 'секунды', 'секунд'])}`;
    }

    formatLastLoginDate(date) {
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const timeString = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        if (diffDays === 0) {
            return `Сегодня в ${timeString}`;
        } else if (diffDays === 1) {
            return `Вчера в ${timeString}`;
        } else {
            return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    }

    declineWord(number, declensions) {
        const cases = [2, 0, 1, 1, 1, 2];
        return declensions[
            (number % 100 > 4 && number % 100 < 20) ? 2 :
            cases[(number % 10 < 5) ? number % 10 : 5]
        ];
    }

    sortAndRenderUsersByServer(selectedServer) {
        const sortedUsers = this.sortUsersByPlaytime(this.users, selectedServer);
        this.renderUsers(sortedUsers);
    }
}
