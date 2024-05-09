/**
 * @fileoverview FoxesWorld for FoxesCraft
 * 
 * This file contains the JsonArrConfig class, which handles JSON arrays and interacts with them.
 * It provides methods for opening a window with mod information, generating a form based on mods and their attributes,
 * and updating mod information on the server.
 * 
 * Authors: FoxesWorld
 * Date: [08.05.24]
 * Version: [1.2.0]
 */

/**
 * The JsonArrConfig class handles JSON arrays and interacts with them.
 */
export class JsonArrConfig {
    /**
     * Creates an instance of JsonArrConfig.
     * @param {Object} submitRequest - Data for submission.
     */
    constructor(submitRequest, jsonAttributes) {
        this.submitRequest = submitRequest;
        this.jsonAttributes = jsonAttributes;
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
    
    /**
     * Calculates the height of a textarea.
     * @param {string} value - Value of the textarea.
     * @returns {number} - Calculated height of the textarea.
     */
    calculateTextareaHeight(value) {
        return Math.max(100, value.length / 2);
    }

    /**
     * Asynchronously opens a window with mod information.
     * @param {Object|string} modsInfo - Mod information.
     * @param {string} serverName - Server name.
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
                    if(answer.type === "success") {
                        $("#dialog").dialog('close');
                        foxEngine.servers.loadServerPage(serverName);
                    }
                });

                $('#modsInfoForm').on('click', '.removeBtn', (e) => {
                    const index = $(e.currentTarget).data('index');
                    this.removeRow(modsInfoArray, index, serverName);
                    this.updateModsInfoTableIndexes();
                });

                $('#addRowBtn').click(() => {
                    this.addRow(serverName);
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
                                        ${this.jsonAttributes.map(attribute => `<th>${attribute}</th>`).join('')}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${modsInfoArray.map((element, index) => this.generateModsInfoRow(index, element)).join('')}
                                </tbody>
                            </table>
                            <div class="buttonGroup">
                                <button type="button" id="submitModsInfoBtn" class="btn btn-primary">Save</button>
                                <button type="button" id="addRowBtn" class="btn btn-success">Add Row</button>
                            </div>
                           </form>`;
        return modsInfoHtml;
    }

    generateModsInfoRow(index, row) {
        const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);
        const rowHeight = this.calculateRowHeight(row);

        return `<tr style="height: ${rowHeight * 1.1}px;">` +
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
        const calculateTextareaHeight = this.calculateTextareaHeight.bind(this);
        const heights = this.jsonAttributes.map(attribute => calculateTextareaHeight(row[attribute] || ''));
        return Math.max(...heights) * 2;
    }

    addRow(serverName) {
        const newRow = {};
        this.jsonAttributes.forEach(attribute => {
            newRow[attribute] = '';
        });

        const index = $('#modsInfoForm tbody tr').length;
        const newHtml = this.generateModsInfoRow(index, newRow);
        $('#modsInfoForm tbody').append(newHtml);

        $('#modsInfoForm tbody tr:eq(' + index + ')').on('click', '.removeBtn', () => {
            this.removeRow(index);
            this.updateModsInfoTableIndexes();
        });
    }

    removeRow(modsInfoArray, index) {
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
        foxEngine.page.loadData(formHtml, '#dialogContent');
        $("#dialog").dialog(this.dialogOptions);
        $("#dialog").dialog({ title: serverName + " mods"});
        $("#dialog").dialog('open');
    }

    async updateModsInfo(modsInfoArray, serverName) {
        const formData = {};
        $('#modsInfoForm input, #modsInfoForm textarea').each(function () {
            const key = $(this).data('key');
            const index = $(this).data('index');
            const value = $(this).val();
            
            if (!formData[index]) {
                formData[index] = {};
            }
            
            formData[index][key] = value;
        });

        const postData = {
            ...this.submitRequest,
            modsInfo: JSON.stringify(Object.values(formData)),
            serverName: serverName
        };

        let answer = await foxEngine.sendPostAndGetAnswer(postData, "JSON");
        return answer;
    }
}