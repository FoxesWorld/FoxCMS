/**
 * @fileoverview FoxesWorld for FoxesCraft
 * JsonArrConfig — класс для работы с массивами JSON в UI.
 *
 * Authors: FoxesWorld
 * Date: [17.04.25]
 * Version: [1.8.2]
 */

export class JsonArrConfig {
    constructor(instance, submitHandler, buildField, rowOpt = {addRow: true, delTow: true}) {
        this.postData = null;
        this.jsonAttributes = this.getFieldNames(instance.formFields);
        this.submitHandler = submitHandler;
        this.buildField = buildField;
        this.rowOpt = rowOpt;
        this.charactersToRemove = ['\n', '\t'];
    }

    getFieldNames(formFields) {
        return formFields.map(field => field.fieldName);
    }

    async openForm(configArray, serverName, postData) {
        this.postData = postData;
        const JsonArray = Array.isArray(configArray)
            ? configArray
            : (typeof configArray === 'string' ? JSON.parse(configArray) : []);
        const formHtml = await this.genJsonCfgForm(JsonArray);
        this.loadFormIntoDialog(formHtml, serverName);
        setTimeout(() => this._bindEvents(), 100);
    }

    async genJsonCfgForm(JsonArray) {
        const rows = await Promise.all(JsonArray.map((row, idx) => this._genRow(idx, row)));

        return `
            <form id="jsonConfigForm">
                <table class="table table-bordered table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th style="width:30px;"></th>
                            <th>#</th>
                            ${this.jsonAttributes.map(a => `<th>${a}</th>`).join('')}
                            ${this.editRows ? '<th>Action</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>${rows.join('')}</tbody>
                </table>
                <div class="buttonGroup">
                    <button type="button" id="submitBtn" class="btn btn-success">Save</button>
                    ${this.rowOpt.addRow ? '<button type="button" id="addRowBtn" class="btn btn-primary">Add Row</button>' : ''}
                </div>
            </form>
        `;
    }

    async _genRow(index, row) {
        let html = `
            <tr>
                <td class="collapse-toggle text-center" style="cursor:pointer;">
                    <i class="fa fa-angle-down"></i>
                </td>
                <td>${index + 1}</td>
        `;

        html += this.buildField
            ? await this._fieldInputs(row)
            : this._defaultInputs(index, row);

        if (this.rowOpt.delRow) {
            html += `
                <td>
                    <button type="button" class="btn btn-danger removeBtn" data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
        }

        html += '</tr>';
        return html;
    }

    async _fieldInputs(row) {
        if (!this.buildField?.inputFields?.length) return '';

        const inputs = await Promise.all(
            this.buildField.inputFields
                .filter(({ fieldName }) => Object.prototype.hasOwnProperty.call(row, fieldName))
                .map(async ({ fieldName, fieldType, optionsArray }) => {
                    try {
                        const input = await this.buildField.createInputBlock(
                            fieldName,
                            row[fieldName] ?? '',
                            fieldType,
                            optionsArray
                        );
                        return `<td>${input}</td>`;
                    } catch (e) {
                        console.error(`Error building field ${fieldName}`, e);
                        return `<td><!-- error loading ${fieldName} --></td>`;
                    }
                })
        );
        return inputs.join('');
    }

    _defaultInputs(index, row) {
        return this.jsonAttributes.map(attr => {
            const value = row[attr] || '';
            const isTextarea = value.length > 60;
            const tag = isTextarea ? 'textarea' : 'input';
            const styles = isTextarea
                ? 'height: 80px; width: 100%; box-sizing: border-box;'
                : 'height: 30px;';

            return `
                <td>
                    <div class="input_block">
                        <${tag} class="input" name="${attr}" data-index="${index}"
                            style="${styles}"
                            ${tag === 'input' ? `value="${this._escape(value)}"` : ''}>
                            ${tag === 'textarea' ? this._escape(this.removeCharacters(value)) : ''}
                        </${tag}>
                    </div>
                </td>
            `;
        }).join('');
    }

    _bindEvents() {
        $('#submitBtn').on('click', async () => {
            await this.submitHandler($('#submitBtn'));
        });

        if (this.rowOpt.delRow === true) {
			$('#jsonConfigForm').on('click', '.removeBtn', (e) => {
				this._removeRow($(e.currentTarget).data('index'));
			});
		}

        $('#jsonConfigForm').on('click', '.collapse-toggle', (e) => {
            this._toggleRow(e);
        });

        if (this.rowOpt.addRow === true) {
            $('#addRowBtn').on('click', async () => {
                await this.addRow();
            });
        }
    }

    _removeRow(index) {
        const $row = $('#jsonConfigForm tbody tr').eq(index);
        $row.fadeOut(200, () => {
            $row.remove();
            this._updateIndexes();
        });
    }

    _toggleRow(e) {
        const $icon = $(e.currentTarget).find('i');
        $icon.toggleClass('fa-angle-down fa-angle-right');
        const $cells = $(e.currentTarget).closest('tr').find('td').not('.collapse-toggle, :first');
        $cells.slideToggle(200);
    }

    async addRow() {
        const rowCount = $('#jsonConfigForm tbody tr').length;
        const newRow = {};
        this.jsonAttributes.forEach(attr => newRow[attr] = '');
        const html = await this._genRow(rowCount, newRow);
        const $newRow = $(html).hide();
        $('#jsonConfigForm tbody').append($newRow);
        $newRow.fadeIn(200);
        this._updateIndexes();
    }

    _updateIndexes() {
        $('#jsonConfigForm tbody tr').each((i, tr) => {
            $(tr).find('td:nth-child(2)').text(i + 1);
            $(tr).find('.removeBtn').attr('data-index', i);
        });
    }

    loadFormIntoDialog(formHtml, title) {
        foxEngine.modalApp.showModalApp("100%", title, formHtml, () => {});
    }

	async updateJsonConfig(sendKey, extraParams = {}) {
		const formDataArray = [];

		$('#jsonConfigForm tbody tr').each(function () {
			const formData = {};
			$(this).find('input, select, textarea').each(function () {
				const name = $(this).attr('name');
				if (name) {
					const val = $(this).is(':checkbox') ? $(this).prop('checked') : $(this).val();
					formData[name] = val;
				}
			});

			if (Object.keys(formData).length) {
				formDataArray.push(formData);
			}
		});

		const req = {
			...this.postData,     // начальные параметры (например, admPanel)
			...extraParams        // добавляем serverId или что-то ещё
		};
		req[sendKey] = JSON.stringify(formDataArray);

		return await foxEngine.sendPostAndGetAnswer(req, 'JSON');
	}


    removeCharacters(value) {
        return this.charactersToRemove.reduce(
            (val, char) => val.replace(new RegExp(char, 'g'), ''),
            value
        );
    }

    _escape(str) {
        return String(str).replace(/[&<>"']/g, function (m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            }[m];
        });
    }
}
