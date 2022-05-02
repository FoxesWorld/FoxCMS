	
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
				let value;
				 if($(input).prop('name') === 'required' && input.value == ''){
					$('.input_block > ' + '#'+input.id).notify(input.id + ' is requiered');
					throw new Error(input.id + ' is requiered');
				 }
	
				switch(input.type){
					case "checkbox":
						value = (input.checked) ? 1 : 0;
					break;
					
					default:
						value = (Boolean(input.value)) ? input.value : null;
					break;
				}
				inputObjArr[input.id] = value;
			});
			return inputObjArr;
		};
		
		function submitForm(data, url, method, button){
			let answer = 'notSent';
			//console.log(data);
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
	
