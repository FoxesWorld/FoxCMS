
	function configParse() {

	
    let cfgHTML;
    let answer = request.send_post({
        admPanel: "cfgParse"
    });
    answer.onreadystatechange = function() {
        if (answer.readyState === 4) {
			$(".adminPanel").html(this.responseText);
        }
    }
}