var applicationModule = require("application");

var firebase = require("nativescript-plugin-firebase");

firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
}).then(
    function (instance) {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    }
);

// firebase.getRemoteConfig({
//     developerMode: false, // play with this boolean to get more frequent updates during development
//     cacheExpirationSeconds: 600, // 10 minutes, default is 12 hours.. set to a lower value during dev
//     properties: [{
//             key: "is_enabled",
//             default: 0
//         }
//     ]
// }).then(
//     function (result) {
//         console.log("Remote Config last fetched at " + result.lastFetch);
//         console.log("Remote Config: " + JSON.stringify(result.properties));
//     }
// );

applicationModule.start({
    moduleName: "views/login/login"
});