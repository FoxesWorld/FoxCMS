	function formInit(sleep) {
			setTimeout(() => {
				console.info('%c Using FoxesWorld Form Utils...', 'background: #39312fc7; color: yellow');
				let forms = document.querySelectorAll("form");
				if (forms.length >= 1) {
					console.log("Found forms: " + forms.length);
					forms.forEach(form => {
						form.addEventListener("submit", function(event) {
							event.preventDefault();
							let data = collectFormData(form);
							data["fname"] = form.id;
							data["sendUrl"] = form.action;
							submitForm(data, form.action, form.method, $(this));
						});
					});
				} else {
					console.warn("No forms were found!");
				}
			}, sleep);
		};

		function collectFormData(form) {
			let inputFields = form.querySelectorAll("input, select, textarea");
			let inputObjArr = {};
			
			inputFields.forEach(input => {
				checkFill(input);
				let value;
				if($(input).prop('name') && input.name !== 'required') {
					switch(input.type){
						case "checkbox":
							value = (input.checked) ? 1 : 0;
						break;
						
						default:
							switch($('input[name*="'+input.name+'"]').length) {
								case '':
								case 0:
								case 1:
									value = (Boolean(input.value)) ? $('input[name*="'+ input.name +'"]').val() : null;
								break;
								
								default:
									throw new Error(input.name + ' ' + $('input[name*="'+input.name+'"]').length +' is Array! Currently Unsupported!');
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
			switch(method){
				case 'post':
					answer = request.send_post(data);
				break;
				
				case 'get':
					answer = request.sendGet(data);
				break;
			}
			
			answer.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
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
	