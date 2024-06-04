export class Logo {
	
	constructor(foxEngine) {
		this.foxEngine = foxEngine;
		this.timelineCfg = {
			timeline: [
					{
						targets: '.logoWrapper .logo ul',
						opacity: [0, 1]
					}, 
					{
						targets: '.logo img',
						translateY: [-100, 0],
						opacity: [0.1, 1],
						elasticity: 600,
						duration: 1000
					},
					{
						targets: '.logo .letter',
						opacity: [0, 1],
						translateX: [80, 0],
						duration: 1000,
						delay: function(el, index) { 
							return 100 * index;
						}
					},
					{
						targets: '.logo .status',
						opacity: [0, 1],
						translateY: [-60, 0],
						rotate: '2turn',
						elasticity: 500,
						duration: 1000,
						//easing: "easeOutSine",
						delay: function(el, index) { 
							return 20 * index;
						}
					},						
					{
						targets: '.logo .line',
						scaleX: [0.4, 1],
						//opacity: [0, 1],
						//rotate: '1turn',
						easing: "easeInOutExpo",
						duration: 2000
					},
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
		this.timeline = anime.timeline(this.timelineCfg.construct);
		foxEngine.utils.splitWrapLetters('.logo .title', 'letter');
        //foxEngine.utils.splitWrapLetters('.logo .status', 'letterStatus');
		this.array = this.timelineCfg.timeline;
	}
	
	logoAnimation() {
		for(let m = 0; m < this.array.length; m++){
			this.timeline.add(this.array.at(m))
		}
	}
}