/*
 *	UserOptions ver - 0.2.0
 *	Copyright Foxesworld.ru
 */
function parseUsrOptionsMenu() {
    debugSend('%cUsing FoxesWorld UserOptions', 'background: #39312fc7; color: yellow');
    let usrOptions;
    usrOptions = request.send_post({
        "getUserOptionsMenu": userData.login
    });
    usrOptions.onreadystatechange = function() {
        if (usrOptions.readyState === 4) {
            try {
                let json = JSON.parse(this.responseText);
                let optionAmmount = json.optionAmmount;
                let optionArray = json.optionArray;
                let optionTpl;
                let type;
                console.log("UserOptions available: " + optionAmmount);
                for (var i = 0; i < optionAmmount; i++) {
                    var obj = optionArray[i];
                    for (var optionName in obj) {
                        let appendBlock = obj[optionName]["optionBlock"];
                        switch (obj[optionName]["type"]) {
                            case "link":
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
                            console.log("[" + i + "]" + "Appending " + optionName + " to " + appendBlock + " block");
                            $(appendBlock).append(optionTpl);
                        }
                    }
                }
            } catch (error) {}
        }
    }
}