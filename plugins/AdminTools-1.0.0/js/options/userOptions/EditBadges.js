import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
import { BuildField } from '../../modules/BuildField.js';

export class EditBadges {
	constructor() {
		this.allBadges = [];
		this.formFields = [
			{ fieldName: 'badgeName', fieldType: 'dropdown', optionsArray: this.allBadges },
			{ fieldName: 'acquiredDate', fieldType: 'date' },
			{ fieldName: 'description', fieldType: 'text' }
		];

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			["badgeName", "acquiredDate", "description"], 
			this.submitHandler.bind(this), 
			this.buildField
		);
	}

	async loadBadgesConfig(button, data, user) {
		if (data) {
			this.jsonArrConfig.openModsInfoWindow(data, user);
		} else {
			button.notify(`${user} has no badges!`, "warn");
		}
	}

	async getAllBadges() {
		const response = await foxEngine.sendPostAndGetAnswer(
			{ admPanel: "getAllBadges" }, 
			"JSON"
		);
		this.allBadges = response;
	}

	async openEditWindow(login) {
		if (!this.allBadges.length) {
			await this.getAllBadges();
		}

		this.formFields.forEach(field => {
			if (field.fieldName === 'badgeName') {
				field.optionsArray = this.allBadges;
			}
		});

		if (login) {
			try {
				const badgesArray = await foxEngine.user.getBadgesArray(login);
				this.jsonArrConfig.openFormWindow(
					badgesArray, 
					login, 
					{ admPanel: "editUserBadges", userLogin: login }
				);
			} catch (error) {
				console.error('An error occurred:', error.message);
			}
		} else {
			console.error('Login is undefined');
		}
	}

	async submitHandler(button, user) {
		const answer = await this.jsonArrConfig.updateJsonConfig("badges");
		button.notify(answer.message, answer.type);

		setTimeout(async () => {
			$("#dialog").dialog('close');
			foxEngine.user.showUserProfile(user);

			setTimeout(() => {
				foxEngine.user.parseBadges(user);
			}, 500);
		}, 500);
	}
}