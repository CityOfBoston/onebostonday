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