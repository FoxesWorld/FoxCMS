class Servers {
    constructor() {
        this.servers = [];
    }

    async parseServers() {
        try {
            await this.addContent(); // Corrected method call

            let servers = await foxEngine.sendPostAndGetAnswer({
                sysRequest: "parseServers"
            }, "JSON");

            if (servers.length > 0) {
                await this.displayServers(servers); // Corrected method call
            } else {
                const noServersHtml = `<div class="noServers"><h1>No Servers available</h1></div>`;
                foxEngine.loadData(noServersHtml, "#adminContent");
            }

        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async displayServers(servers) {
        const serversList = $("#serversList");
        serversList.html("");
        let serverRowTpl = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/servers/serverRow.tpl');

        servers.forEach(async (server, index) => { // Added async to handle asynchronous template loading
            let serverHtml = await foxEngine.replaceTextInTemplate(serverRowTpl, { // Corrected variable name
                index: index + 1, // Corrected index value
                serverName: server.serverName, // Corrected property access
                serverVersion: server.serverVersion, // Corrected property access
                serverDescription: server.serverDescription // Corrected property access
            });

            serversList.append(serverHtml);
        });
    }

    async addContent() {
        const adminContent = $("#adminContent");
        adminContent.html(" ");

        if (!adminContent.find("> table").length) {
            let tableHeader = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/servers/serversTable.tpl');
            adminContent.html(tableHeader);
        }
    }
	
	async loadServerOptions(serverName) {
        try {
            let response = await foxEngine.sendPostAndGetAnswer({
                sysRequest: "loadServerOptions",
                serverName: serverName
            }, "HTML");

            const dialogContent = response.getElementById('view');

            // Check if the dialog already exists, if not create one
            if (!$("#dialog").length) {
                $("body").append('<div id="dialog" title="Server Options"></div>');
            }

            // Load the dialog content and open the dialog
            foxEngine.page.loadData(dialogContent, '#dialogContent');
            $("#dialog").dialog(dialogOptions);
            $("#dialog").dialog('open');
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
}

	export { Servers };
