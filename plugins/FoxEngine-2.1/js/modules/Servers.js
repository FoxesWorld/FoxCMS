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
     * Загрузка шаблона с кэшированием.
     */
    async loadTemplateWithCache(path) {
        if (!this.templateCache[path]) {
            try {
                this.templateCache[path] = await this.foxEngine.loadTemplate(path, true);
            } catch (error) {
                console.error(`Error loading template from ${path}:`, error);
                throw error;
            }
        }
        return this.templateCache[path];
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

    /**
     * Парсинг и отображение онлайн серверов.
     */
    async parseOnline() {
        try {
            await this.initializeServers();

            const entryTemplate = await this.loadTemplateWithCache(`${this.foxEngine.elementsDir}monitor/serverEntry.tpl`);
            const totalOnlineTpl = await this.loadTemplateWithCache(`${this.foxEngine.elementsDir}monitor/totalOnline.tpl`);

            const serversHtml = (await Promise.all(
                this.serversArr.map(({ server }) => this.getServerHtml(entryTemplate, server))
            )).join('');

            const parsedJson = await this.foxEngine.sendPostAndGetAnswer({ sysRequest: 'parseMonitor' }, "JSON");
            const totalOnlinePercent = parsedJson.totalPlayersMax > 0
                ? Math.round((parsedJson.totalPlayersOnline / parsedJson.totalPlayersMax) * 100)
                : 0;

            const totalOnlineHtml = await this.foxEngine.replaceTextInTemplate(totalOnlineTpl, {
                totalPlayersOnline: parsedJson.totalPlayersOnline,
                totalPlayersMax: parsedJson.totalPlayersMax,
                percent: totalOnlinePercent,
                todaysRecord: parsedJson.todaysRecord
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

            const pageTemplate = await this.loadTemplateWithCache(`${this.foxEngine.elementsDir}serverPage/serverPage.tpl`);
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

        const template = await this.loadTemplateWithCache(`${this.foxEngine.elementsDir}serverPage/serverMods.tpl`);
        return (await Promise.all(modsInfo.map(mod =>
            this.foxEngine.replaceTextInTemplate(template, {
                modName: mod.modName,
                modPicture: mod.modPicture,
                modDesc: mod.modDesc
            })
        ))).join('');
    }
}
