$(function(){

    var body = $('body');
    body.addClass('ready');

            // BG
            // TYPE
            // MARK
            
    var colors = [
        [
            '#0099FA',
            '#FFFFFF',
            '#0B004E'
        ],
        [
            '#FF0000',
            '#FFFFFF',
            '#0B004E'
        ],
        [
            '#00B969',
            '#FFFFFF',
            '#0B004E'
        ],
        [
            '#000000',
            '#FFFFFF',
            '#878787'
        ],
        [
            '#E7AE08',
            '#0B004E',
            '#FFFFFF'
        ],
        [
            '#8A5ADE',
            '#FFFFFF',
            '#000000'
        ]
    ];


    // DYNAMICALLY CHANGES COLOR VALUES ACROSS THE SITE
    var currentColor = 1;
    var setColors = function(){
        var totalColors = colors.length;

        if(currentColor === totalColors){
            currentColor = 1;
        }
        else{
            currentColor++;
        }

        body.data('bg',colors[(currentColor-1)][0]);
        body.data('type',colors[(currentColor-1)][1]);  
        body.data('mark',colors[(currentColor-1)][2]);
    };
    //colorChangeID = setInterval(setColors, 6000);

    // GRABS THOSE COLORS IN FOR THE INTRO
    var colorChangeIntro = function(){
        var bg = body.data('bg');
        var type = body.data('type');
        var mark = body.data('mark');

        $('.main-nav').css('background-color',bg);
    };
   // colorChangeIntroID = setInterval(colorChangeIntro, 10);

   /*//////////////////////////////////////
    //  smooth scrolling
    //////////////////////////////////////*/
    $('.main-nav a').on('click',function(event){
        event.preventDefault();
        var target = $(this).attr('href');
        var distance = ( $(target).offset().top - $('.main-nav').height() );

        $('html,body').animate({
            scrollTop: distance + 'px'
        });
    });


    /*//////////////////////////////////////
    //  video toggle
    //////////////////////////////////////*/

    var video = '<iframe src="https://player.vimeo.com/video/124548366?autoplay=1" width="500" height="367" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $('.video span').on('click',function(){
        $('.video span').fadeOut(function(){
            $('.video img').remove();
            $('.video').append(video);
            $('.video').fitVids();
        });
    });


    /*//////////////////////////////////////
    //  community slider
    //////////////////////////////////////*/
    var middleSlide = (Math.ceil( ($('.slider .activity').length / 2) ) - 1);
    console.log(middleSlide);

    $('.slider').slick({
        slide: '.activity',
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        initialSlide: middleSlide
    });

    /*//////////////////////////////////////
    //  for onebostonday tweet box
    //////////////////////////////////////*/
    var tweetString = "For #OneBostonDay, ";
    $('button.tweet').on('click',function(){
        tweetValue = $('.craft textarea').val();
        finalTweet = encodeURIComponent(tweetString + tweetValue);
        tweetIntent = "https://twitter.com/intent/tweet?text="+finalTweet+"&related=marty_walsh,notifyboston";

        popItUp(tweetIntent,300,600);
    });

    var characterCount = 100;
    $('.craft textarea').on('focus',function(){
        $(this).on('keyup',function(){
            var length = $(this).val().length;
            var charactersLeft = characterCount - length;
            if(charactersLeft <= 0){
                $('.craft span').html("Your tweet is too long :( <b>"+charactersLeft+"</b>");
            }
            else{
                $('.craft span').text(charactersLeft);
            }
        });
    });

    /*//////////////////////////////////////
    //  get feed
    //////////////////////////////////////*/
    $.ajax({
        url:'http://siphon.hhcctech.com/api/container/1',
        success:function(response){
            var totalPosts = response.data.length;

            if(totalPosts > 54){
                totalPosts = 54;
            }

            for (i=0;i<response.data.length;i++){
                var post = response.data[i];
                if(post.provider === "twitter"){
                    twitterTemplate(post.userimageurl,post.full_name,post.username,post.created_at,post.social_id,post.message);
                }
                else if(post.provider === "instagram"){
                    instagramTemplate(post.image,post.full_name,post.username,post.created_at,post.social_id,post.message);
                }
            }

            if($(window).width() < 800){
                $('.feed > ul').slick({
                    slide: 'li',
                    dots: true,
                    arrows: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows:6,
                    adaptiveHeight: true,
                });

                setTimeout(function(){
                    $('.feed ul.slick-dots').clone().insertBefore($('.feed .slick-list')).addClass('above-dots');
                },300);

                $('.feed > ul').on('swipe', function(event, slick, direction){
                    $('.slick-dots.above-dots li').each(function(){
                        $(this).removeClass('slick-active');
                    });
                    $('.slick-dots.above-dots li:nth-child('+(slick.currentSlide + 1)+')').addClass('slick-active');
                });

                $('body').on('click','.slick-dots.above-dots li',function(){
                    var page = ($(this).index() + 1);
                    $('.feed > ul').slick('slickGoTo',page);

                     $('.slick-dots.above-dots li').each(function(){
                        $(this).removeClass('slick-active');
                    });
                    $('.slick-dots.above-dots li:nth-child('+page+')').addClass('slick-active');
                });
            }
        }
    });

    $('body').on('click','.actions a',function(event){
        event.preventDefault();
        popItUp($(this).attr('href'),300,600);
    });

    var twitterTemplate = function(profileImage,twitterName,twitterUser,twitterTime,twitterTweetUrl,twitterTweetEntity){
        var intentReply = 'https://twitter.com/intent/tweet?in_reply_to='+twitterTweetUrl;
        var intentRetweet = 'https://twitter.com/intent/retweet?tweet_id='+twitterTweetUrl;
        var intentFavorite = 'https://twitter.com/intent/favorite?tweet_id='+twitterTweetUrl;

        var twitterMarkup="";
        twitterMarkup += "<li class=\"twitter\">";
        twitterMarkup += "    <div class=\"profile-image\">";
        twitterMarkup += "        <img src=\""+ profileImage +"\">";
        twitterMarkup += "    <\/div>";
        twitterMarkup += "    <div class=\"tweet\">";
        twitterMarkup += "        <header class=\"tweet-header\">";
        twitterMarkup += "            <h4>"+ twitterName +"<\/h4>";
        twitterMarkup += "            <a class=\"handle\" href=\"https:\/\/twitter.com\/"+ twitterUser +"\" target=\"_blank\">@"+ twitterUser +"<\/a>";
        twitterMarkup += "            <a class=\"time\" href=\"https:\/\/twitter.com\/"+ twitterUser +"\/status\/"+ twitterTweetUrl +"\" target=\"_blank\" title=\" "+twitterTime+" \"><\/a>";
        twitterMarkup += "        <\/header>";
        twitterMarkup += "        <div class=\"tweet-entity\">";
        twitterMarkup += "            <p>"+ twitterTweetEntity +"<\/p>";
        twitterMarkup += "        <\/div>";
        twitterMarkup += "    <\/div>";
        twitterMarkup += "    <div class=\"actions\">";
        twitterMarkup += "        <ul>";
        twitterMarkup += "            <li>";
        twitterMarkup += "                <a href=\""+intentReply+"\">";
        twitterMarkup += "                    <svg class=\"icon icon-reply\"><use xlink:href=\"#icon-reply\"><\/use><\/svg>";
        twitterMarkup += "                <\/a>";
        twitterMarkup += "            <\/li>";
        twitterMarkup += "            <li>";
        twitterMarkup += "                <a href=\""+intentRetweet+"\">";
        twitterMarkup += "                    <svg class=\"icon icon-retweet\"><use xlink:href=\"#icon-retweet\"><\/use><\/svg>";
        twitterMarkup += "                <\/a>";
        twitterMarkup += "            <\/li>";
        twitterMarkup += "            <li>";
        twitterMarkup += "                <a href=\""+intentFavorite+"\">";
        twitterMarkup += "                    <svg class=\"icon icon-star\"><use xlink:href=\"#icon-star\"><\/use><\/svg>";
        twitterMarkup += "                <\/a>";
        twitterMarkup += "            <\/li>";
        twitterMarkup += "        <\/ul>";
        twitterMarkup += "    <\/div>";
        twitterMarkup += "<\/li>";

        $('.feed > ul').append(twitterMarkup);
        $('.feed a').timeago();
    };

    var instagramTemplate = function(instaImage,instaName,instaUsername,instaTime,instaUrl,instaBody){
        var instaUserFullName = instaName;

        if(typeof instaName === undefined || instaName.length === 0){
            instaUserFullName = instaUsername;
        }

        var instagramMarkup="";
        instagramMarkup += "<li class=\"instagram\">";
        instagramMarkup += "    <img src=\""+ instaImage +"\">";
        instagramMarkup += "    <header class=\"insta-header\">";
        instagramMarkup += "        <h4><a href=\"https:\/\/instagram.com\/"+instaUsername+"\">"+instaUserFullName+"<\/a><\/h4>";
        instagramMarkup += "        <a class=\"time\" href=\"https:\/\/instagram.com\/p\/"+instaUrl+"\" target=\"_blank\" title=\" "+instaTime+" \"><\/a>";
        instagramMarkup += "    <\/header>";
        instagramMarkup += "    <p>"+ instaBody +"<\/p>";
        instagramMarkup += "<\/li>";

        $('.feed > ul').append(instagramMarkup);
        $('.feed a').timeago();
    };

    /*//////////////////////////////////////
    //  Burger mobile menu
    //////////////////////////////////////*/
    $('.burger-box').on('click', function(event){
        event.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').addClass('closed');
            $('.main-nav').removeClass('active');
        }
        else {
            $(this).addClass('open').removeClass('closed') ;
            $('.main-nav').addClass('active');
        }
    });

    /*//////////////////////////////////////
    //  footer links
    //////////////////////////////////////*/
    $('.mayor .flickr').on('click',function(){
        window.open('https://www.flickr.com/people/bosmayorsoffice/', '_blank');
    });
    $('.mayor .twitter').on('click',function(){
        window.open('https://twitter.com/marty_walsh', '_blank');
    });
    $('.mayor .facebook').on('click',function(){
        window.open('https://www.facebook.com/VoteMartyWalsh', '_blank');
    });

    $('.city .instagram').on('click',function(){
        window.open('https://instagram.com/notifyboston/', '_blank');
    });
    $('.city .twitter').on('click',function(){
        window.open('https://twitter.com/NotifyBoston', '_blank');
    });
    $('.city .facebook').on('click',function(){
        window.open('https://www.facebook.com/cityofboston', '_blank');
    });


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

    var popItUp = function(url,height,width) {
        newwindow=window.open(url,'name','height='+height+',width='+width);
        if (window.focus) {newwindow.focus();}
        return false;
    };
});