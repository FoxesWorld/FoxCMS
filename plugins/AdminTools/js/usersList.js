function parseUsers(input) {
		$("#usersList").html("");
		if(!input) input = '*';
		let answer = request.send_post({admPanel: "usersList", userMask: input});
		let userHtml = "";
		  answer.onreadystatechange = function() {
			  if (answer.readyState === 4) {
				  
				try {
					  let usersArray = JSON.parse(this.responseText);
					  if(usersArray.length > 0) {
						for (var j  = 0; j < usersArray.length; j++){
							 singleUser = usersArray[j];
							 let login = singleUser[j]['login'];
							 let email = singleUser[j]['email'];
							 let lastdate = singleUser[j]['last_date'];


							userHtml = `
								<tr>
								  <th scope="row">`+j+`</th>
								  <td><a href="#" onclick="showProfilePopup('`+login+`'); return false;">`+login+`</a></td>
								  <td>`+email+`</td>
								  <td>`+FoxEngine.convertUnixTime(lastdate)+`</td>
								  <td>GG</td>
								</tr>`;
								$("#usersList").append(userHtml);
						  }
					  } else {
						 userHtml = `<div class="noUsers"><h1>No Uses like <span>`+input+`</span></h1></div>`;
						 FoxEngine.loadData(userHtml, "#usersList");
					  }
				} catch (error) {
					$("#usersList").html(error);
				}
			  }
		}
	}