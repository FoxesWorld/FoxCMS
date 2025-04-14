class ServerOptions {
    constructor(servers) {
        this.servers = servers;
    }

    async loadServerOptions(serverName) {
        try {
            const responses = await this.servers.getServerData(serverName);
            this.createDialogIfNeeded();

            const formHtml = this.generateServerOptionsForm(serverName, responses);
            this.servers.loadFormIntoDialog(formHtml, "All servers");

            setTimeout(() => {
                $('#viewModsInfoBtn').click(() => {
                    this.openModsInfoWindow(responses[0].modsInfo, responses[0].serverName);
                });
            }, 1000);

        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    generateServerOptionsForm(serverName, responses) {
        const columns = Object.keys(responses[0]);
        let formHtml = `<form id="serverOptionsForm" method="POST" action="/" autocomplete="false">
                            <h3>Настройки ${serverName}</h3>`;

        for (const response of responses) {
            for (const key in response) {
                if (response.hasOwnProperty(key)) {
                    formHtml += this.createInputBlock(key, response[key]);
                }
            }
        }

        formHtml += this.createSubmitButton();
        formHtml += `<input type="hidden" name="admPanel" value="editServer" />
                     <input name="refreshPage" type="hidden" value="false" />
                     <input name="playSound" type="hidden" value="false" />
                     <button type="button" id="viewModsInfoBtn" class="login">View Mods Info</button>
                  </form>`;

        return formHtml;
    }

    createDialogIfNeeded() {
        if (!$("#dialog").length) {
            $("body").append('<div id="dialog" title="Server Options"></div>');
        }
    }

    createInputBlock(key, value) {
        const isTextarea = value.length > 60;
        const inputBlockStyle = isTextarea ? `style="height: ${this.calculateTextareaHeight(value)}px;"` : '';

        return `<div class="input_block" ${inputBlockStyle}>
                    <label class="label" for="${key}">${key}:</label>
                    ${isTextarea ? `<textarea style="height: ${this.calculateTextareaHeight(value)}px;" id="${key}" class="input" name="${key}">${value}</textarea>` :
                        `<input type="text" id="${key}" name="${key}" class="input" value="${value}">`}
                </div>`;
    }

    calculateTextareaHeight(value) {
        return Math.max(100, value.length / 2);
    }

    createSubmitButton() {
        return '<button type="submit" class="login">Apply</button>';
    }

    async openModsInfoWindow(modsInfo, serverName) {
        try {
            const modsInfoArray = JSON.parse(modsInfo);
            const modsInfoHtml = this.generateModsInfoForm(modsInfoArray, serverName);

            this.servers.loadFormIntoDialog(modsInfoHtml, serverName);

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
        let modsInfoHtml = '<form id="modsInfoForm"><table cellpadding="5" class="table table-bordered table-striped">';
        modsInfoHtml += '<thead class="thead-dark"><tr><th>#</th>';

        for (const key in modsInfoArray[0]) {
            if (modsInfoArray[0].hasOwnProperty(key)) {
                modsInfoHtml += `<th>${key}</th>`;
            }
        }

        modsInfoHtml += '<th>Action</th></tr></thead><tbody>';
        modsInfoArray.forEach((element, index) => {
            modsInfoHtml += this.generateModsInfoRow(index, element);
        });
        modsInfoHtml += '</tbody></table>';

        modsInfoHtml += `
                <button type="button" id="submitModsInfoBtn" class="btn btn-primary">Сохранить</button>
                <button type="button" id="addRowBtn" class="btn btn-success">Добавить строку</button>
   </form>`;

        return modsInfoHtml;
    }

    generateModsInfoRow(index, row) {
        const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);

        const rowHeight = this.calculateRowHeight(row);

        return `<tr style="height: ${rowHeight}px;"><td>${index + 1}</td>` +
            Object.keys(row).map((key) => {
                const inputValue = row[key];
                const isTextarea = inputValue.length > 60;
                const inputType = isTextarea ? 'textarea' : 'input';
                const inputHeight = isTextarea ? this.calculateTextareaHeight(inputValue) : '';

                return `<td>
                            <div class="input_block">
                                <${inputType} class="input" id="${key}_input${index}" data-index="${index}" data-key="${key}" style="height: ${inputHeight}px;"
                                    ${inputType === 'input' ? `value="${inputValue}"` : ''}>
                                    ${inputType === 'textarea' ? `${inputValue}` : ''}
                                </${inputType}>
                            </div>
                        </td>`;
            }).join('') +
            `<td><button type="button" class="btn btn-danger removeBtn" data-index="${index}">Удалить</button></td></tr>`;
    }

    calculateRowHeight(row) {
        const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);
        const heights = Object.keys(row).map((key) => {
            return calculateTextareaHeight(row[key]);
        });
        return Math.max(...heights);
    }

    addRow(modsInfoArray, serverName) {
        const newRow = {};

        // Use column names from the first element of modsInfoArray
        for (const key in modsInfoArray[0]) {
            if (modsInfoArray[0].hasOwnProperty(key)) {
                newRow[key] = '';
            }
        }

        modsInfoArray.push(newRow);

        // Append the new row directly to the table
        const index = modsInfoArray.length - 1;
        const newHtml = this.generateModsInfoRow(index, newRow);
        $('#modsInfoForm tbody').append(newHtml);
    }

    removeRow(modsInfoArray, index, serverName) {
        modsInfoArray.splice(index, 1);

        // Remove the row directly from the table
        $(`#modsInfoForm tbody tr:eq(${index})`).remove();

        // Update the index column after removal
        this.updateModsInfoTableIndexes();
    }

    updateModsInfoTableIndexes() {
        // Update the index column after removal
        $('#modsInfoForm tbody tr').each((i, tr) => {
            $(tr).find('td:first').text(i + 1);
            $(tr).find('.removeBtn').attr('data-index', i);
        });
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

        let answer = await foxEngine.sendPostAndGetAnswer({ admPanel: "editServer", modsInfo: JSON.stringify(modsInfoArray), serverName: serverName }, "JSON");
        return answer;
    }
}

export { ServerOptions };