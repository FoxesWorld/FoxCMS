/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * Этот файл содержит класс Servers, который отвечает за управление серверами в FoxesCraft.
 * Он предоставляет методы для загрузки, отображения и редактирования серверов, а также создания соответствующих форм и элементов ввода.
 * 
 * Authors: FoxesWorld
 * Date: [16.04.25]
 * Version: [1.9.8]
 */
import { EditServer } from './serverOptions/EditServer.js';
import { AddServer } from './serverOptions/AddServer.js';

export class Servers {
    constructor(adminPanel) {
        this.adminPanel = adminPanel;

        this.formFields = [
            { fieldName: 'host', fieldType: 'text' },
            { fieldName: 'port', fieldType: 'number' },
            { fieldName: 'ignoreDirs', fieldType: 'tagify' },
            { fieldName: 'enabled', fieldType: 'checkbox' },
            { fieldName: 'checkLib', fieldType: 'checkbox' },
            { fieldName: 'serverGroups', fieldType: 'tagify' },
            { fieldName: 'serverDescription', fieldType: 'textarea' },
            { fieldName: 'serverVersion', fieldType: 'dropdown', optionsArray: this.versions },
            { fieldName: 'jreVersion', fieldType: 'dropdown', optionsArray: this.javaVersions },
            { fieldName: 'serverImage', fieldType: 'dropdown', optionsArray: this.serverPictures }
        ];

        this.editServer = new EditServer(this);
        this.addServer = new AddServer(this);
    }

    async parseAllServers() {
        const serverData = await this.getServerData("");
        return serverData.map(server => server.serverName);
    }

    async getServerData(server) {
        const query = { admPanel: "parseServers" };
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
        const $serversList = $("#serversList");
        $serversList.empty();

        const serverRowTpl = this.adminPanel.templateCache["serverRow"];

        for (const server of servers) {
            const isEnabled = String(server.enabled).toLowerCase() === "true";
            const icon = isEnabled
                ? `<i style="color: green" class="fa-thin fa-check"></i>`
                : `<i style="color: red" class="fa-regular fa-xmark-large fa-fw"></i>`;

            const serverVstyle = server.serverVersion
                ? server.serverVersion.split('-')[0].replaceAll('.', '')
                : '';

            const serverHtml = await foxEngine.replaceTextInTemplate(serverRowTpl, {
                index: server.id,
                serverName: server.serverName,
                serverVersion: server.serverVersion,
                serverVstyle,
                serverDescription: server.serverDescription,
                enabled: icon,
                serverGroups: server.serverGroups
            });

            $serversList.append(serverHtml);
        }

        this.bindServerEvents();
    }

    bindServerEvents() {
        $("#serversList")
            .off('click', '.editServerButt')
            .on('click', '.editServerButt', (event) => {
                const serverName = $(event.currentTarget).data('servername');
                this.editServer.loadServerOptions(serverName);
            });

        $("#serversList")
            .off('click', '.deleteServerButt')
            .on('click', '.deleteServerButt', (event) => {
                const $target = $(event.currentTarget);
                const serverName = $target.data('servername');
                const serverId = $target.data('serverid');

                const confirmationMessage = `Вы уверены, что хотите удалить сервер <b>${serverName}</b>?`;
                if (foxEngine.confirmDialog) {
                    foxEngine.confirmDialog(
                        confirmationMessage,
                        async () => {
                            this.editServer.deleteServer(serverId);
                        },
                        {
                            title: "Подтверждение удаления",
                            confirmText: "Удалить",
                            cancelText: "Отмена"
                        }
                    );
                } else if (confirm(`Удалить сервер ${serverName}?`)) {
                    this.editServer.deleteServer(serverId);
                }
            });

        $("#addServerButton")
            .off('click')
            .on('click', () => {
                this.addServer.openAddServerDialog();
            });
    }

    async addContent() {
        const $adminContent = $("#adminContent");
        $adminContent.empty();

        if (!$adminContent.children('table').length) {
            const tableHeader = this.adminPanel.templateCache["serversTable"];
            $adminContent.html(tableHeader);
        }
    }
}
