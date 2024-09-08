import { JsonArrConfig } from '../../modules/JsonArrConfig.js';
import { BuildField } from '../../modules/BuildField.js';

export class EditBalance {
	constructor() {
		this.formFields = [
			{ fieldName: 'units', fieldType: 'number' },
			{ fieldName: 'crystals', fieldType: 'number' }
		];

		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(
			["units", "crystals"],
			this.submitHandler.bind(this),
			this.buildField
		);
		this.jsonArrConfig.setEditRows(false);
	}

	async submitHandler(button, user) {
		try {
			const answer = await this.jsonArrConfig.updateJsonConfig("balance");
			button.notify(answer.message, answer.type);
			setTimeout(() => {
				$("#dialog").dialog('close');
				foxEngine.user.showUserProfile(user);
			}, 500);
		} catch (error) {
			console.error('An error occurred during submission:', error.message);
		}
	}

	async openEditWindow(login) {
		if (!login) {
			console.error('Login is undefined');
			return;
		}

		try {
			const userBalance = await this.loadUserBalance(login);
			this.jsonArrConfig.openFormWindow(
				userBalance,
				login,
				{ admPanel: "editUserBalance", userLogin: login }
			);
		} catch (error) {
			console.error('An error occurred while opening edit window:', error.message);
		}
	}

	async loadUserBalance(login) {
		return await foxEngine.sendPostAndGetAnswer(
			{ admPanel: "loadUserBalance", userLogin: login },
			"JSON"
		);
	}
}