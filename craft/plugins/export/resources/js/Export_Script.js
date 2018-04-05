/**
 * Export plugin for Craft CMS
 *
 * Export JS
 *
 * @author    Hill Holliday
 * @copyright Copyright (c) 2016 Hill Holliday
 * @link      http://hhcc.com
 * @package   Export
 * @since     1.0.0
 */

$(function(){
    $('body').on('click','a.run-export', function(event){
        event.preventDefault();

        var $this = $(this);
        

        var dest = $this.attr('href');

        var data = {
            key: $this.data('key'),
            user: $this.data('user'),
            url: $this.data('url'),
            basicAuthUser: $this.data('username'),
            basicAuthPassword: $this.data('password'),
            emailList: $this.data('emails').split(',')
        };

        var dataJSON = JSON.stringify(data);
        
        console.log(data);

        var areYouSure = [
            'Are you sure new files are ready to be exported?'
        ];

        var randomSelectioon = Math.floor(Math.random()* areYouSure.length) + 1;

        if (confirm(areYouSure[randomSelectioon])) {
            $.ajax({
                url: dest,
                crossDomain: true,
                type: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                },
                data: dataJSON
            })
            .done(function() {
                console.log("success");
                alert('New files are up on the server.');
            })
            .fail(function() {
                console.log("error");
                alert('Something went wrong. Hit up one of the developers to find out why.');
            })
            .always(function() {
                console.log("complete");
            });
        }        
    })
});