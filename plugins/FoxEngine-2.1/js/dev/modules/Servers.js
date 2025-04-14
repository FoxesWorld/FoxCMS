export class Servers {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.serversArr = [];
        this.templateCache = {};
        this.isInitialized = false;
    }

    /**
     * Инициализация массива серверов.
     */
    async initializeServers() {
        if (this.isInitialized) return;

        try {
            const parsedJson = await this.foxEngine.sendPostAndGetAnswer({ sysRequest: 'parseMonitor' }, "JSON");
            if (parsedJson.servers?.length > 0) {
                this.serversArr = parsedJson.servers.map(server => ({
                    serverName: server.serverName,
                    server
                }));
                this.isInitialized = true;
            }
        } catch (error) {
            console.error('Error initializing servers:', error);
        }
    }
	
    /**
     * Генерация HTML для иконки сервера.
     */
    getFaviconHtml(favicon, serverName) {
        return favicon
            ? `<img src="${favicon}" class="serverEntry-icon" alt="${serverName} icon" />`
            : '';
    }

    /**
     * Генерация HTML для сервера.
     */
    async getServerHtml(template, server) {
        const isOnline = server.status === "online";
        const playersOnline = isOnline ? server.playersOnline : 0;
        const playersMax = isOnline ? server.playersMax : 0;
        const percent = playersMax > 0 ? Math.round((playersOnline / playersMax) * 100) : 0;

        return this.foxEngine.replaceTextInTemplate(template, {
            version: server.version || "Offline",
            serverName: server.serverName,
            playersOnline,
            playersMax,
            percent,
            favicon: this.getFaviconHtml(server.favicon, server.serverName),
            statusClass: isOnline ? 'online' : 'offline',
            progressbarClass: isOnline ? 'progressbar-online' : 'progressbar-offline'
        });
    }

async parseOnline() {
    try {
        await this.initializeServers();

        const updatedData = await this.foxEngine.sendPostAndGetAnswer({ sysRequest: 'parseMonitor' }, "JSON");
        if (updatedData.servers?.length > 0) {
            updatedData.servers.forEach(newServerData => {
                const existingServer = this.serversArr.find(({ serverName }) => serverName === newServerData.serverName);

                if (existingServer) {
                    Object.assign(existingServer.server, newServerData);
                } else {
                    this.serversArr.push({ serverName: newServerData.serverName, server: newServerData });
                }
            });
        }

        const entryTemplate = this.foxEngine.templateCache["serverEntry"];
        const totalOnlineTpl = this.foxEngine.templateCache["totalOnline"];

        const serversHtml = (await Promise.all(
            this.serversArr.map(({ server }) => this.getServerHtml(entryTemplate, server))
        )).join('');

        const totalOnlinePercent = updatedData.totalPlayersMax > 0
            ? Math.round((updatedData.totalPlayersOnline / updatedData.totalPlayersMax) * 100)
            : 0;

        const totalOnlineHtml = await this.foxEngine.replaceTextInTemplate(totalOnlineTpl, {
            totalPlayersOnline: updatedData.totalPlayersOnline,
            totalPlayersMax: updatedData.totalPlayersMax,
            percent: totalOnlinePercent,
            todaysRecord: updatedData.todaysRecord
        });

        $("#servers").html(serversHtml + totalOnlineHtml);
    } catch (error) {
        console.error('Error parsing online servers:', error);
    }
}


    /**
     * Получение объекта сервера по имени.
     */
    getServerByName(serverName) {
        return this.serversArr.find(({ serverName: name }) => name === serverName)?.server || null;
    }

    /**
     * Загрузка страницы сервера.
     */
    async loadServerPage(serverName) {
        if (serverName === this.foxEngine.page.selectPage.thisPage) return;

        try {
            await this.initializeServers();

            const serverObject = this.getServerByName(serverName);
            if (!serverObject) {
                console.error('Server not found:', serverName);
                return;
            }

            const pageTemplate = this.foxEngine.templateCache["serverPage"];
            const serverDetails = await this.foxEngine.sendPostAndGetAnswer({
                sysRequest: "parseServers",
                server: `serverName = '${serverName}'`
            }, "JSON");

            if (serverDetails.error) {
                await this.foxEngine.utils.showErrorPage(`{"error": "${serverDetails.error}"}`, this.foxEngine.replaceData.contentBlock);
                this.foxEngine.page.setPage("");
                return;
            }

            const modsInfo = serverDetails[0]?.modsInfo ? JSON.parse(serverDetails[0].modsInfo) : [];
            const pageHtml = await this.foxEngine.replaceTextInTemplate(pageTemplate, {
                favicon: this.getFaviconHtml(serverObject.favicon, serverName),
                serverImage: serverDetails[0].serverImage,
                serverDescription: serverDetails[0].serverDescription,
                serverName: serverDetails[0].serverName,
                serverVersion: serverDetails[0].serverVersion,
                isSecure: this.getSecureHtml(serverDetails[0].checkLib),
                mods: await this.loadMods(modsInfo)
            });

            this.foxEngine.page.loadData(pageHtml, this.foxEngine.replaceData.contentBlock);
            this.foxEngine.page.setPage(serverName);
            location.hash = `server/${serverName}`;
        } catch (error) {
            console.error('Error loading server page:', error);
        }
    }

    /**
     * Генерация HTML для статуса безопасности.
     */
    getSecureHtml(secure) {
        const statusClass = secure === "true" ? 'security' : 'danger';
        const message = secure === "true"
            ? 'Верифицированные библиотеки. Библиотеки проходят проверку на валидность.'
            : 'Устаревшие библиотеки. Используются библиотеки без проверки валидности!';
        return `
            <div class="${statusClass}-icon">
                <i class="fas ${secure === "true" ? 'fa-shield-alt' : 'fa-exclamation-triangle'}"></i>
                <div class="${statusClass}-text">
                    ${message}
                    <a href="#" onclick="foxEngine.page.loadPage('${secure === "true" ? 'verifiedLibs' : 'unVerifiedLibs'}', replaceData.contentBlock);">Что это значит?</a>
                </div>
            </div>`;
    }

    /**
     * Загрузка модов.
     */
    async loadMods(modsInfo) {
        if (!modsInfo || modsInfo.length === 0) {
            return `<p class="alert alert-warning" role="alert">На данный момент модов нет!</p>`;
        }

        const template = this.foxEngine.templateCache["serverMods"];
        return (await Promise.all(modsInfo.map(mod =>
            this.foxEngine.replaceTextInTemplate(template, {
                modName: mod.modName,
                modPicture: mod.modPicture,
                modDesc: mod.modDesc
            })
        ))).join('');
    }
}
