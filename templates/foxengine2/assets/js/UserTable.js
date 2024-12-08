class UserTable {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.servers = new Set();
        this.selectedServer = '';
        this.users = [];
    }

    async fetchAndDisplayUsers() {
        try {
            const users = await foxEngine.sendPostAndGetAnswer({ "sysRequest": "topPlayers" }, "JSON");

            this.collectServers(users);
            this.updateServerSelect();
            this.users = this.sortUsersByPlaytime(users);
            this.renderUsers(this.users);

        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    }

    collectServers(users) {
        users.forEach(user => {
            const servers = JSON.parse(user.serversOnline).servers;
            servers.forEach(server => {
                this.servers.add(server.server);
            });
        });
    }

    updateServerSelect() {
        const serverSelect = document.getElementById('serverSelect');
        serverSelect.innerHTML = ''; // Clear existing options

        const allOption = this.createOptionElement('', 'Все сервера');
        serverSelect.appendChild(allOption);

        this.servers.forEach(server => {
            const option = this.createOptionElement(server, server);
            serverSelect.appendChild(option);
        });

        serverSelect.addEventListener('change', () => {
            this.selectedServer = serverSelect.value;
            this.sortAndRenderUsersByServer(this.selectedServer);
        });
    }

    createOptionElement(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        return option;
    }

    sortUsersByPlaytime(users) {
        return users.sort((a, b) => this.calculateTotalPlaytime(b.serversOnline) - this.calculateTotalPlaytime(a.serversOnline));
    }

    calculateTotalPlaytime(serversOnline) {
        const servers = JSON.parse(serversOnline).servers;
        return servers.reduce((total, server) => total + server.time * 60, 0);
    }

    async renderUsers(users) {
        this.container.innerHTML = ''; // Clear existing content
        const rows = await Promise.all(users.map((user, index) => this.createUserRow(user, index + 1)));
        rows.forEach(row => this.container.appendChild(row));
    }

    async createUserRow(user, rank) {
        const row = document.createElement('tr');
        row.style.background = `linear-gradient(45deg, #c5c5e19c, ${user.colorScheme})`;

        row.appendChild(this.createRankCell(rank));
        row.appendChild(await this.createPlayerCell(user));
        row.appendChild(this.createPlaytimeCell(user));
        row.appendChild(this.createLastSessionCell(user, this.selectedServer));
        row.appendChild(this.createLastLoginCell(user, this.selectedServer));

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
        const playerDiv = document.createElement('div');
        playerDiv.className = 'd-flex align-items-center';

        const playerInfo = document.createElement('div');
        playerInfo.className = 'flex-shrink-0';

        const playerList = document.createElement('ul');
        playerList.className = 'player-head';

        const profileItem = document.createElement('li');
        const profileLink = document.createElement('a');
        profileLink.href = `#user/${user.login}`;

        const profileImage = document.createElement('img');
        profileImage.className = 'head-image';
        profileImage.alt = user.login;
        profileImage.src = `data:image/png;base64,${await this.fetchPlayerHeadImage(user.login)}`;

        profileLink.appendChild(profileImage);
        profileItem.appendChild(profileLink);

        const nameItem = document.createElement('li');
        const nameLink = document.createElement('a');
        nameLink.href = `#user/${user.login}`;
        nameLink.textContent = user.login;
        nameItem.appendChild(nameLink);

        playerList.appendChild(profileItem);
        playerList.appendChild(nameItem);

        playerInfo.appendChild(playerList);
        playerDiv.appendChild(playerInfo);
        playerCell.appendChild(playerDiv);

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
            console.error(`Error fetching head image for ${login}:`, error);
            return '';
        }
    }

    createPlaytimeCell(user) {
        const playtimeCell = document.createElement('td');
        const totalMinutes = user.totalMinutes !== undefined ? user.totalMinutes : this.calculateTotalPlaytime(user.serversOnline);
        playtimeCell.textContent = this.formatPlaytimeText(totalMinutes);

        const barWrapper = this.createPlaytimeBar(user.serversOnline, totalMinutes);
        playtimeCell.appendChild(barWrapper);

        return playtimeCell;
    }

    formatPlaytimeText(totalMinutes) {
        if (totalMinutes < 1) {
            return `${Math.round(totalMinutes * 60)} ${this.declineWord(Math.round(totalMinutes * 60), ['секунда', 'секунды', 'секунд'])}`;
        } else if (totalMinutes < 60) {
            return `${Math.round(totalMinutes)} ${this.declineWord(Math.round(totalMinutes), ['минута', 'минуты', 'минут'])}`;
        } else {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.round(totalMinutes % 60);
            return `${hours} ${this.declineWord(hours, ['час', 'часа', 'часов'])} и ${minutes} ${this.declineWord(minutes, ['минута', 'минуты', 'минут'])}`;
        }
    }

    createPlaytimeBar(serversOnline, totalMinutes) {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'playtime-bar-wrapper my-1';
        barWrapper.style.width = '100%';

        const servers = JSON.parse(serversOnline).servers;
        const totalServerMinutes = servers.reduce((total, server) => total + server.time * 60, 0);

        servers.forEach(server => {
            const bar = document.createElement('div');
            bar.className = 'playtime-bar';
            bar.style.width = `${(server.time * 60 / totalServerMinutes) * 100}%`;
            bar.style.setProperty('--server-color', this.getServerColor(server.server));
            barWrapper.appendChild(bar);
        });

        return barWrapper;
    }

    createLastSessionCell(user, selectedServer) {
        const lastSessionCell = document.createElement('td');
        const userData = JSON.parse(user.serversOnline);

        const servers = userData.servers;
        const isPlaying = userData.isPlaying;
        
        const lastSessionInfo = selectedServer ? this.getServerSessionInfo(servers, selectedServer, isPlaying) : this.formatSessionInfo(servers[servers.length - 1], isPlaying);
        lastSessionCell.innerHTML = lastSessionInfo;

        return lastSessionCell;
    }

    getServerSessionInfo(servers, serverName, isPlaying) {
        const server = servers.find(s => s.server === serverName);
        return server ? this.formatSessionInfo(server, isPlaying) : 'Нет данных';
    }

    formatSessionInfo(server, isPlaying) {
        if (isPlaying) {
            return '<div class="ms-auto"><span class="badge badge-success">В игре</span></div>';
        } else {
            const seconds = server.lastSessionLength || 0;
            return this.formatTime(seconds);
        }
    }

    formatTime(seconds) {
        if (seconds < 60) {
            return `<div class="session-info">${Math.round(seconds)} ${this.declineWord(Math.round(seconds), ['секунда', 'секунды', 'секунд'])}</div>`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const remSeconds = seconds % 60;
            return `<div class="session-info">${minutes} ${this.declineWord(minutes, ['минута', 'минуты', 'минут'])} и ${remSeconds} ${this.declineWord(remSeconds, ['секунда', 'секунды', 'секунд'])}</div>`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const remMinutes = Math.floor((seconds % 3600) / 60);
            const remSeconds = seconds % 60;
            return `<div class="session-info">${hours} ${this.declineWord(hours, ['час', 'часа', 'часов'])}, ${remMinutes} ${this.declineWord(remMinutes, ['минута', 'минуты', 'минут'])} и ${remSeconds} ${this.declineWord(remSeconds, ['секунда', 'секунды', 'секунд'])}</div>`;
        }
    }

    createLastLoginCell(user, selectedServer) {
        const lastLoginCell = document.createElement('td');

        // Парсим строку JSON из поля user.serversOnline, чтобы получить список серверов
        let servers = JSON.parse(user.serversOnline).servers;

        // Проверяем, что selectedServer передается корректно
        if (!selectedServer) {
            // Если сервер не выбран, то показываем дату последней игры на последнем сервере
            const lastServer = servers[servers.length - 1];  // Получаем последний сервер из списка
            if (lastServer && lastServer.lastPlayed) {
                const lastLoginDate = new Date(lastServer.lastPlayed * 1000); // Преобразуем в миллисекунды
                lastLoginCell.textContent = this.formatLastLoginDate(lastLoginDate);
            } else {
                lastLoginCell.textContent = 'Нет данных';
            }
            return lastLoginCell;
        }

        // Если сервер выбран, ищем соответствующий сервер в списке
        const server = servers.find(s => s.server === selectedServer);
        // Если сервер найден и поле lastPlayed существует
        if (server && server.lastPlayed) {
            const lastLoginDate = new Date(server.lastPlayed * 1000); // Преобразуем в миллисекунды
            lastLoginCell.textContent = this.formatLastLoginDate(lastLoginDate);
        } else {
            lastLoginCell.textContent = 'Нет данных';
        }

        return lastLoginCell;
    }

    formatLastLoginDate(date) {
        const now = new Date();
        const diffTime = now - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const timeString = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (diffDays === 0) {
            return `Сегодня в ${timeString}`;
        } else if (diffDays === 1) {
            return `Вчера в ${timeString}`;
        } else if (diffDays === 2) {
            return `Позавчера в ${timeString}`;
        } else {
            return date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }


    declineWord(number, words) {
        const cases = [2, 0, 1, 1, 1, 2];
        return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    sortAndRenderUsersByServer(server) {
        const filteredUsers = server ? this.users.filter(user => JSON.parse(user.serversOnline).servers.some(s => s.server === server)) : this.users;
        this.renderUsers(filteredUsers);
    }

    getServerColor(server) {
        const colors = {
            "Craftoria": "#3498DB",
			"FurSpace": "#37bbd0",
            "Amber": "#c17d22",
        };
        return colors[server] || '#AAAAAA';
    }
}

