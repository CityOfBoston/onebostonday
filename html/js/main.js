$(function() {
    function scrollDistance() {
        var toTop = $(document).scrollTop();
        return toTop;
    }
    var body = $("body");
    body.addClass("ready");
    if ($(".acts-of-kindness h3").length > 0) {
        var $odometer = document.querySelector(".acts-of-kindness h3");
        od = new Odometer({
            el: $odometer,
            value: 0,
            format: "(,ddd)",
            duration: 2e3
        });
    }
    var video = '<iframe src="https://player.vimeo.com/video/159072629?autoplay=1" width="500" height="367" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $(".video span").on("click", function() {
        ga("send", "event", "video", "watched"), $(".video span").fadeOut(function() {
            $(".video img").remove(), $(".video").append(video);
        });
    }), $("form.planning-form").on("submit", function(event) {
        event.preventDefault();
        var action = $(this).attr("action"), data = $(this).serialize(), thankYou = '<div class="thank-you"><h3>Thank you for your submission.</h3> <p>It sounds like you are going to have an unforgetable One Boston Day!</p></div>';
        $.ajax({
            url: action,
            type: "POST",
            data: data
        }).done(function() {}).fail(function() {}).always(function() {
            $("form.planning-form").fadeOut(function() {
                $("section.planning .block").append(thankYou), $("section.planning").find(".thank-you").addClass("youre-welcome");
                var distance = $("section.planning").offset().top;
                $("html,body").animate({
                    scrollTop: distance
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
    var tweetString = "For #OneBostonDay, ";
    $("button.tweet").on("click", function() {
        tweetValue = $(".craft textarea").val(), finalTweet = encodeURIComponent(tweetString + tweetValue + " What will you do?"), 
        tweetIntent = "https://twitter.com/intent/tweet?text=" + finalTweet + "&related=marty_walsh,notifyboston", 
        popItUp(tweetIntent, 300, 600);
    });
    var characterCount = 103;
    $(".craft span").text(characterCount), $(".craft textarea").on("focus", function() {
        $(this).on("keyup", function() {
            var length = $(this).val().length, charactersLeft = characterCount - length;
            0 > charactersLeft ? $(".craft span").html('<b class="nono">' + charactersLeft + "</b>") : $(".craft span").text(charactersLeft);
        });
    }), $(".craft-tweet button.tweet").on("click", function() {
        Modernizr.touch ? ga("send", "event", "get involved", "tweet clicked: mobile") : ga("send", "event", "get involved", "tweet clicked: desktop -" + $(".craft span").html());
    });
    var loadFeedContent = function(response, direction) {
        $(".feed .icon-spinner").fadeOut(function() {
            $(this).remove();
        });
        var totalPosts = response.data.length;
        for (totalPosts > 50 && (totalPosts = 50), i = 0; i < totalPosts; i++) {
            var post = response.data[i];
            "twitter" === post.provider ? twitterTemplate(post.userimageurl, post.full_name, post.username, post.created_at, post.social_id, post.message, post.image, direction) : "instagram" === post.provider && instagramTemplate(post.image, post.full_name, post.username, post.created_at, post.social_id, post.message, direction);
        }
        $(".social-feed .block > ul .content").anchorTextUrls(), $(window).width() < 800 ? $(".social-feed .photo img").lazyload() : ($(".social-feed .photo img").lazyload({
            container: $(".social-feed .block > ul")
        }), setTimeout(function() {
            $(".social-feed .block > ul").isotope({
                itemSelector: ".social-feed .block > ul > li",
                layoutMode: "packery",
                packery: {
                    rowHeight: 20
                }
            });
        }, 250));
    }, loadFeed = function() {
        $.ajax({
            url: "http://siphon.hhcctech.com/api/container/showall/9?active=1",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(response) {
                loadFeedContent(response, "prepend");
            }
        });
    }, loadOldFeed = function() {
        $.ajax({
            url: "/feed/oldfeed.json",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(response) {
                loadFeedContent(response, "append");
            }
        });
    };
    if ($(".acts-of-kindness h3").length > 0) {
        loadOldFeed(), loadFeed();
        var donezo = !1;
        setInterval(function() {
            isElementInViewport($odometer) && donezo === !1 && (od.update("42873"), donezo = !0);
        }, 500);
    }
    var inView = 24;
    $("button.load-more").on("click", function(event) {
        event.preventDefault(), $(".social-feed .block > ul > li:nth-child(-n+" + inView + ")").show(), 
        inView += 12, setTimeout(function() {
            $(".social-feed .photo img").lazyload({
                container: $(".social-feed .block > ul")
            });
            $(".social-feed .block > ul").isotope({
                itemSelector: ".social-feed .block > ul > li",
                layoutMode: "packery",
                packery: {
                    rowHeight: 20
                }
            });
        }, 250), 0 === $(".social-feed .block > ul").children(":hidden").length && $("button.load-more").hide();
    }), $("body").on("click", ".actions a", function(event) {
        event.preventDefault(), popItUp($(this).attr("href"), 300, 600), ga("send", "event", "feed twitter action", $(this).find("svg").attr("class"));
    });
    var twitterTemplate = function(profileImage, twitterName, twitterUser, twitterTime, twitterTweetUrl, twitterTweetEntity, twitterImage, direction) {
        var intentReply = "https://twitter.com/intent/tweet?in_reply_to=" + twitterTweetUrl, intentRetweet = "https://twitter.com/intent/retweet?tweet_id=" + twitterTweetUrl, intentFavorite = "https://twitter.com/intent/favorite?tweet_id=" + twitterTweetUrl;
        twitterDisplayImage = "", null !== twitterImage && (twitterDisplayImage = '<div class="photo"><img data-original="' + twitterImage + '" src="/img/preloader-large.gif" alt=""></div>');
        var entity = twitterTweetEntity;
        entity = linkHashtags(entity), entity = linkUsers(entity);
        var twitterCard = "";
        twitterCard += "<li>", twitterCard += '    <div class="twitter-card">', twitterCard += '        <svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>', 
        twitterCard += "        <header>", twitterCard += '            <a href="https://twitter.com/' + twitterUser + '">', 
        twitterCard += '                <img src="' + profileImage + '">', twitterCard += "                <h4>" + twitterName + "</h4>", 
        twitterCard += "                <h5>@" + twitterUser + "</h5>", twitterCard += "            </a>", 
        twitterCard += "        </header>", twitterCard += '        <div class="content">', 
        twitterCard += "            <p>" + entity + "</p>", twitterCard += "        </div>", 
        twitterCard += '        <time><a href="https://twitter.com/' + twitterUser + "/status/" + twitterTweetUrl + '">' + twitterTime + "</a></time>", 
        twitterCard += twitterDisplayImage, twitterCard += '        <div class="actions">', 
        twitterCard += "            <ul>", twitterCard += "                <li>", twitterCard += '                    <a class="reply" href="' + intentReply + '"> ', 
        twitterCard += '                        <svg class="icon icon-reply"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-reply"></use></svg>                ', 
        twitterCard += "                    </a>", twitterCard += "                </li>", 
        twitterCard += "                <li>", twitterCard += '                    <a class="retweet" href="' + intentRetweet + '">', 
        twitterCard += '                        <svg class="icon icon-retweet"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-retweet"></use></svg>', 
        twitterCard += "                    </a> ", twitterCard += "                </li>", 
        twitterCard += "                <li>", twitterCard += '                    <a class="favorite" href="' + intentFavorite + '">', 
        twitterCard += '                        <svg class="icon icon-heart"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-heart"></use></svg>', 
        twitterCard += "                    </a>", twitterCard += "                </li>", 
        twitterCard += "            </ul>", twitterCard += "        </div>", twitterCard += "    </div>", 
        twitterCard += "</li>", "append" === direction ? $(".social-feed .block > ul").append(twitterCard) : $(".social-feed .block > ul").prepend(twitterCard);
    }, instagramTemplate = function(instaImage, instaName, instaUsername, instaTime, instaUrl, instaBody) {
        var instaUserFullName = instaName;
        (void 0 === typeof instaName || 0 === instaName.length) && (instaUserFullName = instaUsername);
        var instagramMarkup = "";
        instagramMarkup += '<li class="instagram">', instagramMarkup += '    <img data-original="' + instaImage + '" src="/img/preloader-large.gif"> ', 
        instagramMarkup += '    <header class="insta-header">', instagramMarkup += '        <h4><a href="https://instagram.com/' + instaUsername + '">' + instaUserFullName + "</a></h4>", 
        instagramMarkup += '        <a class="time" href="https://instagram.com/p/' + instaUrl + '" target="_blank" title=" ' + instaTime + ' "></a>', 
        instagramMarkup += "    </header>", instagramMarkup += "    <p>" + instaBody + "</p>", 
        instagramMarkup += "</li>", $(".feed > ul").append(instagramMarkup), $(".feed a").timeago();
    };
    $(".burger-box").on("click", function(event) {
        event.preventDefault(), $(this).hasClass("open") ? ($(this).removeClass("open").addClass("closed"), 
        $(".main-nav").removeClass("active"), ga("send", "event", "mobile menu", "close")) : ($(this).addClass("open").removeClass("closed"), 
        $(".main-nav").addClass("active"), ga("send", "event", "mobile menu", "open"));
    });
    var loadLogos = function() {
        $(".downloads li a").not(".none-download").each(function() {
            var image = $(this).data("image");
            $(this).css({
                "background-image": "url(../img/logos/" + image + ")"
            }), $(this).attr("href", "../img/logos/" + image), Modernizr.adownload || $(this).attr("target", "_blank");
        }), $(".none-download").css({
            "background-image": "url(../img/" + $(".none-download").data("image") + ")"
        });
    };
    if ($(".downloads li a").on("click", function() {
        ga("send", "event", "logo download", $(this).data("image"));
    }), $("a.package").on("click", function() {
        ga("send", "event", "logo download", "all .zip");
    }), $(".downloads").length > 0) var loadTheLogos = setInterval(function() {
        scrollDistance() > $(".downloads").offset().top - $(".downloads").height() && (loadLogos(), 
        clearInterval(loadTheLogos));
    }, 50);
    $(window).on("scroll", function() {
        var currentScroll = scrollDistance() + $(".main-nav").height();
        $("section").each(function() {
            offset = $(this).offset(), currentScroll > offset.top && !$(this).hasClass("tracked") && ($(this).addClass("tracked"), 
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
        window.open("https://www.facebook.com/VoteMartyWalsh", "_blank");
    }), $(".mayor button").on("click", function() {
        ga("send", "event", "footer social", "mayor:" + $(this).attr("class"));
    }), $(".city .instagram").on("click", function() {
        window.open("https://instagram.com/cityofboston", "_blank");
    }), $(".city .twitter").on("click", function() {
        window.open("https://twitter.com/NotifyBoston", "_blank");
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
    var isElementInViewport = function(el) {
        "function" == typeof jQuery && el instanceof jQuery && (el = el[0]);
        var rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }, popupWindow = function() {
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