const logoTimeline = anime.timeline({
    loop: false,
    autoplay: true
});

function logoAnimation() {
    logoTimeline
        .add({
            targets: '.logoWrapper .logo ul',
            opacity: [0, 1]
        })
        .add({
            targets: '.logo img',
            translateY: [-100, 0],
            opacity: [0, 1],
            elasticity: 600,
            duration: 1000
        })
        .add({
            targets: '.logo .letter',
            opacity: [0, 1],
            rotateY: [-180, 0],
            translateX: [-50, 0],
            duration: 1000,
            delay: (el, i) => 20 * i
        })
        .add({
            targets: '.logo .letterStatus',
            opacity: [0, 1],
            easing: "easeInOutExpo",
            duration: 100,
            delay: 0
        })
        .add({
            targets: '.logo .status',
            opacity: [0, 1],
            translateY: [200, 0],
            scaleX: [0.1, 1],
            elasticity: 500,
            duration: 2000,
            delay: (el, i) => 20 * i
        })
        .add({
            targets: '.logo .line',
            scaleX: [0.4, 1],
            //opacity: [0, 1],
            easing: "easeInOutExpo",
            duration: 2000
        })
        .add({
            targets: '.logo',
            translateY: [0, -50],
            opacity: [1, 0],
            easing: "easeInOutExpo",
            duration: 1000,
            delay: 1000
        });
}