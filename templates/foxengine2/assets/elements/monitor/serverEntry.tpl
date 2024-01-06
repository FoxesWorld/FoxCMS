<div class="serverEntry">

   <!-- <li class="version">Версия: 
        <span>{version}</span>
        <i class="fa fa-info-circle" aria-hidden="true"></i>
    </li> -->

    <div class="serverEntry-title">
        <span>{serverName} {version}</span>
		<div class="online_text">
			{playersOnline} из {playersMax}
		</div>

		<div class="serverEntry-line">
			<div class="{progressbarClass}" style="width: {percent}%;"></div>
		</div>
    </div>

		<div class="button" onclick="foxEngine.loadServerPage('{serverName}')" title="Перейти на страницу с описанием серверов {serverName}">
			 <i class="fa fa-info-circle" aria-hidden="true"></i>
		</div>
	
</div>
