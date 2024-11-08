<style>
.modal_app_title {
	color: #ffffff;
}

.modal_app_content {
    background: #32353e;
	color: #ffffff;
}

        .inline {
            display: flex;
            align-items: flex-start;
        }

        .inline img {
            margin-right: 20px;
        }

        .inline li {
            list-style-type: none;
        }

        .inline p {
            margin: 0 0 10px;
        }
</style>

<ul class="inline" style="margin: 70;">
	<li>
		<img src="%assets%/img/discord.gif" style="    float: right;" />
	</li>
    
	<li>
    <p>Собирайтесь, благородные пользователи, настал день! Discord, царство мемов и голосовых чатов, было запечатано могущественными интернет-правителями.</p>
    <p>Не волнуйтесь, доблестные воины сети, ведь есть и другие земли для исследования, но ни одна не столь славна, как земля Discord.</p>
    <p>Главное, что у нас есть решение!</p>
	</li>
</ul>

        <button class="login uk-animation-fade scale-down" onclick="foxEngine.page.loadPage('saveDiscord', replaceData.contentBlock); foxEngine.modalApp.closeModalApp(true)">Окей, бумер</button>
