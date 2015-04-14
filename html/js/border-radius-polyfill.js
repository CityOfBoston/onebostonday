$(function(){
	var fixImage = function(selector,filename){
		selector.find('img').attr('src','/img/'+filename);
		console.log(selector);
	};
	
	fixImage($('.activity.stfrancishouse'),'ftfrancishouse-fallback.png');
	fixImage($('.activity.joshuaeaton'),'joshuaeaton-fallback.png');
	fixImage($('.activity.wzlx'),'wzlx-fallback.png');
	fixImage($('.activity.ibasis'),'ibasis-fallback.png');
});