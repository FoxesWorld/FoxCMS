const App = new Vue({
    delimiters: ["<%", "%>"],
    el: '#content',
    data: {
        contentData: ' Waiting for you!'
    },

    mounted() {
		parseUsrOptionsMenu();
        setTimeout(()=>{
            userAction();
        }
        , 2000);
    },

    created: function() {
        console.log('Foxengine started!');
        setTimeout(()=>{
            splitWrapLetters('.logo .title', 'letter');
            splitWrapLetters('.logo .status', 'letterStatus');
            logoAnimation();
        }
        , 2000);
    }
});
