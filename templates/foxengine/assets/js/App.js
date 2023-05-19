const App = new Vue({
    delimiters: ["<%", "%>"],
    el: '#content',
    data: {
        contentData: FoxEngine.loadPage("Objects", '#content')
    },

    mounted() {
		FoxEngine.parseUsrOptionsMenu(replaceData.login);
        setTimeout(()=>{
            FoxEngine.userAction();
        }
        , 2000);
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
        }
        , 500);
    }
});

(function(){
	if(location.hash.substring(1) !== undefined) {
		FoxEngine.loadPage(location.hash.substring(1), '#content')
	}
}());
