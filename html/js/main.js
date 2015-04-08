$(function() {
    var body = $("body");
    body.addClass("ready");
    var colorChangeIntro = function() {
        {
            var bg = body.data("bg");
            body.data("type"), body.data("mark");
        }
        $(".main-nav").css("background-color", bg);
    };
    colorChangeIntroID = setInterval(colorChangeIntro, 10), $(".burger-box").on("click", function(event) {
        event.preventDefault(), $(this).hasClass("open") ? ($(this).removeClass("open").addClass("closed"), 
        $(".main-nav").removeClass("active")) : ($(this).addClass("open").removeClass("closed"), 
        $(".main-nav").addClass("active"));
    });
    var popupWindow = function() {
        $("a[data-popup]").on("click", function(event) {
            event.preventDefault(), window.open($(this)[0].href);
        });
    };
    popupWindow();
});