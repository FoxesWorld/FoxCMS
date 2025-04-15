import {JsonArrConfig} from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';
import { EditBalance } from './userOptions/EditBalance.js';
import { EditBadges }  from './userOptions/EditBadges.js';
import { EditUserOnline }  from './userOptions/EditUserOnline.js';

export class Users {
    constructor(adminPanel) {
		this.adminPanel = adminPanel;
        this.userArr = [];
		this.allBadges = [];
		this.contentAdded = false;
		this.editBadges = new EditBadges();
		this.editBalance = new EditBalance();
		this.editUserOnline = new EditUserOnline();
    }

async parseUsers(input = '*') {
    try {
        if (input === "") {
            input = '*';
        }

        if (!this.contentAdded) {
            this.addContent();
            this.contentAdded = true;
        }

        let usersArray = await foxEngine.sendPostAndGetAnswer({
            admPanel: "usersList",
            userMask: input
        }, "JSON");

        $("#usersList").html("");

        if (usersArray !== null) {
            let userTpl = this.adminPanel.templateCache["userRow"];

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
			/*
			$('#usersList').on('click', '.showProfile', async (event) => {
				const login = $(event.currentTarget).data('login');
				if (login) {
					foxEngine.user.showProfilePopup(login);
				} else {
					console.error('Login is undefined');
				}
			}); */

			$('#usersList').on('click', '.editUserBadges', async (event) => {
				const login = $(event.currentTarget).data('login');
				if (login) {
					await adminPanel.users.editBadges.openEditWindow(login);
				} else {
					console.error('Login is undefined');
				}
			});
			
			
			$('#usersList').on('click', '.editBalance', async (event) => {
				const login = $(event.currentTarget).data('login');
				if (login) {
					await adminPanel.users.editBalance.openEditWindow(login);
				} else {
					console.error('Login is undefined');
				}
			});

			$('#usersList').on('click', '.editServersOnline', async (event) => {
				const login = $(event.currentTarget).data('login');
				if (login) {
					await adminPanel.users.editUserOnline.openEditWindow(login);
				} else {
					console.error('Login is undefined');
				}
			});


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

	//@Deprecated
    getUserData(login) {
        return this.userArr[login];
    }

    async addContent() {
        if (!$("#adminContent > table").length) {
		const contentHtml = this.adminPanel.templateCache["userTable"];
            $("#adminContent").html(contentHtml);
        }
    }
}