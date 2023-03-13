	function parseModulesInfo() {
	  let answer = request.send_post({admPanel: "showModules"});
	  answer.onreadystatechange = function() {
		  $(".modulesBlock").html("");
		  if (answer.readyState === 4) {  
				try {
					  let json = JSON.parse(this.responseText);
					  let modulesAmmount = json.modulesammount;
					  let modulesArray = json.modulesArray;
					  let moduleOut;
					for (var i = 0; i < modulesAmmount; i++){
					  var obj = modulesArray[i];
					  for (var key in obj){
						var value = obj[key];
						moduleOut = `<div class="module">
											<span class="moduleSettings">
												<i class="fa fa-cogs" aria-hidden="true"></i>
											</span>
											<b class="moduleName">`
												+obj["moduleName"]+`
											</b>
											<img class="modulePriority" alt="`+obj["modulePriority"]+`" src="/templates/`+siteTpl+`/assets/img/admin/modules/`+obj["modulePriority"]+`.png" />
											
											<ul class="moduleContents">
												<table>
													<td>
														<li><img class="modulePicture" src="`+obj["modulePicture"]+`" /> </li>
													</td>
													
													<td>
														<li><b class="moduleKey">Version: </b>  <b class="moduleValue">`+obj["version"]+`</b></li>
														<li><b class="moduleKey">Description: </b> <b class="moduleValue">`+obj["description"]+`</b></li>
														<li><b class="moduleKey">Priority: </b> <b class="moduleValue">`+obj["modulePriority"]+`</b></li>
														<li><b class="moduleKey">Mainclass: </b> <b class="moduleValue">`+obj["moduleMainClass"]+`</b></li>
													</td>
												</table>
											</ul>
										</div>`;
					 
					  }
					  $(".modulesBlock").append(moduleOut);
					}
					  
				} catch (error) {
					return null;
				}
		  }
	  };
	}