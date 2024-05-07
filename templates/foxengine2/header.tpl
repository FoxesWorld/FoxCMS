       <header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg bar">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <!-- Logo -->
            <div class="logo-block">
                <a href="/" class="navbar-brand">
                    <div class="logoWrapper">
                        <div class="logo uk-animation-slide-left">
                            <ul class="list-inline">
                                <li>
                                    <img class="img-fluid" uk-img />
                                </li>

                                <li>
                                    <div class="titleWrapper uk-animation-fade">
                                        <h1 class="title">{$siteTitle}</h1>
                                    </div>
                                </li>

                                <li><small class="status uk-animation-fade">{$siteStatus}</small></li>
                            </ul>
                            <span class="line uk-animation-expand"></span>
                        </div>
                    </div>
                </a>
            </div>
            <!-- Nav -->
            <div class="navbar-center">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0 dropup"></ul>
                </div>
            </div>

            <!-- Userfields -->
            <div class="navbar-right">
				<ul class="userBlock">
				   <!--  LOGGED USER -->
				   {if $user_group != 5}
				   <li class="nav-item dropdown">
					  <a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center userBlock" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						 <div class="avatar">
							<img class="profilePic uk-animation-fade" src="{$profilePhoto}" alt="Profile Photo" />
						 </div>
						 <div class="d-none d-sm-block">
							<img src="{$tplDir}/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
							<span id="realmoney-info-login" class="ms-2">{$units}</span>
						 </div>
					  </a>
					  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink" data-bs-popper="static">
						 <li>
							<span class="dropdown-item">
							   <div class="d-flex align-items-center">
								  <div class="flex-grow-1">
									 <div class="d-flex">
										<div class="flex-shrink-0">
										   <div class="avatar">
											  <img class="h-auto rounded-circle profilePic uk-animation-fade" style="width: 42px;" src="{$profilePhoto}" alt="Profile Photo" uk-img />
										   </div>
										</div>
										<ul class="me-3">
										   <li class="fw-medium d-block">{$login}</li>
										   <li class="text-muted">{$groupName}</li>
										   <li class="d-xl-none d-md-none d-sm-none">
											  <img src="/templates/foxengine2/assets/icons/crystals.png" alt="Crystals Icon" style="height: 25px;">
											  <span id="realmoney-info-login" class="ms-2">{$units}</span>
										   </li>
										</ul>
									 </div>
								  </div>
							   </div>
							</span>
						 </li>
						 <script>
							async function addFunds(){
								const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl', true);
								let data = foxEngine.entryReplacer.replaceText(template, "");
								foxEngine.modalApp.showModalApp(900, data);
								//
							}
						 </script>
						 <ul id="usrMenu">
							<li>
							   <hr class="dropdown-divider" />
							</li>
							{if $user_group == 4}
							<li class="dropdown-item">
							   <a class="pageLink-addFunds" onclick="addFunds(); return false; ">
								  <div class="rightIcon">
									 <i style="color: #d8e815" class="fa fa-money"></i>
								  </div>
								  Пополнить счёт
							   </a>
							</li>
							{/if}
							<!-- User options go here -->
						 </ul>
						 <li class="dropdown-item">
							<a href="#" class="pageLink-logout" onclick="foxEngine.user.logout($(this)); return false;"> <i style="color: red" class="fa fa-sign-out me-2"></i> Выйти </a>
						 </li>
					  </ul>
				   </li>
				   {else}
				   <li class="d-flex align-items-center">
					  <a href="#" class="pageLink-auth" onclick="foxEngine.page.loadPage('auth', replaceData.contentBlock); return false;"> <i class="fa fa-sign-in me-2"></i> Войти </a>
				   </li>
				   <li class="d-flex align-items-center">
					  <a href="#" class="pageLink-reg" onclick="foxEngine.page.loadPage('reg', replaceData.contentBlock); return false;"> <i class="fa fa-user-plus me-2"></i> Создать аккаунт</a>
				   </li>
				   {/if}
				</ul>
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

                <button class="navbar-toggler" onclick="toggleAbsolutePosition()" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <span class="navbar-toggler-bar bar1 mt-2"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </span>
                </button>
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
