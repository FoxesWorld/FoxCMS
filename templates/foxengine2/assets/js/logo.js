let logoCfg = {
			timeline: [
					{
						targets: '.logoWrapper .logo ul',
						opacity: [0, 1]
					}, 
					{
						targets: '.logo img',
						translateY: [-100, 0],
						opacity: [0, 1],
						elasticity: 600,
						duration: 1000
					},
					{
						targets: '.logo .letter',
						opacity: [0, 1],
						translateY: [60, 0],
						duration: 1000,
						delay: (el, i) => 100 * i
					},
					{
						targets: '.status .letterStatus',
						opacity: [0, 1],
						easing: "easeInOutExpo",
						duration: 100,
						delay:  (el, i) => 40 * i
					},
					
					{
						targets: '.logo .status',
						opacity: [0, 1],
						translateY: [-60, 0],
						elasticity: 500,
						duration: 1000,
						delay: (el, i) => 2 * i
					},
					/*
					{
						targets: '.logo .line',
						scaleX: [0.4, 1],
						//opacity: [0, 1],
						//rotate: '1turn',
						easing: "easeInOutExpo",
						duration: 2000
					},
					*/
					{
						targets: '.logo',
						translateY: [0, -50],
						opacity: [1, 0],
						easing: "easeInOutQuad",
						duration: 1000,
						delay: 1000
					}
				], 
				 construct: {
					 loop: false,
					 autoplay: true
				}
};
let timeline = anime.timeline(logoCfg.construct);
		
setTimeout(() => {	
	(function() {
		for(let m = 0; m < logoCfg.timeline.length; m++){
			timeline.add(logoCfg.timeline.at(m))
		}
	})();
}, 500);