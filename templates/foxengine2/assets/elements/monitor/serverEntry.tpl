<div class="serverEntry">
    {favicon}
    
    <div class="serverEntry-content">
        <div class="serverEntry-title">
            <span>{serverName} {version}</span>
        </div>
        <div class="online_text">
            <i class="fa-thin fa-user-vneck"></i> <span>{playersOnline} из {playersMax}</span>
        </div>
        <div class="serverEntry-line">
            <div class="{progressbarClass}" style="width: {percent}%;"></div>
        </div>
    </div>
    
    <a class="button pageLink-{serverName}" onclick="foxEngine.servers.loadServerPage('{serverName}')" 
       title="Перейти на страницу с описанием серверов {serverName}">
        <i class="fa fa-info-circle"></i>
    </a>
</div>
