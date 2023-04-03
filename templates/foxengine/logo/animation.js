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
        duration: 1100,
        delay: (el,i)=> 100 + 30 * i
    }).add({
        targets: '.logo .status',
        opacity: [0, 1],
		translateX: [-200, 0],
		easing: "easeInOutExpo",
		rotate: '10turn',
        duration: 1000
    }).add({
        targets: '.logo .line',
        scaleX: [0, 1],
        //opacity: [0, 1],
        easing: "easeInOutExpo",
        duration: 800
    });
}
