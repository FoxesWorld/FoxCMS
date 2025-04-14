<tr>
    <td scope="row">{index}</td>
	<td><img class="profilePic" src="{avatar}" /></td>
    <td class="{login}"><a class="user-link" onclick="foxEngine.user.showUserProfile('{login}'); return false;" data-login="{login}">{login}</a></td>
    <!--<td>{email}</td>
     <td>{convertUnixTime(lastdate)}</td> -->
    <td>
		<div class="buttonGroup">
			<button class="btn bg-green btn-sm btn-raised position-left legitRipple showProfile" data-login="{login}" data-action="profile"><i class="fa-thin fa-id-card"></i></button>
			<button class="btn bg-indigo-800 btn-sm btn-raised position-left legitRipple loadUserBadges" data-action="badges" data-login="{login}"><i class="fa-thin fa-badge"></i></button>
			<button class="btn bg-orange-600 btn-sm btn-raised position-left legitRipple editBalance" data-action="balance" data-login="{login}"><i class="fa-thin fa-money-bill"></i></button>
		</div>
    </td>
</tr>
