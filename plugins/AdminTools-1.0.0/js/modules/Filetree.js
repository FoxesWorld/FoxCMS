export class FileTree {
    constructor(options, file) {
        // Default options
        const defaultOptions = {
            root: '/',
            data: [],
            folderEvent: 'click',
            expandSpeed: 500,
            collapseSpeed: 500,
            expandEasing: null,
            collapseEasing: null,
            multiFolder: true,
            loadMessage: 'Loading...',
            multiSelect: false,
            container: '.fileTreeContainer' // Adjust as needed
        };

        this.options = { ...defaultOptions, ...options };
        this.file = file;
        this.activeFileName = null; // To store the name of the active file
    }

    build() {
        document.querySelectorAll(this.options.container).forEach(element => {
            this.showTree(element, this.options.data);
        });
    }

    showTree(element, data, parentPath = '') {
        $(element).addClass('wait');
        $(".jqueryFileTree.start").remove();
        $(element).find('.start').html('');
        $(element).removeClass('wait').append(this.buildTreeHtml(data, parentPath));
        $(element).find('UL:hidden').slideDown({
            duration: this.options.expandSpeed,
            easing: this.options.expandEasing
        });
        this.bindTree(element);
        this.bindKeyboardNavigation(element);
    }

    buildTreeHtml(data, parentPath = '') {
        data.sort((a, b) => {
            if (a.type === 'directory' && b.type === 'file') {
                return -1; // Directories before files
            } else if (a.type === 'file' && b.type === 'directory') {
                return 1; // Files after directories
            } else {
                return 0; // Keep the order unchanged
            }
        });

        let html = '<ul class="jqueryFileTree start">';
        data.forEach(item => {
            const fullPath = parentPath ? `${parentPath}/${item.name}` : `/${item.name}`;
            if (item.type === 'file') {
                const ext = this.getFileExtension(item.name);
                const activeClass = item.name === this.activeFileName ? 'active' : '';
                html += `<li class="file ${ext} ${activeClass}" data-name="${item.name}" data-path="${fullPath}">${item.name}</li>`;
            } else {
                html += `<li class="directory closed" data-path="${fullPath}">${item.name}`;
                if (item.children && item.children.length > 0) {
                    html += `<ul>${this.buildTreeHtml(item.children, fullPath)}</ul>`;
                } else {
                    html += '</li>'; // Close the directory tag if it has no children
                }
            }
        });
        html += '</ul>';
        return html;
    }

	async handleFileClick(fileName, filePath) {
		const fileEditor = $('.fileEditor');
		const prefixedFilePath = "/templates/" + filePath;
		const ext = fileName.split('.').pop().toLowerCase();
		
		let previewContent;

		switch (ext) {
			case 'mp3':
				previewContent = `<div class="preview"><ul> <li><audio controls autoplay src="${prefixedFilePath}">Your browser does not support the audio element.</audio></li> <li><span>${fileName}</span></li></ul></div>`;
				break;
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'svg':
			case 'gif':
				previewContent = `<div class="preview"><ul> <li><img src="${prefixedFilePath}" alt="${fileName}" /></li> <li><span>${fileName}</span></li></div>`;
				break;
				
			case 'tpl':
			case 'ftpl':
			case 'css':
			case 'js':
			case 'html':
			case undefined:
				const editorTpl = await foxEngine.loadTemplate(foxEngine.elementsDir + 'editor.tpl');
				previewContent = await foxEngine.replaceTextInTemplate(editorTpl, 
				{
					content: await this.readFile(prefixedFilePath),
					filePath: filePath,
					fileName: fileName
				});
			break;
			default:
				previewContent = `<p>No preview available for ${fileName}</p>`;
				break;
		}

		fileEditor.html(previewContent);
		this.activeFileName = fileName;
	}
	
	async readFile(path){
		let fileContents = await foxEngine.sendPostAndGetAnswer({"admPanel": "readFile", "path": path}, "TEXT");
		return fileContents;
	}



	bindTree(element) {
		const self = this;

		$(element).on('click', 'li.file', function(event) {
			const fileItem = $(this);
			if (fileItem.hasClass('active')) {
				return;
			}

			const fileName = fileItem.data('name');
			const filePath = fileItem.data('path');
			//console.log('Clicked File:', fileName);
			//console.log('File Path:', filePath);

			self.handleFileClick(fileName, filePath);

			$(element).find('.file.active').removeClass('active');
			fileItem.addClass('active');

			event.stopPropagation();
		});

		$(element).on(this.options.folderEvent, 'li.directory', function(event) {
			const parentLi = $(this);
			const childUl = parentLi.find('ul');
			if (childUl.css('display') === 'block') {
				childUl.css('display', 'none');
				parentLi.removeClass('opened').addClass('closed');
			} else {
				childUl.css('display', 'block');
				parentLi.removeClass('closed').addClass('opened');
			}
			event.stopPropagation();
		});
	}


    getFileExtension(fileName) {
        const ext = fileName.split('.').pop();
        return `ext_${ext}`;
    }

	bindKeyboardNavigation(element) {
		$(element).on('keydown', (event) => {
			const activeElement = $(document.activeElement);
			const isFile = activeElement.hasClass('file');
			const isDirectory = activeElement.hasClass('directory');
			const isFileTreeContainer = activeElement.hasClass('fileTreeContainer');

			if (isFile || isDirectory) {
				switch (event.key) {
					case 'ArrowUp':
						event.preventDefault();
						this.moveFocusUp(activeElement[0]);
						break;
					case 'ArrowDown':
						event.preventDefault();
						this.moveFocusDown(activeElement[0]);
						break;
					case 'ArrowLeft':
						event.preventDefault();
						if (isDirectory && activeElement.hasClass('opened')) {
							this.toggleDirectory(activeElement[0]);
						} else {
							this.moveFocusToParent(activeElement[0]);
						}
						break;
					case 'ArrowRight':
						event.preventDefault();
						if (isDirectory && activeElement.hasClass('closed')) {
							this.toggleDirectory(activeElement[0]);
						}
						break;
					default:
						break;
				}
			} else if (isFileTreeContainer) {
				const firstFile = $(element).find('.file').first();
				if (firstFile.length) {
					firstFile.focus();
				} else {
					const firstDirectory = $(element).find('.directory').first();
					if (firstDirectory.length) {
						firstDirectory.focus();
					}
				}
			}
		});
	}

    moveFocusUp(activeElement) {
        const previousElement = activeElement.previousElementSibling;
        if (previousElement) {
            previousElement.focus();
        }
    }

    moveFocusDown(activeElement) {
        const nextElement = activeElement.nextElementSibling;
        if (nextElement) {
            nextElement.focus();
        }
    }

    moveFocusToParent(activeElement) {
        const parentElement = activeElement.parentElement.parentElement;
        if (parentElement && parentElement.classList.contains('directory')) {
            parentElement.focus();
        }
    }

    toggleDirectory(activeElement) {
        const childUl = activeElement.querySelector('ul');
        if (childUl.style.display === 'block') {
            childUl.style.display = 'none';
            activeElement.classList.remove('opened');
            activeElement.classList.add('closed');
        } else {
            childUl.style.display = 'block';
            activeElement.classList.remove('closed');
            activeElement.classList.add('opened');
        }
    }
}