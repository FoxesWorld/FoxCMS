function parseUsers(input) {
		addContent();
		if(!input) input = '*';
		let answer = request.send_post({admPanel: "usersList", userMask: input});
		let userHtml = "";
		  answer.onreadystatechange = function() {
			  if (answer.readyState === 4) {
				  
				try {
					  let usersArray = JSON.parse(this.responseText);
					  if(usersArray.length > 0) {
						  $("#usersList").html("");
						for (var j  = 0; j < usersArray.length; j++){
							 singleUser = usersArray[j];
							 let login = singleUser[j]['login'];
							 let email = singleUser[j]['email'];
							 let lastdate = singleUser[j]['last_date'];

							userHtml = `
								<tr>
								  <th scope="row">`+j+`</th>
								  <td class="`+login+`"><a href="#" onclick="return false;">`+login+`</a></td>
								  <td>`+email+`</td>
								  <td>`+convertUnixTime(lastdate)+`</td>
								  <td><button onclick="FoxEngine.showUserProfile('`+login+`'); return false;"">Profile</button</td>
								</tr>`;
								$("#usersList").append(userHtml);
								
								$("#usersList > tr > td."+login).on({
									mouseenter: function () {
										let elPos = this.getBoundingClientRect();
										let dialogOptions = {
											autoOpen: false,
											position: [elPos.x + 100, elPos.y],
											modal: true,
											height: 'auto',
											width: 600,
											resizable: false,
											my: "top",
											at: "top",
											of: $(this),
								            open: function(event,ui){
												$(".ui-widget-overlay").remove();
												$(".ui-dialog-titlebar").remove();
											}
										};
										FoxEngine.showProfilePopup("'"+login+"'", dialogOptions);
									},
									mouseleave: function () {
										$("#dialog").dialog("close");
									}
								});
								
						  }
					  } else {
						 userHtml = `<div class="noUsers"><h1>No Uses like <span>`+input+`</span></h1></div>`;
						 FoxEngine.loadData(userHtml, "#adminContent");
					  }
				} catch (error) {
					$("#adminContent").html(error);
				}
			  }
		}
	}
	
	function addContent(){
		if(!$("#adminContent > table").length) {
			$("#adminContent").html(`<table class="table table-hover table-striped">
			
			  <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Логин</th>
				  <th scope="col">Почта</th>
				  <th scope="col">Дата посещения</th>
				  <th scope="col">
					<input type="text" onKeyUp="parseUsers($(this).val());" class="input" placeholder="Поиск пользователя" required />
				</th>
				  
				</tr>
			  </thead>
			  <tbody id="usersList">

			  </tbody>
			</table>`);
		}
	}