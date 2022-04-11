/*
*	Notify AKA Advert ver - 0.1.6
*	Copyright Foxesworld.ru
*/

(function () {
	console.log('Advert 0.1.5 Init');
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

function addFreeImage(getFreeImage){
	$.post('', { 
		getFreeImage: getFreeImage
	}, function (data) {
		data = JSON.parse(data);
		let type = data['type'];
		let message = data['message'];
		$("#advertisment_text").notify(message,type);
		if(type === 'success'){
			setTimeout(function(){
				closeImageGet();
			}, 1500);
		}
    });
}
	
function closeNotify() {
    let notify_content = $('#notify-content');
	setCookie('advert', 'closed', 86400, '/', 'foxesworld.ru', true);
	$("#notify_block").removeClass('animate__delay-4s');
	$("#notify_block").addClass('animate__zoomOutRight');
	console.log('Advert skiped.');
    
}