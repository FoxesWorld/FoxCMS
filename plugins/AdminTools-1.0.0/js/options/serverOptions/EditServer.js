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
            { fieldName: 'host', fieldType: 'text' },
            { fieldName: 'port', fieldType: 'number' },
            { fieldName: 'ignoreDirs', fieldType: 'tagify' },
            { fieldName: 'enabled', fieldType: 'checkbox' },
            { fieldName: 'checkLib', fieldType: 'checkbox' },
            { fieldName: 'serverGroups', fieldType: 'tagify' },
            { fieldName: 'serverDescription', fieldType: 'textarea' },
            { fieldName: 'serverVersion', fieldType: 'dropdown', optionsArray: this.versions },
            { fieldName: 'jreVersion', fieldType: 'dropdown', optionsArray: this.javaVersions },
            { fieldName: 'serverImage', fieldType: 'dropdown', optionsArray: this.serverPictures },
        ];

        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig();
        this.editServerMods = new EditServerMods();
    }

    async loadServerOptions(serverName) {
        try {
            await this.loadAllOptions();

            const serverData = await this.getServerData(serverName);
            this.createDialogIfNeeded();
            this.updateFieldOptions();

            const formHtml = await this.generateFormHtml(serverName, serverData);

            this.jsonArrConfig.loadFormIntoDialog(formHtml, serverName);
            this.setupEventListeners(serverName, serverData);
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async deleteServer(serverName) {
        const response = await foxEngine.sendPostAndGetAnswer(
            { admPanel: 'deleteServer', serverName },
            'JSON'
        );

        if (response.type === 'success') {
            setTimeout(() => {
                this.serversInstance.parseServers();
                foxEngine.servers.parseOnline();
            }, 500);
        }
    }

    async getServerData(serverName) {
        const query = { admPanel: 'parseServers' };
        if (serverName && serverName.trim() !== '') {
            query.server = `serverName = '${serverName}'`;
        }
        return await foxEngine.sendPostAndGetAnswer(query, 'JSON');
    }

    createDialogIfNeeded() {
        if (!$('#dialog').length) {
            $('body').append('<div id="dialog" title="Server Options"></div>');
        }
    }

    async loadAllOptions() {
        const [versions, javaVersions, serverPictures] = await Promise.all([
            this.parseAvailableVersions(),
            this.parseAvailableJava(),
            this.parseAvailablePictures(),
        ]);

        this.versions = versions;
        this.javaVersions = javaVersions;
        this.serverPictures = serverPictures;
    }

    async parseAvailableVersions() {
        return await foxEngine.sendPostAndGetAnswer(
            { admPanel: 'getGameVersions' },
            'JSON'
        );
    }

    async parseAvailableJava() {
        return await foxEngine.sendPostAndGetAnswer(
            { admPanel: 'getJavaVersions' },
            'JSON'
        );
    }

    async parseAvailablePictures() {
        return await foxEngine.sendPostAndGetAnswer(
            { admPanel: 'getServerPictures' },
            'JSON'
        );
    }

    updateFieldOptions() {
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
    }

	async generateFormHtml(serverName, serverData) {
		const formStart = `
			<form id="serverOptionsForm" method="POST" action="/" autocomplete="off">
		`;

		const formFields = await this.buildField.buildFormFields(serverData);

		const formEnd = `
			<input type="hidden" name="admPanel" value="editServer" />
			<input type="hidden" name="serverName" value="${serverName}" />
			<input type="hidden" name="serverId" value="${serverData.id}" />
			<input name="refreshPage" type="hidden" value="false" />
			<input name="playSound" type="hidden" value="false" />
			
			<div id="serverImagePreview" style="margin-top: 20px; text-align: center;">
				<img id="previewImage" src="" alt="Selected Image" style="max-width: 100%; height: auto; display: none; border: 1px solid #ccc; padding: 5px;">
			</div>

			<div class="buttonGroup">
				<button type="button" id="viewModsInfoBtn" class="btn btn-primary">View Mods Info</button>
				<button type="submit" class="login">Apply</button>
			</div>
		</form>`;

		return formStart + formFields + formEnd;
	}

	setupEventListeners(serverName, serverData) {
		setTimeout(() => {
			$('#viewModsInfoBtn').click(() => {
				this.editServerMods.openModsInfo(serverData[0], serverName);
			});

			// Обработчик для отправки формы
			const form = document.getElementById('serverOptionsForm');
			form.addEventListener('submit', event => {
				event.preventDefault();
				$('#dialog').dialog('close');
				setTimeout(() => {
					this.serversInstance.parseServers();
					foxEngine.servers.parseOnline();
				}, 500);
			});

			// Обработчик для изменения картинки
			const serverImageDropdown = document.querySelector('[name="serverImage"]');
			const previewImage = document.getElementById('previewImage');

			if (serverImageDropdown) {
				serverImageDropdown.addEventListener('change', event => {
					this.setImage(event.target.value);
				});
			}
		}, 500);
	}
	
	setImage(image){
		if (image) {
			previewImage.src = image;
			previewImage.style.display = 'block';
		} else {
			previewImage.src = '';
			previewImage.style.display = 'none';
		}
	}
	
}
