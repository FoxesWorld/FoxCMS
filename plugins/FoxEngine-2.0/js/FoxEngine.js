import { Request } from './modules/Request.js';
import { FoxesInputHandler } from './modules/FoxesInputHandler.js';
import { User } from './modules/User.js';
import { Servers } from './modules/Servers.js';
import { Page } from './modules/Page.js';
import { Emojis } from './modules/Emojis.js';
import { Utils } from './modules/Utils.js';
import './modules/Notify.js';
import './modules/howler.core.js';

class FoxEngine {

    constructor(replaceData, userFields) {
        this.replaceData = replaceData;
        this.userFields = userFields;
        
		/* TEXT REPLACER*/
		this.updatedText;
        this.replacedTimes = 0;
        this.elementsDir = replaceData.assets + "elements/";
        this.e = ["\n %c %c %c FoxEngine 2.0 - 🦊 WebUI 🦊  %c  %c  https://foxesworld.ru/  %c %c ⋆🐾°%c🌲%c🍂 \n\n", "background: #c89f27; padding:5px 0;", "background: #c89f27; padding:5px 0;", "color: #c89f27; background: #030307; padding:5px 0;", "background: #c89f27; padding:5px 0;", "background: #bea8a8; padding:5px 0;", "background: #c89f27; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
		window.console.log.apply(console, this.e);

		this.initialize();
        
    }
	
	async initialize() {
        try {
			this.request = new Request("/", { key: replaceData.secureKey, user: replaceData.login}, true);
			this.foxesInputHandler = new FoxesInputHandler(this);
			this.utils = new Utils(this);
			this.user = new User(this);
			this.servers = new Servers(this);
			this.page = new Page(this);
			this.emojis = new Emojis(this);
            this.emojiArr = await this.emojis.parseEmojis();
			
        } catch (error) {
            console.error('Error during initialization:', error);
            throw error;
        }
    }
	
	initialPage(){
		if(location.hash == '')
			this.page.loadPage("welcome", '#content')
	}

    async sendPostAndGetAnswer(requestBody, answerType) {
        try {
            // Assuming request is a class or object that handles HTTP requests
            let response = await this.request.send_post(requestBody);
            await this.waitForResponse(response);
            switch (answerType) {
                case "JSON":
                    return this.parseResponseJSON(response.responseText);

                case "HTML":
                    return this.parseResponseHTML(response.responseText);

                case "TEXT":
                    return response.responseText;

                default:
                    throw new Error("Invalid answerType specified");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    waitForResponse(response) {
        return new Promise(resolve => {
            response.addEventListener("load", () => {
                resolve();
            });
        });
    }

    parseResponseJSON(responseText) {
        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    parseResponseHTML(responseText) {
        try {
            return new DOMParser().parseFromString(responseText, 'text/html');
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
	
	async replaceTextInTemplate(template, replacements) {
        try {
            let replacedTemplate = template;

            // Replace placeholders in the template
            for (let key in replacements) {
                if (replacements.hasOwnProperty(key)) {
                    const regex = new RegExp('{' + key + '}', 'g');
                    replacedTemplate = replacedTemplate.replace(regex, replacements[key]);
                }
            }

            return replacedTemplate;
        } catch (error) {
            console.error(error.message);
            return ''; // Return an empty string or handle the error accordingly
        }
    }

    buttonFreeze(button, delay) {
        let oldValue = button.innerHTML;
        let spinner = '<ul class="list-inline"> <li>Ожидайте</li> <li class="wait"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></li>';
        button.setAttribute('disabled', true);
        button.innerHTML = spinner;

        setTimeout(function() {
            button.innerHTML = oldValue;
            button.removeAttribute('disabled');
        }, delay);
    };

    /* SOUND*/

			async soundOnClick(type) {
				try {
					const sndArr = await this.fetchSoundData(type);

					if (sndArr.fileNum > 0) {
						const soundUrl = this.getSoundUrl(type, sndArr);
						this.playSound(soundUrl);
					}
				} catch (error) {
					console.error("Error while processing soundOnClick:", error);
				}
			};

			async fetchSoundData(type) {
				return await this.sendPostAndGetAnswer({
					sysRequest: "tplScan",
					path: `/assets/snd/${type}`,
				}, "JSON");
			}

			getSoundUrl(type, sndArr) {
				const sndNum = this.utils.randomNumber(1, sndArr.fileNum);
				return `${this.replaceData.assets}snd/${type}/sound${sndNum}.mp3`;
			}

			playSound(soundUrl) {
				var sound = new Howl({
					src: [soundUrl],
					preload: true,
				}).play();
			}
    /* SOUND*/
	
	debugSend(message, style) {
        console.log("%c" + message, style);
    };

    async loadAndReplaceHtml(filePath, replacements) {
        try {
            let response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Failed to load HTML content');
            }

            let htmlContent = await response.text();

            // Replace placeholders in the HTML content
            for (let key in replacements) {
                if (replacements.hasOwnProperty(key)) {
                    const regex = new RegExp('{' + key + '}', 'g');
                    htmlContent = htmlContent.replace(regex, replacements[key]);
                }
            }

            return htmlContent;
        } catch (error) {
            console.error(error.message);
            return ''; // Return an empty string or handle the error accordingly
        }
    }

    replaceText(text, page) {
        this.updatedText = text || "";
        for (let j = 0; j < this.userFields.length; j++) {
            let value = this.userFields[j];
            let mask = "%" + value + "%";
            while (this.updatedText.includes(mask)) {
                this.debugSend(" - Replacing " + value + " mask...", 'color: green');
                this.updatedText = this.updatedText.replace(mask, this.replaceData[value]);
                this.replacedTimes++;
            }
        }
		this.updatedText = this.replaceEmojisWithImages(this.updatedText);
        switch (this.replacedTimes) {
            case 0:
                this.debugSend("No text for replacing was found", 'color: red');
                break;

            case 1:
                this.debugSend("Replaced " + this.replacedTimes + " occurrence", 'color: green');
                break;

            default:
                this.debugSend("Replaced " + this.replacedTimes + " occurrences", 'color: green');
                break;
        }
        this.replacedTimes = 0;
        return this.updatedText;
    }
	
	replaceEmojisWithImages(text) {
        // Assuming parseEmojis returns an array of objects with properties: name, code, and imagePath

        for (let i = 0; i < this.emojiArr.length; i++) {
            let emoji = this.emojiArr[i];
            let emojiCode = ":"+ emoji.name + ":";
            let imagePath = emoji.imagePath;

            // Use a regular expression to replace all occurrences of the emoji code with an image tag
            let regex = new RegExp(emojiCode, 'g');
            text = text.replace(regex, `<img src="${imagePath}" class="emoji">`);
        }

        return text;
    }
}

export { FoxEngine };