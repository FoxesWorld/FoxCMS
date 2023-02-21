/*
*	advert AKA Advert ver - 0.1.8
*	Copyright Foxesworld.ru
*/


(function () {	

	let debug = false;
	let advertRequest;

	if(debug)console.info('%c Using FoxesWorld Advert 0.1.7...', 'background: #39312fc7; color: yellow');
	advertRequest = request.send_post({"advert": "HH"});
	advertRequest.onreadystatechange = function() {
	if(debug)console.log('parsed advertData '+advertData);
            try {
                advertData = JSON.parse(advertData);
                let type = advertData['type'];
				let status = advertData.status;
				let content = document.getElementById('notify-content');
				let advertisment_title = $("#advertisment_title");
				let advertisment_text = $("#advertisment_text");
				let advertisment_link_name = $("#link"); 

				if (!type || type === 'error') {
					if(debug) {
						console.warn('Error showing advertisment, so destroying it');
					}
					content.remove();
                    return;
                }
				
			if (type === 'success') {
					if(debug)console.log('Advert status: '+status);
					if (!status) {
						content.remove();
					} else {
						let MainBlock = document.getElementById("notify-content");						
						if (getCookie('advert') !== "closed") {
							if(debug){console.log('Showing Advertisment');}
						} else {
							if(debug)
							console.log('Advert cookie was set');
						}
					}

					let a = document.getElementById('link');
					a.href = advertData['link'];
					$('#link').removeClass('link-hide');
                    advertisment_title.text(advertData['title']);
					advertisment_link_name.text(advertData['link_name']);
					advertisment_text.text(advertData['message']);
					advAnimate();
                    return;
			}
           
			} catch (e) {
                //console.log(e); Debug logging
            }
		}

		
	let content = document.getElementById('notify-content');
	if (getCookie('advert') === "closed"){
		content.remove();
	}
}());
	
function closeNotify() {
    let notify_content = $('#notify-content');
	setCookie('advert', 'closed', 86400, '/', '192.168.0.100', true);
	$("#notify_block").removeClass('animate__delay-4s');
	$("#notify_block").addClass('animate__zoomOutRight');
	console.log('Advert skiped.');    
}

function advAnimate() {

	let textWrapper = document.querySelector('#advertisment_text');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

	anime.timeline({loop: false})
	  .add({
		targets: '#advertisment_text .letter',
		scale: [4,1],
		opacity: [0,1],
		translateZ: 0,
		easing: "easeOutExpo",
		duration: 850,
		delay: (el, i) => 70 * i
	  }).add({
		targets: '#advertisment_title',
		scale: [4,1],
		opacity: [0,1],
		translateZ: 0,
		easing: "easeOutExpo",
		duration: 950,
		delay: (el, i) => 70 * i
	  });
}