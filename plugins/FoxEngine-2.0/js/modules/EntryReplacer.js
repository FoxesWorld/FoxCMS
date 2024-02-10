export class EntryReplacer {
    constructor(foxEngine) {
        this.foxEngine = foxEngine; 
    }

    replaceText(text) {
		this.replacedTimes = 0;
        this.updatedText = text || "";
		
        if (this.foxEngine.userFields && Array.isArray(this.foxEngine.userFields)) {
            for (let j = 0; j < this.foxEngine.userFields.length; j++) {
                let value = this.foxEngine.userFields[j];
                let mask = "%" + value + "%";
                while (this.updatedText.includes(mask)) {
                    this.foxEngine.debugSend(" - Replacing " + value + " mask...", 'color: green');
                    this.updatedText = this.updatedText.replace(mask, this.foxEngine.replaceData[value]);
                    this.replacedTimes++;
                }
            }
        } else {
            this.foxEngine.debugSend("Invalid or undefined userFields", 'color: red');
            return this.updatedText;
        }

        this.updatedText = this.replaceEmojisWithImages(this.updatedText);
		this.updatedText = this.replaceInputTags(this.updatedText);

        switch (this.replacedTimes) {
            case 0:
                this.foxEngine.debugSend("No text for replacing was found", 'color: orange');
                break;

            case 1:
                this.foxEngine.debugSend("Replaced " + this.replacedTimes + " occurrence", 'color: green');
                break;

            default:
                this.foxEngine.debugSend("Replaced " + this.replacedTimes + " occurrences", 'color: green');
                break;
        }
        return this.updatedText;
    }

	replaceEmojisWithImages(text) {
		// Check if this.foxEngine and this.foxEngine.emojiArr are defined
		if (this.foxEngine && this.foxEngine.emojiArr) {
			for (let i = 0; i < this.foxEngine.emojiArr.length; i++) {
				let emoji = this.foxEngine.emojiArr[i];
				let emojiCode = ":" + emoji.name + ":";
				let imagePath = emoji.imagePath;

				// Use a regular expression to replace all occurrences of the emoji code with an image tag
				let regex = new RegExp(emojiCode, 'g');
				text = text.replace(regex, `<img src="${imagePath}" class="emoji">`);
			}
		}

		return text;
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
				
			case 'gallery':
				modifiedHtml = modifiedHtml.replace(match[0],`<section class="gallery" dir="`+attributeMap['dir']+`" mask="`+attributeMap['mask']+`">
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




}