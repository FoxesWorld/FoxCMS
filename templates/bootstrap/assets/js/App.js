const App = new Vue({
	delimiters: ["<%","%>"],
	el: '#content',
	data: {contentData: ' Waiting for you!'},
	

	mounted() {
		console.log('Foxengine started!');
		setTimeout(() => {
			userAction();
		}, 2000);
	},
	
  created: function () {
	parseUsrOptionsMenu();
	setTimeout(() => {
		//animate(); 
		splitWrapLetters('.logo .title', 'letter');
splitWrapLetters('.logo .status', 'letterStatus');
logoAnimation();
	}, 2000);
  }
  });