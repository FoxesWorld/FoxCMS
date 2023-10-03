function AdminPanel(login) {
	
	let selectoption = {
        thisAdmoption: "",
        thatAdmoption: ""
    };
	
	
	setAdmOption = function(option) {
		FoxesInput.initialised = false;
        $(".admOpt-" + option).addClass("active");
        if (option != selectoption.thisAdmoption) {
            selectoption.thatAdmoption = selectoption.thisAdmoption;
            $(".admOpt-" + selectoption.thatAdmoption).removeClass("active");
        }
        selectoption.thisAdmoption = option;
		FoxesInput.formInit(500);
    };
	
	loadAdmOpt = function(option){
		eval(option+'()');
		setAdmOption(option);
	};
}