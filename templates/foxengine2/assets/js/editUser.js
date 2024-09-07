(async function () {
	setTimeout(async () => {
		drawSkins('[login]');
		}, 2000);
	})();


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

    $("#load_skin").click(function () {
        loadFileToServer($(this), 'skin');
    });

    $("#load_cloak").click(function () {
        loadFileToServer($(this), 'cloak');
    });

    function deleteFileFromServer(button, type) {
        $.post('/', {
            csrf_token: '0729be9e3052f1ff011c2ab6cc3b00e18625a2b777223d9c64d81cbd79088e89',
            sysRequest: 'deleteFile',
            type: type
        }, function (data) {
            data = JSON.parse(data);
            button.notify(data['message'], data['type']);

            if (data['type'] === 'success') {
                drawSkins('[login]');
            }
        });
    }

    function loadFileToServer(button, type) {

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
        data.append('csrf_token', '0729be9e3052f1ff011c2ab6cc3b00e18625a2b777223d9c64d81cbd79088e89');

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
                drawSkins('[login]');
            },

            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                button.notify(textStatus);
            }
        });
    }
	
	async function drawSkins(login){
		let userSkin = await foxEngine.user.parseUserLook(login);
		document.getElementById('skin_image_front').src = `data:image/png;base64,${userSkin['front']}`;
		document.getElementById('skin_image_back').src = `data:image/png;base64,${userSkin['back']}`;
	}