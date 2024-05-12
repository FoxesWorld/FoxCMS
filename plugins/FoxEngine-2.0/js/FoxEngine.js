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
        
		/* TEXT REPLACER*/
		this.updatedText;
		this.currentDate = new Date();
        this.replacedTimes = 0;
        this.elementsDir = replaceData.assets + "elements/";
        this.e = ["\n %c %c %c FoxEngine 2.0 - 🦊 WebUI 🦊  %c  %c  https://foxesworld.ru/  %c %c ⋆🐾°%c🌲%c🍂 \n\n", "background: #c89f27; padding:5px 0;", "background: #c89f27; padding:5px 0;", "color: #c89f27; background: #030307; padding:5px 0;", "background: #c89f27; padding:5px 0;", "background: #bea8a8; padding:5px 0;", "background: #c89f27; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
		window.console.log.apply(console, this.e);
		if(replaceData.user_group !== '1') {
			this.preventSelection(window.document);
		}
		this.initialize();
    }
	
	async initialize() {
        try {
			this.request = new Request("/", { key: replaceData.secureKey, user: replaceData.login}, true);
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
			if(this.currentDate.getMonth() >= 11 || this.currentDate.getMonth() <= 1) {
				this.snow.loadSnow();
			}
            this.emojiArr = await this.emojis.parseEmojis();
				
        } catch (error) {
            console.error('Error during initialization:', error);
            throw error;
        }
    }
	
	//@Deprecated
	initialPage(){
		if(location.hash == '')
			this.page.loadPage("welcome", '#content');
	}

    async sendPostAndGetAnswer(requestBody, answerType) {
        try {
            // Assuming request is a class or object that handles HTTP requests
            let response = await this.request.send_post(requestBody);
            await this.waitForResponse(response);
            switch (answerType) {
                case "JSON":
                    return this.parseResponseJSON(response.responseText);
				break;

                case "HTML":
                    return this.parseResponseHTML(response.responseText);
				break;

                case "TEXT":
                    return response.responseText;
				break;

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
            return '';
        }
    }

    buttonFreeze(button, delay) {
        let oldValue = button.innerHTML;
        let spinner = '<div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div>';
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

    async loadTemplate(filePath, replaceTags) {
        try {
            let response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Failed to load HTML content');
            }

            let htmlContent = await response.text();
			if(replaceTags === true) {
				return this.entryReplacer.replaceText(htmlContent);
			} else {
				return htmlContent;
			}

            
        } catch (error) {
            console.error(error.message);
            return '';
        }
    }
	
	preventSelection(element) {
		let preventSelection = false;

		function addHandler(element, event, handler) {
			element.addEventListener(event, handler);
		}

		function removeSelection() {
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else if (document.selection && document.selection.clear) {
				document.selection.clear();
			}
		}

		addHandler(element, 'mousemove', function () {
			if (preventSelection) {
				removeSelection();
			}
		});

		// Mouse Events
		addHandler(element, 'mousedown', function (event) {
			event = event || window.event;
			const sender = event.target || event.srcElement;
			preventSelection = !(sender.tagName.match(/INPUT|TEXTAREA/i));
		});

		// Keyboard
		function killCtrlA(event) {
			event = event || window.event;
			const sender = event.target || event.srcElement;

			if (sender.tagName.match(/INPUT|TEXTAREA/i)) return;

			const key = event.keyCode || event.which;
			const ctrlKey = event.ctrlKey || event.metaKey; // Mac

			if (ctrlKey && (key === 65 || key === 85 || key === 83)) { // Ctrl + A, Ctrl + U, Ctrl + S
				removeSelection();
				event.preventDefault ? event.preventDefault() : (event.returnValue = false);
			}
		}

		addHandler(element, 'keydown', killCtrlA);
		addHandler(element, 'keyup', killCtrlA);

		// Context menu
		document.oncontextmenu = function () {
			return false;
		};
	}
}

export { FoxEngine };