
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


    // DYNACALLY CHANGES COLOR VALUES ACROSS THE SITE
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
    //  odometer on homepage
    //////////////////////////////////////*/
    var $odometer = document.querySelector('.acts-of-kindness h3');
    var counts = $('.acts-of-kindness h3').data('count');
    od = new Odometer({
        el: $odometer,
        value: 0,
        format: '(,ddd)',
        duration: 2000,
    }); 

    var donezo = false;
    setInterval(function(){
        if(isElementInViewport($odometer) && donezo === false){
            od.update(counts);
            donezo = true;
        }
    },500);


    /*//////////////////////////////////////
    //  video toggle
    //////////////////////////////////////*/
    var video = '<iframe src="https://player.vimeo.com/video/124662459?autoplay=1" width="500" height="367" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $('.video span').on('click',function(){
        ga('send', 'event', 'video', 'watched') ;
        $('.video span').fadeOut(function(){
            $('.video img').remove();
            $('.video').append(video);
            $('.video').fitVids();
        });
    });


    /*//////////////////////////////////////
    //  planning form
    //////////////////////////////////////*/
    $('form.planning-form').on('submit',function(event){
        event.preventDefault();
        var action = $(this).attr('action');
        var data = $(this).serialize();

        var thankYou = '<div class="thank-you"><h3>Thank you for your submission.</h3> <p>It sounds like you are going to have an unforgetable One Boston Day!</p></div>';

        $.ajax({
            url: action,
            type: 'POST',
            data: data,
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            $('form.planning-form').fadeOut(function(){
                $('section.planning .block').append(thankYou);
                $('section.planning').find('.thank-you').addClass('youre-welcome');
            });
        });
        
    });


    /*//////////////////////////////////////
    //  community slider
    //////////////////////////////////////*/
    $('.slider').slick({
        slide: '.activity',
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        initialSlide: 0,
        touchThreshold: 3
    });

    $('.activity .copy a').on('click',function(){
        ga('send', 'event', 'community learn more', $(this).attr('href'));
    });

    /*//////////////////////////////////////
    //  for onebostonday tweet box
    //////////////////////////////////////*/
    var tweetString = "For #OneBostonDay, ";
    $('button.tweet').on('click',function(){
        tweetValue = $('.craft textarea').val();
        finalTweet = encodeURIComponent(tweetString + tweetValue + " What will you do?");
        tweetIntent = "https://twitter.com/intent/tweet?text="+finalTweet+"&related=marty_walsh,notifyboston";

        popItUp(tweetIntent,300,600);
    });

    var characterCount = 103;
    $('.craft span').text(characterCount);
    $('.craft textarea').on('focus',function(){
        $(this).on('keyup',function(){
            var length = $(this).val().length;
            var charactersLeft = characterCount - length;
            if(charactersLeft < 0){
                $('.craft span').html('<b class="nono">'+charactersLeft+'</b>');
            }
            else{
                $('.craft span').text(charactersLeft);
            }
        });
    });

    $('.craft-tweet button.tweet').on('click',function(){
        if(Modernizr.touch){
            ga('send', 'event', 'get involved', 'tweet clicked: mobile') ;
        }
        else{
            ga('send', 'event', 'get involved', 'tweet clicked: desktop -' + $('.craft span').html()) ;
        }
        
    });

    /*//////////////////////////////////////
    //  get feed
    //////////////////////////////////////*/
    var loadFeed = function() {
        $.ajax({
            //url:'/feeds/' + file,
            url: 'http://siphon.hhcctech.com/api/container/showall/8',
            dataType:'json',
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
            success:function(response){
                console.log(response);
                $('.feed .icon-spinner').fadeOut(function(){
                    $(this).remove();
                });

                var totalPosts = response.data.length;
    
                if(totalPosts > 50){
                    totalPosts = 50;
                }
    
                for (i=0;i<totalPosts;i++){
                    var post = response.data[i];
                    if(post.provider === "twitter"){
                        twitterTemplate(post.userimageurl,post.full_name,post.username,post.created_at,post.social_id,post.message,post.image);
                    }
                    else if(post.provider === "instagram"){
                        instagramTemplate(post.image,post.full_name,post.username,post.created_at,post.social_id,post.message);
                    }
                }

                $(".social-feed .block > ul .content").anchorTextUrls();

                //lazy loading
                if($(window).width() < 800){
                    $('.social-feed .photo img').lazyload();
                }
                else{
                    $('.social-feed .photo img').lazyload({
                        container: $('.social-feed .block > ul')
                    });

                    var grid = $('.social-feed .block > ul').isotope({
                        itemSelector: '.social-feed .block > ul > li',
                        layoutMode: 'packery',
                        packery: {
                          rowHeight: 20
                        }
                    });
                }


            }
        });
    };

    loadFeed();    

    $('body').on('click','.actions a',function(event){
        event.preventDefault();
        popItUp($(this).attr('href'),300,600);
        ga('send', 'event', 'feed twitter action', $(this).find('svg').attr('class')) ;
    });

    var twitterTemplate = function(profileImage,twitterName,twitterUser,twitterTime,twitterTweetUrl,twitterTweetEntity,twitterImage){
        var intentReply = 'https://twitter.com/intent/tweet?in_reply_to='+twitterTweetUrl;
        var intentRetweet = 'https://twitter.com/intent/retweet?tweet_id='+twitterTweetUrl;
        var intentFavorite = 'https://twitter.com/intent/favorite?tweet_id='+twitterTweetUrl;

        twitterDisplayImage = '';
        if(twitterImage !== null){
            twitterDisplayImage = '<div class=\"photo\"><img data-original="'+twitterImage+'" src=\"\/img\/preloader-large.gif\" alt=\"\"><\/div>';
        }

        var entity = twitterTweetEntity;

        entity =  linkHashtags(entity);
        entity =  linkUsers(entity);

        var twitterCard="";
        twitterCard += "<li>";
        twitterCard += "    <div class=\"twitter-card\">";
        twitterCard += "        <svg class=\"icon icon-twitter\"><use xlink:href=\"#icon-twitter\"><\/use><\/svg>";
        twitterCard += "        <header>";
        twitterCard += "            <a href=\"https:\/\/twitter.com\/"+twitterUser+"\">";
        twitterCard += "                <img src=\""+profileImage+"\">";
        twitterCard += "                <h4>"+twitterName+"<\/h4>";
        twitterCard += "                <h5>@"+twitterUser+"<\/h5>";
        twitterCard += "            <\/a>";
        twitterCard += "        <\/header>";
        twitterCard += "        <div class=\"content\">";
        twitterCard += "            <p>"+entity+"<\/p>";
        twitterCard += "        <\/div>";
        twitterCard += "        <time><a href=\"https:\/\/twitter.com\/"+twitterUser+"/status/"+twitterTweetUrl+"\">"+twitterTime+"<\/a><\/time>";
        twitterCard +=          twitterDisplayImage;
        twitterCard += "        <div class=\"actions\">";
        twitterCard += "            <ul>";
        twitterCard += "                <li>";
        twitterCard += "                    <a href=\""+intentReply+"\"> ";
        twitterCard += "                        <svg class=\"icon icon-reply\"><use xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" xlink:href=\"#icon-reply\"><\/use><\/svg>                ";
        twitterCard += "                    <\/a>";
        twitterCard += "                <\/li>";
        twitterCard += "                <li>";
        twitterCard += "                    <a href=\""+intentRetweet+"\">";
        twitterCard += "                        <svg class=\"icon icon-retweet\"><use xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" xlink:href=\"#icon-retweet\"><\/use><\/svg>";
        twitterCard += "                    <\/a> ";
        twitterCard += "                <\/li>";
        twitterCard += "                <li>";
        twitterCard += "                    <a href=\""+intentFavorite+"\">";
        twitterCard += "                        <svg class=\"icon icon-heart\"><use xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" xlink:href=\"#icon-heart\"><\/use><\/svg>";
        twitterCard += "                    <\/a>";
        twitterCard += "                <\/li>";
        twitterCard += "            <\/ul>";
        twitterCard += "        <\/div>";
        twitterCard += "    <\/div>";
        twitterCard += "<\/li>";


        $('.social-feed .block > ul').append(twitterCard);
        //$('.feed a').timeago();
    };

    var instagramTemplate = function(instaImage,instaName,instaUsername,instaTime,instaUrl,instaBody){
        var instaUserFullName = instaName;

        if(typeof instaName === undefined || instaName.length === 0){
            instaUserFullName = instaUsername;
        }

        var instagramMarkup="";
        instagramMarkup += "<li class=\"instagram\">";
        instagramMarkup += "    <img data-original=\""+ instaImage +"\" src=\"\/img\/preloader-large.gif\"> ";
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

            ga('send', 'event', 'mobile menu', 'close') ;
        }
        else {
            $(this).addClass('open').removeClass('closed') ;
            $('.main-nav').addClass('active');

            ga('send', 'event', 'mobile menu', 'open') ;
        }
    });

    /*//////////////////////////////////////
    //  logos
    //////////////////////////////////////*/
    var loadLogos = function(){
        $('.downloads li a').not('.none-download').each(function(){
            var image = $(this).data('image');
            $(this).css({
                'background-image':'url(../img/logos/'+image+')'
            });
            $(this).attr('href','../img/logos/'+image);

            if(! Modernizr.adownload){
                $(this).attr('target','_blank');
            }
        });
        $('.none-download').css({
            'background-image':'url(../img/'+$('.none-download').data('image')+')'
        });
    };

    $('.downloads li a').on('click',function(){
        ga('send', 'event', 'logo download', $(this).data('image')) ;
    });

    $('a.package').on('click',function(){
        ga('send', 'event', 'logo download', 'all .zip') ;
    });

    if( $('.downloads').length > 0){
        var loadTheLogos = setInterval(function(){
            if(scrollDistance() > ( $('.downloads').offset().top - $('.downloads').height()) ){
                loadLogos();
                clearInterval(loadTheLogos);
            }
        },50);
    }

    /*//////////////////////////////////////
    //  virtual page tracking
    //////////////////////////////////////*/
    $(window).on("scroll",function(){
        var currentScroll = ( scrollDistance() + $('.main-nav').height() );
        $("section").each(function(){
            offset = ($(this).offset());
            if(currentScroll > offset.top && ! $(this).hasClass('tracked')){
                $(this).addClass('tracked');
                ga('send', 'pageview',{ 
                    'page': '/'+ $(this).attr('id'),
                    'title': $(this).attr('id'),
                });
            }
        });
    });

    function scrollDistance(){
        var toTop = $(document).scrollTop();
        return toTop;
    }


    /*//////////////////////////////////////
    //  footer links & footer analytics
    //////////////////////////////////////*/
    $('.mayor .flickr').on('click',function(){
        window.open('https://www.flickr.com/people/bosmayorsoffice/', '_blank');
        ga('send', 'event', 'footer social', $(this).attr('class'));
    });
    $('.mayor .twitter').on('click',function(){
        window.open('https://twitter.com/marty_walsh', '_blank');
    });
    $('.mayor .facebook').on('click',function(){
        window.open('https://www.facebook.com/VoteMartyWalsh', '_blank');
    });
    $('.mayor button').on('click',function(){
         ga('send', 'event', 'footer social', 'mayor:' + $(this).attr('class'));
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
    $('.city button').on('click',function(){
         ga('send', 'event', 'footer social', 'city:' + $(this).attr('class'));
    });

    $('.cityofboston-link').on('click',function(){
        ga('send', 'event', 'footer link', 'city of boston website');
    });
    $('.privacy-policy').on('click',function(){
        ga('send', 'event', 'footer link', 'privacy policy');
    });

    /*//////////////////////////////////////
    //  press tracking
    //////////////////////////////////////*/
    $('.press a').on('click',function(){
        ga('send', 'event', 'press link', $(this).text());
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
    // See if current element is in viewport
    /////////////////////////*/
    var isElementInViewport = function(el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
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