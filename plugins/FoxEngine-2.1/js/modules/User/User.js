import { ApiService } from './ApiService.js';
import { BadgeManager } from './BadgeManager.js';
import { SkinManager } from './SkinManager.js';
import { PlaytimeWidgetGenerator } from './PlaytimeWidgetGenerator.js';
import { OptionsManager } from './OptionsManager.js';
import { UIRenderer } from './UIRenderer.js';

export class User {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.api = new ApiService(foxEngine);
        this.badgeManager = new BadgeManager(foxEngine, this.api);
        this.skinManager = new SkinManager(foxEngine, this.api);
        this.playtimeWidgetManager = new PlaytimeWidgetGenerator(foxEngine);
        this.optionsManager = new OptionsManager(foxEngine, this.api);
        this.uiRenderer = new UIRenderer(foxEngine);
        this.userLogin = foxEngine.replaceData.login;
        this.userData = {};
        this.userSkin = { front: '', back: '' };
    }

    async initUserOptions() {
        await this.optionsManager.loadOptions(this.userLogin);
    }

    async getUserData(login) {
        if (this.userData[login]) return this.userData[login];
        try {
            const data = await this.api.request({ user_doaction: 'getUserData', login });
            this.userData[login] = data;
            this.foxEngine.log(`Loading data for ${login}`);
            return data;
        } catch (err) {
            console.error('Error in getUserData:', err);
            throw err;
        }
    }

    async getUserProfile(user) {
        try {
            this.foxEngine.page.langPack = await this.foxEngine.page.loadLangPack('userProfile');
            const resp = await this.api.request({ userDisplay: user, user_doaction: 'ViewProfile' }, 'TEXT');
            return this.foxEngine.utils.isJson(resp)
                ? this.foxEngine.utils.showErrorPage(resp, this.foxEngine.replaceData.contentBlock) : resp;
        } catch (err) {
            console.error('Error in getUserProfile:', err);
        }
    }

    async showUserProfile(user, options = {}) {
        try {
            await this.getUserData(user);
            const profile = await this.getUserProfile(user);
            const config = {
                quantize: this.userData[user]?.quantize || options.quantize || 24,
                alphaThreshold: this.userData[user]?.alphaThreshold || options.alphaThreshold || 128,
                gradientAngle: this.userData[user]?.gradientAngle || options.gradientAngle || 45,
                formInitDelay: this.userData[user]?.formInitDelay || options.formInitDelay || 500,
                ...options
            };

            const userPic = new Image();
            userPic.crossOrigin = 'anonymous';
            userPic.src = this.userData[user].profilePhoto;

            const gradientAngle = this.uiRenderer.extractAngle(this.userData[user].last_date);
            const dominantColor = await this.uiRenderer.getDominantColor(userPic, config.quantize, config.alphaThreshold);

            const content = await this.foxEngine.entryReplacer.replaceText(profile);
            const doc = new DOMParser().parseFromString(content, "text/html");
            const profileDiv = doc.querySelector('#profileContents');
            if (profileDiv) {
                profileDiv.style.background = `linear-gradient(${gradientAngle}deg, ${dominantColor}cc, ${this.userData[user].colorScheme})`;
            }

            this.foxEngine.page.setPage('');
            this.foxEngine.page.loadData(doc.body.innerHTML, this.foxEngine.replaceData.contentBlock);
            location.hash = `user/${user}`;

            doc.onload = async () => {
                this.playtimeWidgetManager.createPlayTimeWidget(this.userData[user].serversOnline);
                this.foxEngine.foxesInputHandler.formInit(config.formInitDelay);
            };
        } catch (err) {
            console.error('Error in showUserProfile:', err);
        }
    }

	async parseUserLook(login) {
		try {
			await this.getUserData(login);
			const [front, back] = await Promise.all([
				this.skinManager.getSkin(login, 'front'),
				this.skinManager.getSkin(login, 'back')
			]);
			this.userSkin = { front, back };

			this.badgeManager.reset(); // <--- вот здесь
			await this.badgeManager.loadBadges(login);

			this.createPlayTimeWidget(this.userData[login].serversOnline);
		} catch (err) {
			console.error('Error in parseUserLook:', err);
		}
	}


    async createPlayTimeWidget(raw) {
        try {
            const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
            const playTimeWidget = new PlaytimeWidgetGenerator(this.foxEngine);
            const html = await playTimeWidget.generate(data);
            const container = document.querySelector('.playtime-widget-container');
            if (container) container.innerHTML = html;
        } catch (err) {
            console.error('Error in createPlayTimeWidget:', err);
            const container = document.querySelector('.playtime-widget-container');
            if (container) container.innerHTML = '<p>Error loading playtime widget</p>';
        }
    }

    async logout(button) {
        try {
            const res = await this.api.request({ userAction: 'logout' });
            button.notify(res.message, res.type);
            this.foxEngine.soundOnClick(res.type);
            setTimeout(() => this.foxEngine.foxesInputHandler.refreshPage(), 1500);
        } catch (err) {
            console.error('Error in logout:', err);
        }
    }

    async getLastUser() {
        try {
            const last = await this.api.request({ userAction: 'lastUser' });
            const tpl = this.foxEngine.templateCache["lastUser"];
            if (!tpl) {
                this.foxEngine.log('Шаблон "lastUser" не найден в кеше', "ERROR");
                return;
            }
            const userPic = new Image();
            userPic.crossOrigin = 'anonymous';
            userPic.src = last.profilePhoto;

            const dColor = await this.uiRenderer.getDominantColor(userPic, 24, 128);
            const gradientAngle = this.uiRenderer.extractAngle(last.last_date);

            const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                colorScheme: last.colorScheme,
                angle: gradientAngle,
                dominantColor: dColor + "cc",
                profilePhoto: last.profilePhoto,
                login: last.login,
                realname: last.realname,
                regDate: this.foxEngine.utils.getFormattedDate(last.reg_date)
            });

            document.getElementById('lastUser').innerHTML = html;
        } catch (err) {
            console.error('Error in getLastUser:', err);
        }
    }

    async showProfilePopup(user) {
        try {
            const profile = await this.getUserProfile(user);
            const content = await this.foxEngine.entryReplacer.replaceText(profile);
            //this.foxEngine.page.loadData(content, '#dialogContent');
			this.foxEngine.modalApp.showModalApp("min-content", user, content, () => {});
        } catch (err) {
            console.error('Error in showProfilePopup:', err);
        }
    }

    async userAction(action) {
        try {
            const ans = await this.api.request({ user_doaction: action });
            const actionBlock = document.getElementById('actionBlock');
            if (actionBlock) {
                actionBlock.innerHTML = `${ans.text} ${this.foxEngine.replaceData.realname}!`;
                this.foxEngine.utils.textAnimate('#actionBlock');
            }
        } catch (err) {
            console.error('Error in userAction:', err);
        }
    }

    async refreshBalance(currencies) {
        try {
            const dataArr = await this.api.request({ user_doaction: 'getUnits' });
            const all = dataArr.reduce((acc, item) => {
                const [key, val] = Object.entries(item)[0];
                acc[key] = val;
                return acc;
            }, {});
            await Promise.all(currencies.map(async cur => {
                if (cur in all) {
                    const oldValue = Math.round(parseFloat(document.querySelector(`#${cur}`).textContent));
                    const newValue = Math.round(parseFloat(all[cur]));
                    await this.uiRenderer.animateValueChange(oldValue, newValue, `#${cur}`);
                } else {
                    console.error(`No data for currency '${cur}'`);
                }
            }));
        } catch (err) {
            console.error('Error in refreshBalance:', err);
        }
    }
}
