/*
*	Notify AKA Advert ver - 0.1.6
*	Copyright Foxesworld.ru
*/

(function () {
	console.info('%c Using FoxesWorld Advert 0.1.6...', 'background: #39312fc7; color: yellow');
	let advert = 'YES';
	let debug = false;
	
	$.post('', {
          advert: advert
			}, function (data) {
				if(debug === true)
				console.log('parsed Data '+data);
            try {
                data = JSON.parse(data);
                let type = data['type'];
				let status = data['status'];
				let content = document.getElementById('notify-content');
				let imagesLeftBlock = $("#imagesLeft");
				let advertisment_title = $("#advertisment_title");
				let advertisment_text = $("#advertisment_text");
				let advertisment_link_name = $("#link"); 
				let present = ' <i class="fa fa-gift" aria-hidden="true"></i>';

				if (type === 'error') {
					if(debug === true)
					console.warn('Error showing advertisment, so destroying it');
					content.remove();
                    return;
                }
				
			if (type === 'success') {
					if(debug === true)console.log('Advert status: '+status);
					imagesLeftBlock.remove();
					if (status === '0') {
						content.remove();
					} else {
						let MainBlock = document.getElementById("notify-content");						
						if (getCookie('advert') !== "closed") {
							if(debug === true)
							console.log('Showing Advertisment');
							setTimeout(() => { 
								$('#notify-content').css('display','block');
								advAnimate();
							}, 2000);
						} else {
							if(debug === true)
							console.log('Advert cookie was set');
						}
					}

					let a = document.getElementById('link');
					a.href = data['link'];
					$('#link').removeClass('link-hide');
                    advertisment_title.text(data['title']);
					advertisment_link_name.text(data['link_name']);
					advertisment_text.text(data['message']);
                    return;
			} else {
					if (type === 'freeImage') {
					/*	if (getCookie('advert') !== "closed") {
							if(debug === true)
							console.log('Showing ' + type);
							$('#notify-content').css('display','block');
						} else {
							console.warn('Cookie was set, wont get the free image');
						} */
						let a = document.getElementById('link');
						let bgAmmount = data['ammount'];
						let alertMessage;

						if(bgAmmount == 1){
							alertMessage = 'Твой последний шанс!!!';
						}
						if(alertMessage){
							$('#alertMessage').html(alertMessage);
						} else {
							$('#alertMessage').remove();
						}
						advertisment_text.text(data['message']);
						imagesLeftBlock.html('Фонов осталось: '+ bgAmmount);
						advertisment_title.html(data['title']);
						advertisment_link_name.html(data['link_name']+' '+present);
						advertisment_link_name.removeClass('link-hide');
						a.href = data['link'];
					}
			}
            
			} catch (e) {
                //console.log(e); Debug logging
            }
        });
		
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
var textWrapper = document.querySelector('#advertisment_text');
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