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

    async loadPage(page, block = this.foxEngine.replaceData.contentBlock) {
        const cleanPage = page.split('?')[0];
        if (cleanPage === this.selectPage.thisPage) return;

        try {
            const response = await this.foxEngine.sendPostAndGetAnswer({ "getOption": cleanPage }, "TEXT");

            if (!this.foxEngine.utils.isJson(response)) {
                const responseHTML = this.foxEngine.parseResponseHTML(response);
                const option = this.foxEngine.utils.getData(responseHTML, 'useroption');

                if (option) {
                    const jsonOption = JSON.parse(option.textContent);
                    await this.handlePageOptions(jsonOption);

                    if (this.foxEngine.entryReplacer) {
                        const replacedContent = await this.foxEngine.entryReplacer.replaceText(responseHTML.body.innerHTML);
                        await this.loadData(replacedContent, block);
                        this.updateNavigation(cleanPage);
                    } else {
                        console.error("Invalid or undefined foxEngine.entryReplacer.replaceText");
                    }
                }

                this.removeUserOptionElement();
                //this.scrollToBlock(block);
            } else {
                await this.foxEngine.utils.showErrorPage(response, block);
                this.setPage("");
            }
        } catch (error) {
            console.error("Error loading page:", error);
        }
    }

    async getPage(page) {
        try {
            const response = await this.foxEngine.sendPostAndGetAnswer({ "getOption": page }, "HTML");
            const option = this.foxEngine.utils.getData(response, 'useroption');

            if (option) {
                const jsonOption = JSON.parse(option.textContent);
                await this.handlePageOptions(jsonOption);

                let data = await this.foxEngine.entryReplacer.replaceText(response.body.innerHTML);
                if (data?.includes('<section class="gallery"')) {
                    new Gallery(this.foxEngine, data).loadGallery();
                }

                return data;
            }

            console.error('Page option not found.');
            return null;
        } catch (error) {
            console.error("Error fetching page:", error);
            return null;
        }
    }

    async loadLangPack(langPackKey) {
        try {
            const langText = await this.foxEngine.sendPostAndGetAnswer({ sysRequest: "getLangPack", langPackKey }, "JSON");
            return langText || null;
        } catch (error) {
            console.error("Error loading language pack:", error);
            return null;
        }
    }

    updateMetaTags(jsonOption) {
        this.metaTags.forEach(tagName => {
            const content = jsonOption[tagName];
            if (content) {
                let metaTag = document.querySelector(`meta[name="${tagName}"]`);
                if (!metaTag) {
                    metaTag = document.createElement('meta');
                    metaTag.name = tagName;
                    document.head.appendChild(metaTag);
                }
                metaTag.setAttribute('content', content);
            }
        });
    }

    async loadData(data, block) {
        $(block).fadeOut(500, () => {
            if (data?.includes('<section class="gallery"')) {
                new Gallery(this.foxEngine, data).loadGallery();
            }

            $(block).html(data).fadeIn(500);
            this.foxEngine.foxesInputHandler.formInit(500, data);
        });
    }

    setPage(page) {
        document.querySelectorAll('.selectedPage').forEach(el => el.classList.remove('selectedPage'));
        const newPageLink = document.querySelector(`.pageLink-${page}`);
        if (newPageLink) newPageLink.classList.add('selectedPage');

        this.selectPage.thatPage = this.selectPage.thisPage;
        this.selectPage.thisPage = page;
    }

    async handlePageOptions(jsonOption) {
        if (jsonOption.langPack) {
            this.langPack = await this.loadLangPack(jsonOption.langPack);
        }

        if (jsonOption.onLoad) {
            const func = `${jsonOption.onLoad}${jsonOption.onLoadArgs ? `(${jsonOption.onLoadArgs})` : ''}`;
            setTimeout(() => {
                try {
                    eval(func);
                } catch (error) {
                    console.error("Error executing onLoad function:", error);
                }
            }, 500);
        }

        this.updateMetaTags(jsonOption);
    }

    updateNavigation(cleanPage) {
        this.setPage(cleanPage);
        location.hash = `#page/${cleanPage}`;
    }

    removeUserOptionElement() {
        const userOption = document.querySelector("#content > div > div.page-content > useroption");
        if (userOption) userOption.remove();
    }

    scrollToBlock(block) {
        const contentBlock = document.querySelector(block);
        if (contentBlock) {
            window.scrollTo({
                top: contentBlock.offsetTop,
                behavior: 'smooth'
            });
        }
    }
}
