        <tr>
          <th scope="row">{index}</th>
          <td class="{serverName}"><a href="#" onclick="return false;">{serverName}</a></td>
		  <td class="serverStatus">{enabled}</td>
		  <td>{serverGroups}</td>
          <td>{serverVersion}</td>
          <td>{serverDescription}</td>
          <td><button class="btn bg-teal btn-sm btn-raised position-left legitRipple" onclick="adminPanel.servers.loadServerOptions('{serverName}'); return false;">Edit</button></td>
        </tr>