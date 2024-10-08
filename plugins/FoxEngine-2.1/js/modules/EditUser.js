	export class EditUser {
		constructor(foxEngine){
			this.foxEngine = foxEngine;
		}
		
		initialize(login){
			this.login = login;
			this.drawSkins(login);
			this.loadColors();
			this.colorPickerInit();
		}
		
		loadColors(){
				let colors = this.foxEngine.replaceData.allowedColors;
				 let count = 0;
				 let checked;
				 let selectedColor = $("#colourVal").val();
				 
				 if(!colors.includes(selectedColor)) {colors.push(selectedColor);}
				
				 colors.forEach(function(endivy) {
				 if(endivy === selectedColor) checked = 'checked'; else checked = '';
				 let colorBlock = '<label for="ColorInput'+endivy+'">'+
				 '<div class="colorBlock '+checked+'" id="Color'+ count +'" style="background-color: '+ endivy +';">' +
				 '<input type="radio" id="ColorInput'+endivy+'" name="colorPicker" style="display: none;" value="'+endivy+'" '+checked+'>' +
				 '<div class="innerDiv">' +
					'<i class="fa fa-check"></i>' +
				 '</div>' +
				 '<span class="innerSpan"></span>' +
				 '</div>'+
				 '</label>';
				 $("#profileColors").append(colorBlock);
				 count++;
				 }); 
		}
		
		colorPickerInit(){
			$('input[name="colorPicker"]').on('click', function() {
				const rad = document.getElementsByName('colorPicker');
				for (let i = 0; i < rad.length; i++) {
					const $colorBlock = $('#Color' + i);
					$colorBlock.removeClass('checked');
					if (rad[i].checked) {
						$colorBlock.addClass('checked');
						$("#colourVal").val(rad[i].value);
					}
				}
			}); 
		}
		
		tabListenerInit(){
			$('.tabs .tab_caption').on('click', 'li:not(.active)', () => {
				const index = $(this).index();
				this.openTab(index-1);
			});
		}
		
		viewEdit() {
         	let view = $('#view');
         	let edit = $('#edit');
			 
			if (view.is(':visible')) {
				view.fadeOut('slow', function() {
				edit.fadeIn('slow');
				});
			} else {
				edit.fadeOut('slow', function() {
					view.fadeIn('slow');
				});
			 }
         }
		 
		 openTab(index) {
			if($('#view').is(':visible')) {
				this.viewEdit();
			}
            const $tabs = $('.tabs');
            const $tabCaptions = $tabs.find('.tab_caption li');
            const $tabContents = $tabs.find('.tab_content');

            $tabCaptions.removeClass('active').eq(index).addClass('active');
            $tabContents.removeClass('active').eq(index).addClass('active');
        }
		
		loadFileToServer(button, type) {
			var data = new FormData();

			if (type === "skin") {
				$.each(skinsFiles, function (key, value) {
					data.append(key, value);
				});
			}

			if (type === "cloak") {
				$.each(cloakFiles, function (key, value) {
					data.append(key, value);
				});
			}

			data.append('sysRequest', 'uploadFile');
			data.append('type', type);
			data.append('login', this.login);
			data.append('csrf_token', this.foxEngine.replaceData.hash);

			$.ajax({
				url: '/',
				type: 'POST',
				data: data,
				cache: false,
				dataType: 'json',
				processData: false,
				contentType: false,

				success: (respond, textStatus, jqXHR) => {
					button.notify(respond.message, respond.type);
					this.drawSkins(this.login);
				},

				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					button.notify(textStatus);
				}
			});
		}
			
		deleteFileFromServer(button, type) {
			$.post('/', {
				csrf_token: '[hash]',
				sysRequest: 'deleteFile',
				type: type
			}, (data) => {
				data = JSON.parse(data);
				button.notify(data['message'], data['type']);

				if (data['type'] === 'success') {
					this.drawSkins(this.login);
				}
			});
		}
			
		async drawSkins(login){
			let userSkin = await foxEngine.user.parseUserLook(login);
			document.getElementById('skin_image_front').src = `data:image/png;base64,${userSkin['front']}`;
			document.getElementById('skin_image_back').src = `data:image/png;base64,${userSkin['back']}`;
		}
	}