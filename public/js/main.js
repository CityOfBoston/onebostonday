$(function(){

    $('form').on('submit',function(event){
        event.preventDefault();

        var unix = Math.round(+new Date()/1000);

        $('#title').val(unix);

        var data = $('form').serialize();

        $.ajax({
            url: 'http://onebostonday-counter.hhcc.tech/',
            type: 'POST',
            data: data,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        .done(function() {
            //$('body').addClass('success');
            console.log('donezo');
        })
        .fail(function() {
            console.log('something went wrong');
        })
        .always(function() {
            console.log("complete");
        });
    });

    var init = function(data){

        var initialPledges = data;
        var count = 0;

        $.ajax({
            url:'http://siphon.hhcctech.com/api/container/showall/9',
            type:'GET',
        })
        .done(function(data){
            count = data.total + initialPledges.total_pledges;
            var initialCount = count - 1000;

            var $odometer = document.querySelector('h1');
            od = new Odometer({
                el: $odometer,
                value: initialCount,
                format: '(,ddd)',
                duration: 300,
            }); 

            od.update(count);
        });

        $('button').on('click',function(){
            if(! $('body').hasClass('thank-you')){
                // initiate click
                console.log(count);
                count++;
                od.update(count);
                $('body').addClass('thank-you');
                setTimeout(function(){
                    $('body').removeClass('thank-you');
                },3000);

                $('form').submit();
            }
        });
    };

    $.ajax({
        url: 'http://onebostonday-counter.hhcc.tech/api/count',
        type: 'GET',
    })
    .done(function(data) {
        console.log("success");
        init(data);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
});
$(function(){
    var body = $('body');
    body.addClass('ready');

    $('.intro button.watch-video').on('click',function(event){
        event.preventDefault();

        var videoId = '5XLJabL_UfE';

        if(Modernizr.touchevents){
            ga('send', 'event', 'celebrity video', 'mobile');
            window.open(
                'https://www.youtube.com/watch?v='+videoId,
                '_blank'
            );
        }
        else{
            ga('send', 'event', 'celebrity video', 'desktop');
            $('.intro').prepend('<div class="video-player"><iframe src="https://www.youtube.com/embed/'+videoId+'?autoplay=1&rel=0&modestbranding=1" frameborder="0" allowfullscreen></iframe></div>');
            body.append('<button class="close-video">Close video</div>');
            setTimeout(function(){
                body.addClass('video-playing');
            },50);

            $('body').find('button.close-video').on('click',function(){
                body.removeClass('video-playing');
                console.log('clicked');
                setTimeout(function(){
                    body.find('div.video-player').remove();
                    body.find('button.close-video').remove();
                },350);
            });
        }
    });

    if(!Modernizr.touchevents && $(window).width() > 800){
        var bgVideo = "";
        bgVideo += '<div class="bg-video">';
        bgVideo += '    <video autoplay loop muted>';
        bgVideo += '        <source src="/video/obd-short-2017.mp4" type="video/mp4">';
        bgVideo += '        <source src="/video/obd-short-2017.webm" type="video/webm">';
        bgVideo += '    </video>';
        bgVideo += '</div>';

        $('section.intro').append(bgVideo);
    }

    // scroll if there is a hash
    if (location.hash) {
      setTimeout(function() {
        var distance = $(location.hash).offset().top;
        $('html,body').animate({
            scrollTop: distance
        });
      }, 400);
    }

    /*//////////////////////////////////////
    //  odometer on homepage
    //////////////////////////////////////*/
    if($('.acts-of-kindness h3').length > 0){
        var $odometer = document.querySelector('.acts-of-kindness h3');
        od = new Odometer({
            el: $odometer,
            value: 0,
            format: '(,ddd)',
            duration: 2000,
        }); 
    }


    /*//////////////////////////////////////
    //  video toggle
    //////////////////////////////////////*/

    var video = '<iframe src="https://player.vimeo.com/video/206079468?autoplay=1" width="500" height="367" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $('.video span').on('click',function(){
        ga('send', 'event', 'video', 'watched') ;
        $('.video span').fadeOut(function(){
            $('.video img').remove();
            $('.video').append(video);
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
            // console.log("success");
        })
        .fail(function() {
            // console.log("error");
        })
        .always(function() {
            $('form.planning-form').fadeOut(function(){
                $('section.planning .block').append(thankYou);
                $('section.planning').find('.thank-you').addClass('youre-welcome');
                var distance = $('section.planning').offset().top;
                $('html,body').animate({
                    scrollTop: distance
                },500);
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

    var characterCount = 243;
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

    var loadNewFeed = function(){
        $.ajax({
            url: 'https://xapi.wayin.com/xapi/content/3/filter?key=103adfe9-a7b9-4824-9916-052f7339d73a&format=json&max=1000&collectionId=co-2ny8jdhvr07p7ogdqyf',
            dataType:'json',
            error: function(jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            },
            success:function(response){

                var totalPosts = response.data.length;
                var data = response.data;

                setTimeout(function(){
                    for (i=0;i<totalPosts;i++){
                        var post = data[i];
                        if(post.externalservice.label === "Twitter"){
                            twitterTemplate(post.avatar,post.sourcename,post.sourceprofile,post.createdate,post.externalid,post.content,post.mainasseturl,"append");
                        }
                        else if(post.externalservice.label === "Instagram"){
                            instagramTemplate(post.mainasseturl,post.sourcename,post.sourceprofile,post.createdate,post.link,post.content,"append");
                        }
                    }
                },600);

                $(".social-feed .block > ul .content").anchorTextUrls();

                //lazy loading
                if($(window).width() < 800){
                    $('.social-feed .photo img').lazyload();
                }
                else{
                    $('.social-feed').find('.gutter-sizer').appendTo('.social-feed .block > ul');
                }

                setTimeout(function(){
                    loadOldFeed();
                },2000);

                setTimeout(function(){
                    $('.load-more').click();
                },4000);

                setTimeout(function(){
                    $('.social-feed .photo img').lazyload({
                        container: $('.social-feed .block > ul')
                    });
                },2000);
            }
        });
    };
    

    var loadFeedContent = function(response, direction){
        $('.feed .icon-spinner').fadeOut(function(){
            $(this).remove();
        });

        var totalPosts = response.data.length;

        if(totalPosts > 500){
            totalPosts = 500;
        }

        var data = response.data;

        if(direction === "prepend"){
            data = data.reverse();
        }

        for (i=0;i<totalPosts;i++){
            var post = data[i];
            if(post.provider === "twitter"){
                twitterTemplate(post.userimageurl,post.full_name,post.username,post.created_at,post.social_id,post.message,post.image,direction);
            }
            else if(post.provider === "instagram"){
                instagramTemplate(post.image,post.full_name,post.username,post.created_at,post.social_id,post.message,direction);
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

            $('.social-feed').find('.gutter-sizer').appendTo('.social-feed .block > ul');
        }
    };

    var loadOldFeed = function(){
        $.ajax({
            url: '/feed/oldfeed.json',
            dataType:'json',
            error: function(jqXHR,textStatus,errorThrown){
                // console.log(textStatus, errorThrown);
            },
            success:function(response){
                loadFeedContent(response,"append");
            }
        });
    };

    if($('.acts-of-kindness h3').length > 0){
        loadNewFeed();

        var donezo = false;
        var number = 43532;

        $.ajax({
            url: 'http://one-boston-day-wayin-api.hhcctech.com/wayin/count.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(resp) {
            console.log("success");
            number = resp.results[0].count;
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
            setInterval(function(){
                if(isElementInViewport($odometer) && donezo === false){
                    od.update(number);
                    donezo = true;
                }
            },500);
        });
    }
    
    $('ul.thumbs li').on('click', function() {
        $('ul.thumbs li').removeClass('active');
        //
        var $this = $(this);
        $this.addClass('active');
        var style = $this.attr('style');
        $('.holder').attr('style', style);
    });

    //load more button
    var inView = 24;
    $('button.load-more').on('click',function(event){
        event.preventDefault();
        $('.social-feed .block > ul > li:nth-child(-n+'+inView+')').show();
        inView += 12;

        //lazy loading
        if($(window).width() < 800){
            $('.social-feed .photo img').lazyload();

        }
        else{
            $('.social-feed').find('.gutter-sizer').appendTo('.social-feed .block > ul');
            
            setTimeout(function(){
                $('.social-feed .block > ul').packery({
                  // options
                  itemSelector: '.social-feed .block > ul > li',
                  gutter: 20
                });
            },250);

            setTimeout(function(){
                $('.social-feed .photo img').lazyload({
                    container: $('.social-feed .block > ul')
                });
            },400);
        }

        if($('.social-feed .block > ul').children(':hidden').length === 0) {
           $('button.load-more').hide();
        }
    });

    $('body').on('click','.actions a',function(event){
        event.preventDefault();
        popItUp($(this).attr('href'),300,600);
        ga('send', 'event', 'feed twitter action', $(this).find('svg').attr('class')) ;
    });

    $('ul.social-share a').on('click', function(e) {
        var $this = $(this);
        if (!$this.hasClass('is-email')) {
            e.preventDefault();
            popItUp($(this).attr('href'), 300, 600);
        }
    });

    var twitterTemplate = function(profileImage,twitterName,twitterUser,twitterTime,twitterTweetUrl,twitterTweetEntity,twitterImage,direction){
        var tweetId = twitterTweetUrl.replace('tw-','');

        var intentReply = 'https://twitter.com/intent/tweet?in_reply_to='+tweetId;
        var intentRetweet = 'https://twitter.com/intent/retweet?tweet_id='+tweetId;
        var intentFavorite = 'https://twitter.com/intent/favorite?tweet_id='+tweetId;

        twitterDisplayImage = '';
        if(twitterImage !== null && ! twitterImage.indexOf("youtu") > 0){
            twitterDisplayImage = '<div class=\"photo\"><img data-original="'+twitterImage+'" src=\"\/img\/preloader-large.gif\" alt=\"\"><\/div>';
        }

        var entity = twitterTweetEntity;

        entity =  linkTwitterHashtags(entity);
        entity =  linkTwitterUsers(entity);

        var username = twitterUser.replace('@','');

        twitterTime = new Date(twitterTime);
        var date = twitterTime / 1000;

        var dateToString = date.toString();
        var dateToUse = moment.unix(date).format('MMM Do YYYY h:mma');

        // if(isNaN(parseInt(twitterTime))){
        //     dateToUse = twitterTime;
        // }

        var twitterCard="";
        twitterCard += "<li>";
        twitterCard += "    <div class=\"twitter-card\">";
        twitterCard += "        <svg class=\"icon icon-twitter\"><use xlink:href=\"#icon-twitter\"><\/use><\/svg>";
        twitterCard += "        <header>";
        twitterCard += "            <a href=\"https:\/\/twitter.com\/"+twitterUser+"\">";
        twitterCard += "                <img src=\""+profileImage+"\">";
        twitterCard += "                <h4>"+twitterName+"<\/h4>";
        twitterCard += "                <h5>@"+username+"<\/h5>";
        twitterCard += "            <\/a>";
        twitterCard += "        <\/header>";
        twitterCard += "        <div class=\"content\">";
        twitterCard += "            <p>"+entity+"<\/p>";
        twitterCard += "        <\/div>";
        twitterCard += "        <time><a target=\"_blank\" href=\"https:\/\/twitter.com\/"+twitterUser+"/status/"+tweetId+"\">"+dateToUse+"<\/a><\/time>";
        twitterCard +=          twitterDisplayImage;
        twitterCard += "        <div class=\"actions\">";
        twitterCard += "            <ul>";
        twitterCard += "                <li>";
        twitterCard += "                    <a class=\"reply\" href=\""+intentReply+"\"> ";
        twitterCard += "                        <svg class=\"icon icon-reply\"><use xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" xlink:href=\"#icon-reply\"><\/use><\/svg>                ";
        twitterCard += "                    <\/a>";
        twitterCard += "                <\/li>";
        twitterCard += "                <li>";
        twitterCard += "                    <a class=\"retweet\" href=\""+intentRetweet+"\">";
        twitterCard += "                        <svg class=\"icon icon-retweet\"><use xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" xlink:href=\"#icon-retweet\"><\/use><\/svg>";
        twitterCard += "                    <\/a> ";
        twitterCard += "                <\/li>";
        twitterCard += "                <li>";
        twitterCard += "                    <a class=\"favorite\" href=\""+intentFavorite+"\">";
        twitterCard += "                        <svg class=\"icon icon-heart\"><use xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" xlink:href=\"#icon-heart\"><\/use><\/svg>";
        twitterCard += "                    <\/a>";
        twitterCard += "                <\/li>";
        twitterCard += "            <\/ul>";
        twitterCard += "        <\/div>";
        twitterCard += "    <\/div>";
        twitterCard += "<\/li>";

        if(direction === 'append'){
            $('.social-feed .block > ul').append(twitterCard);
        }
        else{
            $('.social-feed .block > ul').prepend(twitterCard);
        }

        $('.social-feed header img').on('error',function(){
            $(this).parent().parent().parent().remove();
        });
    };

    var instagramTemplate = function(instaImage,instaName,instaUsername,instaTime,instaUrl,instaBody){
        var instaUserFullName = instaName;

        if(typeof instaName === undefined || instaName.length === 0){
            instaUserFullName = instaUsername;
        }

        var body = instaBody.replace(/â€™/g,'’');

        body = linkInstagramHashtags(body);
        body = linkTwitterUsers(body);

        instaTime = new Date(instaTime);

        var date = instaTime / 1000;

        var dateToString = date.toString();
        var dateToUse = moment.unix(date).format('MMM Do YYYY h:mma');

        var username = instaUsername.replace('@','');

        var instagramMarkup="";
        instagramMarkup += "<li>";
        instagramMarkup += "    <div class=\"instagram-card\">";
        instagramMarkup += "        <svg class=\"icon icon-instagram\"><use xlink:href=\"#icon-instagram\"><\/use><\/svg>";
        instagramMarkup += "    <div class=\"photo\">";
        instagramMarkup += "        <img src=\""+ instaImage +"\"> ";
        instagramMarkup += "    </div>";
        instagramMarkup += "    <header class=\"insta-header\">";
        instagramMarkup += "        <h4><a href=\"https:\/\/instagram.com\/" + username + "\">"+instaUserFullName+"<\/a><\/h4>";
        instagramMarkup += "        <a class=\"time\" href=\"https:\/\/instagram.com\/p\/"+instaUrl+"\" target=\"_blank\" title=\" "+instaTime+" \"><\/a>";
        instagramMarkup += "    <\/header>";
        instagramMarkup += "    <div class=\"content\">";
        instagramMarkup += "        <p>"+ body +"<\/p>";
        instagramMarkup += "    </div>";
        instagramMarkup += "        <time><a target=\"_blank\" href=\""+instaUrl+"\">"+dateToUse+"<\/a><\/time>";
        instagramMarkup += "    </div>";
        instagramMarkup += "<\/li>";

        $('.social-feed .block > ul').append(instagramMarkup);

        $('.social-feed div.photo img').on('error',function(){
            $(this).parent().parent().remove();
        });
        
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
        if(Modernizr.touchevents){
            $('.none-download').attr('href','/img/OneBostonDay_CoverPhoto_Facebook_v2.jpg');
        }
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

    $.fn.shuffle = function() {
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);
    };

    $('.stories li').shuffle();
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
    
    $('.mayor .instagram').on('click',function(){
        window.open('https://www.instagram.com/boston_mayor/', '_blank');
    });

    $('.mayor button').on('click',function(){
         ga('send', 'event', 'footer social', 'mayor:' + $(this).attr('class'));
    });

    $('.city .instagram').on('click',function(){
        window.open('https://instagram.com/cityofboston', '_blank');
    });
    $('.city .twitter').on('click',function(){
        window.open('https://twitter.com/CityofBoston', '_blank');
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
$(function(){
    var init = function(){
        $.ajax({
            url:'http://one-boston-day-wayin-api.hhcctech.com/wayin/count.json',
            type:'GET',
        })
        .done(function(data){
            count = data.results[0].count;
            var $odometer = document.querySelector('h1');
            od = new Odometer({
                el: $odometer,
                value: count,
                format: '(,ddd)',
                duration: 300,
            }); 

            od.update(count);
        });
    };

    setInterval(function(){
        init();
    },5000);

    init();
});
$(function(){

    var inOut = function( elem ){
         elem.delay()
             .fadeIn()
             .delay(9000)
             .fadeOut( 
                       function(){ 
                            inOut( elem.next() ); 

                            if(elem.next().length === 0){
                                $('main.tweets ul li').each(function(){ $(this).remove();  });
                                
                                $('body').addClass('loading');
                                setTimeout(function(){
                                    loadFeed('http://one-boston-day-wayin-api.hhcctech.com/wayin/latest.json');
                                },5000);
                            }

                        }
                     );
    };

    var timeConverter = function(UNIX_timestamp){
        
        // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // var year = a.getFullYear();
        // var month = months[a.getMonth()];
        // var date = a.getDate();
        // var hour = a.getHours();
        // var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        // var sec = a.getSeconds();

        // var hourMin = moment(hour+':'+min,'HH:mm').format('h:mma');

        var timestamp = UNIX_timestamp.toString();
        var date = moment.unix(UNIX_timestamp).format('MMM Do YYYY h:mma');

        return date;
    };

    // 0. profile image
    // 1. twitter name
    // 2. twitter user
    // 3. timestamp
    // 4. url (null)
    // 5. copy
    // 6. image
    // 7. direction (prepend)
    var twitterTemplate = function(profileImage,twitterName,twitterUser,twitterTime,twitterTweetUrl,twitterTweetEntity,twitterImage,direction){
        var intentReply = 'https://twitter.com/intent/tweet?in_reply_to='+twitterTweetUrl;
        var intentRetweet = 'https://twitter.com/intent/retweet?tweet_id='+twitterTweetUrl;
        var intentFavorite = 'https://twitter.com/intent/favorite?tweet_id='+twitterTweetUrl;

        twitterDisplayImage = '';
        hasPhoto = '';
        if(twitterImage !== null && ! twitterImage.includes ("youtube")){
            twitterDisplayImage = '<div class=\"photo\" style=\"background-image:url('+twitterImage+')\"><\/div>';
            hasPhoto = 'has-photo';
        }

        var entity = twitterTweetEntity;

        entity =  linkTwitterHashtags(entity);
        entity =  linkTwitterUsers(entity);

        var time = twitterTime / 1000;

        var twitterCard="";
        twitterCard += "<li>";
        twitterCard += "    <div class=\"twitter-card "+  hasPhoto +"\">";
        twitterCard += "        <svg class=\"icon icon-twitter\"><use xlink:href=\"#icon-twitter\"><\/use><\/svg>";
        twitterCard += "        <header>";
        twitterCard += "            <a href=\"https:\/\/twitter.com\/"+twitterUser+"\">";
        twitterCard += "                <img src=\""+profileImage+"\">";
        twitterCard += "                <h4>"+twitterName+"<\/h4>";
        twitterCard += "                <h5>"+twitterUser+"<\/h5>";
        twitterCard += "            <\/a>";
        twitterCard += "        <\/header>";
        twitterCard += "        <div class=\"content\">";
        twitterCard += "            <p>"+entity+"<\/p>";
        twitterCard += "        <\/div>";
        twitterCard += "        <time><a href=\"https:\/\/twitter.com\/"+twitterUser+"/status/"+twitterTweetUrl+"\">"+timeConverter(time)+"<\/a><\/time>";
        twitterCard +=          twitterDisplayImage;
        twitterCard += "    <\/div>";
        twitterCard += "<\/li>";

        if(direction === 'append'){
            $('main.tweets > ul').append(twitterCard);
        }
        else{
            $('main.tweets > ul').prepend(twitterCard);
        }
    };

    var instagramTemplate = function(instaImage,instaName,instaUsername,instaTime,instaUrl,instaBody,instaHeadshot){
        var instaUserFullName = instaName;

        if(typeof instaName === undefined || instaName.length === 0){
            instaUserFullName = instaUsername;
        }

        var body = instaBody.replace(/â€™/g,'’');

        body = linkInstagramHashtags(body);
        body = linkTwitterUsers(body);

        var date = instaTime / 1000;

        var dateToString = date.toString();
        var dateToUse = moment.unix(date).format('MMM Do YYYY h:mma');

        var username = instaUsername.replace('@','');

        var instagramMarkup="";
        instagramMarkup += "<li>";
        instagramMarkup += "    <div class=\"instagram-card\">";
        instagramMarkup += "        <svg class=\"icon icon-instagram\"><use xlink:href=\"#icon-instagram\"><\/use><\/svg>";
        instagramMarkup += "    <div class=\"photo\">";
        instagramMarkup += "        <img src=\""+ instaImage +"\"> ";
        instagramMarkup += "    </div>";
        instagramMarkup += "    <header class=\"insta-header\">";
        instagramMarkup += "        <img src=\""+instaHeadshot+"\">"
        instagramMarkup += "        <h4><a href=\"https:\/\/instagram.com\/" + username + "\">"+instaUserFullName+"<\/a><\/h4>";
        instagramMarkup += "        <a class=\"time\" href=\"https:\/\/instagram.com\/p\/"+instaUrl+"\" target=\"_blank\" title=\" "+instaTime+" \"><\/a>";
        instagramMarkup += "    <\/header>";
        instagramMarkup += "    <div class=\"content\">";
        instagramMarkup += "        <p>"+ body +"<\/p>";
        instagramMarkup += "    </div>";
        instagramMarkup += "        <time><a target=\"_blank\" href=\""+instaUrl+"\">"+dateToUse+"<\/a><\/time>";
        instagramMarkup += "    </div>";
        instagramMarkup += "<\/li>";

        $('main.tweets > ul').append(instagramMarkup);
    };

    var loadFeed = function(feed){
        $.ajax({
            url: feed,
            dataType:'json',
            error: function(jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            },
            success:function(response){

                $('body').removeClass('loading');

                var totalPosts = 50;
                var data = response.results;

                setTimeout(function(){
                    for (i=0;i<totalPosts;i++){
                        var post = data[i];
                        console.log(post.source);
                        if(post.source === "twitter"){
                            twitterTemplate(post.author_avatar_url,post.author_name,post.author_handle,post.created_at_long,post.author_id,post.post_message,post.post_media_url,"append");
                        }
                        else if(post.source === "instagram"){
                            instagramTemplate(post.post_media_url,post.author_name,post.author_handle,post.created_at_long,post.instagram.link,post.post_message,post.author_avatar_url);
                        }
                    }
                    inOut($('main.tweets ul li:first'));
                },600);
            }
        });
    };

    loadFeed('http://one-boston-day-wayin-api.hhcctech.com/wayin/latest.json');
});