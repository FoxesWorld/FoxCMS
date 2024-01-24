export class Page {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.selectPage = {
            thisPage: "",
            thatPage: ""
        };
    }

    async loadPage(page, block) {
        if (page === this.selectPage.thisPage || this.selectPage.thisPage === undefined) {
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const response = await this.foxEngine.sendPostAndGetAnswer({
            "getOption": page
        }, "HTML");

        const option = this.foxEngine.utils.getData(response, 'useroption');
        const content = this.foxEngine.utils.getData(response, 'pageContent');

        if (option !== undefined) {
            const jsonOption = JSON.parse(option.textContent);

            if (jsonOption.onLoad) {
                const func = jsonOption.onLoad + (jsonOption.onLoadArgs ? `(${jsonOption.onLoadArgs})` : '');

                setTimeout(() => {
                    eval(func);
                }, 500);
            }

            // Check if foxEngine.entryReplacer is defined
            if (this.foxEngine.entryReplacer) {
                await this.loadData(this.foxEngine.entryReplacer.replaceText(response.body.innerHTML), block);
                this.setPage(page);
                location.hash = '#page/' + page;
            } else {
                console.error("Invalid or undefined foxEngine.entryReplacer.replaceText");
            }
        }

        $(response).find('useroption').remove();
    }


    async loadData(data, block) {
        $(block).fadeOut(500);

        setTimeout(() => {
            if (data && String(data).indexOf('<section class="gallery"') > 0) {
                const galleryInstance = new Gallery(data);
                galleryInstance.loadGallery();
            }

            $(block).html(data).fadeIn(500);
            this.foxEngine.foxesInputHandler.formInit(500);
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