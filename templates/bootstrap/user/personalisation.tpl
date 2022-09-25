											<h2 id="modalTitle">Давай украшать!</h2>
											<span id="modalDesc">Посмотрим <b>{$realname}</b>, что ты тут можешь сделать...</span>

													<input type="file" id="profilePhoto" name="image" accept=".jpeg" data-file-metadata-imagetype="profilePhoto" /> 

													<script>
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
															</script>