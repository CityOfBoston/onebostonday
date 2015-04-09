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
    colorChangeIntroID = setInterval(colorChangeIntro, 10);

    
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
