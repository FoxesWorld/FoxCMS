								<div class="tabs animate__animated animate__backInRight animate__delay-1s">
									<ul class="tab_caption">
										<li class="active" value="profile">Настройки профиля</li>
										<li>Персонализация</li>
										<li>Безопасность</li>
									</ul>
																	
									<div class="tab_content active">
										<h2 id="modalTitle">Давай меняй!</h2>
										<span id="modalDesc">Посмотрим <b>{$realname}</b>, что ты тут можешь поменять...</span>
										<section id="contentLoading">
											<form method="POST" action="/" id="editProfileForm">

												<div class="input_block">
													<input id="realname" class="input" type="text" autocomplete="off" required value="{$realname}">
													<label class="label">Полное имя</label>
												</div>
															
												<div class="input_block">
													<input id="email" class="input" type="text" autocomplete="off" required value="{$email}">
													<label class="label">E-mail</label>
												</div>

												<div class="input_block">
													<input id="password" class="input" type="text" autocomplete="off" required name="required">
													<label class="label">Текущий пароль</label>
												</div>
															
												<input id="user_doaction" class="input" type="hidden" value="editProfile" />
												<input id="login" class="input" type="hidden" value="{$LoggedName}" />
												<input type="submit" class="login" />
											</form>
										</section>
									</div>

										<div class="tab_content">
											<h2 id="modalTitle">Давай украшать!</h2>
											<span id="modalDesc">Посмотрим <b>{$realname}</b>, что ты тут можешь сделать...</span>
											
											<form method="POST" action="/" id="uploadForm">

													<input type="file" name="image" accept=".gif,.jpg,.jpeg,.png" data-file-metadata-imagetype="profilePhoto" /> 

												<div class="input_block inline">
													<input type="submit" class="login" />
												</div>
												<input id="user_doaction" type="hidden" value="loadPhoto" />
												<input id="login" class="input" type="hidden" value="{$LoggedName}" />
											</form>
											

											<script>
												FilePond.registerPlugin(
													FilePondPluginImageCrop,
													FilePondPluginMediaPreview,
													FilePondPluginImagePreview,
													FilePondPluginFileMetadata
												);
												FilePond.setOptions(
												{
													maxFileSize: '15MB',
													imageCropAspectRatio: '3:5',
													server: '/'
												});
																							
												const inputElement = document.querySelector('input[type="file"]');
												const pond = FilePond.create(
													inputElement, {
															allowMultiple: false,
															allowReorder: false
													}
												);

												window.pond = pond;
											</script>
										</div>
													
										<div class="tab_content">
											<h2 id="modalTitle">Давай портить!</h2>
											<span id="modalDesc">Да, <b>{$realname}</b>, тут уже всё испорчено...</span>
											<section id="contentLoading">
											
											</section>
										</div>
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