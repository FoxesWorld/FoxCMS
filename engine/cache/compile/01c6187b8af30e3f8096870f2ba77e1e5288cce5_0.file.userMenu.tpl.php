<?php
/* Smarty version 4.0.4, created on 2022-09-24 00:43:45
  from '/var/www/html/templates/bootstrap/userMenu.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_632e28919e6f02_61406693',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '01c6187b8af30e3f8096870f2ba77e1e5288cce5' => 
    array (
      0 => '/var/www/html/templates/bootstrap/userMenu.tpl',
      1 => 1663949062,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_632e28919e6f02_61406693 (Smarty_Internal_Template $_smarty_tpl) {
?>								<div class="tabs animate__animated animate__backInRight animate__delay-1s">
									<ul class="tab_caption">
										<li class="active" value="profile">Настройки профиля</li>
										<li>Персонализация</li>
										<li>Безопасность</li>
									</ul>
																	
									<div class="tab_content active">
										<h2 id="modalTitle">Давай меняй!</h2>
										<span id="modalDesc">Посмотрим <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, что ты тут можешь поменять...</span>
										<section id="contentLoading">
											<form method="POST" action="/" id="editProfileForm">

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
													<input id="password" class="input" type="text" autocomplete="off" required name="required">
													<label class="label">Текущий пароль</label>
												</div>
															
												<input id="user_doaction" class="input" type="hidden" value="editProfile" />
												<input id="login" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['LoggedName']->value;?>
" />
												<input type="submit" class="login" />
											</form>
										</section>
									</div>

										<div class="tab_content">
											<h2 id="modalTitle">Давай украшать!</h2>
											<span id="modalDesc">Посмотрим <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, что ты тут можешь сделать...</span>
											
											<form method="POST" action="/" id="uploadForm">

													<input type="file" name="image" accept=".gif,.jpg,.jpeg,.png" data-file-metadata-imagetype="profilePhoto" /> 

												<div class="input_block inline">
													<input type="submit" class="login" />
												</div>
												<input id="user_doaction" type="hidden" value="loadPhoto" />
												<input id="login" class="input" type="hidden" value="<?php echo $_smarty_tpl->tpl_vars['LoggedName']->value;?>
" />
											</form>
											

											<?php echo '<script'; ?>
>
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
											<?php echo '</script'; ?>
>
										</div>
													
										<div class="tab_content">
											<h2 id="modalTitle">Давай портить!</h2>
											<span id="modalDesc">Да, <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, тут уже всё испорчено...</span>
											<section id="contentLoading">
											
											</section>
										</div>
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
><?php }
}
