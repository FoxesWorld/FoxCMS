import {
    JsonArrConfig
} from '../modules/JsonArrConfig.js';

export class Users {
    constructor() {
        
        this.userArr = [];
		this.jsonArrConfig = new JsonArrConfig([ "badgeName", "acquiredDate", "description"]);
		this.badgesFields = [
			{ "fieldName": 'badgeName', "fieldType": 'text' },
			{ "fieldName": 'acquiredDate', "fieldType": 'text' },
			{"fieldName": 'description', "fieldType": 'text' }
		];
        this.contentAdded = false;
        this.dialogOptions = {
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

            }
        };
    }

    async parseUsers(input = '*') {
        if (input === "") {
            input = '*';
        }
        try {
            if (!this.contentAdded) {
                this.addContent();
                this.contentAdded = true; // Set the flag to true after adding content
            }

            let usersArray = await foxEngine.sendPostAndGetAnswer({
                admPanel: "usersList",
                userMask: input
            }, "JSON");
            $("#usersList").html("");

            if (usersArray !== null) {
                let userTpl = await foxEngine.loadTemplate(replaceData.assets + '/elements/admin/users/userRow.tpl', true);
                for (let j = 0; j < usersArray.length; j++) {
                    let singleUser = usersArray.at(j);
                    let login = singleUser[j].login;
                    let email = singleUser[j].email;
                    let lastdate = singleUser[j].last_date;
                    let avatar = singleUser[j].profilePhoto;
                    let badges = singleUser[j].badges;

                    this.userArr[login] = {
                        email,
                        lastdate,
                        badges
                    };

                    let userHtml = await foxEngine.replaceTextInTemplate(userTpl, {
                        index: j,
                        login,
                        avatar,
                        email,
                        lastdate,
                        badges
                    });
                    $("#usersList").append(userHtml);
                }
				//Action listeners
                setTimeout(() => {

                    $('.showProfile').click((event) => {
                        const login = $(event.target).data('login');
                        console.log(login);
                        foxEngine.user.showProfilePopup(login);
                    });

					$('.loadUserBadges').click(async (event) => {
						const login = $(event.target).data('login');
						const badgesArray = await foxEngine.user.getBadgesArray(login);
						this.jsonArrConfig.openFormWindow(badgesArray, login, {admPanel: "editUser", userLogin: login});
					});					
                }, 1000);
            } else {
                const userHtml = `<tr><td colspan="4"><div class="alert alert-warning" role="alert">No Users like <b>${input}</b></div></td></tr>`;
                foxEngine.page.loadData(userHtml, "#usersList");
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    userTemplate(template, data) {
        return template.replace(/\${(.*?)}/g, (match, p1) => data[p1.trim()]);
    }

    getUserData(login) {
        return this.userArr[login];
    }

    async loadBadgesConfig(button, data, user) {
        if (data !== "") {
            this.jsonArrConfig.openModsInfoWindow(data, user);
        } else {
            button.notify(user + ' has no badges!', "warn");
        }
    }

    async addContent() {
        if (!$("#adminContent > table").length) {
            const contentHtml = await foxEngine.loadTemplate(foxEngine.elementsDir + 'admin/users/userTable.tpl', true);
            $("#adminContent").html(contentHtml);
        }
    }
}