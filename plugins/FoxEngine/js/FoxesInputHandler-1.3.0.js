/*
 *	FoxesInputHandler ver - 1.3.0
 *	Copyright Foxesworld.ru
 */
let data = new Array();
let forms = new Array();
let submitButton = new String();
let delay = 4500;

function formInit(sleep) {				
	if(replaceData.user_group == 1) {
		delay = 1000;
	}
    setTimeout(() => {
        forms = document.querySelectorAll("form");
        if (forms.length >= 1) {
            FoxEngine.debugSend("Forms found: " + forms.length, "");
            forms.forEach(form => {
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
    }, sleep);
};


function collectFormData(form) {
    let inputFields = form.querySelectorAll("input, select, textarea");
    let inputObjArr = {};

    inputFields.forEach(input => {
        let value;
            let inputLength = $('input[name*="' + input.name + '"]').length;
			console.log(input.type + " " + input.value);
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


function submitForm(data, form, submitButton) {
    let answer = 'notSent';
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
            FoxEngine.soundOnClick(response.type);
            FoxEngine.buttonFreeze(submitButton, delay + 1000);
			switch(response.type){
				case "success":
					//$.growl.notice({ title: "Информация", message: response.message});
					
					setTimeout(() => {
						removeHash();
					}, delay);
					
				break;
				
				case "error":
					//$.growl.error({ title: "Информация", message: response.message});
				break;
			}

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
        //loc.hash = "";
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
    location.reload();
}