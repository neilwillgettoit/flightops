var page = require('webpage').create() ;
var system = require('system');
var args = system.args;


page.viewportSize = { width: 1024, height: 768 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)';

var login = 'https://www.phishtank.com/'; // page to login at 
var url = args[1]; // target post to vote on 

var username = 'your username here';
var password = 'your password here';

page.open(login, function (status) {
    if (status !== 'success') {
        console.log('failed opening loging page');
        phantom.exit(1);
    } else {
        page.evaluate(function(){
            document.getElementById('username').value = username;//Set username 
            document.getElementById('password').value = password;//set password
            document.getElementsByClassName('loginbox')[0].submit(); 
            console.log('login requested');
        });
        setTimeout(function(){
            page.open(url, function(status){
                if (status !== "success") {
                    console.log('failed opening target post');
                    phantom.exit(1);
                    return;
                } 
                    console.log("Loaded:  " + url);
//                    page.render('phish.png'); // uncomment for debugging 
                    if ( args[2] == 'up' ) {
                      page.sendEvent('click', 180, 280, button='left'); 
                      console.log('voted up'); 
                      setTimeout(function() { phantom.exit(); }, 5000); // had to set a delay to let the click register
                    }  else {
                      page.sendEvent('click', 300, 280, button='left');
                      console.log('voted down'); 
                      setTimeout(function() { phantom.exit(); }, 5000); 
                    }
                    }); 
        }, 5000); // waiting 5 seconds for the login to redirect 
    };
});

