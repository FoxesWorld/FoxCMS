export class AbstractJsonConfig {
    constructor(attributes, submitHandler, buildField = null) {
        this.jsonAttributes = attributes;
        this.submitHandler = submitHandler;
        this.buildField = buildField;
        this.editRows = true;
        this.postData = {};
        this.charactersToRemove = ['\n', '\t'];
    }

    removeCharacters(value) {
        return this.charactersToRemove.reduce(
            (result, char) => result.replace(new RegExp(char, 'g'), ''),
            value
        );
    }

    calculateTextareaHeight(value) {
        const minHeight = 100;
        return Math.max(minHeight, value.length / 2);
    }

    calculateRowHeight(row) {
        return Math.max(...this.jsonAttributes.map(attr => this.calculateTextareaHeight(row[attr] || ''))) * 2;
    }

    setEditRows(edit) {
        this.editRows = edit;
    }

    loadFormIntoDialog(html, title) {
        foxEngine.modalApp.showModalApp("100%", title, html, () => {});
    }

    async updateJsonConfig(sendKey) {
        const formDataArray = [];

        $('#jsonConfigForm tbody tr').each(function () {
            const formData = {};
            $(this).find('input, select, textarea').each(function () {
                const fieldName = $(this).attr('name');
                if (!fieldName) return;

                formData[fieldName] = $(this).is(':checkbox')
                    ? $(this).prop('checked')
                    : $(this).val();
            });

            if (Object.keys(formData).length > 0) {
                formDataArray.push(formData);
            }
        });

        const req = {
            ...this.postData,
            [sendKey]: JSON.stringify(formDataArray)
        };

        return await foxEngine.sendPostAndGetAnswer(req, "JSON");
    }
}
