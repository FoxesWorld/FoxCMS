/**
 * @fileoverview CustomNavbar class for FoxesCraft
 * 
 * This file contains the CustomNavbar class, which is responsible for creating navbars.
 * It provides methods for creating nice looking navigation bars
 * 
 * Authors: FoxesWorld
 * Date: [08.11.24]
 * Version: 1.0.0 SNAPSHOT
 */
 class CustomNavbar {
    constructor(options = {}) {
        this.options = Object.assign({
            togglerSelector: ".navbar-toggler",
            collapseSelector: "#navbarSupportedContent",
            burgerButtonSelector: ".mantine-cahhlp",
            navItemSelector: "#navbarSupportedContent > ul",
            toggleAnimationDelay: 50,
            closeAnimationDelay: 350,
            onOpen: null,
        }, options);

        this.DOMelements = {};
        this.initializeElements();
        this.initEvents();
    }

    initializeElements() {
        const selectors = {
            navbarToggler: this.options.togglerSelector,
            navbarCollapse: this.options.collapseSelector,
            burgerButton: this.options.burgerButtonSelector,
        };

        Object.entries(selectors).forEach(([key, selector]) => {
            this.DOMelements[key] = document.querySelector(selector);
        });
    }

    initEvents() {
        document.addEventListener('click', (event) => this.documentClickHandler(event));
        this.DOMelements.navbarToggler.addEventListener('click', () => this.navbarTogglerClickHandler());

        document.querySelectorAll(this.options.navItemSelector).forEach((navItem) => {
            navItem.addEventListener('click', () => this.closeNavbar());
        });
    }

    toggleAbsolutePosition() {
        if (getComputedStyle(this.DOMelements.navbarCollapse).position === "absolute") {
            setTimeout(() => {
                this.DOMelements.navbarCollapse.style.position = "";
                this.DOMelements.navbarToggler.classList.remove("collapsed");
            }, this.options.toggleAnimationDelay);
        } else {
            this.hideBodyScroll();
            this.DOMelements.navbarToggler.classList.add("collapsed");
            this.DOMelements.navbarCollapse.style.top = "112px";
            this.DOMelements.navbarCollapse.style.width = "350px";
        }
    }

    closeNavbar() {
        this.DOMelements.navbarCollapse.classList.remove("show");
        setTimeout(() => {
            this.DOMelements.navbarToggler.classList.add("collapsed");
            this.toggleAbsolutePosition();
            this.showBodyScroll();
        }, this.options.closeAnimationDelay);

        this.DOMelements.burgerButton.removeAttribute("data-opened");
    }

    documentClickHandler(event) {
		 if (this.DOMelements.navbarCollapse.classList.contains("show")) {
			if (!this.DOMelements.navbarCollapse.contains(event.target) && !this.DOMelements.navbarToggler.contains(event.target)) {
				this.closeNavbar();
			}
		 }
    }

    navbarTogglerClickHandler() {
        this.toggleAbsolutePosition();
        this.DOMelements.navbarCollapse.classList.toggle("show");

        if (this.DOMelements.navbarCollapse.classList.contains("show")) {
            this.DOMelements.burgerButton.setAttribute("data-opened", "true");

            if (typeof this.options.onOpen === "function") {
                this.options.onOpen();
            }
        } else {
            this.DOMelements.burgerButton.removeAttribute("data-opened");
            this.showBodyScroll();
        }

        if (this.DOMelements.navbarCollapse.classList.contains("show")) {
            this.DOMelements.navbarToggler.classList.remove("collapsed");
        } else {
            this.DOMelements.navbarToggler.classList.add("collapsed");
        }
    }

    hideBodyScroll() {
		window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.body.style.overflowY = "hidden";
    }

    showBodyScroll() {
        document.body.style.overflowY = "scroll";
    }
}
