import { FoxEngine } from '/plugins/FoxEngine-2.1/js/FoxEngine.js';

const foxEngine = new FoxEngine(replaceData, userFields);
window.foxEngine = foxEngine;

const App = new Vue({
    delimiters: ["<%", "%>"],
    el: '#content',
    data: {
        contentData: foxEngine.initialPage()
    },

    mounted() {
        
        setTimeout(() => {
        //    foxEngine.user.userAction("greeting");
		foxEngine.user.parseUsrOptionsMenu();
        }, 1300);
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
    foxEngine.servers.parseOnline();
}, 10000);

// Handle hash change
(function () {
    function handleHashChange() {
        const hash = location.hash.substring(1);
        console.log("Current hash: ", hash);

        if (hash) {
            const linkTypes = [
                { keyWord: "user", action: "showUserProfile", module: "user." },
                { keyWord: "server", action: "loadServerPage", module: "servers." },
                { keyWord: "page", action: "loadPage", module: "page." }
            ];

            for (const linkType of linkTypes) {
                //console.log("Checking linkType: ", linkType.keyWord);

                if (hash.startsWith(linkType.keyWord + '/')) {
                    const replaceValue = hash.split(linkType.keyWord + '/')[1];
                    const moduleFunc = `foxEngine.${linkType.module}${linkType.action}`;

                    console.log(`Executing action: ${linkType.action} from module: ${linkType.module} with value: ${replaceValue}`);

                    if (typeof foxEngine !== 'undefined' && typeof foxEngine[linkType.module.slice(0, -1)][linkType.action] === 'function') {
                        foxEngine[linkType.module.slice(0, -1)][linkType.action](replaceValue, replaceData.contentBlock);

                        if (typeof foxEngine.onUrlChange === 'function') {
                            foxEngine.onUrlChange(replaceValue);
                        }
                    } else {
                        console.error(`Method not found: ${moduleFunc}`);
                    }
                    return;
                }
            }
            console.log("No matching linkType found for hash: ", hash);
        } else {
            console.log("Hash is empty, calling unhash()");
            unhash();
        }
    }

    function unhash() {
        const currentURLWithoutHash = window.location.href.split('#')[0];
        window.history.replaceState({}, document.title, currentURLWithoutHash);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}());


// Export Vue App
export { App, foxEngine };
