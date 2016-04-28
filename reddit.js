var page = require('webpage').create() ;
var system = require('system');
var args = system.args;


page.viewportSize = { width: 1024, height: 768 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)';

var login = 'https://www.reddit.com/';
var url = args[1];

var username = 'your username here';
var password = 'your password here';

page.open(login, function (status) {
    if (status !== 'success') {
        console.log('fail!');
        phantom.exit(1);
    } else {
        page.evaluate(function(){
          $('input[name="user"]:first').attr('value', username);
          $('input[name="passwd"]:first').attr('value', password);
          $("form#login_login-main").submit();
          console.log('login requested');
        });
        setTimeout(function(){
            page.open(url, function(status){
                if (status !== "success") {
                    console.log('fail opening target post');
                    phantom.exit(1);
                    return;
                } 
                    console.log("Loaded:  " + url);
                    if ( args[2] == 'up' ) {
                      page.sendEvent('click', 25, 83, button='left');
                      console.log('voted up'); setTimeout(function() { phantom.exit(); }, 5000);
                    }  else {
                      page.sendEvent('click', 25, 114, button='left');
                      console.log('voted down'); setTimeout(function() { phantom.exit(); }, 5000);
                    }
                    }); 
        }, 5000);
    };

});
