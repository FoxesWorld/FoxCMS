export class Modules {
    constructor() {}

    async parseModules() {
        let json = await foxEngine.sendPostAndGetAnswer({
            admPanel: "showModules"
        }, "JSON");
        $("#adminContent").html("");
        try {
            let modulesAmmount = json.modulesammount;
            let modulesArray = json.modulesArray;
            let moduleTpl = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/modules/moduleElement.tpl', true);

            for (let i = 0; i < modulesAmmount; i++) {
                let module = modulesArray[i];
                let moduleOut = await foxEngine.replaceTextInTemplate(moduleTpl, {
                    moduleName: module["moduleName"],
					modulePicture: module["modulePicture"],
					priorImg: replaceData.assets + 'img/admin/modules/' + module["modulePriority"] + '.png',
                    modulePriority: module["modulePriority"],
					moduleGroups: module["moduleGroups"],
                    version: module["version"],
                    description: module["description"],
                    moduleMainClass: module["moduleMainClass"]
                });

                $("#adminContent").append(moduleOut);
                this.addModulesListener(module);
            }

        } catch (error) {
            $("#adminContent").html(error);
        }
    };

	addModulesListener(module) {
		setTimeout(() => {
			$('span.moduleSettings.module-' + module["moduleName"]).on('click', (e) => {
				this.showModuleSettings(module);
			});
		}, 500);
	}
	
    async addContent() {

    }


	    showModuleSettings(module) {
	        $("#dialog").dialog("option", "title", module["moduleName"]);
	        window.foxEngine.loadData(module["description"], '#dialogContent');
	        $("#dialog").dialog('open');
	    }
	}