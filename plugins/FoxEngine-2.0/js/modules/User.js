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
                    let badgeHtml = await foxEngine.replaceTextInTemplate(badgeTemplate, {
                        BadgeDesc: obj.description,
                        AcquiredDateFormatted: foxEngine.utils.getFormattedDate(obj.acquiredDate),
                        BadgeName: obj.badgeName,
                        BadgeImg: obj.badgeImg
                    });

                    // Append the badge HTML to the userBadges container
                    $("#userBadges").append(badgeHtml);
                    $('[data-toggle="tooltip"]').tooltip({
                        placement: 'bottom',
                        trigger: "hover"
                    });
                }
            } else {
                $("#userBadges").remove();
            }
        } catch (error) {
            console.error('Error parsing badges:', error);
        }
    };
	
async refreshBalance(currencies) {
    async function animateValueChange(oldValue, newValue, elementSelector) {
        if (oldValue !== newValue) {
            $({ n: oldValue }).animate({ n: newValue }, {
                duration: 2500,
                step: function(a) {
                    $(elementSelector).text(Math.round(a));
                }
            });
        } else {
            console.log("Value hasn't changed.");
        }
    }

    try {
        let response = await foxEngine.sendPostAndGetAnswer({
            user_doaction: "getUnits"
        }, "JSON");

        let allData = {};

        response.forEach(item => {
            let key = Object.keys(item)[0];
            let value = item[key];
            allData[key] = value;
        });
        currencies.forEach(async currency => {
            if (allData.hasOwnProperty(currency)) {
                let oldBalance = Math.round(parseFloat($(`#${currency}`).text()));
                let newBalance = Math.round(parseFloat(allData[currency]));
                await animateValueChange(oldBalance, newBalance, `#${currency}`);
            } else {
                console.error(`No '${currency}' data found in response.`);
            }
        });
    } catch (error) {
        console.error('Error refreshing balance:', error);
    }
}


	
	/*
	foxEngine.request.send_post({
            user_doaction: "getUnits"
        });
	refreshBalance() {
        console.log('Parsing user balance');
		$.post('/', {data: "updatebalance"}, function (data) {
			data = JSON.parse(data);
			var oldmoney = Math.round(parseFloat($("#econs").text()));
			var oldrealmoney = Math.round(parseFloat($("#realmoney").text()));
			var oldbonuses = Math.round(parseFloat($("#bonuses").text()));

			var newmoney = Math.round(parseFloat(data['money']));
			var newrealmoney = Math.round(parseFloat(data['realmoney']));
			var newbonuses = Math.round(parseFloat(data['bonuses']));
		
		$(function () {
				if (oldrealmoney !== newrealmoney) {
					$({
						n: oldrealmoney
					}).animate({
						n: newrealmoney
					}, {
						duration: 1500,
						step: function (a) {
							$("#realmoney").html(a | 0)
						}
					})
				}
				
				if (oldmoney !== newmoney) {
					$({
						n: oldmoney
					}).animate({
						n: newmoney
					}, {
						duration: 2500,
						step: function (a) {
							$("#money").html(a | 0)
						}
					})
				}
		});
	});
} */

    async getBadgesArray(user) {
        let badgesArray = await foxEngine.sendPostAndGetAnswer({
            user_doaction: 'GetBadges',
            userDisplay: user
        }, "JSON");

        return badgesArray;
    }

    async showUserProfile(userDisplay) {
        let userProfile = this.getUserProfile(userDisplay);
		//foxEngine.page.langPack = await foxEngine.page.loadLangPack('userProfile');
		foxEngine.page.setPage("");
        foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(userProfile), foxEngine.replaceData.contentBlock);
		//HARDCODED!!!
        location.hash = 'user/' + userDisplay;
        foxEngine.foxesInputHandler.formInit(1000);
    }

    async showProfilePopup(user, dialogOptions) {
        $("#dialog").dialog("option", "title", user);
       let userProfile = await this.getUserProfile(user);
	   //foxEngine.page.langPack = await foxEngine.page.loadLangPack('userProfile');
		foxEngine.page.loadData(await this.foxEngine.entryReplacer.replaceText(userProfile), '#dialogContent');
        $("#dialog").dialog(dialogOptions);
        $("#dialog").dialog('open');
        setTimeout(() => {
            this.parseBadges(user);
        }, 600);
    }

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
                regDate: foxEngine.utils.getFormattedDate(lastUser.reg_date)
            });
            $("#lastUser").html(userView);
        } catch (error) {
            console.error(error.message);
        }
    };
	
	async getUserProfile(user) {
		foxEngine.page.langPack = await foxEngine.page.loadLangPack('userProfile');
		let userProfile = await foxEngine.sendPostAndGetAnswer({
            "userDisplay": user,
            "user_doaction": "ViewProfile"
        }, "TEXT");
		
		return userProfile;
	}
	
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