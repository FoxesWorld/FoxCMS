<?php
/* Smarty version 4.0.4, created on 2024-11-19 13:16:08
  from '/var/www/FoxCMS/templates/fillRu/slider.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_673c6568905604_17713955',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4be946b9d206d37cfea52bb7cbd005b2ad26d3be' => 
    array (
      0 => '/var/www/FoxCMS/templates/fillRu/slider.tpl',
      1 => 1731961559,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_673c6568905604_17713955 (Smarty_Internal_Template $_smarty_tpl) {
?>


		 <div class="owl-carousel owl-theme">

		</div>

<?php echo '<script'; ?>
>

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


document.addEventListener('DOMContentLoaded', function() {
//foxEngine.cookieManager.checkCookie('earlyAccess', 'true', 7, checkExp, false);  
    $('.owl-carousel').owlCarousel({
        items: 1,
        nav: false, 
        dots: false,
        loop: true,
        autoplay: true
    });
});

	async function checkExp() {
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'exp.ftpl', true);
		let data = await foxEngine.entryReplacer.replaceText(template, "");
		foxEngine.modalApp.showModalApp(900, "Ранний релиз!", data, () => {
			foxEngine.cookieManager.setCookie('earlyAccess', 'true', 7);
		});
	}


<?php echo '</script'; ?>
>


<?php }
}
