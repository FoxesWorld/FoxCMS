// FoxEngineModule.js

import { FoxesRequest } from './modules/FoxesRequest.js'; // Assuming the correct path to requestModule.js
import { RequestModule } from './modules/RequestModule.js'; // Assuming the correct path to requestModule.js
import { UIModule } from './modules/UIModule.js'; // Assuming the correct path to uiModule.js
import { ServerPageModule } from './modules/ServerPageModule.js';
import { FoxesInputHandler } from './modules/FoxesInputHandler.js';

const FoxEngine = (function () {

    // Private variables
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

    // Private helper functions

    // Other private helper methods can be added here

    // Public methods
	
	function debugSend(message) {
        console.log("Debug message:", message);
    }
	
	async function parseUsrOptionsMenu() {
        try {
            let optionsMenu = await RequestModule.sendPostAndGetAnswer({
                sysRequest: "parseUsrOptionsMenu"
            }, "HTML");

            // Assuming you have a function to append the options menu to a container
            appendOptionsMenu(optionsMenu);
        } catch (error) {
            console.error('Error while parsing user options menu:', error);
        }
    }
	
	/**
     * Splits and wraps letters in a query selector with a specified class.
     * @param {string} query - The query selector for the element to split and wrap.
     * @param {string} letterClass - The class to apply to each letter.
     */
    function splitWrapLetters(query, letterClass) {
        let textWrapper = document.querySelector(query);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
    };
	
	async function parseOnline() {
    try {
        // Load the template only once
        const entryTemplate = await UIModule.loadAndReplaceHtml(elementsDir + 'monitor/serverEntry.tpl', {});

        let parsedJson = await RequestModule.sendPostAndGetAnswer({
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
            const totalOnlineHtml = await UIModule.loadAndReplaceHtml(elementsDir + 'monitor/totalOnline.tpl', {
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


    // Function to load a page
    async function loadPage(page, block) {
        let delay, option, content, func;
        let parser = new DOMParser();
        if (page !== selectPage.thisPage && selectPage.thisPage !== undefined) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            let optionContent = await RequestModule.sendPostAndGetAnswer({
                "getOption": page
            }, "JSON");

            optionContent.onreadystatechange = function () {
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

                        UIModule.loadData(UIModule.replaceText(this.responseText, page), block);
                        setPage(page);
                        location.hash = '#page/' + page;
                    }
                    $(response).find('useroption').remove();
                }
            }
        }
    }

    // Function to get the last user
    async function getLastUser() {
        try {
            let lastUser = await RequestModule.sendPostAndGetAnswer({
                userAction: "lastUser"
            }, "JSON");
            let userView = await UIModule.loadAndReplaceHtml(elementsDir + 'lastUser.tpl', {
                colorScheme: lastUser.colorScheme,
                profilePhoto: lastUser.profilePhoto,
                login: lastUser.login,
                realname: lastUser.realname,
                regDate: UIModule.convertUnixTime(lastUser.reg_date)
            });
            $("#lastUser").html(userView);
        } catch (error) {
            console.error(error.message);
        }
    }
	
	async function userAction(action) {
        try {
            let answer = await RequestModule.sendPostAndGetAnswer({
                user_doaction: action
            }, "JSON");
            $("#actionBlock").html(answer.text + ' ' + replaceData.realname + '!');
        } catch (error) {}
        textAnimate("#actionBlock");
    };

    // Other FoxEngine-related functions can be added here

    // Exported methods
    return {
        loadPage,
        getLastUser,
		debugSend,
		splitWrapLetters,
        parseUsrOptionsMenu,
		parseOnline,
		userAction
        // ... (export other FoxEngine-related functions)
    };

})();

export { FoxEngine };
