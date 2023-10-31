const logoTimeline = anime.timeline({
    loop: false,
    autoplay: true
});

function logoAnimation() {
    logoTimeline.add({
		targets: '.logoWrapper .logo ul',
		opacity: [0, 1]
	}).add({
        targets: '.logo img',
        translateY: [-100, 0],
        opacity: [0, 1],
        elasticity: 600,
		padding: 5,
        duration: 1000
    }).add({
        targets: '.logo .letter',
        opacity: [0, 1],
        rotateY: [-180, 0],
        duration: 1000,
        delay: (el,i)=> 40 * i
    }).add({
        targets: '.logo .letterStatus',
        opacity: [0, 1],
        easing: "easeInOutExpo",
        duration: 500,
        delay: (el,i)=>  5 * i
    }).add({
        targets: '.logo .status',
        opacity: [0, 1],
		translateX: [0, -240],
		translateY: [0, 45],
		elasticity: 600,
		easing: "easeInOutExpo",
        duration: 1000
    }).add({
        targets: '.logo .line',
        scaleX: [0, 1],
        opacity: [0, 1],
        easing: "easeInOutExpo",
        duration: 800
    });
}
