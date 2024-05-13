import { JsonArrConfig } from '../../modules/JsonArrConfig.js';

export class EditServerMods {
	
	constructor() {
		this.serverAttributes = ["modName", "modPicture", "modDesc"];
		this.jsonArrConfig = new JsonArrConfig(this.serverAttributes, this.submitHandler.bind(this));
	}
	
	
	async submitHandler(button, serverName) {
        let answer = await this.jsonArrConfig.updateJsonConfig("modsInfo");
        button.notify(answer.message, answer.type);
        if (answer.type === "success") {
            setTimeout(() => {
                $("#dialog").dialog('close');
                foxEngine.servers.loadServerPage(serverName);
            }, 500)
        }
    }
	
	openModsInfo(responses, serverName){
		$('#viewModsInfoBtn').click(() => {
			this.jsonArrConfig.openFormWindow(responses.modsInfo, responses.serverName, {admPanel: "editServer",serverName: serverName});
		});
	}
}