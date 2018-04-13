$(function(){

    var number = 0;

    var init = function(){
        $.ajax({
            url: 'https://metric.wayin.com/xapi/metric/count?apiKey=103adfe9-a7b9-4824-9916-052f7339d73a&id=campaign:6843:127945::aUT30WCpJSjulXZ4,campaign:6843:127945::aYDVSr2FxLE63wT6',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(resp){
            var twitter = resp.content['campaign:6843:127945::aUT30WCpJSjulXZ4'][0]['count'];
            var facebook = resp.content['campaign:6843:127945::aYDVSr2FxLE63wT6'][0]['count'];
            number = twitter + facebook;

            var $odometer = document.querySelector('h1');
            od = new Odometer({
                el: $odometer,
                value: number,
                format: '(,ddd)',
                duration: 300,
            }); 

            od.update(number);
        });
    };

    setInterval(function(){
        init();
    },5000);

    init();
});