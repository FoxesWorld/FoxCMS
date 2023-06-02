/*
 *	FoxesInputHandler ver - 1.2.7
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
                    data["onSuccess"] = form.id;
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
        checkFill(input);
        let value;
        if ($(input).prop('name') && input.name !== 'required') {
            let inputLength = $('input[name*="' + input.name + '"]').length;
            switch (input.type) {
                case "checkbox":
                    value = (input.checked) ? 1 : 0;
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
        } else {
            switch (input.type) {
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

function checkFill(input) {
    if ($(input).prop('name') === 'required') {
        if (input.value == '') {
            $('.input_block > ' + '#' + input.id).notify(input.id + ' is requiered');
            throw new Error(input.id + ' is requiered');
        }
    }
}

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
			setTimeout(() => {
				removeHash();
			}, delay);
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