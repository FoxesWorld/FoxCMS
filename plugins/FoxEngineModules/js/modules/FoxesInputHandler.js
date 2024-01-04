// FoxesInputHandler.js

export const FoxesInputHandler = (function () {
    const forms = [];

    function formInit(awaitms) {
        setTimeout(() => {
            forms = document.querySelectorAll("form");
            if (forms.length >= 1) {
                FoxEngine.debugSend("Forms found: " + forms.length, "");
                forms.forEach(form => {
                    form.onsubmit = function (event) {
                        event.preventDefault();
                        const submitButton = event.submitter;
                        const data = collectFormData(form);
                        data["formId"] = form.id;
                        submitForm(data, $(this), submitButton);
                    };
                });
            } else {
                FoxEngine.debugSend("No forms were found!", "color: orange");
            }
        }, awaitms);
    }

    function collectFormData(form) {
        const inputFields = form.querySelectorAll("input, select, textarea");
        const inputObjArr = {};

        inputFields.forEach(input => {
            let value;
            const inputLength = $('input[name*="' + input.name + '"]').length;
            switch (input.type) {
                case "checkbox":
                    value = (input.checked) ? true : false;
                    break;

                case "textarea":
                    value = $("#" + input.id).val();
                    break;

                default:
                    switch (inputLength) {
                        case '':
                        case 0:
                        case 1:
                            value = (Boolean(input.value)) ? $('input[name*="' + input.name + '"]').val() : null;
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

    function submitForm(data, form, submitButton) {
        let answer = 'notSent';
        const delay = userDelay(replaceData.user_group);
        request.path = form.context.action;
        switch (form.context.method) {
            case 'post':
                answer = request.send_post(data);
                break;

            case 'get':
                answer = request.sendGet(data);
                break;
        }

        answer.onreadystatechange = function () {
            if (answer.readyState === 4) {
                const response = JSON.parse(this.responseText);
                form.notify(response.message, response.type);
                if (data.sound === true || data.sound === undefined) {
                    FoxEngine.soundOnClick(response.type);
                    FoxEngine.buttonFreeze(submitButton, delay + 1000);
                }

                switch (response.type) {
                    case "success":
                        if (data.refresh === true || data.refresh === undefined) {
                            setTimeout(() => {
                                refreshPage();
                            }, delay);
                        }
                        break;

                    case "error":
                        break;
                }
            }
        };
    }

    function userDelay(userGroup) {
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

    function refreshPage() {
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

    return {
        formInit,
        // ... (export other functions if needed)
    };
})();
