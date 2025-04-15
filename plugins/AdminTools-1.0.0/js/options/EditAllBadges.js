import { JsonArrConfig } from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';

export class EditAllBadges {
	
	constructor(adminPanel){
		this.adminPanel = adminPanel;
		this.formFields = [
			{ fieldName: 'badgeName', fieldType: 'text' },
			{ fieldName: 'description', fieldType: 'text' },
			{ fieldName: 'img', fieldType: 'text' }
		];
		
		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this,//.formFields.map(f => f.fieldName),
			this.submitHandler.bind(this),
			this.buildField
		);
	}
	
	async openEditWindow() {
		try {
			console.log("Запрос на сервер...");
			const allBadgesArray = await foxEngine.sendPostAndGetAnswer(
				{ admPanel: "getAllBadges" }, 
				"JSON"
			);

			console.log("Ответ от сервера:", allBadgesArray);

			if (allBadgesArray && Array.isArray(allBadgesArray) && allBadgesArray.length > 0) {
				this.jsonArrConfig.openFormWindow(
					allBadgesArray,
					"AllBadges",
					{ admPanel: "allBadgesUpdate" }
				);
			} else {
				console.warn("Нет данных для отображения");
			}
		} catch (error) {
			console.error('An error occurred while loading infobox:', error.message);
		}
	}

	async submitHandler(button, user) {
		const answer = await this.jsonArrConfig.updateJsonConfig("allBadgesUpdate");
		button.notify(answer.message, answer.type);

		setTimeout(() => {
			foxEngine.modalApp.closeModalApp();
			//foxEngine.user.showUserProfile(user);
		}, 500);
	}
	
}