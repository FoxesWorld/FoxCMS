function loadPage(page, block, animate) {
    addAnimation('animate__backOutRight', $(block), animate);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setTimeout(()=>{
        let optionContent;
        optionContent = request.send_post({
            "getOption": page
        });
        optionContent.onreadystatechange = function() {
			if (optionContent.readyState === 4) {
				$(block).html(replaceText(this.responseText, page));
			}
        }
        formInit(100);
    }, 700);
    setTimeout(()=>{
        addAnimation('animate__bounceInDown', $(block), animate);
    }
    , 600);
}

function addAnimation(animation, block, animate) {
	if(animate) {
		block.addClass(animation);
		setTimeout(()=>{
			block.removeClass(animation);
		}
		, 1000);
	}
}

function userAction() {
    let answer;
    answer = request.send_post({
        user_doaction: "greeting"
    });
    answer.onreadystatechange = function() {
        try {
            answer = JSON.parse(this.responseText);
            $(".text-wrapper").html(answer.text + ' ' + userData.realname + '!');
        } catch (error) {}
        textAnimate();
    };
}

function textAnimate() {
    splitWrapLetters('#actionBlock .text-wrapper', 'letter');
    let animation = anime.timeline({
        loop: false
    }).add({
        targets: '.container #actionBlock',
        scale: [14, 1],
		rotateZ: [180, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1000,
        delay: 300
    })/* .add({
        targets: '.text-wrapper',
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [-180, 0],
        duration: 850,
        easing: "easeOutExpo",
        delay: (el,i)=>120*i
    })*/;
}

function debugSend(message, style) {
    if (debug) {
        console.log(message, style);
    }
}

function splitWrapLetters(query, letterClass) {
    let textWrapper = document.querySelector(query);
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
}
