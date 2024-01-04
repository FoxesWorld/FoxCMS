class Users {
    constructor() {}

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

                        let userHtml = await this.readHtmlFromFile(replaceData.assets + '/elements/admin/users/userRow.tpl', { index: j, login, email, lastdate });
                        $("#usersList").append(userHtml);

                        let openTimer;

                        $(`#usersList > tr > td.${login}`).on({
                            mouseenter: function () {
                                clearTimeout(openTimer);

                                const dialogOptions = {
                                    autoOpen: false,
                                    position: {
                                        my: 'center',
                                        at: 'center',
                                        of: window
                                    },
                                    modal: true,
                                    height: 'auto',
                                    width: 600,
                                    resizable: false,
                                    open: function (event, ui) {
                                        $(".ui-widget-overlay").remove();
                                        $(".ui-dialog-titlebar").remove();
                                    }
                                };

                                openTimer = setTimeout(() => {
                                    FoxEngine.showProfilePopup(`'${login}'`, dialogOptions);
                                }, 1000);
                            },
                            mouseleave: function () {
                                clearTimeout(openTimer);
                            }
                        });

                        $(document).on('click', function (event) {
                            if ($(event.target).closest('.ui-dialog').length === 0) {
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

    async readHtmlFromFile(filePath, data) {
        try {
            const htmlTemplate = await $.ajax({
                url: filePath,
                method: 'GET',
                dataType: 'html',
            });
            return this.userTemplate(htmlTemplate, data);
        } catch (error) {
            console.error('Error reading HTML file:', error.message);
            return '';
        }
    }

    userTemplate(template, data) {
        return template.replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()]);
    }

    async addContent() {
        if (!$("#adminContent > table").length) {
            const contentHtml = await this.readHtmlFromFile(replaceData.assets + '/elements/admin/users/userTable.tpl', {});
            $("#adminContent").html(contentHtml);
        }
    }
}
