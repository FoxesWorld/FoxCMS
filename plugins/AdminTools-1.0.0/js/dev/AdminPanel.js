
	import { Settings } from "./options/Settings.js";
	import { Users } from "./options/Users.js";
	import { Permissions } from "./options/Permissions.js";
	import { Servers } from "./options/Servers.js";
	import { EditInfoBox } from "./options/EditInfoBox.js";
	import { EditAllBadges } from "./options/EditAllBadges.js";

class AdminPanel {

	constructor(foxEngine, templateConfig){
		this.foxEngine = foxEngine;
		this.templateConfig = templateConfig;
		this.loadAdminTemplates();
		this.selectoption = {thisAdmoption: "",thatAdmoption: ""}
		this.settings = new Settings();
		this.users = new Users(this);
		this.permissions = new Permissions(this);
		this.servers = new Servers(this);
		this.editInfoBox = new EditInfoBox(this);
		this.editAllBadges = new EditAllBadges(this);		
	}
	
	setAdmOption(option) {
        $(".admOpt-" + option).addClass("active");
        if (option != this.selectoption.thisAdmoption) {
           this.selectoption.thatAdmoption = this.selectoption.thisAdmoption;
            $(".admOpt-" +this.selectoption.thatAdmoption).removeClass("active");
        }
       this.selectoption.thisAdmoption = option;
		this.foxEngine.foxesInputHandler.formInit(500);
    };
	
	async loadAdmOpt(option){
		eval("this."+option+".parse"+this.capitalizeFirstLetter(option)+"();");
		eval("this."+option+".addContent();");
		this.setAdmOption(option);	
	};
	
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
async loadAdminTemplates() {
    const templates = this.templateConfig.templates;
    if (!templates) {
        this.foxEngine.log("Нет путей до шаблонов в конфигурации", "WARN");
        return;
    }

    if (!this.templateCache) {
        this.templateCache = {};
    }

    const self = this;
    const templatePromises = Object.entries(templates).map(async ([key, path]) => {
        try {
            const rawHtml = await this.foxEngine.loadTemplate(path, true);
            //const html = await this.foxEngine.entryReplacer.replaceText(rawHtml);
            self.templateCache[key] = rawHtml;

            this.foxEngine.log(`Шаблон админпанели ${key} успешно загружен`);
        } catch (error) {
            this.foxEngine.log(`Ошибка загрузки шаблона для "${key}" с путём "${path}":`, "ERROR");
        }
    });

    await Promise.all(templatePromises);
}


}


	let adminTemplates = {
		"templates": {
			"userTable": "/templates/" + replaceData['template'] + "/foxEngine/admin/users/userTable.tpl",
			"userRow": "/templates/" + replaceData['template'] + "/foxEngine/admin/users/userRow.tpl",
			"serverRow": "/templates/" + replaceData['template'] + "/foxEngine/admin/servers/serverRow.tpl",
			"serversTable": "/templates/" + replaceData['template'] + "/foxEngine/admin/servers/serversTable.tpl",
			"noServers": "/templates/" + replaceData['template'] + "/foxEngine/admin/servers/noServers.tpl",
			"serverEndForm": "/templates/" + replaceData['template'] + "/foxEngine/admin/servers/editServerEnd.tpl",
			"addServerEndForm": "/templates/" + replaceData['template'] + "/foxEngine/admin/servers/addServerEnd.tpl",
			"permRow": "/templates/" + replaceData['template'] + "/foxEngine/admin/permissions/permRow.tpl",
			"permTable": "/templates/" + replaceData['template'] + "/foxEngine/admin/permissions/permTable.tpl"
		}
	};
	document.addEventListener("DOMContentLoaded", () => {
		const adminPanel = new AdminPanel(window.foxEngine, adminTemplates);
		window.adminPanel = adminPanel;
	});