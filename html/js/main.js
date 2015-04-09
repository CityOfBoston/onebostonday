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
    colorChangeIntroID = setInterval(colorChangeIntro, 10);
    var video = '<iframe src="https://player.vimeo.com/video/124313553?autoplay=1&title=0&byline=0&portrait=0" width="500" height="213" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $(".video span").on("click", function() {
        $(".video span").fadeOut(function() {
            $(".video img").remove(), $(".video").append(video), $(".video").fitVids();
        });
    });
    var middleSlide = Math.ceil($(".slider .activity").length / 2) - 1;
    console.log(middleSlide), $(".slider").slick({
        slide: ".activity",
        dots: !0,
        infinite: !0,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: !0,
        initialSlide: middleSlide
    });
    var tweetString = "For #OneBostonDay, ";
    $("button.tweet").on("click", function() {
        tweetValue = $(".craft textarea").val(), finalTweet = encodeURIComponent(tweetString + tweetValue), 
        tweetIntent = "https://twitter.com/intent/tweet?text=" + finalTweet + "&related=marty_walsh,notifyboston", 
        popItUp(tweetIntent, 300, 600);
    });
    var characterCount = 100;
    $(".craft textarea").on("focus", function() {
        $(this).on("keyup", function() {
            var length = $(this).val().length, charactersLeft = characterCount - length;
            0 >= charactersLeft ? $(".craft span").html("Your tweet is too long :( <b>" + charactersLeft + "</b>") : $(".craft span").text(charactersLeft);
        });
    }), $(".burger-box").on("click", function(event) {
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
    var popItUp = function(url, height, width) {
        return newwindow = window.open(url, "name", "height=" + height + ",width=" + width), 
        window.focus && newwindow.focus(), !1;
    };
});