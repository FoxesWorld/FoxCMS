 <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-html.min.js"></script>
	<style>
		#htmlEditor {
		  counter-reset: line;
		  padding: 0;
		  margin: 5px;
		  background: #25271f;
		  color: white;
		  white-space: pre-wrap;
		  position: relative;
		}

		#htmlEditor::before {
		  content: '';
		  position: absolute;
		  top: 0;
		  left: 25px;
		  bottom: 0;
		  content: '';
		  border-left: 1px dashed white;
		}

		#htmlEditor div::before {
		  content: counter(line);
		  counter-increment: line;
		  display: inline-block;
		  width: 2em;
		  margin-right: 1em;
		  color: #6b6b6b;
		}

		#htmlEditor div:hover {
		  background-color: #a4904a66;
		}

		#htmlEditor div {
		border-left: 5px solid transparent;
		transition: background-color 0.3s;
		position: relative;
		}
	</style>

	<div class="container mt-4">
		<b class="mb-4">{fileName}</b>
		<div style="border: solid 1px #BBB;width:99%;height:463px; max-width: 570px;"><textarea style="width:100%;height:440px;" name="file_text" id="file_text" wrap="off">{content}</textarea></div>
		<div style="padding:5px;">
			<input onClick="saveFile($(this), '/templates/{filePath}')" type="button" class="btn btn-success btn-small" value="Save" style="width:100px;" />
			&nbsp;<input onClick="formatCode();" type="button" class="btn btn-primary btn-small" value="Format" style="width:220px;" />
			
			<span class="text-muted text-size-small hidden-xs"><div class="alert alert-warning" role="alert">Formatting destroys `+` be aware of it!!!</div></span>
		<script>
    var editor = CodeMirror.fromTextArea(document.getElementById('file_text'), {
      lineNumbers: true,
      matchBrackets: true,
      indentUnit: 4,
      dragDrop: false,
      mode: "javascript"
    });
	
        function formatCode() {
            var code = editor.getValue();
            var formattedCode = html_beautify(code, {
                indent_size: 4,
                indent_char: " ",
                preserve_newlines: false,
                max_preserve_newlines: 1
            });
            editor.setValue(formattedCode);
        }
	
	async function saveFile(button, filePath) {
		let fileContents = editor.getValue() || '';
		let request = await foxEngine.sendPostAndGetAnswer(
			{
				admPanel: 'updateFile',
				filePath: filePath,
				fileContents: fileContents
			}, "JSON");
		button.notify(request.message, request.status);
	}
				
	editor.refresh();
		</script>

		</div>
	</div>