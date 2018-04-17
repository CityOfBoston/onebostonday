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
            emailList: $this.data('emails').split(','),
            siteLocation: $this.data('location'),
            deliveryType: $this.data('delivery')
        };

        var dataJSON = JSON.stringify(data);

        if (confirm('Are you sure new files are ready to be exported?')) {
            $.ajax({
                url: dest,
                crossDomain: true,
                type: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: dataJSON
            })
            .done(function(data) {
                console.log("success");
                console.log(data);
                alert('New files are up on the server.');
            })
            .fail(function(data) {
                console.log("error");
                console.log(data);
                alert('Something went wrong. Hit up one of the developers to find out why.');
            })
            .always(function() {
                console.log("complete");
            });
        }        
    })
});