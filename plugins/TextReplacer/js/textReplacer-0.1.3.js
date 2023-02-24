/*
*	TextReplacer ver - 0.1.3
*	Copyright FoxesWorld.ru
*/

let updatedText;
let replacedTimes = 0;

function replaceText(text, page) {
    debugSend('%cUsing FoxesWorld TextReplacer on page '+page, 'background: #39312fc7; color: yellow; font-size: 14pt');
    updatedText = text;
    for (let j = 0; j < userFields.length; j++) {
        let value = userFields.at(j);
		let mask = "%" + value + "%";
        while (updatedText.includes(mask)) {
            debugSend("%c - Replacing " + value + " mask...", 'color: green');
            updatedText = updatedText.replace(mask, userData[userFields.at(j)]);
			replacedTimes++;
        }
    }
	switch(replacedTimes){
		case 0:
			debugSend("%cNo text for replacing was found", 'color: red');
		break;
		
		case 1:
			debugSend("%cReplaced "+ replacedTimes+" occurrence", 'color: green');
		break;
		
		default:
			debugSend("%cReplaced "+ replacedTimes+" occurrences", 'color: green');
		break;
	}
	replacedTimes = 0
    return updatedText;
}
