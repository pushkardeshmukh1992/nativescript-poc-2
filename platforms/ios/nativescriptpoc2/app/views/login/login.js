var frameModule = require("ui/frame");
var UserViewModel = require("../../shared/view-models/user-view-model");
var dialogsModule = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase");

var user = new UserViewModel({
    email: "testing@gmail.comm",
    password: "test",
    isEnabledFirebaseFlag: 'asd'
});
var page;
var email;


exports.loaded = function (args) {
    page = args.object;

    console.log(page.ios);
    if (page.ios) {
        console.dir(page);
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }

    page.bindingContext = user;

    firebase.getRemoteConfig({
        developerMode: false, // play with this boolean to get more frequent updates during development
        cacheExpirationSeconds: 600, // 10 minutes, default is 12 hours.. set to a lower value during dev
        properties: [{
            key: "is_enabled",
            default: 0
        }
        ]
    }).then(
        function (result) {
            console.log('===================')
            console.dir(result)
            console.log("Remote Config last fetched at " + result.lastFetch);
            console.log("Remote Config: " + JSON.stringify(result.properties));
            user.isEnabledFirebaseFlag = result.properties.is_enabled;
        }
            ).catch(function (exception){
                     console.log('in exception');
                     console.log(exception);
                    
                    });
};

exports.signIn = function () {
    user.login()
        .catch(function (error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function () {
            frameModule.topmost().navigate("views/list/list");
        });
};

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};
