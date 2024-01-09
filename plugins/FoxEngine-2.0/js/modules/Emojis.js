class Emojis {
    constructor(foxEngine) {
		this.foxEngine = foxEngine;
		this.emojis = [];
		foxEngine.debugSend("Emoji init", "background: #c89f27; padding: 5px;");
	}
	
async parseEmojis() {
    try {
        let emojiData = await this.foxEngine.sendPostAndGetAnswer({
            sysRequest: 'parseEmojis'
        }, "JSON");

        //console.log('Received emoji data:', emojiData);

        if (emojiData && typeof emojiData === 'object') {
            for (let category in emojiData) {
                if (emojiData.hasOwnProperty(category) && Array.isArray(emojiData[category])) {
                    let emojiArray = emojiData[category];
                    //console.log(`Processing category: ${category}`);

                    for (let j = 0; j < emojiArray.length; j++) {
                        let emojiCatArr = emojiArray[j];
                        for(let k = 0; k < emojiCatArr.length; k++) {
                            let name = emojiCatArr[k].emojiName;
                            let code = emojiCatArr[k].emojiCode;
                            let imagePath = this.foxEngine.replaceData.assets+`emoticons/${category}/${name}.png`;

                            this.emojis.push({
                                name: name,
                                code: code,
                                imagePath: imagePath
                            });
                        }
                    }
                } else {
                    console.error('Invalid category structure:', emojiData[category]);
                }
            }
        } else {
            console.error('Invalid emoji data:', emojiData);
        }

        // Return the array of objects directly
        return this.emojis;
    } catch (error) {
        console.error('Error parsing emojis:', error);
        throw error;
    }
}



}
export { Emojis };