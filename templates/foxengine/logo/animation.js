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
        rotateY: [-90, 0],
        duration: 1300,
        delay: (el,i)=> 40 * i
    }).add({
        targets: '.logo .letterStatus',
        opacity: [0, 1],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el,i)=>100 + 30 * i
    }).add({
        targets: '.logo .line',
        scaleX: [0, 1],
        //opacity: [0.5, 1],
        easing: "easeInOutExpo",
        duration: 600
    });
}

function splitWrapLetters(query, letterClass) {
    let textWrapper = document.querySelector(query);
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
}
