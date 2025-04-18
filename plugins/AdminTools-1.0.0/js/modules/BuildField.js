/**
 * @fileoverview BuildField class for FoxesCraft
 * 
 * Этот класс создаёт динамические поля ввода на основе переданных данных конфигурации.
 * Поддерживаются поля: текст, число, выпадающий список, чекбокс, textarea, tagify и date-picker.
 * 
 * Авторы: AidenFox
 * Дата: [13.04.25]
 * Версия: 2.2.0
 */
export class BuildField {
    constructor(classInstance, options = {}) {
        this.classInstance = classInstance;
        this.inputFields = classInstance.formFields || [];
        this.initAwait = options.initAwait || 600;
        
        // Базовые обработчики для создания полей ввода
        this.defaultHandlers = {
            label: this.createLabel.bind(this),
            text: this.createTextInput.bind(this),
            number: this.createNumberInput.bind(this),
            dropdown: this.createDropdown.bind(this),
            checkbox: this.createCheckboxInput.bind(this),
            textarea: this.createTextareaInput.bind(this),
            tagify: this.createTagifyInput.bind(this),
            date: this.createDatePickerInput.bind(this),
			image: this.createImage.bind(this)
        };
        // Позволяет переопределять или добавлять обработчики
        this.handlers = { ...this.defaultHandlers, ...(options.customHandlers || {}) };

        // Для обеспечения единоразовой инициализации каждого поля
        // используется встроенная проверка через data-атрибуты в DOM элементах.
    }

    /**
     * Унифицированный метод для создания блока с плавающей меткой.
     * Использует постоянный id для полей, где это необходимо.
     * @param {string} fieldName - имя поля.
     * @param {string} value - значение.
     * @param {string} type - тип инпута.
     * @param {string} [id=fieldName] - идентификатор элемента.
     * @returns {string} HTML-код блока.
     */
    _createFloatingInput(fieldName, value, type = 'text', id = fieldName) {
        return `
            <div class="form-floating mb-3">
                <input type="${type}" class="form-control" name="${fieldName}" id="${id}" placeholder="%lang|${fieldName}%" value="${value}">
                <label for="${id}">${fieldName}</label>
            </div>`;
    }

    /**
     * Унифицированный метод для отложенного выполнения.
     * @param {function} callback - функция, которую следует выполнить.
     * @param {number} [delay=this.initAwait] - задержка в мс.
     */
    _runAfterDelay(callback, delay = this.initAwait) {
        setTimeout(callback, delay);
    }

    /**
     * Выполнить инициализацию элемента только один раз.
     * @param {string} key - уникальный ключ для данного инициализатора (например, id элемента).
     * @param {HTMLElement} el - DOM-элемент, который инициализируется.
     * @param {function} initFn - функция инициализации.
     */
    _initializeOnce(key, el, initFn) {
        if (el && !el.dataset.initializedFor) {
            initFn();
            el.dataset.initializedFor = key;
        }
    }

    /**
     * Создание HTML-структуры формы для каждой строки данных.
     * @param {Array} data - массив объектов с данными.
     * @returns {Promise<string>} HTML строк таблицы.
     */
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
    
    /**
     * Построение таблицы с формами на основании шаблона.
     * @param {Array} fields - массив определений полей.
     * @param {Array} data - данные для таблицы.
     * @param {string} rowTemplate - шаблон строки.
     * @returns {Promise<string>} HTML таблицы.
     */
    async buildTable(fields, data, rowTemplate) {
        const rows = await Promise.all(data.map(async (rowData, index) => {
            const rowHtml = await this.renderRow(fields, { ...rowData, index }, rowTemplate);
            return `<tr>${rowHtml}</tr>`;
        }));
        return rows.join("");
    }

    /**
     * Создание блока ввода посредством вызова соответствующего обработчика.
     * @param {string} fieldName 
     * @param {string} value 
     * @param {string} fieldType 
     * @param {Array} [optionsArray] 
     * @returns {string} HTML-код блока ввода.
     */
    async createInputBlock(fieldName, value, fieldType, optionsArray) {
        const handler = this.handlers[fieldType];
        if (handler) {
            return handler(fieldName, value, optionsArray);
        } else {
            console.error(`Unknown input type for field: ${fieldName}`);
            return '';
        }
    }
    
    /**
     * Создание простой метки.
     * @param {string} fieldName 
     * @param {string} value 
     * @returns {string}
     */
    createLabel(fieldName, value) {
        return `<b>${value}</b>`;
    }

    createTextInput(fieldName, value) {
        return this._createFloatingInput(fieldName, value, 'text');
    }

    createNumberInput(fieldName, value) {
        return this._createFloatingInput(fieldName, value, 'number');
    }

    /**
     * Создание выпадающего списка.
     * @param {string} fieldName 
     * @param {string} value 
     * @param {Array} optionsArray 
     * @returns {string}
     */
    createDropdown(fieldName, value, optionsArray = []) {
        const options = optionsArray.map(option =>
            `<option value="${option}" ${option === value ? 'selected' : ''}>${option}</option>`
        ).join('');
        return `
            <div class="form-floating mb-3">
                <select id="${fieldName}" name="${fieldName}" class="form-select">
                    ${options}
                </select>
                <label for="${fieldName}">${fieldName}</label>
            </div>`;
    }

    /**
     * Создание чекбокса с отложенной инициализацией Switchery.
     * Используется постоянный id, равный fieldName.
     * @param {string} key 
     * @param {string} value 
     * @returns {string}
     */
    createCheckboxInput(key, value) {
        const isChecked = value === "true" ? 'checked' : '';
        const id = key; // используем key как постоянный id
        const html = `
            <div class="form-floating mb-3">
                <input type="checkbox" id="${id}" class="form-control ${id}-checkbox" name="${key}" ${isChecked} />
                <label for="${id}">${key}</label>
            </div>`;
        this._runAfterDelay(() => {
            const el = document.getElementById(id);
            this._initializeOnce(`${id}_switchery`, el, () => {
                new Switchery(el);
            });
        });
        return html;
    }

    /**
     * Создание текстовой области с использованием CodeMirror.
     * Для textarea используется id в виде fieldName + '_textarea'
     * @param {string} fieldName 
     * @param {string} value 
     * @returns {string}
     
createTextareaInput(fieldName, value) {
    const textareaId = `${fieldName}_textarea`;
    const safeValue = typeof value === "string" ? value : "";

    this._runAfterDelay(() => {
        const textarea = document.getElementById(textareaId);
        this._initializeOnce(`${textareaId}_cm`, textarea, () => {
            const editor = CodeMirror.fromTextArea(textarea, {
                mode: "htmlmixed",
                lineNumbers: false, 
                theme: "default",
                viewportMargin: Infinity,
                lineWrapping: true
            });
			console.log(editor);

            editor.setSize("100%", "auto");
            window.addEventListener('resize', () => editor.setSize("100%", "auto"));
            editor.refresh();
            editor.getWrapperElement().classList.add("codeHtml", "mb-3");

            // Sync CodeMirror -> textarea on change
            //editor.on("change", () => {
			//	console.log(editor.getValue());
            //    textarea.value = editor.getValue();
            //});

            // Extra sync on form submit
            textarea.form?.addEventListener("submit", () => {
                textarea.value = editor.getValue();
            });
        });
    });

    return `
        <div class="mb-3" style="display: flex">
            <label for="${textareaId}" class="form-label">${fieldName}</label>
            <textarea id="${textareaId}" name="${fieldName}" class="form-control d-none" style="display: none;">${safeValue}</textarea>
        </div>`;
}*/

createTextareaInput(fieldName, value) {
    const textareaId = `${fieldName}_textarea`;
    const safeValue = typeof value === "string" ? value : "";

    return `
        <div class="mb-3">
            <label for="${textareaId}" class="form-label">${fieldName}</label>
            <textarea 
                id="${textareaId}" 
                name="${fieldName}" 
                class="form-control" 
                rows="10"
                style="resize: vertical;">${safeValue}</textarea>
        </div>`;
}

	createImage(fieldName, value) {
		const imageId = `${fieldName}_image`;
		const safeValue = typeof value === "string" ? value : "";

		return `
			<div class="mb-3">
				<img src="${value}" class="previewImage" alt="${imageId}"/>
			</div>`;
	}




    /**
     * Создание поля ввода с Tagify.
     * Для каждого поля tagify используется постоянный id: fieldName + '_tagify'
     * @param {string} fieldName 
     * @param {string} value 
     * @returns {string}
     */
    createTagifyInput(fieldName, value, uniqueSuffix = Math.random().toString(36).substring(2, 8)) {
        const id = `${fieldName}_tagify_${uniqueSuffix}`;
        this._runAfterDelay(() => {
            const input = document.getElementById(id);
            this._initializeOnce(`${id}_tagify`, input, () => {
                new Tagify(input, {
                    originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(','),
                    delimiters: ','
                });
            });
        });
        return this._createFloatingInput(fieldName, value, 'text', id);
    }

/**
 * Создание поля выбора даты с использованием flatpickr.
 * Для каждого date-picker используется уникальный id.
 * @param {string} fieldName 
 * @param {string} value 
 * @param {number|string} [uniqueSuffix] - Уникальный суффикс для id
 * @returns {string}
 */
createDatePickerInput(fieldName, value, uniqueSuffix = Math.random().toString(36).substring(2, 8)) {
	const id = `${fieldName}_date_${uniqueSuffix}`;
	const unixInputId = `${id}_unix`;
	const html = `
		<div class="form-floating mb-3">
			<input type="hidden" name="${fieldName}" id="${unixInputId}" value="${value}" />
			<input type="text" class="form-control" id="${id}" readonly />
			<label for="${id}">${fieldName}:</label>
		</div>`;

	this._runAfterDelay(() => {
		const input = document.getElementById(id);
		this._initializeOnce(`${id}_flatpickr`, input, () => {
			const dateValue = new Date(parseInt(value, 10)) || new Date();
			flatpickr(input, {
				enableTime: true,
				dateFormat: 'd.m.Y H:i',
				defaultDate: dateValue,
				onChange: (selectedDates) => {
					if (selectedDates.length > 0) {
						document.getElementById(unixInputId).value = selectedDates[0].getTime();
					}
				}
			});
		});
	});

	return html;
}


    /**
     * Генерация строки таблицы с полями, заменяя плейсхолдеры в шаблоне.
     * @param {Array} fields - массив определений полей.
     * @param {Object} rowData - данные строки.
     * @param {string} template - шаблон строки.
     * @returns {Promise<string>} HTML строки.
     */
    async renderRow(fields, rowData, template) {
        const replacements = {};
        for (const field of fields) {
            const { fieldName, fieldType } = field;
            const value = rowData[fieldName];
            replacements[fieldName] = await this.createInputBlock(fieldName, value, fieldType);
        }
        return foxEngine.replaceTextInTemplate(template, replacements);
    }

    /**
     * Валидация данных формы на основе правил валидации каждого поля.
     * @param {Array} fields - массив определений полей.
     * @param {Object} data - данные формы.
     * @returns {Array} массив сообщений об ошибках.
     */
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
