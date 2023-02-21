<html>

	<head>
		{$systemHeaders}
		<meta charset="utf-8">
		<meta name="HandheldFriendly" content="true">
		<title>{$title}</title>
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height"> 
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="default">
		<link href="{$tplDir}/assets/css/style.css" rel="stylesheet">
		<script src="{$tplDir}/assets/js/func.js"></script>
		<script type="module" src="{$tplDir}/assets/js/App.js"></script>
		{$builtInJS}
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
						<%contentData%>
				  </div>
				</div>				  

				<div class="col-4">
					{include file="right-block.tpl"}
				</div>
			</div>
		</div>

	{include file='footer.tpl'}
	 </body>
 </html>