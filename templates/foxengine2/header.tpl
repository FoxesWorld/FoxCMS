<style>
.dropdown-item {
	display: contents;
}
					
.dropdown-item > a {
   width: 100%;
   display: flex;
   float: left;
   height: 42px;
   padding: 10px;
}
					
  .navbar-nav > .nav-item > a {
  width: 100%;
}
</style>

				<header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg bar">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <!-- Logo -->
			{include file='logo.tpl'}
            <!-- Nav -->
            <div class="navbar-center">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0 dropup">
				   {if $user_group == 5}
				   <li class="nav-item uk-animation-fade">
					  <a href="#" class="pageLink-auth" onclick="foxEngine.page.loadPage('auth'); return false;"> <i class="fa fa-sign-in me-2"></i> Войти </a>
				   </li>
				   <li class="nav-item uk-animation-fade">
					  <a href="#" class="pageLink-reg" onclick="foxEngine.page.loadPage('reg'); return false;"> <i class="fa fa-user-plus me-2"></i> Создать аккаунт</a>
				   </li>
				   {/if}
				   
					{if $user_group == 1} 
						
					{/if}
					
					</ul>
                </div>
            </div>

            <!-- Userfields -->
            <div class="navbar-right">
				<ul class="userBlock">
				   <!--  LOGGED USER -->
				   {if $user_group != 5}
						{include file='userBlock.tpl'}
				   {else}
                <button class="navbar-toggler" style="width: auto;" onclick="toggleAbsolutePosition()" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <span class="navbar-toggler-bar bar1 mt-2"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
				{/if}
				</ul>
            </div>
        </div>
    </header>

<script>
	 function toggleAbsolutePosition() {
	     var navbarCollapse = document.getElementById("navbarSupportedContent");
	     if (getComputedStyle(navbarCollapse).position === "absolute") {
			setTimeout(function() {
					navbarCollapse.style.position = "";
			}, 350);
	         
	     } else {
	         navbarCollapse.style.position = "absolute";
	         navbarCollapse.style.right = "0";
	         navbarCollapse.style.top = "100px";
	     }
	 }

	  document.addEventListener('click', function(event) {
	     var navbarCollapse = document.getElementById("navbarSupportedContent");
	     var navbarToggler = document.querySelector(".navbar-toggler");

	     if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
	navbarToggler.classList.add("collapsed");
	     }
	 });
</script>