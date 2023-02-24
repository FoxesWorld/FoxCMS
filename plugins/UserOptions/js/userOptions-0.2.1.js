/*
 *	UserOptions ver - 0.2.1
 *	Copyright Foxesworld.ru
 */
function parseUsrOptionsMenu() {
    debugSend('%cUsing FoxesWorld UserOptions', 'background: #39312fc7; color: yellow; font-size: 14pt');
    let usrOptions;
    usrOptions = request.send_post({
        "getUserOptionsMenu": userData.login
    });
    usrOptions.onreadystatechange = function () {
        if (usrOptions.readyState === 4) {
            try {
                let json = JSON.parse(this.responseText);
                let optionAmount = json.optionAmount;
                let optionArray = json.optionArray;
                let optionTpl;
                let type;
                let optNamesArr = new Array();
                debugSend("UserOptions available: " + optionAmount, "");
                for (var i = 0; i < optionAmount; i++) {
                    var obj = optionArray[i];
                    for (var optionName in obj) {
                        optNamesArr.push(optionName);
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
                            //debugSend("[" + i + "]" + "Appending " + optionName + " to " + appendBlock + " block", "");
                            $(appendBlock).append(optionTpl);
                        }
                    }
                }
                debugSend(optNamesArr, "");
            } catch (error) {
            }
        }
    }
}