class Emojis {
    constructor(foxEngine) {
		this.foxEngine = foxEngine;
	}
	
	async parseEmojis() {
        try {
            let emojiHTML = `<div class="emoji_box">`;

            // Assuming request is a class or object that handles HTTP requests
            let emojiData = await foxEngine.request.send_post({
                sysRequest: 'parseEmojis'
            });

            if (emojiData && emojiData.emoji && Array.isArray(emojiData.emoji)) {
                let emojiArray = emojiData.emoji;

                for (let emoji of emojiArray) {
                    if (emoji && emoji.code && emoji.name) {
                        let code = emoji.code;
                        let name = emoji.name;

                        emojiHTML += `<div class="emoji_symbol" data-emoji="${code}" title="${name}"></div>`;
                    } else {
                        console.error('Invalid emoji structure:', emoji);
                    }
                }

                emojiHTML += `</div>`;
            } else {
                console.error('Invalid emoji data:', emojiData);
                // Handle the error or return an appropriate value
            }

            return emojiHTML;
        } catch (error) {
            console.error('Error parsing emojis:', error);
            throw error;
        }
    }
}
export { Emojis };