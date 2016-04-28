var page = require('webpage').create() ;
var system = require('system');
var args = system.args;


page.viewportSize = { width: 1024, height: 768 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)';

var login = 'https://www.virustotal.com';
var url = args[1];

var username = 'your username here';
var password = 'your password here';

page.open(login, function (status) {
    if (status !== 'success') {
        console.log('[virustotal]: failed to open login page');
        phantom.exit(1);
    } else {
        page.sendEvent('click', 945, 23, button='left');
        page.evaluate(function(){
            document.querySelector('.dlg-signin-content #username').value = username; // set username
            document.getElementById('password').value = password;//set password
            document.getElementById('frm-signin').submit();
        });
        setTimeout(function(){
            page.open(url, function(status){
                if (status !== "success") {
                    console.log('[virustotal]: failed opening target post');
                    phantom.exit(1);
                    return;
                } 
                    console.log("[virustotal]: Loaded  " + url);
                    if ( args[2] == 'up' ) {
                      page.sendEvent('click', 875, 230, button='left');
                      console.log('[virustotal]: Voted up ' + url); 
                      setTimeout(function() { phantom.exit(); }, 5000);
                    }  else {
                      page.sendEvent('click', 785, 230, button='left');
                      console.log('[virustotal]: Voted down ' + url);
                      setTimeout(function() { phantom.exit(); }, 5000);
                    }
                    }); 
        }, 7000);
    };

});

