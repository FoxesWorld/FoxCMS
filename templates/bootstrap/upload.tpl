<form action="/" id="upload" method="POST">
	
	<input type="file" name="image[]" accept=".gif,.jpg,.jpeg,.png" /> 

	<input type="submit" class="login" />
</form>
	<script>
	    FilePond.registerPlugin(
		FilePondPluginImageCrop,
		FilePondPluginMediaPreview,
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
	</script>