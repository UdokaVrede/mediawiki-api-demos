/*
    deleted_revisions.js

    MediaWiki API Demos
    Demo of `Deletedrevisions` module: Get a list of deleted revisions for Talk:Main Page.

    MIT License
*/

var request = require("request").defaults({jar: true}),
url = "https://en.wikipedia.org/w/api.php";

// Step 1: GET Request to fetch login token
function getLoginToken() {
    var params_0 = {
        action: "query",
        meta: "tokens",
        type: "login",
        format: "json"
    };
    request.get({ url: url, qs: params_0 }, function (error, res, body) {
        if (error) {
            return;
        }
        var data = JSON.parse(body);
        loginRequest(data.query.tokens.logintoken);
    });
}

// Step 2: POST request to log in. 
// Use of main account for login is not
// supported. Obtain credentials via Special:BotPasswords
// (https://www.mediawiki.org/wiki/Special:BotPasswords) for lgname & lgpassword
function loginRequest(login_token) {
    var params_1 = {
        action: "login",
        lgname: "bot_username",
        lgpassword: "bot_password",
        lgtoken: login_token,
        format: "json"
    };
    
    request.post({ url: url, form: params_1 }, function (error, res, body) {
        if (error) {
            return;
        }
        deletedRevisions();
    });
}

// Step 3: Get a list of deleted revisions for Talk:Main Page.
function deletedRevisions() {

    var params = {
        action: "query",
        titles: "Talk:Main_Page",
        prop: "deletedrevisions",
        drvprop: "user|comment|content",
        drvslots: "*",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {console.log(response);})
        .catch(function(error){console.log(error);});
}
