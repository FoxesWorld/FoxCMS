	var CONFIG = (function() {
		 var private = {
			'BIND_BLOCK': '#pageData',
			'FILEINFO_BLOCK': '#fileInfo',
			'BTN_GROUP': '<div class="buttonGroup left">{btns}</div>',
			'FILE_PATTERN': '<ul class="file" {additional}><li>{file}</li></ul>',
			'BTNS': [
				{"home": `<div class="btnElement home" onclick='scanDir({"fAction":"scanDir","dirScan":""})'><i class="bi bi-house-door-fill" ></i></div>`}//,
				//{"refresh": `<i class="bi bi-house-door-fill" ></i>`}
			]
		 };
		 return {
			get: function(name) {return private[name];}
		};
	})();

	function scanDir(data){
		let answer = request.send_post(data);
		let filesBlock = [];
		let filesArray = [];
		filesBlock.push(CONFIG.get('BTN_GROUP').replace('{btns}', addBtns()));
		answer.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					$(CONFIG.get('BIND_BLOCK')).fadeOut(500);
					let response = JSON.parse(this.responseText);
					
							/*EachFile scanning*/
							response.forEach(value => {
								let fileAppearence;
								/* DEFINING FILeinfo */
								let fileData = new Object();
									fileData.fileName = value.name;
									fileData.dir = value.dir;
									fileData.fileSize = value.fileSize;
									fileData.filePath = value.filePath;
									
								fileAppearence = fileDirDisplay(fileData);
								filesArray.push(fileAppearence);
							});
					filesBlock = filesBlock.concat(filesArray);
					$(CONFIG.get('BIND_BLOCK')).fadeIn(500);
					setTimeout(() => {
						$(CONFIG.get('BIND_BLOCK')).html(filesBlock);
					}, 500);
			};
		}
	}
	
	function addBtns (){
		let buttons = $(CONFIG.get('BTNS'));
		let outStr = [];
		$.each(buttons, function(key, val) {
			 $.each(val, function(k, v) {
				 outStr.push(v);
			 });
		 });
		 return outStr;
	}
	
	function fileDirDisplay(fileData){
		let filePattern = CONFIG.get('FILE_PATTERN');
		let additional;
		let appearence = '';
		switch(fileData.dir){
			case true:
				additional = `onclick='scanDir({"fAction": "scanDir", "dirScan": "`+fileData.fileName+`"})'`;
				appearence = `<img class="directory" alt="`+fileData.fileName+`" />
							  <span class="filename">`+fileData.fileName+`</span>`;
			break;
			
			case false:
				additional = `onclick='FileInfo(`+JSON.stringify(fileData)+`)'`;
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
				fileAppearence = `<img class="imgPreview" src="`+fileData.filePath+fileData.fileName+`">
								 <span>`+fileData.fileName+`</span>`;
			break;
											
			case 'mp3':
			case 'ogg':
			case 'wav':
				fileAppearence = `<audio controls>
											<source src="`+fileData.filePath+`/`+fileData.fileName+`" type="audio/mpeg">
										</audio>
										<span>`+fileData.fileName+`</span>
								 `;
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
			let response = JSON.parse(this.responseText);
			switch(response.type){
				case 'info':
					scanDir({"fAction": "scanDir", "dirScan": action.fPath});
				break;
				
				case 'warn':
				break;
			}
			$(CONFIG.get('FILEINFO_BLOCK')).notify(response.message, response.type);
		}
	}
	
	function FileInfo(file){
		let fileSplit = file.fileName.split('.');
		let fileLocation = file.filePath+file.fileName;
		let fileInfo = `<ul class="fileInfo">
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
		$(CONFIG.get('FILEINFO_BLOCK')).html(fileInfo);
	}