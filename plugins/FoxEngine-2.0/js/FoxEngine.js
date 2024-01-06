import { Request } from './modules/Request.js';
import { FoxesInputHandler } from './modules/FoxesInputHandler.js';
import { User } from './modules/User.js';
import { Emojis } from './modules/Emojis.js';
import './modules/Notify.js';
import './modules/howler.core.js';

class FoxEngine {

    constructor(replaceData, userFields) {
        this.replaceData = replaceData;
        this.userFields = userFields;
        this.request = new Request("/", { key: replaceData.secureKey, user: replaceData.login}, true);
        this.foxesInputHandler = new FoxesInputHandler(this);
		this.user = new User(this);
		this.emojis = new Emojis(this);
        this.e = ["\n %c %c %c FoxEngine 2.0 - 🦊 WebUI 🦊  %c  %c  https://foxesworld.ru/  %c %c ⋆🐾°%c🌲%c🍂 \n\n", "background: #c89f27; padding:5px 0;", "background: #c89f27; padding:5px 0;", "color: #c89f27; background: #030307; padding:5px 0;", "background: #c89f27; padding:5px 0;", "background: #bea8a8; padding:5px 0;", "background: #c89f27; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];

        this.selectPage = {
            thisPage: "",
            thatPage: ""
        };
		
		this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        
        this.type;
        this.updatedText;
        this.replacedTimes = 0;

        this.elementsDir = replaceData.assets + "elements/";
        window.console.log.apply(console, this.e);
    }

    async loadPage(page, block) {
        let delay, option, content, func;
        let parser = new DOMParser();
        if (page !== this.selectPage.thisPage && this.selectPage.thisPage !== undefined) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            let response = await this.sendPostAndGetAnswer({
                "getOption": page
            }, "HTML");

            option = this.getData(response, 'useroption');
            content = this.getData(response, 'pageContent');
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

                await this.loadData(this.replaceText(response.body.innerHTML, page), block); // Use await here
                this.setPage(page);
                location.hash = '#page/' + page;
            }
            $(response).find('useroption').remove();
        }
    };

    async getLastUser() {
        try {
            let lastUser = await this.sendPostAndGetAnswer({
                userAction: "lastUser"
            }, "JSON");
            let userView = await this.loadAndReplaceHtml(this.elementsDir + 'lastUser.tpl', {
                colorScheme: lastUser.colorScheme,
                profilePhoto: lastUser.profilePhoto,
                login: lastUser.login,
                realname: lastUser.realname,
                regDate: this.convertUnixTime(lastUser.reg_date)
            });
            $("#lastUser").html(userView);
        } catch (error) {
            console.error(error.message);
        }
    };

    textAnimate(target) {
        let animation = anime.timeline({
            loop: false
        }).add({
            targets: target,
            scale: [14, 1],
            rotateZ: [180, 0],
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 1000,
            delay: 500
        });
        return true;
    };

    async sendPostAndGetAnswer(requestBody, answerType) {
        try {
            // Assuming request is a class or object that handles HTTP requests
            let response = await this.request.send_post(requestBody);

            // Wait for the response to be ready
            await this.waitForResponse(response);

            // Parse the response based on the specified answerType
            switch (answerType) {
                case "JSON":
                    return this.parseResponseJSON(response.responseText);

                case "HTML":
                    return this.parseResponseHTML(response.responseText);

                case "TEXT":
                    return response.responseText;

                default:
                    throw new Error("Invalid answerType specified");
            }

        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    // Helper function to wait for the response to be ready
    waitForResponse(response) {
        return new Promise(resolve => {
            response.addEventListener("load", () => {
                resolve();
            });
        });
    }

    // Helper function to parse the response and return JSON
    parseResponseJSON(responseText) {
        try {
            return JSON.parse(responseText);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    // Helper function to parse the response and return HTML document
    parseResponseHTML(responseText) {
        try {
            return new DOMParser().parseFromString(responseText, 'text/html');
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    getData(data, tag) {
        return data.getElementsByTagName(tag)[0];
    }
	
	async replaceTextInTemplate(template, replacements) {
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

    /**
     * Splits and wraps letters in a query selector with a specified class.
     * @param {string} query - The query selector for the element to split and wrap.
     * @param {string} letterClass - The class to apply to each letter.
     */
    splitWrapLetters(query, letterClass) {
        let textWrapper = document.querySelector(query);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
    };

    buttonFreeze(button, delay) {
        let oldValue = button.innerHTML;
        let spinner = '<ul class="list-inline"> <li>Ожидайте</li> <li class="wait"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></li>';
        button.setAttribute('disabled', true);
        button.innerHTML = spinner;

        setTimeout(function() {
            button.innerHTML = oldValue;
            button.removeAttribute('disabled');
        }, delay);
    };

    /* SOUND*/

    async soundOnClick(type) {
        try {
            const sndArr = await this.fetchSoundData(type);

            if (sndArr.fileNum > 0) {
                const soundUrl = this.getSoundUrl(type, sndArr);
                this.playSound(soundUrl);
            }
        } catch (error) {
            console.error("Error while processing soundOnClick:", error);
        }
    };

    async fetchSoundData(type) {
        return await this.sendPostAndGetAnswer({
            sysRequest: "tplScan",
            path: `/assets/snd/${type}`,
        }, "JSON");
    }

    getSoundUrl(type, sndArr) {
        const sndNum = this.randomNumber(1, sndArr.fileNum);
        return `${this.replaceData.assets}snd/${type}/sound${sndNum}.mp3`;
    }

    playSound(soundUrl) {
        var sound = new Howl({
            src: [soundUrl],
            preload: true,
        }).play();
        //sound.play();
    }

    randomNumber(min, max) {
        const r = Math.random() * (max - min) + min + 1
        return Math.floor(r)
    }
    /* SOUND*/

    /* Servers parser */
    async parseOnline() {
        try {
            // Load the template only once
            const entryTemplate = await this.loadAndReplaceHtml(this.elementsDir + 'monitor/serverEntry.tpl', {});

            let parsedJson = await this.sendPostAndGetAnswer({
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
                    serversHtmlPromises.push(this.replaceTextInTemplate(entryTemplate, {
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
                const totalOnlineHtml = await this.loadAndReplaceHtml(this.elementsDir + 'monitor/totalOnline.tpl', {
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
	
    // Load server page content
    async loadServerPage(serverName) {
        try {
            // Fetch server information
            let server = await this.sendPostAndGetAnswer({
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
                const template = await this.loadAndReplaceHtml(this.elementsDir + 'serverPage/serverPage.tpl', {
                    serverImage: serverDetails.serverImage,
                    serverDescription: serverDetails.serverDescription,
                    serverName: serverDetails.serverName,
                    serverVersion: serverDetails.serverVersion,
                    mods: await this.loadMods(modsInfo)
                });

                // Append the server page HTML to the container
                this.loadData(template, replaceData.contentBlock);
            } else {
                console.error('Error: Unable to fetch server details.');
            }
        } catch (error) {
            console.error('Error while loading server page:', error);
        }
    }

    // Function to load mods based on modsInfo
    async loadMods(modsInfo) {
        try {
            if (modsInfo && modsInfo.length > 0) {
                // Load the template only once
                const template = await this.loadAndReplaceHtml(this.elementsDir + 'serverPage/serverMods.tpl', {});

                // Use Promise.all to execute promises concurrently
                const promises = modsInfo.map(async mod => {
                    // Replace text in the template for each mod
                    return this.replaceTextInTemplate(template, {
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

    debugSend(message, style) {
        console.log("%c" + message, style);
    };

    async loadAndReplaceHtml(filePath, replacements) {
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

    loadData(data, block) {
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
            this.foxesInputHandler.formInit(500);
        }, 500);
    }

    setPage(page) {
        $(".pageLink-" + page).addClass("selectedPage");
        if (page != this.selectPage.thisPage) {
            this.selectPage.thatPage = this.selectPage.thisPage;
            $(".pageLink-" + this.selectPage.thatPage).removeClass("selectedPage");
        }
        this.selectPage.thisPage = page;
    }

    convertUnixTime(unix) {
        let a = new Date(unix * 1000),
            year = a.getFullYear(),
            month = this.monthNames[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
            sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

        return `${month} ${date}, ${year}, ${hour}:${min}:${sec}`;
    };

    /*ENTRY REPLACER*/
    replaceText(text, page) {
        this.updatedText = text || "";
        for (let j = 0; j < this.userFields.length; j++) {
            let value = this.userFields[j];
            let mask = "%" + value + "%";
            while (this.updatedText.includes(mask)) {
                this.debugSend(" - Replacing " + value + " mask...", 'color: green');
                this.updatedText = this.updatedText.replace(mask, this.replaceData[value]);
                this.replacedTimes++;
            }
        }
        switch (this.replacedTimes) {
            case 0:
                this.debugSend("No text for replacing was found", 'color: red');
                break;

            case 1:
                this.debugSend("Replaced " + this.replacedTimes + " occurrence", 'color: green');
                break;

            default:
                this.debugSend("Replaced " + this.replacedTimes + " occurrences", 'color: green');
                break;
        }
        this.replacedTimes = 0;
        return this.updatedText;
    }
}

export {
    FoxEngine,
    FoxesInputHandler
};