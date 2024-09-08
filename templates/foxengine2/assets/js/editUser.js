         $(function (){
         let colors = replaceData.allowedColors;
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
 /*		 
	colors.forEach(async function(endivy) {
        let checked = endivy === selectedColor ? 'checked' : '';
		const colorBlock = await this.foxEngine.replaceTextInTemplate(await this.foxEngine.loadTemplate(`${this.foxEngine.elementsDir}colorCheck.tpl`, divue), {
                endivy: endivy,
                count: count,
                checked: checked
            });
       $("#profileColors").append(colorBlock);
        count++;
    });*/
         }());

        $('.tabs .tab_caption').on('click', 'li:not(.active)', function() {
            const index = $(this).index();
            foxEngine.user.openTab(index);
        });

        // Инициализация выбора цвета
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


    var skinsFiles;
    var cloakFiles;

    $('#skin_file').change(function () {
        skinsFiles = this.files;
        $("#file_name_skin").text(skinsFiles[0].name);
    });

    $('#cloak_file').change(function () {
        cloakFiles = this.files;
        $("#file_name_cloak").text(cloakFiles[0].name);
    });

    function deleteFileFromServer(button, replaceData, type) {
        $.post('/', {
            csrf_token: replaceData.hash,
            sysRequest: 'deleteFile',
            type: type
        }, function (data) {
            data = JSON.parse(data);
            button.notify(data['message'], data['type']);

            if (data['type'] === 'success') {
                drawSkins(replaceData.login);
            }
        });
    }

    function loadFileToServer(button, replaceData, type) {

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
        data.append('csrf_token', replaceData.hash);

        $.ajax({
            url: '/',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,

            success: function (respond, textStatus, jqXHR) {
                button.notify(respond.message, respond.type);
                drawSkins(replaceData.login);
            },

            error: function (jqXHR, textStatus, errorThrown) {
                console.log(replaceData);
                button.notify(textStatus);
            }
        });
    }
	
	async function drawSkins(login){
		let userSkin = await foxEngine.user.parseUserLook(login);
		document.getElementById('skin_image_front').src = `data:image/png;base64,${userSkin['front']}`;
		document.getElementById('skin_image_back').src = `data:image/png;base64,${userSkin['back']}`;
	}