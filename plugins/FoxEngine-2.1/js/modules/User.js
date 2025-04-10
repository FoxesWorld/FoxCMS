export class User {
    constructor(foxEngine) {
        this.foxEngine     = foxEngine;
        this.userSkin      = { front: '', back: '' };
        this.optNamesArr   = [];
        this.optionArray   = [];
        this.optionAmount  = 0;
        this.userLogin     = foxEngine.replaceData.login;
        this.userData      = {};

        console.log(
            `Loading data for %c${this.userLogin}%c...`,
            'color: #ff0000;',
            'color: #000000;'
        );
    }

    // Универсальный запрос к серверу
    async apiRequest(payload, type = 'JSON') {
        try {
            return await this.foxEngine.sendPostAndGetAnswer(payload, type);
        } catch (err) {
            console.error('User.apiRequest error:', err);
            throw err;
        }
    }

    // Логирование отладки
    logDebug(msg, style = '') {
        this.foxEngine.debugSend(msg, style);
    }

    // Загрузка и рендер меню опций
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

            this.optionArray.forEach(obj =>
                Object.entries(obj).forEach(([name, opt]) =>
                    this.processOption(name, opt)
                )
            );
        } catch (err) {
            console.error('Error in parseUsrOptionsMenu:', err);
        }
    }

    // Обработка одной опции
    processOption(name, opt) {
        const html = this.generateOptionTemplate(name, opt);
        if (opt.optionBlock) {
            $(opt.optionBlock).append(html);
        }
        this.optNamesArr.push(name);
    }

    // Шаблоны опций по типу
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

    // Загрузка образа пользователя
    async parseUserLook(login) {
        try {
            await this.getUserData(login);
            const [front, back] = await Promise.all([
                this.getUserSkin(login, 'front'),
                this.getUserSkin(login, 'back')
            ]);
            this.userSkin = { front, back };
            this.getPlayTimeWidget(this.userData.serversOnline);
            this.parseBadges(login);
        } catch (err) {
            console.error('Error in parseUserLook:', err);
        }
    }

    getUserSkin(login, side) {
        return this.apiRequest({ sysRequest: 'skinPreview', login, side }, 'TEXT');
    }

    // Действие пользователя + анимация
    async userAction(action) {
        try {
            const ans = await this.apiRequest({ user_doaction: action });
            $('#actionBlock')
                .html(`${ans.text} ${this.foxEngine.replaceData.realname}!`);
            this.foxEngine.utils.textAnimate('#actionBlock');
        } catch (err) {
            console.error('Error in userAction:', err);
        }
    }

    // Парсинг бейджей
    async parseBadges(user) {
        try {
            const $win = $('#userBadges');
            if ($win.children().length) return console.log('Badges already loaded.');

            const tpl = await this.foxEngine.loadTemplate(
                `${this.foxEngine.elementsDir}badge.tpl`,
                true
            );
            const badges = await this.getBadgesArray(user);

            badges.forEach(async obj => {
                const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                    BadgeDesc:             obj.description,
                    AcquiredDateFormatted: this.foxEngine.utils.getFormattedDate(obj.acquiredDate),
                    BadgeName:             obj.badgeName,
                    BadgeImg:              obj.badgeImg
                });
                $win.append(html);
                $('[data-toggle="tooltip"]').tooltip({ placement: 'bottom', trigger: 'hover' });
            });

            if (!badges.length) $win.remove();
        } catch (err) {
            console.error('Error in parseBadges:', err);
        }
    }

    // Обновление баланса с анимацией
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
                    const oldV = Math.round(parseFloat($(`#${cur}`).text()));
                    const newV = Math.round(parseFloat(all[cur]));
                    await this.animateValueChange(oldV, newV, `#${cur}`);
                } else {
                    console.error(`No data for currency '${cur}'`);
                }
            }));
        } catch (err) {
            console.error('Error in refreshBalance:', err);
        }
    }

    animateValueChange(oldV, newV, sel) {
        if (oldV === newV) return Promise.resolve();
        return new Promise(resolve => {
            $({ n: oldV }).animate({ n: newV }, {
                duration: 2500,
                step(now) { $(sel).text(Math.round(now)); },
                complete: resolve
            });
        });
    }

    getBadgesArray(user) {
        return this.apiRequest(
            { user_doaction: 'GetBadges', userDisplay: user }
        );
    }

    // Рендер виджета времени игры
    async getPlayTimeWidget(raw) {
        try {
            const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
            const html = PlaytimeWidgetGenerator.generate(data);
            $('.playtime-widget-container').html(html);
        } catch (err) {
            console.error('Error in getPlayTimeWidget:', err);
            $('.playtime-widget-container').html('<p>Error loading playtime widget</p>');
        }
    }

    // Профиль на всю страницу
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

    // Профиль во всплывающем диалоге
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

    // Информация о последнем пользователе
    async getLastUser() {
        try {
            const last = await this.apiRequest({ userAction: 'lastUser' });
            const tpl  = await this.foxEngine.loadTemplate(
                `${this.foxEngine.elementsDir}lastUser.tpl`, true
            );
            const html = await this.foxEngine.replaceTextInTemplate(tpl, {
                colorScheme: last.colorScheme,
                profilePhoto: last.profilePhoto,
                login: last.login,
                realname: last.realname,
                regDate: this.foxEngine.utils.getFormattedDate(last.reg_date)
            });
            $('#lastUser').html(html);
        } catch (err) {
            console.error('Error in getLastUser:', err);
        }
    }

    // Получение HTML профиля или показ ошибки
    async getUserProfile(user) {
        try {
            this.foxEngine.page.langPack = await this.foxEngine.page.loadLangPack('userProfile');
            const resp = await this.apiRequest(
                { userDisplay: user, user_doaction: 'ViewProfile' }, 'TEXT'
            );
            return this.foxEngine.utils.isJson(resp)
                ? this.foxEngine.utils.showErrorPage(resp, this.foxEngine.replaceData.contentBlock)
                : resp;
        } catch (err) {
            console.error('Error in getUserProfile:', err);
        }
    }

    // Выход из учётки
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

    // Загрузка данных пользователя
    async getUserData(login) {
        try {
            this.userData = await this.apiRequest({ user_doaction: 'getUserData', login });
        } catch (err) {
            console.error('Error in getUserData:', err);
            throw err;
        }
    }
}


// Вспомогательный генератор виджета
class PlaytimeWidgetGenerator {
    // Цвета серверов
    static colorMap = {
        Craftoria: '#3498DB',
        Amber:     '#c17d22',
        Celeste:   '#37bbd0',
        TEST:      '#d79c1c'
    };

    static generate(data) {
        const serversObj = data?.servers ?? data;
        if (!serversObj || !Object.keys(serversObj).length) {
            return this.emptyWidget();
        }
        const servers = Object.entries(serversObj).map(([name, d]) => ({
            name,
            total: (d.totalTime || 0) / 60
        }));
        const totalAll = servers.reduce((sum, s) => sum + s.total, 0);
        const totalStr = this.formatTime(totalAll);

        const bars = servers.map(s => this.createSegment(s, totalAll)).join('');
        const rows = servers.map(s => this.createRow(s, totalAll)).join('');

        return `
      <div class="playtime-widget card">
        <div class="card-header">
          <button class="widget-header" data-bs-toggle="collapse" data-bs-target="#details">
            Наиграно: <b>${totalStr}</b>
          </button>
          <div id="overallBar" class="mt-2">
            <div class="progress" style="height:10px;">${bars}</div>
          </div>
        </div>
        <div id="details" class="collapse">
          <div class="card-body p-0">
            <table class="table table-sm mb-0">
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
      <script>
        const det = document.getElementById('details'),
              ov  = document.getElementById('overallBar');
        det.addEventListener('show.bs.collapse', ()=> ov.style.display='none');
        det.addEventListener('hide.bs.collapse', ()=> ov.style.display='block');
      </script>`;
    }

    static emptyWidget() {
        return `
      <div class="playtime-widget card">
        <div class="card-header">
          <button class="widget-header" disabled>
            <span class="text-muted">Нет данных о серверах</span>
          </button>
        </div>
      </div>`;
    }

    static createSegment({ name, total }, totalAll) {
        const pct = totalAll ? ((total / totalAll) * 100).toFixed(2) : 0;
        return `<div class="progress-bar" role="progressbar"
               style="width:${pct}%;background-color:${this.colorMap[name]||'#AAA'}"
               aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            </div>`;
    }

    static createRow({ name, total }, totalAll) {
        const pct = totalAll ? ((total / totalAll) * 100).toFixed(2) : 0;
        const time = this.formatTime(total);
        const cls  = pct < 5 ? 'text-muted' : '';
        return `
      <tr>
        <td><span class="${cls}">${name}</span></td>
        <td class="px-2">
          <div class="progress" style="height:10px;">
            ${this.createSegment({ name, total }, totalAll)}
          </div>
        </td>
        <td><b>${time}</b></td>
      </tr>`;
    }

    static formatTime(sec) {
        const s = Math.round(sec),
            h = Math.floor(s/60),
            m = s % 60;
        const parts = [];
        if (h) parts.push(`${h} ${this.decline(h,'час','часа','часов')}`);
        if (m) parts.push(`${m} ${this.decline(m,'минута','минуты','минут')}`);
        return parts.join(' ') || `0 ${this.decline(0,'секунда','секунды','секунд')}`;
    }

    static decline(n, one, two, five) {
        const t = Math.abs(n)%100, u = t%10;
        if (t>10 && t<20) return five;
        if (u>1 && u<5)    return two;
        if (u===1)         return one;
        return five;
    }
}
