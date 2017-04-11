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
                                    initFeed();
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

        entity =  linkHashtags(entity);
        entity =  linkUsers(entity);

        var newTwitterTime = Date.parse(twitterTime);
        newTwitterTime = Math.floor(newTwitterTime / 1000);

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
        twitterCard += "        <time><a href=\"https:\/\/twitter.com\/"+twitterUser+"/status/"+twitterTweetUrl+"\">"+timeConverter(newTwitterTime)+"<\/a><\/time>";
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

    var initFeed = function(){
        $.ajax({
            url: 'http://www.onebostonday.org/feed/',
            type: 'GET',
            dataType: 'html',
        })
        .done(function(data, status, error) {
            //console.log(jqXHR);
            console.log('success');
            $(data).find("tr.type-json td > a").each(function(){
                var currentFeed = $(this).attr("href");
                loadFeed('/oldfeed/'+currentFeed);
            });
        })
        .fail(function(jqXHR, status, error) {
            //console.log(jqXHR);
            console.log('error');
        })
        .always(function(jqXHR, status, error) {
            //console.log(jqXHR);
            console.log('done');

            loadFeed('/oldfeed/newerfeed.json');
        });
    };

    initFeed();

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
                        if(post.source === "twitter"){
                            twitterTemplate(post.author_avatar_url,post.author_name,post.author_handle,post.created_at,post.author_id,post.post_message,post.post_media_url,"append");
                        }
                        else if(post.source === "instagram"){
                            instagramTemplate(post.image,post.full_name,post.username,post.created_at,post.social_id,post.message,"append");
                        }
                    }
                    inOut($('main.tweets ul li:first'));
                },600);
            }
        });
    };
});