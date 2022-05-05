	var CONFIG = (function() {
		 var private = {
			 'BIND_BLOCK': '#pageData',
			 'FILEINFO_BLOCK': '#fileInfo',
			 'HOME': `<div class="buttonGroup">
						<div onclick='scanDir({"scanDir": ""})'>
							<i class="bi bi-house-door-fill" ></i>
						</div>
					  </div>`
		 };
		 return {
			get: function(name) {return private[name];}
		};
	})();

	function scanDir(data){
		let answer = request.send_post(data);
		let filesBlock = [];
		let filesArray = [];
		filesBlock.push(CONFIG.get('HOME'));
		answer.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					$(CONFIG.get('BIND_BLOCK')).fadeOut(500);
					let response = JSON.parse(this.responseText);
					
							/*EachFile scanning*/
							response.forEach(value => {
								let fileAppearence;
								let fileData = new Object();
									fileData.fileName = value.name;
									fileData.dir = value.dir;
									fileData.fileSize = value.fileSize;
									fileData.filePath = value.filePath;
								switch(value.dir){
									case true:
										fileAppearence = `<ul class="directory file" onclick='scanDir({"scanDir": "`+fileData.fileName+`"})'>
															<br />
															<li class="filename">`+fileData.fileName+`</li>
														 </ul>`;
									break;
									
									case false:
										let fileExpr = value.name.split('.')[1];
										switch(fileExpr){
											case 'jpg':
											case 'png':
												fileAppearence = `<ul class="file">
																		<li>
																			<img src="`+fileData.filePath+`/`+fileData.fileName+`">
																		</li>
																		<li class="filename">`+fileData.fileName+`</li>
																  </ul>`;
											break;

											default:
												fileAppearence = `<ul class="file" onclick='FileInfo(`+JSON.stringify(fileData)+`)'>
																	<li class="file-icon" data-file="`+fileExpr+`"></li>
																	<li class="filename">`+fileData.fileName+`</li>
																  </ul>`;
											break;
										}

									break;
								}
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
	
	function FileInfo(file){
		let fileInfo = `<ul>
							<li><b>FileName:</b> `+file.fileName+`</li>
							<li><b>FileSize:</b> `+file.fileSize+`</li>
							<li><b>Download:</b> <a href="`+file.filePath+file.fileName+`">`+file.fileName+`</a></li>
						</ul>`;
		$(CONFIG.get('FILEINFO_BLOCK')).html(fileInfo);
	}