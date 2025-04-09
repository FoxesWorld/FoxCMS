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

<ul class="inline" style="margin: 70px;">
    <li>
        <!-- Здесь можно разместить логотип или изображение проекта -->
    </li>
    <li>
        <p>Друзья, тяжёлые времена настали для Лисьего Мира – наш проект стоит на грани закрытия.</p>
        <p>Мы вынуждены принимать это решение по следующим причинам:</p>
        <ul style="margin-left: 20px; color: #ffffff;">
            <li><strong>Финансовая нестабильность:</strong> сокращение инвестиций и недостаток средств для поддержки проекта.</li>
            <li><strong>Технические проблемы:</strong> устаревшая платформа, требующая значительных ресурсов для модернизации.</li>
            <li><strong>Изменение интересов сообщества:</strong> пользователи переходят к новым технологиям и платформам.</li>
            <li><strong>Креативный кризис:</strong> иссякновение свежих идей, необходимых для дальнейшего развития.</li>
        </ul>
        <p>Однако даже перед лицом этих вызовов, мы не намерены сдаваться. Вместе мы можем найти новые пути для возрождения Лисьего Мира и вернуть ему былую славу.</p>
        <p>Призываем всех неравнодушных к нашему сообществу присоединиться к поиску решений и обсудить перспективы дальнейшего развития!</p>
    </li>
</ul>

<button class="login uk-animation-fade scale-down" onclick="foxEngine.page.loadPage('saveProject', replaceData.contentBlock); foxEngine.modalApp.closeModalApp(true)">
    Вперёд, бойцы!
</button>
