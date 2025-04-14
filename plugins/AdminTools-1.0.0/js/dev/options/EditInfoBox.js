import { JsonArrConfig } from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';

export class EditInfoBox {
	constructor(adminPanel) {
		this.formFields = [
			{ fieldName: 'group_name', fieldType: 'text' },
			{ fieldName: 'start_timestamp', fieldType: 'date' },
			{ fieldName: 'end_timestamp', fieldType: 'date' },
			{ fieldName: 'title', fieldType: 'text' },
			{ fieldName: 'text', fieldType: 'textarea' },
			{ fieldName: 'image', fieldType: 'text' },
			{ fieldName: 'button_text', fieldType: 'text' },
			{ fieldName: 'button_url', fieldType: 'text' }
		];

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this.formFields.map(f => f.fieldName),
			this.submitHandler.bind(this),
			this.buildField
		);
	}

/*
	async loadInfoBoxConfig(button, data, user) {
		if (data) {
			this.jsonArrConfig.openModsInfoWindow(data, user);
		} else {
			button.notify(`${user} has no infobox configuration!`, "warn");
		}
	}
	*/

async openEditWindow() {
    try {
        console.log("Запрос на сервер...");
        const infoBoxArray = await foxEngine.sendPostAndGetAnswer(
            { sysRequest: "infoBox"}, 
            "JSON"
        );

        console.log("Ответ от сервера:", infoBoxArray);

        if (infoBoxArray && Array.isArray(infoBoxArray) && infoBoxArray.length > 0) {
            this.jsonArrConfig.openFormWindow(
                infoBoxArray,
                "InfoBox",
                { admPanel: "infoBoxUpdate" }
            );
        } else {
            console.warn("Нет данных для отображения");
        }
    } catch (error) {
        console.error('An error occurred while loading infobox:', error.message);
    }
}

	async submitHandler(button, user) {
		const answer = await this.jsonArrConfig.updateJsonConfig("infoBoxUpdate");
		button.notify(answer.message, answer.type);

		setTimeout(() => {
			foxEngine.modalApp.closeModalApp();
			//foxEngine.user.showUserProfile(user);
		}, 500);
	}
}
