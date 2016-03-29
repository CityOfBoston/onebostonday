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
                                    loadFeed();
                                },5000);
                            }

                        }
                     );
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
        if(twitterImage !== null){
            twitterDisplayImage = '<div class=\"photo\"><img src=\"'+twitterImage+'\" alt=\"\"><\/div>';
            hasPhoto = 'has-photo';
        }

        var entity = twitterTweetEntity;

        entity =  linkHashtags(entity);
        entity =  linkUsers(entity);

        var twitterCard="";
        twitterCard += "<li>";
        twitterCard += "    <div class=\"twitter-card "+  hasPhoto +"\">";
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
        twitterCard += "    <\/div>";
        twitterCard += "<\/li>";

        if(direction === 'append'){
            $('main.tweets > ul').append(twitterCard);
        }
        else{
            $('main.tweets > ul').prepend(twitterCard);
        }
    };

    var loadFeed = function() {
        $.ajax({
            //TESTING   
            //url:'/feeds/' + file,
            //url: 'http://siphon.hhcctech.com/api/container/showall/9?active=1',
            url: 'http://siphon.hhcctech.com/api/container/showall/8?active=1',
            dataType:'json',
            error: function(jqXHR, textStatus, errorThrown) {
                // console.log(textStatus, errorThrown);
            },
            success:function(response){

                $('body').removeClass('loading');

                var totalPosts = response.data.length;
                var data = response.data;

                setTimeout(function(){
                    for (i=0;i<totalPosts;i++){
                        var post = data[i];
                        if(post.provider === "twitter"){
                            twitterTemplate(post.userimageurl,post.full_name,post.username,post.created_at,post.social_id,post.message,post.image,"append");
                        }
                        else if(post.provider === "instagram"){
                            instagramTemplate(post.image,post.full_name,post.username,post.created_at,post.social_id,post.message,"append");
                        }
                    }
                    inOut($('main.tweets ul li:first'));
                },600);
            }
        });
    };

    loadFeed();
});