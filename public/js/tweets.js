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
                                    loadFeed('https://xapi.wayin.com/xapi/content/3/filter?key=103adfe9-a7b9-4824-9916-052f7339d73a&format=json&max=1000&collectionId=co-2ny8jdhvr07p7ogdqyf');
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
        if(twitterImage !== null && twitterImage.indexOf("youtu") == -1){
            twitterDisplayImage = '<div class=\"photo\" style=\"background-image:url('+twitterImage+')\"><\/div>';
            hasPhoto = 'has-photo';
        }

        var entity = twitterTweetEntity;

        entity =  linkTwitterHashtags(entity);
        entity =  linkTwitterUsers(entity);

        twitterTime = new Date(twitterTime);
        var date = twitterTime / 1000;

        var dateToString = date.toString();
        var dateToUse = moment.unix(date).format('MMM Do YYYY h:mma');

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
        twitterCard += "        <time><a href=\"https:\/\/twitter.com\/"+twitterUser+"/status/"+twitterTweetUrl+"\">"+dateToUse+"<\/a><\/time>";
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

        if(typeof instaName === undefined || instaName === null){
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
                var data = response.data;

                setTimeout(function(){
                    for (i=0;i<totalPosts;i++){
                        var post = data[i];
                        if(post.externalservice.label === "Twitter"){
                            twitterTemplate(post.avatar,post.sourcename,post.sourceprofile,post.createdate,post.externalid,post.content,post.mainasseturl,"append");
                            //twitterTemplate(post.author_avatar_url,post.author_name,post.author_handle,post.created_at_long,post.author_id,post.post_message,post.post_media_url,"append");
                        }
                        else if(post.externalservice.label === "Instagram"){
                            instagramTemplate(post.mainasseturl,post.sourcename,post.sourceprofile,post.createdate,post.link,post.content);
                            //instagramTemplate(post.post_media_url,post.author_name,post.author_handle,post.created_at_long,post.instagram.link,post.post_message,post.author_avatar_url);
                        }
                    }
                    inOut($('main.tweets ul li:first'));
                },600);
            }
        });
    };

    loadFeed('https://xapi.wayin.com/xapi/content/3/filter?key=103adfe9-a7b9-4824-9916-052f7339d73a&format=json&max=1000&collectionId=co-2ny8jdhvr07p7ogdqyf');
});