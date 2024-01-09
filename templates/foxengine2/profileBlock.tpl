        <div class="userProfile">
<ul class="profileTop">
    <li class="profilePhoto">
        <img src="{$profilePhoto}" alt="Profile Photo">
    </li>
    
    <li class="user_panel_nickname">
        <span class="hello_player">Привет,</span>
        <a id="sidepanel_nickname" onclick="foxEngine.user.showProfilePopup('{$login}')" class="shortened">{$login}</a>
    </li>
    
    {if $user_group != 5}
    <li class="logout">
        <form method="POST" id="logout" action="/">
            <button type="submit" class="logout btn btn-danger">
                <i class="fa fa-sign-out"></i>
            </button>
            <input name="userAction" class="input" type="hidden" value="logout" />
        </form>
    </li>
    {/if}
</ul>

{if $user_group != 5}
<div id="user_panel_balance">
        <div class="user_panel_balance_current">
            <span id="realmoney-info-login">{$units}</span>
        </div>
        <div class="user_panel_balance_type">
            <span id="user_panel_balance_type">ЮНИТОВ</span>
        </div>
        <button class="login" onclick="showPayments(); return false;">ПОПОЛНИТЬ</button>
    </div>
				
	<div class="right-profile-menu">
		<ul id="usrMenu">
		</ul>
  </div>
  {/if}

 {if $user_group == 5}
    <div class="userActions text-center mt-3">
        <a href="#" onclick="foxEngine.loadPage('auth', replaceData.contentBlock); return false;">
           <button type="submit" class="login"><i class="fa fa-sign-in"></i> Авторизация</button>
        </a>
    </div>
  {/if}
 </div>