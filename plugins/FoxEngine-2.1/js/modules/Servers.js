export class Servers {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        //foxEngine.debugSend("Servers init", "background: #c89f27; padding: 5px;");
    }

    /* Servers parser */
async parseOnline() {
    try {
        // Загрузка шаблона для серверов
        const entryTemplate = await foxEngine.loadTemplate(foxEngine.elementsDir + 'monitor/serverEntry.tpl', true);

        let parsedJson = await foxEngine.sendPostAndGetAnswer({
            sysRequest: 'parseMonitor'
        }, "JSON");

        if (parsedJson.servers.length > 0) {
            let serversHtmlPromises = [];

            for (const obj of parsedJson.servers) {
                let isOnline = obj.status === "online";
                let progressbarClass = isOnline ? 'progressbar-online' : 'progressbar-offline';
                let playersOnline = isOnline ? obj.playersOnline : 0;
                let playersMax = isOnline ? obj.playersMax : 0;

                let percent = playersMax > 0 ? Math.round((playersOnline / playersMax) * 100) : 0;

                // Если favicon существует, то добавляем его, иначе оставляем пустое значение
                let favicon = obj.favicon ? `<img src="${obj.favicon}" class="serverEntry-icon" alt="${obj.serverName} icon" />` : '';

                // Заменяем шаблон
                serversHtmlPromises.push(foxEngine.replaceTextInTemplate(entryTemplate, {
                    version: obj.version ? obj.version : "Offline",
                    serverName: obj.serverName,
                    playersOnline: playersOnline,
                    playersMax: playersMax,
                    percent: percent,
                    favicon: favicon, // Вставляем иконку или пустое значение
                    statusClass: isOnline ? 'online' : 'offline',
                    progressbarClass: progressbarClass
                }));
            }

            // Ждем, пока все промисы не завершатся
            let serversHtmlResults = await Promise.all(serversHtmlPromises);
            let serversHtml = serversHtmlResults.join('');

            // Загрузка шаблона для отображения общего числа онлайн
            const totalOnlineTpl = await foxEngine.loadTemplate(foxEngine.elementsDir + 'monitor/totalOnline.tpl', true);
            let totalOnlinePercent = parsedJson.totalPlayersMax > 0 
                ? Math.round((parsedJson.totalPlayersOnline / parsedJson.totalPlayersMax) * 100) 
                : 0;

            let totalOnlineHtml = await foxEngine.replaceTextInTemplate(totalOnlineTpl, {
                totalPlayersOnline: parsedJson.totalPlayersOnline,
                totalPlayersMax: parsedJson.totalPlayersMax,
                percent: totalOnlinePercent,
                todaysRecord: parsedJson.todaysRecord
            });

            // Вставляем собранный HTML на страницу
            $("#servers").html(serversHtml + totalOnlineHtml);
        } else {
            // Если серверы не найдены, очищаем блок
            $("#servers").empty();
        }
    } catch (error) {
        console.error('Error parsing online servers:', error);
    }
}


    // Load server page content
    async loadServerPage(serverName) {
		if (serverName === foxEngine.page.selectPage.thisPage || foxEngine.page.selectPage.thisPage === undefined) {
            return;
        }
        const pageTemplate = await foxEngine.loadTemplate(foxEngine.elementsDir + 'serverPage/serverPage.tpl', true);
        try {
            // Fetch server information
            let server = await foxEngine.sendPostAndGetAnswer({
                sysRequest: "parseServers",
                server: "serverName = '" + serverName + "'"
            }, "JSON");
			console.log(server.error);
			if(server.error === undefined) {
				if (server && server.length > 0) {
					let serverDetails = server[0];

					// Fetch modsInfo
					let modsInfo = [];
					if (serverDetails.modsInfo) {
						modsInfo = JSON.parse(serverDetails.modsInfo);
					}

					let page = await foxEngine.replaceTextInTemplate(pageTemplate, {
						serverImage: serverDetails.serverImage,
						serverDescription: serverDetails.serverDescription,
						serverName: serverDetails.serverName,
						serverVersion: serverDetails.serverVersion,
						isSecure: this.secureHtml(serverDetails.checkLib),
						mods: await this.loadMods(modsInfo)
					});

					// Append the server page HTML to the container
					foxEngine.page.loadData(page, replaceData.contentBlock);
				} else {
					console.error('Error: Unable to fetch server details.');
				}
		} else {
			await this.foxEngine.utils.showErrorPage('{"error": "'+server.error+'"}', this.foxEngine.replaceData.contentBlock);
			this.setPage("");
		}
        } catch (error) {
            console.error('Error while loading server page:', error);
        }
        location.hash = 'server/' + serverName;
        foxEngine.page.setPage(serverName);
    }
	
	secureHtml(secure){
		if(secure == "true"){
			return `<div class="security-icon">
        <i class="fas fa-shield-alt"></i>
        <div class="security-text">
            Верифицированные библиотеки
            <span>Библиотеки проходят проверку на валидность</span>
			<a href="#" onclick="foxEngine.page.loadPage('verifiedLibs', replaceData.contentBlock);">Что это значит?</a>
        </div>
    </div>`;
		} else {
			return `<div class="danger-icon">
        <i class="fas fa-exclamation-triangle"></i>
        <div class="danger-text">
            Устаревшие библиотеки
            <span>Используются библиотеки без проверки валидности!</span>
			<a href="#" onclick="foxEngine.page.loadPage('unVerifiedLibs', replaceData.contentBlock);">Что это значит?</a>
        </div>
    </div>`;
		}
	}

    async getServerDetails(serverName) {
        try {
            // Fetch server information
            let server = await foxEngine.sendPostAndGetAnswer({
                sysRequest: "parseServers",
                server: "serverName = '" + serverName + "'"
            }, "JSON");

            return server[0];
        } catch (error) {
            console.error('Error while loading server page:', error);
        }
    }

    // Function to load mods based on modsInfo
	async loadMods(modsInfo) {
		try {
			if (modsInfo && modsInfo.length > 0) {
				// Load the template only once
				const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'serverPage/serverMods.tpl', true);

				// Use Promise.all to execute promises concurrently
				const promises = modsInfo.map(async mod => {
					// Replace text in the template for each mod
					return foxEngine.replaceTextInTemplate(template, {
						modName: mod.modName,
						modPicture: mod.modPicture,
						modDesc: mod.modDesc
					});
				});

				// Wait for all promises to resolve
				const modsHtmlArray = await Promise.all(promises);

				// Concatenate the results
				return modsHtmlArray.join('');
			} else {
				return `<p class="alert alert-warning" role="alert">
				 На данный момент модов нет!
				</p>`;
			}
		} catch (error) {
			console.error('Error while loading mods:', error);
			return ''; // Return empty string in case of an error
		}
	}

}