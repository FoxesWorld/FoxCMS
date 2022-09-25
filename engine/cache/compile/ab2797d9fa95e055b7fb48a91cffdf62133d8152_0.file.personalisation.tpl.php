<?php
/* Smarty version 4.0.4, created on 2022-09-26 00:58:05
  from '/var/www/html/templates/bootstrap/user/personalisation.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_6330ceedcf5ac3_08247303',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ab2797d9fa95e055b7fb48a91cffdf62133d8152' => 
    array (
      0 => '/var/www/html/templates/bootstrap/user/personalisation.tpl',
      1 => 1664135784,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_6330ceedcf5ac3_08247303 (Smarty_Internal_Template $_smarty_tpl) {
?>											<h2 id="modalTitle">Давай украшать!</h2>
											<span id="modalDesc">Посмотрим <b><?php echo $_smarty_tpl->tpl_vars['realname']->value;?>
</b>, что ты тут можешь сделать...</span>

													<input type="file" id="profilePhoto" name="image" accept=".jpeg" data-file-metadata-imagetype="profilePhoto" /> 

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
