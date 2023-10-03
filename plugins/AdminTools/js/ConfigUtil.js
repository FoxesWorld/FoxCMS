
	function settings() {

	
    let cfgHTML;
    let answer = request.send_post({
        admPanel: "cfgParse"
    });
    answer.onreadystatechange = function() {
        if (answer.readyState === 4) {
			$("#adminContent").html(this.responseText);
        }
    }
}