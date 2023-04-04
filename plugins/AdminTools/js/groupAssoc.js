let groupBlock = "#groupAssoc";
let j;

function parseGroups() {
    let answer = request.send_post({
        admPanel: "groupAssoc"
    });
    let groupTable;
    answer.onreadystatechange = function() {
        if (answer.readyState === 4) {
            try {
                let groupArray = JSON.parse(this.responseText);
                if (groupArray.length > 0) {
                    for (j = 0; j < groupArray.length; j++) {
                        let groupRow = groupArray[j];
						appendRow(groupRow, groupRow["id"], j);
                    }
                }
            } catch (error) {
                $(groupBlock).html(error);
            }
        }
    }

    addListener();


    $('.addGroupAssoc').click(function() {
        j = parseInt(j) + 1;
        addRow(j);
    });
}

function addListener() {
    setTimeout(() => {
        $('#groupAssoc input').on('input', function(e) {
            update(this);
        });
    }, 500);
}

function update(field) {
    let rowId = field.id;
    let fieldKey = field.name;
    let newValue = field.value;
    let queryRequest = request.send_post({
        sqlOption: "UPDATE",
        sqlTable: "groupAssociation",
        sqlSetter: "SET " + fieldKey + " = '" + newValue + "' WHERE ",
        selectKey: "id = ",
        selectValue: rowId
    });
    queryRequest.onreadystatechange = function() {
        if (queryRequest.readyState === 4) {
            let answer = JSON.parse(queryRequest.responseText);
            $("#groupRow-" + rowId).notify(answer.message, "info");
        }
    }
}

function addRow(id) {
    let index = 0,
        message;
    let queryRequest = request.send_post(
		{
			sqlOption: "INSERT INTO",
			sqlTable: "groupAssociation",
			sqlSetter: "(`groupNum`, `groupType`, `groupName`) VALUES (1000, 'new', 'Newbie')"

		}
	);
    queryRequest.onreadystatechange = function() {
        if (queryRequest.readyState === 4) {
            let response = JSON.parse(queryRequest.responseText);
            index = response.lastIndex;
			appendRow('', index+1, id);
            addListener();
        }
    }
}

function appendRow(rowData, index, visIndex){
	$(`<tr id="groupRow-` + index + `">
					<th scope="row">` + visIndex + `</th>
						<td><div class="input_block"><input class="input" type="number" id="` + index + `" name="groupNum"  value="` + rowData["groupNum"] + `"  /><label class="label">Номер группы</label></div></td>
						<td><div class="input_block"><input class="input" type="text" id="` + index + `" name="groupType" value="` + rowData["groupType"] + `"  /><label class="label">Намсенование группы</label></div></td>
						<td><div class="input_block"><input class="input" type="text" id="` + index + `" name="groupName" value="` + rowData["groupName"] + `" /><label class="label">Локализация группы</label></div></td>
						<td><a class="text-danger adminButtonCoverRed" onclick="deleteRow(` + index + `)"><i class="fa fa-minus" aria-hidden="true"></i></a></td>
				 </tr>`).appendTo(groupBlock).fadeIn(1000);
}

function deleteRow(id) {
    let queryRequest = request.send_post({
		sqlOption: "DELETE FROM",
		sqlTable: "groupAssociation",
		sqlSetter: "WHERE",
		selectKey: "id = ",
		selectValue: id
    });
	queryRequest.onreadystatechange = function() {
        if (queryRequest.readyState === 4) {
			let response = JSON.parse(this.responseText);
			if(response.status === "success"){
				$("#groupRow-" + id).fadeOut(300, function() {
					$("#groupRow-" + id).remove();
				});
			}
		}
	}


}