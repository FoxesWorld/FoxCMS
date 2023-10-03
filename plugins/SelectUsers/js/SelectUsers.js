	async function SelectUsers(key, value){
		let teamHTML;
		getTeamMembers(key, value).then((response) => {
		let responseDecode = JSON.parse(response);
			for(let k=0; k < responseDecode.length; k++){
				let thisMember = responseDecode[k];
				console.log(thisMember.realname);
				teamHTML = `<div class="col-md-4 col-sm-6 col-xs-12" id="team">
        <div class="member">
          <div class="img-area">
            <img src="`+thisMember.profilePhoto+`" class="img-responsive" alt="">
            <div class="social">
              <ul class="list-inline">
                <li>`+thisMember.land+`</li>
              </ul>
            </div>
          </div>
          <div class="img-text">
            <h4>`+thisMember.realname+`</h4>
            <h5>`+thisMember.userStatus+`</h5>
          </div>
        </div>
      </div>`;
	  $("#team").append(teamHTML);
			}
		  })
		  .catch((error) => {
			FoxEngine.debugSend('Произошла ошибка: ' + error.message, "");
		  });
	}
	
	async function getTeamMembers(key, value) {
	  return new Promise(async (resolve, reject) => {
		try {
		  let response = await request.sendPost({
				sysRequest: "selectUsers",
				selectKey: key,
				selectValue: value
			},
			(result) => {
			  console.log(result);
			},
			false
		  );

		  if (response.status === 200) {
			const responseData = await response.text();
			resolve(responseData);
		  } else {
			console.error('HTTP error:', response.status);
			reject(new Error(`HTTP Error: ${response.status}`));
		  }
		} catch (error) {
		  console.error('An error occured:', error.message);
		  reject(error);
		}
	  });
	}