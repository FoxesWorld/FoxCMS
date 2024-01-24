        <div class="userProfile">
<ul class="profileTop">
    <li class="profilePhoto">
        <img src="{$profilePhoto}" />
    </li>
    
    <li class="user_panel_nickname">
        <span class="hello_player">Привет,</span>
        <a id="sidepanel_nickname" onclick="foxEngine.user.showProfilePopup('{$login}')" class="shortened">{$login}</a>
    </li>
    

</ul>

{if $user_group != 5}
<div id="user_panel_balance">
        <div class="user_panel_balance_current">
            <span id="realmoney-info-login">{$units}</span>
        </div>
        <div class="user_panel_balance_type">
            <span id="user_panel_balance_type">ЮНИТОВ</span>
        </div>
        <button class="login" onclick="addFunds(); return false;">ПОПОЛНИТЬ</button>
    </div>
				
	<div class="right-profile-menu">
		<ul id="usrMenu">
		</ul>
  </div>
  <script>
	async function addFunds(){
		const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl');
		let data = foxEngine.entryReplacer.replaceText(template, "");
		foxEngine.modalApp.showModalApp(900, data);
		//
	}
  </script>
  {/if}
 </div>