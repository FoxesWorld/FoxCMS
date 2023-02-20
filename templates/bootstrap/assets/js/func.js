  	function loadPage(page) {
		addAnimation('animate__backOutRight', $(contentBlock));
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setTimeout(() => {
			let optionContent;
			  optionContent = request.send_post({"getOption": page});
			  optionContent.onreadystatechange = function() {
				$(contentBlock).html(this.responseText);
			  }
			  formInit(100);
		}, 500);
		setTimeout(() => {
			addAnimation('animate__bounceInDown', $(contentBlock));
		}, 400);
	}

  	function addAnimation(animation, block) {
		block.addClass(animation);
		setTimeout(() => {
			block.removeClass(animation);
		}, 1000);
	}

  function userAction() {
	  let answer;
	  answer = request.send_post({user_doaction: "greeting"});
	  answer.onreadystatechange = function() {
	  try {
			answer = JSON.parse(this.responseText);
			$("#actionBlock").html(answer.text + ' ' + realname + '!');
	  } catch(error) {}		
	  };
	textAnimate(); 
  }
  
  function parseUsrOptionsMenu() {
	  let usrOptions;
	  usrOptions = request.send_post({"getUserOptionsMenu": login});
	  usrOptions.onreadystatechange = function() {
		if (usrOptions.readyState === 4) {
			try {
				let json = JSON.parse(this.responseText);
				let optionAmmount = json.optionAmmount;
				let optionArray = json.optionArray;
				let optionTpl;
				let type;
				console.log("UserOptions available: " + optionAmmount);
					for (var i = 0; i < optionAmmount; i++){
						var obj = optionArray[i];
						let appendBlock;
							for (var key in obj){
								  var value = obj[key];
								  type = obj["type"];
								  appendBlock = obj["optionBlock"];
								  switch(type){
									  case "link":
									  optionTpl = `
										  <li>
											<a onclick="loadPage('`+obj["optionName"]+`'); return false; ">
												<div class="rightIcon">
													`+obj["optionPreText"]+`
												</div>
											`+obj["optionTitle"]+`
											</a>
											</li>`;
									  break;
									  
									  case "plainText":
										optionTpl = obj["optionTitle"];
									  break;
								  }
							}
						console.log("["+ i + "]" + "Appending " + obj["optionName"] + " to " +appendBlock + " block");
						$(appendBlock).append(optionTpl);
					}
			} catch(error) {}
		}
		//$("#usrMenu").html(this.responseText);  
	  }
  }

	  function textAnimate() {
		  var textWrapper = document.querySelector('.container #actionBlock');
		  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
		  //var progress;
		var animation = anime.timeline({loop: false})
		  .add({
			targets: '.container #actionBlock',
			scale: [14,1],
			opacity: [0,1],
			easing: "easeOutExpo",
			duration: 1000,
			delay: 3000
		  });
	}
	
	function parseModulesInfo() {
	  let answer;
	  
	  answer = request.send_post({admPanel: "showModules"});
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