{literal}


		 <div class="owl-carousel owl-theme">

		</div>

<script>

const slidesData = [
    {
        "title": "Ранний доступ",
        "desc": "Мы рады сообщить, что вы можете стать частью нашего проекта на раннем этапе! Получите доступ к эксклюзивным функциям и первыми испытайте все преимущества. Ваши отзывы помогут нам улучшить продукт перед официальным запуском. :fox:",
        "image": "/templates/foxengine2/assets/img/slides/slide1.jpg",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Ваш вклад в разработку",
        "desc": "Участвуйте в тестировании новейших функций, влияйте на развитие продукта и получайте эксклюзивные бонусы. Ваше мнение будет учитываться при каждом обновлении.",
        "image": "/templates/foxengine2/assets/img/background/fox_world/winter_forest.png",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Благодарим за ваше терпение!",
        "desc": "Мы ценим ваше терпение и понимание, что во время раннего релиза не всё будет работать как планировалось, спасибо вам за помощь в устранении ошибок, вместе мы создаем что-то великое!",
        "image": "/templates/foxengine2/assets/img/background/fox_world/summer_forest.jpg",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Будьте на связи!",
        "desc": "Вступайте в нашу группу ВК и сервер Дискорд чтобы быть в курсе всех последних новостей!",
        "image": "/templates/foxengine2/assets/img/background/fox_world/spring_forest.jpg",
		"overlayColor": "rgba(0, 0, 0, 0.5)"
    }
];




document.addEventListener('DOMContentLoaded', function() {

const owlCarousel = document.querySelector('.owl-carousel');
slidesData.forEach(slide => {
    const slideItem = document.createElement('div');
    slideItem.classList.add('owl-slide');
    slideItem.style.backgroundImage = `url('${slide.image}')`;
    
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.backgroundColor = slide.overlayColor; 
    slideItem.innerHTML += '<h2>'+slide.title+'</h2><span>'+slide.desc+'</span>';
    slideItem.appendChild(overlay);
    owlCarousel.appendChild(slideItem);
});

    $('.owl-carousel').owlCarousel({
        items: 1,
        nav: false, 
        dots: true,
        loop: true,
        autoplay: true,
		autoplayTimeout: 10000
    });
});

	async function checkExp() {
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'exp.ftpl', true);
		let data = await foxEngine.entryReplacer.replaceText(template, "");
		foxEngine.modalApp.showModalApp(900, "Ранний релиз!", data, () => {
			foxEngine.cookieManager.setCookie('earlyAccess', 'true', 7);
		});
	}


</script>
{/literal}

