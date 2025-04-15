	import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
	import { BuildField } from '../../modules/BuildField.js';

export class EditUserOnline {
	
	constructor() {
		this.formFields = [
			{ fieldName: 'serverName', fieldType: 'text' },
			{ fieldName: 'totalTime', fieldType: 'number' },
			{ fieldName: 'startTimestamp', fieldType: 'date' },
			{ fieldName: 'lastUpdated', fieldType: 'date' },
			{ fieldName: 'lastSession', fieldType: 'number' },
			{ fieldName: 'lastPlayed', fieldType: 'number' }
		];
		
		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this, 
			this.submitHandler.bind(this), 
			this.buildField
		);
	}
	

	async openEditWindow(login) {

		if (login) {
			try {
				const badgesArray = await foxEngine.sendPostAndGetAnswer({
				"admPanel": "getUserPlayTime",
				"login": login
					}, "JSON");
				console.log(badgesArray);
				this.jsonArrConfig.openFormWindow(
					badgesArray, 
					login, 
					{ admPanel: "editUserOnline", userLogin: login }
				);
			} catch (error) {
				console.error('An error occurred:', error.message);
			}
		} else {
			console.error('Login is undefined');
		}
	}

	async submitHandler(button, user) {
		const answer = await this.jsonArrConfig.updateJsonConfig("serversOnline");
		button.notify(answer.message, answer.type);

		setTimeout(async () => {
			foxEngine.modalApp.closeModalApp()
			foxEngine.user.showUserProfile(user);

			//setTimeout(() => {
				//foxEngine.user.parseBadges(user);
			//}, 500);
		}, 500);
	}
}