	function Modules() {

	    this.parseModules = async function() {
	        let json = await foxEngine.sendPostAndGetAnswer({
	            admPanel: "showModules"
	        }, "JSON");
	        $("#adminContent").html("");
	        try {
	            let modulesAmmount = json.modulesammount;
	            let modulesArray = json.modulesArray;
	            let moduleOut;
	            for (let i = 0; i < modulesAmmount; i++) {
	                let obj = modulesArray[i];
	                for (let key in obj) {
	                    let value = obj[key];
	                    moduleOut = `<div class="module">
											<span class="moduleSettings module-` + obj["moduleName"] + `">
												<i class="fa fa-cogs" aria-hidden="true"></i>
											</span>
											<b class="moduleName">` +
	                        obj["moduleName"] + `
											</b>
											<img class="modulePriority" alt="` + obj["modulePriority"] + `" src="` + replaceData.assets + `img/admin/modules/` + obj["modulePriority"] + `.png" />
											
											<ul class="moduleContents">
												<table>
													<td>
														<li><img class="modulePicture" src="` + obj["modulePicture"] + `" /> </li>
													</td>
													
													<td>
														<li><b class="moduleKey">ModuleGroups: </b>  <b class="moduleValue">` + obj["moduleGroups"] + `</b></li>
														<li><b class="moduleKey">Version: </b>  <b class="moduleValue">` + obj["version"] + `</b></li>
														<li><b class="moduleKey">Description: </b> <b class="moduleValue">` + obj["description"] + `</b></li>
														<li><b class="moduleKey">Priority: </b> <b class="moduleValue">` + obj["modulePriority"] + `</b></li>
														<li><b class="moduleKey">Mainclass: </b> <b class="moduleValue">` + obj["moduleMainClass"] + `</b></li>
													</td>
												</table>
											</ul>
										</div>`;

	                }
	                $("#adminContent").append(moduleOut);
	                addModulesListener(obj);
	            }

	        } catch (error) {
	            $("#adminContent").html(error);
	        }
	    };

	    function addModulesListener(module) {
	        setTimeout(() => {
	            $('span.moduleSettings.module-' + module["moduleName"]).on('click', function(e) {
	                showModuleSettings(module);
	            });
	        }, 500);
	    }

	    function showModuleSettings(module) {
	        $("#dialog").dialog("option", "title", module["moduleName"]);
	        foxEngine.loadData(module["description"], '#dialogContent');
	        $("#dialog").dialog('open');
	    }
	}