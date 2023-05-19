function Gallery(content){
	
	let galleryHTML;
	let check = false;
	let checkMark;
	let galleryBlock = $(content).find("section").get(0).outerHTML;
	
	this.loadGallery = function() {
			let scanObj = request.send_post({"sysRequest": "scanUploads", "path": $(galleryBlock).attr('dir'), "mask": $(galleryBlock).attr('mask')});
				scanObj.onreadystatechange = function() {
					if (scanObj.readyState === 4) {
						let jsonAnswer = JSON.parse(scanObj.responseText);
						FoxEngine.debugSend("Forming a gallery with " + jsonAnswer.fileNum +" photos", "");
						for(let j = 0; j < jsonAnswer.files.length; j++){
							if(check === false) {
								checkMark = "checked";
								check = true;
							} else {
								checkMark = "";
							}
							galleryHTML = `<div class="gallery__item">
							<input type="radio" id="img-`+j+`" name="gallery"  `+checkMark+` class="gallery__selector"/>
							<img class="gallery__img" src="`+jsonAnswer.filesHomeDir+jsonAnswer.files.at(j) +`" alt=""/>
							<label for="img-`+j+`" class="gallery__thumb">
								<img src="`+jsonAnswer.filesHomeDir+jsonAnswer.files.at(j) +`" alt=""/></label>
							</div>`;
							$("section.gallery").append(galleryHTML);
						}
					}
				}
	};

}