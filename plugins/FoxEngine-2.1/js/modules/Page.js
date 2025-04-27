import {
    Gallery
} from './Gallery/Gallery.js';

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

    /**
     * Основной метод загрузки страницы с эффектом затемнения и скелетоном.
     */
    async loadPage(page, block = this.foxEngine.replaceData.contentBlock) {
        const cleanPage = page.split('?')[0];
        if (cleanPage === this.selectPage.thisPage) return;

        // Подготовка блока
        if (typeof block === 'string') {
            block = document.querySelector(block);
        }
        if (!block || typeof block.appendChild !== 'function') {
            console.error("❌ Invalid block passed to loadPage:", block);
            return;
        }

        // Эпичный overlay
        const overlay = this.createLoadingOverlay(block);
        block.appendChild(overlay);

        try {
            await this.fadeIn(overlay, 300);

            const response = await this.foxEngine.sendPostAndGetAnswer({
                getOption: cleanPage
            }, "TEXT");

            if (!this.foxEngine.utils.isJson(response)) {
                const responseHTML = this.foxEngine.parseResponseHTML(response);
                const option = this.foxEngine.utils.getData(responseHTML, 'useroption');

                if (option) {
                    const jsonOption = JSON.parse(option.textContent);
                    await this.handlePageOptions(jsonOption);

                    if (this.foxEngine.entryReplacer) {
                        const replacedContent = await this.foxEngine.entryReplacer.replaceText(responseHTML.body.innerHTML);

                        // Убираем overlay перед подстановкой данных
                        await this.fadeOut(overlay, 300);
                        block.removeChild(overlay);

                        await this.loadData(replacedContent, block);
                        this.updateNavigation(cleanPage);
                    } else {
                        console.error("Invalid or undefined foxEngine.entryReplacer.replaceText");
                    }
                }

                this.removeUserOptionElement();
                this.scrollToBlock(block, 120);
            } else {
                // Если вернулся JSON — ошибка загрузки страницы
                await this.fadeOut(overlay, 300);
                block.removeChild(overlay);

                await this.foxEngine.utils.showErrorPage(response, block);
                this.setPage("");
            }
        } catch (error) {
            console.error("Error loading page:", error);
            try {
                await this.fadeOut(overlay, 300);
                block.removeChild(overlay);
            } catch (e) {
                console.error("Error removing overlay after exception:", e);
            }
        }
    }

    /**
     * Создает загрузочный overlay с центральным спиннером поверх блока.
     * @param {HTMLElement} block
     * @returns {HTMLElement} overlay
     */
    createLoadingOverlay(block) {
        const overlay = document.createElement('div');
        const spinner = document.createElement('div');

        const blockRect = block.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(block);

        // Убедимся, что родитель имеет позицию relative
        if (computedStyle.position === 'static') {
            block.style.position = 'relative';
        }

        // Настройка overlay (фон скелетона)
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = blockRect.height + 'px';
        overlay.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)';
        overlay.style.backgroundSize = '400% 100%';
        overlay.style.animation = 'loadingAnimation 1.4s ease infinite';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 300ms ease';
        overlay.style.pointerEvents = 'none'; // overlay не мешает кликам
        overlay.style.zIndex = '9999';

        // Настройка спиннера (центральный элемент)
        spinner.style.position = 'absolute';
        spinner.style.top = '50%';
        spinner.style.left = '50%';
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.margin = '-25px 0 0 -25px'; // смещение на половину размера
        spinner.style.border = '6px solid #ccc';
        spinner.style.borderTop = '6px solid #333';
        spinner.style.borderRadius = '50%';
        spinner.style.animation = 'spin 1s linear infinite';

        // Вкладываем спиннер внутрь оверлея
        overlay.appendChild(spinner);

        return overlay;
    }


    /**
     * Плавное появление элемента.
     * @param {HTMLElement} element — Элемент для появления.
     * @param {number} duration — Длительность анимации в миллисекундах.
     */
    fadeIn(element, duration = 300) {
        return new Promise(resolve => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '1';
            setTimeout(resolve, duration);
        });
    }

    /**
     * Плавное исчезновение элемента.
     * @param {HTMLElement} element — Элемент для исчезновения.
     * @param {number} duration — Длительность анимации в миллисекундах.
     */
    fadeOut(element, duration = 300) {
        return new Promise(resolve => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
            setTimeout(resolve, duration);
        });
    }


    createLoadingOverlay(block) {
        const overlay = document.createElement("div");
        overlay.className = "fox-loading-overlay";
        overlay.innerHTML = `<div class="fox-spinner"></div>`;
        return overlay;
    }

    fadeIn(element, duration = 300) {
        return new Promise(resolve => {
            element.style.opacity = 0;
            element.style.display = 'block';
            requestAnimationFrame(() => {
                element.style.transition = `opacity ${duration}ms ease`;
                element.style.opacity = 1;
                setTimeout(resolve, duration);
            });
        });
    }

    async getPage(page) {
        try {
            const response = await this.foxEngine.sendPostAndGetAnswer({
                getOption: page
            }, "HTML");
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

    loadLangPack(langPackKey) {
        return new Promise(async (resolve, reject) => {
            try {
                const langText = await this.foxEngine.sendPostAndGetAnswer({
                    sysRequest: "getLangPack",
                    langPackKey
                }, "JSON");
                resolve(langText || null);
            } catch (error) {
                console.error("Error loading language pack:", error);
                reject(error);
            }
        });
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

    /**
     * Загрузка данных с обновлением содержимого блока.
     * Выполнение манипуляций происходит только после полной готовности страницы.
     */
    async loadData(data, block) {
        return new Promise((resolve) => {
            $(document).ready(() => {
                $(block).fadeOut(500, () => {
                    if (data?.includes('<section class="gallery"')) {
                        new Gallery(this.foxEngine, data).loadGallery();
                    }
                    $(block).html(data).fadeIn(500, () => {
                        this.foxEngine.foxesInputHandler.formInit(500, data);
                        resolve(); // ✅ сигнал завершения
                    });
                });
            });
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

    scrollToBlock(block, offset = 10) {
        let $el;

        if (typeof block === 'string') {
            $el = $(block);
        } else {
            $el = $(block);
        }

        if (!$el.length) {
            console.warn("scrollToBlock: Элемент не найден");
            return;
        }

        const targetY = $el.offset().top - offset;

        console.log("scrollToBlock →", {
            offsetTop: $el.offset().top,
            offset,
            targetY
        });

        $("html, body").stop().animate({
            scrollTop: targetY
        }, 400); // 400 мс — стандартная скорость анимации
    }

}