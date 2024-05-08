/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * Этот файл содержит класс JsonArrConfig, который отвечает за обработку JSON-массивов и взаимодействие с ними.
 * Он предоставляет методы для открытия окна с информацией о модах, генерации формы на основе модов и их характеристик,
 * а также обновления информации о модах на сервере.
 * 
 * Authors: FoxesWorld
 * Date: [08.05.24]
 * Version: [1.0.0]
 */

/**
 * Класс JsonArrConfig обрабатывает JSON-массивы и взаимодействует с ними.
 */
 export class JsonArrConfig {
	/**
     * Создает экземпляр JsonArrConfig.
     * @param {Object} submitData - Данные для отправки.
     */
    constructor(submitData) {
        this.submitData = submitData;
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
            open: (event, ui) => {
                // $(".ui-widget-overlay").remove();
                // $(".ui-dialog-titlebar").remove();
            }
        };
    }
	
	/**
     * Вычисляет высоту текстового поля.
     * @param {string} value - Значение текстового поля.
     * @returns {number} - Вычисленная высота текстового поля.
     */
    calculateTextareaHeight(value) {
        return Math.max(100, value.length / 2);
    }

    /**
     * Асинхронно открывает окно с информацией о модах.
     * @param {Object|string} modsInfo - Информация о модах.
     * @param {string} serverName - Имя сервера.
     */
async openModsInfoWindow(modsInfo, serverName) {
    try {
        let modsInfoArray;

        if (modsInfo) {
            if (typeof modsInfo === 'string') {
                modsInfoArray = JSON.parse(modsInfo);
            } else {
                modsInfoArray = modsInfo;
            }
        } else {
            // No modsInfo provided, open an empty window/dialog
            this.loadFormIntoDialog('', serverName); // Passing an empty string
            return; // Exit the function
        }

        const modsInfoHtml = this.generateModsInfoForm(modsInfoArray, serverName);

        this.loadFormIntoDialog(modsInfoHtml, serverName);

        setTimeout(() => {
            $('#submitModsInfoBtn').click(async () => {
                const capturedServerName = serverName;
                let answer = await this.updateModsInfo(modsInfoArray, capturedServerName);
                $('#submitModsInfoBtn').notify(answer.message, answer.type);
            });

            $('.removeBtn').click((e) => {
                const index = $(e.currentTarget).data('index');
                this.removeRow(modsInfoArray, index, serverName);
                this.updateModsInfoTableIndexes();
            });

            $('#addRowBtn').click(() => {
                this.addRow(modsInfoArray, serverName);
                this.updateModsInfoTableIndexes();
            });
        }, 1000);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}


generateModsInfoForm(modsInfoArray, serverName) {
    const modsInfoHtml = `<form id="modsInfoForm"><table cellpadding="5" class="table table-bordered table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    ${Object.keys(modsInfoArray && modsInfoArray[0] || {}).map(key => `<th>${key}</th>`).join('')}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${modsInfoArray.map((element, index) => this.generateModsInfoRow(index, element)).join('')}
                            </tbody>
                        </table>
						<div class="buttonGroup">
                        <button type="button" id="submitModsInfoBtn" class="btn btn-primary">Сохранить</button>
                        <button type="button" id="addRowBtn" class="btn btn-success">Добавить строку</button>
						</div>
                       </form>`;
    return modsInfoHtml;
}


    generateModsInfoRow(index, row) {
        const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);
        const rowHeight = this.calculateRowHeight(row);

        return `<tr style="height: ${rowHeight * 1.1}px;">` +
            `<td>${index + 1}</td>` +
            Object.keys(row).map(key => {
                const inputValue = row[key];
                const isTextarea = inputValue.length > 60;
                const inputType = isTextarea ? 'textarea' : 'input';
                const inputHeight = isTextarea ? rowHeight : this.calculateTextareaHeight(inputValue);

                return `<td>
                            <div class="input_block">
                                <${inputType} class="input" id="${key}_input${index}" data-index="${index}" data-key="${key}" style="${isTextarea ? 'height: ' + inputHeight + 'px; width: 100%; box-sizing: border-box;' : 'height: ' + inputHeight / 2 + 'px;'}"
                                    ${inputType === 'input' ? `value="${inputValue}"` : ''}>
                                    ${inputType === 'textarea' ? `${inputValue}` : ''}
                                </${inputType}>
                            </div>
                        </td>`;
            }).join('') +
            `<td><button type="button" class="btn btn-danger removeBtn" data-index="${index}">Удалить</button></td>` +
            '</tr>';
    }

    calculateRowHeight(row) {
        const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);
        const heights = Object.keys(row).map(key => calculateTextareaHeight(row[key]));
        return Math.max(...heights) * 2;
    }

    addRow(modsInfoArray, serverName) {
        const newRow = {};

        for (const key in modsInfoArray[0]) {
            if (modsInfoArray[0].hasOwnProperty(key)) {
                newRow[key] = '';
            }
        }

        modsInfoArray.push(newRow);

        const index = modsInfoArray.length - 1;
        const newHtml = this.generateModsInfoRow(index, newRow);
        $('#modsInfoForm tbody').append(newHtml);

        this.updateModsInfoTableIndexes();

        // Use event delegation for dynamically added buttons
        $('#modsInfoForm tbody tr:eq(' + index + ')').on('click', '.removeBtn', () => {
            this.removeRow(modsInfoArray, index, serverName);
            this.updateModsInfoTableIndexes();
        });
    }

    removeRow(modsInfoArray, index, serverName) {
        modsInfoArray.splice(index, 1);
        $('#modsInfoForm tbody tr:eq(' + index + ')').remove();
        this.updateModsInfoTableIndexes();
    }

    updateModsInfoTableIndexes() {
        $('#modsInfoForm tbody tr').each((i, tr) => {
            $(tr).find('td:first').text(i + 1);
            $(tr).find('.removeBtn').attr('data-index', i);
        });
    }

    loadFormIntoDialog(formHtml, serverName) {
        // Assuming foxEngine.page.loadData and other relevant functions are correctly defined
        foxEngine.page.loadData(formHtml, '#dialogContent');
        $("#dialog").dialog(this.dialogOptions);
		$("#dialog").dialog({ title: serverName});
        $("#dialog").dialog('open');
    }

    async updateModsInfo(modsInfoArray, serverName) {
        $('#modsInfoForm input').each(function () {
            const key = $(this).data('key');
            const index = $(this).data('index');

            if (modsInfoArray[index]) {
                if (key === 'desc') {
                    modsInfoArray[index].modDescription = this.value;
                } else if (key === 'modPicture') {
                    modsInfoArray[index].modPicture = this.value;
                } else {
                    modsInfoArray[index][key] = this.value;
                }
            } else {
                console.error('Invalid index:', index);
            }
        });

        const postData = {
            ...this.submitData,
            modsInfo: JSON.stringify(modsInfoArray),
            serverName: serverName
        };

        let answer = await foxEngine.sendPostAndGetAnswer(postData, "JSON");
        return answer;
    }
}