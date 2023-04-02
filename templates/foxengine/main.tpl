<html>
   <head>
      {$systemHeaders}
      <meta charset="utf-8">
      <meta name="HandheldFriendly" content="true">
      <title>{$title}</title>
      <meta name="format-detection" content="telephone=no">
	  <meta name="author" content="FoxesWorld">
	  <meta name="description" content="FoxEngine" />
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="default">
	  <meta property="og:title" content="FoxesWorld">
	  <meta property="og:site_name" content="FoxesWorld">
	  <meta property="og:url" content="https://foxescraft.ru">
	  <meta property="og:image" content="{$tplDir}/assets/logo.png" />
      <link href="{$tplDir}/assets/css/style.css" rel="stylesheet">
	  <link rel="shortcut icon" href="/favicon.ico">
      {$builtInJS}
	  <script>let FoxEngine = new foxEngine("{$login}");</script>
	  <script type="module" src="{$tplDir}/assets/js/App.js"></script>
	  <script type="module" src="{$tplDir}/assets/js/metrics.js"></script>
		
   </head>
   <body>
      {include file='header.tpl'}
      <section id="topbar" class="d-flex align-items-center shadow bar">
         <div class="container d-flex justify-content-center justify-content-md-between">
            <div class="leftAction d-flex align-items-center">
            </div>
            <div class="rightAction d-none d-md-flex align-items-center" data-in-effect="fadeIn" id="actionBlock">
               <span class="text-wrapper">
               </span>
            </div>
         </div>
      </section>
      <div class="container">
         <div class="row siteContent">
            <div class="col-8">
               <div id="content" class="mainBlock animate__animated">
			   {if $user_group == 5}
				   <span id="test" class="animate__animated" style="height: 512px;width: auto;display: block; border: 2px solid #998f98ad; border-radius: 10px;"></span>
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