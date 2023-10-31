{if $user_group != 5}
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
						<b>{$login}</b>
					</td>
					{if $user_group != 5}
					<td class="logout">
						<form method="POST" id="logout" action="/">
							<button type="submit" class="logout"><i class="fa fa-sign-out"></i> </button>
							<input name="userAction" class="input" type="hidden" value="logout" />
						</form>
					</td>
					{/if}
					</tr>
				  </table>
					
				  </div>
				  </li>
                  <li><b><i class="fa fa-address-card-o"></i>Почта</b>: {$email}</li>
                  <li><b><i class="fa fa-users"></i>Группа</b>: {$groupName}</li>
                  <li><b><i class="fa fa-diamond"></i>Полное имя</b>: {$realname}</li>
				  {if $user_group != 5}<li title="Валюта проекта" data-toggle="tooltip"><b><i class="fa fa-krw"></i>Юниты</b>: 0</li>{/if}
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
			<div class="card text-white  mb-3" style="max-width: 18rem;">
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
      	<div class="card text-white  mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Последняя регистрация</div>
			<div id="lastUser">
			
			</div>
      	</div>
      </div>
</div>
</div>
{/if}