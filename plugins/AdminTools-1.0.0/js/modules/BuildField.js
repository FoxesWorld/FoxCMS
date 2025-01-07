/**
 * @fileoverview BuildField class for FoxesCraft
 * 
 * This file contains the BuildField class, which is responsible for creating input fields dynamically based on configuration data.
 * It provides methods for creating various types of input fields such as text inputs, number inputs, dropdowns, checkboxes, textareas, and tag inputs.
 * 
 * Authors: AidenFox
 * Date: [07.01.25]
 * Version: 2.0.0
 */
export class BuildField {
    constructor(classInstance, options = {}) {
        this.classInstance = classInstance;
        this.inputFields = classInstance.formFields || [];
        this.initAwait = options.initAwait || 600;

        this.defaultHandlers = {
			label: this.createLabel.bind(this),
            text: this.createTextInput.bind(this),
            number: this.createNumberInput.bind(this),
            dropdown: this.createDropdown.bind(this),
            checkbox: this.createCheckboxInput.bind(this),
            textarea: this.createTextareaInput.bind(this),
            tagify: this.createTagifyInput.bind(this),
            date: this.createDatePickerInput.bind(this),
        };

        this.handlers = { ...this.defaultHandlers, ...(options.customHandlers || {}) };
    }

    async buildFormFields(data) {
        const rows = await Promise.all(data.map(async (rowData) => {
            let rowHtml = '<tr>';
            for (const field of this.inputFields) {
                const { fieldName, fieldType, optionsArray } = field;
                const value = rowData[fieldName];
                rowHtml += `<td>${await this.createInputBlock(fieldName, value, fieldType, optionsArray)}</td>`;
            }
            rowHtml += '</tr>';
            return rowHtml;
        }));
        return rows.join('');
    }
	
	async buildTable(fields, data, rowTemplate) {
    const rows = await Promise.all(data.map(async (rowData, index) => {
        const rowHtml = await this.renderRow(fields, { ...rowData, index }, rowTemplate);
        return `<tr>${rowHtml}</tr>`;
    }));
    return rows.join("");
}


    async createInputBlock(fieldName, value, fieldType, optionsArray) {
        const handler = this.handlers[fieldType];
        if (handler) {
            return handler(fieldName, value, optionsArray);
        } else {
            console.error(`Unknown input type for field: ${fieldName}`);
            return '';
        }
    }
	
	createLabel(fieldName, value) {
		return `<b>${value}`;
	}

    createTextInput(fieldName, value) {
        return `
            <div class="input_block">
                <label class="label" for="${fieldName}">${fieldName}:</label>
                <input type="text" name="${fieldName}" class="input" value="${value}" />
            </div>`;
    }

    createNumberInput(fieldName, value) {
        return `
            <div class="input_block">
                <label class="label" for="${fieldName}">${fieldName}:</label>
                <input type="number" name="${fieldName}" class="input" value="${value}" />
            </div>`;
    }

    createDropdown(fieldName, value, optionsArray = []) {
        const options = optionsArray
            .map(option => `<option value="${option}" ${option === value ? 'selected' : ''}>${option}</option>`)
            .join('');
        return `
            <div class="input_block">
                <label class="label" for="${fieldName}">${fieldName}:</label>
                <select name="${fieldName}" class="input">${options}</select>
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

    createTextareaInput(fieldName, value) {
        const textareaId = `${fieldName}_textarea`;
        return `
            <div class="input_block">
                <label class="label d-none" for="${textareaId}">${fieldName}:</label>
                <textarea id="${textareaId}" name="${fieldName}" class="d-none">${value}</textarea>
            </div>`;
    }

    createTagifyInput(fieldName, value) {
        const uniqueId = `${fieldName}_${Math.random().toString(36).substr(2, 9)}`;
        const inputBlock = `
            <div class="input_block">
                <label class="label" for="${uniqueId}">${fieldName}:</label>
                <input type="text" id="${uniqueId}" name="${fieldName}" class="input" value="${value}">
            </div>`;
        setTimeout(() => {
            const input = document.getElementById(uniqueId);
            new Tagify(input, {
                originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(','),
                delimiters: ',',
            });
        }, this.initAwait);
        return inputBlock;
    }

    createDatePickerInput(fieldName, value) {
        const uniqueId = `${fieldName}_${Math.random().toString(36).substr(2, 9)}`;
        const unixInputId = `${uniqueId}_unix`;
        const html = `
            <div class="input_block">
                <label class="label" for="${uniqueId}">${fieldName}:</label>
                <input type="hidden" name="${fieldName}" id="${unixInputId}" value="${value}" />
                <input type="text" class="input" id="${uniqueId}" readonly />
            </div>`;
        setTimeout(() => {
            const dateValue = new Date(parseInt(value, 10)) || new Date();
            flatpickr(`#${uniqueId}`, {
                enableTime: true,
                dateFormat: 'd.m.Y H:i',
                defaultDate: dateValue,
                onChange: (selectedDates) => {
                    if (selectedDates.length > 0) {
                        document.getElementById(unixInputId).value = selectedDates[0].getTime();
                    }
                }
            });
        }, this.initAwait);
        return html;
    }

    async renderRow(fields, rowData, template) {
        const replacements = {};
        for (const field of fields) {
            const { fieldName, fieldType } = field;
            const value = rowData[fieldName];
            replacements[fieldName] = await this.createInputBlock(fieldName, value, fieldType);
        }
        return foxEngine.replaceTextInTemplate(template, replacements);
    }

    validateForm(fields, data) {
        const errors = [];
        fields.forEach(field => {
            const { fieldName, validation } = field;
            const value = data[fieldName];
            if (validation) {
                if (validation.required && !value) {
                    errors.push(`${fieldName} is required.`);
                }
                if (validation.regex && !validation.regex.test(value)) {
                    errors.push(`${fieldName} has an invalid format.`);
                }
            }
        });
        return errors;
    }
}
