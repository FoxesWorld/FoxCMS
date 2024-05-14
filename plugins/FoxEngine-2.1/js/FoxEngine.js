import { Request } from './modules/Request.js';
import { FoxesInputHandler } from './modules/FoxesInputHandler.js';
import { User } from './modules/User.js';
import { Servers } from './modules/Servers.js';
import { Page } from './modules/Page.js';
import { ModalApp } from './modules/ModalApp.js';
import { Emojis } from './modules/Emojis.js';
import { Utils } from './modules/Utils.js';
import { Logo } from './modules/Logo.js';
import { EntryReplacer } from './modules/EntryReplacer.js';
import { Snow } from './modules/Snow.js';
import '../../popper.min.js';
import './modules/Howler/howler.core.js';

class FoxEngine {

    constructor(replaceData, userFields) {
        this.replaceData = replaceData;
        this.userFields = userFields;
        this.currentDate = new Date();
        this.elementsDir = `${replaceData.assets}elements/`;
        this.e = [
            "\n %c %c %c FoxEngine 2.0 - 🦊 WebUI 🦊  %c  %c  https://foxesworld.ru/  %c %c ⋆🐾°%c🌲%c🍂 \n\n",
            "background: #c89f27; padding:5px 0;",
            "background: #c89f27; padding:5px 0;",
            "color: #c89f27; background: #030307; padding:5px 0;",
            "background: #c89f27; padding:5px 0;",
            "background: #bea8a8; padding:5px 0;",
            "background: #c89f27; padding:5px 0;",
            "color: #ff2424; background: #fff; padding:5px 0;",
            "color: #ff2424; background: #fff; padding:5px 0;",
            "color: #ff2424; background: #fff; padding:5px 0;"
        ];
        console.log(...this.e);
        if (replaceData.user_group !== '1') {
            this.preventSelection(document);
        }
        this.initialize();
    }

    async initialize() {
        try {
            this.request = new Request("/", { key: this.replaceData.secureKey, user: this.replaceData.login }, true);
            this.foxesInputHandler = new FoxesInputHandler(this);
            this.utils = new Utils(this);
            this.logo = new Logo(this);
            this.user = new User(this);
            this.servers = new Servers(this);
            this.entryReplacer = new EntryReplacer(this);
            this.page = new Page(this);
            this.modalApp = new ModalApp(this);
            this.emojis = new Emojis(this);
            this.snow = new Snow(this);

            if ([11, 0, 1].includes(this.currentDate.getMonth())) {
                this.snow.loadSnow();
            }

            this.emojiArr = await this.emojis.parseEmojis();
        } catch (error) {
            console.error('Error during initialization:', error);
            throw error;
        }
    }

    async sendPostAndGetAnswer(requestBody, answerType) {
        try {
            const response = await this.request.send_post(requestBody);
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
            console.error('Error in sendPostAndGetAnswer:', error);
            throw error;
        }
    }

    waitForResponse(response) {
        return new Promise(resolve => {
            response.addEventListener("load", resolve);
        });
    }

    parseResponseJSON(responseText) {
        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            throw error;
        }
    }

    parseResponseHTML(responseText) {
        try {
            return new DOMParser().parseFromString(responseText, 'text/html');
        } catch (error) {
            console.error('Error parsing HTML:', error);
            throw error;
        }
    }

    async replaceTextInTemplate(template, replacements) {
        try {
            return Object.keys(replacements).reduce((replacedTemplate, key) => {
                const regex = new RegExp(`{${key}}`, 'g');
                return replacedTemplate.replace(regex, replacements[key]);
            }, template);
        } catch (error) {
            console.error('Error replacing text in template:', error);
            return '';
        }
    }

    buttonFreeze(button, delay) {
        const oldValue = button.innerHTML;
        const spinner = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
        button.disabled = true;
        button.innerHTML = spinner;

        setTimeout(() => {
            button.innerHTML = oldValue;
            button.disabled = false;
        }, delay);
    }

    async soundOnClick(type) {
        try {
            const sndArr = await this.fetchSoundData(type);

            if (sndArr.fileNum > 0) {
                const soundUrl = this.getSoundUrl(type, sndArr);
                this.playSound(soundUrl);
            }
        } catch (error) {
            console.error("Error in soundOnClick:", error);
        }
    }

    async fetchSoundData(type) {
        return this.sendPostAndGetAnswer({ sysRequest: "tplScan", path: `/assets/snd/${type}` }, "JSON");
    }

    getSoundUrl(type, sndArr) {
        const sndNum = this.utils.randomNumber(1, sndArr.fileNum);
        return `${this.replaceData.assets}snd/${type}/sound${sndNum}.mp3`;
    }

    playSound(soundUrl) {
        new Howl({
            src: [soundUrl],
            preload: true,
        }).play();
    }

    debugSend(message, style) {
        console.log(`%c${message}`, style);
    }

    async loadTemplate(filePath, replaceTags = false) {
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Failed to load HTML content');
            }

            const htmlContent = await response.text();
            return replaceTags ? this.entryReplacer.replaceText(htmlContent) : htmlContent;
        } catch (error) {
            console.error('Error loading template:', error);
            return '';
        }
    }
	
		//@Deprecated
		initialPage(){
			if(location.hash == '')
				this.page.loadPage("welcome", '#content');
		}


    preventSelection(element) {
        let preventSelection = false;

        const removeSelection = () => {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
        };

        element.addEventListener('mousemove', () => {
            if (preventSelection) {
                removeSelection();
            }
        });

        element.addEventListener('mousedown', (event) => {
            preventSelection = !['INPUT', 'TEXTAREA'].includes(event.target.tagName);
        });

        const killCtrlA = (event) => {
            if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;

            if (event.ctrlKey && [65, 85, 83].includes(event.keyCode)) { // Ctrl + A, U, S
                removeSelection();
                event.preventDefault();
            }
        };

        element.addEventListener('keydown', killCtrlA);
        element.addEventListener('keyup', killCtrlA);

        document.oncontextmenu = () => false;
    }
}

export { FoxEngine };
