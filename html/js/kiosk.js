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