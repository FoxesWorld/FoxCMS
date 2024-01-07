class Servers {
    constructor(foxEngine) {
		this.foxEngine = foxEngine;
	}
	
	    /* Servers parser */
    async parseOnline() {
        try {
            // Load the template only once
            const entryTemplate = await foxEngine.loadAndReplaceHtml(foxEngine.elementsDir + 'monitor/serverEntry.tpl', {});

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
                        version: obj.version,
                        srvName: obj.serverName,
                        serverName: obj.serverName,
                        playersOnline: playersOnline,
                        playersMax: playersMax,
                        percent: obj.percent,
                        statusClass: isOnline ? 'online' : 'offline',
                        version: obj.version,
                        progressbarClass: progressbarClass
                    }));
                }

                // Wait for all promises to be resolved
                let serversHtmlResults = await Promise.all(serversHtmlPromises);

                // Combine the results into a single string
                let serversHtml = serversHtmlResults.join('');

                // Replace text in the total online template
                const totalOnlineHtml = await foxEngine.loadAndReplaceHtml(foxEngine.elementsDir + 'monitor/totalOnline.tpl', {
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

                // Load the server page template
                const template = await foxEngine.loadAndReplaceHtml(foxEngine.elementsDir + 'serverPage/serverPage.tpl', {
                    serverImage: serverDetails.serverImage,
                    serverDescription: serverDetails.serverDescription,
                    serverName: serverDetails.serverName,
                    serverVersion: serverDetails.serverVersion,
                    mods: await this.loadMods(modsInfo)
                });

                // Append the server page HTML to the container
                foxEngine.loadData(template, replaceData.contentBlock);
            } else {
                console.error('Error: Unable to fetch server details.');
            }
        } catch (error) {
            console.error('Error while loading server page:', error);
        }
    }

    // Function to load mods based on modsInfo
    async loadMods(modsInfo) {
        try {
            if (modsInfo && modsInfo.length > 0) {
                // Load the template only once
                const template = await foxEngine.loadAndReplaceHtml(foxEngine.elementsDir + 'serverPage/serverMods.tpl', {});

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
