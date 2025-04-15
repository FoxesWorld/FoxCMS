import { BuildField } from '../../modules/BuildField.js';
import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
import { EditServerMods } from './EditServerMods.js';

export class EditServer {
    constructor(serversInstance) {
        this.serversInstance = serversInstance;
        this.formFields = serversInstance.formFields;

        this.versions = [];
        this.serverPictures = [];
        this.javaVersions = [];

        this.buildField = new BuildField(this);
        this.jsonArrConfig = new JsonArrConfig(this, {}, this.buildField);
        this.editServerMods = new EditServerMods();
    }

    async loadServerOptions(serverName) {
        try {
            await this.loadAllOptions();
            const serverData = await this.getServerData(serverName);
            this.createDialogIfNeeded();
            this.updateFieldOptions();

            const formHtml = await this.generateFormHtml(serverName, serverData);
            // Вставляем форму в диалог
            this.jsonArrConfig.loadFormIntoDialog(formHtml, serverName);

            // Устанавливаем обработчики сразу после вставки формы
            this.setupEventListeners(serverName, serverData);
        } catch (error) {
            console.error('An error occurred while loading server options:', error.message);
        }
    }

    async deleteServer(serverId) {
        const response = await foxEngine.sendPostAndGetAnswer(
            {
				admPanel: 'deleteServer', 
				serverId: serverId
			},
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
        if (serverName?.trim()) {
            query.server = `serverName = '${serverName}'`;
        }
        return await foxEngine.sendPostAndGetAnswer(query, 'JSON');
    }

    createDialogIfNeeded() {
        //if ($('#dialog').length === 0) {
        //    $('body').append('<div id="dialog" title="Server Options"></div>');
        //}
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
        return await foxEngine.sendPostAndGetAnswer({ admPanel: 'getGameVersions' }, 'JSON');
    }

    async parseAvailableJava() {
        return await foxEngine.sendPostAndGetAnswer({ admPanel: 'getJavaVersions' }, 'JSON');
    }

    async parseAvailablePictures() {
        return await foxEngine.sendPostAndGetAnswer({ admPanel: 'getServerPictures' }, 'JSON');
    }

    updateFieldOptions() {
        for (const field of this.formFields) {
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
            }
        }
    }

    async generateFormHtml(serverName, serverData) {
        const serverEndFormTpl = this.serversInstance.adminPanel.templateCache["serverEndForm"];
        const formStart = `<form id="serverOptionsForm" class="form-floating" method="POST" action="/" autocomplete="off">`;
        const formFields = await this.buildField.buildFormFields(serverData);
        const formEnd = await this.serversInstance.adminPanel.foxEngine.replaceTextInTemplate(serverEndFormTpl, {
            serverName: serverName,
            id:         serverData.id
        });
        return formStart + formFields + formEnd;
    }

    /**
     * Устанавливает обработчики событий формы.
     * Важно: метод вызывается после вставки HTML в диалог.
     */
	setupEventListeners(serverName, serverData) {
		setTimeout(() => {
			//const $dialog = $('#dialog');
			const $form = $('#serverOptionsForm');

			if (!$form.length) {
				console.warn('Form element not found for server options.');
				return;
			}

			$('#viewModsInfoBtn').off('click').on('click', () => {
				const serverObject = Array.isArray(serverData) ? serverData[0] : serverData;
				this.editServerMods.openModsInfo(serverObject, serverName);
			});

			$form.off('submit').on('submit', (event) => {
				event.preventDefault();
				//$dialog.dialog('close');

				setTimeout(() => {
					this.serversInstance.parseServers();
					foxEngine.servers.parseOnline();
				}, 500);
			});

			const $serverImageDropdown = $form.find('[name="serverImage"]');
			const $previewImage = $('#previewImage');

			if ($serverImageDropdown.length && $previewImage.length) {
				$serverImageDropdown.off('change').on('change', (e) => {
					this.setImage(e.target.value, $previewImage);
				});
			}
			let img = serverData[0]["serverImage"];
			this.setImage(img, $previewImage);
		}, 500);
	}

    async openAddServerDialog() {
        try {
            await this.loadAllOptions();
            this.createDialogIfNeeded();
            //$('#dialog').attr('title', 'Добавить сервер');
            this.updateFieldOptions();

            const emptyData = {
                id:                 null,
                serverName:         '',
                host:               '',
                port:               '',
                ignoreDirs:         [],
                enabled:            false,
                checkLib:           false,
                serverGroups:       [],
                serverDescription:  '',
                serverVersion:      '',
                jreVersion:         '',
                serverImage:        ''
            };
            const dataArray = [emptyData];

            const formStart = `<form id="serverOptionsForm" class="form-floating" method="POST" action="/" autocomplete="off">`;
            const nameFieldHtml = `
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="serverName" name="serverName" placeholder="Имя сервера" value="">
                    <label for="serverName">Имя сервера</label>
                </div>
            `;
            const otherFieldsHtml = await this.buildField.buildFormFields(dataArray);
            const serverEndFormTpl = this.serversInstance.adminPanel.templateCache["addServerEndForm"];
            const formEnd = await this.serversInstance.adminPanel.foxEngine.replaceTextInTemplate(serverEndFormTpl, {
                serverName: '',
                id:         ''
            });

            const fullHtml = formStart + nameFieldHtml + otherFieldsHtml + formEnd;
            this.jsonArrConfig.loadFormIntoDialog(fullHtml, 'new');

            // Привязываем обработчики событий сразу после загрузки формы
            this.setupEventListeners('new', dataArray);
        } catch (error) {
            console.error('Ошибка при открытии окна добавления сервера:', error);
        }
    }

    setImage(imageUrl, $previewImage) {
        if (!($previewImage instanceof jQuery)) {
            $previewImage = $('#previewImage');
        }
        if (imageUrl) {
            $previewImage.attr('src', imageUrl).css('display', 'block');
        } else {
            $previewImage.attr('src', '').css('display', 'none');
        }
    }
}
