import { FileTree } from './Filetree.js';
export class TemplateEditor {
    constructor() {
        this.currentLevel = 0;
        this.dirNum = 0;
        this.openedDirs = new Set();
    }

    async parseTemplateEditor(path = "/") {
        let fileTree = await foxEngine.sendPostAndGetAnswer({ "admPanel": "scanTemplates", "path": path }, "JSON");
        $("#adminContent").html(await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/templateEditor/templateEditor.tpl'));
        this.buildFileTree(fileTree, "#filetree");
    }

    formatFileTreeData(data) {
        var formattedData = [];
        data.forEach(function(item) {
            var formattedItem = {
                name: item.name,
                type: item.type
            };

            if (item.type === 'directory' && item.children) {
                formattedItem.children = this.formatFileTreeData(item.children);
            }

            formattedData.push(formattedItem);
        });

        return formattedData;
    }

    buildFileTree(data, containerId) {
        $(containerId).empty();
		
		const options = {
			data: data,
			root: '/foxengine2',
			container: containerId,
			folderEvent: 'click',
            expandSpeed: 750,
            collapseSpeed: 750,
            multiFolder: false
		};

		const file = (rel) => {
			// Handle file selection
		};
		
		const myFileTree = new FileTree(options, file);
		myFileTree.build();
		//myFileTree.onChangeCheckbox();
    }
}
