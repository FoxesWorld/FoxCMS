		function mainRefresh(block){
		  $.ajax('/').done(function (data) {
			$(block).fadeOut(500);
			let s = '';
			$(data).find(block).each(function(){
			  s+=this.innerHTML;
			  setTimeout(function(){
				  $(block).fadeIn(500);
				  $(block).html(s);
			  }, 600);
			})
		  });
		};