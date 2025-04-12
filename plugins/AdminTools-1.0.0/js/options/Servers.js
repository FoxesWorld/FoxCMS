/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * Этот файл содержит класс Servers, который отвечает за управление серверами в FoxesCraft.
 * Он предоставляет методы для загрузки, отображения и редактирования серверов, а также создания соответствующих форм и элементов ввода.
 * 
 * Authors: FoxesWorld
 * Date: [10.05.24]
 * Version: [1.8.8]
 */
import { EditServer } from './serverOptions/EditServer.js'; 

export class Servers {
    constructor(adminPanel) {
		this.adminPanel = adminPanel;
		this.editServer = new EditServer(this);
    }

    async getServerData(server) {
        const query = {
            admPanel: "parseServers"
        };

        if (server && server.trim() !== "") {
            query.server = `serverName = '${server}'`;
        }

        return await foxEngine.sendPostAndGetAnswer(query, "JSON");
    }

    async parseServers() {
        try {
            const servers = await this.getServerData("");

            if (servers.length > 0) {
                await this.displayServers(servers);
            } else {
                const noServersHtml = this.adminPanel.templateCache["noServers"];
                foxEngine.page.loadData(noServersHtml, "#adminContent");
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

	async displayServers(servers) {
		const serversList = $("#serversList");
		serversList.html("");
		const serverRowTpl = this.adminPanel.templateCache["serverRow"];

		for (let index = 0; index < servers.length; index++) {
			const server = servers[index];
			let icon;
			if (server.enabled == "true") {
				icon = `<i style="color: green" class="fa-thin fa-check"></i>`;
			} else {
				icon = `<i style="color: red" class="fa-regular fa-xmark-large fa-fw"></i>`;
			}
			const serverHtml = await foxEngine.replaceTextInTemplate(serverRowTpl, {
				index: server.id, //index + 1
				serverName: server.serverName,
				serverVersion: server.serverVersion,
				serverVstyle: server.serverVersion.split('-')[0].replaceAll('.', ''),
				serverDescription: server.serverDescription,
				enabled: icon,
				serverGroups: server.serverGroups
			});

			serversList.append(serverHtml);
		}
			$('.editServerButt').click((event) => {
				const serverName = $(event.currentTarget).attr('data-serverName');
				this.editServer.loadServerOptions(serverName);
			});

			$('.deleteServerButt').click((event) => {
				const serverName = $(event.currentTarget).attr('data-serverName');
				this.editServer.deleteServer(serverName);
			});
	}

    async addContent() {
        const adminContent = $("#adminContent");
        adminContent.html(" ");

        if (!adminContent.find("> table").length) {
            const tableHeader = this.adminPanel.templateCache["serversTable"];
            adminContent.html(tableHeader);
        }
    }
}