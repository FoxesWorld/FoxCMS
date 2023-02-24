/*
*	Form Utils ver - 1.1.0
*	Copyright Foxesworld.ru
*/	

	let foundFormsArr = new Array();
	function formInit(sleep) {
			setTimeout(() => {
				debugSend('%c Using FoxesWorld Form Utils', 'background: #39312fc7; color: yellow; font-size: 14pt');
				let forms = document.querySelectorAll("form");
				if (forms.length >= 1) {
					debugSend("Listening forms: " + forms.length, "");
					forms.forEach(form => {
						foundFormsArr.push(form.id);
						form.addEventListener("submit", function(event) {
							event.preventDefault();
							let data = collectFormData(form);
							data["fname"] = form.id;
							data["sendUrl"] = form.action;
							submitForm(data, form.action, form.method, $(this));
						});
					});
				} else {
					debugSend("%cNo forms were found!", "color: yellow");
				}
			debugSend(foundFormsArr,"");
			}, sleep);
			foundFormsArr = new Array();
		};

		function collectFormData(form) {
			let inputFields = form.querySelectorAll("input, select, textarea");
			let inputObjArr = {};
			
			inputFields.forEach(input => {
				checkFill(input);
				let value;
				if($(input).prop('name') && input.name !== 'required') {
					let inputLength = $('input[name*="'+input.name+'"]').length;
					switch(input.type){
						case "checkbox":
							value = (input.checked) ? 1 : 0;
						break;
						
						default:
							switch(inputLength) {
								case '':
								case 0:
								case 1:
									value = (Boolean(input.value)) ? $('input[name*="'+ input.name +'"]').val() : null;
								break;
								
								default:
									let inputArray = [];
									for (let i = 0; i < inputLength; i++) {
									    let thisVar = $('input[name*="'+ input.name +'"]')[i];
										inputArray.push(thisVar.value);
									}
									value = inputArray;
								break;
							}
							
						break;
					}
					inputObjArr[input.name] = value;
				} else {
					switch(input.type){
						case "checkbox":
							value = (input.checked) ? 1 : 0;
						break;
						
						default:
							value = (Boolean(input.value)) ? input.value : null;
						break;
					}
					inputObjArr[input.id] = value;
				}

			});
			return inputObjArr;
		};
		
		function submitForm(data, url, method, button){
			let answer = 'notSent';
			request.path = url;
			switch(method){
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
					button.notify(response.message, response.type);
					setTimeout(() => {
						switch(response.type){
							case 'success':
								removeHash();
							break;
							
							case 'error':
							break;
						}
					}, 1000);
				}
			};			
		}
		
		function checkFill(input){
			if($(input).prop('name') === 'required'){
				if(input.value == '') {
					$('.input_block > ' + '#'+input.id).notify(input.id + ' is requiered');
					throw new Error(input.id + ' is requiered');
				}
			}
		}
		
		function removeHash() {
			var scrollV, scrollH, loc = window.location;
			if ("pushState" in history)
				history.pushState("", document.title, loc.pathname + loc.search);
			else {
				scrollV = document.body.scrollTop;
				scrollH = document.body.scrollLeft;
				loc.hash = "";
				document.body.scrollTop = scrollV;
				document.body.scrollLeft = scrollH;
			}
			location.reload();
		}
	