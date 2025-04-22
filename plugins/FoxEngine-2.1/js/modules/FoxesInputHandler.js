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
                this.foxEngine.log(`Forms found: ${this.forms.length}`);
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
                this.foxEngine.log("No forms were found!", "WARN");
            }
        }, awaitms);
    }

collectFormData(form) {
    const inputObj = {};
    const elements = Array.from(form.elements).filter(el => el.name);

    // Группируем элементы по имени
    const groups = elements.reduce((acc, el) => {
        acc[el.name] = acc[el.name] || [];
        acc[el.name].push(el);
        return acc;
    }, {});

    for (const [name, inputs] of Object.entries(groups)) {
        let value;

        const first = inputs[0];
        const type  = first.type;
        const tag   = first.tagName.toLowerCase();

        // 1) checkbox
        if (type === 'checkbox') {
            if (inputs.length === 1) {
                value = first.checked;
            } else {
                value = inputs
                    .filter(i => i.checked)
                    .map(i => this.normalizeValue(i.value));
            }

        // 2) radio
        } else if (type === 'radio') {
            const checked = inputs.find(i => i.checked);
            value = checked ? this.normalizeValue(checked.value) : undefined;

        // 3) select[multiple]
        } else if (tag === 'select' && first.multiple) {
            value = Array.from(first.selectedOptions)
                .map(opt => this.normalizeValue(opt.value));

        // 4) все остальные (text, textarea, select-single, number и т.д.)
        } else {
            if (inputs.length === 1) {
                value = this.normalizeValue(first.value);
            } else {
                value = inputs.map(i => this.normalizeValue(i.value));
            }
        }

        // 5) фильтр пустых значений: "", undefined, [] или [ "", undefined, ... ]
        const isEmpty =
            value === "" ||
            value === undefined ||
            (Array.isArray(value) && value.every(v => v === "" || v === undefined));

        if (!isEmpty) {
            inputObj[name] = value;
        }
    }

    return inputObj;
}



	// Преобразует строку "true"/"false" в булев тип, если применимо
	normalizeValue(value) {
		if (value === "true") return true;
		if (value === "false") return false;
		return value;
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
		this.foxEngine.lottieAnimation.init("statusAnim", "/templates/foxengine2/assets/anim/"+response.type+".json", false);
		if(response.action !== undefined) {
			eval(response.action);
		}
        if (data.playSound !== false) {
            this.foxEngine.soundOnClick(response.type);
            this.foxEngine.buttonFreeze(submitButton, delay + 1000);
        }


        switch (response.type) {
            case "success":
                if (data.refreshPage !== false) {
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
