	var CONFIG = (function() {
		 var private = {
			'BIND_BLOCK': '#pageData',
			'FILEINFO_BLOCK': '#fileInfo',
			'PATTERNS': 
			[
				{'BTN_GROUP': '<div class="buttonGroup left">{bitBTN}</div>'},
				{'FILE': '<ul class="file" {additional}><li>{file}</li></ul>'}
			],
			'BTNS':
			[
				{"home": `<div class="btnElement home" onclick='dirScanner({"fAction":"scanDir","dirScan":""})'><i class="bi bi-house-door-fill"></i></div>`},
				//{"refresh": `<div class="btnElement home" onclick='scanDir({"fAction":"scanDir","dirScan":""})'><i class="bi bi-trash-fill"></i></div>`}
			]
		 };
		 return {
			get: function(name) {return private[name];}
		};
	})();
	
	function dirScanner(data){
		let answer = request.send_post(data);
		let filesBlock = [];
		let filesArray = [];
		filesBlock.push(findInJSON(CONFIG.get('PATTERNS'), 'BTN_GROUP').replace('{bitBTN}', findInJSON(CONFIG.get('BTNS'), '')));
			answer.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let response = JSON.parse(this.responseText);
					$(CONFIG.get('BIND_BLOCK')).fadeOut(500);
					if(!response.message){
						response.forEach(value => {
						let fileAppearence;
							/* DEFINING FILEinfo */
							let fileData = new Object();
								fileData.fileName = value.name;
								fileData.dir = value.dir;
								fileData.fileSize = value.fileSize;
								fileData.filePath = value.filePath;
							fileAppearence = fileDirDisplay(fileData);
							filesArray.push(fileAppearence);
						});
						filesBlock = filesBlock.concat(filesArray);
					} else {
						filesBlock = filesBlock + response.message;
					}
					$(CONFIG.get('BIND_BLOCK')).fadeIn(500);
					setTimeout(() => {
						$(CONFIG.get('BIND_BLOCK')).html(filesBlock);
					}, 500);
				}
			}
	}

	function findInJSON(jsonArray, keyToFind){
		let outStr = '';
		$.each(jsonArray, function(key, val) {
			 $.each(val, function(k, v) {
				 if(keyToFind) {
					 if(k === keyToFind){
						outStr = v;
					 }
				 } else {
					 outStr = outStr + v;
				 }
			 });
		 });
		 return outStr;
	}

	function fileDirDisplay(fileData){
		let filePattern = findInJSON(CONFIG.get('PATTERNS'), 'FILE');
		let additional;
		let appearence = '';
		switch(fileData.dir){
			case true:
				additional = `ondblclick='dirScanner({"fAction": "scanDir", "dirScan": "`+fileData.fileName+`"})' onclick='getFileInfo(`+JSON.stringify(fileData)+`)'`;
				appearence = `<img class="directory" alt="`+fileData.fileName+`" />
							  <span class="filename">`+fileData.fileName+`</span>`;
			break;
			
			case false:
				additional = `onclick='getFileInfo(`+JSON.stringify(fileData)+`)'`;
				let fileExpr = fileData.fileName.split('.')[1];
				appearence = fileDisplay(fileData, fileExpr);

			break;
		}
		
		filePattern = filePattern.replace('{file}', appearence);
		filePattern = filePattern.replace('{additional}', additional);
		return filePattern;
	}
	
	//HOW DO WE DISPLAY eachFile expression
	function fileDisplay(fileData, expr){
		let fileAppearence;
		switch(expr){
			case 'jpg':
			case 'png':
			case 'gif':
				fileAppearence = `<img class="imgPreview" src="`+fileData.filePath+fileData.fileName+`">
								 <span>`+fileData.fileName+`</span>`;
			break;
											
			case 'mp3':
			case 'ogg':
			case 'wav':
				fileAppearence = `<audio controls>
											<source src="`+fileData.filePath+`/`+fileData.fileName+`" type="audio/mpeg">
								 </audio>
								<span>`+fileData.fileName+`</span> `;
			break;

			default:
				fileAppearence = `<li class="file-icon" data-file="`+expr+`"></li>
								 <span>`+fileData.fileName+`</span>`;
			break;
			}
			return fileAppearence;
	}
	
	function delFile(path, file){
		let action = new Object();
			action.fName = file;
			action.fPath = path;
			action.fAction = 'del';
		let delFile = request.send_post(action);
		delFile.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);
			switch(response.type){
				case 'info':
					dirScanner({"fAction": "scanDir", "dirScan": path.replace('/uploads/'+userLogin+'/', '')});
				break;
				
				case 'warn':
				break;
			}
			$(CONFIG.get('FILEINFO_BLOCK')).notify(response.message, response.type);
			}
		}
	}
	
	function getFileInfo(file){
		let fileSplit = file.fileName.split('.');
		let fileLocation = file.filePath+file.fileName;
		let fileInfo;
		switch(file.dir){
			case true:
						fileInfo = `<ul class="fileInfo">
							<div class="buttonGroup right">
								<li class="btnElement delete" onclick="delFile('`+file.filePath+`','`+file.fileName+`')"><i class="bi bi-trash-fill"></i></li>
							</div>
							<li> 
								<form method="post">
									<b>DirName:</b><input id="fileName" type="text" value="`+fileSplit[0]+`" />
									<script>
									  fileName.oninput = function() {
										console.log($("#fileName").val());
									  }
									</script>
									<input type="hidden" value="fileRename" id="fAction">
								</form>
						</ul>`;
			break;
			
			case false:
			 fileInfo = `<ul class="fileInfo">
							<div class="buttonGroup right">
								<li class="btnElement delete" onclick="delFile('`+file.filePath+`','`+file.fileName+`')"><i class="bi bi-trash-fill"></i></li>
							</div>
							<li> 
								<form method="post">
									<b>FileName:</b><input id="fileName" type="text" value="`+fileSplit[0]+`" />.`+fileSplit[1]+`
									<script>
									  fileName.oninput = function() {
										console.log($("#fileName").val());
									  }
									</script>
									<input type="hidden" value="fileRename" id="fAction">
								</form>
							</li>
							<li><b>FileSize:</b> `+file.fileSize+`</li>
							<li><b>Download:</b> <a href="`+fileLocation+`">`+file.fileName+`</a></li>
						</ul>`;
			break;
		}

		$(CONFIG.get('FILEINFO_BLOCK')).html(fileInfo);
	}