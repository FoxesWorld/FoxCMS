class Servers {
    constructor() {
        this.servers = [];
        this.dialogOptions = {
            autoOpen: false,
            position: {
                my: 'center',
                at: 'top',
                of: window
            },
            modal: true,
            height: 'auto',
            width: 600,
            resizable: false,
            open: function(event, ui) {
                // $(".ui-widget-overlay").remove();
                // $(".ui-dialog-titlebar").remove();
            }
        };
		 this.editFields = [
		 'serverVersion',
		 'mainClass',
		 'forgeVersion',
		 'client',
		 'host',
		 'port',
		 'jreVersion',
		 'mcpVersion',
		 'forgeGroup',
		 'ignoreDirs',
		 'modsInfo',
		 'serverImage',
		 'serverDescription'];
    }

	async getServerData(server) {
		let query = {
			sysRequest: "parseServers"
		};

		if (server && server.trim() !== "") {
			query.server = "serverName = '" + server + "'";
		}

		return await foxEngine.sendPostAndGetAnswer(query, "JSON");
	}


    async parseServers() {
        try {
            await this.addContent();
            let servers = await this.getServerData("");

            if (servers.length > 0) {
                await this.displayServers(servers);
            } else {
                const noServersHtml = `<div class="noServers"><h1>No Servers available</h1></div>`;
                foxEngine.page.loadData(noServersHtml, "#adminContent");
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async displayServers(servers) {
        const serversList = $("#serversList");
        serversList.html("");
        let serverRowTpl = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/servers/serverRow.tpl');

        for (let index = 0; index < servers.length; index++) {
            const server = servers[index];
            let serverHtml = await foxEngine.replaceTextInTemplate(serverRowTpl, {
                index: index + 1,
                serverName: server.serverName,
                serverVersion: server.serverVersion,
                serverDescription: server.serverDescription
            });

            serversList.append(serverHtml);
        }
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
        const responses = await this.getServerData(serverName);
        this.createDialogIfNeeded();

        let formHtml = '<form id="serverOptionsForm" method="POST" action="/" autocomplete="false"><h3>Настройки ' + serverName + '</h3>';

        for (const response of responses) {
            for (const key in response) {
                if (response.hasOwnProperty(key) && this.editFields.includes(key)) {
                    formHtml += await this.createInputBlock(key, response[key]);
                }
            }
        }

        formHtml += this.createSubmitButton();
        formHtml += `
            <input type="hidden" name="admPanel" value="editServer" />
            <input name="refreshPage" type="hidden" value="false" />
            <input name="playSound" type="hidden" value="false" />
        </form>`;

        this.loadFormIntoDialog(formHtml);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}


    createDialogIfNeeded() {
        if (!$("#dialog").length) {
            $("body").append('<div id="dialog" title="Server Options"></div>');
        }
    }

    async createInputBlock(key, value) {
        const isTextarea = value.length > 60;
        const inputBlockStyle = isTextarea ? `style="height: ${this.calculateTextareaHeight(value)}px;"` : '';

        return `
            <div class="input_block" ${inputBlockStyle}>
                <label class="label" for="${key}">${key}:</label>
                ${isTextarea ? `<textarea style="height: ${this.calculateTextareaHeight(value)}px;" id="${key}" class="input" name="${key}">${value}</textarea>` :
                    `<input type="text" id="${key}" name="${key}" class="input" value="${value}">`}
            </div>`;
    }

    calculateTextareaHeight(value) {
        // You can adjust this formula based on your preferences
        return Math.max(100, value.length / 2);
    }

    createSubmitButton() {
        return '<button type="submit" class="login">Apply</button>';
    }

    loadFormIntoDialog(formHtml) {
        foxEngine.page.loadData(formHtml, '#dialogContent');
        $("#dialog").dialog(this.dialogOptions);
        $("#dialog").dialog('open');
    }
}

export { Servers };
