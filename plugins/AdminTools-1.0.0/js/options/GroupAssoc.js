
import { JsonArrConfig } from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';

export class GroupAssoc {
	
	constructor(adminPanel){
		this.adminPanel = adminPanel;
		this.formFields = [
			{ fieldName: 'groupName', fieldType: 'text' },
			{ fieldName: 'groupNum', fieldType: 'number' },
			{ fieldName: 'groupType', fieldType: 'text' }
		];
		
		
		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this,
			this.submitHandler.bind(this),
			this.buildField,
			{addRow: true, delRow: true}
		);
	}
	
	async openEditWindow() {
		try {
			console.log("Запрос на сервер...");
			const allGroupsArray = await foxEngine.sendPostAndGetAnswer(
				{ admPanel: "groupAssoc" }, 
				"JSON"
			);

			console.log("Ответ от сервера:", allGroupsArray);

			if (allGroupsArray && Array.isArray(allGroupsArray) && allGroupsArray.length > 0) {
				this.jsonArrConfig.openForm(
					allGroupsArray,
					"GroupAssociations",
					{ admPanel: "groupAssocUpdate" }
				);
			} else {
				console.warn("Нет данных для отображения");
			}
		} catch (error) {
			console.error('An error occurred while loading infobox:', error.message);
		}
	}
	
	async submitHandler(button, user) {
		const answer = await this.jsonArrConfig.updateJsonConfig("groupAssoc");
		button.notify(answer.message, answer.type);

		setTimeout(() => {
			foxEngine.modalApp.closeModalApp();
			//foxEngine.user.showUserProfile(user);
		}, 500);
	}
	
}