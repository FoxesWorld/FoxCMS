class FoxesInputHandler {
    constructor(foxEngine) {
		this.foxEngine = foxEngine;
        this.forms = [];
    }

    formInit(awaitms) {
        setTimeout(() => {
            this.forms = document.querySelectorAll("form");
            if (this.forms.length >= 1) {
                console.log("Forms found: " + this.forms.length);
                this.forms.forEach(form => {
                    form.onsubmit = (event) => {
                        event.preventDefault();
                        const submitButton = event.submitter;
                        const data = this.collectFormData(form);
                        data["formId"] = form.id;
                        this.submitForm(data, $(form), submitButton);
                    };
                });
            } else {
                console.log("No forms were found!");
            }
        }, awaitms);
    }

    collectFormData(form) {
        const inputFields = form.querySelectorAll("input, select, textarea");
        const inputObjArr = {};

        inputFields.forEach(input => {
            let value;
            const inputLength = $('input[name*="' + input.name + '"]').length;
            switch (input.type) {
                case "checkbox":
                    value = input.checked;
                    break;

                case "textarea":
                    value = $("#" + input.id).val();
                    break;

                default:
                    switch (inputLength) {
                        case '':
                        case 0:
                        case 1:
                            value = $(input).val() || null;
                            break;

                        default:
                            const inputArray = [];
                            for (let i = 0; i < inputLength; i++) {
                                const thisVar = $('input[name*="' + input.name + '"]')[i];
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
    }

	async submitForm(data, form, submitButton) {
		let answer = 'notSent';
		let delay = this.userDelay(foxEngine.replaceData.user_group);
		
		switch(form.context.method) {
			case 'post':
				answer = await this.foxEngine.sendPostAndGetAnswer(data, "JSON");
				break;

			case 'get':
				//answer = this.foxEngine.request.sendGet(data); WIP
				break;
		}
		form.notify(answer.message, answer.type);

				if(data.sound === true || data.sound === undefined){
					foxEngine.soundOnClick(answer.type);
					foxEngine.buttonFreeze(submitButton, delay + 1000);
				}

				switch(answer.type){
					case "success":
						//$.growl.notice({ title: "Информация", message: response.message});
						if(data.refresh === true || data.refresh === undefined){
							setTimeout(() => {
								this.refreshPage();
							}, delay);
						}
						
					break;
					
					case "error":
						//$.growl.error({ title: "Информация", message: response.message});
					break;
				}
	};

    userDelay(userGroup) {
        let delay = 0;
        switch (userGroup) {
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
    }

    refreshPage() {
		console.log("Updatig");
        let scrollV, scrollH, loc = window.location;
        if ("pushState" in history)
            history.pushState("", document.title, loc.pathname + loc.search);
        else {
            scrollV = document.body.scrollTop;
            scrollH = document.body.scrollLeft;
            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;
        }
        location.reload();
    }
}

export { FoxesInputHandler };
