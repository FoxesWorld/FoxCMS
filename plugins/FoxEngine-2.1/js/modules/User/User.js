import { ApiService } from './ApiService.js';
import { BadgeManager } from './BadgeManager.js';
import { SkinManager } from './SkinManager.js';
import { PlaytimeWidgetGenerator } from './PlaytimeWidgetGenerator.js';
import { OptionsManager } from './OptionsManager.js';
import { UIRenderer } from './UIRenderer.js';

export class User {
    /**
     * @param {Object} foxEngine – основной движок приложения.
     */
    constructor(foxEngine) {
        /** @private */ this.foxEngine = foxEngine;
        /** @private */ this.api = new ApiService(foxEngine);
        /** @private */ this.badgeManager = new BadgeManager(foxEngine, this.api);
        /** @private */ this.skinManager = new SkinManager(foxEngine, this.api);
        /** @private */ this.playtimeWidgetManager = new PlaytimeWidgetGenerator(foxEngine);
        /** @private */ this.optionsManager = new OptionsManager(foxEngine, this.api);
        /** @private */ this.uiRenderer = new UIRenderer(foxEngine);

        /** @type {string} */ this.userLogin = foxEngine.replaceData.login;
        /** @type {Object<string, any>} */ this.userData = {};
        /** @type {{front: string, back: string}} */ this.userSkin = { front: '', back: '' };

        /** @private {boolean} */ this._ready = false;
        /** @private {Error|null} */ this._loadingError = null;
    }

    /**
     * Последовательная инициализация всех зависимостей и загрузка пользовательских опций.
     * После вызова можно проверять флаг `isReady()` или ловить ошибку через `getLoadingError()`.
     * @returns {Promise<void>}
     */
    async init() {
        try {
            await this.initUserOptions();
            this._ready = true;
        } catch (err) {
            console.error('User.init failed:', err);
            this._loadingError = err;
            throw err;
        }
    }

    /**
     * Проверяет, успешно ли завершилась инициализация.
     * @returns {boolean}
     */
    isReady() {
        return this._ready === true && this._loadingError === null;
    }

    /**
     * Возвращает ошибку, возникшую при инициализации, если она была.
     * @returns {Error|null}
     */
    getLoadingError() {
        return this._loadingError;
    }

    /**
     * Загружает и применяет опции пользователя.
     * @private
     * @returns {Promise<void>}
     */
    async initUserOptions() {
        try {
            await this.optionsManager.loadOptions(this.userLogin);
            this.foxEngine.log(`User options loaded for ${this.userLogin}`);
        } catch (err) {
            console.error('Error in initUserOptions:', err);
            throw err;
        }
    }

    /**
     * Получает и кеширует базовые данные пользователя.
     * @param {string} login – логин пользователя.
     * @returns {Promise<any>}
     */
    async getUserData(login) {
        if (this.userData[login]) {
            return this.userData[login];
        }
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

    /**
     * Запрашивает HTML-профиль пользователя и обрабатывает JSON-ошибки.
     * @param {string} user – логин пользователя.
     * @returns {Promise<string|void>}
     */
    async getUserProfile(user) {
        try {
            this.foxEngine.page.langPack = await this.foxEngine.page.loadLangPack('userProfile');
            const resp = await this.api.request(
                { userDisplay: user, user_doaction: 'ViewProfile' },
                'TEXT'
            );
            // либо возвращаем HTML, либо показываем страницу ошибки
            return this.foxEngine.utils.isJson(resp)
                ? this.foxEngine.utils.showErrorPage(resp, this.foxEngine.replaceData.contentBlock)
                : resp;
        } catch (err) {
            console.error('Error in getUserProfile:', err);
        }
    }

/**
 * Полный цикл отображения профиля:
 * 1) Загрузка данных
 * 2) Получение HTML профиля
 * 3) Вычисление градиента и доминантного цвета
 * 4) Отрисовка профиля на странице
 * 5) Парсинг и отображение внешности (скинов, бейджей, игрового онлайна)
 *
 * @param {string} user – Логин пользователя
 * @param {Object} [options] – Дополнительные опции рендеринга
 */
async showUserProfile(user, options = {}) {
    let rendered = false;

    try {
        // 1. Загрузка данных и HTML профиля параллельно
        const [userData, profileHtml] = await Promise.all([
            this.getUserData(user),
            this.getUserProfile(user)
        ]);

        // 2. Сбор конфигурации рендеринга
        const config = {
            quantize: userData?.quantize ?? options.quantize ?? 24,
            alphaThreshold: userData?.alphaThreshold ?? options.alphaThreshold ?? 128,
            gradientAngle: userData?.gradientAngle ?? options.gradientAngle ?? 45,
            formInitDelay: userData?.formInitDelay ?? options.formInitDelay ?? 500,
            ...options
        };

        // 3. Подготовка фонового изображения
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = userData.profilePhoto;

        // Параллельно извлечь угол градиента и доминантный цвет
        const [gradientAngle, dominantColor] = await Promise.all([
            this.uiRenderer.extractAngle(userData.last_date),
            this.uiRenderer.getDominantColor(img, config.quantize, config.alphaThreshold)
        ]);

        // 4. Вставка HTML-контента в DOM
        const sanitizedHtml = await this.foxEngine.entryReplacer.replaceText(profileHtml);
        const doc = new DOMParser().parseFromString(sanitizedHtml, 'text/html');

        // 4.1 Обработка статуса пользователя
        const statusBox = doc.querySelector('#statusBox');
        if (!userData.userStatus && statusBox) {
            statusBox.remove();
        }

        // 4.2 Установка фона профиля
        const profileDiv = doc.querySelector('#profileContents');
        if (profileDiv) {
            const background = `linear-gradient(${gradientAngle}deg, ${dominantColor}cc, ${userData.colorScheme})`;
            profileDiv.style.background = background;
        }

        // 5. Атомарная отрисовка страницы
        this.foxEngine.page.setPage('');
        this.foxEngine.page.loadData(doc.body.innerHTML, this.foxEngine.replaceData.contentBlock);

        // 6. Обновление URL
        location.hash = `user/${user}`;

        rendered = true;
    } catch (err) {
        console.error('Error in showUserProfile:', err);
    } finally {
        if (rendered) {
            try {
                // Задержка для полной загрузки структуры, если необходимо
                await this.parseUserLook(user);
            } catch (err) {
                console.error('Error in parseUserLook (finally):', err);
            }
        }
    }
}

/**
 * Обработка внешности пользователя:
 * - Загрузка скинов (лицевая и тыльная стороны)
 * - Загрузка бейджей
 * - Отображение игрового онлайна
 * Метод включает встроенную обработку ошибок, чтобы не прерывать выполнение программы при частичных сбоях.
 *
 * @param {string} login – Логин пользователя
 */
async parseUserLook(login) {
    console.debug(`parseUserLook: запуск для пользователя '${login}'`);

    try {
        // Обновить актуальные данные пользователя
        await this.getUserData(login);

        // Параллельная загрузка скинов
        const [front, back] = await Promise.all([
            this.skinManager.getSkin(login, 'front'),
            this.skinManager.getSkin(login, 'back')
        ]);
        this.userSkin = { front, back };

        // Сброс и загрузка бейджей
        this.badgeManager.reset();
        await this.badgeManager.loadBadges(login);

        // Создание виджета времени игры и онлайна
        const serversOnline = this.userData[login]?.serversOnline ?? [];
        await this.createPlayTimeWidget(serversOnline);

        console.debug(`parseUserLook: успешно завершено для '${login}'`);
    } catch (error) {
        console.warn(`parseUserLook: некритическая ошибка для '${login}':`, error);
    }
}

    /**
     * Генерирует HTML-виджет времени игры и вставляет в контейнер.
     * @param {string|any[]} raw – JSON-строка или массив с данными.
     */
    async createPlayTimeWidget(raw) {
        try {
            const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
            const html = await this.playtimeWidgetManager.generate(data);
            const container = document.querySelector('.playtime-widget-container');
            if (container) container.innerHTML = html;
        } catch (err) {
            console.error('Error in createPlayTimeWidget:', err);
            const container = document.querySelector('.playtime-widget-container');
            if (container) container.innerHTML = '<p>Error loading playtime widget</p>';
        }
    }

    /**
     * Разлогинивание пользователя: запрос к API, уведомление, звуковой эффект, перезагрузка страницы.
     * @param {Object} button – объект кнопки с методом notify().
     */
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

    /**
     * Получает и отображает последнего активного пользователя в шапке.
     */
    async getLastUser() {
        try {
            const last = await this.api.request({ userAction: 'lastUser' });
            const tpl = this.foxEngine.templateCache['lastUser'];
            if (!tpl) {
                this.foxEngine.log('Шаблон "lastUser" не найден в кеше', 'ERROR');
                return;
            }

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = last.profilePhoto;

            const dColor = await this.uiRenderer.getDominantColor(img, 24, 128);
            const gradientAngle = this.uiRenderer.extractAngle(last.last_date);

            const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                colorScheme: last.colorScheme,
                angle: gradientAngle,
                dominantColor: dColor + 'cc',
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

    /**
     * Показывает профиль в модальном окне.
     * @param {string} user – логин пользователя.
     */
    async showProfilePopup(user) {
        try {
            const profileHtml = await this.getUserProfile(user);
            const content = await this.foxEngine.entryReplacer.replaceText(profileHtml);
            this.foxEngine.modalApp.showModalApp('min-content', user, content, () => {});
        } catch (err) {
            console.error('Error in showProfilePopup:', err);
        }
    }

    /**
     * Выполняет произвольное действие пользователя и анимирует текст ответа.
     * @param {string} action – код действия.
     */
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

    /**
     * Обновляет балансы указанных валют с анимацией изменения чисел.
     * @param {string[]} currencies – массив идентификаторов валют (элементы DOM с такими id).
     */
    async refreshBalance(currencies) {
        try {
            const dataArr = await this.api.request({ user_doaction: 'getUnits' });
            const all = dataArr.reduce((acc, item) => {
                const [key, val] = Object.entries(item)[0];
                acc[key] = val;
                return acc;
            }, {});

            await Promise.all(
                currencies.map(async (cur) => {
                    if (cur in all) {
                        const el = document.querySelector(`#${cur}`);
                        if (!el) throw new Error(`Element #${cur} not found`);
                        const oldValue = Math.round(parseFloat(el.textContent));
                        const newValue = Math.round(parseFloat(all[cur]));
                        await this.uiRenderer.animateValueChange(oldValue, newValue, `#${cur}`);
                    } else {
                        console.error(`No data for currency '${cur}'`);
                    }
                })
            );
        } catch (err) {
            console.error('Error in refreshBalance:', err);
        }
    }
}
