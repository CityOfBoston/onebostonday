$(function() {
    $(".burger-box").on("click", function(event) {
        event.preventDefault(), $(this).hasClass("open") ? ($(this).removeClass("open").addClass("closed"), 
        $(".main-nav").removeClass("active")) : ($(this).addClass("open").removeClass("closed"), 
        $(".main-nav").addClass("active"));
    });
    var timer, body = $("body");
    $(window).on("scroll", function() {
        body.hasClass("disable-hover") || body.addClass("disable-hover"), timer = setTimeout(function() {
            body.removeClass("disable-hover");
        }, 250);
    }, !1);
    var popupWindow = function() {
        $("a[data-popup]").on("click", function(event) {
            event.preventDefault(), window.open($(this)[0].href);
        });
    };
    popupWindow();
});