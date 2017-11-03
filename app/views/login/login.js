var frameModule = require("ui/frame");

var page;
var email;

var observableModule = require("data/observable");

var user = new observableModule.fromObject({
    email: "user@domain.com",
    password: "password"
});

exports.loaded = function (args) {
    console.log("hello");
    page = args.object;
    console.log(page)
    page.bindingContext = user;
};

exports.signIn = function () {
    alert("Signing in");
    email = page.getViewById("email");
    console.log(email.text);
};

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};