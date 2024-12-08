export class User {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.userSkin = new Array();
        this.optNamesArr = [];
        this.optionAmount = 0;
        this.optionArray = [];
        this.optionTpl = '';
        this.userLogin = foxEngine.replaceData.login;
        this.userData = [];

        console.log(`Loading data for %c${this.userLogin}%c...`, "color: #ff0000;", "color: #000000;");
    }

    async parseUsrOptionsMenu() {
        try {
            if (this.optNamesArr.length <= this.optionAmount) {
                this.foxEngine.debugSend('Using FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
            }

            if (this.foxEngine.replaceData.isLogged) {
                await this.parseUserLook(this.userLogin);
            }

            const json = await this.foxEngine.sendPostAndGetAnswer({ getUserOptionsMenu: this.userLogin }, "JSON");
            this.optionAmount = json.optionAmount;
            this.optionArray = json.optionArray;

            if (this.optNamesArr.length <= this.optionAmount) {
                this.foxEngine.debugSend(`UserOptions available: ${this.optionAmount}`, "");
            }

            for (const obj of this.optionArray) {
                for (const optionName in obj) {
                    if (obj.hasOwnProperty(optionName)) {
                        this.processOption(optionName, obj[optionName]);
                    }
                }
            }
        } catch (error) {
            console.error('Error parsing user options menu:', error);
        }
    }

    processOption(optionName, option) {
        let appendBlock = option.optionBlock;
        this.optionTpl = this.generateOptionTemplate(option, optionName);

        if (appendBlock) {
            $(appendBlock).append(this.optionTpl);
        }

        this.optNamesArr.push(optionName);
    }

    generateOptionTemplate(option, optionName) {
        switch (option.type) {
            case "page":
                return `
                    <li class="${option.optionClass}">
                        <a class="pageLink-${optionName}" onclick="foxEngine.page.loadPage('${optionName}', replaceData.contentBlock); return false;">
                            <div class="rightIcon">${option.optionPreText}</div>
                            ${option.optionTitle}
                        </a>
                    </li>`;
            case "plainText":
                return option.optionTitle;
            default:
                return '';
        }
    }

    async parseUserLook(login) {
        try {
            this.userSkin.front = await this.getUserSkin(login, 'front');
            this.userSkin.back = await this.getUserSkin(login, 'back');
			this.getPlayTimeWidget(this.userData['serversOnline']);
			this.parseBadges(login);
        } catch (error) {
            console.error('Error parsing user look:', error);
        }
    }

    async getUserSkin(userLogin, side) {
        try {
            console.log("Loading userSkin "+side+"...");
            await this.getUserData(userLogin);
            return this.foxEngine.sendPostAndGetAnswer({ sysRequest: "skinPreview", login: userLogin, side: side }, "TEXT");
        } catch (error) {
            console.error('Error getting user skin:', error);
        }
    }

    async userAction(action) {
        try {
            const answer = await this.foxEngine.sendPostAndGetAnswer({ user_doaction: action }, "JSON");
            $("#actionBlock").html(`${answer.text} ${this.foxEngine.replaceData.realname}!`);
            this.foxEngine.utils.textAnimate("#actionBlock");
        } catch (error) {
            console.error('Error performing user action:', error);
        }
    }

    async parseBadges(user) {
        try {
            const badgeWindow = $("#userBadges");
            if (badgeWindow.children().length > 0) {
                console.log("Badges already loaded for this user.");
                return;
            }

            const badgeTemplate = await this.foxEngine.loadTemplate(`${this.foxEngine.elementsDir}badge.tpl`, true);
            const parsedJson = await this.getBadgesArray(user);

            for (const obj of parsedJson) {
                const badgeHtml = await this.foxEngine.replaceTextInTemplate(badgeTemplate, {
                    BadgeDesc: obj.description,
                    AcquiredDateFormatted: this.foxEngine.utils.getFormattedDate(obj.acquiredDate),
                    BadgeName: obj.badgeName,
                    BadgeImg: obj.badgeImg
                });

                badgeWindow.append(badgeHtml);
                $('[data-toggle="tooltip"]').tooltip({ placement: 'bottom', trigger: "hover" });
            }

            if (parsedJson.length === 0) {
                badgeWindow.remove();
            }
        } catch (error) {
            console.error('Error parsing badges:', error);
        }
    }

    async refreshBalance(currencies) {
        try {
            const response = await this.foxEngine.sendPostAndGetAnswer({ user_doaction: "getUnits" }, "JSON");
            const allData = response.reduce((acc, item) => {
                const key = Object.keys(item)[0];
                acc[key] = item[key];
                return acc;
            }, {});

            for (const currency of currencies) {
                if (allData.hasOwnProperty(currency)) {
                    const oldBalance = Math.round(parseFloat($(`#${currency}`).text()));
                    const newBalance = Math.round(parseFloat(allData[currency]));
                    await this.animateValueChange(oldBalance, newBalance, `#${currency}`);
                } else {
                    console.error(`No '${currency}' data found in response.`);
                }
            }
        } catch (error) {
            console.error('Error refreshing balance:', error);
        }
    }

    async animateValueChange(oldValue, newValue, elementSelector) {
        if (oldValue !== newValue) {
            $({ n: oldValue }).animate({ n: newValue }, {
                duration: 2500,
                step: function (now) {
                    $(elementSelector).text(Math.round(now));
                }
            });
        }
    }

    async getBadgesArray(user) {
        try {
            return await this.foxEngine.sendPostAndGetAnswer({ user_doaction: 'GetBadges', userDisplay: user }, "JSON");
        } catch (error) {
            console.error('Error getting badges array:', error);
        }
    }

async getPlayTimeWidget(serversOnline) {
    try {
        const serversData = JSON.parse(serversOnline);

        if (!serversData || !Array.isArray(serversData.servers) || serversData.servers.length === 0) {
            console.warn('No server data available.');
            $('.playtime-widget-container').html(`
			<div class="playtime-widget">
	<button type="button" class="widget-header" data-bs-toggle="collapse" data-bs-target=".playtime-widget-collapse" disabled="">
					<span class="text-muted">Нет данных о серверах</span>
			</button>

	
	<div class="playtime-widget-collapse collapse show">
		<div class="widget-progress">
					</div>
	</div>
</div>
`);
			return;
        }

        const playtimeWidgetHtml = PlaytimeWidgetGenerator.generatePlaytimeWidget(serversData.servers);

        $('.playtime-widget-container').html(playtimeWidgetHtml);
    } catch (error) {
        console.error('Error getting playtime widget:', error);
        $('.playtime-widget-container').html('<p>Error loading playtime widget</p>');
    }
}


    async showUserProfile(userDisplay) {
        try {
            const userProfile = await this.getUserProfile(userDisplay);
            await this.getUserData(userDisplay);
            this.foxEngine.page.setPage("");
            this.foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(userProfile), this.foxEngine.replaceData.contentBlock);
            location.hash = `user/${userDisplay}`;
            
            this.foxEngine.foxesInputHandler.formInit(1000);
            setTimeout(() => {
                //this.getPlayTimeWidget(this.userData['serversOnline']);
                this.parseBadges(userDisplay);
            }, 600);
        } catch (error) {
            console.error('Error showing user profile:', error);
        }
    }

    async showProfilePopup(user, dialogOptions) {
        try {
            const userProfile = await this.getUserProfile(user);
            $("#dialog").dialog("option", "title", user);
            this.foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(userProfile), '#dialogContent');
            $("#dialog").dialog(dialogOptions);
            $("#dialog").dialog('open');
        } catch (error) {
            console.error('Error showing profile popup:', error);
        }
    }

    async getLastUser() {
        try {
            const lastUser = await this.foxEngine.sendPostAndGetAnswer({ userAction: "lastUser" }, "JSON");
            const userView = await this.foxEngine.replaceTextInTemplate(await this.foxEngine.loadTemplate(`${this.foxEngine.elementsDir}lastUser.tpl`, true), {
                colorScheme: lastUser.colorScheme,
                profilePhoto: lastUser.profilePhoto,
                login: lastUser.login,
                realname: lastUser.realname,
                regDate: this.foxEngine.utils.getFormattedDate(lastUser.reg_date)
            });

            $("#lastUser").html(userView);
        } catch (error) {
            console.error('Error getting last user:', error);
        }
    }

    async getUserProfile(user) {
        try {
            this.foxEngine.page.langPack = await this.foxEngine.page.loadLangPack('userProfile');
            const userProfile = await this.foxEngine.sendPostAndGetAnswer({ userDisplay: user, user_doaction: "ViewProfile" }, "TEXT");

            if (!this.foxEngine.utils.isJson(userProfile)) {
                return userProfile;
            } else {
                this.foxEngine.utils.showErrorPage(userProfile, this.foxEngine.replaceData.contentBlock);
            }
        } catch (error) {
            console.error('Error getting user profile:', error);
        }
    }

    async logout(button) {
        try {
            const request = await this.foxEngine.sendPostAndGetAnswer({ userAction: "logout" }, "JSON");
            button.notify(request.message, request.type);
            this.foxEngine.soundOnClick(request.type);
            setTimeout(() => {
                this.foxEngine.foxesInputHandler.refreshPage();
            }, 1500);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    async getUserData(login) {
        try {
            const userData = await this.foxEngine.sendPostAndGetAnswer({ user_doaction: "getUserData", login: login }, "JSON");
            this.userData = userData;
        } catch (error) {
            console.error('Error getting user data:', error);
            throw error;
        }
    }
}


class PlaytimeWidgetGenerator {
    static generatePlaytimeWidget(servers) {
        if (servers.length === 0) {
            return `
            <div class="py-2">
                <div class="playtime-widget">
                    <button type="button" class="widget-header" data-bs-toggle="collapse" data-bs-target=".playtime-widget-collapse" disabled="">
                        <span class="text-muted">Никогда не заходил в игру</span>
                    </button>
                    <div class="playtime-widget-collapse collapse show">
                        <div class="widget-progress"></div>
                    </div>
                </div>
            </div>`;
        }

        const totalPlayTime = servers.reduce((total, server) => total + server.time, 0);
        const totalPlayTimeStr = this.formatTime(totalPlayTime);

        let htmlBuilder = `
        <div class="playtime-widget">
            <button type="button" class="widget-header" data-bs-toggle="collapse" data-bs-target=".playtime-widget-collapse" aria-expanded="true">
                Наиграно: <b>${totalPlayTimeStr}</b>
            </button>
            <div class="playtime-widget-collapse collapse" style="">
                <div class="widget-content">
                    <table class="playtime-server-stats">
                        <thead>
                            <tr><th style="width: 110px;"></th>
                            <th></th>
                            <th style="width: 90px;"></th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        servers.forEach(server => {
            const percentage = (server.time / totalPlayTime * 100).toFixed(2);
            const color = PlaytimeWidgetGenerator.getColorForServer(server.server);
            const serverTimeStr = this.formatTime(server.time);

            htmlBuilder += `
            <tr>
                <td>
                    <span class="${percentage < 5 ? 'text-muted' : ''}" title="">
                        ${server.server}
                    </span>
                </td>
                <td class="px-2">
                    <div class="progress">
                        <div class="progress-bar" style="width:${percentage}%; --bar-color:${color};"></div>
                    </div>
                </td>
                <td><b>${serverTimeStr}</b></td>
            </tr>`;
        });
        
        htmlBuilder += `
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="playtime-widget-collapse collapse show" style="">
                <div class="widget-progress">`;
        
        servers.forEach(server => {
            const percentage = (server.time / totalPlayTime * 100).toFixed(2);
            const color = PlaytimeWidgetGenerator.getColorForServer(server.server);
            
            htmlBuilder += `
                <div class="bar-fill" style="width:${percentage}%; --server-color:${color};"></div>`;
        });
        
        htmlBuilder += `
                </div>
            </div>
        </div>`;
        
        return htmlBuilder;
    }

    static getColorForServer(serverName) {
        switch (serverName) {
            case "Craftoria":
                return "#3498DB";
            case "Amber":
                return "#c17d22";
			case "FurSpace":
				return "#37bbd0";
            default:
                return "#AAAAAA";
        }
    }

    static formatTime(hours) {
        const totalSeconds = Math.round(hours * 3600);
        const hoursPart = Math.floor(totalSeconds / 3600);
        const minutesPart = Math.floor((totalSeconds % 3600) / 60);
        const secondsPart = totalSeconds % 60;

        const hoursStr = hoursPart > 0 ? `${hoursPart} ${this.declineWord(hoursPart, 'час', 'часа', 'часов')}` : '';
        const minutesStr = minutesPart > 0 ? `${minutesPart} ${this.declineWord(minutesPart, 'минута', 'минуты', 'минут')}` : '';
        const secondsStr = secondsPart > 0 ? `${secondsPart} ${this.declineWord(secondsPart, 'секунда', 'секунды', 'секунд')}` : '';

        return [hoursStr, minutesStr, secondsStr].filter(Boolean).join(' ');
    }

    static declineWord(number, one, two, five) {
        const n = Math.abs(number) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return five;
        if (n1 > 1 && n1 < 5) return two;
        if (n1 == 1) return one;
        return five;
    }
}
