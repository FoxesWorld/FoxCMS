{if !$isMobile}
<div class="col-4 d-none d-md-block">
<div class="row rightBlock">
<div class="card">
    <div id="userBlock">
        <div class="userProfile">
            <div class="profilePhoto">
                <img src="{$profilePhoto}" alt="Profile Photo">
            </div>
            <div class="list-group userActions">
                <div class="list-group-item">
                    <table>
                        <tr>
                            <td class="align-middle text-center">
                                <b>{$login}</b>
                            </td>
                            {if $user_group != 5}
                            <td class="align-middle logout text-center">
                                <form method="POST" id="logout" action="/">
                                    <button type="submit" class="logout btn btn-danger">
										<i class="fa fa-sign-out"></i>
									</button>
                                    <input name="userAction" class="input" type="hidden" value="logout" />
                                </form>
                            </td>
                            {/if}
                        </tr>
                    </table>
                </div>
                <li class="list-group-item"><b><i class="fa fa-address-card-o"></i> Почта</b>: {$email}</li>
                <li class="list-group-item"><b><i class="fa fa-users"></i> Группа</b>: {$groupName}</li>
                <li class="list-group-item"><b><i class="fa fa-diamond"></i> Полное имя</b>: {$realname}</li>
                {if $user_group != 5}
                <li class="list-group-item" title="Валюта проекта" data-toggle="tooltip">
				<b>
					<i class="fa fa-krw"></i> Юниты
				</b>: {$units}</li>
                {/if}
            </div>
            {if $user_group == 5}
            <div class="userActions text-center mt-3">
                <a href="#" onclick="foxEngine.loadPage('auth', replaceData.contentBlock); return false;">
                    <button type="submit" class="login"><i class="fa fa-sign-in"></i> Авторизация</button>
                </a>
            </div>
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
   
     <div class="card">		
      	<div class="card text-white  mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Servers</div>
			<div id="servers">
			</div>
      	</div>
      </div>
   
      <div class="card">		
      	<div class="card text-white  mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Последняя регистрация</div>
			<div id="lastUser">
			
			</div>
      	</div>
      </div>
</div>
</div>
{/if}