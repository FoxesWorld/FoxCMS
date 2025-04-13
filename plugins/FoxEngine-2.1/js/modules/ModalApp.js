export class ModalApp {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.modalAppDisplayed = false;
        this.closeCallback = null;
    }

    async showModalApp(width, title, html, closeCallback) {
        if (this.modalAppDisplayed) {
            return;
        }

        this.closeCallback = closeCallback;
		let modalTpl = this.foxEngine.templateCache["modalApp"];
		
		const data = await this.foxEngine.replaceTextInTemplate(modalTpl, {
                    title:             title,
                    content: 			await this.foxEngine.entryReplacer.replaceText(html)
                });

        $(".modal_app").css("width", width);
        $(".modal_app").empty();
		$(".modal_app").append(data);
		/*
        $(".modal_app").append(`
            <div class="modal_app_close" onclick="foxEngine.modalApp.closeModalApp(true);"></div>
            <div class="modal_app_title">${title}</div>
            <div class="modal_app_content"></div>
        `);
        $(".modal_app_content").html(await this.foxEngine.entryReplacer.replaceText(html));
		*/

        $(".container").addClass("modal_open_body");
        $(".modal_wrapper").css("display", "flex");

        $(".modal_app").addClass("show_animation");
        $(".modal_wrapper").fadeTo(300, 1.0, () => {
            $(".modal_app").on("click", (event) => {
                event.stopPropagation();
            });

            $(".modal_wrapper").on("click", (event) => {
                event.preventDefault();
                this.closeModalApp(true);
            });

            this.modalAppDisplayed = true;
        });

        this.foxEngine.foxesInputHandler.formInit(500);
    }

    closeModalApp(executeCallback = false) {
        if (!this.modalAppDisplayed) {
            return;
        }

        $(".modal_app").removeClass("show_animation");

        $(".modal_wrapper").fadeTo(300, 0.0, () => {
            $(".modal_wrapper").hide();
            $(".modal_app").empty();
            $(".container").removeClass("modal_open_body");

            if (executeCallback && typeof this.closeCallback === 'function') {
                this.closeCallback();
            }
        });

        this.modalAppDisplayed = false;
    }

    addCloseButton(callback) {
        this.closeCallback = callback;
        $(".modal_app").append(`<div class="modal_app_close" onclick="foxEngine.modalApp.closeModalApp(true);"></div>`);
    }

    redirectTo(location) {
        window.location = location;
        console.log("Перенаправляем на -> " + location);
    }
}
