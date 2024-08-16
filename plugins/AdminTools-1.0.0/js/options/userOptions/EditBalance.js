import {JsonArrConfig} from '../../modules/JsonArrConfig.js';
import { BuildField } from '../../modules/BuildField.js';

export class EditBalance {
	
	constructor() {
		this.formFields = [
			{ "fieldName": 'units', "fieldType": 'number' },
			{ "fieldName": 'crystals', "fieldType": 'number'}
		];
		
		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig(["units", "crystals"], this.submitHandler.bind(this), this.buildField);
		this.jsonArrConfig.setEditRows(false);
	}
	
	
	async submitHandler(button, user) {
		let answer = await this.jsonArrConfig.updateJsonConfig("balance");
		button.notify(answer.message, answer.type);
		setTimeout(async () => {
			$("#dialog").dialog('close');
			foxEngine.user.showUserProfile(user);
			//setTimeout(async () => {
			//	foxEngine.user.parseBadges(user);
			//}, 500);
		}, 500);
    }
	
	async openEditWindow(login){
		
		if (login) {
			try{
				const useralance = await this.loadUserBalance(login);
				this.jsonArrConfig.openFormWindow(useralance, login, {admPanel: "editUserBalance", userLogin: login});
			} catch (error) {
				console.error('An error occurred:', error.message);
			}
		} else {
			console.error('Login is undefined');
		}
	}
	
	async loadUserBalance(login){
		return await foxEngine.sendPostAndGetAnswer({
            admPanel: "loadUserBalance",
			userLogin: login
        }, "JSON");
	}
	
}