import './Notify.js';

export class FoxesInputHandler {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.forms = [];
    }

    formInit(awaitms) {
        setTimeout(() => {
            this.forms = document.querySelectorAll("form");
            if (this.forms.length > 0) {
                console.log(`Forms found: ${this.forms.length}`);
                this.forms.forEach(form => {
                    form.onsubmit = async (event) => {
                        event.preventDefault();
                        const submitButton = event.submitter;
                        const data = this.collectFormData(form);
                        data.formId = form.id;
                        await this.submitForm(data, $(form), submitButton);
                    };
                });
            } else {
                console.log("No forms were found!");
            }
        }, awaitms);
    }

    collectFormData(form) {
        const inputFields = form.querySelectorAll("input, select, textarea");
        const inputObj = {};

        inputFields.forEach(input => {
            let value;
            const inputLength = $(`input[name="${input.name}"]`).length;

            switch (input.type) {
                case "checkbox":
                    value = input.checked;
                    break;

                case "textarea":
                    value = $(`#${input.id}`).val();
                    break;
					
				case "text":
                value = $(input).val();
                value = value === "true" ? true : (value === "false" ? false : value);
                break;

            default:
                if (inputLength <= 1) {
                    value = $(input).val() || null;
                    value = value === "true" ? true : (value === "false" ? false : value);
                } else {
                    value = Array.from($(`input[name="${input.name}"]`)).map(el => el.value);
                    value = value.map(val => val === "true" ? true : (val === "false" ? false : val));
                }
                break;
            }

            inputObj[input.name] = value;
        });

        return inputObj;
    }

    async submitForm(data, form, submitButton) {
        const delay = this.userDelay(this.foxEngine.replaceData.user_group);
        let response;

        try {
            switch (form[0].method.toLowerCase()) {
                case 'post':
                    response = await this.foxEngine.sendPostAndGetAnswer(data, "JSON");
                    break;

                case 'get':
                    // Implement GET request if needed
                    break;
            }
        } catch (error) {
            response = { type: 'error', message: 'Error during form submission' };
        }

        form.notify(response.message, response.type);
        if (data.playSound != false) {
            this.foxEngine.soundOnClick(response.type);
            this.foxEngine.buttonFreeze(submitButton, delay + 1000);
        }
		

        switch (response.type) {
            case "success":
			console.log(data.refreshPage);
                if (data.refreshPage != false) {
                    setTimeout(() => this.refreshPage(), delay);
                }
                if (data.onSubmit) {
                    this.foxEngine.page.selectPage.thisPage = "";
                    eval(data.onSubmit);
                }
                break;

            default:
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }
            break;
        }
    }

    userDelay(userGroup) {
        switch (userGroup) {
            case 4:
                return 4000;

            case 1:
                return 1000;

            default:
                return 5000;
        }
    }

    refreshPage() {
        console.log("Updating");
        if ("pushState" in history) {
            history.pushState("", document.title, location.pathname + location.search);
        } else {
            const scrollV = document.body.scrollTop;
            const scrollH = document.body.scrollLeft;
            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;
        }
        location.reload();
    }
}
