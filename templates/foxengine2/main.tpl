<html lang="ru">
   <head>
	  <meta charset="utf-8" />
      {$systemHeaders}
      <title>{$siteTitle}</title>
	  <meta name="HandheldFriendly" content="true" />
      <meta name="format-detection" content="telephone=yes" />
	  <meta name="viewport" content="user-scalable=no, initial-scale=2.0, maximum-scale=1.0, width=device-width, height=device-height">
	  <meta name="author" content="FoxesWorld" />
	  <meta name="description" content="{$siteDesc}" />
	  <meta name="keywords" content="{$keywords}">
      <!-- <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height" /> -->
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
	  <meta property="og:title" content="{$siteTitle}" />
	  <meta property="og:site_name" content="{$siteTitle}" />
	  <meta property="og:url" content="https://foxescraft.ru" />
	  <meta property="og:image" content="{$tplDir}/img/assets/logo.png" />
	  <!-- <script src="//code.jivo.ru/widget/X47ofXrus3" async></script> -->
	  <script src="https://www.google.com/recaptcha/api.js?hl=ru_RU" async defer></script>
	  <script src="/templates/foxengine2/assets/js/UserTable.js"></script>
      <link href="{$tplDir}/assets/css/style.css" rel="stylesheet">
	  <link rel="shortcut icon" href="/favicon.ico">
      {$builtInJS}
	  
	  <style>
		.LetItSnow {
			height: 100vh;
			width: 98vw;
			--webkit-filter: blur(2px);
			-filter: blur(2px);
			position: absolute;
			pointer-events: none;
			z-index: 999999999;
			top: 0;
		}
		
		{if $siteStatus == "MAINTENANCE MODE"}
		#header::after {
			content: "";
			display: inline-block;
			width: 100%;
			height: 10px;
			margin: 25px 0px -8px;
			background: repeating-linear-gradient(
				45deg,
				#000,
				#000 10px,
				#ffcc00 10px,
				#ffcc00 20px
			);
			border-radius: 0 0 5px 5px;
		}
		
		footer::before {
			content: "";
			display: inline-block;
			width: 100%;
			position: absolute;
			height: 10px;
			margin: -25px 0px;
			left: 0;
			background: repeating-linear-gradient(45deg, #000, #000 10px, #ffcc00 10px, #ffcc00 20px);
			border-radius: 0 0 5px 5px;
		}
		{/if}
		
	</style>	  
	  <script type="module" src="{$tplDir}/assets/js/App.js"></script>
	  <script src="{$tplDir}/assets/js/CustomNavBar.js"></script>

	  <script>
    // Function to set background image based on season
    function setBackgroundBySeason() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const body = document.querySelector('body');

        let backgroundImage = '';
        if (currentMonth >= 3 && currentMonth <= 5) {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/spring.png)';
        } else if (currentMonth >= 6 && currentMonth <= 8) {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/summer.png)';
        } else if (currentMonth >= 9 && currentMonth <= 11) {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/autumn.png)';
        } else {
            backgroundImage = 'url('+foxEngine.replaceData.assets+'img/background/season/winter.png)';
			foxEngine.snow.init();
			//$(".container").append('<div class="moderator-button optionButt" onclick="foxEngine.snow.switchSnow();" style="width: 32px; height: 32px;"><i class="fa-light fa-snowflake"></i></div>');
        }

        body.style.backgroundImage = backgroundImage;
    }
	
		
	async function myAction() {
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir + 'maintenanceMode.tpl', true);
		let data = await foxEngine.entryReplacer.replaceText(template, "");
		foxEngine.modalApp.showModalApp('auto', "", data, () => {
			foxEngine.cookieManager.setCookie('modalShown', 'true', 7);
		});
	}

    document.addEventListener('DOMContentLoaded', function() {
		foxEngine.cookieManager.checkCookie('modalShown', 'true', 7, myAction, false);
    });
	
    /**
     * Инициализация анимации Lottie
     *
     * Параметры:
     * - container: DOM-элемент, в котором отрисовывается анимация.
     * - renderer: Метод отрисовки ('svg', 'canvas' или 'html').
     * - loop: Логическое значение или число повторов анимации.
     * - autoplay: Автоматически запускать анимацию при загрузке.
     * - path: Путь к JSON-файлу с данными анимации.
     */
	 function animation(path, loop){
	 
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('lottie-container'), // Контейнер для анимации
      renderer: 'canvas',       // Используем SVG-рендерер для качественной отрисовки
      loop: loop,            // Зацикленная анимация
      autoplay: true,        // Автоматический запуск при загрузке страницы
      path: path // Путь к JSON-файлу с анимацией
    });
	}

    /**
     * Дополнительные опции:
     * Вы можете управлять анимацией, используя методы объекта animation.
     * Например:
     * - animation.play() - запустить анимацию.
     * - animation.pause() - приостановить анимацию.
     * - animation.stop() - остановить анимацию и сбросить к началу.
     * - animation.setSpeed(1.5) - изменить скорость воспроизведения.
     */
  
</script>
   </head>
   
   
<body>
<div id="lottie-container"></div>
    {include file='header.tpl'}
    {include file='../modalApp.tpl'}

    <div class="container">
        <div class="row siteContent">
            <div class="col-12">
                {include file='slider.tpl'}
            </div>
			<div id="infoBox"></div>
            <div class="{if !$isMobile}col-8{else}container{/if}">
			
                <main id="content" class="mainBlock">	
                    <%contentData%>
                </main>
            </div>
            {include file="right-block.tpl"}
        </div>
    </div>

    <div id="cookie-popup" class="show">
        <img src="{$tplDir}/assets/icons/cookie.png" draggable="false" />
        <p>Для улучшения работы сайта и его взаимодействия с пользователями мы используем файлы cookie. Продолжая работу с сайтом, вы разрешаете использование cookie-файлов. Вы всегда можете отключить файлы cookie в настройках вашего браузера.</p>
        <button class="button" onclick="foxEngine.cookies.acceptCookies()">Принять</button>
    </div>

    {include file='footer.tpl'}
    {include file='../notify.tpl'}
</body>

</html>