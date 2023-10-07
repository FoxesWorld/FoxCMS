class Users {
  constructor() {
    // Конструктор класса
  }

  async parseUsers(input = '*') {
    try {
      this.addContent();
      const response = await request.sendPost({
        admPanel: "usersList",
        userMask: input
      });

      if (response.status === 200) {
        const responseData = await response.text();
        const usersArray = JSON.parse(responseData);

        if (usersArray.length > 0) {
          $("#usersList").html("");
          for (let j = 0; j < usersArray.length; j++) {
            let singleUser = usersArray.at(j);
            let login = singleUser[j].login;
            let email = singleUser[j].email;
            let lastdate = singleUser[j].last_date;

            let userHtml = `
              <tr>
                <th scope="row">${j}</th>
                <td class="${login}"><a href="#" onclick="return false;">${login}</a></td>
                <td>${email}</td>
                <td>${convertUnixTime(lastdate)}</td>
                <td><button onclick="FoxEngine.showUserProfile('${login}'); return false;">Profile</button></td>
              </tr>`;
            $("#usersList").append(userHtml);

            $(`#usersList > tr > td.${login}`).on({
              mouseenter: function () {
                const elPos = this.getBoundingClientRect();
                const dialogOptions = {
                  autoOpen: false,
                  position: [elPos.x + 100, elPos.y],
                  modal: true,
                  height: 'auto',
                  width: 600,
                  resizable: false,
                  my: "top",
                  at: "top",
                  of: $(this),
                  open: function (event, ui) {
                    $(".ui-widget-overlay").remove();
                    $(".ui-dialog-titlebar").remove();
                  }
                };
                FoxEngine.showProfilePopup(`'${login}'`, dialogOptions);
              },
              mouseleave: function () {
                $("#dialog").dialog("close");
              }
            });
          }
        } else {
          const userHtml = `<div class="noUsers"><h1>No Users like <span>${input}</span></h1></div>`;
          FoxEngine.loadData(userHtml, "#adminContent");
        }
      } else {
        console.error('HTTP error:', response.status);
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }

  addContent() {
    if (!$("#adminContent > table").length) {
      $("#adminContent").html(`
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Логин</th>
              <th scope="col">Почта</th>
              <th scope="col">Дата посещения</th>
              <th scope="col">
                <input type="text" onKeyUp="FoxEngine.parseUsers($(this).val());" class="input" placeholder="Поиск пользователя" required />
              </th>
            </tr>
          </thead>
          <tbody id="usersList"></tbody>
        </table>
      `);
    }
  }
}