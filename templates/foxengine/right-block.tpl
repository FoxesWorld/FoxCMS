<div class="col-4">
<div class="row rightBlock">
   <div class="card">
      <div id="userBlock">
         <div class="userProfile">
            <ul>
               <li class="profilePhoto">
                  <img src="{$profilePhoto}">
               </li>
               <div class="userdata">
                  <li>
				  <div class="loginBox">
				  <table>
				  <tr>
					<td>
						<i class="fs-4 fw-bolder text-muted">{$login}</i>
					</td>
					{if $user_group != 5}
					<td class="logout">
						<form method="POST" action="/">
							<button type="submit" class="logout"><i class="fa fa-sign-out"></i> </button>
							<input name="userAction" class="input" type="hidden" value="logout" />
						</form>
					</td>
					{/if}
					</tr>
				  </table>
					
				  </div>
				  </li>
                  <li class="tip-over"><b><i class="fa fa-address-card-o" aria-hidden="true"></i>Почта</b>: {$email}</li>
                  <li class="tip-over"><b><i class="fa fa-users" aria-hidden="true"></i>Группа</b>: {$groupName}</li>
                  <li class="tip-over"><b><i class="fa fa-diamond" aria-hidden="true"></i>Полное имя</b>: {$realname}</li>
				  {if $user_group != 5}<li class="tip-over" aria-label="Валюта проекта"><b><i class="fa fa-diamond"></i>Юниты</b>: 0</li>{/if}
               </div>
            </ul>
			{if $user_group == 5}
            <ul class="userActions">
               <li>                  
                  <a href="#" onclick="FoxEngine.loadPage('auth', replaceData.contentBlock); return false;">
					  <button type="submit" class="login">
						Авторизация <i class="fa fa-sign-in"></i>
					  </button>
                  </a>
				  				  
               </li>
            </ul>
			{/if}
         </div>
      </div>
   </div>
   
    {if $user_group != 5}
      <div class="card">				
			<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
			  <div class="card-header">Меню пользователя</div>
				  <div class="card-body">
					  <div class="right-profile-menu">
						<ul id="usrMenu">
						</ul>
					  </div>
				  </div>
			</div>
      </div>
	  {/if}
   
      <div class="card d-none d-sm-block">		
      	<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Последняя регистрация</div>
			<div id="lastUser">
			
			</div>
      	</div>
      </div>
</div>
</div>