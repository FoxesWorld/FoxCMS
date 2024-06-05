export class ModalApp {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.modalAppDisplayed = false;
    }

    async showModalApp(width, html) {
        this.modalAppDisplayed = $(".modal_wrapper").css("display") === 'flex';

        if (this.modalAppDisplayed) {
            return;
        }

        $(".modal_app").css("width", width);
        $(".modal_app").empty();
        $(".modal_app").html(await foxEngine.entryReplacer.replaceText(html));

        $(".container").addClass("modal_open_body");
        $(".modal_wrapper").css("display", "flex");

        $(".modal_app").addClass("show_animation");
        $(".modal_wrapper").fadeTo(300, 1.0, () => {
            $(".modal_app").on("click", function(event) {
                event.stopPropagation();
            });

            $(".modal_wrapper").on("click", (event) => {
                event.preventDefault();
                this.closeModalApp();
            });

            this.modalAppDisplayed = true;
        });
		this.foxEngine.foxesInputHandler.formInit(500);
    }

    closeModalApp() {

        if (!this.modalAppDisplayed) {
            return;
        }

        $(".modal_app").removeClass("show_animation");

        $(".modal_wrapper").fadeTo(300, 0.0, function() {
            $(".modal_wrapper").hide();
            $(".modal_app").empty();
            $(".container").removeClass("modal_open_body");
        });

        this.modalAppDisplayed = false;
    }

    redirectTo(location) {
        window.location = location;
        console.log("Перенаправляем на -> " + location);
    }

}