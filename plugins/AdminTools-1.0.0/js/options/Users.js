import {JsonArrConfig} from '../modules/JsonArrConfig.js';
import { BuildField } from '../modules/BuildField.js';

export class Users {
    constructor() {
        
        this.userArr = [];
		this.allBadges = [];
		this.contentAdded = false;
		this.formFields = [
			{ "fieldName": 'badgeName', "fieldType": 'dropdown', "optionsArray":  this.allBadges },
			{ "fieldName": 'acquiredDate', "fieldType": 'date' },
			{ "fieldName": 'description', "fieldType": 'text' }
		];
        
		this.buildField = new BuildField(this);
		this.jsonArrConfig = new JsonArrConfig([ "badgeName", "acquiredDate", "description"], this.submitHandler.bind(this), this.buildField);
		
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
    try {
        if (input === "") {
            input = '*';
        }

        if (!this.allBadges.size) {
            await this.getAllBadges();
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
            this.formFields.forEach(field => {
                switch (field.fieldName) {
                    case 'badgeName':
                        field.optionsArray = this.allBadges;
                        break;
                    default:
                        break;
                }
            });

            $('.showProfile').click((event) => {
                const login = $(event.target).data('login');
				if (login) {
                foxEngine.user.showProfilePopup(login);
				} else {
					console.error('Login is undefined');
				}
            });

			$('#usersList').on('click', '.loadUserBadges', async (event) => {
				const login = $(event.currentTarget).data('login');
				if (login) {
					const badgesArray = await foxEngine.user.getBadgesArray(login);
					this.jsonArrConfig.openFormWindow(badgesArray, login, {admPanel: "editUserBadges", userLogin: login});
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
	
	async submitHandler(button, user) {
		let answer = await this.jsonArrConfig.updateJsonConfig("badges");
		button.notify(answer.message, answer.type);
		setTimeout(async () => {
			$("#dialog").dialog('close');
			foxEngine.user.showUserProfile(user);
			setTimeout(async () => {
				foxEngine.user.parseBadges(user);
			}, 500);
		}, 500);
    }
	
	async getAllBadges() {
        this.allBadges = await foxEngine.sendPostAndGetAnswer({
            admPanel: "getAllBadges"
        }, "JSON");
    }
}