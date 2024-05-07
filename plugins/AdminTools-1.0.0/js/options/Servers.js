import { JsonArrConfig } from '../modules/JsonArrConfig.js';

export class Servers {
    constructor() {
        this.servers = [];
		this.versions = [];
		this.jsonArrConfig = new JsonArrConfig({admPanel: "editServer"});
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
			if(server.enabled == "true") {
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
	this.parseAvailableVersions();
    try {	
        const responses = await this.getServerData(serverName);
        this.createDialogIfNeeded();
		console.log(this.versions); //Parsing versions to create a drop box

        let formHtml = `<form id="serverOptionsForm" method="POST" action="/" autocomplete="false">`;

        for (const response of responses) {
            for (const key in response) {
				if (response.hasOwnProperty(key) && this.editFields.includes(key)) {
					if(response[key] !== null) {	
						formHtml += await this.createInputBlock(key, response[key]);
					} else {
						formHtml += await this.createInputBlock(key, "");
					}
				}
            }
        }

        formHtml += `
            <input type="hidden" name="admPanel" value="editServer" />
			<input type="hidden" name="serverName" value="`+serverName+`" />
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
	
	async parseAvailableVersions(){
		this.versions = await foxEngine.sendPostAndGetAnswer({admPanel: "getGameVersions"}, "JSON");
	}

    createInputBlock(key, value) {
		
        const isTextarea = value.length > 60;
        const inputBlockStyle = isTextarea ? `style="height: ${this.calculateTextareaHeight(value)}px;"` : '';

        return `
            <div class="input_block" ${inputBlockStyle}>
                <label class="label" for="${key}">${key}:</label>
                ${isTextarea ? `<textarea style="height: ${this.calculateTextareaHeight(value)}px;" id="${key}" class="input" name="${key}">${value}</textarea>` :
                    `<input type="text" id="${key}" name="${key}" class="input" value="${value}">`}
            </div>`;
    }
	
	createInputBlock(key, value) {
    let inputElement;
	//new Switchery(document.querySelector(".switch-'.$counter.'"))

    switch (key) {
        case 'host':
        case 'port':
        case 'jreVersion':
        case 'ignoreDirs':
        case 'serverImage':
            inputElement = `<input type="text" id="${key}" name="${key}" class="input" value="${value}">`;
            break;

		case 'enabled':
			const isChecked = value === "true" ? 'checked' : '';
			inputElement = `
				<input type="checkbox" id="${key}" name="${key}" class="input" ${isChecked}>
				<label class="label" for="${key}">${key}:</label>
			`;

			//new Switchery($('#'+key));
			break;
			
		case 'serverVersion':
			let selectOptions = '';
			this.versions.forEach(version => {
				const isSelected = version === value ? 'selected' : '';
				selectOptions += `<option value="${version}" ${isSelected}>${version}</option>`;
			});

			inputElement = `
				<select name="${key}" id="versionSelect">
					${selectOptions}
				</select>
			`;
			break;



        case 'serverDescription':
            inputElement = `
                <textarea id="${key}" style="height: ${this.calculateTextareaHeight(value)}px;" name="${key}" class="input">${value}</textarea>
            `;
            break;

        default:
            console.error(`Unknown input type for key: ${key}`);
            return '';
            break;
    }

    return `
        <div class="input_block">
            ${inputElement}
        </div>`;
}


    calculateTextareaHeight(value) {
        // You can adjust this formula based on your preferences
        return Math.max(100, value.length / 2);
    }
}