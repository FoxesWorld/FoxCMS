	
	let groupBlock = "#groupAssoc";
	
	function parseGroups() {
		let answer = request.send_post({admPanel: "groupAssoc"});
		let groupTable;
			answer.onreadystatechange = function() {
				  if (answer.readyState === 4) {
						try {
							  let groupArray = JSON.parse(this.responseText);
							  if(groupArray.length > 0) {
								  for (var j  = 0; j < groupArray.length; j++){
									  let groupRow = groupArray[j];
									  let groupId = groupRow['id'];
									  let groupNum = groupRow['groupNum'];
									  let groupType = groupRow['groupType'];
									  let groupName = groupRow['groupName'];
									  
									  groupTable = `
									  <tr id="groupRow-`+groupId+`">
										<th scope="row">`+j+`</th>
										<td><input type="text" id="`+groupId+`" name="groupNum"  value="`+groupNum+`"  /></td>
										<td><input type="text" id="`+groupId+`" name="groupType" value="`+groupType+`"  /></td>
										<td><input type="text" id="`+groupId+`" name="groupName" value="`+groupName+`" /></td>
									  </tr>`;
									  $(groupBlock).append(groupTable);
								  }
							  }
						} catch (error) {
							$(groupBlock).html(error);
						}
				  }
			}
			setTimeout(() => {
				$('#groupAssoc input').on('input',function(e){
					let rowId = this.id;
					let fieldKey = this.name;
					let newValue = this.value;
					let query = `UPDATE groupAssociation SET `+fieldKey+` = "`+newValue+`" WHERE id = `+rowId;
					let queryRequest = request.send_post({sysRequest: "sqlQuery", query: query});
							queryRequest.onreadystatechange = function() {
								if (queryRequest.readyState === 4) {
									//console.log(queryRequest.responseText);
									let answer = JSON.parse(queryRequest.responseText);
									$("#groupRow-"+rowId).notify(answer.message, "info");
								}
							}
				});
		 }, 500);
	}