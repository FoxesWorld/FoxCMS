/*
 *	UserOptions ver - 0.2.1
 *	Copyright Foxesworld.ru
 */
	 let optionAmount;
	 let optionArray;
	 let optionTpl;
	 let type;
	 let optNamesArr = new Array();

function parseUsrOptionsMenu() {
    if(optNamesArr.length <= optionAmount)debugSend('Using FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
    let usrOptions = request.send_post({
        "getUserOptionsMenu": replaceData.login
    });
	if(replaceData.isLogged){
		debugSend("User "+replaceData.login + " is logged", '');
	}
    usrOptions.onreadystatechange = function () {
        if (usrOptions.readyState === 4) {
            try {
                let json = JSON.parse(this.responseText);
				optionAmount = json.optionAmount;
				optionArray = json.optionArray;
                if(optNamesArr.length <= optionAmount)debugSend("UserOptions available: " + optionAmount, "");
                for (var i = 0; i < optionAmount; i++) {
                    var obj = optionArray[i];
                    for (var optionName in obj) {
                        let appendBlock = obj[optionName]["optionBlock"];
                        switch (obj[optionName]["type"]) {
                            case "page":
                                optionTpl = `
										  <li>
											<a onclick="loadPage('` + optionName + `', contentBlock, true); return false; ">
												<div class="rightIcon">
													` + obj[optionName]["optionPreText"] + `
												</div>
											` + obj[optionName]["optionTitle"] + `
											</a>
											</li>`;
                                break;

                            case "pageContent":
                                break;

                            case "plainText":
                                optionTpl = obj[optionName]["optionTitle"];
                                break;
                        }
                        if (appendBlock !== undefined) {
                            $(appendBlock).append(optionTpl);
                        }
						 optNamesArr.push(optionName);
                    }
                }
                if(optNamesArr.length <= optionAmount)console.table(optNamesArr);
            } catch (error) {
            }
        }
    }
}

	function viewUserProfile(userDisplay){
		let userProfile = request.send_post({
			"userDisplay": userDisplay,
			"user_doaction": "ViewProfile"
		});
		
		userProfile.onreadystatechange = function () {
			if (userProfile.readyState === 4) {
				loadData(userProfile.responseText, '#content');
				formInit(100);
			}
		}
	}