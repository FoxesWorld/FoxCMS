import './Photor.js';

export class Gallery {
	constructor(foxEngine, content) {
		this.content = content;
		this.foxEngine = foxEngine;
		this.galleryBlock = $(content).find("section").get(0).outerHTML;
	}
	
	async loadGallery () {
	let jsonAnswer = await this.foxEngine.sendPostAndGetAnswer({
	      "sysRequest": "scanUploads",
		  "path": $(this.galleryBlock).attr('dir'),
		  "mask": $(this.galleryBlock).attr('mask')
            }, "JSON");
		//this.foxEngine.debugSend(jsonAnswer, "");
        
		this.foxEngine.debugSend("Forming a gallery with " + jsonAnswer.fileNum + " photos", "");
        for (let j = 0; j < jsonAnswer.files.length; j++) {
		this.getImageSize(jsonAnswer.filesHomeDir + jsonAnswer.files.at(j).name, 62, 52)
		  .then((imageSize) => {
			let galleryHTML = ` <img src = "`+jsonAnswer.filesHomeDir+jsonAnswer.files.at(j).name+`"data-thumb="`+imageSize+`" />`;
          $("#images").append(galleryHTML);
		  })
		  .catch((error) => {
			this.foxEngine.debugSend('Произошла ошибка: ' + error.message, "");
		  });
        }


	setTimeout(() => {
		$('.foxesGallery').photor();
	}, 400);
  }
  
  	async getImageSize(img, width, height) {
			let jsonAnswer = await this.foxEngine.sendPostAndGetAnswer({
			  sysRequest: "getImg",
			  path: img,
			  width: width,
			  height: height
            }, "TEXT");
			return jsonAnswer;
	}
}