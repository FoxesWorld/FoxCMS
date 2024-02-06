export class TemplateEditor {
    constructor() {
        this.currentLevel = 0;
        this.dirNum = 0;
        this.openedDirs = new Set();
    }

    async parseTemplateEditor(path = "/") {
        let fileTree = await foxEngine.sendPostAndGetAnswer({ "admPanel": "scanTemplates", "path": path }, "JSON");
        this.buildTree("#adminContent", fileTree);
    }

    buildTree(parent, data) {
        this.dirNum++;
        if (data && data.length > 0) {
            var ul = document.createElement('ul');
            ul.style.marginLeft = 10 * this.dirNum;
            document.querySelector(parent).appendChild(ul);

            data.forEach((item) => {
                var li = document.createElement('li');
                var icon = document.createElement('i');
                var checkbox = document.createElement('input');

                checkbox.type = 'checkbox';
                checkbox.style.display = 'none';
                checkbox.checked = this.openedDirs.has(this.toSafeCSSClass(item.name));

                icon.appendChild(checkbox);

                if (item.isDirectory) {
                    icon.classList.add('fa', 'fa-folder');
                    li.addEventListener('click', (event) => {
                        event.stopPropagation(); // Остановим всплытие события, чтобы не вызывать событие у родительских элементов
                        const safeName = this.toSafeCSSClass(item.name);

                        if (checkbox.checked) {
                            this.openedDirs.delete(safeName);
                        } else {
                            this.openedDirs.add(safeName);
                        }

                        checkbox.checked = !checkbox.checked;
                        this.parseTemplateEditor("/" + item.name);
                    });
                } else {
                    icon.classList.add('fa', 'fa-file');
                }

                li.appendChild(icon);
                var text = document.createTextNode(item.name);
                li.appendChild(text);

                if (item.isDirectory) {
                    li.classList.add('directory');
                    this.currentLevel++;
                    this.buildTree(li, item.children);
                    li.style.paddingLeft = `${this.currentLevel * 30}px`;
                    this.currentLevel--;

                    // Если директория была ранее открыта, то отмечаем её как открытую
                    const safeName = this.toSafeCSSClass(item.name);
                    if (this.openedDirs.has(safeName)) {
                        checkbox.checked = true;
                        this.toggleDirectory(li, item, true);
                    }
                } else {
                    li.classList.add('file');
                    li.style.paddingLeft = `${this.currentLevel * 10}px`;
                }

                ul.appendChild(li);
            });
        }
    }

    toggleDirectory(li, item, isOpened) {
        const ul = li.querySelector('ul');
        if (ul) {
            // Если ul существует, значит, директория открыта, и мы удаляем его
            li.removeChild(ul);
        } else if (isOpened) {
            // Если ul не существует, значит, директория закрыта, и мы создаем его
            const newUl = document.createElement('ul');
            this.buildTree(newUl, item.children);
            li.appendChild(newUl);
        }
    }

    toSafeCSSClass(name) {
        return name.replace(/[^a-zA-Z0-9_-]/g, '_');
    }
}
