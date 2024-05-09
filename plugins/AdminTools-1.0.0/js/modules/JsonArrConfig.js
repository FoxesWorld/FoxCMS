/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * This file contains the JsonArrConfig class, which handles JSON arrays and interacts with them.
 * It provides methods for opening a window with mod information, generating a form based on mods and their attributes,
 * and updating mod information on the server.
 * 
 * Authors: FoxesWorld
 * Date: [09.05.24]
 * Version: [1.5.3]
 */

/**
 * The JsonArrConfig class handles JSON arrays and interacts with them.
 */
export class JsonArrConfig {
    constructor(jsonAttributes, submitHandler) {
        this.postData;
        this.jsonAttributes = jsonAttributes;
		this.submitHandler = submitHandler;
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
            let modsInfoArray;

            if (configArray) {
                if (typeof configArray === 'string') {
                    modsInfoArray = JSON.parse(configArray);
                } else {
                    modsInfoArray = configArray;
                }
            } else {
                this.loadFormIntoDialog('', serverName);
                return;
            }

            const builtFormHtml = this.genJsonCfgForm(modsInfoArray);

            this.loadFormIntoDialog(builtFormHtml, serverName);

            setTimeout(() => {
                $('#submitBtn').click(async () => {
					await this.submitHandler($('#submitBtn'), modsInfoArray, serverName);
                });

                $('#jsonConfigForm').on('click', '.removeBtn', (e) => {
                    const index = $(e.currentTarget).data('index');
                    this.removeRow(modsInfoArray, index);
                    this.updateJsonConfigTableIndexes();
                });

                $('#addRowBtn').click(() => {
                    this.addRow();
                    this.updateJsonConfigTableIndexes();
                });
            }, 1000);
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    genJsonCfgForm(modsInfoArray) {
        const builtFormHtml = `<form id="jsonConfigForm"><table cellpadding="${this.jsonAttributes.length}" class="table table-bordered table-striped">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>#</th>
                                        ${this.jsonAttributes.map(attribute => `<th>${attribute}</th>`).join('')}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${modsInfoArray.map((element, index) => this.genFormRow(index, element)).join('')}
                                </tbody>
                            </table>
                            <div class="buttonGroup">
                                <button type="button" id="submitBtn" class="btn btn-primary">Save</button>
                                <button type="button" id="addRowBtn" class="btn btn-success">Add Row</button>
                            </div>
                           </form>`;
        return builtFormHtml;
    }

    genFormRow(index, row) {
        //const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);
        const rowHeight = this.calculateRowHeight(row);

        return `<tr style="height: ${rowHeight}px;">` +
            `<td>${index + 1}</td>` +
            this.jsonAttributes.map(attribute => {
                const inputValue = row[attribute] || '';
                const isTextarea = inputValue.length > 60;
                const inputType = isTextarea ? 'textarea' : 'input';
                const inputHeight = isTextarea ? rowHeight : this.calculateTextareaHeight(inputValue);

                return `<td>
                            <div class="input_block">
                                <${inputType} class="input" id="${attribute}_input${index}" data-index="${index}" data-key="${attribute}" style="${isTextarea ? 'height: ' + inputHeight + 'px; width: 100%; box-sizing: border-box;' : 'height: ' + inputHeight / 2 + 'px;'}"
                                    ${inputType === 'input' ? `value="${inputValue}"` : ''}>
                                    ${inputType === 'textarea' ? `${inputValue}` : ''}
                                </${inputType}>
                            </div>
                        </td>`;
            }).join('') +`<td><button type="button" class="btn btn-danger removeBtn" data-index="${index}">Remove</button></td></tr>`;
    }

    calculateRowHeight(row) {
        const heights = this.jsonAttributes.map(attribute => this.calculateTextareaHeight(row[attribute] || ''));
        return Math.max(...heights) * 2;
    }

    addRow() {
        const newRow = {};
        this.jsonAttributes.forEach(attribute => {
            newRow[attribute] = '';
        });

        const index = $('#jsonConfigForm tbody tr').length;
        const newHtml = this.genFormRow(index, newRow);
        $('#jsonConfigForm tbody').append(newHtml);

        $('#jsonConfigForm tbody tr:eq(' + index + ')').on('click', '.removeBtn', () => {
            this.removeRow(modsInfoArray, index);
            this.updateJsonConfigTableIndexes();
        });
    }

    removeRow(modsInfoArray, index) {
        modsInfoArray.splice(index, 1);
        $('#jsonConfigForm tbody tr:eq(' + index + ')').remove();
        this.updateJsonConfigTableIndexes();
    }

    updateJsonConfigTableIndexes() {
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

    async updateJsonConfig(modsInfoArray) {
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
			modsInfo: JSON.stringify(Object.values(formData))
		};
        let answer = await foxEngine.sendPostAndGetAnswer(req, "JSON");
        return answer;
    }
}
