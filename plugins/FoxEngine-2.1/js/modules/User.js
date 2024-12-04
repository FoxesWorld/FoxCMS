export class User {

    constructor(foxEngine) {
        this.foxEngine = foxEngine;
		this.userSkin = new Array();
        this.optNamesArr = [];
        this.optionAmount = 0;
        this.optionArray = [];
        this.optionTpl = '';

        this.userLogin = foxEngine.replaceData.login;
        const debugMessage = `Loading data for %c${this.userLogin}%c...`;
        const loginStyle = "color: #ff0000;";
        const textStyles = "color: #000000;";
        console.log(debugMessage, loginStyle, textStyles);
    }

    async parseUsrOptionsMenu() {
        if (this.optNamesArr.length <= this.optionAmount) {
            this.foxEngine.debugSend('Using FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
        }

        if (this.foxEngine.replaceData.isLogged) {
			this.parseUserLook(this.userLogin);
            //this.foxEngine.debugSend(`User ${this.foxEngine.replaceData.login} is logged`, '');
        }

        try {
            const json = await this.foxEngine.sendPostAndGetAnswer({
                getUserOptionsMenu: this.foxEngine.replaceData.login
            }, "JSON");

            this.optionAmount = json.optionAmount;
            this.optionArray = json.optionArray;

            if (this.optNamesArr.length <= this.optionAmount) {
                this.foxEngine.debugSend(`UserOptions available: ${this.optionAmount}`, "");
            }

            for (const obj of this.optionArray) {
                for (const optionName in obj) {
                    const option = obj[optionName];
                    let appendBlock = option.optionBlock;

                    switch (option.type) {
                        case "page":
                            this.optionTpl = `
                                <li class="${option.optionClass}">
                                    <a class="pageLink-${optionName}" onclick="foxEngine.page.loadPage('${optionName}', replaceData.contentBlock); return false;">
                                        <div class="rightIcon">
                                            ${option.optionPreText}
                                        </div>
                                        ${option.optionTitle}
                                    </a>
                                </li>`;
                            break;
                        case "pageContent":
                            // Add your case logic here
                            break;
                        case "plainText":
                            this.optionTpl = option.optionTitle;
                            break;
                    }

                    if (appendBlock) {
                        $(appendBlock).append(this.optionTpl);
                    }

                    this.optNamesArr.push(optionName);
                }
            }
        } catch (error) {
            console.error('Error parsing user options menu:', error);
        }
    }
	
	async parseUserLook(login){
		this.userSkin['front'] = await this.getUserSkin(login, 'front');
		this.userSkin['back'] = await this.getUserSkin(login, 'back');
		
		return this.userSkin;
	}

	async getUserSkin(userLogin, side) {
		console.log("Loading userSkin...");
		return foxEngine.sendPostAndGetAnswer({sysRequest:"skinPreview", login: userLogin, side: side}, "TEXT");
	}

    async userAction(action) {
        try {
            const answer = await this.foxEngine.sendPostAndGetAnswer({
                user_doaction: action
            }, "JSON");
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

        if (parsedJson.length > 0) {
            for (const obj of parsedJson) {
                const badgeHtml = await this.foxEngine.replaceTextInTemplate(badgeTemplate, {
                    BadgeDesc: obj.description,
                    AcquiredDateFormatted: this.foxEngine.utils.getFormattedDate(obj.acquiredDate),
                    BadgeName: obj.badgeName,
                    BadgeImg: obj.badgeImg
                });

                badgeWindow.append(badgeHtml);
                $('[data-toggle="tooltip"]').tooltip({
                    placement: 'bottom',
                    trigger: "hover"
                });
            }
        } else {
            badgeWindow.remove();
        }
    } catch (error) {
        console.error('Error parsing badges:', error);
    }
}

    async refreshBalance(currencies) {
        try {
            const response = await this.foxEngine.sendPostAndGetAnswer({
                user_doaction: "getUnits"
            }, "JSON");

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
        } else {}
    }

    async getBadgesArray(user) {
        try {
            const badgesArray = await this.foxEngine.sendPostAndGetAnswer({
                user_doaction: 'GetBadges',
                userDisplay: user
            }, "JSON");

            return badgesArray;
        } catch (error) {
            console.error('Error getting badges array:', error);
        }
    }

async showUserProfile(userDisplay) {
    try {
        const userProfile = await this.getUserProfile(userDisplay);
        const playtimeWidgetHtml = PlaytimeWidgetGenerator.generatePlaytimeWidget(this.foxEngine.replaceData.serversOnline);
        
        this.foxEngine.page.setPage("");
        this.foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(userProfile), this.foxEngine.replaceData.contentBlock);
        location.hash = `user/${userDisplay}`;
        this.foxEngine.foxesInputHandler.formInit(1000);
        setTimeout(() => {
			$('.playtime-widget-container').html(playtimeWidgetHtml);
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
            setTimeout(() => {
                this.parseBadges(user);
            }, 600);
        } catch (error) {
            console.error('Error showing profile popup:', error);
        }
    }

    async getLastUser() {
        try {
            const lastUser = await this.foxEngine.sendPostAndGetAnswer({
                userAction: "lastUser"
            }, "JSON");

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
            const userProfile = await this.foxEngine.sendPostAndGetAnswer({
                userDisplay: user,
                user_doaction: "ViewProfile"
            }, "TEXT");

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
            const request = await this.foxEngine.sendPostAndGetAnswer({
                userAction: "logout"
            }, "JSON");

            button.notify(request.message, request.type);
            this.foxEngine.soundOnClick(request.type);
            setTimeout(() => {
                this.foxEngine.foxesInputHandler.refreshPage();
            }, 1500);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
	
}

class PlaytimeWidgetGenerator {
    static generatePlaytimeWidget(servers) {
        const totalPlayTime = servers.reduce((total, server) => total + server.time, 0);
        
        let htmlBuilder = `
        <div class="playtime-widget">
            <button type="button" class="widget-header" data-bs-toggle="collapse" data-bs-target=".playtime-widget-collapse" aria-expanded="true">
                Наиграно: <b>${totalPlayTime.toFixed(2)} часов</b>
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
                <td><b>${server.time.toFixed(2)} часов</b></td>
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
            default:
                return "#AAAAAA";
        }
    }
}


