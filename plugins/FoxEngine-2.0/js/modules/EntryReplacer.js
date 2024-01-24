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

}