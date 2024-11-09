<style>
    .table__row {
        grid-template-columns: 1fr 1fr 3fr;
    }

    #owl-slider {
        overflow: hidden;
        box-shadow: 0 3px 5px 2px rgba(167, 175, 182, 0.05);
        border-radius: 10px;
        margin-bottom: 10px;
    }

    .owl-slide {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 200px;
        padding: 30px;
    }

    #owl-slider .owl-dots {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
    }

    #owl-slider .owl-nav {
        position: absolute;
        top: 50px;
        right: 30px;
        line-height: 0;
    }

    #owl-slider .owl-nav button:focus {
        outline: none;
    }

    #owl-slider .av-btn {
        color: #ffffff;
    }

    #owl-slider .av-btn:hover {
        color: #223c50;
    }

    #owl-demo {
        margin-bottom: 10px;
    }

    #owl-center {
        margin-bottom: 10px;
    }

    #owl-demo .item {
        background-color: #68beba;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        height: 150px;
        font-size: 20px;
    }

    #owl-center .item {
        background-color: #68beba;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        height: 150px;
        font-size: 20px;
    }

    #owl-slider .owl-slide__title {
        margin-bottom: 20px;
    }

    @media (min-width: 720px) {
        #owl-slider {
            margin-bottom: 20px;
        }

        .owl-slide {
            min-height: 300px;
        }

        #owl-slider .owl-slide__title {
            margin-bottom: 30px;
        }

        #owl-demo {
            margin-bottom: 20px;
        }

        #owl-center {
            margin-bottom: 20px;
        }
    }

    @media (min-width: 1080px) {
        .owl-slide {
            min-height: 500px;
        }
    }

    @media (min-width: 1280px) {
        #owl-slider .owl-slide__title {
            font-size: 36px;
            line-height: 42px;
        }
    }
	
	.owl-carousel .owl-stage-outer {
	margin: 5px 0px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    -webkit-transform: translate3d(0, 0, 0);
}

.owl-slide h2 {
    font-family: intro-black;
    font-size: 30px;
    color: #ffea38;
    text-shadow: 8px 13px 29px rgba(47, 31, 25, .75);
    position: relative;
    top: 74px;
    margin: 0 0 82px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1; /* Наложение над изображением */
}
.owl-slide h2,
.owl-slide span {
    position: relative; /* Для текста */
    z-index: 2; /* Текст над наложением */
}

.owl-slide span {
	color: wheat;
}
</style>
{literal}


		 <div class="owl-carousel owl-theme">

		</div>

<script>

const slidesData = [
    {
        "title": "Лесные приключения с лисами",
        "desc": "Исследуйте удивительный мир лесов с нашими лисами.",
        "image": "/templates/foxengine2/assets/img/background/fox_world/winter_forest.png",
        "link": "/wa-data/public/blog/download/FoxWorldWinter.rar",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Летние забавы в лисьем мире",
        "desc": "Погрузитесь в летние приключения с лисами.",
        "image": "/templates/foxengine2/assets/img/background/fox_world/summer_forest.jpg",
        "link": "/wa-data/public/blog/download/FoxWorldSummer.rar",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Весенние игры с лисами",
        "desc": "Узнайте, как лисы наслаждаются весной.",
        "image": "/templates/foxengine2/assets/img/background/fox_world/spring_forest.jpg",
        "link": "/wa-data/public/blog/download/FoxWorldSpring.rar",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Осенние тайны лисьего леса",
        "desc": "Откройте для себя осенние красоты и тайны лисьего мира.",
        "image": "/templates/foxengine2/assets/img/background/fox_world/autumn_forest.jpg",
        "link": "/wa-data/public/blog/download/FoxWorldAutumn.rar",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    }
];

// Получаем элемент для слайдов
const owlCarousel = document.querySelector('.owl-carousel');
// Создаем слайды с помощью цикла
slidesData.forEach(slide => {
    const slideItem = document.createElement('div');
    slideItem.classList.add('owl-slide');
    
    // Устанавливаем фоновое изображение
    slideItem.style.backgroundImage = `url('${slide.image}')`;
    
    // Создаем элемент для наложения
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.backgroundColor = slide.overlayColor; 
    slideItem.innerHTML += '<h2>'+slide.title+'</h2><span>'+slide.desc+'</span>';
    
    // Добавляем наложение в слайд
    slideItem.appendChild(overlay);
    
    // Добавляем слайд в карусель
    owlCarousel.appendChild(slideItem);
});

function startSlider(){
foxEngine.cookieManager.checkCookie('earlyAccess', 'true', 7, checkExp, false);  
//const sliderContainer = document.querySelector('.owl-carousel');
//sliderContainer.style.width = '90%';

    $('.owl-carousel').owlCarousel({
        items: 1,
        nav: false, 
        dots: false,
        loop: true,
        autoplay: true
    });
}

	async function checkExp() {
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'exp.ftpl', true);
		let data = await foxEngine.entryReplacer.replaceText(template, "");
		foxEngine.modalApp.showModalApp(900, "Ранний релиз!", data, () => {
			foxEngine.cookieManager.setCookie('earlyAccess', 'true', 7);
		});
	}


</script>
{/literal}

