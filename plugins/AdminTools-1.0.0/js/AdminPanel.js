
	import { Settings } from "./modules/Settings.js";
	import { Users } from "./modules/Users.js";
	import { Modules } from "./modules/Modules.js";
	import { Servers } from "./modules/Servers.js";
	import { GroupAssoc } from "./modules/GroupAssoc.js";

class AdminPanel {	

	constructor(){
		this.selectoption = {thisAdmoption: "",thatAdmoption: ""}
		this.settings = new Settings();
		this.users = new Users();
		this.modules = new Modules();
		this.servers = new Servers();
		this.groupAssoc = new GroupAssoc();
	}
	
	
	setAdmOption(option) {
		//FoxesInput.initialised = false;
        $(".admOpt-" + option).addClass("active");
        if (option != this.selectoption.thisAdmoption) {
           this.selectoption.thatAdmoption = this.selectoption.thisAdmoption;
            $(".admOpt-" +this.selectoption.thatAdmoption).removeClass("active");
        }
       this.selectoption.thisAdmoption = option;
		window.foxEngine.foxesInputHandler.formInit(500);
    };
	
	loadAdmOpt(option){
		//eval("let "+option + " = new "+this.capitalizeFirstLetter(option)+"();"
		eval("this."+option+".parse"+this.capitalizeFirstLetter(option)+"();");
		this.setAdmOption(option);
	};
	
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

	const adminPanel = new AdminPanel();
	window.adminPanel = adminPanel;
