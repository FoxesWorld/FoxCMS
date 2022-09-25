								<div class="tabs">
									<ul class="tab_caption animate__animated animate__fadeInRightBig animate__delay-1s">
										<li class="active" value="profile">Настройки профиля</li>
										<li>Персонализация</li>
										<li>Безопасность</li>
									</ul>

									<form method="POST" action="/" id="editProfileForm">								
										<div class="tab_content active">
											{include file = "user/baseInfo.tpl"}
										</div>

										<div class="tab_content">
											{include file = "user/personalisation.tpl"}
										</div>
													
										<div class="tab_content">
											{include file = "user/security.tpl"}
										</div>
											<input id="user_doaction" class="input" type="hidden" value="EditUser" />
											<input id="login" class="input" type="hidden" value="{$login}" />
											<input id="userGroup" class="input" type="hidden" value="{$user_group}" />
											<input id="foxesHash" class="input" type="hidden" value="{$hash}" />
											<button type="submit" class="login">Изменить <div class="fa fa-cog fa-spin"></div></button>
									</form>
								</div>
												
									<script>
										$(function() {
											$('ul.tab_caption').on('click', 'li:not(.active)', function() {
												$(this)
													.addClass('active').siblings().removeClass('active')
													.closest('div.tabs').find('div.tab_content').removeClass('active').eq($(this).index()).addClass('active');
													let tab = $(this);
											});
										});
									</script>

