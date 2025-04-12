import { FoxEngine } from '/plugins/FoxEngine-2.1/js/FoxEngine.js';

const templates = {
  "templates": {
    "lastUser": "/templates/" + replaceData['template'] + "/foxEngine/lastUser.tpl",
	"badge": "/templates/" + replaceData['template'] + "/foxEngine/badge.tpl",
	//"errorPage": replaceData['assets'] + "elements/pageError.tpl",
	"payment": "/templates/" + replaceData['template'] + "/foxEngine/payment.tpl",
	"playTimeWidgetCard": "/templates/" + replaceData['template'] + "/foxEngine/playTimeWidget/widgetCard.tpl",
	"emptyWidget": "/templates/" + replaceData['template'] + "/foxEngine/playTimeWidget/emptyWidget.tpl",
	"widgetSegment": "/templates/" + replaceData['template'] + "/foxEngine/playTimeWidget/widgetSegment.tpl",
	"widgetRow": "/templates/" + replaceData['template'] + "/foxEngine/playTimeWidget/widgetRow.tpl",
	"modalApp": "/templates/" + replaceData['template'] + "/foxEngine/modalApp.tpl"
  }
};

const serversColorMap = {
            Prodigium: '#3498DB',
            Amber:     '#c17d22',
            Celeste:   '#37bbd0',
            Industrial:'#d79c1c'
        };

const foxEngine = new FoxEngine(replaceData, userFields, templates, serversColorMap);
window.foxEngine = foxEngine;

const App = new Vue({
    delimiters: ["<%", "%>"],
    el: '#content',
    data: {
        contentData: foxEngine.initialPage()
    },

    mounted() {
        document.addEventListener("DOMContentLoaded", () => {
			foxEngine.user.parseUsrOptionsMenu();
			foxEngine.logo.logoAnimation();
			foxEngine.servers.parseOnline();
			setBackgroundBySeason();
			foxEngine.user.getLastUser();
        });
    },

    created() {
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
    }

});

// Set interval for foxEngine methods
setInterval(() => {
		foxEngine.servers.parseOnline();
}, 5000);

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
	
	jQuery(document).ready(function () {

    jQuery(".header-cont").css({position: 'relative'});
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 50) {
            jQuery('#button-up').fadeIn();
        } else {
            jQuery('#button-up').fadeOut();
        }
    });

    jQuery('#button-up').click(function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });
});

//setTimeout(() => {
	document.addEventListener("DOMContentLoaded", () => {
		document.querySelector('.option_select').addEventListener('click', function() {
			this.classList.toggle('open');
		});
	});
//}, 1000);
}());

export { App, foxEngine };
