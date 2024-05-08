/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * Этот файл содержит класс Servers, который отвечает за управление серверами в FoxesCraft.
 * Он предоставляет методы для загрузки, отображения и редактирования серверов, а также создания соответствующих форм и элементов ввода.
 * 
 * Authors: FoxesWorld
 * Date: [08.05.24]
 * Version: [1.2.2]
 */
import {
    JsonArrConfig
} from '../modules/JsonArrConfig.js';

export class Servers {
    constructor() {
        this.servers = [];
        this.versions = [];
		this.serverPictures = [];
        this.javaVersions = [];
        this.jsonArrConfig = new JsonArrConfig({
            admPanel: "editServer"
        });
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
            open: (event, ui) => {
                // $(".ui-widget-overlay").remove();
                // $(".ui-dialog-titlebar").remove();
            }
        };
        this.editFields = [
            'serverVersion',
            'host',
            'port',
            'jreVersion',
            'ignoreDirs',
            'serverImage',
            'enabled',
            'serverDescription'
        ];
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
    await Promise.all([
        this.parseAvailableVersions(),
        this.parseAvailableJava(),
        this.parseAvailablePictures()
    ]);

    try {
        const responses = await this.getServerData(serverName);
        this.createDialogIfNeeded();

        let formHtml = `<form id="serverOptionsForm" method="POST" action="/" autocomplete="false">`;

        for (const response of responses) {
            for (const key in response) {
                if (response.hasOwnProperty(key) && this.editFields.includes(key)) {
                    if (response[key] !== null) {
                        formHtml += await this.createInputBlock(key, response[key], serverName);
                    } else {
                        formHtml += await this.createInputBlock(key, "", serverName);
                    }
                }
            }
        }

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
        setTimeout(() => {
            $('#viewModsInfoBtn').click(() => {
                this.jsonArrConfig.openModsInfoWindow(responses[0].modsInfo, responses[0].serverName);
            });
        }, 1000);

    } catch (error) {
        console.error('An error occurred:', error.message);
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

    createInputBlock(key, value, serverName) {
        const inputHandlers = {
            'host': () => this.createTextInput(key, value, 'text'),
            'port': () => this.createTextInput(key, value, 'number'),
            'ignoreDirs': () => this.createTextInput(key, value, 'text'),
            'serverImage': () => this.createDropdown(key, value, this.serverPictures),
            'enabled': () => this.createCheckboxInput(key, value, serverName),
            'serverVersion': () => this.createDropdown(key, value, this.versions),
            'jreVersion': () => this.createDropdown(key, value, this.javaVersions),
            'serverDescription': () => this.createTextareaInput(key, value),
        };

        const handler = inputHandlers[key];
        if (handler) {
            return handler();
        } else {
            console.error(`Unknown input type for key: ${key}`);
            return '';
        }
    }

    createTextInput(key, value, type) {
        return `
            <div class="input_block">
                <label class="label" for="${key}">${key}:</label>
                <input type="${type}" id="${key}" name="${key}" class="input" value="${value}">
            </div>`;
    }

    createCheckboxInput(key, value, serverName) {
        const isChecked = value === "true" ? 'checked' : '';
        const inputBlock = `
			<div class="input_block">
				<input type="checkbox" id="${key}" name="${key}" class="input ${serverName}-${key}" ${isChecked}>
				<label class="label" for="${key}">${key}:</label>
			</div>`;

        setTimeout(() => {
            new Switchery(document.querySelector("." + serverName + "-" + key));
        }, 800);

        return inputBlock;
    }


    createTextareaInput(key, value) {
        const textareaId = `${key}_textarea`;
        const inputBlock = `
        <div class="input_block">
            <label class="label d-none" for="${textareaId}">${key}:</label>
            <textarea id="${textareaId}" name="${key}" class="input d-none">${value}</textarea>
        </div>`;

        setTimeout(() => {
            const textarea = document.getElementById(textareaId);
            const parent = textarea.parentNode;
            const editor = CodeMirror.fromTextArea(textarea, {
				value: value,
                mode: "htmlmixed",
                lineNumbers: false,
                theme: "default",
                viewportMargin: Infinity,
                lineWrapping: true
			});
            editor.setSize("100%", "auto");
            window.addEventListener('resize', () => editor.setSize("100%", "auto"));
			editor.refresh();
        }, 800);

        return inputBlock;
    }


	createDropdown(key, value, optionsArray) {
		let selectOptions = '';
		optionsArray.forEach(option => {
			let displayValue = option;
			if (option.includes('/')) {
				displayValue = option.split('/').pop(); // Get the last element after splitting by '/'
			}
			const isSelected = option === value ? 'selected' : '';
			selectOptions += `<option value="${option}" ${isSelected}>${displayValue}</option>`;
		});

		return `
			<div class="input_block">
				<label class="label" for="${key}">${key}:</label>
				<select name="${key}" id="${key}" class="input">
					${selectOptions}
				</select>
			</div>`;
	}

	
	/*

    createTagifyInput(key, value, serverName) {
        const inputBlock = `
        <div class="input_block">
            <label class="label" for="${key}">${key}:</label>
            <input type="text" id="${key}" name="${key}" class="input ${serverName}-tagify" value="${value}">
        </div>`;

        setTimeout(() => {
            const input = document.querySelector('.' + serverName + '-tagify');
            if (!input) {
                console.error(`Input element with id "${key}" not found.`);
                return;
            }

            const tagify = new Tagify(input, {
                mode: 'mix',
                delimiters: ',',
                originalInputValueFormat: (valuesArr) => valuesArr.map(tag => tag.value).join(','), // Форматируем значения через запятую
                callbacks: {
                    input: (e) => {
                        e.target.setCustomValidity('');
                    },
                    add: (e) => {
                        input.value = e.detail.tagify.value.map(tag => tag.value).join(','); // Обновляем значение в input
                    },
                    remove: (e) => {
                        input.value = e.detail.tagify.value.map(tag => tag.value).join(','); // Обновляем значение в input
                    }
                }
            });
        }, 800);

        return inputBlock;
    }
	*/
}