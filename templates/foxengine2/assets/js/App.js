// Import FoxEngine
import { FoxEngine } from '/plugins/FoxEngine-2.0/js/FoxEngine.js';

// Create foxEngine instance
const foxEngine = new FoxEngine(replaceData, userFields);
window.foxEngine = foxEngine;

// Create Vue App
const App = new Vue({
    delimiters: ["<%", "%>"],
    el: '#content',
    data: {
        contentData: foxEngine.initialPage()
    },

    mounted() {
        foxEngine.user.parseUsrOptionsMenu();
        setTimeout(() => {
            foxEngine.user.userAction("greeting");
        }, 2000);
    },

    created() {
        foxEngine.user.getLastUser();
        $("#dialog").dialog({
            autoOpen: false,
            show: 'fade',
            hide: 'fade',
            modal: true,
            width: "55%",
            height: 350,
            appendTo: "#dialogContent",
            close() {
                $("#dialogContent").html("");
            }
        });
        setTimeout(() => {
            
			foxEngine.logo.logoAnimation();
            foxEngine.servers.parseOnline();
        }, 500);
    }

});

// Set interval for foxEngine methods
setInterval(() => {
    //foxEngine.servers.parseOnline();
}, 15000);

// Handle hash change
(function () {
    if (location.hash.substring(1) !== undefined) {
        let linkTypes = [
            {"keyWord": "user", "action": "showUserProfile", "module": "user." },
			{"keyWord": "server", "action": "loadServerPage", "module": "servers."},
            {"keyWord": "page", "action": "loadPage", "module":"page."}
        ];
        for (let k = 0; k < linkTypes.length; k++) {
            console.log("Adding listener to " + linkTypes[k].keyWord);
			if(location.hash !== "") {
				if ((location.hash + '').indexOf(linkTypes[k].keyWord, (0)) > 0) {
					let replaceValue = location.hash.split('#' + linkTypes[k].keyWord + '/')[1];
					let runFunc = linkTypes[k].action;
					eval(`foxEngine.${linkTypes[k].module}${runFunc}("${replaceValue}", "${replaceData.contentBlock}")`);
				}
			} else {
				unhash();
			}
        }
    }
}());

function unhash() {
    let currentURLWithoutHash = window.location.href.split('#')[0];
    window.history.replaceState({}, document.title, currentURLWithoutHash);
}

// Export Vue App
export { App, foxEngine };
