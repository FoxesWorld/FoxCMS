function loadPage(page, block, animate) {
	let delay;
    addAnimation('animate__backOutRight', $(block), animate);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
	switch(animate){
		case true: delay = 700; break;
		case false: delay = 0; break;
	}
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
    }, delay);
    setTimeout(()=>{
        addAnimation('animate__bounceInDown', $(block), animate);
    }, 600);
}

function loadData(data, block){
	if(replaceData.isLogged) {
		$(block).html(data);
	}
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

function getLastUser() {
	let lastUserReq = request.send_post({userAction: "lastUser"});
	    lastUserReq.onreadystatechange = function() {
			if (lastUserReq.readyState === 4) {
				let lastUser = JSON.parse(this.responseText);
				let userView = `
				<div id="profileContents" style="background: linear-gradient(45deg, #c5c5e19c, `+lastUser.colorScheme+`);">
					<div class="avatar"> 
					   <img class="profilePhoto" src="`+lastUser.profilePhoto+`" style="width: 64px;" alt="`+lastUser.login+`">
					</div>
					<div class="profile-title">
					   <h1><a href="#" onclick="viewUserProfile('`+lastUser.login+`'); return false;">`+lastUser.login+`</a></h1>
					   <span class="groupStatus-4">`+convertUnixTime(lastUser.reg_date)+`</span>
					</div>
				</div>`;
				$("#lastUser").html(userView);
				console.log(lastUser);
			}
		}
		
}

function userAction() {
    let answer;
    answer = request.send_post({
        user_doaction: "greeting"
    });
    answer.onreadystatechange = function() {
		if (answer.readyState === 4) {
			try {
				answer = JSON.parse(this.responseText);
				$(".text-wrapper").html(answer.text + ' ' + replaceData.realname + '!');
			} catch (error) {}
			textAnimate();
		}
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
        console.log("%c"+message, style);
    }
}

function splitWrapLetters(query, letterClass) {
    let textWrapper = document.querySelector(query);
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
}

function convertUnixTime(unix) {
      let a = new Date(unix * 1000),
      year = a.getFullYear(),
      months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();

      return `${month} ${date}, ${year}, ${hour}:${min}:${sec}`;
}

function randomNumber(min, max){
    const r = Math.random()*(max-min) + min + 1
    return Math.floor(r)
}

function buttonFreeze(button, delay){
	var oldValue = button.innerHTML;
	let spinner = '<ul class="list-inline"> <li>Ожидайте</li> <li class="wait"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></li>';
	button.setAttribute('disabled', true);
    button.innerHTML = spinner;
	
	setTimeout(function(){
        button.innerHTML = oldValue;
        button.removeAttribute('disabled');
	}, delay);
}

function soundOnClick(type) {
	let tplScan = request.send_post({sysRequest: "tplScan", path: "/assets/snd/"+type});
	let sndNum;
	tplScan.onreadystatechange = function() {
		if (tplScan.readyState === 4) {
			let sndAmount = JSON.parse(this.responseText).fileNum;
			sndNum = randomNumber(1, sndAmount);
			if(sndAmount > 0) {
					var sound = new Howl({
					  src: [assets+'snd/'+type+'/sound'+sndNum+'.mp3'],
					  preload: true,
					});
					sound.play();
			}
		}
    }
  }
  