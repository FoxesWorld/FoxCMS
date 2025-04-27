import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
import { BuildField } from '../../modules/BuildField.js';

export class EditBadges {
	constructor() {
		this.allBadges = [];
		this.currentUser = "";
		this.formFields = [
			{ fieldName: 'badgeName', fieldType: 'dropdown', optionsArray: this.allBadges },
			{ fieldName: 'acquiredDate', fieldType: 'date' },
			{ fieldName: 'description', fieldType: 'text' }
		];

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			this, 
			this.submitHandler.bind(this), 
			this.buildField,
			{addRow: true, delRow: true}
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

		if (Array.isArray(response)) {
			this.allBadges = response.map(badge => badge.badgeName);
			console.log("[BadgeManager] Returning badge names:", this.allBadges);
		} else {
			console.error("[BadgeManager] Unexpected response format:", response);
			this.allBadges = [];
		}
	}

	async openEditWindow(login) {
		this.currentUser = login;
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
				const badgesArray = await foxEngine.user.badgeManager.getBadgesArray(login);
				this.jsonArrConfig.openForm(
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

	async submitHandler(button) {
		const answer = await this.jsonArrConfig.updateJsonConfig("badges");
		button.notify(answer.message, answer.type);

		setTimeout(async () => {
			foxEngine.modalApp.closeModalApp()
			//foxEngine.user.showUserProfile();
			foxEngine.user.showUserProfile(this.currentUser);

			//setTimeout(() => {
				//foxEngine.user.parseBadges(user);
			//}, 500);
		}, 500);
	}
}