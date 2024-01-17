class Servers {
    constructor(foxEngine) {
		this.foxEngine = foxEngine;
		foxEngine.debugSend("Servers init", "background: #c89f27; padding: 5px;");
	}
	
	    /* Servers parser */
    async parseOnline() {
        try {
            // Load the template only once
            const entryTemplate = await foxEngine.loadTemplate(foxEngine.elementsDir + 'monitor/serverEntry.tpl');

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

                    // Push the promise to the array
                    serversHtmlPromises.push(foxEngine.replaceTextInTemplate(entryTemplate, {
                        version: obj.version ? obj.version : "Offline",
                        serverName: obj.serverName,
                        playersOnline: playersOnline,
                        playersMax: playersMax,
                        percent: obj.percent,
                        statusClass: isOnline ? 'online' : 'offline',
                        progressbarClass: progressbarClass
                    }));
                }

                // Wait for all promises to be resolved
                let serversHtmlResults = await Promise.all(serversHtmlPromises);

                // Combine the results into a single string
                let serversHtml = serversHtmlResults.join('');

                // Replace text in the total online template
                const totalOnlineTpl = await foxEngine.loadTemplate(foxEngine.elementsDir + 'monitor/totalOnline.tpl');
				let totalOnlineHtml = await foxEngine.replaceTextInTemplate(totalOnlineTpl, {
                    totalPlayersOnline: parsedJson.totalPlayersOnline,
                    totalPlayersMax: parsedJson.totalPlayersMax,
                    percent: parsedJson.percent,
                    todaysRecord: parsedJson.todaysRecord
                });
				

                // Update the content
                $("#servers").html(serversHtml + totalOnlineHtml);
            } else {
                $("#servers").empty();
            }
        } catch (error) {
            console.error('Error parsing online servers:', error);
        }
    };
	
    // Load server page content
    async loadServerPage(serverName) {
		 const pageTemplate = await foxEngine.loadTemplate(foxEngine.elementsDir + 'serverPage/serverPage.tpl');
        try {
            // Fetch server information
            let server = await foxEngine.sendPostAndGetAnswer({
                sysRequest: "parseServers",
                server: "serverName = '" + serverName + "'"
            }, "JSON");

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
                    mods: await this.loadMods(modsInfo)
                });

                // Append the server page HTML to the container
                foxEngine.page.loadData(page, replaceData.contentBlock);
            } else {
                console.error('Error: Unable to fetch server details.');
            }
        } catch (error) {
            console.error('Error while loading server page:', error);
        }
		location.hash = 'server/' + serverName;
		foxEngine.page.setPage(serverName);
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
                const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'serverPage/serverMods.tpl');

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
                console.error("Couldn't extract server modInfo.");
                return ''; // or handle accordingly
            }
        } catch (error) {
            console.error('Error while loading mods:', error);
            return ''; // or handle accordingly
        }
    }
}
	export { Servers };
