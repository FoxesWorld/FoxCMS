(function() {
  "use strict";
  userAction();
  setTimeout(() => { animate(); 
	  setTimeout(() => { 
		textAnimate(); 
	  }, 2000);
  }, 1300);
})()

  function userAction() {
	  let adminAction = {};
	  let answer;
		adminAction["user_doaction"] = "adminAction";
		answer = request.send_post(adminAction);
		answer.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					let response = JSON.parse(this.responseText);
					$("#actionBlock").html(response.text);
			}
		}
  }
  
  function animate() {
	let textWrapper = document.querySelector('.logo .title');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	anime.timeline({loop: false})
	.add({
		targets: '.logo .title',
		scaleX: [0,1],
		opacity: [0.5,1],
		easing: "easeOutCirc",
		duration: 300,
		delay: 0
	  }).add({
		targets: '.logo .img-fluid',
		scale: [0.1,1],
		opacity: [0,1],
		translateZ: 0,
		easing: "easeInExpo",
		duration: 450,
		delay: (el, i) => 0
	  }).add({
		targets: '.logo .line',
		scaleX: [0,1],
		opacity: [0.01,1],
		easing: "easeOutExpo",
		duration: 650,
		delay: (el, i, l) => 500 * (l - i)
	  }).add({
		targets: '.logo .status',
		scale: [0, 1],
		duration: 250,
		elasticity: 600,
		opacity: [0.5,1],
		easing: "easeOutExpo",
		delay: (el, i, l) => 1500 * (l - i)
	  });
	}
	
	  function textAnimate() {
		anime.timeline({loop: false})
		  .add({
			targets: '.container #actionBlock',
			scale: [14,1],
			opacity: [0,1],
			easing: "easeOutCirc",
			duration: 1000,
			delay: (el, i) => 1500 * i
		  });
	}