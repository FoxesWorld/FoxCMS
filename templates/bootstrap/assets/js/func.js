
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

	/*
	function postRequest(data){
		let response;
		let rsrp;
		response = request.send_post(data);
		response.onreadystatechange = function() {	
			if (this.readyState == 4) {
				if(this.status == 200) {
					var responseText = this.responseText;
					rsrp = JSON.parse(responseText);
				}; 
			};
		};
		return rsrp;
	} 
	*/

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
		$("#usrMenu").html(this.responseText);  
	  }
  }

  function animate() {
	var textWrapper = document.querySelector('.status .additionalStatus');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	
	
	var logoTimeline = anime.timeline({
		loop: false
	});

	logoTimeline.add({
		targets: '.logo .title',
		scaleX: [0,1],
		opacity: [0.5,1],
		easing: "easeInOutSine",
		duration: 300,
		delay: 0
	  }).add({
		targets: '.logo img',
		scale: [0.1,1],
		opacity: [0,1],
		translateZ: 0,
		easing: "easeInExpo",
		duration: 450,
		delay: (el, i) => 0
	  }).add({
		targets: '.logo .line',
		scaleX: [0,1],
		opacity: [0.01,1],
		easing: "easeOutExpo",
		duration: 650,
		delay: (el, i, l) => 500 * (l - i)
	  }).add({
		targets: '.logo .status',
		scale: [0, 1],
		duration: 250,
		elasticity: 600,
		opacity: [0.5,1],
		easing: "easeOutExpo",
		delay: (el, i, l) => 1500 * (l - i)
	  }).add({
		targets: '.status .additionalStatus',
		scale: [0, 1],
		duration: 500,
		elasticity: 600,
		opacity: [0,1],
		easing: "easeOutExpo",
		delay: (el, i, l) => 300
	  });
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
		  });/*.add({
			targets: '.container #actionBlock .letter',
			translateX: [0,-30],
			opacity: [1,0],
			easing: "easeInExpo",
			duration: 1000,
			delay: 3000
			loopComplete: function(anim) {
				userAction();
				progress = Math.round(anim.progress);
				switch(progress){
					case 100:
						console.log(progress);
					break;
				}
			} */
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