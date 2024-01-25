<header id="header" class="navbar fixed-top uk-navbar navbar-expand-lg">
	<div class="container-fluid d-flex align-items-center justify-content-between">
		<!-- Logo -->
		<div class="logo-block">
			<a href="/" class="navbar-brand">
				<link type="text/css" rel="stylesheet" href="{$tplDir}/logo/logo.css" />
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
				<script src="{$tplDir}/logo/animation.js"></script>
			</a>
		</div>
		<!-- Nav -->
<div class="navbar-center flex-grow-1">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav leftAction me-auto mb-2 mb-lg-0 dropup"></ul>
    </div>
</div>


		<!-- Userfields -->
		<div class="navbar-right userBlock">
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img class="profilePic uk-animation-fade" src="{$profilePhoto}" alt="Profile Photo" />
					{if $user_group != 5}
					<img src="{$tplDir}/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
					<span id="realmoney-info-login" class="ms-2">{$units}</span>
					{/if}
				</a>
				<ul class="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdownMenuLink" data-bs-popper="static">
				
					<li>
						<span class="dropdown-item">
							<div class="d-flex align-items-center">
								<div class="flex-grow-1">
									<div class="d-flex align-items-center">
										<div class="flex-shrink-0 me-3">
											<div class="avatar">
												<img class="w-40 h-auto rounded-circle profilePic uk-animation-fade" src="{$profilePhoto}" alt="Profile Photo" uk-img />
											</div>
										</div>
										<div>
											<span class="fw-medium d-block">{$login}</span>
											<small class="text-muted">{$groupName}</small>
										</div>
									</div>
								</div>
							</div>
						</span>
					</li>
				
					{if $user_group == 5}
					<li class="dropdown-item">
						<a href="#" class="pageLink-auth" onclick="foxEngine.page.loadPage('auth', replaceData.contentBlock); return false;"> <i class="fa fa-sign-in me-2"></i> Войти </a>
					</li>
					<li class="dropdown-item">
						<a href="#" class="pageLink-reg" onclick="foxEngine.page.loadPage('reg', replaceData.contentBlock); return false;"> <i class="fa fa-user-plus me-2"></i> Зарегистрироваться </a>
					</li>
					{else}

					<ul id="usrMenu">
						<!-- Здесь можно добавить дополнительные пункты меню -->
					</ul>

					<li><hr class="dropdown-divider" /></li>

					<li class="dropdown-item">
						<a href="#" class="pageLink-logout" onclick="foxEngine.user.logout($(this)); return false;"> <i style="color: red" class="fa fa-sign-out me-2"></i> Выйти </a>
					</li>

					{/if}
				</ul>
			</li>

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

				.dropdown-item > a > i {
				    margin: 2px 5px;
				}
			</style>

			<!--  -->
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
