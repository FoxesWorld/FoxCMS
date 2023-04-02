/*
*	TextReplacer ver - 0.1.3
*	Copyright FoxesWorld.ru
*/

let updatedText;
let replacedTimes = 0;

function replaceText(text, page) {
    updatedText = text;
    for (let j = 0; j < userFields.length; j++) {
        let value = userFields.at(j);
		let mask = "%" + value + "%";
        while (updatedText.includes(mask)) {
            FoxEngine.debugSend(" - Replacing " + value + " mask...", 'color: green');
            updatedText = updatedText.replace(mask, replaceData[userFields.at(j)]);
			replacedTimes++;
        }
    }
	switch(replacedTimes){
		case 0:
			FoxEngine.debugSend("No text for replacing was found", 'color: red');
		break;
		
		case 1:
			FoxEngine.debugSend("Replaced "+ replacedTimes+" occurrence", 'color: green');
		break;
		
		default:
			FoxEngine.debugSend("Replaced "+ replacedTimes+" occurrences", 'color: green');
		break;
	}
	replacedTimes = 0
    return updatedText;
}
