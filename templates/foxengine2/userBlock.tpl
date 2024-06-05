				   <li class="nav-item dropdown">
					  <a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center userBlock" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="foxEngine.user.refreshBalance(['units', 'crystals'])">
						 <div class="avatar">
							<img class="profilePic uk-animation-fade" src="{$profilePhoto}" alt="Profile Photo" /> {$login}
						 </div>

					  </a>
					  <ul class="dropdown-menu fade dropdown-menu-popover p-2 dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink"  data-popper-placement="bottom" style="width: 340px">
						<span class="arrow"></span>
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
										</ul>
									 </div>
								  </div>
							   </div>
							</span>
						 </li>
						 <script>
							async function addFunds(){
								const template = await foxEngine.loadTemplate(foxEngine.elementsDir+'payment.tpl', true);
								let data = await foxEngine.entryReplacer.replaceText(template, "");
								foxEngine.modalApp.showModalApp(900, data);
							}
						 </script>
						 <ul id="usrMenu">
							<li>
							   <hr class="dropdown-divider" />
							   
							   <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
					<div class="filled-box p-1 text-center lh-sm">
						<img src="{$tplDir}/assets/icons/units.png" alt="Units Icon" uk-img />
						<b class="fs-5" id="units" data-element="moneyDisplay">0</b><br />
						<span class="text-muted">Юниты</span>
					</div>
					<div class="filled-box p-1 text-center lh-sm">
						<img src="{$tplDir}/assets/icons/crystals.png" alt="Crystals Icon" uk-img />
						<b class="fs-5" id="crystals" data-element="bonusDisplay">0</b><br />
						<span class="text-muted">Кристалы</span>
					</div>
				</div>
							</li>
							{if $user_group == 1}
							<li class="dropdown-item">
							   <a class="pageLink-addFunds" onclick="addFunds(); return false; ">
								  <div class="rightIcon">
									 <i style="color: #d8e815" class="fa-thin fa-wallet"></i>
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