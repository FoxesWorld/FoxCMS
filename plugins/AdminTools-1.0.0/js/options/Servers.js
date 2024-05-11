/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * Этот файл содержит класс Servers, который отвечает за управление серверами в FoxesCraft.
 * Он предоставляет методы для загрузки, отображения и редактирования серверов, а также создания соответствующих форм и элементов ввода.
 * 
 * Authors: FoxesWorld
 * Date: [10.05.24]
 * Version: [1.7.8]
 */
import { JsonArrConfig } from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';

export class Servers {
    constructor() {
        this.initAwait = 600;
        this.servers = [];
        this.versions = [];
        this.serverPictures = [];
        this.javaVersions = [];
        
        this.formFields = [
            { "fieldName": 'host', "fieldType": 'text' },
            { "fieldName": 'port', "fieldType": 'number' },
            { "fieldName": 'ignoreDirs', "fieldType": 'tagify' },
            { "fieldName": 'enabled', "fieldType": 'checkbox' },
            { "fieldName": 'serverDescription', "fieldType": 'textarea' },
            { "fieldName": 'serverVersion', "fieldType": 'dropdown', "optionsArray": this.versions },
            { "fieldName": 'jreVersion', "fieldType": 'dropdown', "optionsArray": this.javaVersions },
            { "fieldName": 'serverImage', "fieldType": 'dropdown', "optionsArray": this.serverPictures }
        ];

        this.serverAttributes = ["modName", "modPicture", "modDesc"];
        this.jsonArrConfig = new JsonArrConfig(this.serverAttributes, this.submitHandler.bind(this));
        this.buildField = new BuildField(this);
        this.dialogOptions = {
            autoOpen: false,
            position: {
                my: 'center',
                at: 'top',
                of: window
            },
            modal: true,
            height: 'auto',
            width: '900',
            resizable: false,
            open: (event, ui) => {}
        };
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
        const serverRowTpl = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/servers/serverRow.tpl', true);

        for (let index = 0; index < servers.length; index++) {
            const server = servers[index];
            let icon;
            if (server.enabled == "true") {
                icon = `<i style="color: green" class="fa-thin fa-check"></i>`;
            } else {
                icon = `<i style="color: red" class="fa-regular fa-xmark-large fa-fw"></i>`;
            }
            const serverHtml = await foxEngine.replaceTextInTemplate(serverRowTpl, {
                index: index + 1,
                serverName: server.serverName,
                serverVersion: server.serverVersion,
                serverDescription: server.serverDescription,
                enabled: icon
            });

            serversList.append(serverHtml);
        }
    }

    async addContent() {
        const adminContent = $("#adminContent");
        adminContent.html(" ");

        if (!adminContent.find("> table").length) {
            const tableHeader = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/servers/serversTable.tpl');
            adminContent.html(tableHeader);
        }
    }

async loadServerOptions(serverName) {
    try {
        await Promise.all([
            this.parseAvailableVersions(),
            this.parseAvailableJava(),
            this.parseAvailablePictures()
        ]);

        setTimeout(async () => {
            try {
                const responses = await this.getServerData(serverName);
                this.createDialogIfNeeded();

                this.formFields.forEach(field => {
                    switch (field.fieldName) {
                        case 'serverVersion':
                            field.optionsArray = this.versions;
                            break;
                        case 'jreVersion':
                            field.optionsArray = this.javaVersions;
                            break;
                        case 'serverImage':
                            field.optionsArray = this.serverPictures;
                            break;
                        default:
                            break;
                    }
                });

                let formHtml = `<form id="serverOptionsForm" method="POST" action="/" autocomplete="false">`;
				formHtml += await this.buildField.buildFormFields(responses);
				console.log(responses);
                formHtml += `
                    <input type="hidden" name="admPanel" value="editServer" />
                    <input type="hidden" name="serverName" value="${serverName}" />
                    <input name="refreshPage" type="hidden" value="false" />
                    <input name="playSound" type="hidden" value="false" />
                    <div class="buttonGroup">
                        <button type="button" id="viewModsInfoBtn" class="btn btn-primary">View Mods Info</button>
                        <button type="submit" class="login">Apply</button>
                    </div>
                </form>`;

                this.jsonArrConfig.loadFormIntoDialog(formHtml, serverName);
                setTimeout(async () => {
					$('#viewModsInfoBtn').click(() => {
						this.jsonArrConfig.openFormWindow(responses[0].modsInfo, responses[0].serverName, {admPanel: "editServer",serverName: serverName});
					});

				const form = document.getElementById("serverOptionsForm");
					form.addEventListener("submit", async (event) => {
						$("#dialog").dialog('close');
						setTimeout(async () => {
							this.parseServers();
							foxEngine.servers.parseOnline();
						}, 500);
					});				
				}, 500);

            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        }, 300);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}


    async submitHandler(button, serverName) {
        let answer = await this.jsonArrConfig.updateJsonConfig("modsInfo");
        button.notify(answer.message, answer.type);
        if (answer.type === "success") {
            setTimeout(() => {
                $("#dialog").dialog('close');
                foxEngine.servers.loadServerPage(serverName);
            }, 500)
        }
    }

    createDialogIfNeeded() {
        if (!$("#dialog").length) {
            $("body").append('<div id="dialog" title="Server Options"></div>');
        }
    }

    async parseAvailableVersions() {
        this.versions = await foxEngine.sendPostAndGetAnswer({
            admPanel: "getGameVersions"
        }, "JSON");
    }

    async parseAvailableJava() {
        this.javaVersions = await foxEngine.sendPostAndGetAnswer({
            admPanel: "getJavaVersions"
        }, "JSON");
    }

    async parseAvailablePictures() {
        this.serverPictures = await foxEngine.sendPostAndGetAnswer({
            admPanel: "getServerPictures"
        }, "JSON");
    }
}
