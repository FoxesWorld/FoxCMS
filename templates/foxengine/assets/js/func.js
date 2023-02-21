function loadPage(page) {
    addAnimation('animate__backOutRight', $(contentBlock));
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
				$(contentBlock).html(replaceText(this.responseText));
			}
        }
        formInit(100);
    }
    , 700);
    setTimeout(()=>{
        addAnimation('animate__bounceInDown', $(contentBlock));
    }
    , 600);
}

function addAnimation(animation, block) {
    block.addClass(animation);
    setTimeout(()=>{
        block.removeClass(animation);
    }
    , 1000);
}

function userAction() {
    let answer;
    answer = request.send_post({
        user_doaction: "greeting"
    });
    answer.onreadystatechange = function() {
        try {
            answer = JSON.parse(this.responseText);
            $("#actionBlock").html(answer.text + ' ' + userData.realname + '!');
        } catch (error) {}
        textAnimate();
    }
    ;

}

function textAnimate() {
    splitWrapLetters('#actionBlock', 'letter');
    let animation = anime.timeline({
        loop: false
    }).add({
        targets: '.container #actionBlock',
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1000,
        delay: 3000
    }).add({
        targets: '#actionBlock .letter',
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 750,
        easing: "easeOutExpo",
        delay: (el,i)=>50 * i
    });
}

function debugSend(message, style) {
    if (debug) {
        console.log(message, style);
    }
}
