function foxEngine(login) {

    let selectPage = {
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

    this.loadPage = async function(page, block) {
        let delay, option, content, func;
        let parser = new DOMParser();
        if (page !== selectPage.thisPage && selectPage.thisPage !== undefined) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            let optionContent = await request.send_post({
                "getOption": page
            });

            optionContent.onreadystatechange = function() {
                if (optionContent.readyState === 4) {
					FoxesInput.initialised = false;
                    let response = parser.parseFromString(this.responseText, 'text/html');
                    option = getData(response, 'useroption');
                    content = getData(response, 'pageContent');
                    if (option !== undefined) {
                        let jsonOption = JSON.parse(option.textContent);
                        if (jsonOption.onLoad) {
							switch(jsonOption.onLoadArgs){
								case undefined:
									func = jsonOption.onLoad+"()";
								break;
								
								default:
									func = jsonOption.onLoad + "(" + jsonOption.onLoadArgs + ")";
								break;
							}
							
                            setTimeout(() => {
                               eval(func);
							   //console.log(func);
                            }, 500);
                        }
						
					FoxEngine.loadData(replaceText(this.responseText, page), block);
					setPage(page);
					location.hash = '#page/' + page;
                    }
                }
            }
        }
    };

    this.getLastUser = async function() {
        let lastUserReq = await request.send_post({
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

					   <img class="profilePhoto" src="` + lastUser.profilePhoto + `" style="width: 64px;" alt="` + lastUser.login + `">
					
					</td>
					
					<td>
					<div class="profile-title">
						<ul>
					   <li><h1><a href="#" onclick="FoxEngine.showUserProfile('` + lastUser.login + `'); return false;">` + lastUser.login + `</a></h1></li>
					   <li><span>` + lastUser.realname + `</span></li>
					   <li><span class="groupStatus-4">` + convertUnixTime(lastUser.reg_date) + `</span></li>
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

    this.userAction = async function() {
        let answer = await request.send_post({
            user_doaction: "greeting"
        });
        answer.onreadystatechange = function() {
            if (answer.readyState === 4) {
                try {
                    answer = JSON.parse(this.responseText);
                    $("#actionBlock").html(answer.text + ' ' + replaceData.realname + '!');
                } catch (error) {}
                textAnimate();
            }
        };
    };

    this.splitWrapLetters = function(query, letterClass) {
        let textWrapper = document.querySelector(query);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
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
                sndNum = randomNumber(1, sndAmount);
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

    this.parseUsrOptionsMenu = async function() {
        if (optNamesArr.length <= optionAmount) 
			FoxEngine.debugSend('Using FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
        let usrOptions = await request.send_post({
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
										  <li class="`+obj[optionName]["optionClass"]+`">
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

    this.showUserProfile = async function(userDisplay) {	
        let userProfile = await request.send_post({
            "userDisplay": userDisplay,
            "user_doaction": "ViewProfile"
        });

        userProfile.onreadystatechange = function() {
            if (userProfile.readyState === 4) {
                FoxEngine.loadData(userProfile.responseText, '#content');
            }
        }
		location.hash = 'user/' + userDisplay;
		FoxesInput.initialised = false;
		FoxesInput.formInit(1000);
    };

    this.showProfilePopup = async function(user,dialogOptions) {
        let userProfilePopup = await request.send_post({
            "userDisplay": user,
            "user_doaction": "ViewProfile"
        });
        //$("#dialog").dialog("option", "title", user);

        userProfilePopup.onreadystatechange = function() {
            if (userProfilePopup.readyState === 4) {
				let parser = new DOMParser();
                let response = parser.parseFromString(userProfilePopup.responseText, 'text/html');
                FoxEngine.loadData(response.getElementById('view'), '#dialogContent');		
            }
        }
		$("#dialog").dialog(dialogOptions);
        $("#dialog").dialog('open');
		setTimeout(() => {
			this.parseBadges(user);
		}, 600);
    };
	
	/*Badges*/
	this.parseBadges = async function(user){
		let badgesInstance = await request.send_post(
		{
			user_doaction: 'GetBadges',
			userDisplay: user
		});
	    badgesInstance.onreadystatechange = function() {
            if (badgesInstance.readyState === 4) {
				let parsedJson = JSON.parse(this.responseText);
				if(parsedJson.length > 0) {
					for (var k = 0; k < parsedJson.length; k++) {
						let obj = parsedJson[k];
						let BadgeHtml = `<li>
							<a data-toggle="tooltip" class="badge" title="`+obj.BadgeDesc+` Since `+convertUnixTime(obj.AcquiredDate)+`" href="#`+obj.BadgeName+`" rel="noreferrer noopener">
								<img aria-hidden="true" src="`+obj.BadgeImg+`" class="profileBadge22-3GAYRy profileBadge-12r2Nm desaturate-_Twf3u">
							</a>
						</li>`;
						$("#userBadges").append(BadgeHtml);
						$('[data-toggle="tooltip"]').tooltip({placement: 'bottom', trigger: "hover"});
					}
				} else {
					$("#userBadges").remove();
				}
			}
		}
	};
	
	this.debugSend = function(message, style) {
        console.log("%c" + message, style);
    };
	
	this.loadData = function(data, block) {
		let Galleryinstance;
        $(block).fadeOut(500);
        setTimeout(() => {
			if(data !== undefined) {
				if(String(data).indexOf('<section class="gallery"') > 0){
					Galleryinstance = new Gallery(data);
					Galleryinstance.loadGallery();
				}
			}
            $(block).html(data);
            $(block).fadeIn(500);
            FoxesInput.formInit(500);
        }, 500);
    }

    setPage = function(page) {
        $(".pageLink-" + page).addClass("selectedPage");
        if (page != selectPage.thisPage) {
            selectPage.thatPage = selectPage.thisPage;
            $(".pageLink-" + selectPage.thatPage).removeClass("selectedPage");
        }
        selectPage.thisPage = page;
    };

    convertUnixTime = function(unix) {
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

    randomNumber = function(min, max) {
        const r = Math.random() * (max - min) + min + 1
        return Math.floor(r)
    };
	
	/*ENTRY REPLACER*/
    replaceText = function(text, page) {
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
	
	
	/*
	this.parseEmojis = function(){
		let emojiSectionHTML, emojiHTML;
		let emojiInstance = request.send_post(
		{
			sysRequest: 'parseEmojis'
		});
		emojiInstance.onreadystatechange = function() {
			if (emojiInstance.readyState === 4) {
				let code, name;
				emojiHTML = `<div class="emoji_box">`;
				for(let m = 0; m < this.responseText; m++) {
					let emojiSection = this.response.at(m);
					emojiSectionHTML = ``;
					JSON.parse(emojiSection, function (key, value) {
						
						switch(key){
							case 'emojiCode':
								code = value;
							break;
							
							case 'emojiName':
								name = value;
							break;
						}
						emojiSectionHTML += `<div class="emoji_symbol" data-emoji="`+code+`"></div>`;
					});
					emojiHTML += emojiSectionHTML;
				}
				emojiHTML += `</div>`;
			}
		}
		return emojiHTML;
	} */
}