function foxEngine(login) {

    this.selectPage = {
        thisPage: "",
        thatPage: ""
    };
    let optionAmount;
    let optionArray;
    let optionTpl;
    let type;
    let updatedText;
    let replacedTimes = 0;
    let optNamesArr = new Array();

    this.loadPage = function(page, block) {
        let delay, option, content;
        let parser = new DOMParser();
        if (page !== FoxEngine.selectPage.thisPage && FoxEngine.selectPage.thisPage !== undefined) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            let optionContent = request.send_post({
                "getOption": page
            });

            optionContent.onreadystatechange = function() {
                if (optionContent.readyState === 4) {
                    let response = parser.parseFromString(this.responseText, 'text/html');
                    option = getData(response, 'useroption');
                    content = getData(response, 'pageContent');
                    if (option !== undefined) {
                        let jsonOption = JSON.parse(option.textContent);
                        if (jsonOption.onLoad) {
                            setTimeout(() => {
                                let args = jsonOption.onLoadArgs;
                                window[jsonOption.onLoad](args);
                            }, 700);
                        }
						
					FoxEngine.loadData(FoxEngine.replaceText(this.responseText, page), block);
					FoxEngine.setPage(page);
					location.hash = '#' + page;
                    }
                }
            }
        }
    };

    this.loadData = function(data, block) {
		let Galleryinstance;
        $(block).fadeOut(500);
        setTimeout(() => {
			if(data.indexOf('<section class="gallery"') > 0){
				Galleryinstance = new Gallery(data);
				Galleryinstance.loadGallery();
			}
            $(block).html(data);
            $(block).fadeIn(500);
            formInit(100);
        }, 500);
    }

    this.setPage = function(page) {
        $(".pageLink-" + page).addClass("selectedPage");
        if (page != FoxEngine.selectPage.thisPage) {
            FoxEngine.selectPage.thatPage = FoxEngine.selectPage.thisPage;
            $(".pageLink-" + FoxEngine.selectPage.thatPage).removeClass("selectedPage");
        }
        FoxEngine.selectPage.thisPage = page;
    };

    this.getLastUser = function() {
        let lastUserReq = request.send_post({
            userAction: "lastUser"
        });
        lastUserReq.onreadystatechange = function() {
            if (lastUserReq.readyState === 4) {
                let lastUser = JSON.parse(this.responseText);
                let userView = `
				<div id="profileContents" style="background: linear-gradient(45deg, #c5c5e19c, ` + lastUser.colorScheme + `);">
				<table>
				<tr>
					<td>
					<div class="avatar"> 
					   <img class="profilePhoto" src="` + lastUser.profilePhoto + `" style="width: 64px;" alt="` + lastUser.login + `">
					</div>
					</td>
					
					<td>
					<div class="profile-title">
						<ul>
					   <li><h1><a href="#" onclick="FoxEngine.viewUserProfile('` + lastUser.login + `'); return false;">` + lastUser.login + `</a></h1></li>
					   <li><span>` + lastUser.realname + `</span></li>
					   <li><span class="groupStatus-4">` + FoxEngine.convertUnixTime(lastUser.reg_date) + `</span></li>
					   </ul>
					</div>
					</td>
				</div>
				</tr>
				</table>`;
                $("#lastUser").html(userView);
            }
        }
    };

    function textAnimate() {
        let animation = anime.timeline({
            loop: false
        }).add({
            targets: '.container #actionBlock',
            scale: [14, 1],
            rotateZ: [180, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: 300
        });
        return true;
    };
	
	function getData(data, tag) {
		return data.getElementsByTagName(tag)[0];
	}

    this.userAction = function() {
        let answer = request.send_post({
            user_doaction: "greeting"
        });
        answer.onreadystatechange = function() {
            if (answer.readyState === 4) {
                try {
                    answer = JSON.parse(this.responseText);
                    $(".text-wrapper").html(answer.text + ' ' + replaceData.realname + '!');
                } catch (error) {}
                textAnimate();
            }
        };
    };


    this.debugSend = function(message, style) {
        console.log("%c" + message, style);
    };

    this.splitWrapLetters = function(query, letterClass) {
        let textWrapper = document.querySelector(query);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
    };

    this.convertUnixTime = function(unix) {
        let a = new Date(unix * 1000),
            year = a.getFullYear(),
            months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            month = months[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
            sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

        return `${month} ${date}, ${year}, ${hour}:${min}:${sec}`;
    };

    this.randomNumber = function(min, max) {
        const r = Math.random() * (max - min) + min + 1
        return Math.floor(r)
    };

    this.buttonFreeze = function(button, delay) {
        let oldValue = button.innerHTML;
        let spinner = '<ul class="list-inline"> <li>Ожидайте</li> <li class="wait"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></li>';
        button.setAttribute('disabled', true);
        button.innerHTML = spinner;

        setTimeout(function() {
            button.innerHTML = oldValue;
            button.removeAttribute('disabled');
        }, delay);
    };

    this.soundOnClick = function(type) {
        let tplScan = request.send_post({
            sysRequest: "tplScan",
            path: "/assets/snd/" + type
        });
        let sndNum;
        tplScan.onreadystatechange = function() {
            if (tplScan.readyState === 4) {
                let sndAmount = JSON.parse(this.responseText).fileNum;
                sndNum = FoxEngine.randomNumber(1, sndAmount);
                if (sndAmount > 0) {
                    var sound = new Howl({
                        src: [replaceData.assets + 'snd/' + type + '/sound' + sndNum + '.mp3'],
                        preload: true,
                    });
                    sound.play();
                }
            }
        }
    };
    /* USER OPTIONS*/

    this.parseUsrOptionsMenu = function() {
        if (optNamesArr.length <= optionAmount) FoxEngine.debugSend('Using FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
        let usrOptions = request.send_post({
            "getUserOptionsMenu": replaceData.login
        });
        if (replaceData.isLogged) {
            FoxEngine.debugSend("User " + replaceData.login + " is logged", '');
        }
        usrOptions.onreadystatechange = function() {
            if (usrOptions.readyState === 4) {
                try {
                    let json = JSON.parse(this.responseText);
                    optionAmount = json.optionAmount;
                    optionArray = json.optionArray;
                    if (optNamesArr.length <= optionAmount) FoxEngine.debugSend("UserOptions available: " + optionAmount, "");
                    for (var i = 0; i < optionAmount; i++) {
                        var obj = optionArray[i];
                        for (var optionName in obj) {
                            let appendBlock = obj[optionName]["optionBlock"];
                            switch (obj[optionName]["type"]) {
                                case "page":
                                    optionTpl = `
										  <li>
											<a  class="pageLink-` + optionName + `" onclick="FoxEngine.loadPage('` + optionName + `', replaceData.contentBlock); return false; ">
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
                                    optionTpl = obj[optionName]["optionTitle"];
                                    break;
                            }
                            if (appendBlock !== undefined) {
                                $(appendBlock).append(optionTpl);
                            }
                            optNamesArr.push(optionName);
                        }
                    }
                } catch (error) {}
            }
        }
    }

    this.viewUserProfile = function(userDisplay) {
        let userProfilePopup = request.send_post({
            "userDisplay": userDisplay,
            "user_doaction": "ViewProfile"
        });

        userProfilePopup.onreadystatechange = function() {
            if (userProfilePopup.readyState === 4) {
                FoxEngine.loadData(userProfilePopup.responseText, '#content');
                formInit(100);
            }
        }
    }

    this.showProfilePopup = function(user) {
        let userProfile = request.send_post({
            "userDisplay": user,
            "user_doaction": "ViewProfile"
        });

        $("#dialog").dialog("option", "title", user);

        userProfile.onreadystatechange = function() {
            if (userProfile.readyState === 4) {
                FoxEngine.loadData(userProfile.responseText, '#dialogContent');
                //$("#dialog").dialog("option", "appendTo", userProfile.responseText);
                formInit(100);
            }
        }
        $("#dialog").dialog('open');
    }
    /*ENTRY REPLACER*/
    this.replaceText = function(text, page) {
        updatedText = text;
        for (let j = 0; j < userFields.length; j++) {
            let value = userFields.at(j);
            let mask = "%" + value + "%";
            while (updatedText.includes(mask) > 0) {
                FoxEngine.debugSend(" - Replacing " + value + " mask...", 'color: green');
                updatedText = updatedText.replace(mask, replaceData[userFields.at(j)]);
                replacedTimes++;
            }
        }
        switch (replacedTimes) {
            case 0:
                FoxEngine.debugSend("No text for replacing was found", 'color: red');
                break;

            case 1:
                FoxEngine.debugSend("Replaced " + replacedTimes + " occurrence", 'color: green');
                break;

            default:
                FoxEngine.debugSend("Replaced " + replacedTimes + " occurrences", 'color: green');
                break;
        }
        replacedTimes = 0
        return updatedText;
    }
}