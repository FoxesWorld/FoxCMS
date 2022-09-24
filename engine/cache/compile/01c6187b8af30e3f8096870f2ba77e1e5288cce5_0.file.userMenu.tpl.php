<?php
/* Smarty version 4.0.4, created on 2022-09-24 23:10:17
  from '/var/www/html/templates/bootstrap/userMenu.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_632f64294feb28_83946638',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '01c6187b8af30e3f8096870f2ba77e1e5288cce5' => 
    array (
      0 => '/var/www/html/templates/bootstrap/userMenu.tpl',
      1 => 1664050103,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_632f64294feb28_83946638 (Smarty_Internal_Template $_smarty_tpl) {
?>								<div class="tabs">
									<ul class="tab_caption animate__animated animate__fadeInRightBig animate__delay-1s">
										<li class="active" value="profile">Настройки профиля</li>
										<li>Персонализация</li>
										<li>Безопасность</li>
									</ul>

									<form method="POST" action="/" id="editProfileForm">								
										<div class="tab_content active">
											<h2 id="modalTitle">Давай меняй!</h2>
											<span id="modalDesc">Посмотрим <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, что ты тут можешь поменять...</span>
											<section>
													<div class="input_block">
														<input id="realname" class="input" type="text" autocomplete="off" required value="<?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
">
														<label class="label">Полное имя</label>
													</div>
																
													<div class="input_block">
														<input id="email" class="input" type="text" autocomplete="off" required value="<?php echo $_smarty_tpl->tpl_vars['email']->value;?>
">
														<label class="label">E-mail</label>
													</div>

													<div class="input_block">
														<input id="password" class="input" type="text" autocomplete="off">
														<label class="label">Текущий пароль</label>
													</div>
											</section>
										</div>

										<div class="tab_content">
											<h2 id="modalTitle">Давай украшать!</h2>
											<span id="modalDesc">Посмотрим <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, что ты тут можешь сделать...</span>

													<input type="file" id="profilePhoto" name="image" accept=".jpeg" data-file-metadata-imagetype="profilePhoto" /> 

										</div>
													
										<div class="tab_content">
											<h2 id="modalTitle">Давай портить!</h2>
											<span id="modalDesc">Настройки безопасности, <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, изменить может тут</span>
											<section>
													
													<div class="input_block">
													<input id="newPass" class="input" type="text" autocomplete="off">
														<label class="label">Новый пароль</label>
													</div>
													
													<div class="input_block">
													<input id="repeatPass" class="input" type="text" autocomplete="off">
														<label class="label">Повтор пароля</label>
													</div>
													
											</section>
										</div>
											<input id="user_doaction" class="input" type="hidden" value="editProfile" />
											<input id="login" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['LoggedName']->value;?>
" />
											<input id="userGroup" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['userGroup']->value;?>
" />
											<input id="foxesHash" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['loginHash']->value;?>
" />
											<button type="submit" class="login">Изменить <div class="fa fa-cog fa-spin"></div></button>
									</form>
								</div>
												
									<?php echo '<script'; ?>
>
										$(function() {
											$('ul.tab_caption').on('click', 'li:not(.active)', function() {
												$(this)
													.addClass('active').siblings().removeClass('active')
													.closest('div.tabs').find('div.tab_content').removeClass('active').eq($(this).index()).addClass('active');
													let tab = $(this);
											});
										});
									<?php echo '</script'; ?>
>

									<?php echo '<script'; ?>
>
												FilePond.registerPlugin(
													FilePondPluginImageCrop,
													FilePondPluginMediaPreview,
													FilePondPluginImagePreview,
													FilePondPluginFileMetadata,
													FilePondPluginFileRename
												);
												FilePond.setOptions(
												{
													maxFileSize: '15MB',
													imageCropAspectRatio: '3:5',
													server: '/'
													   /*
													   fileRenameFunction: (file) =>
															new Promise((resolve) => {
															resolve(window.prompt('Enter new filename', file.name));
														}) */
												});
																							
												const inputElement = document.querySelector('input[type="file"]');
												const pond = FilePond.create(
													inputElement, {
															allowMultiple: false,
															allowReorder: false
													}
												);

												window.pond = pond;
											<?php echo '</script'; ?>
><?php }
}
