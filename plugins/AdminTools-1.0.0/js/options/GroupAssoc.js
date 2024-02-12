export class GroupAssoc {
    constructor() {
        this.groupBlock = "#adminContent";
        this.j = 0;
    }

    parseGroupAssoc() {
        this.groupAssoc();
    }

    groupAssoc() {
        let answer = foxEngine.request.send_post({
            admPanel: "groupAssoc"
        });

        answer.onreadystatechange = () => {
            if (answer.readyState === 4) {
                this.addContent();
                try {
                    let groupArray = JSON.parse(answer.responseText);

                    if (groupArray.length > 0) {
                        for (this.j = 0; this.j < groupArray.length; this.j++) {
                            let groupRow = groupArray[this.j];
                            this.appendRow(groupRow, groupRow["id"], this.j);
                        }
                    }
                } catch (error) {
                    $(this.groupBlock).html(error);
                }
            }
        };

        this.addGroupListener();

        $('.addGroupAssoc').click(() => {
            this.j = parseInt(this.j) + 1;
            this.addRow(this.j);
        });
    }

    addGroupListener() {
        setTimeout(() => {
            $('#groupAssoc input').on('input', (e) => {
                this.update(e.target);
            });
        }, 500);
    }

    update(field) {
        let rowId = field.id;
        let fieldKey = field.name;
        let newValue = field.value;

        let queryRequest = foxEngine.request.send_post({
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
    }

    addRow(id) {
        let index = 0;
        let queryRequest = foxEngine.request.send_post({
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
    }

    appendRow(rowData, index, visIndex) {
        $(`<tr id="groupRow-${index}">
            <th scope="row">${visIndex}</th>
            <td><div class="input_block"><input class="input" type="number" id="${index}" name="groupNum"  value="${rowData["groupNum"]}"  /><label class="label">Номер группы</label></div></td>
            <td><div class="input_block"><input class="input" type="text" id="${index}" name="groupType" value="${rowData["groupType"]}"  /><label class="label">Намсенование группы</label></div></td>
            <td><div class="input_block"><input class="input" type="text" id="${index}" name="groupName" value="${rowData["groupName"]}" /><label class="label">Локализация группы</label></div></td>
            <td><a class="text-danger adminButtonCoverRed" onclick="deleteRow(${index})"><i class="fa fa-minus" aria-hidden="true"></i></a></td>
        </tr>`).appendTo("#groupAssoc").fadeIn(1000);
    }

    deleteRow(id) {
        let queryRequest = foxEngine.request.send_post({
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
    }

    addContent() {
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
    }
}
