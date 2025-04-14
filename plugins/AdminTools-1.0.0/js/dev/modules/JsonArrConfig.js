/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * This file contains the JsonArrConfig class, which handles JSON arrays and interacts with them.
 * It provides methods for opening a window with fields of a JSON config,
 * and updating mod information on the server.
 * 
 * Authors: FoxesWorld
 * Date: [10.05.24]
 * Version: [1.6.9]
 */

/**
 * The JsonArrConfig class handles JSON arrays and interacts with them.
 */
export class JsonArrConfig {
    constructor(jsonAttributes, submitHandler, buildField) {
        this.postData;
        this.jsonAttributes = jsonAttributes;
        this.submitHandler = submitHandler;
        if (buildField) {
            this.buildField = buildField;
        }
        this.editRows = true;

        this.charactersToRemove = ['\n', '\t'];
		/*
        this.dialogOptions = {
            autoOpen: false,
            position: {
                my: 'center',
                at: 'top',
                of: window
            },
            modal: true,
            height: 'auto',
            width: '900',
            resizable: false,
            open: (event, ui) => {}
        };
		*/
    }
    
    calculateTextareaHeight(value) {
        const minHeight = 100;
        const calculatedHeight = Math.max(minHeight, value.length / 2);
        return calculatedHeight;
    }

    async openFormWindow(configArray, serverName, postData) {
        this.postData = postData;
        try {
            let JsonArray;

            if (configArray) {
                if (typeof configArray === 'string') {
                    JsonArray = JSON.parse(configArray);
                } else {
                    JsonArray = configArray;
                }
            } else {
                this.loadFormIntoDialog('', serverName);
                return;
            }
            
            const builtFormHtml = await this.genJsonCfgForm(JsonArray);

            this.loadFormIntoDialog(builtFormHtml, serverName);

            setTimeout(() => {
                $('#submitBtn').click(async () => {
                    await this.submitHandler($('#submitBtn'), serverName);
                });

                // Adding remove listener to existing rows
                $('#jsonConfigForm').on('click', '.removeBtn', (e) => {
                    const index = $(e.currentTarget).data('index');
                    $('#jsonConfigForm tbody tr:eq(' + index + ')').remove();
                    this.updateArrayIndexes();
                });

                $('#addRowBtn').click(() => {
                    this.addRow();
                    this.updateArrayIndexes();
                });
            }, 1000);
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async genJsonCfgForm(JsonArray) {
        return Promise.all(JsonArray.map((element, index) => this.genFormRow(index, element)))
            .then(rows => {
                const builtFormHtml = `<form id="jsonConfigForm">
                    <table cellpadding="${this.jsonAttributes.length}" class="table table-bordered table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>#</th>
                                ${this.jsonAttributes.map(attribute => `<th>${attribute}</th>`).join('')}
                                ${this.editRows ? '<th>Action</th>' : ''}
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.join('')}
                        </tbody>
                    </table>
                    <div class="buttonGroup">
                        <button type="button" id="submitBtn" class="btn btn-success">Save</button>
                        ${this.editRows ? '<button type="button" id="addRowBtn" class="btn btn-primary">Add Row</button>' : ''}
                    </div>
                </form>`;

                return builtFormHtml;
            });
    }

    async genFormRow(index, row) {
        const rowHeight = this.calculateRowHeight(row);
        let formHtml = `<tr>
                            <td>${index + 1}</td>`;
        if (this.buildField) {
            formHtml += await this.buildFieldInput(row);
        } else {
            formHtml += this.buildDefaultInput(index, row, rowHeight);
        }

        if (this.editRows) {
            formHtml += `<td><button type="button" class="btn btn-danger removeBtn" data-index="${index}">Remove</button></td></tr>`;
        }
        
        return formHtml;
    }
    
    async buildFieldInput(row) {
        let html = '';
        for (let i = 0; i < this.buildField.inputFields.length; i++) {
            const { fieldName, fieldType, optionsArray } = this.buildField.inputFields[i];
            if (row[fieldName] !== undefined) {
                const inputValue = row[fieldName] || '';
                const inputHtml = await this.buildField.createInputBlock(fieldName, inputValue, fieldType, optionsArray);
                html += `<td>${inputHtml}</td>`;
            }
        }
        return html;
    }

    buildDefaultInput(index, row, rowHeight) {
        return this.jsonAttributes.map(attribute => {
            const inputValue = row[attribute] || '';
            const isTextarea = inputValue.length > 60;
            const inputType = isTextarea ? 'textarea' : 'input';
            const inputHeight = isTextarea ? rowHeight : this.calculateTextareaHeight(inputValue);

            return `<td>
                        <div class="input_block">
                            <${inputType} class="input" id="${attribute}_input${index}" name="${attribute}" data-index="${index}" style="${isTextarea ? 'height: ' + inputHeight + 'px; width: 100%; box-sizing: border-box;' : 'height: ' + inputHeight / 2 + 'px;'}"
                                ${inputType === 'input' ? `value="${inputValue}"` : ''}>
                                ${inputType === 'textarea' ? `${this.removeCharacters(inputValue)}` : ''}
                            </${inputType}>
                        </div>
                    </td>`;
        }).join('');
    }

    calculateRowHeight(row) {
        const heights = this.jsonAttributes.map(attribute => this.calculateTextareaHeight(row[attribute] || ''));
        return Math.max(...heights) * 2;
    }

async addRow() {
	// Получение текущего количества строк
	const rowCount = $('#jsonConfigForm tbody tr').length;

	// Создание новой строки-объекта с пустыми значениями
	const newRow = {};
	this.jsonAttributes.forEach(attribute => {
		newRow[attribute] = '';
	});

	// Генерация HTML строки
	const newHtml = await this.genFormRow(rowCount, newRow);

	// Убедимся, что количество строк не изменилось во время ожидания
	if ($('#jsonConfigForm tbody tr').length === rowCount) {
		// Оборачиваем HTML в jQuery-объект и скрываем
		const $newRow = $(newHtml).css('display', 'none');

		// Добавляем в DOM и применяем эффект появления
		$('#jsonConfigForm tbody').append($newRow);
		$newRow.fadeIn(200); // 200мс - скорость появления

		// Назначаем обработчик удаления (если ещё не назначен)
		$('#jsonConfigForm').off('click', '.removeBtn').on('click', '.removeBtn', (e) => {
			const indexToRemove = $(e.currentTarget).data('index');
			const $row = $('#jsonConfigForm tbody tr').eq(indexToRemove);

			// Плавное исчезновение, затем удаление
			$row.fadeOut(200, () => {
				$row.remove();
				this.updateArrayIndexes();
			});
		});
	}
}



    updateArrayIndexes() {
        $('#jsonConfigForm tbody tr').each((i, tr) => {
            $(tr).find('td:first').text(i + 1);
            $(tr).find('.removeBtn').attr('data-index', i);
        });
    }

    loadFormIntoDialog(formHtml, dialogTitle) {
        //foxEngine.page.loadData(formHtml, '#dialogContent');
		foxEngine.modalApp.showModalApp("100%", dialogTitle, formHtml, () => {});
        //$("#dialog").dialog(this.dialogOptions);
        //$("#dialog").dialog({ title: dialogTitle });
        //$("#dialog").dialog('open');
    }

    async updateJsonConfig(sendKey) {
        const formDataArray = [];

        $('#jsonConfigForm tbody tr').each(function() {
            const formData = {};

            $(this).find('input, select, textarea').each(function() {
                const fieldName = $(this).attr('name');
                if (fieldName) {
                    let fieldValue;

                    if ($(this).is(':checkbox')) {
                        fieldValue = $(this).prop('checked') ? true : false;
                    } else {
                        fieldValue = $(this).val();
                    }

                    formData[fieldName] = fieldValue;
                }
            });

            if (Object.keys(formData).length > 0) {
                formDataArray.push(formData);
            }
        });

        let req = {
            ...this.postData,
        };
        req[sendKey] = JSON.stringify(formDataArray);
        let answer = await foxEngine.sendPostAndGetAnswer(req, "JSON");
        return answer;
    }

    removeCharacters(value) {
        let cleanedValue = value;
        this.charactersToRemove.forEach(char => {
            cleanedValue = cleanedValue.replace(new RegExp(char, 'g'), '');
        });
        return cleanedValue;
    }
    
    setEditRows(editRows) {
        this.editRows = editRows;
    }
}