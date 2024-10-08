import { Gallery } from './Gallery/Gallery.js';

export class Page {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.metaTags = ['description', 'keywords'];
        this.langPack = [];
        this.selectPage = {
            thisPage: "",
            thatPage: ""
        };
    }

    async loadPage(page, block) {
		const cleanPage = page.split('?')[0];
        if (cleanPage === this.selectPage.thisPage) {
            return;
        }
        block = block || this.foxEngine.replaceData.contentBlock;

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const response = await this.foxEngine.sendPostAndGetAnswer({ "getOption": cleanPage }, "TEXT");

        if (!this.foxEngine.utils.isJson(response)) {
            const responseHTML = this.foxEngine.parseResponseHTML(response);
            const option = this.foxEngine.utils.getData(responseHTML, 'useroption');
            const content = this.foxEngine.utils.getData(responseHTML, 'pageContent');

            if (option) {
                const jsonOption = JSON.parse(option.textContent);
                if (jsonOption.langPack) {
                    this.langPack = await this.loadLangPack(jsonOption.langPack);
                }
                if (jsonOption.onLoad) {
                    const func = jsonOption.onLoad + (jsonOption.onLoadArgs ? `(${jsonOption.onLoadArgs})` : '');
                    setTimeout(() => {
                        eval(func);
                    }, 500);
                }

                if (this.foxEngine.entryReplacer) {
                    await this.loadData(await this.foxEngine.entryReplacer.replaceText(responseHTML.body.innerHTML), block);
                    this.setPage(cleanPage);
                    location.hash = `#page/${cleanPage}`;
                } else {
                    console.error("Invalid or undefined foxEngine.entryReplacer.replaceText");
                }
                this.updateMetaTags(jsonOption);
            }
            $("#content > div > div.page-content > useroption").remove();
        } else {
            await this.foxEngine.utils.showErrorPage(response, block);
			this.setPage("");
        }
    }

    async getPage(page) {
        const response = await this.foxEngine.sendPostAndGetAnswer({ "getOption": page }, "HTML");
        const option = this.foxEngine.utils.getData(response, 'useroption');

        if (option) {
            const jsonOption = JSON.parse(option.textContent);
            if (jsonOption.langPack) {
                this.langPack = await this.loadLangPack(jsonOption.langPack);
            }
            if (jsonOption.onLoad) {
                const func = jsonOption.onLoad + (jsonOption.onLoadArgs ? `(${jsonOption.onLoadArgs})` : '');
                setTimeout(() => {
                    eval(func);
                }, 500);
            }

            let data = await this.foxEngine.entryReplacer.replaceText(response.body.innerHTML);

            if (data && data.includes('<section class="gallery"')) {
                const galleryInstance = new Gallery(this.foxEngine, data);
                galleryInstance.loadGallery();
            }

            return data;
        } else {
            console.error('Page option not found.');
            return null;
        }
    }

    async loadLangPack(langPackKey) {
        const langText = await this.foxEngine.sendPostAndGetAnswer({ sysRequest: "getLangPack", langPackKey }, "JSON");
        return langText || null;
    }

    updateMetaTags(jsonOption) {
        this.metaTags.forEach(tagName => {
            const content = jsonOption[tagName];
            if (content) {
                let metaTag = document.querySelector(`meta[name="${tagName}"]`);
                if (metaTag) {
                    metaTag.setAttribute('content', content);
                } else {
                    metaTag = document.createElement('meta');
                    metaTag.name = tagName;
                    metaTag.content = content;
                    document.head.appendChild(metaTag);
                }
            }
        });
    }

    async loadData(data, block) {
        $(block).fadeOut(500);
        setTimeout(() => {
            if (data && data.includes('<section class="gallery"')) {
                const galleryInstance = new Gallery(this.foxEngine, data);
                galleryInstance.loadGallery();
            }

            $(block).html(data).fadeIn(500);
            this.foxEngine.foxesInputHandler.formInit(500, data);
        }, 500);
    }

    setPage(page) {
        document.querySelectorAll('.selectedPage').forEach(el => el.classList.remove('selectedPage'));

        const newPageLink = document.querySelector(`.pageLink-${page}`);
        if (newPageLink) {
            newPageLink.classList.add('selectedPage');
        }

        this.selectPage.thatPage = this.selectPage.thisPage;
        this.selectPage.thisPage = page;
    }
}
