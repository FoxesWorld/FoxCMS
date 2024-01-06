//WIP

//function AdminPanel(login) {
	
	let selectoption = {
        thisAdmoption: "",
        thatAdmoption: ""
    };
	
	
	function setAdmOption(option) {
		//FoxesInput.initialised = false;
        $(".admOpt-" + option).addClass("active");
        if (option != selectoption.thisAdmoption) {
            selectoption.thatAdmoption = selectoption.thisAdmoption;
            $(".admOpt-" + selectoption.thatAdmoption).removeClass("active");
        }
        selectoption.thisAdmoption = option;
		foxEngine.foxesInputHandler.formInit(500);
    };
	
	function loadAdmOpt(option){
		eval("let "+option + " = new "+capitalizeFirstLetter(option)+"();"
		+option+'.'+"parse"+capitalizeFirstLetter(option)+"();");
		//eval(option+'()');
		setAdmOption(option);
	};
	
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
//}