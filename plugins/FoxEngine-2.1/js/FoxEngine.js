import { Request } from './modules/Request.js';
import { FoxesInputHandler } from './modules/FoxesInputHandler.js';
import { User } from './modules/User/User.js';
import { EditUser } from './modules/User/EditUser.js';
import { Servers } from './modules/Servers.js';
import { Page } from './modules/Page.js';
import { ModalApp } from './modules/ModalApp.js';
import { Emojis } from './modules/Emojis.js';
import { Utils } from './modules/Utils.js';
import { Logo } from './modules/Logo.js';
import { PaymentManager } from './modules/PaymentManager.js';
import { EntryReplacer } from './modules/EntryReplacer.js';
import { Cookies } from './modules/Cookies.js';
import { CookieManager } from './modules/CookieManager.js';
import { LottieAnimation } from './modules/LottieAnimation.js';
import { Snow } from './modules/Snow.js';
import { InfoBox } from './modules/InfoBox.js';
import '../../popper.min.js';
import './modules/Howler/howler.core.js';
import './modules/Notify.js';

export class FoxEngine {

    constructor(replaceData, userFields, templatesConfig, serversColorMap) {
        this.replaceData = replaceData;
        this.userFields = userFields;
        this.currentDate = new Date();
        this.elementsDir = `${replaceData.assets}elements/`;
		this.templatesConfig = templatesConfig;
		this.serversColorMap = serversColorMap;
        this.e = [
            "\n %c %c %c FoxEngine 2.8 - 🦊 WebUI 🦊  %c  %c  https://foxescraft.ru/  %c %c ⋆🐾°%c🌲%c🍂 \n\n",
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
		/*
		this.purchasePacks = [
            { id: 1000, img: "/uploads/icons/monets-1.png", label: "1 000 угля" },
            { id: 2000, img: "/uploads/icons/monets-2.png", label: "2 000 угля" },
            { id: 3000, img: "/uploads/icons/monets-3.png", label: "3 000 угля" },
            { id: 5000, img: "/uploads/icons/monets-4.png", label: "5 000 угля" }
        ]; */
        console.log(...this.e);
        if (replaceData.user_group !== '1') {
            this.preventSelection(document);
        }
        this.initialize();
		this.postInit();
    }
	


    async initialize() {
        try {
            this.request = new Request("/", { key: this.replaceData.secureKey, user: this.replaceData.login }, true);
			this.lottieAnimation = new LottieAnimation(this);
            this.foxesInputHandler = new FoxesInputHandler(this);
			this.entryReplacer = new EntryReplacer(this);
            this.utils = new Utils(this);
            this.logo = new Logo(this);
            this.user = new User(this);
			this.editUser = new EditUser(this);
            this.servers = new Servers(this);
			this.cookieManager = new CookieManager(this);
			this.infoBox = new InfoBox(this);
			
			this.cookies = new Cookies(this);
            this.page = new Page(this);
            this.modalApp = new ModalApp(this);
            this.emojis = new Emojis(this);
			this.payment = new PaymentManager();
            this.snow = new Snow(this);
			await this.loadTemplates();

            if ([11, 0, 1].includes(this.currentDate.getMonth())) {
                this.snow.loadSnow();
            }

            this.emojiArr = await this.emojis.parseEmojis();
			await foxEngine.infoBox.setBox("#infoBox");
        } catch (error) {
            this.log('Error during initialization:' + error, "ERROR");
            throw error;
        }
    }
	
	async postInit(){
		
	}

	async loadTemplates() {
		const templates = this.templatesConfig.templates;
		if (!templates) {
			this.log("Нет путей до шаблонов в конфигурации", "WARN");
			return;
		}
		
		if (!this.templateCache) {
			this.templateCache = {};
		}
		
		const self = this;
		const templatePromises = Object.entries(templates).map(async ([key, path]) => {
			try {
				const html = await this.loadTemplate(path, true);
				self.templateCache[key] = html;
				this.log(`Шаблон ${key} успешно загружен`);
			} catch (error) {
				this.log(`Ошибка загрузки шаблона для "${key}" с путём "${path}":` + error, "ERROR");
			}
		});
		
		await Promise.all(templatePromises);
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
            this.log('Error in sendPostAndGetAnswer:' + error, "ERROR");
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
            this.log('Error parsing JSON:' + error, "ERROR");
            throw error;
        }
    }

    parseResponseHTML(responseText) {
        try {
            return new DOMParser().parseFromString(responseText, 'text/html');
        } catch (error) {
            this.log('Error parsing HTML:' + error, "ERROR");
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
            this.log('Error replacing text in template:' + error, "ERROR");
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
	
	log(message, level = 'INFO') {
			const timestamp = new Date().toLocaleString();
			const levelStyles = {
				INFO:    'color: white; background: #2b78e4; padding: 2px 6px; border-radius: 3px;',
				WARN:    'color: black; background: #ffd966; padding: 2px 6px; border-radius: 3px;',
				ERROR:   'color: white; background: #e06666; padding: 2px 6px; border-radius: 3px;',
				DEBUG:   'color: black; background: #b6d7a8; padding: 2px 6px; border-radius: 3px;',
				SUCCESS: 'color: white; background: #6aa84f; padding: 2px 6px; border-radius: 3px;',
			};

			const label = `%c${level}`;
			const time = `%c[${timestamp}]`;
			const msg = `%c${message}`;

			const timeStyle = 'color: gray;';
			const msgStyle = 'color: inherit;';

			console.log(`${label} ${time} ${msg}`, levelStyles[level] || '', timeStyle, msgStyle);
	}

    async soundOnClick(type) {
        try {
            const sndArr = await this.fetchSoundData(type);

            if (sndArr.fileNum > 0) {
                const soundUrl = this.getSoundUrl(type, sndArr);
                this.playSound(soundUrl);
            }
        } catch (error) {
            this.log("Error in soundOnClick:" + error, "ERROR");
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
			if(location.hash === '')
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
