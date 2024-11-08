<style>
.subscribe-popup {
    position: fixed;
    display: flex;
    width: 680px;
    top: 0;
    left: 50%;
    font-family: Graphik,sans-serif;
    border-radius: 20px;
    background-color: #e2dfff;
    padding: 55px 40px 40px 40px;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.1),0 4px 4px 0 rgba(0,0,0,.04);
    z-index: -1
}

@media screen and (min-width: 768px) {
    .subscribe-popup {
        transform:translate(-50%,200vh);
        opacity: 0
    }
}

@media screen and (max-width: 767px) {
    .subscribe-popup {
        position:fixed;
        border-radius: 20px 20px 0 0;
        padding: 24px;
        left: 0;
        bottom: auto;
        width: 100%;
        box-shadow: 0 0 20px 0 rgba(0,0,0,.1),0 4px 4px 0 rgba(0,0,0,.04);
        margin-top: 400px;
        opacity: 0;
        transition: all ease-in-out .3s
    }
}

.subscribe-popup.open {
    z-index: 1005
}

@media screen and (min-width: 768px) {
    .subscribe-popup.open {
        opacity:1;
        -webkit-animation: slide-from-bottom .5s forwards;
        animation: slide-from-bottom .5s forwards
    }
}

@media screen and (max-width: 767px) {
    .subscribe-popup.open {
        margin-top:0;
        opacity: 1;
        transition: all ease-in-out .3s
    }
}

@media screen and (min-width: 768px) {
    .subscribe-popup.close {
        -webkit-animation:slide-to-bottom .5s forwards;
        animation: slide-to-bottom .5s forwards
    }
}

@media screen and (max-width: 767px) {
    .subscribe-popup.close {
        transition:all ease-in .2s;
        opacity: 0
    }
}

@-webkit-keyframes slide-from-bottom {
    0% {
        transform: translate(-50%,-200vh)
    }

    to {
        transform: translate(-50%,0)
    }
}

@keyframes slide-from-bottom {
    0% {
        transform: translate(-50%,-200vh)
    }

    to {
        transform: translate(-50%,0)
    }
}

@-webkit-keyframes slide-to-bottom {
    0% {
        transform: translate(-50%,0)
    }

    to {
        transform: translate(-50%,-200vh)
    }
}

@keyframes slide-to-bottom {
    0% {
        transform: translate(-50%,0)
    }

    to {
        transform: translate(-50%,-200vh)
    }
}

.subscribe__close {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 40px;
    height: 40px;
    background-image: url(/static/css/../images/cross.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgba(0,0,0,.1);
    background-size: 14px;
    border-radius: 50%;
    cursor: pointer;
    mix-blend-mode: multiply;
    z-index: 10
}

@media screen and (max-width: 767px) {
    .subscribe__close {
        right:12px
    }
}

@media screen and (max-width: 767px) {
    .subscribe__content {
        overflow-y:auto
    }
}

.subscribe__category {
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 16.8px
}

@media (max-width: 767px) {
    .subscribe__category {
        font-size:16px;
        margin-bottom: 12px
    }
}

.subscribe__header {
    margin-top: 0;
    margin-bottom: 50px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    color: #000;
    width: 480px
}

@media screen and (max-width: 767px) {
    .subscribe__header {
        margin-bottom:30px;
        font-size: 22px;
        line-height: 30px;
        width: 100%;
        padding-right: 47px
    }
}

.subscribe__header-smile {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: bottom;
    margin-bottom: 2px;
    margin-left: 8px
}

@media screen and (max-width: 767px) {
    .subscribe__header-smile {
        width:24px;
        height: 24px;
        margin-bottom: 1px;
        margin-left: 6px
    }
}

.subscribe__checkboxes {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 19px
}

@media screen and (max-width: 767px) {
    .subscribe__checkboxes {
        margin-bottom:11px;
        flex-direction: column
    }
}

.subscribe__checkboxes [type=checkbox].invalid~label::before {
    border: 1px solid #ec5430
}

.subscribe__checkbox {
    width: 33.333%;
    margin-bottom: 25px;
    font-family: "Graphik LC TT",sans-serif;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
    color: #000
}

@media screen and (max-width: 767px) {
    .subscribe__checkbox {
        margin-bottom:14px;
        margin-right: 0;
        line-height: 24px;
        width: 100%
    }
}

.subscribe__checkbox label {
    display: inline-flex;
    padding-right: 20px
}

@media screen and (max-width: 767px) {
    .subscribe__checkbox label {
        align-items:flex-start;
        white-space: initial
    }
}

.subscribe__checkbox label:before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #000;
    background-color: transparent;
    border-radius: 3px;
    margin-right: 13px
}

@media screen and (max-width: 767px) {
    .subscribe__checkbox label:before {
        margin-top:1px
    }
}

.subscribe__checkbox input:checked+label:before {
    background-color: #3f2aff;
    border-color: #3f2aff;
    background-image: url(/static/css/../images/check-white.svg);
    background-position: center 4px;
    background-repeat: no-repeat;
    background-size: 11px 8px
}

.subscribe__checkbox input {
    display: none
}

.subscribe__email {
    padding-bottom: 16px;
    display: flex;
    position: relative;
    width: 100%
}

@media (max-width: 767px) {
    .subscribe__email {
        flex-direction:column
    }
}

.subscribe__email.is-error {
    padding-bottom: 38px
}

@media (max-width: 767px) {
    .subscribe__email.is-error {
        padding-bottom:16px
    }
}

.subscribe__email.is-error .email__error {
    display: block
}

.subscribe__email input {
    flex-grow: 1;
    padding: 24px 18px 12px;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    margin-right: 8px;
    font-size: 16px;
    color: #000;
    font-family: "Graphik LC TT",sans-serif
}

@media (max-width: 1199px) {
    .subscribe__email input {
        width:100%;
        border: 1px solid #e4e4e4
    }
}

@media (max-width: 767px) {
    .subscribe__email input {
        order:1;
        margin-bottom: 8px;
        margin-right: 0
    }
}

.subscribe__email input::-webkit-input-placeholder {
    color: transparent
}

.subscribe__email input::-moz-placeholder {
    color: transparent
}

.subscribe__email input:-ms-input-placeholder {
    color: transparent
}

.subscribe__email input::-ms-input-placeholder {
    color: transparent
}

.subscribe__email input::placeholder {
    color: transparent
}

.subscribe__email button {
    font-family: "Graphik",sans-serif;
    font-weight: 500;
    background-color: #3f2aff;
    border-radius: 10px;
    color: #fff;
    padding: 18px 48px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: .15s ease-out
}

.subscribe__email button:hover {
    background-color: #000
}

@media (max-width: 767px) {
    .subscribe__email button {
        order:3;
        width: 100%
    }
}

.subscribe__bottom {
    font-size: 12px;
    line-height: 16px;
    color: #000;
    width: 381px;
    font-family: "Graphik",sans-serif;
    font-weight: 400
}

@media screen and (max-width: 767px) {
    .subscribe__bottom {
        width:auto
    }
}

.subscribe__bottom a {
    text-decoration: underline
}

.subscribe__decor {
    position: absolute;
    bottom: 0;
    right: -50px;
    line-height: 0
}

@media (max-width: 1199px) {
    .subscribe__decor {
        bottom:auto;
        top: -64px;
        right: 50%;
        transform: translateX(50%)
    }
}

@media (max-width: 767px) {
    .subscribe__decor {
        top:-88px;
        width: 300px
    }
}

.subscribe-success-popup {
    position: fixed;
    min-width: 300px;
    padding: 12px;
    left: 32px;
    bottom: -150px;
    z-index: 1090;
    box-shadow: 0 4px 4px rgba(0,0,0,.04),0 4px 20px rgba(0,0,0,.1);
    background-color: #242424;
    border-radius: 10px;
    transition: bottom .5s
}

@media (max-width: 767px) {
    .subscribe-success-popup {
        bottom:auto;
        left: 8px;
        right: 8px;
        top: -200px;
        transition: top .5s
    }
}

.subscribe-success-popup--visible {
    bottom: 32px
}

@media (max-width: 767px) {
    .subscribe-success-popup--visible {
        bottom:auto;
        top: 70px
    }
}

.subscribe-success-popup__container {
    display: flex;
    align-items: center
}

.subscribe-success__img {
    margin-right: 12px
}

.subscribe-success__text {
    font-size: 12px;
    line-height: 18px;
    color: #fff;
    margin-bottom: 0
}

.subscribe-form__label-name {
    position: absolute;
    top: 18px;
    left: 18px;
    color: #000;
    font-family: "Graphik LC TT",sans-serif;
    font-size: 16px;
    line-height: 20px;
    transition: all 70ms ease-in-out;
    pointer-events: none
}

@media (max-width: 767px) {
    .subscribe-form__label-name {
        order:1
    }
}

.subscribe-form__input:focus~.subscribe-form__label-name,.subscribe-form__input:not(:placeholder-shown)~.subscribe-form__label-name {
    top: 12px;
    font-size: 11px;
    transition: all 70ms ease-in-out;
    letter-spacing: inherit;
    line-height: 0
}

.email__error {
    position: absolute;
    bottom: 16px;
    left: 0;
    font-family: "Graphik",sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 14px;
    color: #ff5733;
    display: none
}

@media (max-width: 767px) {
    .email__error {
        order:2;
        position: relative;
        bottom: 0;
        line-height: 1;
        margin-bottom: 16px
    }
}
</style>

<div class="subscribe-popup subscribe open" style="top: 112px; position: fixed;">
    <button class="subscribe__close"></button>
    <div class="subscribe__content">

    </div>
    <!-- src="/static/images/articles/subscribe-popup-img.png" -->
</div>

    <script>
    document.addEventListener('click', function(event) {
        // Проверяем, был ли клик на элементе с классом '.subscribe__close'
        if (event.target.closest('.subscribe__close')) {
            if (window.popupData && window.popupData.code) {
                document.dispatchEvent(new CustomEvent('sectionPopup', {
                    detail: {
                        event: 'close',
                        code: window.popupData.code
                    }
                }));
            }
        }
    });
    </script>