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
        contentData: foxEngine.loadPage("welcome", '#content')
    },

    mounted() {
        foxEngine.user.parseUsrOptionsMenu();
        setTimeout(() => {
            foxEngine.user.userAction("greeting");
        }, 2000);
    },

    created() {
        foxEngine.getLastUser();
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
            foxEngine.splitWrapLetters('.logo .title', 'letter');
            foxEngine.splitWrapLetters('.logo .status', 'letterStatus');
			logoAnimation();
            foxEngine.parseOnline();
        }, 500);
    }
});

// Set interval for foxEngine methods
setInterval(() => {
    foxEngine.parseOnline();
}, 15000);

// Handle hash change
(function () {
    if (location.hash.substring(1) !== undefined) {
        let linkTypes = [
            { "keyWord": "user", "action": "showUserProfile" },
            { "keyWord": "page", "action": "loadPage" }
        ];
        for (let k = 0; k < linkTypes.length; k++) {
            console.log("Adding listener to " + linkTypes[k].keyWord);
            if ((location.hash + '').indexOf(linkTypes[k].keyWord, (0)) > 0) {
                let replaceValue = location.hash.split('#' + linkTypes[k].keyWord + '/')[1];
                let runFunc = linkTypes[k].action;
                eval(`foxEngine.${runFunc}("${replaceValue}", "${replaceData.contentBlock}")`);
            }
        }
    }
}());

// Export Vue App
export { App, foxEngine };
