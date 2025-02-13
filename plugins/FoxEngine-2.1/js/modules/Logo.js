export class Logo {
	
	constructor(foxEngine) {
		this.foxEngine = foxEngine;
		// Конфигурация таймлайна с несколькими этапами для создания "киношной" анимации
		this.timelineCfg = {
			timeline: [
				// Этап 1: Плавное появление контейнера логотипа с эффектом масштабирования и затухания
				{
					targets: '.logoWrapper .logo ul',
					opacity: [0, 1],
					scale: [0.8, 1],
					duration: 800,
					easing: 'easeOutCubic'
				},
				{
					targets: '.logo img',
					translateY: [-200, 0],
					opacity: [0, 1],
					scale: [0.5, 1],
					duration: 800,
					easing: 'easeOutExpo'
				},
				{
					targets: '.logo .letter',
					translateY: [-150, 0],
					opacity: [0, 1],
					duration: 350,
					delay: (el, i) => 100 * i,
					easing: 'easeOutBack'
				},
				{
					targets: '.logoWrapper .logo',
					translateX: [0, 20],
					duration: 500,
					easing: 'linear',
					direction: 'alternate',
					loop: 3
				},
				{
					targets: '.logo .status .letterStatus',
					opacity: [0, 1],
					translateY: [-100, 0],
					rotate: ['11turn', '0turn'],
					scale: [0.1, 1],
					duration: 1900,
					delay: (el, index) => 50 * index,
					easing: 'easeOutElastic'
				},
				{
					targets: '.logo img',
					scale: [1, 1.1],
					rotate: [0, 2],
					duration: 200,
					easing: 'easeInOutQuad',
					complete: function() {
						anime({
							targets: '.logo',
							scale: [1.1, 1],
							rotate: [2, 0],
							duration: 200,
							easing: 'easeInOutQuad'
						});
					}
				}
			], 
			construct: {
				loop: false,
				autoplay: true
			}
		};
		this.timeline = anime.timeline(this.timelineCfg.construct);
		foxEngine.utils.splitWrapLetters('.logo .title', 'letter');
		foxEngine.utils.splitWrapLetters('.logo .status', 'letterStatus');
		
		this.array = this.timelineCfg.timeline;
	}
	
	logoAnimation() {
		this.array.forEach(step => {
			this.timeline.add(step);
		});
	}
}
