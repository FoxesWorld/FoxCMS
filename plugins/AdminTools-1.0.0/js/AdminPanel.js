
	import { Settings } from "./options/Settings.js";
	import { Users } from "./options/Users.js";
	import { Modules } from "./options/Modules.js";
	import { Servers } from "./options/Servers.js";
	import { GroupAssoc } from "./options/GroupAssoc.js";
	import { TemplateEditor } from "./options/TemplateEditor.js";
	import { Pages } from "./options/Pages.js";

class AdminPanel {	

	constructor(){
		this.selectoption = {thisAdmoption: "",thatAdmoption: ""}
		this.settings = new Settings();
		this.users = new Users();
		this.modules = new Modules();
		this.servers = new Servers();
		this.groupAssoc = new GroupAssoc();
		this.templateEditor = new TemplateEditor();
		this.pages = new Pages();
	}
	
	
	setAdmOption(option) {
        $(".admOpt-" + option).addClass("active");
        if (option != this.selectoption.thisAdmoption) {
           this.selectoption.thatAdmoption = this.selectoption.thisAdmoption;
            $(".admOpt-" +this.selectoption.thatAdmoption).removeClass("active");
        }
       this.selectoption.thisAdmoption = option;
		window.foxEngine.foxesInputHandler.formInit(500);
    };
	
	async loadAdmOpt(option){
		eval("this."+option+".parse"+this.capitalizeFirstLetter(option)+"();");
		eval("this."+option+".addContent();");
		this.setAdmOption(option);
		
	};
	
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

	const adminPanel = new AdminPanel();
	window.adminPanel = adminPanel;
