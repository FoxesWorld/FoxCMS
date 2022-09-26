<html>

	<head>
		{$systemHeaders}
		{$builtInJS}	
		<meta charset="utf-8">
		<meta name="HandheldFriendly" content="true">
		<title>{$title} {$status}</title>
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"> 
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="default">
		<link href="{$tplDir}/css/style.css" rel="stylesheet">
		<script src="{$tplDir}/js/main.js"></script>
	</head>

	<body>
		{include file='header.tpl'}
			  <section id="topbar" class="d-flex align-items-center shadow">
						<div class="container d-flex justify-content-center justify-content-md-between">
						  <div class="contact-info d-flex align-items-center">

						  </div>
							  <div class="cta d-none d-md-flex align-items-center" data-in-effect="fadeIn" id="actionBlock">

							  </div>
						</div>
			  </section>
			  
			  <div id="content">
						<table>
							<td id="userBlock">
									{include file='components/profileComponent.tpl'}
							</td>
								
							<td id="workPlace">
								{include file='userMenu.tpl'}
							</td>
						</table>
			  </div>

	  {include file='components/advertComponent.tpl'}
	 </body>
 </html>