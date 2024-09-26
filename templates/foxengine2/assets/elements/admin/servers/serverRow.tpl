<tr>
	<th scope="row">{index}</th>
    <td class="{serverName}"><a href="#" onclick="return false;">{serverName}</a></td>
	<td class="serverStatus">{enabled}</td>
	<td>{serverGroups}</td>
    <td><span class="serverVersion serverVersion-{serverVstyle}">{serverVersion}</span></td>
    <td>{serverDescription}</td>
    <td>
		<button class="btn bg-teal btn-sm btn-raised position-left legitRipple editServerButt" data-serverName="{serverName}"><i class="fa-thin fa-pencil"></i></button>
		<button class="btn bg-orange-800 btn-sm btn-raised position-left legitRipple deleteServerButt" data-serverName="{serverName}"><i class="fa-thin fa-trash"></i></button>
	</td>
</tr>