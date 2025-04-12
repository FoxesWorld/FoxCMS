    <div id="profileContents" style="background: linear-gradient({angle}deg, {dominantColor}, {colorScheme});">
    <table>
        <tr>
            <td style="width: 10px;">
                <img class="profilePhoto" src="{profilePhoto}" style="width: 64px;" alt="{login}">
            </td>
            <td>
                <div class="profile-title">
                    <ul>
                        <li><h1><a href="#" class="pageLink-{login}" onclick="foxEngine.user.showUserProfile('{login}'); return false;">{login}</a></h1></li>
                        <li>{realname}</li>
                        <li><span class="groupStatus-4">{regDate}</span></li>
                    </ul>
                </div>
            </td>
        </tr>
    </table>
</div>