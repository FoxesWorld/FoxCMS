// serverPageModule.js

import { RequestModule } from './RequestModule.js'; // Assuming the correct path to requestModule.js
import { UIModule } from './UIModule.js'; // Assuming the correct path to uiModule.js

const ServerPageModule = (function () {

    // Private variables
    const elementsDir = replaceData.assets + "elements/";

    // Private helper functions

    // Other private helper methods can be added here

    // Public methods

    // Function to load server page content
    async function loadServerPage(serverName) {
        try {
            // Fetch server information
            let server = await RequestModule.sendPostAndGetAnswer({
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
                const template = await UIModule.loadAndReplaceHtml(elementsDir + 'serverPage/serverPage.tpl', {
                    serverImage: serverDetails.serverImage,
                    serverDescription: serverDetails.serverDescription,
                    serverName: serverDetails.serverName,
                    serverVersion: serverDetails.serverVersion,
                    mods: await loadMods(modsInfo)
                });

                // Append the server page HTML to the container
                UIModule.loadData(template, replaceData.contentBlock);
            } else {
                console.error('Error: Unable to fetch server details.');
            }
        } catch (error) {
            console.error('Error while loading server page:', error);
        }
    }

    // Function to load mods based on modsInfo
    async function loadMods(modsInfo) {
        try {
            if (modsInfo && modsInfo.length > 0) {
                // Load the template only once
                const template = await UIModule.loadAndReplaceHtml(elementsDir + 'serverPage/serverMods.tpl', {});

                // Use Promise.all to execute promises concurrently
                const promises = modsInfo.map(async mod => {
                    // Replace text in the template for each mod
                    return UIModule.replaceTextInTemplate(template, {
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

    // Exported methods
    return {
        loadServerPage,
        // ... (export other ServerPage-related functions)
    };

})();

export { ServerPageModule };
