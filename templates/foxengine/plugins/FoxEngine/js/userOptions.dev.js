/*
*	UserOptions ver - 0.1.0
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
                    let appendBlock;
                    for (var key in obj) {
                        var value = obj[key];
                        type = obj["type"];
                        appendBlock = obj["optionBlock"];
                        switch (type) {
                        case "link":
                            optionTpl = `
										  <li>
											<a onclick="loadPage('` + obj["optionName"] + `'); return false; ">
												<div class="rightIcon">
													` + obj["optionPreText"] + `
												</div>
											` + obj["optionTitle"] + `
											</a>
											</li>`;
                            break;

                        case "plainText":
                            optionTpl = obj["optionTitle"];
                            break;
                        }
                    }
                    console.log("[" + i + "]" + "Appending " + obj["optionName"] + " to " + appendBlock + " block");
                    $(appendBlock).append(optionTpl);
                }
            } catch (error) {}
        }
        //$("#usrMenu").html(this.responseText);  
    }
}