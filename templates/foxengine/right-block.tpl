<div class="col-4">
<div class="row rightBlock">
   <div class="card">
      <div id="userBlock">
         <div class="userProfile animate__animated animate__backInRight animate__delay-1s">
            <ul>
               <li class="profilePhoto">
                  <img src="{$profilePhoto}">
               </li>
               <div class="userdata">
                  <li><b><i class="fa fa-user-circle-o" aria-hidden="true"></i>Логин</b>: {$login}</li>
                  <li><b><i class="fa fa-address-card-o" aria-hidden="true"></i>Почта</b>: {$email}</li>
                  <li><b><i class="fa fa-users" aria-hidden="true"></i>Группа</b>: {$groupName}</li>
                  <li><b><i class="fa fa-diamond" aria-hidden="true"></i>Полное имя</b>: {$realname}</li>
               </div>
            </ul>

            <ul class="userActions">
               <li>

                  {if $user_group == 5}
                  <a href="#" onclick="FoxEngine.loadPage('auth', replaceData.contentBlock); return false;">
                  <button type="submit" class="login">Авторизация <i class="fa fa-sign-in"></i>
                  </button>
                  </a>
                  {else}
                  <div class="right-profile-menu">
                     <form method="POST" action="/">
                        <ul id="usrMenu">
                        </ul>
                        <input name="userAction" class="input" type="hidden" value="logout">
                     </form>
                  </div>
				  {/if}				  
               </li>
            </ul>
         </div>
      </div>
   </div>
   
      <div class="card">		
      	<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Последняя регистрация</div>
			<div id="lastUser">
			
			</div>
      	</div>
      </div>
      <!-- 
      <div class="card">				
      	<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
      	  <div class="card-header">Help2</div>
      		  <div class="card-body">
      				<h5 class="card-title">Get help by here</h5>
      				<p class="card-text">Some quick example text</p>
      		  </div>
      	</div>
      </div>
      -->
</div>
</div>