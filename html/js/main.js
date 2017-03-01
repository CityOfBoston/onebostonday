/*! last updated 2017-03-01 */
$(function() {
    function a() {
        var a = $(document).scrollTop();
        return a;
    }
    var b = $("body");
    if (b.addClass("ready"), $(".intro button.watch-video").on("click", function(a) {
        a.preventDefault();
        var c = "h3J4HaxCvfE";
        Modernizr.touchevents ? (ga("send", "event", "celebrity video", "mobile"), window.location.href = "https://www.youtube.com/watch?v=" + c) : (ga("send", "event", "celebrity video", "desktop"), 
        $(".intro").prepend('<div class="video-player"><iframe src="https://www.youtube.com/embed/' + c + '?autoplay=1&rel=0&modestbranding=1" frameborder="0" allowfullscreen></iframe></div>'), 
        b.append('<button class="close-video">Close video</div>'), setTimeout(function() {
            b.addClass("video-playing");
        }, 50), $("body").find("button.close-video").on("click", function() {
            b.removeClass("video-playing"), console.log("clicked"), setTimeout(function() {
                b.find("div.video-player").remove(), b.find("button.close-video").remove();
            }, 350);
        }));
    }), console.log($(window).width()), !Modernizr.touchevents && $(window).width() > 800) {
        var c = "";
        c += '<div class="bg-video">', c += "    <video autoplay loop muted>", c += '        <source src="/video/obd.mp4" type="video/mp4">', 
        c += '        <source src="/video/obd.webm" type="video/webm">', c += "    </video>", 
        c += "</div>", $("section.intro").append(c);
    }
    if (location.hash && setTimeout(function() {
        var a = $(location.hash).offset().top;
        $("html,body").animate({
            scrollTop: a
        });
    }, 400), $(".acts-of-kindness h3").length > 0) {
        var d = document.querySelector(".acts-of-kindness h3");
        od = new Odometer({
            el: d,
            value: 0,
            format: "(,ddd)",
            duration: 2e3
        });
    }
    var e = '<iframe src="https://player.vimeo.com/video/206079468?autoplay=1" width="500" height="367" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $(".video span").on("click", function() {
        ga("send", "event", "video", "watched"), $(".video span").fadeOut(function() {
            $(".video img").remove(), $(".video").append(e);
        });
    }), $("form.planning-form").on("submit", function(a) {
        a.preventDefault();
        var b = $(this).attr("action"), c = $(this).serialize(), d = '<div class="thank-you"><h3>Thank you for your submission.</h3> <p>It sounds like you are going to have an unforgetable One Boston Day!</p></div>';
        $.ajax({
            url: b,
            type: "POST",
            data: c
        }).done(function() {}).fail(function() {}).always(function() {
            $("form.planning-form").fadeOut(function() {
                $("section.planning .block").append(d), $("section.planning").find(".thank-you").addClass("youre-welcome");
                var a = $("section.planning").offset().top;
                $("html,body").animate({
                    scrollTop: a
                }, 500);
            });
        });
    }), $(".slider").slick({
        slide: ".activity",
        dots: !0,
        infinite: !0,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: !0,
        initialSlide: 0,
        touchThreshold: 3
    }), $(".activity .copy a").on("click", function() {
        ga("send", "event", "community learn more", $(this).attr("href"));
    });
    var f = "For #OneBostonDay, ";
    $("button.tweet").on("click", function() {
        tweetValue = $(".craft textarea").val(), finalTweet = encodeURIComponent(f + tweetValue + " What will you do?"), 
        tweetIntent = "https://twitter.com/intent/tweet?text=" + finalTweet + "&related=marty_walsh,notifyboston", 
        t(tweetIntent, 300, 600);
    });
    var g = 103;
    $(".craft span").text(g), $(".craft textarea").on("focus", function() {
        $(this).on("keyup", function() {
            var a = $(this).val().length, b = g - a;
            0 > b ? $(".craft span").html('<b class="nono">' + b + "</b>") : $(".craft span").text(b);
        });
    }), $(".craft-tweet button.tweet").on("click", function() {
        Modernizr.touch ? ga("send", "event", "get involved", "tweet clicked: mobile") : ga("send", "event", "get involved", "tweet clicked: desktop -" + $(".craft span").html());
    });
    var h = function(a, b) {
        $(".feed .icon-spinner").fadeOut(function() {
            $(this).remove();
        });
        var c = a.data.length;
        c > 500 && (c = 500);
        var d = a.data;
        for ("prepend" === b && (d = d.reverse()), i = 0; i < c; i++) {
            var e = d[i];
            "twitter" === e.provider ? n(e.userimageurl, e.full_name, e.username, e.created_at, e.social_id, e.message, e.image, b) : "instagram" === e.provider && o(e.image, e.full_name, e.username, e.created_at, e.social_id, e.message, b);
        }
        $(".social-feed .block > ul .content").anchorTextUrls(), $(window).width() < 800 ? $(".social-feed .photo img").lazyload() : ($(".social-feed .photo img").lazyload({
            container: $(".social-feed .block > ul")
        }), $(".social-feed").find(".gutter-sizer").appendTo(".social-feed .block > ul"), 
        setTimeout(function() {
            $(".social-feed .block > ul").packery({
                itemSelector: ".social-feed .block > ul > li",
                gutter: 20
            });
        }, 250));
    }, j = function() {
        console.log("wow"), $.ajax({
            url: "/feed/oldfeed.json",
            dataType: "json",
            error: function(a, b, c) {},
            success: function(a) {
                h(a, "append");
            }
        });
    };
    if ($(".acts-of-kindness h3").length > 0) {
        j();
        var k = !1, l = 76985;
        setInterval(function() {
            r(d) && k === !1 && (od.update(l), k = !0);
        }, 500);
    }
    var m = 24;
    $("button.load-more").on("click", function(a) {
        a.preventDefault(), $(".social-feed .block > ul > li:nth-child(-n+" + m + ")").show(), 
        m += 12, $(window).width() < 800 ? $(".social-feed .photo img").lazyload() : ($(".social-feed").find(".gutter-sizer").appendTo(".social-feed .block > ul"), 
        setTimeout(function() {
            $(".social-feed .block > ul").packery({
                itemSelector: ".social-feed .block > ul > li",
                gutter: 20
            });
        }, 250), setTimeout(function() {
            $(".social-feed .photo img").lazyload({
                container: $(".social-feed .block > ul")
            });
        }, 400)), 0 === $(".social-feed .block > ul").children(":hidden").length && $("button.load-more").hide();
    }), $("body").on("click", ".actions a", function(a) {
        a.preventDefault(), t($(this).attr("href"), 300, 600), ga("send", "event", "feed twitter action", $(this).find("svg").attr("class"));
    });
    var n = function(a, b, c, d, e, f, g, h) {
        var i = "https://twitter.com/intent/tweet?in_reply_to=" + e, j = "https://twitter.com/intent/retweet?tweet_id=" + e, k = "https://twitter.com/intent/favorite?tweet_id=" + e;
        twitterDisplayImage = "", null !== g && (twitterDisplayImage = '<div class="photo"><img data-original="' + g + '" src="/img/preloader-large.gif" alt=""></div>');
        var l = f;
        l = linkHashtags(l), l = linkUsers(l);
        var m = "";
        m += "<li>", m += '    <div class="twitter-card">', m += '        <svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>', 
        m += "        <header>", m += '            <a href="https://twitter.com/' + c + '">', 
        m += '                <img src="' + a + '">', m += "                <h4>" + b + "</h4>", 
        m += "                <h5>@" + c + "</h5>", m += "            </a>", m += "        </header>", 
        m += '        <div class="content">', m += "            <p>" + l + "</p>", m += "        </div>", 
        m += '        <time><a href="https://twitter.com/' + c + "/status/" + e + '">' + d + "</a></time>", 
        m += twitterDisplayImage, m += '        <div class="actions">', m += "            <ul>", 
        m += "                <li>", m += '                    <a class="reply" href="' + i + '"> ', 
        m += '                        <svg class="icon icon-reply"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-reply"></use></svg>                ', 
        m += "                    </a>", m += "                </li>", m += "                <li>", 
        m += '                    <a class="retweet" href="' + j + '">', m += '                        <svg class="icon icon-retweet"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-retweet"></use></svg>', 
        m += "                    </a> ", m += "                </li>", m += "                <li>", 
        m += '                    <a class="favorite" href="' + k + '">', m += '                        <svg class="icon icon-heart"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-heart"></use></svg>', 
        m += "                    </a>", m += "                </li>", m += "            </ul>", 
        m += "        </div>", m += "    </div>", m += "</li>", "append" === h ? $(".social-feed .block > ul").append(m) : $(".social-feed .block > ul").prepend(m);
    }, o = function(a, b, c, d, e, f) {
        var g = b;
        (void 0 === typeof b || 0 === b.length) && (g = c);
        var h = "";
        h += '<li class="instagram">', h += '    <img data-original="' + a + '" src="/img/preloader-large.gif"> ', 
        h += '    <header class="insta-header">', h += '        <h4><a href="https://instagram.com/' + c + '">' + g + "</a></h4>", 
        h += '        <a class="time" href="https://instagram.com/p/' + e + '" target="_blank" title=" ' + d + ' "></a>', 
        h += "    </header>", h += "    <p>" + f + "</p>", h += "</li>", $(".feed > ul").append(h), 
        $(".feed a").timeago();
    };
    $(".burger-box").on("click", function(a) {
        a.preventDefault(), $(this).hasClass("open") ? ($(this).removeClass("open").addClass("closed"), 
        $(".main-nav").removeClass("active"), ga("send", "event", "mobile menu", "close")) : ($(this).addClass("open").removeClass("closed"), 
        $(".main-nav").addClass("active"), ga("send", "event", "mobile menu", "open"));
    });
    var p = function() {
        $(".downloads li a").not(".none-download").each(function() {
            var a = $(this).data("image");
            $(this).css({
                "background-image": "url(../img/logos/" + a + ")"
            }), $(this).attr("href", "../img/logos/" + a), Modernizr.adownload || $(this).attr("target", "_blank");
        }), $(".none-download").css({
            "background-image": "url(../img/" + $(".none-download").data("image") + ")"
        }), Modernizr.touchevents && $(".none-download").attr("href", "/img/logos/OneBostonDay_CoverPhoto_Facebook.jpg");
    };
    if ($(".downloads li a").on("click", function() {
        ga("send", "event", "logo download", $(this).data("image"));
    }), $("a.package").on("click", function() {
        ga("send", "event", "logo download", "all .zip");
    }), $(".downloads").length > 0) var q = setInterval(function() {
        a() > $(".downloads").offset().top - $(".downloads").height() && (p(), clearInterval(q));
    }, 50);
    $(window).on("scroll", function() {
        var b = a() + $(".main-nav").height();
        $("section").each(function() {
            offset = $(this).offset(), b > offset.top && !$(this).hasClass("tracked") && ($(this).addClass("tracked"), 
            ga("send", "pageview", {
                page: "/" + $(this).attr("id"),
                title: $(this).attr("id")
            }));
        });
    }), $(".mayor .flickr").on("click", function() {
        window.open("https://www.flickr.com/people/bosmayorsoffice/", "_blank"), ga("send", "event", "footer social", $(this).attr("class"));
    }), $(".mayor .twitter").on("click", function() {
        window.open("https://twitter.com/marty_walsh", "_blank");
    }), $(".mayor .facebook").on("click", function() {
        window.open("https://www.facebook.com/MartyForBoston", "_blank");
    }), $(".mayor button").on("click", function() {
        ga("send", "event", "footer social", "mayor:" + $(this).attr("class"));
    }), $(".city .instagram").on("click", function() {
        window.open("https://instagram.com/cityofboston", "_blank");
    }), $(".city .twitter").on("click", function() {
        window.open("https://twitter.com/CityofBoston", "_blank");
    }), $(".city .facebook").on("click", function() {
        window.open("https://www.facebook.com/cityofboston", "_blank");
    }), $(".city button").on("click", function() {
        ga("send", "event", "footer social", "city:" + $(this).attr("class"));
    }), $(".cityofboston-link").on("click", function() {
        ga("send", "event", "footer link", "city of boston website");
    }), $(".privacy-policy").on("click", function() {
        ga("send", "event", "footer link", "privacy policy");
    }), $(".press a").on("click", function() {
        ga("send", "event", "press link", $(this).text());
    });
    var r = function(a) {
        "function" == typeof jQuery && a instanceof jQuery && (a = a[0]);
        var b = a.getBoundingClientRect();
        return b.top >= 0 && b.left >= 0 && b.bottom <= (window.innerHeight || document.documentElement.clientHeight) && b.right <= (window.innerWidth || document.documentElement.clientWidth);
    }, s = function() {
        $("a[data-popup]").on("click", function(a) {
            a.preventDefault(), window.open($(this)[0].href);
        });
    };
    s();
    var t = function(a, b, c) {
        return newwindow = window.open(a, "name", "height=" + b + ",width=" + c), window.focus && newwindow.focus(), 
        !1;
    };
});