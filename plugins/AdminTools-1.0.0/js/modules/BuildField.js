/**
 * @fileoverview BuildField class for FoxesCraft
 * 
 * This file contains the BuildField class, which is responsible for creating input fields dynamically based on configuration data.
 * It provides methods for creating various types of input fields such as text inputs, number inputs, dropdowns, checkboxes, textareas, and tag inputs.
 * 
 * Authors: AidenFox
 * Date: [10.05.24]
 * Version: 1.4.0 ALPHA
 */
export class BuildField {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.inputFields = classInstance.formFields;
        this.initAwait = 600;
    }
	
	async buildFormFields(values) {
		let formHtml = '';

		for (let i = 0; i < values.length; i++) {
			const rowData = values[i];
			formHtml += '<tr>';

			for (let j = 0; j < this.inputFields.length; j++) {
				const { fieldName, fieldType, optionsArray } = this.inputFields[j];
				const value = rowData[fieldName];
				formHtml += "<td>";
				formHtml += await this.createInputBlock(fieldName, value, fieldType, optionsArray);
				formHtml += "</td>";
			}

			formHtml += '</tr>';
		}

		return formHtml;
	}



    async createInputBlock(fieldName, value, fieldType, optionsArray) {
        const inputHandlers = {
            'text': () => this.createTextInput(fieldName, value),
            'number': () => this.createNumberInput(fieldName, value),
            'dropdown': () => this.createDropdown(fieldName, value, optionsArray),
            'checkbox': () => this.createCheckboxInput(fieldName, value),
            'textarea': () => this.createTextareaInput(fieldName, value),
            'tagify': () => this.createTagifyInput(fieldName, value),
			'date': () => this.createDatePickerInput(fieldName, value)
        };

        if (this.inputFields) {
            const fieldInfo = this.inputFields.find(field => field.fieldName === fieldName);
            if (fieldInfo) {
                //const { fieldType } = fieldInfo;
                const handler = inputHandlers[fieldType];
                if (handler) {
                    return handler();
                } else {
                    console.error(`Unknown input type for field: ${fieldName}`);
                    return '';
                }
            } else {
                console.error(`Field not found in inputFields: ${fieldName}`);
                return '';
            }
        } else {
            console.error('inputFields not defined');
            return '';
        }
    }

    createTextInput(key, value) {
        return `
            <div class="input_block">
                <label class="label" for="${key}">${key}:</label>
                <input type="text" name="${key}" class="input" value="${value}" />
            </div>`;
    }
	
createDatePickerInput(key, value) {
    const uniqueId = Math.random().toString(36).substring(7);
    let html = `<div class="input_block">
                    <label class="label" for="${key}-${uniqueId}">Choose Date</label>
                    <input type="hidden" name="${key}" id="${key}-${uniqueId}-unix" value="${value}" />
                    <input type="text" class="input" id="${key}-${uniqueId}" readonly />
                </div>`;

    setTimeout(() => {
        let dateValue = foxEngine.utils.convertUnixTime(value);

        if (isNaN(dateValue.getTime())) {
            dateValue = new Date();
        }

        const datepickerElement = document.querySelector(`#${key}-${uniqueId}`);

        const datepicker = new Datepicker(datepickerElement, {
            defaultDate: dateValue,
            dateFormat: 'dd.mm.yyyy',
            onChange: function(selectedDate) {
                if (selectedDate instanceof Date) {
                    const unixValue = selectedDate.getTime();
                    $(`#${key}-${uniqueId}-unix`).val(unixValue);
                }
            }
        });

        datepicker.setDate(dateValue);
    }, this.initAwait);

    return html;
}

    createNumberInput(key, value) {
        return `
            <div class="input_block">
                <label class="label" for="${key}">${key}:</label>
                <input type="number" name="${key}" class="input" value="${value}" />
            </div>`;
    }

    createCheckboxInput(key, value) {
        const isChecked = value === "true" ? 'checked' : '';
        const inputBlock = `
            <div class="input_block">
                <input type="checkbox" id="${key}" name="${key}" class="input ${key}-checkbox" ${isChecked} />
                <label class="label" for="${key}">${key}:</label>
            </div>`;

        setTimeout(() => {
            new Switchery(document.querySelector("." + key + "-checkbox"));
        }, this.initAwait);

        return inputBlock;
    }

    createTextareaInput(key, value) {
        const textareaId = `${key}_textarea`;
        const inputBlock = `
            <div class="input_block">
                <label class="label d-none" for="${textareaId}">${key}:</label>
                <textarea id="${textareaId}" name="${key}" class="d-none">${value}</textarea>
            </div>`;

        setTimeout(() => {
            const textarea = document.getElementById(textareaId);
            const parent = textarea.parentNode;
            const editor = CodeMirror.fromTextArea(textarea, {
                value: value,
                mode: "htmlmixed",
                lineNumbers: false,
                theme: "default",
                viewportMargin: Infinity,
                lineWrapping: true
            });
            editor.setSize("100%", "auto");
            window.addEventListener('resize', () => editor.setSize("100%", "auto"));
            editor.refresh();
        }, this.initAwait);

        return inputBlock;
    }

    createDropdown(key, value, optionsArray) {
        let selectOptions = '';
        optionsArray.forEach(option => {
            let displayValue = option;
            if (option.includes('/')) {
                displayValue = option.split('/').pop();
            }
            const isSelected = option === value ? 'selected' : '';
            selectOptions += `<option value="${option}" ${isSelected}>${displayValue}</option>`;
        });

        return `
            <div class="input_block">
                <label class="label" for="${key}">${key}:</label>
                <select name="${key}" id="${key}" class="input">
                    ${selectOptions}
                </select>
            </div>`;
    }

    createTagifyInput(key, value) {
        const inputBlock = `
            <div class="input_block">
                <label class="label" for="${key}">${key}:</label>
                <input type="text" id="${key}" name="${key}" class="input" value="${value}">
            </div>`;

        setTimeout(() => {
            const input = document.getElementById(key);
            new Tagify(input, {
                originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(','),
                whitelist: [],
                enforceWhitelist: false,
                delimiters: ",",
                callbacks: {
                    //input: (e) => {
                    //    e.target.setCustomValidity('');
                    //}
                }
            });
        }, this.initAwait);

        return inputBlock;
    }
}
