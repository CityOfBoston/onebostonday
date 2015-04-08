$(function(){
	/*/////////////////////////
	// 60fps scroll paints
	/////////////////////////*/
	var body = $('body');
	var timer;
	$(window).on("scroll", function(){
		if(! body.hasClass('disable-hover')){
			body.addClass('disable-hover');
		}
		timer = setTimeout(function(){
			body.removeClass('disable-hover');
		}, 250);
	}, false);


	/*/////////////////////////
	// Split up query strings
	/////////////////////////*/
	var getQueryVariable = function(variable){
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if(pair[0] === variable){
				return pair[1];
			}
		}

		return(false);
	};

	/*/////////////////////////
	// open data-target in new tabs
	/////////////////////////*/
	var popupWindow = function(){
		$("a[data-popup]").on("click", function(event){
			event.preventDefault();
			window.open($(this)[0].href);
		});
	};
	popupWindow();
});
