<?php
/* Smarty version 4.0.4, created on 2022-05-05 10:47:07
  from '/Avalon/sites/FoxRadio/www/templates/bootstrap/upload.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.0.4',
  'unifunc' => 'content_627380fb069a19_98698216',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4069bd175516de35d0f64b069385de8c4e746fc5' => 
    array (
      0 => '/Avalon/sites/FoxRadio/www/templates/bootstrap/upload.tpl',
      1 => 1651648137,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_627380fb069a19_98698216 (Smarty_Internal_Template $_smarty_tpl) {
?><form action="/" id="upload" method="POST">
	
	<input type="file" name="image[]" accept=".gif,.jpg,.jpeg,.png" /> 

	<input type="submit" class="login" />
</form>
	<?php echo '<script'; ?>
>
	    FilePond.registerPlugin(
		FilePondPluginImageCrop,
		FilePondPluginImagePreview);
		FilePond.setOptions({
		maxFileSize: '15MB',
		imageCropAspectRatio: '3:5',
		server: '/'});
													
		const inputElement = document.querySelector('input[type="file"]');
		const pond = FilePond.create(
			inputElement, {
					allowMultiple: true,
					allowReorder: true
			}
		);

		window.pond = pond;
		
		function uploadImage(){
			let image = $('input[name*="image"]').val();
				$.post('/', {
					userProfileAction: $("#userProfileAction").val(),
					image: image
				}, function (data) {
					console.log(data);
				});
		}
	<?php echo '</script'; ?>
><?php }
}
