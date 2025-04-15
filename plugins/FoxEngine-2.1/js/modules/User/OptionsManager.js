export class OptionsManager {
    constructor(foxEngine, apiService) {
        this.foxEngine = foxEngine;
        this.apiService = apiService;
        this.optionAmount = 0;
        this.optionArray = [];
        this.optNamesArr = [];
    }

    async loadOptions(userLogin) {
        const json = await this.apiService.request({ getUserOptionsMenu: userLogin });
        this.optionAmount = json.optionAmount || 0;
        this.optionArray = Array.isArray(json.optionArray) ? json.optionArray : [];

        this.foxEngine.log(`UserOptions available: ${this.optionAmount}`);
        this.optionArray.forEach(optObj => {
            for (const [name, opt] of Object.entries(optObj)) {
                this.renderOption(name, opt);
            }
        });
    }

    renderOption(name, opt) {
        const tpl = OptionsManager.templates[opt.type];
        const html = tpl ? tpl(opt, name) : '';
        if (!html) return;

        const block = document.querySelector(opt.optionBlock);
        if (block) {
            block.insertAdjacentHTML('beforeend', html);
        } else {
            this.foxEngine.log(`Block for option "${name}" not found: ${opt.optionBlock}`, 'WARN');
        }
        this.optNamesArr.push(name);
    }

    static templates = {
        page: ({ optionClass, optionPreText, optionTitle }, name) => `
            <li class="${optionClass}">
                <a href="#" onclick="foxEngine.page.loadPage('${name}', replaceData.contentBlock); return false;">
                    <div class="rightIcon">${optionPreText}</div>
                    ${optionTitle}
                </a>
            </li>`,
        userOption: ({ optionClass, optionPreText, optionTitle, func }) => `
            <li class="${optionClass}">
                <a href="#" onclick="${func}">
                    <div class="rightIcon">${optionPreText}</div>
                    ${optionTitle}
                </a>
            </li>`,
        plainText: ({ optionTitle }) => optionTitle
    }
}
