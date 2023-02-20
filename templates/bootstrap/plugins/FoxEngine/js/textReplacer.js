/*
*	TextReplacer ver - 0.1.0
*	Copyright Foxesworld.ru
*/	

	let updatedText;
	function replaceText(text){	
		debugSend('%c Using FoxesWorld TextReplacer', 'background: #39312fc7; color: yellow');
		updatedText = text;
		for(let j =0; j < userFields.length; j++){
			let value = userFields.at(j);
			while(updatedText.includes("%"+value+"%")) {
				debugSend("%c Replacing " + value + " mask...", 'color: green');
				let mask = "%"+value+"%";
				updatedText = updatedText.replace(mask, userData[userFields.at(j)]);
			}
		}
		return updatedText;
	}