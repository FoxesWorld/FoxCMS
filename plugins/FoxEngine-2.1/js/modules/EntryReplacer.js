export class EntryReplacer {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
    }

    async replaceText(text) {
        this.replacedTimes = 0;
        this.updatedText = text || "";

        if (!Array.isArray(this.foxEngine.userFields)) {
            this.foxEngine.debugSend("Invalid or undefined userFields", 'color: red');
            return this.updatedText;
        }

        this.updatedText = await this.replaceLangTags(this.updatedText);
        this.replaceUserFields();
        this.replaceEmojisWithImages();
        this.updatedText = this.replaceInputTags(this.updatedText);

        return this.updatedText;
    }

    replaceEmojisWithImages() {
        if (this.foxEngine.emojiArr) {
            this.foxEngine.emojiArr.forEach(emoji => {
                const emojiCode = `:${emoji.name}:`;
                const regex = new RegExp(emojiCode, 'g');
                this.updatedText = this.updatedText.replace(regex, `<img src="${emoji.imagePath}" alt="${emoji.name}" class="emoji" />`);
            });
        }
    }

    replaceUserFields() {
        this.foxEngine.userFields.forEach(value => {
            const mask = `%${value}%`;
            while (this.updatedText.includes(mask)) {
                this.updatedText = this.updatedText.replace(mask, this.foxEngine.replaceData[value]);
                this.replacedTimes++;
            }
        });
    }

    replaceInputTags(html) {
        let modifiedHtml = html;
        let match;

        while ((match = modifiedHtml.match(/\[input[^\]]*\]/))) {
            const attributes = match[0].match(/(\S+)=["'](.*?)["']/g) || [];
            const attributeMap = {};

            attributes.forEach(attr => {
                const [name, value] = attr.split('=');
                attributeMap[name] = value.replace(/["']/g, '');
            });

            this.foxEngine.debugSend(` - Building ${attributeMap['type']} field...`, 'color: green');

            const replacement = this.getInputTagReplacement(attributeMap);
            modifiedHtml = modifiedHtml.replace(match[0], replacement);
        }
        return modifiedHtml;
    }

    getInputTagReplacement(attributeMap) {
        const { type, name, placeholder, value, onKeyUp, display, id, siteKey, lang, metadata } = attributeMap;

        switch (type) {
            case 'checkbox':
                return `<label for="${name || ''}" class="checkbox_container">
                            ${placeholder || ''}
                            <input type="checkbox" style="display: none;" name="${name || ''}" id="${name || ''}" ${value ? 'checked' : ''} />
                            <span class="checkmark"></span>
                        </label>`;
            case 'captcha':
                return `<div class="c-captcha">
                            <div class="g-recaptcha" data-callback="fillResponse" data-sitekey="${siteKey}" data-theme="Light"></div>
                            <script src="https://www.google.com/recaptcha/api.js?hl=${lang}" async defer></script>
                        </div>`;
            case 'hidden':
                return `<input type="hidden" name="${name || ''}" id="${name || ''}" value="${value || ''}" onKeyUp="${onKeyUp || ''}" placeholder="${placeholder || ''}" />`;
            case 'upload':
                return `<table>
                            <td>
                                <input type="file" id="${id}" name="${name}" accept=".jpeg" data-file-metadata-imagetype="${metadata}" />
                            </td>
                        </table>
                        <script>
                            FilePond.registerPlugin(
                                FilePondPluginImageCrop,
                                FilePondPluginMediaPreview,
                                FilePondPluginImagePreview,
                                FilePondPluginFileMetadata,
                                FilePondPluginFileRename
                            );
                            FilePond.setOptions({
                                maxFileSize: '15MB',
                                imageCropAspectRatio: '3:5',
                                server: {
                                    process: {
                                        url: '/',
                                        method: 'POST',
                                        ondata: (formData) => {
                                            formData.append('key', replaceData.secureKey);
                                            return formData;
                                        }
                                    }
                                }
                            });

                            const inputElement = document.querySelector('#${id}');
                            const pond = FilePond.create(inputElement, {
                                allowMultiple: false,
                                allowReorder: false
                            });

                            window.pond = pond;
                        </script>`;
            case 'gallery':
                return `<section class="gallery" dir="${attributeMap['dir']}" mask="${attributeMap['mask']}">
                            <div class="foxesGallery photor">
                                <div class="photor__viewport">
                                    <div class="photor__viewportLayer" id="images"></div>
                                    <div class="photor__viewportControl">
                                        <div class="photor__viewportControlPrev"></div>
                                        <div class="photor__viewportControlNext"></div>
                                    </div>
                                </div>
                                <div class="photor__thumbs">
                                    <div class="photor__thumbsWrap"></div>
                                </div>
                            </div>
                        </section>`;
            default:
                return `<div class="form-floating mb-3 input_block" style="display: ${display || 'block'}">
                            <input type="${type || 'text'}" name="${name || ''}" class="form-control input" id="${name || ''}" value="${value || ''}" onKeyUp="${onKeyUp || ''}" placeholder="${placeholder || ''}" />
                            <label for="${name || ''}">${placeholder || ''}</label>
                        </div>`;
        }
    }

    async replaceLangTags(html) {
        let modifiedHtml = html;
        let match;

        while ((match = modifiedHtml.match(/%lang\|([^\%]*)%/))) {
            const langKey = match[1];
            const langText = this.foxEngine.page.langPack[langKey] || langKey;
            modifiedHtml = modifiedHtml.replace(match[0], langText);
        }

        return modifiedHtml;
    }
}
