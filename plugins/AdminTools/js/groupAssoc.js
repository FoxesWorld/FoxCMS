function GroupAssoc() {
    let groupBlock = "#adminContent";
    let j;

    this.parseGroupAssoc = () => {
        this.groupAssoc();
    };

    this.groupAssoc = () => {
        let answer = request.send_post({
            admPanel: "groupAssoc"
        });

        answer.onreadystatechange = () => {
            if (answer.readyState === 4) {
                this.addContent();
                try {
                    let groupArray = JSON.parse(answer.responseText);

                    if (groupArray.length > 0) {
                        for (j = 0; j < groupArray.length; j++) {
                            let groupRow = groupArray[j];
                            this.appendRow(groupRow, groupRow["id"], j);
                        }
                    }
                } catch (error) {
                    $(groupBlock).html(error);
                }
            }
        };

        this.addGroupListener();

        $('.addGroupAssoc').click(() => {
            j = parseInt(j) + 1;
            this.addRow(j);
        });
    };

    this.addGroupListener = () => {
        setTimeout(() => {
            $('#groupAssoc input').on('input', (e) => {
                this.update(e.target);
            });
        }, 500);
    };

    this.update = (field) => {
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

        queryRequest.onreadystatechange = () => {
            if (queryRequest.readyState === 4) {
                let answer = JSON.parse(queryRequest.responseText);
                $("#groupRow-" + rowId).notify(answer.message, "info");
            }
        };
    };

    this.addRow = (id) => {
        let index = 0;
        let queryRequest = request.send_post({
            sqlOption: "INSERT INTO",
            sqlTable: "groupAssociation",
            sqlSetter: "(`groupNum`, `groupType`, `groupName`) VALUES (1000, 'new', 'Newbie')"
        });

        queryRequest.onreadystatechange = () => {
            if (queryRequest.readyState === 4) {
                let response = JSON.parse(queryRequest.responseText);
                index = response.lastIndex;
                this.appendRow('', index + 1, id);
                this.addGroupListener();
            }
        };
    };

    this.appendRow = (rowData, index, visIndex) => {
        $(`<tr id="groupRow-${index}">
                    <th scope="row">${visIndex}</th>
                    <td><div class="input_block"><input class="input" type="number" id="${index}" name="groupNum"  value="${rowData["groupNum"]}"  /><label class="label">Номер группы</label></div></td>
                    <td><div class="input_block"><input class="input" type="text" id="${index}" name="groupType" value="${rowData["groupType"]}"  /><label class="label">Намсенование группы</label></div></td>
                    <td><div class="input_block"><input class="input" type="text" id="${index}" name="groupName" value="${rowData["groupName"]}" /><label class="label">Локализация группы</label></div></td>
                    <td><a class="text-danger adminButtonCoverRed" onclick="deleteRow(${index})"><i class="fa fa-minus" aria-hidden="true"></i></a></td>
                </tr>`).appendTo("#groupAssoc").fadeIn(1000);
    };

    this.deleteRow = (id) => {
        let queryRequest = request.send_post({
            sqlOption: "DELETE FROM",
            sqlTable: "groupAssociation",
            sqlSetter: "WHERE",
            selectKey: "id = ",
            selectValue: id
        });

        queryRequest.onreadystatechange = () => {
            if (queryRequest.readyState === 4) {
                let response = JSON.parse(queryRequest.responseText);
                if (response.status === "success") {
                    $("#groupRow-" + id).fadeOut(300, () => {
                        $("#groupRow-" + id).remove();
                    });
                }
            }
        };
    };

    this.addContent = () => {
        if (!$("#adminContent > #groupAssoc").length) {
            $("#adminContent").html(`<table class="table table-hover table-striped" id="groupAssoc">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Логин</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Дата посещения</th>
                        <th scope="col">
                            <input type="text" onKeyUp="users($(this).val());" class="input" placeholder="Поиск пользователя" required />
                        </th>
                    </tr>
                </thead>
                <tbody id="usersList">
                </tbody>
            </table>`);
        }
    };
}