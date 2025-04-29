import { BuildField } from '../../modules/BuildField.js';
import { JsonArrConfig } from '../../modules/JsonArrConfig.js';

export class AddServer {
	constructor(serversInstance) {
		this.serversInstance = serversInstance;
		this.formFields = [
			{ fieldName: 'serverName', fieldType: 'text' },
			...serversInstance.formFields 
		];


		this.versions = [];
		this.javaVersions = [];
		this.serverPictures = [];

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this,
			this.submitHandler.bind(this),
			this.buildField,
			{addRow: false, delTow: false}
		);
	}

async submitHandler(button) {
    try {
        const $form = $('#serverOptionsForm');

        if (!$form.length) {
            throw new Error('Форма #serverOptionsForm не найдена');
        }

        // Считываем ВСЕ данные формы
        const formDataArray = $form.serializeArray();

        // Превращаем в объект вида {fieldName: value}
        const formData = {};
        formDataArray.forEach(item => {
            formData[item.name] = item.value;
        });

        console.log('Данные формы:', formData);

        // Проверяем наличие serverName
        const serverName = formData.serverName?.trim();

        if (!serverName) {
            button.notify('Пожалуйста, введите имя сервера.', 'error');
            return;
        }

        // Отправляем запрос
        const answer = await this.jsonArrConfig.updateJsonConfig('addServer', { serverName });

        button.notify(answer.message, answer.type);

        if (answer.success) {
            setTimeout(() => {
                $('#dialog').dialog('close');
                this.serversInstance.parseServers();
                foxEngine.servers.parseOnline();
            }, 500);
        }
    } catch (error) {
        console.error('Ошибка при добавлении сервера:', error.message);
    }
}
async submitHandler(button) {
    try {
        const $form = $('#jsonConfigForm');

        if (!$form.length) {
            throw new Error('Форма #jsonConfigForm не найдена');
        }

        // Считываем ВСЕ данные формы
        const formDataArray = $form.serializeArray();

        // Превращаем в объект вида {fieldName: value}
        const formData = {};
        formDataArray.forEach(item => {
            formData[item.name] = item.value;
        });

        console.log('Данные формы:', formData);

        // Проверяем наличие serverName
        const serverName = formData.serverName?.trim();

        if (!serverName) {
            button.notify('Пожалуйста, введите имя сервера.', 'error');
            return;
        }

        // Отправляем запрос
        const answer = await this.jsonArrConfig.updateJsonConfig('addServer', { serverName });

        button.notify(answer.message, answer.type);

        if (answer.success) {
            setTimeout(() => {
                $('#dialog').dialog('close');
                this.serversInstance.parseServers();
                foxEngine.servers.parseOnline();
            }, 500);
        }
    } catch (error) {
        console.error('Ошибка при добавлении сервера:', error.message);
    }
}


	async openAddServerDialog() {
		try {
			await this.loadAllOptions();
			this.updateFieldOptions();

			const emptyData = {
				id: null,
				serverName: '',
				host: '',
				port: '',
				ignoreDirs: [],
				enabled: false,
				checkLib: false,
				serverGroups: [],
				serverDescription: '',
				serverVersion: '',
				jreVersion: '',
				serverImage: ''
			};

			this.jsonArrConfig.openForm([emptyData], 'new', {
				admPanel: 'addServer'
			});

			this.setupImagePreview([emptyData]);
		} catch (error) {
			console.error('Ошибка при открытии формы добавления сервера:', error.message);
		}
	}

	async loadAllOptions() {
		const [versions, javaVersions, serverPictures] = await Promise.all([
			this.parseAvailableVersions(),
			this.parseAvailableJava(),
			this.parseAvailablePictures()
		]);

		this.versions = versions;
		this.javaVersions = javaVersions;
		this.serverPictures = serverPictures;
	}

	updateFieldOptions() {
		const fieldOptionsMap = {
			serverVersion: this.versions,
			jreVersion: this.javaVersions,
			serverImage: this.serverPictures
		};

		this.formFields.forEach(field => {
			if (field.fieldName in fieldOptionsMap) {
				field.optionsArray = fieldOptionsMap[field.fieldName];
			}
		});
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

	setupImagePreview(dataArray) {
		setTimeout(() => {
			const $form = $('#serverOptionsForm');
			const $serverImageDropdown = $form.find('[name="serverImage"]');
			const $previewImage = $('#previewImage');

			if ($serverImageDropdown.length && $previewImage.length) {
				$serverImageDropdown.off('change').on('change', (e) => {
					this.setImage(e.target.value, $previewImage);
				});
			}

			const image = dataArray[0]?.serverImage;
			this.setImage(image, $previewImage);
		}, 300);
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
