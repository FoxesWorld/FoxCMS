import { JsonArrConfig } from './JsonArrConfig.js';

class Users {
    constructor() {
		this.jsonArrConfig = new JsonArrConfig();
		this.userArr = [];
	}

    async parseUsers(input = '*') {
        try {
            this.addContent();

            let usersArray = await foxEngine.sendPostAndGetAnswer({
                admPanel: "usersList",
                userMask: input
            }, "JSON");

            if (usersArray.length > 0) {
                $("#usersList").html("");
				let userTpl = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/users/userRow.tpl');
                for (let j = 0; j < usersArray.length; j++) {
                    let singleUser = usersArray.at(j);
                    let login = singleUser[j].login;
                    let email = singleUser[j].email;
                    let lastdate = singleUser[j].last_date;
					let badges = singleUser[j].badges;
					
					this.userArr[login] = {
                        email,
                        lastdate,
                        badges
                    };

                    let userHtml = await foxEngine.replaceTextInTemplate(userTpl, {
                        index: j,
                        login,
                        email,
                        lastdate,
						badges
                    });
                    $("#usersList").append(userHtml);

                    let openTimer;

                    $(`#usersList > tr > td.${login}`).on({
                        mouseenter: function() {
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
                                open: function(event, ui) {
                                    $(".ui-widget-overlay").remove();
                                    $(".ui-dialog-titlebar").remove();
                                }
                            };

                            openTimer = setTimeout(() => {
                                foxEngine.user.showProfilePopup(`'${login}'`, dialogOptions);
                            }, 1000);
                        },
                        mouseleave: function() {
                            clearTimeout(openTimer);
                        }
                    });

                    $(document).on('click', function(event) {
                        if ($(event.target).closest('.ui-dialog').length === 0) {
                            $("#dialog").dialog("close");
                        }
                    });
					console.log(this.userArr[login]);
					        setTimeout(() => {
							$('#loadUserBadges').click(() => {
									this.loadBadgesConfig(badges, login);
								});
							}, 1000);
                }
            } else {
                const userHtml = `<div class="noUsers"><h1>No Users like <span>${input}</span></h1></div>`;
                foxEngine.loadData(userHtml, "#adminContent");
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    userTemplate(template, data) {
        return template.replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()]);
    }
	
	getUserData(login){
		return this.userArr[login];
	}
	
	async loadBadgesConfig(button, data, user) {
		if(data !== "") {
			this.jsonArrConfig.openModsInfoWindow(data, user);
		} else {
			button.notify(user + ' has no badges!', "warn");
		}
	}

    async addContent() {
        if (!$("#adminContent > table").length) {
            const contentHtml = await foxEngine.loadTemplate(foxEngine.elementsDir + 'admin/users/userTable.tpl');
            $("#adminContent").html(contentHtml);
        }
    }
}

export { Users };