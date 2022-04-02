	
		function formInit(sleep) {
			setTimeout(() => {
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
	
