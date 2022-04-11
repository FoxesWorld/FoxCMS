<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css" /> -->
		<link href="{$tplDir}/css/player.structure.min.css"  rel="stylesheet" type="text/css" media="screen" />
		<link href="{$tplDir}/css/player.css"  rel="stylesheet" type="text/css" media="screen" />
	</head>
	<body>
		
		<div class="playerWrapper">
			<div class="audio-player"></div>
		</div>

		<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> -->
		<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script> 
		<script src="{$tplDir}/js/player.js"></script>
		<script>
			$(function(){
				var $audioPlayer = $(".audio-player").foxRadio(
					{
						songs:["{$radioStream}"],
						onStatusChange: function(e){
							console.log(e);
						}
					}
				);
			});
		</script>
		
	</body>
</html>
