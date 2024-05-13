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
		if (page === this.selectPage.thisPage || this.selectPage.thisPage === undefined) {
			return;
		}
		block = block ? block : foxEngine.replaceData.contentBlock;

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		const response = await this.foxEngine.sendPostAndGetAnswer({
			"getOption": page
		}, "TEXT");
		
		if(! this.foxEngine.utils.isJson(response)) {
			let responseHTML = this.foxEngine.parseResponseHTML(response);
			const option = this.foxEngine.utils.getData(responseHTML, 'useroption');
			const content = this.foxEngine.utils.getData(responseHTML, 'pageContent');

			if (option !== undefined) {
				const jsonOption = JSON.parse(option.textContent);
				if(jsonOption.langPack !== undefined) {
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
					this.setPage(page);
					location.hash = '#page/' + page;
				} else {
					console.error("Invalid or undefined foxEngine.entryReplacer.replaceText");
				}
				let thisTag;
				for(let j = 0; j < this.metaTags.length; j++){
					thisTag = this.metaTags.at(j);
					this.updateMetaTags(jsonOption[thisTag], thisTag);
				}
			}
			$("#content > div > div.page-content > useroption").remove();
		} else {
			await this.foxEngine.utils.showErrorPage(response, block);
		}
	}
	
	   async getPage(page) {
        const response = await this.foxEngine.sendPostAndGetAnswer({
            "getOption": page
        }, "HTML");

        const option = this.foxEngine.utils.getData(response, 'useroption');
        const content = this.foxEngine.utils.getData(response, 'pageContent');

        if (option !== undefined) {
            const jsonOption = JSON.parse(option.textContent);
            if (jsonOption.langPack !== undefined) {
                this.langPack = await this.loadLangPack(jsonOption.langPack);
            }
            if (jsonOption.onLoad) {
                const func = jsonOption.onLoad + (jsonOption.onLoadArgs ? `(${jsonOption.onLoadArgs})` : '');

                setTimeout(() => {
                    eval(func);
                }, 500);
            }

            let data = await this.foxEngine.entryReplacer.replaceText(response.body.innerHTML);

            // Check if the page contains a gallery section
            if (data && String(data).indexOf('<section class="gallery"') > 0) {
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
		let langText = await this.foxEngine.sendPostAndGetAnswer({sysRequest: "getLangPack", langPackKey: langPackKey}, "JSON");
        return langText || null;
    }

	updateMetaTags(content, tagName) {
		if (content && content.length > 0) {
			const metaTag = $(`meta[name="${tagName}"]`);
			if (metaTag.length > 0) {
				metaTag.attr('content', content);
			} else {
				// If the meta tag doesn't exist, create it
				$('head').append(`<meta name="${tagName}" content="${content}">`);
			}
		}
	}

    async loadData(data, block) {
        $(block).fadeOut(500);

        setTimeout(() => {
            if (data && String(data).indexOf('<section class="gallery"') > 0) {
                const galleryInstance = new Gallery(this.foxEngine, data);
                galleryInstance.loadGallery();
            }

            $(block).html(data).fadeIn(500);
            this.foxEngine.foxesInputHandler.formInit(500, data);
        }, 500);
    }

    setPage(page) {
        $(".pageLink-" + page).addClass("selectedPage");

        if (page !== this.selectPage.thisPage) {
            this.selectPage.thatPage = this.selectPage.thisPage;
            $(".pageLink-" + this.selectPage.thatPage).removeClass("selectedPage");
        }

        this.selectPage.thisPage = page;
    }
}