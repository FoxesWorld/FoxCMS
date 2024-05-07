export class User {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.optNamesArr = [];
        this.optionAmount;
        this.optionArray;
        this.optionTpl;
        var userLogin = foxEngine.replaceData.login;
        var debugMessage = "Loading data for %c" + userLogin + "%c...";
        var loginStyle = "color: #ff0000;";
        var textStyles = "color: #000000;";
        //console.log(debugMessage, loginStyle, textStyles);
    }

    async parseUsrOptionsMenu() {

        if (this.optNamesArr.length <= this.optionAmount)
            foxEngine.debugSend('Using FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
        if (foxEngine.replaceData.isLogged) {
            //foxEngine.debugSend("User " + foxEngine.replaceData.login + " is logged", '');
        }
        try {
            let json = await foxEngine.sendPostAndGetAnswer({
                "getUserOptionsMenu": foxEngine.replaceData.login
            }, "JSON");
            this.optionAmount = json.optionAmount;
            this.optionArray = json.optionArray;
            if (this.optNamesArr.length <= this.optionAmount) foxEngine.debugSend("UserOptions available: " + this.optionAmount, "");
            for (var i = 0; i < this.optionAmount; i++) {
                var obj = this.optionArray[i];
                for (var optionName in obj) {
                    let appendBlock = obj[optionName]["optionBlock"];

                    switch (obj[optionName]["type"]) {
                        case "page":
                            this.optionTpl = `
										  <li class="` + obj[optionName]["optionClass"] + `">
											<a  class="pageLink-` + optionName + `" onclick="foxEngine.page.loadPage('` + optionName + `', replaceData.contentBlock); return false; ">
												<div class="rightIcon">
													` + obj[optionName]["optionPreText"] + `
												</div>
											` + obj[optionName]["optionTitle"] + `
											</a>
											</li>`;
                            break;

                        case "pageContent":
                            break;

                        case "plainText":
                            this.optionTpl = obj[optionName]["optionTitle"];
                            break;
                    }
                    if (appendBlock !== undefined) {
                        $(appendBlock).append(this.optionTpl);
                    }
                    this.optNamesArr.push(optionName);
                }
            }
        } catch (error) {}
    }

    async userAction(action) {
        try {
            let answer = await foxEngine.sendPostAndGetAnswer({
                user_doaction: action
            }, "JSON");
            $("#actionBlock").html(answer.text + ' ' + foxEngine.replaceData.realname + '!');
        } catch (error) {}
        foxEngine.utils.textAnimate("#actionBlock");
    };

    async parseBadges(user) {
        const badgeTemplate = await foxEngine.loadTemplate(foxEngine.elementsDir + 'badge.tpl', true);
        try {
            let parsedJson = await this.getBadgesArray(user);

            if (parsedJson.length > 0) {
                for (let k = 0; k < parsedJson.length; k++) {
                    let obj = parsedJson[k];

                    // Replace text in the badge template for each badge
                    let badgeHtml = await foxEngine.replaceTextInTemplate(badgeTemplate, {
                        BadgeDesc: obj.BadgeDesc,
                        AcquiredDateFormatted: foxEngine.utils.convertUnixTime(obj.AcquiredDate),
                        BadgeName: obj.BadgeName,
                        BadgeImg: obj.BadgeImg
                    });

                    // Append the badge HTML to the userBadges container
                    $("#userBadges").append(badgeHtml);

                    // Initialize tooltips for the badges
                    $('[data-toggle="tooltip"]').tooltip({
                        placement: 'bottom',
                        trigger: "hover"
                    });
                }
            } else {
                // If there are no badges, remove the userBadges container
                $("#userBadges").remove();
            }
        } catch (error) {
            console.error('Error parsing badges:', error);
        }
    };

    async getBadgesArray(user) {
        let badgesArray = await foxEngine.sendPostAndGetAnswer({
            user_doaction: 'GetBadges',
            userDisplay: user
        }, "JSON");

        return badgesArray;
    }

    async showUserProfile(userDisplay) {

        let userProfile = await foxEngine.sendPostAndGetAnswer({
            "userDisplay": userDisplay,
            "user_doaction": "ViewProfile"
        }, "TEXT");
		foxEngine.page.langPack = await foxEngine.page.loadLangPack('userProfile');
        foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(userProfile), foxEngine.replaceData.contentBlock);
		//HARDCODED!!!
        location.hash = 'user/' + userDisplay;
        foxEngine.foxesInputHandler.formInit(1000);
    };

    async showProfilePopup(user, dialogOptions) {
        $("#dialog").dialog("option", "title", user);

        let response = await foxEngine.sendPostAndGetAnswer({
            "userDisplay": user,
            "user_doaction": "ViewProfile"
        }, "HTML");

        foxEngine.page.loadData(response.getElementById('view'), '#dialogContent');
        $("#dialog").dialog(dialogOptions);
        $("#dialog").dialog('open');
        setTimeout(() => {
            this.parseBadges(user);
        }, 600);
    };

    async getLastUser() {
        try {
            let lastUser = await foxEngine.sendPostAndGetAnswer({
                userAction: "lastUser"
            }, "JSON");
            let userView = await foxEngine.replaceTextInTemplate(await foxEngine.loadTemplate(foxEngine.elementsDir + 'lastUser.tpl', true), {
                colorScheme: lastUser.colorScheme,
                profilePhoto: lastUser.profilePhoto,
                login: lastUser.login,
                realname: lastUser.realname,
                regDate: foxEngine.utils.convertUnixTime(lastUser.reg_date)
            });
            $("#lastUser").html(userView);
        } catch (error) {
            console.error(error.message);
        }
    };
	
	async logout(button) {
		try {
            let request = await foxEngine.sendPostAndGetAnswer({
                userAction: "logout"
            }, "JSON");
			button.notify(request.message, request.type);
			foxEngine.soundOnClick(request.type);
			setTimeout(() => {
				foxEngine.foxesInputHandler.refreshPage();
            }, 1500);
			
        } catch (error) {
            console.error(error.message);
        }
	}
}