<html lang="ru">
   <head>
	  <meta charset="utf-8" />
      {$systemHeaders}
      <meta name="HandheldFriendly" content="true" />
      <title>{$siteTitle}</title>
      <meta name="format-detection" content="telephone=no" />
	  <meta name="author" content="FoxesWorld" />
	  <meta name="description" content="{$siteDesc}" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height" />
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
	  <script type="module" src="{$tplDir}/assets/js/metrics.js"></script>
	  <script type="module" src="{$tplDir}/assets/js/snow.js"></script>
	  <script type="module" src="{$tplDir}/assets/js/cookie.js"></script>
   </head>
   <body>
      {include file='header.tpl'}
	  {include file='navigation.tpl'}
      
      <div class="container">
         <div class="row siteContent">
            <div class="{if !$isMobile}col-8{else}container{/if}">
               <div id="content" class="mainBlock">
				<%contentData%>
               </div>
            </div>
               {include file="right-block.tpl"}
         </div>
		 <div class="moderator-button optionButt" onclick="switchSnow();">
			<i class="fa fa-snowflake-o"></i>
		</div>
      </div>
	  <div id="cookie-popup" style="display: none">
        <div class="text-center" id="cookie-header">
          <img src="{$tplDir}/assets/icons/cookie.png" draggable="false" />
        </div>
        <div id="cookie-body">
          <p>Наш сайт использует печеньки (и не только потому, что у нас есть Печеньки-Монстр). 
		  Они необходимы для создания невероятного опыта в использовании сайта – будь то путешествие по страницам или открытие сундука с новыми идеями.</p>
          <a onclick="FoxEngine.loadPage('cookies', replaceData.contentBlock); return false;" href="https://www.cookieconsent.com/what-are-cookies/">Хочу знать больше...</a>
          <div class="cookie-buttons">
            <button id="btn-cookie" type="submit">Соглашаюсь</button>
          </div>
        </div>
      </div>
      {include file='footer.tpl'}
	  {include file='notify.tpl'}
   </body>
</html>