		function removeHash () { 
			var scrollV, scrollH, loc = window.location;
			if ("pushState" in history)
				history.pushState("", document.title, loc.pathname + loc.search);
			else {
				scrollV = document.body.scrollTop;
				scrollH = document.body.scrollLeft;
				loc.hash = "";
				document.body.scrollTop = scrollV;
				document.body.scrollLeft = scrollH;
			}
		}

		function refreshMain(){
		 $.ajax('/').done(function (data) {
			 let s;
			 $(data).find('#content').each(function(){
				 s+=this.innerHTML;
			 })
			  $('#content').html(s);
		 });
		}
		
		function mainRefresh(button){
		  button.addClass('animated jackInTheBox');
		  $.ajax('/').done(function (data) {
			$("#content").fadeOut(500);
			let s = '';
			console.log($(data).find('#content'));
			$(data).find('#content').each(function(){
			  s+=this.innerHTML;
			  setTimeout(function(){
				  $("#content").fadeIn(500);
				  $('#content').html(s);
				  button.removeClass('jackInTheBox');
			  }, 600);
			})
		  });
		};