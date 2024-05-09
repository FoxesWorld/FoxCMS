<tr>
    <td scope="row">{index}</td>
	<td><img class="profilePic" src="{avatar}" /></td>
    <td class="{login}"><a href="#" class="user-link" data-login="{login}">{login}</a></td>
    <!--<td>{email}</td>
     <td>{convertUnixTime(lastdate)}</td> -->
    <td>
		<div class="buttonGroup">
			<button class="btn bg-teal btn-sm btn-raised position-left legitRipple showProfile" data-login="{login}" data-action="profile">Profile</button>
			<button class="btn bg-teal btn-sm btn-raised position-left legitRipple loadUserBadges" data-action="badges" data-login="{login}">Badges</button>
		</div>
    </td>
</tr>
