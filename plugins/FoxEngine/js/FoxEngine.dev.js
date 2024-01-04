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
    let elementsDir = replaceData.assets + "elements/";

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
			
			//let test = await sendPostAndGetAnswer({
            //    "getOption": page
            //}, "HTML");
			//console.log(test);

            optionContent.onreadystatechange = function() {
                if (optionContent.readyState === 4) {
                    FoxesInput.initialised = false;
                    let response = parser.parseFromString(this.responseText, 'text/html');
                    option = getData(response, 'useroption');
                    content = getData(response, 'pageContent');
                    if (option !== undefined) {
                        let jsonOption = JSON.parse(option.textContent);
                        if (jsonOption.onLoad) {
                            switch (jsonOption.onLoadArgs) {
                                case undefined:
                                    func = jsonOption.onLoad + "()";
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

                        loadData(replaceText(this.responseText, page), block);
                        setPage(page);
                        location.hash = '#page/' + page;
                    }
					$(response).find('useroption').remove();
                }
            }
        }
    };

    this.getLastUser = async function() {
        try {
            let lastUser = await sendPostAndGetAnswer({
                userAction: "lastUser"
            }, "JSON");
            let userView = await loadAndReplaceHtml(elementsDir + 'lastUser.tpl', {
                colorScheme: lastUser.colorScheme,
                profilePhoto: lastUser.profilePhoto,
                login: lastUser.login,
                realname: lastUser.realname,
                regDate: convertUnixTime(lastUser.reg_date)
            });
            $("#lastUser").html(userView);
        } catch (error) {
            console.error(error.message);
        }
    };

    function textAnimate(target) {
        let animation = anime.timeline({
            loop: false
        }).add({
            targets: target,
            scale: [14, 1],
            rotateZ: [180, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: 500
        });
        return true;
    };

	async function sendPostAndGetAnswer(requestBody, answerType) {
		try {
			// Assuming request is a class or object that handles HTTP requests
			let response = await request.send_post(requestBody);

			// Wait for the response to be ready
			await this.waitForResponse(response);

			// Parse the response based on the specified answerType
			switch (answerType) {
				case "JSON":
					return this.parseResponseJSON(response.responseText);
					
				case "HTML":
					return this.parseResponseHTML(response.responseText);
					
				default:
					throw new Error("Invalid answerType specified");
			}

		} catch (error) {
			console.error(error.message);
			throw error;
		}
	}

	// Helper function to wait for the response to be ready
	waitForResponse = function (response) {
		return new Promise(resolve => {
			response.addEventListener("load", () => {
				resolve();
			});
		});
	}

	// Helper function to parse the response and return JSON
	parseResponseJSON = function (responseText) {
		try {
			return JSON.parse(responseText);
		} catch (error) {
			console.error(error.message);
			throw error;
		}
	}

	// Helper function to parse the response and return HTML document
	parseResponseHTML = function (responseText) {
		try {
			return new DOMParser().parseFromString(responseText, 'text/html');
		} catch (error) {
			console.error(error.message);
			throw error;
		}
	}


    function getData(data, tag) {
        return data.getElementsByTagName(tag)[0];
    }

    this.userAction = async function(action) {
        try {
            let answer = await sendPostAndGetAnswer({
                user_doaction: action
            }, "JSON");
            $("#actionBlock").html(answer.text + ' ' + replaceData.realname + '!');
        } catch (error) {}
        textAnimate("#actionBlock");
    };
	
	    /**
     * Splits and wraps letters in a query selector with a specified class.
     * @param {string} query - The query selector for the element to split and wrap.
     * @param {string} letterClass - The class to apply to each letter.
     */
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
        if (replaceData.isLogged) {
            FoxEngine.debugSend("User " + replaceData.login + " is logged", '');
        }
        try {
            let json = await sendPostAndGetAnswer({
                "getUserOptionsMenu": replaceData.login
            }, "JSON");
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
										  <li class="` + obj[optionName]["optionClass"] + `">
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
	
    this.showUserProfile = async function(userDisplay) {
        let userProfile = await request.send_post({
            "userDisplay": userDisplay,
            "user_doaction": "ViewProfile"
        });

        userProfile.onreadystatechange = function() {
            if (userProfile.readyState === 4) {
                loadData(userProfile.responseText, replaceData.contentBlock);
            }
        }
        location.hash = 'user/' + userDisplay;
        FoxesInput.initialised = false;
        FoxesInput.formInit(1000);
    };

    this.showProfilePopup = async function(user, dialogOptions) {
        //$("#dialog").dialog("option", "title", user);
		
			let response = await sendPostAndGetAnswer({
				"userDisplay": user,
				"user_doaction": "ViewProfile"
            }, "HTML");

        loadData(response.getElementById('view'), '#dialogContent');
        $("#dialog").dialog(dialogOptions);
        $("#dialog").dialog('open');
        setTimeout(() => {
            this.parseBadges(user);
        }, 600);
    };

/* Badges */
// Function to parse badges
this.parseBadges = async function (user) {
	const badgeTemplate = await loadAndReplaceHtml(elementsDir + 'badge.tpl', {});
    try {
        let parsedJson = await sendPostAndGetAnswer({
            user_doaction: 'GetBadges',
            userDisplay: user
        }, "JSON");

        if (parsedJson.length > 0) {
            for (let k = 0; k < parsedJson.length; k++) {
                let obj = parsedJson[k];

                // Replace text in the badge template for each badge
                let badgeHtml = await replaceTextInTemplate(badgeTemplate, {
                    BadgeDesc: obj.BadgeDesc,
                    AcquiredDateFormatted: convertUnixTime(obj.AcquiredDate),
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



/* Servers parser */
this.parseOnline = async function () {
    try {
        // Load the template only once
        const entryTemplate = await loadAndReplaceHtml(elementsDir + 'monitor/serverEntry.tpl', {});

        let parsedJson = await sendPostAndGetAnswer({
            sysRequest: 'parseMonitor'
        }, "JSON");

        if (parsedJson.servers.length > 0) {
            let serversHtmlPromises = [];

            for (const obj of parsedJson.servers) {
                let isOnline = obj.status === "online";
                let progressbarClass = isOnline ? 'progressbar-online' : 'progressbar-offline';
                let playersOnline = isOnline ? obj.playersOnline : 0;
                let playersMax = isOnline ? obj.playersMax : 0;

                // Push the promise to the array
                serversHtmlPromises.push(replaceTextInTemplate(entryTemplate, {
                    version: obj.version,
                    srvName: obj.serverName,
                    serverName: obj.serverName,
                    playersOnline: playersOnline,
                    playersMax: playersMax,
                    percent: obj.percent,
                    statusClass: isOnline ? 'online' : 'offline',
                    version: obj.version,
                    progressbarClass: progressbarClass
                }));
            }

            // Wait for all promises to be resolved
            let serversHtmlResults = await Promise.all(serversHtmlPromises);

            // Combine the results into a single string
            let serversHtml = serversHtmlResults.join('');

            // Replace text in the total online template
            const totalOnlineHtml = await loadAndReplaceHtml(elementsDir + 'monitor/totalOnline.tpl', {
                totalPlayersOnline: parsedJson.totalPlayersOnline,
                totalPlayersMax: parsedJson.totalPlayersMax,
                percent: parsedJson.percent,
                todaysRecord: parsedJson.todaysRecord
            });

            // Update the content
            $("#servers").html(serversHtml + totalOnlineHtml);
        } else {
            $("#servers").empty();
        }
    } catch (error) {
        console.error('Error parsing online servers:', error);
    }
};



replaceTextInTemplate = async function(template, replacements) {
    try {
        let replacedTemplate = template;

        // Replace placeholders in the template
        for (let key in replacements) {
            if (replacements.hasOwnProperty(key)) {
                const regex = new RegExp('{' + key + '}', 'g');
                replacedTemplate = replacedTemplate.replace(regex, replacements[key]);
            }
        }

        return replacedTemplate;
    } catch (error) {
        console.error(error.message);
        return ''; // Return an empty string or handle the error accordingly
    }
}

// Load server page content
this.loadServerPage = async function(serverName) {
    try {
        // Fetch server information
        let server = await sendPostAndGetAnswer({
            sysRequest: "parseServers",
            server: "serverName = '" + serverName + "'"
        }, "JSON");

        if (server && server.length > 0) {
            let serverDetails = server[0];

            // Fetch modsInfo
            let modsInfo = [];
            if (serverDetails.modsInfo) {
                modsInfo = JSON.parse(serverDetails.modsInfo);
            }

            // Load the server page template
            const template = await loadAndReplaceHtml(elementsDir + 'serverPage/serverPage.tpl', {
				serverImage: serverDetails.serverImage,
				serverDescription: serverDetails.serverDescription,
                serverName: serverDetails.serverName,
                serverVersion: serverDetails.serverVersion,
                mods: await loadMods(modsInfo)
            });

            // Append the server page HTML to the container
            loadData(template, replaceData.contentBlock);
        } else {
            console.error('Error: Unable to fetch server details.');
        }
    } catch (error) {
        console.error('Error while loading server page:', error);
    }
}

// Function to load mods based on modsInfo
loadMods = async function(modsInfo) {
    try {
        if (modsInfo && modsInfo.length > 0) {
            // Load the template only once
            const template = await loadAndReplaceHtml(elementsDir + 'serverPage/serverMods.tpl', {});

            // Use Promise.all to execute promises concurrently
            const promises = modsInfo.map(async mod => {
                // Replace text in the template for each mod
                return replaceTextInTemplate(template, {
                    modName: mod.modName,
                    modPicture: mod.modPicture,
                    modDesc: mod.modDesc
                });
            });

            // Wait for all promises to resolve
            const modsHtmlArray = await Promise.all(promises);

            // Concatenate the results
            return modsHtmlArray.join('');
        } else {
            console.error("Couldn't extract server modInfo.");
            return ''; // or handle accordingly
        }
    } catch (error) {
        console.error('Error while loading mods:', error);
        return ''; // or handle accordingly
    }
}





    this.debugSend = function(message, style) {
        console.log("%c" + message, style);
    };

    async function loadAndReplaceHtml(filePath, replacements) {
        try {
            let response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Failed to load HTML content');
            }

            let htmlContent = await response.text();

            // Replace placeholders in the HTML content
            for (let key in replacements) {
                if (replacements.hasOwnProperty(key)) {
                    const regex = new RegExp('{' + key + '}', 'g');
                    htmlContent = htmlContent.replace(regex, replacements[key]);
                }
            }

            return htmlContent;
        } catch (error) {
            console.error(error.message);
            return ''; // Return an empty string or handle the error accordingly
        }
    }

    loadData = function(data, block) {
        let Galleryinstance;
        $(block).fadeOut(500);
        setTimeout(() => {
            if (data !== undefined) {
                if (String(data).indexOf('<section class="gallery"') > 0) {
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


this.parseEmojis = async function () {
    try {
        let emojiHTML = `<div class="emoji_box">`;

        // Assuming request is a class or object that handles HTTP requests
        let emojiData = await request.send_post({
            sysRequest: 'parseEmojis'
        });

        if (emojiData && emojiData.emoji && Array.isArray(emojiData.emoji)) {
            let emojiArray = emojiData.emoji;

            for (let emoji of emojiArray) {
                if (emoji && emoji.code && emoji.name) {
                    let code = emoji.code;
                    let name = emoji.name;

                    emojiHTML += `<div class="emoji_symbol" data-emoji="${code}" title="${name}"></div>`;
                } else {
                    console.error('Invalid emoji structure:', emoji);
                }
            }

            emojiHTML += `</div>`;
        } else {
            console.error('Invalid emoji data:', emojiData);
            // Handle the error or return an appropriate value
        }

        return emojiHTML;
    } catch (error) {
        console.error('Error parsing emojis:', error);
        throw error;
    }
}
}