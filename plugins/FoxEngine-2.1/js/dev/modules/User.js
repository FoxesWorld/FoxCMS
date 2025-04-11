
import { PlaytimeWidgetGenerator } from './PlaytimeWidgetGenerator.js';

export class User {
    constructor(foxEngine) {
        this.foxEngine    = foxEngine;
        this.userSkin     = { front: '', back: '' };
        this.optNamesArr  = [];
        this.optionArray  = [];
        this.optionAmount = 0;
        this.userLogin    = foxEngine.replaceData.login;
        this.userData     = {};
        this.playTimeWidget = null;

        console.log(`Loading data for %c${this.userLogin}%c...`, 'color: #ff0000;', 'color: #000000;');
    }

    async apiRequest(payload, type = 'JSON') {
        try {
            return await this.foxEngine.sendPostAndGetAnswer(payload, type);
        } catch (err) {
            console.error('User.apiRequest error:', err);
            throw err;
        }
    }

    logDebug(msg, style = '') {
        this.foxEngine.debugSend(msg, style);
    }

    async parseUsrOptionsMenu() {
        try {
            if (this.optNamesArr.length <= this.optionAmount) {
                this.logDebug('Using FoxesWorld UserOptions', 'background:#39312fc7;color:yellow;');
            }
            if (this.foxEngine.replaceData.isLogged) {
                await this.parseUserLook(this.userLogin);
            }
            const json = await this.apiRequest({ getUserOptionsMenu: this.userLogin });
            this.optionAmount = json.optionAmount || 0;
            this.optionArray  = Array.isArray(json.optionArray) ? json.optionArray : [];
            this.logDebug(`UserOptions available: ${this.optionAmount}`);
            this.optionArray.forEach(optObj => {
                Object.entries(optObj).forEach(([name, opt]) => {
                    this.processOption(name, opt);
                });
            });
        } catch (err) {
            console.error('Error in parseUsrOptionsMenu:', err);
        }
    }
    
    getDominantColor(img, quantize = 24) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        const colorMap = {};
        let maxCount = 0;
        let dominantColor = { r: 0, g: 0, b: 0 };

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < 128) continue;
            const qr = Math.floor(r / quantize) * quantize;
            const qg = Math.floor(g / quantize) * quantize;
            const qb = Math.floor(b / quantize) * quantize;
            const key = `${qr}-${qg}-${qb}`;
            colorMap[key] = (colorMap[key] || 0) + 1;
            if (colorMap[key] > maxCount) {
                maxCount = colorMap[key];
                dominantColor = { r: qr, g: qg, b: qb };
            }
        }
        return dominantColor;
    }

    processOption(name, opt) {
        const html = this.generateOptionTemplate(name, opt);
        if (opt.optionBlock) {
            const block = document.querySelector(opt.optionBlock);
            if (block) {
                block.insertAdjacentHTML('beforeend', html);
            } else {
                console.warn(`Блок для опции "${name}" не найден: ${opt.optionBlock}`);
            }
        }
        this.optNamesArr.push(name);
    }

    static optionTemplates = {
        page: ({ optionClass, optionPreText, optionTitle }, name) => `
            <li class="${optionClass}">
                <a href="#" onclick="foxEngine.page.loadPage('${name}', replaceData.contentBlock); return false;">
                    <div class="rightIcon">${optionPreText}</div>
                    ${optionTitle}
                </a>
            </li>`,
        plainText: ({ optionTitle }) => optionTitle
    };

    generateOptionTemplate(name, opt) {
        const tpl = User.optionTemplates[opt.type];
        return tpl ? tpl(opt, name) : '';
    }

    async parseUserLook(login) {
        try {
            await this.getUserData(login);
            const [front, back] = await Promise.all([
                this.getUserSkin(login, 'front'),
                this.getUserSkin(login, 'back')
            ]);
            this.userSkin = { front, back };
            this.getPlayTimeWidget(this.userData.serversOnline);
            await this.parseBadges(login);
        } catch (err) {
            console.error('Error in parseUserLook:', err);
        }
    }

    getUserSkin(login, side) {
        return this.apiRequest({ sysRequest: 'skinPreview', login, side }, 'TEXT');
    }

    async userAction(action) {
        try {
            const ans = await this.apiRequest({ user_doaction: action });
            const actionBlock = document.getElementById('actionBlock');
            if (actionBlock) {
                actionBlock.innerHTML = `${ans.text} ${this.foxEngine.replaceData.realname}!`;
                this.foxEngine.utils.textAnimate('#actionBlock');
            }
        } catch (err) {
            console.error('Error in userAction:', err);
        }
    }

    async parseBadges(user) {
        try {
            const badgesContainer = document.getElementById('userBadges');
            if (!badgesContainer) {
                console.warn('Контейнер бейджей не найден');
                return;
            }
            if (badgesContainer.children.length) {
                console.log('Badges already loaded.');
                return;
            }
            const tpl = this.foxEngine.templateCache["badge"];
            if (!tpl) {
                console.error('Шаблон "badge" не найден в кеше');
                return;
            }
            const badges = await this.getBadgesArray(user);
            for (const obj of badges) {
                const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                    BadgeDesc:             obj.description,
                    AcquiredDateFormatted: this.foxEngine.utils.getFormattedDate(obj.acquiredDate),
                    BadgeName:             obj.badgeName,
                    BadgeImg:              obj.badgeImg
                });
                badgesContainer.insertAdjacentHTML('beforeend', html);
                $('[data-toggle="tooltip"]').tooltip({ placement: 'bottom', trigger: 'hover' });
            }
            if (!badges.length) badgesContainer.remove();
        } catch (err) {
            console.error('Error in parseBadges:', err);
        }
    }

    async refreshBalance(currencies) {
        try {
            const dataArr = await this.apiRequest({ user_doaction: 'getUnits' });
            const all = dataArr.reduce((acc, item) => {
                const [key, val] = Object.entries(item)[0];
                acc[key] = val;
                return acc;
            }, {});
            await Promise.all(currencies.map(async cur => {
                if (cur in all) {
                    const oldValue = Math.round(parseFloat(document.querySelector(`#${cur}`).textContent));
                    const newValue = Math.round(parseFloat(all[cur]));
                    await this.animateValueChange(oldValue, newValue, `#${cur}`);
                } else {
                    console.error(`No data for currency '${cur}'`);
                }
            }));
        } catch (err) {
            console.error('Error in refreshBalance:', err);
        }
    }

    animateValueChange(oldV, newV, selector) {
        if (oldV === newV) return Promise.resolve();
        return new Promise(resolve => {
            $({ n: oldV }).animate({ n: newV }, {
                duration: 2500,
                step(now) { $(selector).text(Math.round(now)); },
                complete: resolve
            });
        });
    }

    getBadgesArray(user) {
        return this.apiRequest({ user_doaction: 'GetBadges', userDisplay: user });
    }

    async getPlayTimeWidget(raw) {
        try {
            const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
            this.playTimeWidget = new PlaytimeWidgetGenerator(this.foxEngine);
            const html = await this.playTimeWidget.generate(data);
            const container = document.querySelector('.playtime-widget-container');
            if (container) {
                container.innerHTML = html;
            }
        } catch (err) {
            console.error('Error in getPlayTimeWidget:', err);
            const container = document.querySelector('.playtime-widget-container');
            if (container) {
                container.innerHTML = '<p>Error loading playtime widget</p>';
            }
        }
    }

    async showUserProfile(user) {
        try {
            const profile = await this.getUserProfile(user);
            await this.getUserData(user);
            this.foxEngine.page.setPage('');
            const content = await this.foxEngine.entryReplacer.replaceText(profile);
            this.foxEngine.page.loadData(content, this.foxEngine.replaceData.contentBlock);
            location.hash = `user/${user}`;
            this.foxEngine.foxesInputHandler.formInit(1000);
            setTimeout(() => {
                this.getPlayTimeWidget(this.userData.serversOnline);
                this.parseBadges(user);
            }, 600);
        } catch (err) {
            console.error('Error in showUserProfile:', err);
        }
    }

    async showProfilePopup(user, dialogOptions) {
        try {
            const profile = await this.getUserProfile(user);
            $('#dialog').dialog('option', 'title', user);
            const content = await this.foxEngine.entryReplacer.replaceText(profile);
            this.foxEngine.page.loadData(content, '#dialogContent');
            $('#dialog').dialog(dialogOptions).dialog('open');
        } catch (err) {
            console.error('Error in showProfilePopup:', err);
        }
    }

    async getLastUser() {
        try {
            const last = await this.apiRequest({ userAction: 'lastUser' });
            const tpl = this.foxEngine.templateCache["lastUser"];
            if (!tpl) {
                console.error('Шаблон "lastUser" не найден в кеше');
                return;
            }
            const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                colorScheme:  last.colorScheme,
                profilePhoto: last.profilePhoto,
                login:        last.login,
                realname:     last.realname,
                regDate:      this.foxEngine.utils.getFormattedDate(last.reg_date)
            });
            document.getElementById('lastUser').innerHTML = html;
        } catch (err) {
            console.error('Error in getLastUser:', err);
        }
    }

    async getUserProfile(user) {
        try {
            this.foxEngine.page.langPack = await this.foxEngine.page.loadLangPack('userProfile');
            const resp = await this.apiRequest({ userDisplay: user, user_doaction: 'ViewProfile' }, 'TEXT');
            return this.foxEngine.utils.isJson(resp)
                ? this.foxEngine.utils.showErrorPage(resp, this.foxEngine.replaceData.contentBlock)
                : resp;
        } catch (err) {
            console.error('Error in getUserProfile:', err);
        }
    }

    async logout(button) {
        try {
            const res = await this.apiRequest({ userAction: 'logout' });
            button.notify(res.message, res.type);
            this.foxEngine.soundOnClick(res.type);
            setTimeout(() => this.foxEngine.foxesInputHandler.refreshPage(), 1500);
        } catch (err) {
            console.error('Error in logout:', err);
        }
    }

    async getUserData(login) {
        try {
            this.userData = await this.apiRequest({ user_doaction: 'getUserData', login });
        } catch (err) {
            console.error('Error in getUserData:', err);
            throw err;
        }
    }
}
