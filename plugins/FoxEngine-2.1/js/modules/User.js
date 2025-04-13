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
    }

    async apiRequest(payload, type = 'JSON') {
        try {
            return await this.foxEngine.sendPostAndGetAnswer(payload, type);
        } catch (err) {
            console.error('User.apiRequest error:', err);
            throw err;
        }
    }

    async parseUsrOptionsMenu() {
        try {
            if (this.optNamesArr.length <= this.optionAmount) {
                this.foxEngine.log('Using FoxesWorld UserOptions');
            }
            if (this.foxEngine.replaceData.isLogged) {
                await this.parseUserLook(this.userLogin);
            }
            const json = await this.apiRequest({ getUserOptionsMenu: this.userLogin });
            this.optionAmount = json.optionAmount || 0;
            this.optionArray  = Array.isArray(json.optionArray) ? json.optionArray : [];
            this.foxEngine.log(`UserOptions available: ${this.optionAmount}`);
            this.optionArray.forEach(optObj => {
                Object.entries(optObj).forEach(([name, opt]) => {
                    this.processOption(name, opt);
                });
            });
        } catch (err) {
            console.error('Error in parseUsrOptionsMenu:', err);
        }
    }

	/** @private */
    _calculateDominantColor(img, quantize = 16, alphaThreshold = 128) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let data;
        try {
            data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        } catch (e) {
            console.error('Не удалось получить данные изображения:', e);
            return '#000000';
        }

        const colorMap = {};
        let maxCount = 0;
        let dominantColor = { r: 0, g: 0, b: 0 };

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < alphaThreshold) continue;

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

        const toHex = (c) => c.toString(16).padStart(2, '0');
        return `#${toHex(dominantColor.r)}${toHex(dominantColor.g)}${toHex(dominantColor.b)}`;
    }

    processOption(name, opt) {
        const html = this.generateOptionTemplate(name, opt);
        if (opt.optionBlock) {
            const block = document.querySelector(opt.optionBlock);
            if (block) {
                block.insertAdjacentHTML('beforeend', html);
            } else {
                this.foxEngine.log(`Блок для опции "${name}" не найден: ${opt.optionBlock}`, "WARN");
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
		userOption: ({ optionClass, optionPreText, optionTitle, func }, name) => `<li class="${optionClass}">
                <a href="#" onclick="${func}">
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
                this._getUserSkin(login, 'front'),
                this._getUserSkin(login, 'back')
            ]);
            this.userSkin = { front, back };
            this.getPlayTimeWidget(this.userData[login].serversOnline);
            await this.parseBadges(login);
        } catch (err) {
            console.error('Error in parseUserLook:', err);
        }
    }


    /** @private */
    _getUserSkin(login, side) {
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

	/**
	 * Загружает и рендерит бейджи пользователя, избегая дублирования.
	 *
	 * @param {Object} user – объект пользователя, должен содержать уникальный идентификатор user.id
	 * @returns {Promise<void>}
	 */
	async parseBadges(user) {
		try {
			const badgesContainer = document.getElementById('userBadges');
			if (!badgesContainer) {
				this.foxEngine.log('Контейнер бейджей не найден', "WARN");
				return;
			}

			// Если уже есть дети – собираем их ID, чтобы не рендерить повторно
			const existingIds = new Set(
				Array.from(badgesContainer.children)
					 .map(el => el.dataset.badgeId)
					 .filter(id => id)
			);

			// Получаем шаблон и массив бейджей
			const tpl = this.foxEngine.templateCache["badge"];
			if (!tpl) {
				console.error('Шаблон "badge" не найден в кеше');
				return;
			}
			const badges = await this.getBadgesArray(user);

			// Если нет новых бейджей и ничего не было ранее – удаляем контейнер
			if (badges.length === 0 && existingIds.size === 0) {
				badgesContainer.remove();
				return;
			}

			const fragment = document.createDocumentFragment();
			let addedCount = 0;

			for (const badge of badges) {
				// Пропускаем уже добавленные
				if (existingIds.has(String(badge.id))) {
					continue;
				}
				existingIds.add(String(badge.id));

				// Рендерим HTML из шаблона
				const html = await this.foxEngine.replaceTextInTemplate(tpl, {
					BadgeId:               badge.id,
					BadgeDesc:             badge.description,
					AcquiredDateFormatted: this.foxEngine.utils.getFormattedDate(badge.acquiredDate),
					BadgeName:             badge.badgeName,
					BadgeImg:              badge.badgeImg
				});

				// Оборачиваем во временный контейнер, чтобы получить элемент
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = html.trim();
				const badgeElement = tempDiv.firstElementChild;
				if (badgeElement) {
					// Сохраняем data-атрибут для будущей проверки дублирования
					badgeElement.dataset.badgeId = badge.id;
					fragment.appendChild(badgeElement);
					addedCount++;
				}
			}

			// Добавляем все новые элементы одной операцией
			if (addedCount > 0) {
				badgesContainer.appendChild(fragment);
				// Инициализируем тултипы один раз на всех новых элементах
				$(badgesContainer)
					.find('[data-toggle="tooltip"]')
					.tooltip({ placement: 'bottom', trigger: 'hover' });
			}

			// Если бейджей ни у пользователя, ни в контейнере нет — удаляем контейнер
			if (existingIds.size === 0) {
				badgesContainer.remove();
			}
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

    async showUserProfile(user, options = {}) {
		await this.getUserData(user);
        try {
            const config = {
                quantize: this.userData[user]?.quantize || options.quantize || 24,
                alphaThreshold: this.userData[user]?.alphaThreshold || options.alphaThreshold || 128,
                gradientAngle: this.userData[user]?.gradientAngle || options.gradientAngle || 45,
                formInitDelay: this.userData[user]?.formInitDelay || options.formInitDelay || 500,
                ...options
            };

            const profile = await this.getUserProfile(user);
            config.gradientAngle = this._extractAngle(this.userData[user].last_date);
			const userPic = new Image();
            userPic.crossOrigin = "anonymous";
            userPic.src = this.userData[user].profilePhoto;
			const dominantColor = await this._getDominantColor(userPic, 24, 128);

            let content = await this.foxEngine.entryReplacer.replaceText(profile);
            const doc = new DOMParser().parseFromString(content, "text/html");
            const profileDiv = doc.querySelector('#profileContents');
            profileDiv.style.background = `linear-gradient(${config.gradientAngle}deg, ${dominantColor}cc, ${this.userData[user].colorScheme})`;

            this.foxEngine.page.setPage('');
            this.foxEngine.page.loadData(doc.body.innerHTML, this.foxEngine.replaceData.contentBlock);
            location.hash = `user/${user}`;

				doc.onload = () => {
					this.getPlayTimeWidget(this.userData[user].serversOnline);
					this.foxEngine.foxesInputHandler.formInit(config.formInitDelay);
				};

        } catch (err) {
            console.error('Error in showUserProfile:', err);
        }
    }
	
	/** @private */
	_getDominantColor(userPic, quantize, alphaThreshold){
		return new Promise((resolve, reject) => {
                userPic.onload = () => {
                    const color = this._calculateDominantColor(userPic, quantize, alphaThreshold);
                    resolve(color);
                };
                userPic.onerror = err => reject(new Error("Ошибка загрузки изображения: " + err));
            });
	}
	
	/** @private */
	_extractAngle(num) {
		const last3 = num % 1000;
        if (last3 <= 360) return last3;
        const last2 = num % 100;
        if (last2 <= 360) return last2;
        return 360;
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
                this.foxEngine.log('Шаблон "lastUser" не найден в кеше', "ERROR");
                return;
            }

			const userPic = new Image();
            userPic.crossOrigin = "anonymous";
            userPic.src = last.profilePhoto;
			const dColor = await this._getDominantColor(userPic, 24, 128);
			const gradientAngle = this._extractAngle(last.last_date);
            const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                colorScheme:  	last.colorScheme,
				angle: 			gradientAngle,
				dominantColor:  dColor+"cc",
                profilePhoto: 	last.profilePhoto,
                login:        	last.login,
                realname:     	last.realname,
                regDate:      	this.foxEngine.utils.getFormattedDate(last.reg_date)
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
            const data = await this.apiRequest({ user_doaction: 'getUserData', login });
            this.userData[login] = data; // сохраняем по логину
			this.foxEngine.log(`Loading data for ${login}`);
        } catch (err) {
            console.error('Error in getUserData:', err);
            throw err;
        }
    }
}