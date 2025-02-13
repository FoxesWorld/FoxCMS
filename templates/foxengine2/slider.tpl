{literal}

	 <div class="owl-carousel owl-theme">
	</div>

    <script>
document.addEventListener('DOMContentLoaded', function() {
    var time = 7;
    var $progressBar, $progressBarWrapper, isPause, tick, percentTime;

const slidesData = [
    {
        "title": "Ранний доступ",
        "desc": "Мы рады сообщить, что вы можете стать частью нашего проекта на раннем этапе! Получите доступ к эксклюзивным функциям и первыми испытайте все преимущества. Ваши отзывы помогут нам улучшить продукт перед официальным запуском.",
        "image": "/templates/foxengine2/assets/img/slides/slide1.jpg",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Ваш вклад в разработку",
        "desc": "Участвуйте в тестировании новейших функций, влияйте на развитие продукта и получайте эксклюзивные бонусы. Ваше мнение будет учитываться при каждом обновлении.",
        "image": "/templates/foxengine2/assets/img/slides/slide2.png",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Благодарим за ваше терпение!",
        "desc": "Мы ценим ваше терпение и понимание, что во время раннего релиза не всё будет работать как планировалось, спасибо вам за помощь в устранении ошибок, вместе мы создаем что-то великое!",
        "image": "/templates/foxengine2/assets/img/slides/slide3.jpg",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Будьте на связи!",
        "desc": "Вступайте в нашу группу ВК и сервер Дискорд чтобы быть в курсе всех последних новостей!",
        "image": "/templates/foxengine2/assets/img/slides/slide4.jpg",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    },
    {
        "title": "Мы верим в инновации",
        "desc": "Устали от шаблонных проектов, которые ничем не отличаются друг от друга? Мы тоже! <p>Мы стремимся привнести новый, невиданный ранее, игровой экспириенс, благодаря собственным разработкам!</p>",
        "image": "/templates/foxengine2/assets/img/slides/slide5.jpg",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    },
	{
        "title": "Командный дух",
        "desc": "Наш успех зависит от сотрудничества и обмена идеями. Мы приглашаем вас стать частью нашей команды и вместе добиваться выдающихся результатов.",
        "image": "/templates/foxengine2/assets/img/slides/slide6.jpg",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    },
	{
        "title": "Неожиданные события",
        "desc": "Происходит что-то непонятное, нужно выяснить что это...",
        "image": "/templates/foxengine2/assets/img/slides/slide7.png",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    }/*
	{
        "title": "Не забываем о важном!",
        "desc": "Он хочет с тобой связаться!",
        "image": "/templates/foxengine2/assets/img/slides/slide8.png",
        "overlayColor": "rgba(0, 0, 0, 0.5)"
    }, */
];


    const owlCarousel = document.querySelector('.owl-carousel');
    slidesData.forEach(slide => {
        const slideItem = document.createElement('div');
        slideItem.classList.add('owl-slide');
        slideItem.style.backgroundImage = `url('${slide.image}')`;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.style.backgroundColor = slide.overlayColor;
        slideItem.innerHTML += "<h2>"+slide.title+ "</h2><span>"+ slide.desc+ "</span>";
        slideItem.appendChild(overlay);

        const progressBarWrapper = document.createElement('div');
        progressBarWrapper.classList.add('progress-bar-wrapper');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');

        progressBarWrapper.appendChild(progressBar);
        slideItem.appendChild(progressBarWrapper);

        owlCarousel.appendChild(slideItem);
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: time * 1000,
        onInitialized: initProgressBar,
        onTranslate: resetProgressBar,
        onTranslated: startProgressBar
    });

    function initProgressBar() {
        $progressBarWrapper = $(".progress-bar-wrapper");
        $progressBar = $(".progress-bar");
        startProgressBar();
    }

    function startProgressBar() {
        percentTime = 0;
        isPause = false;
        tick = setInterval(updateProgressBar, 10);
    }

    function updateProgressBar() {
        if (!isPause) {
            percentTime += 100 / (time * 100);
            $progressBar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                clearInterval(tick);
            }
        }
    }

    function resetProgressBar() {
        clearInterval(tick);
        $progressBar.css({
            width: "0%"
        });
    }

    $(".owl-carousel").on('mouseover', function(){
        isPause = true;
        $(this).trigger('stop.owl.autoplay');
    });

    $(".owl-carousel").on('mouseout', function(){
        isPause = false;
        $(this).trigger('play.owl.autoplay');
    });
});
    </script>
{/literal}

