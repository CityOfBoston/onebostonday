$(function() {
    var body = $("body");
    body.addClass("ready");
    $(".main-nav a").on("click", function(event) {
        if ($(".press").length <= 0) {
            event.preventDefault();
            var target = $(this).attr("href"), distance = $(target).offset().top - $(".main-nav").height();
            $("html,body").animate({
                scrollTop: distance + "px"
            });
        }
    });
    var video = '<iframe src="https://player.vimeo.com/video/124662459?autoplay=1" width="500" height="367" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $(".video span").on("click", function() {
        $(".video span").fadeOut(function() {
            $(".video img").remove(), $(".video").append(video), $(".video").fitVids();
        });
    }), $(".slider").slick({
        slide: ".activity",
        dots: !0,
        infinite: !0,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: !0,
        initialSlide: 0
    });
    var tweetString = "For #OneBostonDay, ";
    $("button.tweet").on("click", function() {
        tweetValue = $(".craft textarea").val(), finalTweet = encodeURIComponent(tweetString + tweetValue + " What will you do?"), 
        tweetIntent = "https://twitter.com/intent/tweet?text=" + finalTweet + "&related=marty_walsh,notifyboston", 
        popItUp(tweetIntent, 300, 600);
    });
    var characterCount = 102;
    $(".craft textarea").on("focus", function() {
        $(this).on("keyup", function() {
            var length = $(this).val().length, charactersLeft = characterCount - length;
            0 > charactersLeft ? $(".craft span").html("Your tweet is too long :( <b>" + charactersLeft + "</b>") : $(".craft span").text(charactersLeft);
        });
    });
    var loadFeed = function(file) {
        $.ajax({
            url: "/feeds/" + file,
            dataType: "json",
            success: function(response) {
                var totalPosts = response.data.length;
                for (totalPosts > 54 && (totalPosts = 54), i = 0; i < response.data.length; i++) {
                    var post = response.data[i];
                    "twitter" === post.provider ? twitterTemplate(post.userimageurl, post.full_name, post.username, post.created_at, post.social_id, post.message) : "instagram" === post.provider && instagramTemplate(post.image, post.full_name, post.username, post.created_at, post.social_id, post.message);
                }
                $(window).width() < 800 && ($(".feed > ul").slick({
                    slide: "li",
                    dots: !0,
                    arrows: !1,
                    infinite: !1,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 6,
                    adaptiveHeight: !0
                }), setTimeout(function() {
                    $(".feed ul.slick-dots").clone().insertBefore($(".feed .slick-list")).addClass("above-dots");
                }, 300), $(".feed > ul").on("swipe", function(event, slick, direction) {
                    $(".slick-dots.above-dots li").each(function() {
                        $(this).removeClass("slick-active");
                    }), $(".slick-dots.above-dots li:nth-child(" + (slick.currentSlide + 1) + ")").addClass("slick-active");
                }), $("body").on("click", ".slick-dots.above-dots li", function() {
                    var page = $(this).index() + 1;
                    $(".feed > ul").slick("slickGoTo", page), $(".slick-dots.above-dots li").each(function() {
                        $(this).removeClass("slick-active");
                    }), $(".slick-dots.above-dots li:nth-child(" + page + ")").addClass("slick-active");
                }));
            }
        });
    }, file = "";
    $.ajax({
        url: "/feeds",
        success: function(response) {
            $(response).find("td > a").each(function() {
                file = $(this).attr("href");
            }), loadFeed(file);
        }
    }), $("body").on("click", ".actions a", function(event) {
        event.preventDefault(), popItUp($(this).attr("href"), 300, 600);
    });
    var twitterTemplate = function(profileImage, twitterName, twitterUser, twitterTime, twitterTweetUrl, twitterTweetEntity) {
        var intentReply = "https://twitter.com/intent/tweet?in_reply_to=" + twitterTweetUrl, intentRetweet = "https://twitter.com/intent/retweet?tweet_id=" + twitterTweetUrl, intentFavorite = "https://twitter.com/intent/favorite?tweet_id=" + twitterTweetUrl, twitterMarkup = "";
        twitterMarkup += '<li class="twitter">', twitterMarkup += '    <div class="profile-image">', 
        twitterMarkup += '        <img src="' + profileImage + '">', twitterMarkup += "    </div>", 
        twitterMarkup += '    <div class="tweet">', twitterMarkup += '        <header class="tweet-header">', 
        twitterMarkup += "            <h4>" + twitterName + "</h4>", twitterMarkup += '            <a class="handle" href="https://twitter.com/' + twitterUser + '" target="_blank">@' + twitterUser + "</a>", 
        twitterMarkup += '            <a class="time" href="https://twitter.com/' + twitterUser + "/status/" + twitterTweetUrl + '" target="_blank" title=" ' + twitterTime + ' "></a>', 
        twitterMarkup += "        </header>", twitterMarkup += '        <div class="tweet-entity">', 
        twitterMarkup += "            <p>" + twitterTweetEntity + "</p>", twitterMarkup += "        </div>", 
        twitterMarkup += "    </div>", twitterMarkup += '    <div class="actions">', twitterMarkup += "        <ul>", 
        twitterMarkup += "            <li>", twitterMarkup += '                <a href="' + intentReply + '">', 
        twitterMarkup += '                    <svg class="icon icon-reply"><use xlink:href="#icon-reply"></use></svg>', 
        twitterMarkup += "                </a>", twitterMarkup += "            </li>", twitterMarkup += "            <li>", 
        twitterMarkup += '                <a href="' + intentRetweet + '">', twitterMarkup += '                    <svg class="icon icon-retweet"><use xlink:href="#icon-retweet"></use></svg>', 
        twitterMarkup += "                </a>", twitterMarkup += "            </li>", twitterMarkup += "            <li>", 
        twitterMarkup += '                <a href="' + intentFavorite + '">', twitterMarkup += '                    <svg class="icon icon-star"><use xlink:href="#icon-star"></use></svg>', 
        twitterMarkup += "                </a>", twitterMarkup += "            </li>", twitterMarkup += "        </ul>", 
        twitterMarkup += "    </div>", twitterMarkup += "</li>", $(".feed > ul").append(twitterMarkup), 
        $(".feed a").timeago();
    }, instagramTemplate = function(instaImage, instaName, instaUsername, instaTime, instaUrl, instaBody) {
        var instaUserFullName = instaName;
        (void 0 === typeof instaName || 0 === instaName.length) && (instaUserFullName = instaUsername);
        var instagramMarkup = "";
        instagramMarkup += '<li class="instagram">', instagramMarkup += '    <img src="' + instaImage + '">', 
        instagramMarkup += '    <header class="insta-header">', instagramMarkup += '        <h4><a href="https://instagram.com/' + instaUsername + '">' + instaUserFullName + "</a></h4>", 
        instagramMarkup += '        <a class="time" href="https://instagram.com/p/' + instaUrl + '" target="_blank" title=" ' + instaTime + ' "></a>', 
        instagramMarkup += "    </header>", instagramMarkup += "    <p>" + instaBody + "</p>", 
        instagramMarkup += "</li>", $(".feed > ul").append(instagramMarkup), $(".feed a").timeago();
    };
    $(".burger-box").on("click", function(event) {
        event.preventDefault(), $(this).hasClass("open") ? ($(this).removeClass("open").addClass("closed"), 
        $(".main-nav").removeClass("active")) : ($(this).addClass("open").removeClass("closed"), 
        $(".main-nav").addClass("active"));
    });
    var loadLogos = function() {
        $(".anyday-logos li a").each(function() {
            var image = $(this).data("image");
            $(this).css({
                "background-image": "url(../img/logos/" + image + ")"
            });
        });
    };
    loadLogos(), $(".mayor .flickr").on("click", function() {
        window.open("https://www.flickr.com/people/bosmayorsoffice/", "_blank");
    }), $(".mayor .twitter").on("click", function() {
        window.open("https://twitter.com/marty_walsh", "_blank");
    }), $(".mayor .facebook").on("click", function() {
        window.open("https://www.facebook.com/VoteMartyWalsh", "_blank");
    }), $(".city .instagram").on("click", function() {
        window.open("https://instagram.com/notifyboston/", "_blank");
    }), $(".city .twitter").on("click", function() {
        window.open("https://twitter.com/NotifyBoston", "_blank");
    }), $(".city .facebook").on("click", function() {
        window.open("https://www.facebook.com/cityofboston", "_blank");
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