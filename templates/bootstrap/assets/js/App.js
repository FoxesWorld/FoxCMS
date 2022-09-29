const App = new Vue({
	delimiters: ["<%","%>"],
	el: '#content',
	data: {contentData: 'GG'},
	

	mounted() {
		console.log('Foxengine started!');
		setTimeout(() => {
			userAction();
		}, 2000);
	},
	
  created: function () {
	parseUsrOptionsMenu();
	setTimeout(() => {
		animate(); 
	}, 2000);
  }
  });