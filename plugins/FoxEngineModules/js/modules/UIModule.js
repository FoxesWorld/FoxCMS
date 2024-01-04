// uiModule.js

//import anime from '../../Anime/js/anime.min.js'; // Подключите Anime.js, если необходимо
import { RequestModule } from './RequestModule.js'; // Замените на фактический путь

const UIModule = (function () {

    /**
     * Animates text properties using the Anime.js library.
     * @param {string} target - The target element selector.
     * @returns {boolean} Returns true upon completion.
     */
    function textAnimate(target) {
        let animation = anime.timeline({
            loop: false
        }).add({
            targets: target,
            scale: [14, 1],
            rotateZ: [180, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: 500
        });
        return true;
    }

    /**
     * Freezes a button, displaying a loading spinner for a specified duration.
     * @param {HTMLElement} button - The button element.
     * @param {number} delay - The delay duration in milliseconds.
     */
    function buttonFreeze(button, delay) {
        let oldValue = button.innerHTML;
        let spinner = '<ul class="list-inline"> <li>Ожидайте</li> <li class="wait"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></li>';
        button.setAttribute('disabled', true);
        button.innerHTML = spinner;

        setTimeout(function () {
            button.innerHTML = oldValue;
            button.removeAttribute('disabled');
        }, delay);
    }

    /**
     * Plays a sound effect on button click.
     * @param {string} type - The type of sound effect.
     */
    function soundOnClick(type) {
        let tplScan = request.send_post({
            sysRequest: "tplScan",
            path: "/assets/snd/" + type
        });

        let sndNum;
        tplScan.onreadystatechange = function () {
            if (tplScan.readyState === 4) {
                let sndAmount = JSON.parse(this.responseText).fileNum;
                sndNum = randomNumber(1, sndAmount);
                if (sndAmount > 0) {
                    var sound = new Howl({
                        src: [replaceData.assets + 'snd/' + type + '/sound' + sndNum + '.mp3'],
                        preload: true,
                    });
                    sound.play();
                }
            }
        }
    };

    /**
     * Splits and wraps letters in a query selector with a specified class.
     * @param {string} query - The query selector for the element to split and wrap.
     * @param {string} letterClass - The class to apply to each letter.
     */
    function splitWrapLetters(query, letterClass) {
        let textWrapper = document.querySelector(query);
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='" + letterClass + "'>$&</span>");
    };
	
	async function loadAndReplaceHtml(filePath, replacements) {
        try {
            let response = await fetch(filePath);

            if (!response.ok) {
                throw new Error('Failed to load HTML content');
            }

            let htmlContent = await response.text();

            // Replace placeholders in the HTML content
            for (let key in replacements) {
                if (replacements.hasOwnProperty(key)) {
                    const regex = new RegExp('{' + key + '}', 'g');
                    htmlContent = htmlContent.replace(regex, replacements[key]);
                }
            }

            return htmlContent;
        } catch (error) {
            console.error(error.message);
            return ''; // Return an empty string or handle the error accordingly
        }
    }

    return {
        textAnimate,
        buttonFreeze,
        soundOnClick,
        splitWrapLetters,
		loadAndReplaceHtml
        // ... (export other UI-related functions)
    };

})();

export { UIModule };
