/*
 *	FoxesInputHandler ver - 2.2.5
 *	Copyright Foxesworld.ru
 */

function inputHandler() {

	this.initialised = false;
	this.forms = new Array();
	
	this.formInit = function (awaitms) {
		if(!this.initialised) {
			this.initialised = true;
			setTimeout(() => {
				this.forms = document.querySelectorAll("form");
				if (this.forms.length >= 1) {
					FoxEngine.debugSend("Forms found: " + this.forms.length, "");
					this.forms.forEach(form => {
						console.log('	- '+form.id);
						form.onsubmit = function(event) {
							event.preventDefault();
							submitButton = event.submitter;
							data = collectFormData(form);
							data["formId"] = form.id;	
							submitForm(data, $(this), submitButton);
						}
					});
				} else {
					FoxEngine.debugSend("No forms were found!", "color: orange");
				}
			}, awaitms);
		}
	};
		
	collectFormData = function(form) {
		let inputFields = form.querySelectorAll("input, select, textarea");
		let inputObjArr = {};

		inputFields.forEach(input => {
			let value;
				let inputLength = $('input[name*="' + input.name + '"]').length;
				switch (input.type) {
					case "checkbox":
						value = (input.checked) ? true : false;
						break;
						
					case "textarea":
						value = $("#"+input.id).val();
					break;

					default:
						switch (inputLength) {
							case '':
							case 0:
							case 1:
								value = (Boolean(input.value)) ? $('input[name*="' + input.name + '"]').val() : null;
								break;

							default:
								let inputArray = [];
								for (let i = 0; i < inputLength; i++) {
									let thisVar = $('input[name*="' + input.name + '"]')[i];
									inputArray.push(thisVar.value);
								}
								value = inputArray;
								break;
						}

						break;
				}
				inputObjArr[input.name] = value;
		});
		return inputObjArr;
	};
	
	submitForm = function(data, form, submitButton) {
		let answer = 'notSent';
		let delay = userDelay(replaceData.user_group);
		request.path = form.context.action;
		switch (form.context.method) {
			case 'post':
				answer = request.send_post(data);
				break;

			case 'get':
				answer = request.sendGet(data);
				break;
		}

	answer.onreadystatechange = function() {
			if (answer.readyState === 4) {   
				let response = JSON.parse(this.responseText);
				form.notify(response.message, response.type);
				if(data.playSound === true || data.playSound === undefined){
					FoxEngine.soundOnClick(response.type);
					FoxEngine.buttonFreeze(submitButton, delay + 1000);
				}

				switch(response.type){
					case "success":
						//$.growl.notice({ title: "Информация", message: response.message});
						if(data.refreshPage === true || data.refreshPage === undefined){
							setTimeout(() => {
								refreshPage();
							}, delay);
						}
						
					break;
					
					case "error":
						captchaReset();
						//$.growl.error({ title: "Информация", message: response.message});
					break;
					
					case "warn":
						captchaReset();
					break;
				}

			}
		};
	};
	
	captchaReset = function(){
		if(grecaptcha.getResponse().length > 0) {
			grecaptcha.reset();
		}
	}
	
	userDelay = function(userGroup){
		let delay = 0;
		switch(userGroup){
			case 4:
				delay = 4000;
			break;
			
			case 1:
				delay = 1000;
			break;
			
			default:
				delay = 5000;
			break;
		}
		
		return delay;
	};

	refreshPage = function() {
		var scrollV, scrollH, loc = window.location;
		if ("pushState" in history)
			history.pushState("", document.title, loc.pathname + loc.search);
		else {
			scrollV = document.body.scrollTop;
			scrollH = document.body.scrollLeft;
			document.body.scrollTop = scrollV;
			document.body.scrollLeft = scrollH;
		}
		location.reload();
	};
}
