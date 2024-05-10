/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * This file contains the JsonArrConfig class, which handles JSON arrays and interacts with them.
 * It provides methods for opening a window with fields of a JSON config,
 * and updating mod information on the server.
 * 
 * Authors: FoxesWorld
 * Date: [10.05.24]
 * Version: [1.6.8]
 */

/**
 * The JsonArrConfig class handles JSON arrays and interacts with them.
 */
export class JsonArrConfig {
    constructor(jsonAttributes, submitHandler, buildField) {
        this.postData;
        this.jsonAttributes = jsonAttributes;
		this.submitHandler = submitHandler;
		if(buildField) {
			this.buildField = buildField;
			console.log("Using buildField");
		}

		this.charactersToRemove = ['\n', '\t'];
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

				//Adding remove listener to existing rows
                $('#jsonConfigForm').on('click', '.removeBtn', (e) => {
                    const index = $(e.currentTarget).data('index');
					$('#jsonConfigForm tbody tr:eq(' + index + ')').remove();
					this.updateArrayIndexes();
                });

                $('#addRowBtn').click(() => {
					console.log('clkc');
                    this.addRow();
                    this.updateArrayIndexes();
                });
            }, 1000);
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

	genJsonCfgForm(JsonArray) {
		return Promise.all(JsonArray.map((element, index) => this.genFormRow(index, element)))
			.then(rows => {
				const builtFormHtml = `<form id="jsonConfigForm"><table cellpadding="${this.jsonAttributes.length}" class="table table-bordered table-striped">
										<thead class="thead-dark">
											<tr>
												<th>#</th>
												${this.jsonAttributes.map(attribute => `<th>${attribute}</th>`).join('')}
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											${rows.join('')}
										</tbody>
									</table>
									<div class="buttonGroup">
										<button type="button" id="submitBtn" class="btn btn-primary">Save</button>
										<button type="button" id="addRowBtn" class="btn btn-success">Add Row</button>
									</div>
									</form>`;
				return builtFormHtml;
			});
	}

async genFormRow(index, row) {
    const rowHeight = this.calculateRowHeight(row);
    let formHtml = `<tr style="height: ${rowHeight}px;">
                        <td>${index + 1}</td>`;

    if (this.buildField) {
        for (let i = 0; i < this.buildField.inputFields.length; i++) {
            const { fieldName, fieldType, optionsArray } = this.buildField.inputFields[i];
            const inputValue = row[fieldName] || '';
            const inputHtml = await this.buildField.createInputBlock(fieldName, inputValue, fieldType, optionsArray);
            formHtml += `<td>${inputHtml}</td>`;
        }
    } else {
        formHtml += this.jsonAttributes.map(attribute => {
            const inputValue = row[attribute] || '';
            const isTextarea = inputValue.length > 60;
            const inputType = isTextarea ? 'textarea' : 'input';
            const inputHeight = isTextarea ? rowHeight : this.calculateTextareaHeight(inputValue);

            return `<td>
                        <div class="input_block">
                            <${inputType} class="input" id="${attribute}_input${index}" data-index="${index}" data-key="${attribute}" style="${isTextarea ? 'height: ' + inputHeight + 'px; width: 100%; box-sizing: border-box;' : 'height: ' + inputHeight / 2 + 'px;'}"
                                ${inputType === 'input' ? `value="${inputValue}"` : ''}>
                                ${inputType === 'textarea' ? `${this.removeCharacters(inputValue)}` : ''}
                            </${inputType}>
                        </div>
                    </td>`;
        }).join('');
    }

    formHtml += `<td><button type="button" class="btn btn-danger removeBtn" data-index="${index}">Remove</button></td></tr>`;
    
    return formHtml;
}


    calculateRowHeight(row) {
        const heights = this.jsonAttributes.map(attribute => this.calculateTextareaHeight(row[attribute] || ''));
        return Math.max(...heights) * 2;
    }


    async addRow() {
        const newRow = {};
        this.jsonAttributes.forEach(attribute => {
            newRow[attribute] = '';
        });

        const index = $('#jsonConfigForm tbody tr').length;
        const newHtml = await this.genFormRow(index, newRow);
        $('#jsonConfigForm tbody').append(newHtml);

		//Adding remove listener to new added row
        $('#jsonConfigForm tbody tr:eq(' + index + ')').on('click', '.removeBtn', () => {
            //this.removeRow(index);
			$('#jsonConfigForm tbody tr:eq(' + index + ')').remove();
            this.updateArrayIndexes();
        });
    }

    updateArrayIndexes() {
        $('#jsonConfigForm tbody tr').each((i, tr) => {
            $(tr).find('td:first').text(i + 1);
            $(tr).find('.removeBtn').attr('data-index', i);
        });
    }

    loadFormIntoDialog(formHtml, dialogTitle) {
        foxEngine.page.loadData(formHtml, '#dialogContent');
        $("#dialog").dialog(this.dialogOptions);
        $("#dialog").dialog({ title: dialogTitle});
        $("#dialog").dialog('open');
    }

    async updateJsonConfig(sendKey) {
        const formData = {};
        $('#jsonConfigForm input, #jsonConfigForm textarea').each(function () {
            const key = $(this).data('key');
            const index = $(this).data('index');
            const value = $(this).val();

            if (!formData[index]) {
                formData[index] = {};
            }
            formData[index][key] = value;
        });

        let req = {
            ...this.postData,
        };
        req[sendKey] = JSON.stringify(Object.values(formData));
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
}
