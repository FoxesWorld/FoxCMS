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
		
	</style>	  
	  <script type="module" src="{$tplDir}/assets/js/App.js"></script>

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
			$(".container").append('<div class="moderator-button optionButt" onclick="foxEngine.snow.switchSnow();"><i class="fa fa-snowflake-o"></i></div>');
        }

        body.style.backgroundImage = backgroundImage;
    }
</script>
   </head>
   <body>
      {include file='header.tpl'}
	  {include file='../modalApp.tpl'}
      
      <div class="container">
         <div class="row siteContent">
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
	  
	  {literal}
		<script>
			   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
			   m[i].l=1*new Date();
			   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
			   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
			   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

			   ym(92831256, "init", {
					clickmap:true,
					trackLinks:true,
					accurateTrackBounce:true,
					webvisor:true
			   });
			</script>

			<noscript><div><img src="https://mc.yandex.ru/watch/92831256" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		{/literal}
	  <div aria-live="polite" aria-atomic="true" class="position-relative">
		<div class="toast-container position-fixed top-0 end-0 p-2"></div>
	  </div>
   </body>
</html>