import { JsonArrConfig } from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';

export class Permissions {
    constructor() {
        this.contentHtml = '';
        this.formFields = [
            { fieldName: 'index', fieldType: 'label' },
            { fieldName: 'groupName', fieldType: 'text' },
            { fieldName: 'permName', fieldType: 'text' },
            { fieldName: 'permValue', fieldType: 'tagify' },
        ];
        this.buildField = new BuildField(this);
        this.isSubmitting = false;
        this.forms = [];
    }

    async addContent() {
        try {
            const tableTemplate = await foxEngine.loadTemplate(
                `${foxEngine.elementsDir}admin/permissions/permTable.tpl`,
                true
            );
            this.contentHtml = tableTemplate;
            $('#adminContent').html(this.contentHtml);
            this.initEventListeners();
        } catch (error) {
            console.error('Ошибка при загрузке шаблона таблицы:', error);
        }
    }

    async parsePermissions(input = '*') {
        if (!this.contentHtml) {
            await this.addContent();
        }

        try {
            const data = await foxEngine.sendPostAndGetAnswer(
                { admPanel: 'showPermissions', userMask: input },
                'JSON'
            );
            const formFieldsHtml = await this.buildField.buildFormFields(data);
            $('#permList').html(formFieldsHtml);
        } catch (error) {
            console.error('Ошибка при получении или обработке данных разрешений:', error);
        }
    }

    collectFormData() {
        const rows = $('#permList tr');
        const permissionsData = [];

        rows.each(function () {
            const groupName = $(this).find('input[name="groupName"]').val()?.trim();
            const permName = $(this).find('input[name="permName"]').val()?.trim();
            const permValue = $(this).find('input[name="permValue"]').val()?.trim();

            if (groupName && permName && permValue) {
                permissionsData.push({ groupName, permName, permValue });
            }
        });

        return permissionsData;
    }

	async submitForm(event) {
		event.preventDefault();

		// Получаем кнопку отправки (если поддерживается event.submitter)
		const submitButton = event.submitter || $(event.target).find('[type="submit"]').get(0);

		if (!submitButton) {
			console.error('Кнопка отправки не найдена. Убедитесь, что форма имеет кнопку с type="submit".');
			return;
		}

		if (this.isSubmitting) {
			console.log('Форма уже отправляется. Пожалуйста, подождите.');
			return;
		}

		this.isSubmitting = true;

		const formData = this.collectFormData();
		if (formData.length === 0) {
			alert('Форма пуста. Заполните данные перед отправкой.');
			this.isSubmitting = false;
			return;
		}

		submitButton.disabled = true;
		try {
			const response = await foxEngine.sendPostAndGetAnswer(
				{
					admPanel: 'editPermissions',
					refreshPage: false,
					playSound: false,
					permissions: JSON.stringify(formData),
				},
				'JSON'
			);

			$(submitButton).notify(response.message, response.type);
		} catch (error) {
			console.error('Ошибка при отправке данных:', error);
			alert('Произошла ошибка при отправке данных. Попробуйте снова позже.');
		} finally {
			submitButton.disabled = false;
			this.isSubmitting = false;
		}
	}

addRow() {
    // Создание новой строки
    const newRow = document.createElement('tr');

    // Генерация полей для строки
    this.formFields.forEach((field) => {
        const cell = document.createElement('td');
        const inputBlock = document.createElement('div');
        inputBlock.className = 'input_block';

        // Создание label
        const label = document.createElement('label');
        label.className = 'label';
        label.setAttribute('for', field.fieldName);
        label.textContent = '';

        // Создание input или readonly отображения для index
        let input;
        if (field.fieldName === 'index') {
            input = document.createElement('span');
            input.textContent = document.querySelectorAll('#permList tr').length + 1; // Уникальный индекс
            input.className = 'index';
        } else {
            input = document.createElement('input');
            input.type = field.fieldType === 'tagify' ? 'text' : field.fieldType;
            input.name = field.fieldName;
            input.className = 'input';
            input.value = ''; // Установите значение по умолчанию, если требуется
        }

        // Сборка блока
        inputBlock.appendChild(label);
        inputBlock.appendChild(input);
        cell.appendChild(inputBlock);
        newRow.appendChild(cell);
    });

    // Добавление кнопки удаления строки
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.addEventListener('click', () => this.deleteRow(newRow));
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);

    // Добавление строки в таблицу
    const tableBody = document.querySelector('#permList');
    if (tableBody) {
        tableBody.appendChild(newRow);

        // Инициализация дополнительных компонентов, если требуется (например, Tagify)
        const tagifyInputs = newRow.querySelectorAll('.tagify');
        tagifyInputs.forEach((input) => new Tagify(input));
    } else {
        console.error('#permList не найден.');
    }
}

deleteRow(row) {
    const tableBody = document.querySelector('#permList');
    if (tableBody) {
        tableBody.removeChild(row);

        // Обновление индексов
        Array.from(tableBody.querySelectorAll('tr')).forEach((row, index) => {
            const indexSpan = row.querySelector('.index');
            if (indexSpan) {
                indexSpan.textContent = index + 1;
            }
        });
    } else {
        console.error('Таблица #permList не найдена.');
    }
}



initEventListeners() {
    console.log("Инициализация обработчиков событий...");
    this.formInit(500);

    const formElement = $('#permissionsForm');
    if (formElement.length > 0) {
        formElement.on('submit', (event) => this.submitForm(event));
    } else {
        console.error('#permissionsForm не найден в DOM');
    }

    // Обработчик для кнопки добавления строки
    const addRowButton = document.querySelector('#addRowButton');
    if (addRowButton) {
        addRowButton.addEventListener('click', () => this.addRow());
    } else {
        console.warn('Кнопка для добавления строки не найдена.');
    }
}


    formInit(awaitms) {
        setTimeout(() => {
            this.forms = document.querySelectorAll('form');
            if (this.forms.length > 0) {
                console.log(`Найдено форм: ${this.forms.length}`);
                this.forms.forEach(form => {
                    form.onsubmit = async (event) => {
                        event.preventDefault();
                        try {
                            const data = this.collectFormData();
                            data.formId = form.id;
                            await this.submitForm(event);
                        } catch (error) {
                            console.error('Ошибка обработки отправки формы:', error);
                        }
                    };
                });
            } else {
                console.warn('Формы не найдены на странице.');
            }
        }, awaitms);
    }
}  