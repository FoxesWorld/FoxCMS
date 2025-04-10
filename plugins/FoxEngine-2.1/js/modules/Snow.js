export class Snow {
    constructor(foxEngine) {
        this.foxEngine = foxEngine;
        this.currentSeason = this.getCurrentSeason();
        this.init();
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        return (month === 12 || month === 1 || month === 2) ? 'winter' : 'other';
    }

    getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        const expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure;";
    }

    switchSnow() {
        const result = this.getCookie('snow');
        const newStatus = (result === '' || result === '1') ? '0' : '1';
        this.setCookie('snow', newStatus, 365);

        setTimeout(() => {
            this.updateSnowToggleButton();
            location.reload(true);
        }, 100);
    }

    loadSnow() {
        if (this.getCookie('snow') === '' || this.getCookie('snow') === '1') {
            const body = document.body;
            const html = document.documentElement;
            const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

            document.body.onscroll = function () {
                if (window.pageYOffset < document.body.scrollHeight - document.body.clientHeight - 50) {
                    $(".LetItSnow").css('top', window.pageYOffset);
                }
            };

            const UPPER_LIMIT_Y = 2;
            const UPPER_LIMIT_X = 2;
            const LOWER_LIMIT_X = -2;
            const MAX_SIZE = 4;
            const MIN_SIZE = 2;
            const AMOUNT = 150;
            const COLOR = 0xEFFBFB;
            const { Application, Graphics } = PIXI;
            const floored = v => Math.floor(Math.random() * v);
            const update = p =>
                Math.random() > 0.5
                    ? Math.max(LOWER_LIMIT_X, p - 1)
                    : Math.min(p + 1, UPPER_LIMIT_X);

            const reset = p => {
                p.x = floored(app.renderer.width);
                p.y = -(p.height + floored(app.renderer.height));
                p.vy = floored(UPPER_LIMIT_Y);
            };

            const genParticles = t =>
                new Array(AMOUNT).fill().map(() => {
                    const SIZE = floored(MAX_SIZE) + MIN_SIZE;
                    const p = new PIXI.Sprite(t);
                    p.scale.x = p.scale.y = SIZE / 100;
                    p.vx = floored(UPPER_LIMIT_X) - UPPER_LIMIT_X;
                    p.vy = floored(UPPER_LIMIT_Y);
                    p.alpha = Math.random();
                    p.x = floored(app.renderer.width);
                    p.y = -(SIZE + floored(app.renderer.height));
                    drops.addChild(p);
                    return p;
                });

            const app = new Application({
                antialias: true,
                transparent: true,
            });

            const drops = new PIXI.particles.ParticleContainer(AMOUNT, {
                scale: true,
                position: true,
                alpha: true,
            });
            app.stage.addChild(drops);

            const p = new Graphics();
            p.beginFill(COLOR);
            p.drawCircle(0, 0, 100);
            p.endFill();
            const baseTexture = app.renderer.generateTexture(p);
            let particles = genParticles(baseTexture);

            app.ticker.add(() => {
                if (app.renderer.height !== innerHeight || app.renderer.width !== innerWidth) {
                    app.renderer.resize(innerWidth, innerHeight);
                    drops.removeChildren();
                    particles = genParticles(baseTexture);
                }
                for (let particle of particles) {
                    if (particle.y > 0) particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (Math.random() > 0.9) particle.vx = update(particle.vx);
                    if (Math.random() > 0.9) particle.vy = Math.min(particle.vy + 1, UPPER_LIMIT_Y);

                    if (particle.x > app.renderer.width || particle.x < 0 || particle.y > app.renderer.height) {
                        reset(particle);
                    }
                }
            });

            document.body.appendChild(app.view).classList.add('LetItSnow');
        }
    }

    updateSnowToggleButton() {
        const snowActive = this.getCookie('snow') === '' || this.getCookie('snow') === '1';
        const indicator = $("#snowfallToggleBtn .active-indicator");
        if (snowActive) {
            $('.snowBtn').append('<span class="active-indicator"></span>');
        }
    }

    addSnowToggleButton() {
        if ($("#snowfallToggleBtn").length === 0) {
            $(".userBlock").append(`
                <li class="nav-sep"></li>
                <li style="margin: 15px 0;">
                    <a class="regular-btn regular-btn-icon snowBtn" onclick="foxEngine.snow.switchSnow();" id="snowfallToggleBtn" title="Осадки">
                        <i class="fa-light fa-snowflake"></i>
                        
                    </a>
                </li>
            `);
        }
        this.updateSnowToggleButton();
    }

    init() {
        if (this.currentSeason === 'winter') {
            this.loadSnow();
            this.addSnowToggleButton();
        }
    }
}
