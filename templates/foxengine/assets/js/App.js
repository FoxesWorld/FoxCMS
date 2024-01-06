
//import { FoxEngine } from '/plugins/FoxEngineModules/js/FoxEngine.js';

const App = new Vue({
    delimiters: ["<%", "%>"],
    el: '#content',
    data: {
        contentData: FoxEngine.loadPage("welcome", '#content')
    },

    mounted() {
		FoxEngine.parseUsrOptionsMenu(replaceData.login);
        setTimeout(()=>{
            FoxEngine.userAction("greeting");
        }, 2000);
    },

    created: function() {
        FoxEngine.debugSend('Foxengine started!');
		FoxEngine.getLastUser();
		$("#dialog").dialog({
			autoOpen: false,
			show: 'fade',
			hide: 'fade',
			modal: true,
			width: "55%",
			height: 350,
			appendTo: "#dialogContent",
			close: function() {
				$("#dialogContent").html("");
			}
		});
        setTimeout(()=>{
            FoxEngine.splitWrapLetters('.logo .title', 'letter');
            FoxEngine.splitWrapLetters('.logo .status', 'letterStatus');
            logoAnimation();
			FoxEngine.parseOnline();			
        }
        , 500);
    }
});

setInterval(() => {
	FoxEngine.parseOnline();	
}, 15000);

(function(){
	if(location.hash.substring(1) !== undefined) {
		let linkTypes = [
			{"keyWord": "user", "action": "FoxEngine.showUserProfile([arg])"},
			{"keyWord": "page", "action": "FoxEngine.loadPage([arg], '#content')"}
		];
		for(let k = 0; k < linkTypes.length; k++){
			console.log("Adding listener to "+linkTypes[k].keyWord);
			if((location.hash+'').indexOf(linkTypes[k].keyWord, (0)) > 0){
				let replaceValue = location.hash.split('#'+linkTypes[k].keyWord+'/')[1];
				let runFunc = linkTypes[k].action.replace('[arg]', '"'+replaceValue+'"');
				eval(runFunc);
				//FoxesInput.formInit(100);
			}
		}
	}
}());
