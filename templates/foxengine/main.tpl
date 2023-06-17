<html lang="ru">
   <head>
	  <meta charset="utf-8" />
      {$systemHeaders}
      <meta name="HandheldFriendly" content="true" />
      <title>{$title}</title>
      <meta name="format-detection" content="telephone=no" />
	  <meta name="author" content="FoxesWorld" />
	  <meta name="description" content="FoxEngine" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
	  <meta property="og:title" content="FoxesWorld" />
	  <meta property="og:site_name" content="FoxesWorld" />
	  <meta property="og:url" content="https://foxescraft.ru" />
	  <meta property="og:image" content="{$tplDir}/img/assets/logo.png" />
	  <script src="//code.jivo.ru/widget/X47ofXrus3" async></script>
	  <script src="https://www.google.com/recaptcha/api.js?hl={$lang['wysiwyg_language']}" async defer></script>
      <link href="{$tplDir}/assets/css/style.css" rel="stylesheet">
	  <link rel="shortcut icon" href="/favicon.ico">
      {$builtInJS}
	  <script>
		  const FoxesInput = new inputHandler();
		  let FoxEngine = new foxEngine("{$login}");
	  </script>
	  <script type="module" src="{$tplDir}/assets/js/App.js"></script>
	  <script type="module" src="{$tplDir}/assets/js/metrics.js"></script>
		
   </head>
   <body>
      {include file='header.tpl'}
	  {include file='navigation.tpl'}
      
      <div class="container">
         <div class="row siteContent">
            <div class="col-8">
               <div id="content" class="mainBlock">
			   {if $user_group == 5}
				   <span id="test" style="height: 512px;width: auto;display: block; border: 2px solid #998f98ad; border-radius: 10px;"></span>
				   <button class="login" onclick="loadPage('guestMore', '#test');">LoadContent</button>
			   {else}
				<%contentData%>
			   {/if}
               </div>
            </div>
               {include file="right-block.tpl"}
         </div>
      </div>
      {include file='footer.tpl'}
	  {include file='notify.tpl'}
   </body>
</html>