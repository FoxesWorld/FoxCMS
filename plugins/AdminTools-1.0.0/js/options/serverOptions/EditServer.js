import { BuildField } from '../../modules/BuildField.js';
import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
import { EditServerMods } from './EditServerMods.js';

export class EditServer {
	constructor(serversInstance) {
		this.serversInstance = serversInstance;
		this.versions = [];
		this.serverPictures = [];
		this.javaVersions = [];

		this.formFields = [
			//{ "fieldName": 'serverName', "fieldType": 'text' },
			{ "fieldName": 'host', "fieldType": 'text' },
			{ "fieldName": 'port', "fieldType": 'number' },
			{ "fieldName": 'ignoreDirs', "fieldType": 'tagify' },
			{ "fieldName": 'enabled', "fieldType": 'checkbox' },
			{ "fieldName": 'checkLib', "fieldType": 'checkbox' },
			{ "fieldName": 'serverGroups', "fieldType": 'tagify' },
			{ "fieldName": 'serverDescription', "fieldType": 'textarea' },
			{ "fieldName": 'serverVersion', "fieldType": 'dropdown', "optionsArray": this.versions },
			{ "fieldName": 'jreVersion', "fieldType": 'dropdown', "optionsArray": this.javaVersions },
			{ "fieldName": 'serverImage', "fieldType": 'dropdown', "optionsArray": this.serverPictures }
		];

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(this.serverAttributes);
		this.editServerMods = new EditServerMods();
	}

	async loadServerOptions(serverName) {
		try {
        if (this.versions.length === 0) {
            await this.parseAvailableVersions();
        }
        if (this.javaVersions.length === 0) {
            await this.parseAvailableJava();
        }
        if (this.serverPictures.length === 0) {
            await this.parseAvailablePictures();
        }

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
					console.log(responses[0].id);
					let formHtml = `<form id="serverOptionsForm" method="POST" action="/" autocomplete="false">`;
					formHtml += await this.buildField.buildFormFields(responses);
					formHtml += `
						<input type="hidden" name="admPanel" value="editServer" />
						<input type="hidden" name="serverName" value="${serverName}" />
						<input type="hidden" name="serverId" value="${responses.id}" />
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
							this.editServerMods.openModsInfo(responses[0], serverName);
						});

						const form = document.getElementById("serverOptionsForm");
						form.addEventListener("submit", (event) => {
							$("#dialog").dialog('close');
							setTimeout(() => {
								this.serversInstance.parseServers();
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
	
	async deleteServer(serverName){
		let answer = await foxEngine.sendPostAndGetAnswer({
			admPanel: "deleteServer",
			serverName: serverName
		}, "JSON");
		
		if(answer.type === "success"){
			setTimeout(() => {
				this.serversInstance.parseServers();
				foxEngine.servers.parseOnline();
			}, 500);
		}
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
