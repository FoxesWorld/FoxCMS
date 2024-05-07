export class EntryReplacer {
    constructor(foxEngine) {
        this.foxEngine = foxEngine; 
    }

    async replaceText(text) {
        this.replacedTimes = 0;
        this.updatedText = await text || "";
        
        if (!this.foxEngine.userFields || !Array.isArray(this.foxEngine.userFields)) {
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
        if (this.foxEngine && this.foxEngine.emojiArr) {
            for (const emoji of this.foxEngine.emojiArr) {
                let emojiCode = ":" + emoji.name + ":";
                let imagePath = emoji.imagePath;
                let regex = new RegExp(emojiCode, 'g');
                this.updatedText = this.updatedText.replace(regex, `<img src="${imagePath}"  alt="${emoji.name}" class="emoji" />`);
            }
        }
    }
	
	replaceUserFields() {
        for (const value of this.foxEngine.userFields) {
            let mask = "%" + value + "%";
            while (this.updatedText.includes(mask)) {
                this.updatedText = this.updatedText.replace(mask, this.foxEngine.replaceData[value]);
                this.replacedTimes++;
            }
        }
    }
	
replaceInputTags = (html) => {
    let modifiedHtml = html;
    let match;

    while ((match = modifiedHtml.match(/\[input[^\]]*\]/))) {
        var attributes = match[0].match(/(\S+)=["'](.*?)["']/g);
        var attributeMap = {};

        for (var i = 0; i < attributes.length; i++) {
            var parts = attributes[i].split('=');
            var attributeName = parts[0];
            var attributeValue = parts[1].replace(/["']/g, '');
            attributeMap[attributeName] = attributeValue;
        }
        this.foxEngine.debugSend(" - Building " + attributeMap['type'] + " field...", 'color: green');
        switch (attributeMap['type']) {
            case 'checkbox':
                modifiedHtml = modifiedHtml.replace(match[0], '<label for="' + (attributeMap['name'] || '') + '" class="checkbox_container">' +
                    (attributeMap['placeholder'] || '') +
                    '<input type="checkbox" style="display: none;" ' +
                    'name="' + (attributeMap['name'] || '') + '" ' +
                    'id="' + (attributeMap['name'] || '') + '" ' +
                    (attributeMap['value'] ? 'checked' : '') +
                    ' />' +
                    '<span class="checkmark"></span>' +
                    '</label>');
                break;

            case 'captcha':
                modifiedHtml = modifiedHtml.replace(match[0], '<div class="c-captcha">' +
                    '<div class="g-recaptcha" data-callback="fillResponse" data-sitekey="'+attributeMap['siteKey']+'" data-theme="Light"></div>' +
                    '<script src="https://www.google.com/recaptcha/api.js?hl='+attributeMap['lang']+'" async defer></script>' +
                    '</div>');
                break;
				
			case 'hidden':
				    modifiedHtml = modifiedHtml.replace(match[0],
                    '<input type="' + (attributeMap['type'] || 'text') + '" ' +
                    'name="' + (attributeMap['name'] || '') + '" ' +
                    'id="' + (attributeMap['name'] || '') + '" ' +
                    'value="' + (attributeMap['value'] || '') + '"' +
                    'onKeyUp="' + (attributeMap['onKeyUp'] || '') + '"' +
                    'placeholder="' + (attributeMap['placeholder'] || '') + '" />');
			break;
				
			case 'upload':
				modifiedHtml = modifiedHtml.replace(match[0],`<table>
						<td>
							<h3 class="settingsTitle">%lang|loadPhoto%</h3>
							<input type="file" id="${attributeMap['id']}" name="${attributeMap['name']}" accept=".jpeg" data-file-metadata-imagetype="${attributeMap['metadata']}" />
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

						const inputElement = document.querySelector('#${attributeMap['id']}');
						const pond = FilePond.create(
							inputElement, {
								allowMultiple: false,
								allowReorder: false
							}
						);

						window.pond = pond;
					</script>`);
			break;
				
			case 'gallery':
				modifiedHtml = modifiedHtml.replace(match[0],`
				<section class="gallery" dir="`+attributeMap['dir']+`" mask="`+attributeMap['mask']+`">
					<div class="foxesGallery photor">
					
						 <div class="photor__viewport">
							<div class="photor__viewportLayer" id="images">
							</div>
						 
							<div class="photor__viewportControl">
								<div class="photor__viewportControlPrev"></div>
								<div class="photor__viewportControlNext"></div>
							</div>
						 </div>
						 
						<div class="photor__thumbs">
							<div class="photor__thumbsWrap"></div>
						</div>
					</div>
				</section>`);
			break;
            default:
                modifiedHtml = modifiedHtml.replace(match[0], '<div class="form-floating mb-3 input_block">' +
                    '<input type="' + (attributeMap['type'] || 'text') + '" ' +
                    'name="' + (attributeMap['name'] || '') + '" ' +
                    'class="form-control input" ' +
                    'id="' + (attributeMap['name'] || '') + '" ' +
                    'value="' + (attributeMap['value'] || '') + '"' +
                    'onKeyUp="' + (attributeMap['onKeyUp'] || '') + '"' +
                    'placeholder="' + (attributeMap['placeholder'] || '') + '" />' +
                    '<label for="' + (attributeMap['name'] || '') + '">' + (attributeMap['placeholder'] || '') + '</label>' +
                    '</div>');
                break;
        }
    }
    return modifiedHtml;
}
    async replaceLangTags(html) {
        let modifiedHtml = html;
        let match;
        while (match = modifiedHtml.match(/%lang\|([^\%]*)%/)) {
            const langKey = match[1];
            const langText = this.foxEngine.page.langPack[langKey];

			if(langKey !== null) {
                modifiedHtml = modifiedHtml.replace(match[0], langText);
            } else {
                modifiedHtml = modifiedHtml.replace(match[0], langKey);
            }
        }
        return modifiedHtml;
    }
}