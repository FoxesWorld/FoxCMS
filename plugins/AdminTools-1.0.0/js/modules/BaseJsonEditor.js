import { JsonArrConfig } from './JsonArrConfig.js';
import { BuildField } from './BuildField.js';

export class BaseJsonEditor {
	constructor(adminPanel, formFields, panelConfig) {
		this.adminPanel = adminPanel;
		this.formFields = formFields;

		/**
		 * panelConfig:
		 * {
		 *    load:   { key: 'sysRequest' | 'admPanel', value: 'infoBox' | 'groupAssoc' },
		 *    update: { key: 'admPanel', value: 'infoBoxUpdate' },
		 *    title: 'InfoBox'
		 * }
		 */
		this.panelConfig = panelConfig;

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this,
			this.submitHandler.bind(this),
			this.buildField,
			{ addRow: true, delRow: true }
		);
	}

	async openEditWindow() {
		try {
			console.log("Запрос на сервер...");

			const requestPayload = {
				[this.panelConfig.load.key]: this.panelConfig.load.value
			};

			const dataArray = await foxEngine.sendPostAndGetAnswer(
				requestPayload,
				"JSON"
			);

			console.log("Ответ от сервера:", dataArray);

			if (Array.isArray(dataArray) && dataArray.length > 0) {
				this.jsonArrConfig.openForm(
					dataArray,
					this.panelConfig.title,
					{ [this.panelConfig.update.key]: this.panelConfig.update.value }
				);
			} else {
				console.warn("Нет данных для отображения");
			}
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error.message);
		}
	}

	async submitHandler(button, user) {
		const answer = await this.jsonArrConfig.updateJsonConfig(this.panelConfig.update.value);
		button.notify(answer.message, answer.type);

		setTimeout(() => {
			foxEngine.modalApp.closeModalApp();
		}, 500);
	}
}