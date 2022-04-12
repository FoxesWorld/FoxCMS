<head>
	{$systemHeaders}	
	<meta charset="utf-8">
	<meta name="HandheldFriendly" content="true">
	<title>{$title} {$status}</title>
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"> 
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
	<link href="{$tplDir}/css/style.css" rel="stylesheet">
	<link href="{$tplDir}/css/input.css" rel="stylesheet">
	<script src="{$tplDir}/js/main.js"></script>
</head>

<body>
	{include file='header.tpl'}
  <section id="topbar" class="d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">Tres.com</a></i>
        <i class="bi bi-phone d-flex align-items-center ms-4"><span>{$status}</span></i>
      </div>
		{if !$isLogged}
		  <div class="cta d-none d-md-flex align-items-center">
			<a href="#login" class="scrollto">LogIn</a>
		  </div>
		{else}
		  <div class="cta d-none d-md-flex align-items-center">
			Hey you {$LoggedName}!
		  </div>
		 {/if}
    </div>
  </section>
  
  <div id="content">
	{$builtInJS}
	<div class="row">
	 {$profile}
	</div>
  </div>
  {include file='components/advert.tpl'}
  
  {include file='footer.tpl'}
  
  
 </body>