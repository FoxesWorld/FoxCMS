<tr>
    <th scope="row">{index}</th>
    <td class="{login}"><a href="#" class="user-link" data-login="{login}">{login}</a></td>
    <td>{email}</td>
    <!-- <td>{convertUnixTime(lastdate)}</td> -->
    <td>
        <button class="btn bg-teal btn-sm btn-raised position-left legitRipple" data-action="profile">Profile</button>
        <button class="btn bg-teal btn-sm btn-raised position-left legitRipple" id="loadUserBadges" data-action="badges" data-login="{login}">Badges</button>
    </td>
</tr>
