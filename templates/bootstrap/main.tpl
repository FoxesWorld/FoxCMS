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
	<script src="{$tplDir}/js/main.js"></script>
	<script type="text/javascript" src="//vk.com/js/api/openapi.js?130"></script>
	{$vkGroup}
</head>

<body>
	{include file='header.tpl'}

		  <section id="topbar" class="d-flex align-items-center">
			<div class="container d-flex justify-content-center justify-content-md-between">
			  <div class="contact-info d-flex align-items-center">
				<!-- 
				<i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">Tres.com</a></i>
				<i class="bi bi-phone d-flex align-items-center ms-4"><span>{$status}</span></i> 
				-->
			  </div>
				{if !$isLogged}
				  <div class="cta d-none d-md-flex align-items-center">
					<a href="#login"><button class="logInBtn"><span>Войти</span></button></a>
				  </div>
				{else}
				  <div class="cta d-none d-md-flex align-items-center">
					{$greetings} &nbsp; {$realname}!
					  {if $userGroup == 'admin'}
							<a class="button-three" href="#adm">Adminpanel</a>
					  {/if}
				  </div>
				 {/if}
			</div>
		  </section>
		  
		  <div id="content">
			{$builtInJS}

				<table>
					{if $isLogged}
					<td>
						<div id="userBlock">
							{$profile}
							{include file='upload.tpl'}
						</div>
					</td>
					
					<td>
						<div class="container-fluid" id="pageData">
							Your files are...
						</div>
					</td>
					{else}
					<td>
						<div class="container" id="vkGroup"></div>
					</td>
					{/if}
			 </table>
		  </div>

  {include file='components/advertComponent.tpl'}
  {include file='footer.tpl'}
 </body>